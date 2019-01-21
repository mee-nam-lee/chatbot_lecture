var ums = require('./ums');
var utils = require("./utils");

var notificationURI =  '/mobile/system/notifications/notifications/';

module.exports = function(rest, routing) {

    return Object.create({

        post: function(notification, context, opts, httpOptions){
			var optionsList = buildOptionsList(notificationURI, context, opts, httpOptions);
			optionsList.json = notification;
			return utils().wrapResult(rest, 'post', optionsList);
        },

		getById: function(id, context, opts, httpOptions){
			var optionsList = buildOptionsList(notificationURI + id, context, opts, httpOptions);
			optionsList.json = true;
			return utils().wrapResult(rest, 'get', optionsList);
		},

		remove: function(id, context, opts, httpOptions){
			var optionsList = buildOptionsList(notificationURI + id, context, opts, httpOptions);
			optionsList.json = true;
			return utils().wrapResult(rest, 'delete', optionsList);
		},

		getAll: function(context, opts, httpOptions){
			var optionsList = buildOptionsList(notificationURI, context, opts, httpOptions);
			optionsList.json = true;
			return utils().wrapResult(rest, 'get', optionsList);
		},
	}, {});

	function mbeEquals(a, b) {
	    return (a.name === b.name) && (a.version === b.version);
	}

        function buildOptionsList(uri, context, opts, httpOptions){
                var optionsList = utils().buildOptionsList(uri, opts, httpOptions);
                if (context && context.mbeId){
                	optionsList.headers['Oracle-Mobile-Backend-Id'] = context.mbeId;
		}
		if (opts){
                        if (!optionsList.qs){
                                optionsList.qs = {};
                        }
                        if (opts.q){
                            optionsList.qs.q = opts.q;
                        }
                        if (opts.status){
                                optionsList.qs.status = opts.status;
                        }
                        if (opts.tag){
                                optionsList.qs.tag = opts.tag;
                        }
                        if (opts.sendOnOrAfter){
                                optionsList.qs.sendOnOrAfter = opts.sendOnOrAfter;
                        }
                        if (opts.sendOnOrBefore){
                                optionsList.qs.sendOnOrBefore = opts.sendOnOrBefore;
                        }
                        if (opts.createdOnOrAfter){
                                optionsList.qs.createdOnOrAfter = opts.createdOnOrAfter;
                        }
                        if (opts.createdOnOrBefore){
                                optionsList.qs.createdOnOrBefore = opts.createdOnOrBefore;
                        }
                        if (opts.processedOnOrAfter){
                                optionsList.qs.processedOnOrAfter = opts.processedOnOrAfter;
                        }
                        if (opts.processedOnOrBefore){
                                optionsList.qs.processedOnOrBefore = opts.processedOnOrBefore;
                        }
                        if (opts.orderBy){
                                optionsList.qs.orderBy = opts.orderBy;
                        }
                        if (opts.offset){
                                optionsList.qs.offset = opts.offset;
                        }
                        if (opts.limit){
                                optionsList.qs.limit = opts.limit;
                        }
                }
                return optionsList;
        }

}

