var utils = require("./utils");

var systemUriPrefix = '/mobile/system/locationManagement/';
var uriPrefix = '/mobile/platform/location/';
var cascade = '?cascade=true';

var types = ['devices', 'places', 'assets'];
var url = {query: {}, get: {}, register: {}, update: {}, remove: {}};
for (var i in types){
    var type = types[i];
    url.query[type] = uriPrefix + type + '/query';
    url.get[type] = function(type, id){
        var uri = uriPrefix + type;
        if (typeof id == 'object' && id.name){
            return uri + '?name=' + id.name;
        } else {
            var identifier = id;
            if (id.id){
                identifier = id.id;
            }
            return uri + '/' + identifier;
        }
    }.bind(this, type);
    url.register[type] = systemUriPrefix + type;
    url.update[type] = function(type, id){
        return systemUriPrefix + type + '/' + id;
    }.bind(this, type);
    url.remove[type] = function(type, id){
        var idStr;
        if (Array.isArray(id)){
            if (id.length == 0){
                throw new Error('id array must have at least one element');
            }
            if (id.length == 1){
                // array with a single id == single id
                id = id[0];
            } else {
                idStr = '?id=' + id[0];
                for (var i=1; i < id.length; i++){
                    idStr += ',' + id[i];
                }
            }
        }
        // single id
        if (!idStr){
            idStr = '/' + id;
        }
        return systemUriPrefix + type + idStr;
    }.bind(this, type);
}

function getFunctions(rest, type, getType){
    var funcs =  {
        query: function(args, httpOptions){
            var optionsList = utils().buildOptionsList(url.query[type], args, httpOptions);
            optionsList.json = args;
            return utils().wrapResult(rest, 'post', optionsList);
        },

        register: function(obj, context, httpOptions){
            var optionsList = utils().buildOptionsList(url.register[type], null, httpOptions);
            optionsList.json = obj;
            return utils().wrapResult(rest, 'post', optionsList);
        },

        update: function(id, obj, context, httpOptions){
            var optionsList = utils().buildOptionsList(url.update[type](id), null, httpOptions);
            optionsList.json = obj;
            return utils().wrapResult(rest, 'put', optionsList);
        },
        remove: function(id, context, httpOptions){
			var optionsList = utils().buildOptionsList(url.remove[type](id), null, httpOptions);
            return utils().wrapResult(rest, 'delete', optionsList);
        }
    };
    funcs[getType] = function(id, httpOptions){
        var optionsList = utils().buildOptionsList(url.get[type](id), null, httpOptions);
        return utils().wrapResult(rest, 'get', optionsList);
    };
    if (type == 'places'){
        funcs['removeCascade'] = function(id, httpOptions){
            var optionsList = utils().buildOptionsList(url.remove[type](id) + cascade, null, httpOptions);
            return utils().wrapMCSResult(rest.deleteAsync(optionsList));
        };
    }
    return funcs;
}

module.exports = function(rest) {

    return Object.create({

        devices: Object.create(getFunctions(rest, 'devices', 'getDevice'),{}),
        places: Object.create(getFunctions(rest, 'places', 'getPlace'),{}),
        assets: Object.create(getFunctions(rest, 'assets', 'getAsset'),{})

    }, {});
}
