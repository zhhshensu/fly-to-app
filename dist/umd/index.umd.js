
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.FlyToApp = factory());
})(this, (function () { 'use strict';

    function checkOs() {
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.match(/Android/i) != null;
        var isIOS = ua.match(/(iPhone|iPod|iPad|Mac OS)/i) != null;
        var isIOS9plus = isIOS &&
            ua.indexOf("os 8") == -1 &&
            ua.indexOf("os 7") == -1 &&
            ua.indexOf("os 6") == -1 &&
            ua.indexOf("os 5") == -1;
        var qqBrower = ua.indexOf("mqqbrowser") > -1 &&
            ua.indexOf("qq/") == -1 &&
            ua.indexOf("micromessenger/") == -1;
        return {
            ua: ua,
            isAndroid: isAndroid,
            isIOS: isIOS,
            isIOS9plus: isIOS9plus,
            qqBrower: qqBrower,
        };
    }
    function openByIframe(baseUrl) {
        var ifr = document.createElement("iframe");
        ifr.src = baseUrl;
        ifr.style.display = "none";
        document.body.appendChild(ifr);
        setTimeout(function () {
            document.body.removeChild(ifr);
        }, 2000);
    }
    function openByUrl(baseUrl) {
        var _a = checkOs(), isIOS = _a.isIOS, isIOS9plus = _a.isIOS9plus;
        if (isIOS) {
            if (isIOS9plus) {
                location.href = baseUrl;
            }
            else {
                openByIframe(baseUrl);
            }
        }
        else {
            location.href = baseUrl;
        }
    }
    /**
     *
     * @param {String} baseUrl
     * @param {Function} cb
     */
    function openApp(options) {
        var _a = options.source, source = _a === void 0 ? "" : _a, _b = options.target, target = _b === void 0 ? "" : _b, iosBrowserUser = options.iosBrowserUser, androidBrowserUser = options.androidBrowserUser, isApp = options.isApp, cb = options.cb;
        if (!source) {
            throw new Error("source is required !");
        }
        if (isApp && !target) {
            throw new Error("The page is in app, target is required !");
        }
        var ua = navigator.userAgent.toLowerCase();
        var isIOS = checkOs().isIOS;
        var iosToBrowserUser = iosBrowserUser || "micromessenger,weibo,mailapp,qq/";
        var androidToBrowserUser = androidBrowserUser || "micromessenger,weibo,qq/";
        var isIosToBrower = iosToBrowserUser.split(",").filter(function (l) { return ua.indexOf(l) > -1; })
            .length > 0;
        var isAndroidToBrowser = androidToBrowserUser.split(",").filter(function (l) { return ua.indexOf(l) > -1; }).length >
            0;
        if (isIOS) {
            if (isApp) {
                location.href = target;
                return;
            }
            if (isIosToBrower) {
                cb && cb(checkOs());
                return;
            }
            openByUrl(source);
        }
        else {
            if (isApp) {
                location.href = target;
                return;
            }
            if (isAndroidToBrowser) {
                cb && cb(checkOs());
                return;
            }
            openByUrl(source);
        }
    }

    var index = { checkOs: checkOs, openApp: openApp };

    return index;

}));
