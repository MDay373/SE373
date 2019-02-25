var register = function (Handlebars) {
    var helpers = {
        // put all of your helpers inside this object
        formatDate: function (stringDate) {
            if (typeof stringDate !== 'undefined' && stringDate !== '') {
                var year = stringDate.getFullYear();
                var month = (1 + stringDate.getMonth()).toString();
                month = month.length > 1 ? month : '0' + month;
                var day = (1 + stringDate.getDate()).toString();
                day = day.length > 1 ? day : '0' + day;
                return year + '-' + month + '-' + day;
            } else {
                return '';
            }
        }        
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);