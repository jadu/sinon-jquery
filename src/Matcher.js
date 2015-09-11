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

/**
 * Sinon matcher that supports jQuery collections.
 */
export default class Matcher {
    constructor(sinon, jQuery) {
        this.jQuery = jQuery;
        this.sinon = sinon;
    }

    match($against, description) {
        var matcher = this;

        return matcher.sinon.match(
            function ($what) {
                // Ensure $what is cast to a jQuery collection so we can use the `.is(...)` method
                // (if already a collection then will be passed through)
                return matcher.jQuery($what).is($against);
            },
            description
        );
    }
}
