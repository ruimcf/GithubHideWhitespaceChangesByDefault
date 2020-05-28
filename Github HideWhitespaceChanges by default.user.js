// ==UserScript==
// @name         Github HideWhitespaceChanges by default
// @namespace    ruimcf
// @version      0.2
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


/* Modify history events to trigger our function */
history.pushState = (originalFn => (...args) => {
    const returnValue = originalFn.apply(this, ...args);
    window.dispatchEvent(new Event('pushState'));
    window.dispatchEvent(new Event('locationchange'));
    return returnValue;
})(history.pushState);

history.replaceState = (originalFn => (...args) => {
    const returnValue = originalFn.apply(this, ...args);
    window.dispatchEvent(new Event('replaceState'));
    window.dispatchEvent(new Event('locationchange'));
    return returnValue;
})(history.replaceState);

window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
});

const isInFileReviewPage = (currentUrl) => {
    const reviewPage = /\/.*\/.*\/pull\/.*\/files.*/;

    return reviewPage.test(currentUrl.pathname);
}

const turnOnHideWhiteSpaceChanges = () => {
    console.log("running func");
    const currentUrl = new URL(document.location.href);
    const whiteSpaceSetting = 'w';

    if(!isInFileReviewPage(currentUrl)){
        return;
    }

    const isSettingAlreadyConfigured = currentUrl.searchParams.get(whiteSpaceSetting) !== null

    if (isSettingAlreadyConfigured) {
        return;
    }

    currentUrl.searchParams.set(whiteSpaceSetting, 1);
    location.href = currentUrl.href;
};

window.addEventListener('locationchange', turnOnHideWhiteSpaceChanges)

turnOnHideWhiteSpaceChanges();
