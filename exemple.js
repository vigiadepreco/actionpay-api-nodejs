/**
 * Actionpay API interface for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see API Key - https://api.actionpay.ru/
 */

"use strict";

let Actionpay = require("./index.js"),
    actionpay = new Actionpay("api key");
    
actionpay.programs(function(err, result){
    console.log(result);
});
    
actionpay.report("2016-10-01", "2016-11-18", function(err, result){
    console.log(result);
});
    
actionpay.deeplink("http://www.anita.com.br/", 5784, (err, url) => {
    console.log(url);//http://apycomm.com/click/576852488b30a8ec7c8b4568/137793/subaccount/url=http%3A%2F%2Fwww.anita.com.br%2F
});

