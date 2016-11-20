"use strict";

const url = require("url"),
      request = require("request");

module.exports = function(token){
    return {
        /**
         * Function to generate the API request
         *
         * @param string URL 
         * @param function cb
         */
        getinapi: function(URL, cb) {   
            request(URL, (error, response, body) => { 
                if(body)
                    body = JSON.parse(body);
                
                cb(error, body); 
            });
        },
        
        /**
         * Function to generate application link
         *
         * @see http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters
         * @param string URLbase
         * @param object params
         * @return string
         */
        createurl: function(URLbase, params) {
            let paramsStr = Object.keys(params).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
            }).join('&');

            return URLbase + ((URLbase.indexOf("?") >= 0) ? "" : "?") + paramsStr;
        },
        
        /**
         * Function to encode URL
         * 
         * @see http://locutus.io/php/url/urlencode/
         * @param str
         * @return str
         */
        urlencode: function(str){
            str = (str + '');
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
        },
        
        /**
         * Get advertiser programs
         *
         * @param function cb
         */
        programs: function(cb) {
            this.getinapi("http://actionpay.ru/ru/apiWmMyOffers/?key="+token+"&format=json&active=1", cb);
        },
        
        /**
         * Get coupons, including their tracking links
         * 
         * @param function cb
         */
        /*coupons: function(cb){            
            this.getinapi("http://actionpay.ru/ru/apiWmNotices/?key=KEY&format=xml&page=2", function(err, result){
                
            });
        },*/
        
        /**
         * Returns basic statistics of clicks, views, leads and sales
         * 
         * @param string datestart Query start date in AAAA-MM-DD format
         * @param string dateend Query end date in AAAA-MM-DD format
         * @param function cb
         */
        report: function(datestart, dateend, cb){
            this.getinapi("http://actionpay.net/ru/apiWmStats/?key="+token+"&from="+datestart+"&till="+dateend+"&group=date", cb);
        },
        
        /**
         * Create tracking links
         * 
         * @param string url
         * @param integer progid
         * @return void
         */
        deeplink: function(url, offerid, cb){
            var _this = this;
            
            request("http://actionpay.net/ru/apiWmLinks/?key=" + token + "&format=json&offer=" + offerid, (error, response, body) => { 
                if(error){
                    cb(error, null);
                }
                else{                    
                    var contentsJSON = JSON.parse(body);
                            
                    if(contentsJSON.error){
                        if(contentsJSON.error.code == 403)
                            cb({"msg": "No authorization in the program."}, null);
                        else
                            cb({"msg": "Invalid link to this program."}, null);
                    }
                    else{
                        var p = false;
                        
                        for(var key2 in contentsJSON.result.links){
                            if(/url\=/img.test(contentsJSON.result.links[key2].url)){
                                p = true;
                                cb(false, contentsJSON.result.links[key2].url.replace("example.com", _this.urlencode(url)));
                                break;
                            }
                        }
                        
                        if(!p)
                            cb({"msg": "Invalid link to this program."}, null);
                    }
                }
            });
        }
    }
}
