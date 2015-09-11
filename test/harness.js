/**
 * Sinon-jQuery
 *
 * Sinon matcher for matching jQuery collections.
 *
 * Copyright (c) Jadu
 *
 * Released under the MIT license
 * https://github.com/jadu/sinon-jquery/blob/master/LICENSE.txt
 */

'use strict';

import _ from 'lodash';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

function patchStubInstanceForES6() {
    function getAllPropertyNames(object) {
        var names = Object.getOwnPropertyNames(object);

        if (Object.getPrototypeOf(object) !== Object.prototype) {
            [].push.apply(names, getAllPropertyNames(Object.getPrototypeOf(object)));
        }

        return _.uniq(names);
    }

    // Patch sinon.createStubInstance(...) to add support for ES6 classes (members are non-enumerable)
    sinon.createStubInstance = function (Class, methodStubReturnValues) {
        var object = Object.create(Class.prototype),
            properties = getAllPropertyNames(object);

        properties.forEach(function (name) {
            if (object[name]) {
                sinon.stub(object, name);
            }
        });

        _.each(methodStubReturnValues, function (returnValue, name) {
            object[name].returns(returnValue);
        });

        return object;
    };
}

patchStubInstanceForES6();
