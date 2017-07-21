/**
 * Created by Reza on 7/19/2017.
 */

(function () {
    var game = this.minesweeperGame = this.minesweeperGame || {};
    var nameOffset, verOffset;

    var browser = game.browser = {
        name: navigator.appName,
        fullVersion: '' + parseFloat(navigator.appVersion),
        userAgent: navigator.userAgent,
        getFullVersion: function () {
            var majorVersion = parseInt('' + this.fullVersion, 10);
            if (isNaN(majorVersion)) {
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            return majorVersion;
        },
        create: function () {
            if ((verOffset = this.userAgent.indexOf('Opera')) !== -1) {
                return operaBrowser;
            } else if ((verOffset = this.userAgent.indexOf('MSIE')) !== -1) {
                return ieBrowser;
            } else if ((verOffset = this.userAgent.indexOf('Chrome')) !== -1) {
                return chromeBrowser;
            } else if ((verOffset = this.userAgent.indexOf('Safari')) !== -1) {
                return safariBrowser;
            } else if ((verOffset = this.userAgent.indexOf('Firefox')) !== -1) {
                return mozillaBrowser;
            } else if ((nameOffset = this.userAgent.lastIndexOf(' ') + 1)
                < (verOffset = this.userAgent.lastIndexOf('/'))) {
                return unknownBrowser;
            }
        }
    };

    var operaBrowser = game.operaBrowser = Object.create(browser);
    operaBrowser.calc = function () {
        browser.name = 'Opera';
        browser.fullVersion = browser.userAgent.substring(verOffset + 6);

        if ((verOffset = browser.userAgent.indexOf('Version')) !== -1) {
            browser.fullVersion = browser.userAgent.substring(verOffset + 8);
        }
    };
    operaBrowser.isCompatible = function () {
        return (browser.getFullVersion() >= 11);
    };

    var ieBrowser = game.ieBrowser = Object.create(browser);
    ieBrowser.calc = function () {
        browser.name = 'Microsoft Internet Explorer';
        browser.fullVersion = browser.userAgent.substring(verOffset + 5);
    };
    ieBrowser.isCompatible = function () {
        return (browser.getFullVersion() >= 10);
    };

    var chromeBrowser = game.chromeBrowser = Object.create(browser);
    chromeBrowser.calc = function () {
        browser.name = 'Chrome';
        browser.fullVersion = browser.userAgent.substring(verOffset + 7);
    };
    chromeBrowser.isCompatible = function () {
        return (browser.getFullVersion() >= 2);
    };

    var safariBrowser = game.safariBrowser = Object.create(browser);
    safariBrowser.calc = function () {
        browser.name = 'Safari';
        browser.fullVersion = browser.userAgent.substring(verOffset + 7);

        if ((verOffset = browser.userAgent.indexOf('Version')) !== -1) {
            browser.fullVersion = browser.userAgent.substring(verOffset + 8);
        }
    };
    safariBrowser.isCompatible = function () {
        return (browser.getFullVersion() >= 3.3);
    };

    var mozillaBrowser = game.mozillaBrowser = Object.create(browser);
    mozillaBrowser.calc = function () {
        browser.name = 'Firefox';
        browser.fullVersion = browser.userAgent.substring(verOffset + 8);

    };
    mozillaBrowser.isCompatible = function () {
        return (browser.getFullVersion() >= 4);
    };

    var unknownBrowser = game.unknownBrowser = Object.create(browser);
    unknownBrowser.calc = function () {
        browser.name = browser.userAgent.substring(nameOffset, verOffset);
        browser.fullVersion = browser.userAgent.substring(verOffset + 1);

        if (browser.name.toLowerCase() === browser.name.toUpperCase()) {
            browser.name = navigator.appName;
        }
    };
    unknownBrowser.isCompatible = function () {
        return (this.getFullVersion() >= 2);
    };
})();