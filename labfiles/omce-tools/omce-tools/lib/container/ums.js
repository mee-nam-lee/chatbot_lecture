var utils = require("./utils");

module.exports = function(rest) {

    return Object.create({

        getMe: function(httpOptions){
			var optionsList = buildOptionsList('/mobile/platform/users/me', null, httpOptions);
			optionsList.json = true;

		    return utils().wrapResult(rest, 'get', optionsList);
        },

        getUser: function(opts, httpOptions){
			var user = '~';
			if (opts && opts.username){
				if (opts.username == 'me'){
					throw new Error('me is reserved for IDCS user. Use ums.getCurrentUser to access it.');
				}
				user = opts.username;
			}
			var optionsList = buildOptionsList('/mobile/platform/users/' + user, opts, httpOptions);
			optionsList.json = true;

		    return utils().wrapResult(rest, 'get', optionsList);
        },

        getUserExtended: function(opts, httpOptions){
			var user = '~';
			if (opts && opts.username){
				if (opts.username == 'me'){
					throw new Error('me is reserved for IDCS user. Use ums.getCurrentUser to access it.');
				}
				user = opts.username;
			}
			var optionsList = buildOptionsList('/mobile/platform/extended/users/' + user, opts, httpOptions);
			optionsList.json = true;

		    return utils().wrapResult(rest, 'get', optionsList);
        },

        updateUser: function(newFields, opts, httpOptions){
			var user = '~';
			if (opts && opts.username){
				if (opts.username == 'me'){
					throw new Error('me is reserved for IDCS user. Use ums.getCurrentUser to access it.');
				}
				user = opts.username;
			}
			var optionsList = buildOptionsList('/mobile/platform/users/' + user, opts, httpOptions);
			optionsList.json = newFields;
		    return utils().wrapResult(rest, 'put', optionsList);
        }
	}, {});
	function buildOptionsList(uri, opts, httpOptions){
		var optionsList = utils().buildOptionsList(uri, opts, httpOptions);
		// query parameters
		if (opts){
			if (!optionsList.qs){
				optionsList.qs = {};
			}
			
			if (opts.fields){
				optionsList.qs.fields = opts.fields;
			}
		}
		return optionsList;
	}

}
