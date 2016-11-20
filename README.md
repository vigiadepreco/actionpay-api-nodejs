# Actionpay API

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andrehrf/actionpay-api-nodejs/master/LICENSE)
[![npm version](https://badge.fury.io/js/actionpay-api.svg)](https://badge.fury.io/js/actionpay-api)

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

let Actionpay = require("actionpay-api"),
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
```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.