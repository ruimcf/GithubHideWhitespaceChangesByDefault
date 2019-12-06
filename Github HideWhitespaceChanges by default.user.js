// ==UserScript==
// @name         Github HideWhitespaceChanges by default
// @namespace    ruimcf
// @version      0.1
// @description  Turn on Github's hide whitespace changes feature when reviewing files of a PR
// @author       Rui Fonseca
// @website      https://github.com/ruimcf
// @include      https://github.com/*/*/pull/*
// @include      https://github.com/*/*/pull/*/*
// @license      MIT
// @grant        none
// ==/UserScript==

/**
  The MIT License (MIT)
  Copyright (c) 2019 ruimcf
  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/

function turnOnOption(){
    const currentUrl = new URL(document.location.href);

    const reviewPage = /\/.*\/.*\/pull\/.*\/files.*/;
    const isReviewing = reviewPage.test(currentUrl.pathname);

    if (!isReviewing) {
        return;
    }

    clearInterval(id);

    const currentWhitespaceSetting = currentUrl.searchParams.get('w');

    // Don't change setting if it is already defined
    if (currentWhitespaceSetting !== null) {
        return;
    }

    currentUrl.searchParams.set('w', 1);
    location.href = currentUrl.href;
};

// We need to have a poller because when opening the PR page
// and navigating to the files tab does not reload the page
var id = setInterval(turnOnOption, 50);

turnOnOption();
