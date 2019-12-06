// ==UserScript==
// @name         Github HideWhitespaceChanges by default
// @namespace    https://github.com/
// @version      0.1
// @description  Turn on Github's hide whitespace changes feature when reviewing files of a PR
// @author       Rui Fonseca
// @website      https://github.com/ruimcf
// @include      https://github.com/*/*/pull/*
// @include      https://github.com/*/*/pull/*/*
// @grant        none
// ==/UserScript==

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

        currentUrl.searchParams.set('w', 1);
        clearInterval(intervalID);
        location.href = currentUrl.href;
    }

    // We need to have a poller because when opening a PR and navigating to the files tab does not reload the page
    var intervalID = setInterval(checkUrl, 50);

    checkUrl();
})();