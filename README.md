Sinon-jQuery
============

[![Build Status](https://secure.travis-ci.org/jadu/sinon-jquery.png?branch=master)](http://travis-ci.org/jadu/sinon-jquery)

Sinon matcher for matching jQuery collections.

```javascript
npm install --save-dev sinon-jquery
```

Add to your test harness:
```javascript
var $ = require('jquery'),
    sinon = require('sinon'),
    sinonjQuery = require('sinon-jquery');
    
sinonjQuery.useWith(sinon, $);
```

We recommend you use this with [Sinon-Chai][] (`npm install --save-dev sinon-chai`)
```javascript
var chai = require('chai'),
    sinonChai = require('sinon-chai');

chai.use(sinonChai);
```

Then use as a matcher, eg. with Mocha+Chai+Sinon-Chai+Sinon-jQuery:

```javascript
it('should pass a <section> element to Display.show()', function () {
    this.handler.handle();

    expect(this.display.show).to.have.been.calledWith(sinon.match.jQuery('section'));
});
```

[Sinon-Chai]: https://github.com/domenic/sinon-chai
