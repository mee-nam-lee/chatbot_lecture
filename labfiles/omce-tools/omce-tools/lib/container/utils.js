var Promise = require("bluebird");

module.exports = function() {

    return Object.create({
        // if opts.outType === 'stream' returns request, promise otherwise
        wrap: function(rest, verb, options, opts) {
            if (opts){
                if (opts.inType === 'stream' && options.body){
                    var streamIn = options.body;
                    options.body = undefined;
                    if (opts.outType === 'stream'){
                        return streamIn.pipe(rest[verb](options));
                    } else {
                        if ((opts.outType === 'json' && opts.inType !== 'json') || (opts.outType !== 'json' && opts.inType === 'json')){
                            var overrideJson = function(request) {
                                request._json = opts.outType === 'json';
                                return request;
                            };
                            var wrapper = function(optionsList, callback) {
                                streamIn.pipe(overrideJson(rest[verb](optionsList, callback)));
                            }
                            var wrapperAsync = Promise.promisify(wrapper, {multiArgs: true});
                            return wrapResultInternal(wrapperAsync(options), verb, options.uri);
                        } else {
                            var wrapper = function(optionsList, callback) {
                                streamIn.pipe(rest[verb](optionsList, callback));
                            }
                            var wrapperAsync = Promise.promisify(wrapper, {multiArgs: true});
                            return wrapResultInternal(wrapperAsync(options), verb, options.uri);
                        }
                    }
                } else {
                    if (opts.outType === 'stream'){
                        return rest[verb](options);
                    } else {
                        if ((opts.outType === 'json' && opts.inType !== 'json') || (opts.outType !== 'json' && opts.inType === 'json')){
                            var overrideJson = function(request) {
                                request._json = opts.outType === 'json';
                                return request;
                            };
                            var wrapper = function(optionsList, callback) {
                                overrideJson(rest[verb](optionsList, callback));
                            }
                            var wrapperAsync = Promise.promisify(wrapper, {multiArgs: true});
                            return wrapResultInternal(wrapperAsync(options), verb, options.uri);
                        } else if (opts.outType === 'json' && opts.inType === 'json') {
                            options.json = true;
                        }
                    }
                }
            }
            return wrapResultInternal(rest[verb + 'Async'](options), verb, options.uri);
        },
        
        // deprecated, use wrapResult instead
        wrapMCSResult: function(request, method, uri){
            console.warning('utils().wrapMCSResult has been deprecated because it does not allow to log promise request verb and uri. Instead of: utils().wrapMCSResult(rest.postAsync(optionsList)) use: utils().wrapResult(rest, post, optionsList)');
            return wrapResultInternal(request);
        },
 
        // wrapResult is identical to  wrap(rest, verb, null, options);
        wrapResult: function(rest, verb, options){
            return wrapResultInternal(rest[verb + 'Async'](options), verb, options.uri);
        },
 
        createOptionsListWithAuthToken: function(uri, authorization, opts, httpOptions){
            var optionsList = this.buildOptionsList(uri, opts, httpOptions);
            if (!optionsList.headers){
                optionsList.headers = {};
            }
            optionsList.headers['authorization'] = authorization;
            return optionsList;
        },

        buildOptionsList: function(uri, options, httpOptions){
            var newOptionsList = {};
            if (httpOptions){
                for (var key in httpOptions) {
                    if( httpOptions.hasOwnProperty(key) ) {
                        newOptionsList[key] = httpOptions[key];
                    }
                }
            }

            if (!newOptionsList.headers){
                newOptionsList.headers = {};
            }
            if (options){
                if (options.Accept){
                    newOptionsList.headers['Accept'] = options.Accept;
                }
                if (options.contentType){
                    newOptionsList.headers['Content-Type'] = options.contentType;
                }
                if (options.inType){
                    if (options.inType === 'json'){
                        newOptionsList.json = true;
                    }
                }
                if (options.outType){
                    if (options.outType === 'binary'){
                        newOptionsList.encoding = null;
                    } else if (options.outType.encoding){
                        newOptionsList.encoding = options.outType.encoding;
                    }
                }
            }
            newOptionsList.uri = uri;
            return newOptionsList;
        },

        handleCaugtPromiseError: function(ex, method, uri){
            handleCaugtPromiseErrorInternal(ex, method, uri);
        }
    }, {});

// the last two parameters - method and uri - used for logging only. Especially useful when trying to determine which OracleMobile Promise request resulted in unhandled Promise error.
function wrapResultInternal(request, method, uri){
    // only this (modified) object should be returned - it's initialized to carry request's method and uri
    var returnValue = {oracleMobile: {Promise: {method: method, uri: uri}}};
    return request.then(
        function(result){
            var resultObj = (result[0] || result);
            if (resultObj){
                if (resultObj.headers){
                    returnValue.headers = resultObj.headers;
                    if (resultObj.headers['content-type']){
                        returnValue.contentType = resultObj.headers['content-type'];
                    }

                    if (resultObj.headers['content-length']){
                        returnValue.contentLength = resultObj.headers['content-length'];
                    }
                }

                if (resultObj.statusCode){
                    returnValue.statusCode = resultObj.statusCode;
                    if (resultObj.statusCode >= 400){
                        if (resultObj.body){
                            returnValue.error = resultObj.body;
/*                            if (console.is_finest()) {
                                console.finest('OracleMobile Promise response ' + method + '  ' + uri + ' -> error:  statusCode: ' + returnValue.statusCode + ', error: ', returnValue.error);
                            }
                        } else {
                            if (console.is_finest()) {
                                console.finest('OracleMobile Promise response ' + method + '  ' + uri + ' -> error:  statusCode: ' + returnValue.statusCode);
                            }*/
                        }
                        return Promise.reject(returnValue);
                    }
                    if (resultObj.body){
                        returnValue.result = resultObj.body;
                    }
/*                    if (console.is_finest()) {
                        console.finest('OracleMobile Promise response ' + method + '  ' + uri + ' -> result:  statusCode: ' + result[0].statusCode);
                    }*/
                    return Promise.resolve(returnValue);
                }
            }

            returnValue.error = "unexpected result";
/*            if (console.is_finest()) {
                console.finest('OracleMobile Promise response ' + method + '  ' + uri + ' -> error: unexpected result');
            }*/
            return Promise.reject(returnValue);

        },
        function(error){
            returnValue.error = error;
/*            if (console.is_finest()) {
                console.finest('OracleMobile Promise response ' + method + '  ' + uri + ' -> error:', error);
            }*/
            return Promise.reject(returnValue);
        }
    ).catch(function (ex) {
        handleCaugtPromiseErrorInternal(ex, method, uri);
    });
}

function handleCaugtPromiseErrorInternal(ex, method, uri){
    // All returned Promise.rejects go through this catch clause - just rethrow them.
    // Rethrow the error packed in the same format as rejected promise - the user expects it in this format and would likely ignore otherwise.
    // Note that if the user doesn't handle promise error then it's caught as an "unhandled error" and therefore container is closed.
    if (ex.oracleMobile && ex.oracleMobile.Promise){
        throw ex;
    }
    var returnValue = {oracleMobile: {Promise: {method: method, uri: uri}}, error: ex};
    // Must be an internal one (something wrong in our code) - log it here.
    // note that ex.error is logged as a separate argument of console.log because if its type is Error then this way it will be logged with the stack trace
    console.error('OracleMobile Promise response ' + method + '  ' + uri + ' -> INTERNAL ERROR:', ex);
    throw returnValue;
}

}
