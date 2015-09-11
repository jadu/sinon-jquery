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
import $ from 'jquery';
import {expect} from 'chai';
import sinon from 'sinon';
import Matcher from '../src/Matcher';
import Plugin from '../src/Plugin';

describe('Plugin', function () {
    beforeEach(function () {
        this.stubSinon = {
            match: sinon.stub()
        };
        this.Matcher = sinon.stub();
        this.Matcher.prototype = sinon.createStubInstance(Matcher);

        this.plugin = new Plugin(this.Matcher);
    });

    describe('useWith()', function () {
        it('should add a method called "jQuery" to sinon.match', function () {
            this.plugin.useWith(this.stubSinon, $);

            expect(this.stubSinon.match.jQuery).to.be.a('function');
        });

        it('should pass Sinon through to the Matcher', function () {
            this.plugin.useWith(this.stubSinon, $);

            expect(this.Matcher).to.have.been.calledWith(sinon.match.same(this.stubSinon));
        });

        it('should pass jQuery through to the Matcher', function () {
            this.plugin.useWith(this.stubSinon, $);

            expect(this.Matcher).to.have.been.calledWith(sinon.match.any, sinon.match.same($));
        });

        describe('the method added', function () {
            beforeEach(function () {
                this.plugin.useWith(this.stubSinon, $);
            });

            it('should call Matcher.match(...)', function () {
                this.stubSinon.match.jQuery('div');

                expect(this.Matcher.prototype.match).to.have.been.calledOnce;
            });

            _.each(['section', 'div.thing'], function (selector) {
                it('should pass the selector through to Matcher.match(...) when "' + selector + '"', function () {
                    this.stubSinon.match.jQuery(selector);

                    expect(this.Matcher.prototype.match).to.have.been.calledWith(selector);
                });
            });

            _.each(['My desc', 'Another desc'], function (description) {
                it('should pass the description through to Matcher.match(...) when "' + description + '"', function () {
                    this.stubSinon.match.jQuery('div', description);

                    expect(this.Matcher.prototype.match).to.have.been.calledWith(sinon.match.any, description);
                });
            });
        });
    });
});
