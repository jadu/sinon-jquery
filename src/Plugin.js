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
 * Plugin wrapper
 */
export default class Plugin {
    /**
     * @param {class} Matcher
     */
    constructor(Matcher) {
        this.Matcher = Matcher;
    }

    /**
     * Installs the jQuery matcher into Sinon
     *
     * @param {sinon} sinon
     * @param {jQuery} jQuery
     */
    useWith(sinon, jQuery) {
        var matcher = new this.Matcher(sinon, jQuery);

        sinon.match.jQuery = function (what, description) {
            return matcher.match(what, description);
        };
    }
}
