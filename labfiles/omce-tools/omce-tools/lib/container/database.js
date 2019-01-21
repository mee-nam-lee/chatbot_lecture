var utils = require("./utils");
var Promise = require("bluebird");

var baseObjectsURI = '/mobile/platform/database/objects/';
var baseSqlURI = '/mobile/platform/database/sql';

module.exports = function(rest) {

    function transformToSingleResult(getResponse, uri) {
        return getResponse.then(
            function (response) {
                // We assume here, that response was already parsed
                // (but checking for 'items' array just in case)
                if (response.statusCode === 200 && response.result.items) {
                    // 200 doesn't mean a single requested object exists
                    if (response.result.items.length < 1) {
                        // The array in the response body is empty
                        // if the object doesn't exist
                        response.statusCode = 404;
                        response.result = undefined;
                        response.contentLength = undefined;
                        response.contentType = undefined;
                        response.error = 'The array in the response body is empty';
/*                        if (console.is_finest()) {
                            console.finest('OracleMobile.database Promise response -> error:  statusCode: 404  error: The array in the response body is empty');
                        }*/
                        return Promise.reject(response);
                    } else if (response.result.items.length === 1) {
                        // If a single object was returned: strip an array
                        response.result = response.result.items[0];
                        // We don't change contentLength here,
                        // because it doesn't really matter at this point.
                    }
                    // Otherwise - don't make any changes to the response,
                    // return it as is.
                }
                return Promise.resolve(response);
            },
            function (error) {
                return Promise.reject(error);
            }
        ).catch(function (ex) {
            utils().handleCaugtPromiseError(ex, 'get', uri);
        });
    }

    return Object.create({

        getAll: function(table, opts, httpOptions){
			var optionsList = buildOptionsList(baseObjectsURI + table, opts, httpOptions);
			return utils().wrap(rest, 'get', optionsList, opts);
        },

        get: function(table, keys, opts, httpOptions){
			var uri = baseObjectsURI + table + '/';
                        if (keys){
                                if (Array.isArray(keys)){
                                        for (var i = 0; i<keys.length;i++ ){
                                                uri = uri + keys[i];
                                                if (i < keys.length - 1){
                                                        uri = uri + '/'
                                                }
                                        }
                                } else {
                                        uri = uri + keys;
                                }
                        }

			var optionsList = buildOptionsList(uri, opts, httpOptions);
                    var result = utils().wrap(rest, 'get', optionsList, opts);
                    if (optionsList.expectSingleResult) {
                        result = transformToSingleResult(result, optionsList.uri);
                    }
                    return result;
        },

		merge: function(table, object, opts, httpOptions){
			var optionsList = buildOptionsList(baseObjectsURI + table, opts, httpOptions);

            		var newOptsList = buildJsonOptsList(opts);
			optionsList.body = object;
                        return utils().wrap(rest, 'put', optionsList, newOptsList);
        },

		insert: function(table, object, opts, httpOptions){
			var optionsList = buildOptionsList(baseObjectsURI + table, opts, httpOptions);
                        var newOptsList = buildJsonOptsList(opts);
                        optionsList.body = object;
                        return utils().wrap(rest, 'post', optionsList, newOptsList);
        },
		
		delete: function(table, keys, opts, httpOptions){
			var uri = baseObjectsURI + table + '/';
			if (keys){
				if (Array.isArray(keys)){
					for (var i = 0; i<keys.length;i++ ){
						uri = uri + keys[i];
						if (i < keys.length - 1){
							uri = uri + '/'
						}
					}
				} else {
					uri = uri + keys;
				}
			}
			var optionsList = buildOptionsList(uri, opts, httpOptions);
                        return utils().wrap(rest, 'delete', optionsList, opts);

        },
		
        sql: function(query, args, opts, httpOptions){
            var optionsList = buildOptionsList(baseSqlURI, opts, httpOptions);
            optionsList.headers['Oracle-Mobile-SQL'] =
                (optionsList.encodeURI) ? encodeURIComponent(query) : query;
            if (args) {
                optionsList.body = args
            }
            var newOptsList = buildJsonOptsList(opts);
            return utils().wrap(rest, 'post', optionsList, newOptsList);
        },

	}, {});

        function buildJsonOptsList(opts){
               var newOptsList = {};
               if (opts){
                        for (var key in opts) {
                                if(opts.hasOwnProperty(key) ) {
                                        newOptsList[key] = opts[key];
                                }
                        }
                }
                if (!newOptsList.inType){
                        newOptsList.inType = 'json';
                }
                if (!newOptsList.outType){
                        newOptsList.outType = 'json';
                }
		return newOptsList;
	}

	function buildOptionsList(uri, opts, httpOptions){

        // Must do this before calling utils().buildOptionsList()
        if (opts && opts.expectSingleResult) {
            opts.outType = 'json';
        }

		var optionsList = utils().buildOptionsList(uri, opts, httpOptions);
		// query parameters
		if (opts){
                        if (opts.filter){
                                optionsList.qs = opts.filter;
                        } else if (!optionsList.qs){
                                optionsList.qs = {};
                        }
                        if (opts.encodeURI){
                            optionsList.encodeURI = true;
                        }

			// headers
                        if (opts.fields){
                                if (optionsList.encodeURI){
                                    optionsList.qs.fields = encodeURIComponent(opts.fields);
                                } else {
                                    optionsList.qs.fields = opts.fields;
                                }
                        }

			if (!optionsList.headers){
				optionsList.headers = {};
			}

			if (opts.extraFields){
                                if (optionsList.encodeURI){
                                    optionsList.headers['Oracle-Mobile-Extra-Fields'] = encodeURIComponent(opts.extraFields);
                                } else {
                                    optionsList.headers['Oracle-Mobile-Extra-Fields'] = opts.extraFields;
                                }

			}

			if (opts.primaryKeys){
                                if (optionsList.encodeURI){
                                    optionsList.headers['Oracle-Mobile-Primary-Keys'] = encodeURIComponent(opts.primaryKeys);
                                } else {
                                    optionsList.headers['Oracle-Mobile-Primary-Keys'] = opts.primaryKeys;    
                                }

			}
            if (opts.expectSingleResult) {
                optionsList.expectSingleResult = true;
            }
		}
		return optionsList;
	}

}
