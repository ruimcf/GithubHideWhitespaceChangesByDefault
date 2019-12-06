// ==UserScript==
// @name         Github HideWhitespaceChanges by default
// @namespace    https://github.com/
// @version      0.1
// @description  Turn on Github's hide whitespace changes feature when reviewing files of a PR
// @author       Rui Fonseca
// @website      https://github.com/ruimcf
// @include      https://github.com/*/*/pull/*
// @include      https://github.com/*/*/pull/*/*
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @grant        none
// ==/UserScript==

/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function() {
    'use strict';

    const checkUrl = () => {
        const currentUrl = new URL(document.location.href);

        const reviewingFiles = /\/.*\/.*\/pull\/.*\/files.*/;
        const isReviewingFiles = reviewingFiles.test(currentUrl.pathname);

        if (!isReviewingFiles) {
            return;
        }

        const currentWhitespaceSetting = currentUrl.searchParams.get('w');

        // Don't change setting if it is already defined
        if (currentWhitespaceSetting !== null) {
            return;
        }

        clearInterval(intervalID);

        currentUrl.searchParams.set('w', 1);
        location.href = currentUrl.href;
    }

    // We need to have a poller because when opening a PR and navigating to the files tab does not reload the page
    var intervalID = setInterval(checkUrl, 50);

    checkUrl();
})();
