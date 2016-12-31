/**
 * Actionpay API for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see API Key - https://api.actionpay.ru/
 */

"use strict";

const url = require("url"),
      request = require("request");

module.exports = function(token, source){
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
            this.getinapi("http://actionpay.net/en/apiWmMyOffers/?key=" + token + "&source=" + source + "&format=json&active=1", cb);
        },
                
        /**
         * Returns basic statistics of clicks, views, leads and sales by date
         * 
         * @param string datestart Query start date in AAAA-MM-DD format
         * @param string dateend Query end date in AAAA-MM-DD format
         * @param function cb
         */
        report: function(datestart, dateend, cb){
            this.getinapi("http://actionpay.net/en/apiWmStats/?key=" + token + "&from=" + datestart + "&till=" + dateend + "&source=" + source + "&group=date", cb);
        },
        
        /**
         * Return full statics of clicks, views, leads and sales by date without grouping
         * 
         * @param string datestart Query start date in AAAA-MM-DD format
         * @param string dateend Query end date in AAAA-MM-DD format
         * @param function cb
         */
        reportdetails: function(datestart, dateend, cb){
            this.getinapi("https://api.actionpay.net/en/apiWmStats/?key=" + token + "&from=" + datestart + "&till=" + dateend + "&source=" + source, cb);
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
            
            request("http://actionpay.net/en/apiWmLinks/?key=" + token + "&format=json&source=" + source + "&offer=" + offerid, (error, response, body) => { 
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
