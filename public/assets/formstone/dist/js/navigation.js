/*! formstone v1.3.0 [navigation.js] 2016-10-23 | GPL-3.0 License | formstone.it */

console.log("Very start of navigation.js");

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery", "./swap"], a) : a(jQuery, Formstone)
}(function(a, b) {
    "use strict";

    function c() {
        A = a("html, body")
    }

    function d(b) {
        b.handleGuid = x.handle + b.guid, b.isToggle = "toggle" === b.type, b.open = !1, b.isToggle && (b.gravity = "");
        var c = x.base,
            d = [c, b.type].join("-"),
            e = b.gravity ? [d, b.gravity].join("-") : "",
            f = [b.rawGuid, b.theme, b.customClass].join(" ");
        b.handle = this.data(v + "-handle"), b.content = this.data(v + "-content"), b.handleClasses = [x.handle, x.handle.replace(c, d), e ? x.handle.replace(c, e) : "", b.handleGuid, f].join(" "), b.thisClasses = [x.nav.replace(c, d), e ? x.nav.replace(c, e) : "", f], b.contentClasses = [x.content.replace(c, d), f].join(" "), b.contentClassesOpen = [e ? x.content.replace(c, e) : "", x.open].join(" "), b.$nav = this.addClass(b.thisClasses.join(" ")).attr("role", "navigation"), b.$handle = a(b.handle).addClass(b.handleClasses), b.$content = a(b.content).addClass(b.contentClasses), b.$animate = a().add(b.$nav).add(b.$content), s(b), b.navTabIndex = b.$nav.attr("tabindex"), b.$nav.attr("tabindex", -1), b.id = this.attr("id"), b.id ? b.ariaId = b.id : (b.ariaId = b.rawGuid, this.attr("id", b.ariaId)), b.$handle.attr("data-swap-target", b.dotGuid).attr("data-swap-linked", b.handleGuid).attr("data-swap-group", x.base).attr("tabindex", 0).on("activate.swap" + b.dotGuid, b, m).on("deactivate.swap" + b.dotGuid, b, n).on("enable.swap" + b.dotGuid, b, o).on("disable.swap" + b.dotGuid, b, p).on(y.focus + b.dotGuid, b, j).on(y.blur + b.dotGuid, b, k).fsSwap({
            maxWidth: b.maxWidth,
            classes: {
                target: b.dotGuid,
                enabled: w.enabled,
                active: w.open,
                raw: {
                    target: b.rawGuid,
                    enabled: x.enabled,
                    active: x.open
                }
            }
        }), b.$handle.is("a, button") || b.$handle.on(y.keyPress + b.dotGuid, b, l)
    }

    function e(a) {
        a.$content.removeClass([a.contentClasses, a.contentClassesOpen].join(" ")).off(y.namespace), a.$handle.removeAttr("aria-controls").removeAttr("aria-expanded").removeAttr("data-swap-target").removeData("swap-target").removeAttr("data-swap-linked").removeAttr("data-swap-group").removeData("swap-linked").removeData("tabindex").removeClass(a.handleClasses).off(a.dotGuid).html(a.originalLabel).fsSwap("destroy"), a.$nav.attr("tabindex", a.navTabIndex), t(a), r(a), this.removeAttr("aria-hidden").removeClass(a.thisClasses.join(" ")).off(y.namespace), this.attr("id") === a.rawGuid && this.removeAttr("id")
    }

    function f(a) {
        a.$handle.fsSwap("activate")
    }

    function g(a) {
        a.$handle.fsSwap("deactivate")
    }

    function h(a) {
        a.$handle.fsSwap("enable")
    }

    function i(a) {
        a.$handle.fsSwap("disable")
    }

    function j(a) {
        a.data.$handle.addClass(x.focus)
    }

    function k(a) {
        a.data.$handle.removeClass(x.focus)
    }

    function l(a) {
        var b = a.data;
        13 !== a.keyCode && 32 !== a.keyCode || (z.killEvent(a), b.$handle.trigger(y.raw.click))
    }

    function m(a) {
        if (!a.originalEvent) {
            var b = a.data;
            b.open || (b.$el.trigger(y.open).attr("aria-hidden", !1), b.$content.addClass(b.contentClassesOpen).one(y.click, function() {
                g(b)
            }), b.$handle.attr("aria-expanded", !0), b.label && b.$handle.html(b.labels.open), q(b), b.open = !0, b.$nav.focus())
        }
    }

    function n(a) {
        if (!a.originalEvent) {
            var b = a.data;
            b.open && (b.$el.trigger(y.close).attr("aria-hidden", !0), b.$content.removeClass(b.contentClassesOpen).off(y.namespace), b.$handle.attr("aria-expanded", !1), b.label && b.$handle.html(b.labels.closed), r(b), b.open = !1, b.$el.focus())
        }
    }

    function o(a) {
        var b = a.data;
        b.$el.attr("aria-hidden", !0), b.$handle.attr("aria-controls", b.ariaId).attr("aria-expanded", !1), b.$content.addClass(x.enabled), setTimeout(function() {
            b.$animate.addClass(x.animated)
        }, 0), b.label && b.$handle.html(b.labels.closed)
    }

    function p(a) {
        var b = a.data;
        b.$el.removeAttr("aria-hidden"), b.$handle.removeAttr("aria-controls").removeAttr("aria-expanded"), b.$content.removeClass(x.enabled, x.animated), b.$animate.removeClass(x.animated), t(b), r(b)
    }

    function q(a) {
        a.isToggle || A.addClass(x.lock)
    }

    function r(a) {
        a.isToggle || A.removeClass(x.lock)
    }

    function s(a) {
        if (a.label)
            if (a.$handle.length > 1) {
                a.originalLabel = [];
                for (var b = 0, c = a.$handle.length; b < c; b++) a.originalLabel[b] = a.$handle.eq(b).html()
            } else a.originalLabel = a.$handle.html()
    }

    function t(a) {
        if (a.label)
            if (a.$handle.length > 1)
                for (var b = 0, c = a.$handle.length; b < c; b++) a.$handle.eq(b).html(a.originalLabel[b]);
            else a.$handle.html(a.originalLabel)
    }
    var u = b.Plugin("navigation", {
            widget: !0,
            defaults: {
                customClass: "",
                gravity: "left",
                label: !0,
                labels: {
                    closed: "Menu",
                    open: "Close"
                },
                maxWidth: "980px",
                theme: "fs-light",
                type: "toggle"
            },
            classes: ["handle", "nav", "content", "animated", "enabled", "focus", "open", "toggle", "push", "reveal", "overlay", "left", "right", "lock"],
            events: {
                open: "open",
                close: "close"
            },
            methods: {
                _setup: c,
                _construct: d,
                _destruct: e,
                open: f,
                close: g,
                enable: h,
                disable: i
            }
        }),
        v = u.namespace,
        w = u.classes,
        x = w.raw,
        y = u.events,
        z = u.functions,
        A = null
});