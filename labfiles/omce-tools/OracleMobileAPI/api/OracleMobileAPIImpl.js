module.exports = function(service) {

// try to override json parsing: always stream, never parse
var parsesJson = false;
if (service._router && service._router.stack && service._router.stack[3] && service._router.stack[3].handle){
    // express 4. - node config 6 and later
    service._router.stack[3].handle = function(req, res, next){next()};
} else if(service.stack && service.stack[3]){
    // express 3. - node config 0.10
    service.stack[3] = { route: "", handle: function(req, res, next){next()}};
} else {
    parsesJson = true;
}

service.get('/mobile/custom/OracleMobileAPI/ping', function (req, res){ 
    res.send(200);
});

service.delete('/mobile/custom/OracleMobileAPI/kill', function (req, res){ 
    throw 'Kill nodejs container';
});

service.head('/mobile/custom/OracleMobileAPI/rest', function (req, res){
    process('head', req, res);
});

service.options('/mobile/custom/OracleMobileAPI/rest', function (req, res){
    process('options', req, res);
});

service.get('/mobile/custom/OracleMobileAPI/rest', function (req, res){
    process('get', req, res);
});

service.put('/mobile/custom/OracleMobileAPI/rest', function (req, res){ 
    process('put', req, res);
});

service.post('/mobile/custom/OracleMobileAPI/rest', function (req, res){ 
    process('post', req, res);
});

service.patch('/mobile/custom/OracleMobileAPI/rest', function (req, res){ 
    process('patch', req, res);
});

service.delete('/mobile/custom/OracleMobileAPI/rest', function (req, res){ 
    // using 'del' for backward compatibility. Starting with 15.3.1 either 'del' or 'delete' could be used.
    process('del', req, res);
});

function process(method, req, res){
    var shouldPipeInput = true;
    var optionsList = {method: method, headers: {}};
    for (var headerName in req.headers){
        if (startsWith(headerName, 'oracle-offline-option-')) {
            var value = req.headers[headerName];
//            console.log('req.headers['+headerName+'] = ', value, '; typeof value = ', typeof value);
            var subName = headerName.substring(22);
            // removing yet another prefix: 'string-' or 'object-'
            var subSubName = subName.substring(7);
            if (startsWith(subName, 'object-')) {
                value = JSON.parse(value);
            }
            optionsList[subSubName] = value;
//            console.log('optionsList['+subSubName+'] = ' + value, '; typeof value = ', typeof value);
        } else if (startsWith(headerName, 'oracle-offline-header-')) {
            var subName = headerName.substring(22); 
            optionsList.headers[subName] = req.headers[headerName];
//            console.log('optionsList.headers['+subName+'] = ' + optionsList.headers[subName]);
        } else if (headerName === 'content-length') {
            if (req.headers['content-length'] == '0'){
                shouldPipeInput = false;
            }
        }
    }
    if (parsesJson && shouldPipeInput && req.is('json')) {
        optionsList.json = req.body;
        shouldPipeInput = false;
    }
    if (method === 'head'){
        var handler=function(error,response,body) {
            if(error){
                res.send(500, error);
            } else {
                res.writeHead(response.statusCode,response.headers);
                // it is necessary to call res.end
                res.end();
            }
        };
        if (shouldPipeInput) {
            req.pipe(req.oracleMobile.rest[optionsList.method](optionsList, handler))
        } else {
            req.oracleMobile.rest[optionsList.method](optionsList, handler);
        }
    } else {
        if (shouldPipeInput) {
            req.pipe(req.oracleMobile.rest[optionsList.method](optionsList))
                .on('error', function(error) {
                    res.send(500, error);
                })
                .pipe(res);
        } else {
            req.oracleMobile.rest[optionsList.method](optionsList)
                .on('error', function(error) {
                    res.send(500, error);
                })
                .pipe(res);
        }
    }
}

// apparently string.startsWith function is not supported, implementing it here: str1 startsWith str2
function startsWith(str1, str2) {
	if (str1.length < str2.length) {
		return false;
	}
	var str1StartsWith = str1.substring(0, str2.length);
	return str1StartsWith == str2;
}

}
