# Actionpay API

[![npm package](https://nodei.co/npm/actionpay-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/actionpay-api/)

API integration with Actionpay

## Install

```bash
$ npm install actionpay-api
```

## Get Api Key

* Create account - https://actionpay.net/br-pt/content/page:webmaster
* API Key - https://api.actionpay.ru/

## Usage

```js
"use strict";

let Actionpay = require("./index.js"),
    actionpay = new Actionpay("api key", "source id");

actionpay.programs(function(err, result){
    console.log(result);
});


actionpay.coupons("<ID>", function(err, result){
    console.log(result);
});

actionpay.report("2016-10-01", "2016-11-18", function(err, result){
    console.log(result);
});

actionpay.reportdetails("2016-10-01", "2016-11-18", function(err, result){
    console.log(result);
});

actionpay.deeplink("http://www.anita.com.br/", 5784, (err, url) => {
    console.log(url);//http://apycomm.com/click/576852488b30a8ec7c8b4568/137793/subaccount/url=http%3A%2F%2Fwww.anita.com.br%2F
});
```
