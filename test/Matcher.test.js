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

describe('Matcher', function () {
    beforeEach(function () {
        this.$collection = $('<div></div>');
        this.func = sinon.spy();
        this.stubSinon = {
            match: sinon.spy(sinon.match.bind(sinon))
        };

        this.matcher = new Matcher(this.stubSinon, $);
    });

    describe('match()', function () {
        _.each(['My description', 'Your description'], function (description) {
            it('should pass the specified description through to Sinon when "' + description + '"', function () {
                this.matcher.match($('div'), description);

                expect(this.stubSinon.match).to.have.been.calledWith(sinon.match.any, description);
            });
        });

        describe('when comparing jQuery collection with element to another collection with element', function () {
            it('should match when the two arguments are the same jQuery collection object', function () {
                this.func(this.$collection);

                expect(this.func).to.have.been.calledWith(this.matcher.match(this.$collection));
            });

            it('should match when the two arguments are different jQuery collection objects with the same element', function () {
                this.func($(this.$collection[0]));

                expect(this.func).to.have.been.calledWith(this.matcher.match(this.$collection));
            });

            it('should not match when the two arguments are jQuery collection objects with different elements', function () {
                this.func($('<div></div>'));

                expect(this.func).not.to.have.been.calledWith(this.matcher.match(this.$collection));
            });
        });

        describe('when comparing an element against a tag selector', function () {
            it('should match when the element has the correct tag name', function () {
                this.func($('<section></section>'));

                expect(this.func).to.have.been.calledWith(this.matcher.match('section'));
            });

            it('should not match when the element has another tag name', function () {
                this.func($('<section></section>'));

                expect(this.func).not.to.have.been.calledWith(this.matcher.match('div'));
            });
        });
    });
});
