!function (a) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = a() : "function" == typeof define && define.amd ? define([], a) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).pingpp = a()
}(function () {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i)return i(g, !0);
                    if (f)return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {exports: {}};
                b[g][0].call(k.exports, function (a) {
                    return e(b[g][1][a] || a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }

        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)e(d[g]);
        return e
    }({
        1: [function (a, b, c) {
            var d = {}.hasOwnProperty, e = a("./callbacks"), f = a("./utils");
            b.exports = {
                signAgreement: function (a) {
                    var b;
                    if ("string" == typeof a)try {
                        b = JSON.parse(a)
                    } catch (a) {
                        return e.innerAgreementCallback("fail", e.error("json_decode_fail", a)), !1
                    } else b = a;
                    if (void 0 === b)return e.innerAgreementCallback("fail", e.error("json_decode_fail")), !1;
                    if (!d.call(b, "object") || "agreement" !== b.object || !d.call(b, "channel") || !d.call(b, "credential") || "object" != typeof b.credential)return e.innerAgreementCallback("fail", e.error("invalid_object")), !1;
                    if (!d.call(b.credential, b.channel))return e.innerAgreementCallback("fail", e.error("invalid_credential")), !1;
                    var c, g = b.credential[b.channel];
                    return "string" == typeof g ? c = g : d.call(g, "credential") && "string" == typeof g.credential && (c = g.credential), void 0 === c ? (e.innerAgreementCallback("fail", e.error("invalid_credential")), !1) : (setTimeout(function () {
                        f.redirectTo(c)
                    }, 0), !0)
                }
            }
        }, {"./callbacks": 2, "./utils": 36}], 2: [function (a, b, c) {
            var d = a("./payment_elements.js");
            b.exports = {
                userCallback: void 0,
                urlReturnCallback: void 0,
                urlReturnChannels: ["alipay_pc_direct"],
                userAgreementCallback: void 0,
                innerCallback: function (a, b) {
                    "function" == typeof this.userCallback && (void 0 === b && (b = this.error()), this.userCallback(a, b), this.userCallback = void 0, d.clear())
                },
                error: function (a, b) {
                    return a = void 0 === a ? "" : a, b = void 0 === b ? "" : b, {msg: a, extra: b}
                },
                triggerUrlReturnCallback: function (a, b) {
                    "function" == typeof this.urlReturnCallback && this.urlReturnCallback(a, b)
                },
                shouldReturnUrlByCallback: function (a) {
                    return "function" == typeof this.urlReturnCallback && -1 !== this.urlReturnChannels.indexOf(a)
                },
                innerAgreementCallback: function (a, b) {
                    "function" == typeof this.userAgreementCallback && (void 0 === b && (b = this.error()), this.userAgreementCallback(a, b), this.userAgreementCallback = void 0)
                }
            }
        }, {"./payment_elements.js": 33}], 3: [function (a, b, c) {
            var d = a("../callbacks");
            b.exports = {
                PINGPP_NOTIFY_URL_BASE: "https://notify.pingxx.com/notify", handleCharge: function (a) {
                    var b = a.credential[a.channel];
                    b ? this.callpay(b) : d.innerCallback("fail", d.error("invalid_credential", "missing_alipay_lite"))
                }, alipayLiteEnabled: function () {
                    return "undefined" != typeof my && my.tradePay
                }, callpay: function (a) {
                    if (this.alipayLiteEnabled()) {
                        var b = {};
                        b.tradeNO = a, b.complete = function (a) {
                            9e3 == a.resultCode ? d.innerCallback("success") : 6001 == a.resultCode ? d.innerCallback("cancel", d.error("用户取消支付")) : d.innerCallback("fail", d.error("支付失败"))
                        }, my.tradePay(b)
                    } else console.log("请在支付宝小程序中打开")
                }, runTestMode: function (a) {
                    var b = "/charges/" + a.id;
                    my.httpRequest({
                        url: this.PINGPP_NOTIFY_URL_BASE + b + "?livemode=false", success: function (a) {
                            "success" == a.data ? d.innerCallback("success") : d.innerCallback("fail", d.error("testmode_notify_fail"))
                        }, fail: function () {
                            d.innerCallback("fail", d.error("network_err"))
                        }
                    })
                }
            }
        }, {"../callbacks": 2}], 4: [function (a, b, c) {
            var d = a("../utils"), e = {}.hasOwnProperty;
            b.exports = {
                ALIPAY_PC_DIRECT_URL: "https://mapi.alipay.com/gateway.do", handleCharge: function (a) {
                    var b = a.channel, c = a.credential[b], f = this.ALIPAY_PC_DIRECT_URL;
                    e.call(c, "channel_url") && (f = c.channel_url), e.call(c, "_input_charset") || e.call(c, "service") && "create_direct_pay_by_user" === c.service && (c._input_charset = "utf-8");
                    var g = d.stringifyData(c, b, !0);
                    d.redirectTo(f + "?" + g, b)
                }
            }
        }, {"../utils": 36}], 5: [function (a, b, c) {
            var d = {}.hasOwnProperty, e = a("../callbacks");
            b.exports = {
                handleCharge: function (a) {
                    var b = a.credential[a.channel];
                    d.call(b, "transaction_no") ? this.tradePay(b.transaction_no) : e.innerCallback("fail", e.error("invalid_credential", "missing_field_transaction_no"))
                }, ready: function (a) {
                    window.AlipayJSBridge ? a && a() : document.addEventListener("AlipayJSBridgeReady", a, !1)
                }, tradePay: function (a) {
                    this.ready(function () {
                        AlipayJSBridge.call("tradePay", {tradeNO: a}, function (a) {
                            "9000" == a.resultCode ? e.innerCallback("success") : "6001" == a.resultCode ? e.innerCallback("cancel", e.error(a.result)) : e.innerCallback("fail", e.error(a.result))
                        })
                    })
                }
            }
        }, {"../callbacks": 2}], 6: [function (a, b, c) {
            var d = a("../utils"), e = a("../mods"), f = {}.hasOwnProperty;
            b.exports = {
                ALIPAY_WAP_URL_OLD: "https://wappaygw.alipay.com/service/rest.htm",
                ALIPAY_WAP_URL: "https://mapi.alipay.com/gateway.do",
                handleCharge: function (a) {
                    var b = a.channel, c = a.credential[b], g = this.ALIPAY_WAP_URL;
                    f.call(c, "req_data") ? g = this.ALIPAY_WAP_URL_OLD : f.call(c, "channel_url") && (g = c.channel_url), f.call(c, "_input_charset") || (f.call(c, "service") && "alipay.wap.create.direct.pay.by.user" === c.service || f.call(c, "req_data")) && (c._input_charset = "utf-8");
                    var h = g + "?" + d.stringifyData(c, b, !0), i = e.getExtraModule("ap");
                    d.inWeixin() && void 0 !== i ? i.pay(h) : d.redirectTo(h, b)
                }
            }
        }, {"../mods": 32, "../utils": 36}], 7: [function (a, b, c) {
            var d = a("../utils"), e = a("../callbacks"), f = {}.hasOwnProperty;
            b.exports = {
                handleCharge: function (a) {
                    var b = a.channel, c = a.credential[b];
                    f.call(c, "url") ? d.redirectTo(c.url + "?" + d.stringifyData(c, b), b) : e.innerCallback("fail", e.error("invalid_credential", "missing_field:url"))
                }
            }
        }, {"../callbacks": 2, "../utils": 36}], 8: [function (a, b, c) {
            var d = a("../utils"), e = {}.hasOwnProperty;
            b.exports = {
                ALIPAY_PC_DIRECT_URL: "https://intlmapi.alipay.com/gateway.do", handleCharge: function (a) {
                    var b = a.channel, c = a.credential[b], f = this.ALIPAY_PC_DIRECT_URL;
                    e.call(c, "channel_url") && (f = c.channel_url), e.call(c, "_input_charset") || e.call(c, "service") && "create_forex_trade" === c.service && (c._input_charset = "utf-8");
                    var g = d.stringifyData(c, b, !0);
                    d.redirectTo(f + "?" + g, b)
                }
            }
        }, {"../utils": 36}], 9: [function (a, b, c) {
            var d = a("../utils"), e = a("../mods"), f = {}.hasOwnProperty;
            b.exports = {
                ALIPAY_WAP_URL: "https://intlmapi.alipay.com/gateway.do", handleCharge: function (a) {
                    var b = a.channel, c = a.credential[b], g = this.ALIPAY_WAP_URL;
                    f.call(c, "channel_url") && (g = c.channel_url), f.call(c, "_input_charset") || f.call(c, "service") && "create_forex_trade_wap" === c.service && (c._input_charset = "utf-8");
                    var h = g + "?" + d.stringifyData(c, b, !0), i = e.getExtraModule("ap");
                    d.inWeixin() && void 0 !== i ? i.pay(h) : d.redirectTo(h, b)
                }
            }
        }, {"../mods": 32, "../utils": 36}], 10: [function (a, b, c) {
            var d = a("../callbacks"), e = a("../utils"), f = a("../stash"), g = a("../mods"), h = {}.hasOwnProperty;
            b.exports = {
                PINGPP_NOTIFY_URL_BASE: "https://notify.pingxx.com/notify", handleCharge: function (a) {
                    for (var b = a.credential[a.channel], c = ["appId", "timeStamp", "nonceStr", "package", "signType", "paySign"], e = 0; e < c.length; e++)if (!h.call(b, c[e]))return void d.innerCallback("fail", d.error("invalid_credential", "missing_field_" + c[e]));
                    f.jsApiParameters = b, this.callpay()
                }, callpay: function () {
                    var a = this, b = g.getExtraModule("wx_jssdk");
                    if (void 0 !== b && b.jssdkEnabled())b.callpay(); else if ("undefined" == typeof WeixinJSBridge) {
                        var c = function () {
                            a.jsApiCall()
                        };
                        document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", c, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", c), document.attachEvent("onWeixinJSBridgeReady", c))
                    } else this.jsApiCall()
                }, jsApiCall: function () {
                    h.call(f, "jsApiParameters") && WeixinJSBridge.invoke("getBrandWCPayRequest", f.jsApiParameters, function (a) {
                        delete f.jsApiParameters, "get_brand_wcpay_request:ok" == a.err_msg ? d.innerCallback("success") : "get_brand_wcpay_request:cancel" == a.err_msg ? d.innerCallback("cancel") : d.innerCallback("fail", d.error("wx_result_fail", a.err_msg))
                    })
                }, runTestMode: function (a) {
                    if (confirm("模拟付款？")) {
                        var b = "/charges/" + a.id;
                        e.request(this.PINGPP_NOTIFY_URL_BASE + b + "?livemode=false", "GET", null, function (a, b) {
                            if (b >= 200 && b < 400 && "success" == a)d.innerCallback("success"); else {
                                var c = "http_code:" + b + ";response:" + a;
                                d.innerCallback("fail", d.error("testmode_notify_fail", c))
                            }
                        }, function () {
                            d.innerCallback("fail", d.error("network_err"))
                        })
                    }
                }
            }
        }, {"../callbacks": 2, "../mods": 32, "../stash": 34, "../utils": 36}], 11: [function (a, b, c) {
            var d = a("./commons/redirect_base");
            b.exports = {
                handleCharge: function (a) {
                    d.handleCharge(a)
                }
            }
        }, {"./commons/redirect_base": 14}], 12: [function (a, b, c) {
            var d = a("../utils"), e = {}.hasOwnProperty;
            b.exports = {
                handleCharge: function (a) {
                    var b, c = a.channel, f = a.credential[c];
                    e.call(f, "channel_url") && (b = f.channel_url, delete f.channel_url), d.formSubmit(b, "post", f)
                }
            }
        }, {"../utils": 36}], 13: [function (a, b, c) {
            var d = a("../utils"), e = {}.hasOwnProperty;
            b.exports = {
                CMB_WALLET_URL: "https://netpay.cmbchina.com/netpayment/BaseHttp.dll?MB_EUserPay",
                handleCharge: function (a) {
                    var b = a.credential[a.channel], c = this.CMB_WALLET_URL;
                    e.call(b, "ChannelUrl") && (c = b.ChannelUrl, delete b.ChannelUrl), e.call(b, "channelVersion") && delete b.channelVersion, d.formSubmit(c, "post", b)
                }
            }
        }, {"../utils": 36}], 14: [function (a, b, c) {
            var d = a("../../utils"), e = a("../../callbacks"), f = {}.hasOwnProperty;
            b.exports = {
                handleCharge: function (a) {
                    var b, c = a.credential[a.channel];
                    if ("string" == typeof c)b = c; else {
                        if (!f.call(c, "url"))return void e.innerCallback("fail", e.error("invalid_credential", "credential format is incorrect"));
                        b = c.url
                    }
                    d.redirectTo(b, a.channel)
                }
            }
        }, {"../../callbacks": 2, "../../utils": 36}], 15: [function (a, b, c) {
            var d = a("../utils");
            b.exports = {
                CP_B2B_URL: "https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0",
                handleCharge: function (a) {
                    var b = a.credential[a.channel];
                    d.formSubmit(this.CP_B2B_URL, "post", b)
                }
            }
        }, {"../utils": 36}], 16: [function (a, b, c) {
            var d = a("../../stash"), e = {}.hasOwnProperty;
            !function () {
                var a = {}, c = {};
                c.PADCHAR = "=", c.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c.makeDOMException = function () {
                    try {
                        return new DOMException(DOMException.INVALID_CHARACTER_ERR)
                    } catch (b) {
                        var a = new Error("DOM Exception 5");
                        return a.code = a.number = 5, a.name = a.description = "INVALID_CHARACTER_ERR", a.toString = function () {
                            return "Error: " + a.name + ": " + a.message
                        }, a
                    }
                }, c.getbyte64 = function (a, b) {
                    var d = c.ALPHA.indexOf(a.charAt(b));
                    if (-1 === d)throw c.makeDOMException();
                    return d
                }, c.decode = function (a) {
                    a = "" + a;
                    var b, d, e, f = c.getbyte64, g = a.length;
                    if (0 === g)return a;
                    if (g % 4 != 0)throw c.makeDOMException();
                    b = 0, a.charAt(g - 1) === c.PADCHAR && (b = 1, a.charAt(g - 2) === c.PADCHAR && (b = 2), g -= 4);
                    var h = [];
                    for (d = 0; d < g; d += 4)e = f(a, d) << 18 | f(a, d + 1) << 12 | f(a, d + 2) << 6 | f(a, d + 3), h.push(String.fromCharCode(e >> 16, e >> 8 & 255, 255 & e));
                    switch (b) {
                        case 1:
                            e = f(a, d) << 18 | f(a, d + 1) << 12 | f(a, d + 2) << 6, h.push(String.fromCharCode(e >> 16, e >> 8 & 255));
                            break;
                        case 2:
                            e = f(a, d) << 18 | f(a, d + 1) << 12, h.push(String.fromCharCode(e >> 16))
                    }
                    return h.join("")
                }, c.getbyte = function (a, b) {
                    var d = a.charCodeAt(b);
                    if (d > 255)throw c.makeDOMException();
                    return d
                }, c.encode = function (a) {
                    if (1 !== arguments.length)throw new SyntaxError("Not enough arguments");
                    var b, d, e = c.PADCHAR, f = c.ALPHA, g = c.getbyte, h = [], i = (a = "" + a).length - a.length % 3;
                    if (0 === a.length)return a;
                    for (b = 0; b < i; b += 3)d = g(a, b) << 16 | g(a, b + 1) << 8 | g(a, b + 2), h.push(f.charAt(d >> 18)), h.push(f.charAt(d >> 12 & 63)), h.push(f.charAt(d >> 6 & 63)), h.push(f.charAt(63 & d));
                    switch (a.length - i) {
                        case 1:
                            d = g(a, b) << 16, h.push(f.charAt(d >> 18) + f.charAt(d >> 12 & 63) + e + e);
                            break;
                        case 2:
                            d = g(a, b) << 16 | g(a, b + 1) << 8, h.push(f.charAt(d >> 18) + f.charAt(d >> 12 & 63) + f.charAt(d >> 6 & 63) + e)
                    }
                    return h.join("")
                }, a.url = "pay.htm", a.pay = function (b) {
                    var f = encodeURIComponent(c.encode(b));
                    e.call(d, "APURL") && (a.url = d.APURL), location.href = a.url + "?goto=" + f
                }, a.decode = function (a) {
                    return c.decode(decodeURIComponent(a))
                }, b.exports = a
            }()
        }, {"../../stash": 34}], 17: [function (a, b, c) {
            var d = a("./commons/redirect_base"), e = a("../callbacks"), f = a("../utils"), g = {}.hasOwnProperty;
            b.exports = {
                handleCharge: function (a) {
                    var b = a.extra;
                    if (g.call(b, "pay_channel")) {
                        var c = b.pay_channel;
                        "wx" !== c || f.inWeixin() ? "alipay" !== c || f.inAlipay() ? d.handleCharge(a) : e.innerCallback("fail", e.error("Not in the Alipay browser")) : e.innerCallback("fail", e.error("Not in the WeChat browser"))
                    } else e.innerCallback("fail", e.error("invalid_charge", "charge 格式不正确"))
                }
            }
        }, {"../callbacks": 2, "../utils": 36, "./commons/redirect_base": 14}], 18: [function (a, b, c) {
            var d = a("../utils"), e = {}.hasOwnProperty;
            b.exports = {
                JDPAY_WAP_URL_OLD: "https://m.jdpay.com/wepay/web/pay",
                JDPAY_H5_URL: "https://h5pay.jd.com/jdpay/saveOrder",
                JDPAY_PC_URL: "https://wepay.jd.com/jdpay/saveOrder",
                handleCharge: function (a) {
                    var b = a.credential[a.channel], c = this.JDPAY_H5_URL;
                    e.call(b, "channelUrl") ? (c = b.channelUrl, delete b.channelUrl) : e.call(b, "merchantRemark") && (c = this.JDPAY_WAP_URL_OLD), d.formSubmit(c, "post", b)
                }
            }
        }, {"../utils": 36}], 19: [function (a, b, c) {
            var d = a("../utils");
            b.exports = {
                handleCharge: function (a) {
                    var b = a.credential[a.channel];
                    d.redirectTo(b, a.channel)
                }
            }
        }, {"../utils": 36}], 20: [function (a, b, c) {
            var d = a("../callbacks"), e = a("../utils"), f = a("../stash"), g = {}.hasOwnProperty;
            b.exports = {
                SRC_URL: "https://open.mobile.qq.com/sdk/qqapi.js?_bid=152",
                ID: "mqq_api",
                handleCharge: function (a) {
                    var b = a.credential[a.channel];
                    g.call(b, "token_id") ? (f.tokenId = b.token_id, e.loadUrlJs(this.ID, this.SRC_URL, this.callpay)) : d.innerCallback("fail", d.error("invalid_credential", "missing_token_id"))
                },
                callpay: function () {
                    if ("undefined" != typeof mqq) {
                        if (0 == mqq.QQVersion)return d.innerCallback("fail", d.error("Not in the QQ client")), void delete f.tokenId;
                        mqq.tenpay.pay({tokenId: f.tokenId}, function (a) {
                            0 == a.resultCode ? d.innerCallback("success") : d.innerCallback("fail", d.error(a.retmsg))
                        })
                    } else d.innerCallback("fail", d.error("network_err"));
                    delete f.tokenId
                }
            }
        }, {"../callbacks": 2, "../stash": 34, "../utils": 36}], 21: [function (a, b, c) {
            arguments[4][12][0].apply(c, arguments)
        }, {"../utils": 36, dup: 12}], 22: [function (a, b, c) {
            var d = a("../utils");
            b.exports = {
                UPACP_PC_URL: "https://gateway.95516.com/gateway/api/frontTransReq.do",
                handleCharge: function (a) {
                    var b = a.credential[a.channel];
                    d.formSubmit(this.UPACP_PC_URL, "post", b)
                }
            }
        }, {"../utils": 36}], 23: [function (a, b, c) {
            var d = a("../utils");
            b.exports = {
                UPACP_WAP_URL: "https://gateway.95516.com/gateway/api/frontTransReq.do",
                handleCharge: function (a) {
                    var b = a.credential[a.channel];
                    d.formSubmit(this.UPACP_WAP_URL, "post", b)
                }
            }
        }, {"../utils": 36}], 24: [function (a, b, c) {
            var d = a("../stash"), e = a("../callbacks"), f = {}.hasOwnProperty;
            b.exports = {
                PINGPP_NOTIFY_URL_BASE: "https://notify.pingxx.com/notify", handleCharge: function (a) {
                    for (var b = a.credential[a.channel], c = ["appId", "timeStamp", "nonceStr", "package", "signType", "paySign"], g = 0; g < c.length; g++)if (!f.call(b, c[g]))return void e.innerCallback("fail", e.error("invalid_credential", "missing_field_" + c[g]));
                    d.jsApiParameters = b, this.callpay()
                }, wxLiteEnabled: function () {
                    return "undefined" != typeof wx && wx.requestPayment
                }, callpay: function () {
                    if (this.wxLiteEnabled()) {
                        var a = d.jsApiParameters;
                        delete a.appId, a.complete = function (a) {
                            "requestPayment:ok" === a.errMsg && e.innerCallback("success"), "requestPayment:cancel" !== a.errMsg && "requestPayment:fail cancel" !== a.errMsg || e.innerCallback("cancel", e.error("用户取消支付")), "undefined" !== a.err_code && "undefined" !== a.err_desc && e.innerCallback("fail", e.error(a.err_desc, a))
                        }, wx.requestPayment(a)
                    } else console.log("请在微信小程序中打开")
                }, runTestMode: function (a) {
                    var b = "/charges/" + a.id;
                    wx.request({
                        url: this.PINGPP_NOTIFY_URL_BASE + b + "?livemode=false", success: function (a) {
                            "success" == a.data ? e.innerCallback("success") : e.innerCallback("fail", e.error("testmode_notify_fail"))
                        }, fail: function () {
                            e.innerCallback("fail", e.error("network_err"))
                        }
                    })
                }
            }
        }, {"../callbacks": 2, "../stash": 34}], 25: [function (a, b, c) {
            arguments[4][10][0].apply(c, arguments)
        }, {"../callbacks": 2, "../mods": 32, "../stash": 34, "../utils": 36, dup: 10}], 26: [function (a, b, c) {
            var d = a("../utils"), e = a("../callbacks"), f = {}.hasOwnProperty;
            b.exports = {
                handleCharge: function (a) {
                    var b = a.credential[a.channel];
                    "string" == typeof b ? d.redirectTo(b, a.channel) : "object" == typeof b && f.call(b, "url") ? d.redirectTo(b.url, a.channel) : e.innerCallback("fail", e.error("invalid_credential", "credential 格式不正确"))
                }
            }
        }, {"../callbacks": 2, "../utils": 36}], 27: [function (a, b, c) {
            var d = a("../utils"), e = a("../callbacks"), f = {}.hasOwnProperty;
            b.exports = {
                YEEPAY_WAP_URL: "https://ok.yeepay.com/paymobile/api/pay/request",
                YEEPAY_WAP_TEST_URL: "http://mobiletest.yeepay.com/paymobile/api/pay/request",
                handleCharge: function (a) {
                    for (var b = a.channel, c = a.credential[b], g = ["merchantaccount", "encryptkey", "data"], h = 0; h < g.length; h++)if (!f.call(c, g[h]))return void e.innerCallback("fail", e.error("invalid_credential", "missing_field_" + g[h]));
                    var i;
                    i = f.call(c, "mode") && "test" == c.mode ? this.YEEPAY_WAP_TEST_URL : this.YEEPAY_WAP_URL, d.redirectTo(i + "?" + d.stringifyData(c, b, !0), a.channel)
                }
            }
        }, {"../callbacks": 2, "../utils": 36}], 28: [function (a, b, c) {
            var d = a("./utils"), e = a("./stash"), f = a("./libs/md5"), g = {
                seperator: "###",
                limit: 1,
                report_url: "https://statistics.pingxx.com/one_stats",
                timeout: 100
            }, h = function (a, b) {
                var c = new RegExp("(^|&)" + b + "=([^&]*)(&|$)", "i"), d = a.substr(0).match(c);
                return null !== d ? unescape(d[2]) : null
            }, i = function () {
                return navigator.userAgent
            }, j = function () {
                return window.location.host
            };
            g.store = function (a) {
                if ("undefined" != typeof localStorage && null !== localStorage) {
                    var b = this, c = {};
                    c.app_id = a.app_id || e.app_id || "app_not_defined", c.ch_id = a.ch_id || "", c.channel = a.channel || "", c.type = a.type || "", c.user_agent = i(), c.host = j(), c.time = (new Date).getTime(), c.puid = e.puid;
                    var d = "app_id=" + c.app_id + "&channel=" + c.channel + "&ch_id=" + c.ch_id + "&host=" + c.host + "&time=" + c.time + "&type=" + c.type + "&user_agent=" + c.user_agent + "&puid=" + c.puid, f = d;
                    null !== localStorage.getItem("PPP_ONE_STATS") && 0 !== localStorage.getItem("PPP_ONE_STATS").length && (f = localStorage.getItem("PPP_ONE_STATS") + b.seperator + d);
                    try {
                        localStorage.setItem("PPP_ONE_STATS", f)
                    } catch (a) {
                    }
                }
            }, g.send = function () {
                if ("undefined" != typeof localStorage && null !== localStorage) {
                    var a = this, b = localStorage.getItem("PPP_ONE_STATS");
                    if (!(null === b || b.split(a.seperator).length < a.limit))try {
                        for (var c = [], e = b.split(a.seperator), g = f(e.join("&")), i = 0; i < e.length; i++)c.push({
                            app_id: h(e[i], "app_id"),
                            channel: h(e[i], "channel"),
                            ch_id: h(e[i], "ch_id"),
                            host: h(e[i], "host"),
                            time: h(e[i], "time"),
                            type: h(e[i], "type"),
                            user_agent: h(e[i], "user_agent"),
                            puid: h(e[i], "puid")
                        });
                        d.request(a.report_url, "POST", c, function (a, b) {
                            200 == b && localStorage.removeItem("PPP_ONE_STATS")
                        }, void 0, {"X-Pingpp-Report-Token": g})
                    } catch (a) {
                    }
                }
            }, g.report = function (a) {
                var b = this;
                b.store(a), setTimeout(function () {
                    !d.inWxLite() && b.send()
                }, b.timeout)
            }, b.exports = g
        }, {"./libs/md5": 30, "./stash": 34, "./utils": 36}], 29: [function (a, b, c) {
            var d = a("./stash"), e = a("./utils"), f = a("./collection");
            b.exports = {
                SRC_URL: "https://cookie.pingxx.com", init: function () {
                    var a = this;
                    e.documentReady(function () {
                        try {
                            !(e.inWxLite() || e.inAlipayLite()) && a.initPuid()
                        } catch (a) {
                        }
                    })
                }, initPuid: function () {
                    if ("undefined" != typeof window && "undefined" != typeof localStorage && null !== localStorage) {
                        var a = localStorage.getItem("pingpp_uid");
                        if (null === a) {
                            a = e.randomString();
                            try {
                                localStorage.setItem("pingpp_uid", a)
                            } catch (a) {
                            }
                        }
                        if (d.puid = a, !document.getElementById("p_analyse_iframe")) {
                            var b;
                            try {
                                b = document.createElement("iframe")
                            } catch (a) {
                                b = document.createElement('<iframe name="ifr"></iframe>')
                            }
                            b.id = "p_analyse_iframe", b.src = this.SRC_URL + "/?puid=" + a, b.style.display = "none", document.body.appendChild(b)
                        }
                        setTimeout(function () {
                            f.send()
                        }, 0)
                    }
                }
            }
        }, {"./collection": 28, "./stash": 34, "./utils": 36}], 30: [function (a, b, c) {
            !function () {
                function a(a, b) {
                    var c = (65535 & a) + (65535 & b);
                    return (a >> 16) + (b >> 16) + (c >> 16) << 16 | 65535 & c
                }

                function c(a, b) {
                    return a << b | a >>> 32 - b
                }

                function d(b, d, e, f, g, h) {
                    return a(c(a(a(d, b), a(f, h)), g), e)
                }

                function e(a, b, c, e, f, g, h) {
                    return d(b & c | ~b & e, a, b, f, g, h)
                }

                function f(a, b, c, e, f, g, h) {
                    return d(b & e | c & ~e, a, b, f, g, h)
                }

                function g(a, b, c, e, f, g, h) {
                    return d(b ^ c ^ e, a, b, f, g, h)
                }

                function h(a, b, c, e, f, g, h) {
                    return d(c ^ (b | ~e), a, b, f, g, h)
                }

                function i(b, c) {
                    b[c >> 5] |= 128 << c % 32, b[14 + (c + 64 >>> 9 << 4)] = c;
                    var d, i, j, k, l, m = 1732584193, n = -271733879, o = -1732584194, p = 271733878;
                    for (d = 0; d < b.length; d += 16)i = m, j = n, k = o, l = p, n = h(n = h(n = h(n = h(n = g(n = g(n = g(n = g(n = f(n = f(n = f(n = f(n = e(n = e(n = e(n = e(n, o = e(o, p = e(p, m = e(m, n, o, p, b[d], 7, -680876936), n, o, b[d + 1], 12, -389564586), m, n, b[d + 2], 17, 606105819), p, m, b[d + 3], 22, -1044525330), o = e(o, p = e(p, m = e(m, n, o, p, b[d + 4], 7, -176418897), n, o, b[d + 5], 12, 1200080426), m, n, b[d + 6], 17, -1473231341), p, m, b[d + 7], 22, -45705983), o = e(o, p = e(p, m = e(m, n, o, p, b[d + 8], 7, 1770035416), n, o, b[d + 9], 12, -1958414417), m, n, b[d + 10], 17, -42063), p, m, b[d + 11], 22, -1990404162), o = e(o, p = e(p, m = e(m, n, o, p, b[d + 12], 7, 1804603682), n, o, b[d + 13], 12, -40341101), m, n, b[d + 14], 17, -1502002290), p, m, b[d + 15], 22, 1236535329), o = f(o, p = f(p, m = f(m, n, o, p, b[d + 1], 5, -165796510), n, o, b[d + 6], 9, -1069501632), m, n, b[d + 11], 14, 643717713), p, m, b[d], 20, -373897302), o = f(o, p = f(p, m = f(m, n, o, p, b[d + 5], 5, -701558691), n, o, b[d + 10], 9, 38016083), m, n, b[d + 15], 14, -660478335), p, m, b[d + 4], 20, -405537848), o = f(o, p = f(p, m = f(m, n, o, p, b[d + 9], 5, 568446438), n, o, b[d + 14], 9, -1019803690), m, n, b[d + 3], 14, -187363961), p, m, b[d + 8], 20, 1163531501), o = f(o, p = f(p, m = f(m, n, o, p, b[d + 13], 5, -1444681467), n, o, b[d + 2], 9, -51403784), m, n, b[d + 7], 14, 1735328473), p, m, b[d + 12], 20, -1926607734), o = g(o, p = g(p, m = g(m, n, o, p, b[d + 5], 4, -378558), n, o, b[d + 8], 11, -2022574463), m, n, b[d + 11], 16, 1839030562), p, m, b[d + 14], 23, -35309556), o = g(o, p = g(p, m = g(m, n, o, p, b[d + 1], 4, -1530992060), n, o, b[d + 4], 11, 1272893353), m, n, b[d + 7], 16, -155497632), p, m, b[d + 10], 23, -1094730640), o = g(o, p = g(p, m = g(m, n, o, p, b[d + 13], 4, 681279174), n, o, b[d], 11, -358537222), m, n, b[d + 3], 16, -722521979), p, m, b[d + 6], 23, 76029189), o = g(o, p = g(p, m = g(m, n, o, p, b[d + 9], 4, -640364487), n, o, b[d + 12], 11, -421815835), m, n, b[d + 15], 16, 530742520), p, m, b[d + 2], 23, -995338651), o = h(o, p = h(p, m = h(m, n, o, p, b[d], 6, -198630844), n, o, b[d + 7], 10, 1126891415), m, n, b[d + 14], 15, -1416354905), p, m, b[d + 5], 21, -57434055), o = h(o, p = h(p, m = h(m, n, o, p, b[d + 12], 6, 1700485571), n, o, b[d + 3], 10, -1894986606), m, n, b[d + 10], 15, -1051523), p, m, b[d + 1], 21, -2054922799), o = h(o, p = h(p, m = h(m, n, o, p, b[d + 8], 6, 1873313359), n, o, b[d + 15], 10, -30611744), m, n, b[d + 6], 15, -1560198380), p, m, b[d + 13], 21, 1309151649), o = h(o, p = h(p, m = h(m, n, o, p, b[d + 4], 6, -145523070), n, o, b[d + 11], 10, -1120210379), m, n, b[d + 2], 15, 718787259), p, m, b[d + 9], 21, -343485551), m = a(m, i), n = a(n, j), o = a(o, k), p = a(p, l);
                    return [m, n, o, p]
                }

                function j(a) {
                    var b, c = "";
                    for (b = 0; b < 32 * a.length; b += 8)c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
                    return c
                }

                function k(a) {
                    var b, c = [];
                    for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1)c[b] = 0;
                    for (b = 0; b < 8 * a.length; b += 8)c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32;
                    return c
                }

                function l(a) {
                    return j(i(k(a), 8 * a.length))
                }

                function m(a, b) {
                    var c, d, e = k(a), f = [], g = [];
                    for (f[15] = g[15] = void 0, e.length > 16 && (e = i(e, 8 * a.length)), c = 0; c < 16; c += 1)f[c] = 909522486 ^ e[c], g[c] = 1549556828 ^ e[c];
                    return d = i(f.concat(k(b)), 512 + 8 * b.length), j(i(g.concat(d), 640))
                }

                function n(a) {
                    var b, c, d = "";
                    for (c = 0; c < a.length; c += 1)b = a.charCodeAt(c), d += "0123456789abcdef".charAt(b >>> 4 & 15) + "0123456789abcdef".charAt(15 & b);
                    return d
                }

                function o(a) {
                    return unescape(encodeURIComponent(a))
                }

                function p(a) {
                    return l(o(a))
                }

                function q(a) {
                    return n(p(a))
                }

                function r(a, b) {
                    return m(o(a), o(b))
                }

                function s(a, b) {
                    return n(r(a, b))
                }

                b.exports = function (a, b, c) {
                    return b ? c ? r(b, a) : s(b, a) : c ? p(a) : q(a)
                }
            }()
        }, {}], 31: [function (a, b, c) {
            var d = a("./version").v, e = {}.hasOwnProperty, f = function () {
                a("./init").init()
            };
            f.prototype.version = d, b.exports = new f;
            var g = a("./testmode"), h = a("./callbacks"), i = a("./mods"), j = a("./stash"), k = a("./collection"), l = a("./payment_elements");
            f.prototype.createPayment = function (a, b, c, d) {
                if ("function" == typeof b && (h.userCallback = b), l.init(a), e.call(l, "id"))if (e.call(l, "channel")) {
                    e.call(l, "app") && ("string" == typeof l.app ? j.app_id = l.app : "object" == typeof l.app && "string" == typeof l.app.id && (j.app_id = l.app.id)), k.report({
                        type: j.type || "pure_sdk_click",
                        channel: l.channel,
                        ch_id: l.id
                    });
                    var f = l.channel;
                    if (e.call(l, "credential"))if (l.credential)if (e.call(l.credential, f))if (e.call(l, "livemode")) {
                        var m = i.getChannelModule(f);
                        if (void 0 === m)return console.error('channel module "' + f + '" is undefined'), void h.innerCallback("fail", h.error("invalid_channel", 'channel module "' + f + '" is undefined'));
                        !1 !== l.livemode ? (void 0 !== c && (j.signature = c), "boolean" == typeof d && (j.debug = d), m.handleCharge(l)) : e.call(m, "runTestMode") ? m.runTestMode(l) : g.runTestMode(l)
                    } else h.innerCallback("fail", h.error("invalid_charge", "no_livemode_field")); else h.innerCallback("fail", h.error("invalid_credential", "credential_is_incorrect")); else h.innerCallback("fail", h.error("invalid_credential", "credential_is_undefined")); else h.innerCallback("fail", h.error("invalid_charge", "no_credential"))
                } else h.innerCallback("fail", h.error("invalid_charge", "no_channel")); else h.innerCallback("fail", h.error("invalid_charge", "no_charge_id"))
            }, f.prototype.setAPURL = function (a) {
                j.APURL = a
            }, f.prototype.setUrlReturnCallback = function (a, b) {
                if ("function" != typeof a)throw"callback need to be a function";
                if (h.urlReturnCallback = a, void 0 !== b) {
                    if (!Array.isArray(b))throw"channels need to be an array";
                    h.urlReturnChannels = b
                }
            }, f.prototype.signAgreement = function (a, b) {
                "function" == typeof b && (h.userAgreementCallback = b);
                var c = i.getExtraModule("agreement");
                return void 0 === c ? (console.error('module "agreement" is undefined'), h.innerCallback("fail", h.error("invalid_module", 'module "agreement" is undefined')), !1) : c.signAgreement(a)
            }
        }, {
            "./callbacks": 2,
            "./collection": 28,
            "./init": 29,
            "./mods": 32,
            "./payment_elements": 33,
            "./stash": 34,
            "./testmode": 35,
            "./version": 37
        }], 32: [function (a, b, c) {
            var d = {}.hasOwnProperty, e = {};
            b.exports = e, e.channels = {
                alipay_lite: a("./channels/alipay_lite"),
                alipay_pc_direct: a("./channels/alipay_pc_direct"),
                alipay_qr: a("./channels/alipay_qr"),
                alipay_wap: a("./channels/alipay_wap"),
                bfb_wap: a("./channels/bfb_wap"),
                cb_alipay_pc_direct: a("./channels/cb_alipay_pc_direct"),
                cb_alipay_wap: a("./channels/cb_alipay_wap"),
                cb_wx_pub: a("./channels/cb_wx_pub"),
                ccb_qr: a("./channels/ccb_qr"),
                cmb_pc_qr: a("./channels/cmb_pc_qr"),
                cmb_wallet: a("./channels/cmb_wallet"),
                cp_b2b: a("./channels/cp_b2b"),
                isv_wap: a("./channels/isv_wap"),
                jdpay_wap: a("./channels/jdpay_wap"),
                paypal: a("./channels/paypal"),
                qpay_pub: a("./channels/qpay_pub"),
                upacp_b2b: a("./channels/upacp_b2b"),
                upacp_pc: a("./channels/upacp_pc"),
                upacp_wap: a("./channels/upacp_wap"),
                wx_lite: a("./channels/wx_lite"),
                wx_pub: a("./channels/wx_pub"),
                wx_wap: a("./channels/wx_wap"),
                yeepay_wap: a("./channels/yeepay_wap")
            }, e.extras = {
                ap: a("./channels/extras/ap"),
                agreement: a("./agreement")
            }, e.getChannelModule = function (a) {
                if (d.call(e.channels, a))return e.channels[a]
            }, e.getExtraModule = function (a) {
                if (d.call(e.extras, a))return e.extras[a]
            }
        }, {
            "./agreement": 1,
            "./channels/alipay_lite": 3,
            "./channels/alipay_pc_direct": 4,
            "./channels/alipay_qr": 5,
            "./channels/alipay_wap": 6,
            "./channels/bfb_wap": 7,
            "./channels/cb_alipay_pc_direct": 8,
            "./channels/cb_alipay_wap": 9,
            "./channels/cb_wx_pub": 10,
            "./channels/ccb_qr": 11,
            "./channels/cmb_pc_qr": 12,
            "./channels/cmb_wallet": 13,
            "./channels/cp_b2b": 15,
            "./channels/extras/ap": 16,
            "./channels/isv_wap": 17,
            "./channels/jdpay_wap": 18,
            "./channels/paypal": 19,
            "./channels/qpay_pub": 20,
            "./channels/upacp_b2b": 21,
            "./channels/upacp_pc": 22,
            "./channels/upacp_wap": 23,
            "./channels/wx_lite": 24,
            "./channels/wx_pub": 25,
            "./channels/wx_wap": 26,
            "./channels/yeepay_wap": 27
        }], 33: [function (a, b, c) {
            var d = a("./callbacks"), e = {}.hasOwnProperty;
            b.exports = {
                id: null,
                or_id: null,
                channel: null,
                app: null,
                credential: {},
                extra: null,
                livemode: null,
                order_no: null,
                time_expire: null,
                init: function (a) {
                    var b;
                    if ("string" == typeof a)try {
                        b = JSON.parse(a)
                    } catch (a) {
                        return void d.innerCallback("fail", d.error("json_decode_fail", a))
                    } else b = a;
                    if (void 0 !== b) {
                        if (e.call(b, "object") && "order" == b.object) {
                            b.or_id = b.id, b.order_no = b.merchant_order_no;
                            var c = b.charge_essentials;
                            if (b.channel = c.channel, b.credential = c.credential, b.extra = c.extra, e.call(b, "charge") && null != b.charge)b.id = b.charge; else if (e.call(c, "id") && null != c.id)b.id = c.id; else if (e.call(b, "charges"))for (var f = 0; f < b.charges.data.length; f++)if (b.charges.data[f].channel === c.channel) {
                                b.id = b.charges.data[f].id;
                                break
                            }
                        } else e.call(b, "object") && "recharge" == b.object && (b = b.charge);
                        for (var g in this)e.call(b, g) && (this[g] = b[g]);
                        return this
                    }
                    d.innerCallback("fail", d.error("json_decode_fail"))
                },
                clear: function () {
                    for (var a in this)"function" != typeof this[a] && (this[a] = null)
                }
            }
        }, {"./callbacks": 2}], 34: [function (a, b, c) {
            b.exports = {}
        }, {}], 35: [function (a, b, c) {
            var d = a("./utils"), e = {}.hasOwnProperty;
            b.exports = {
                PINGPP_MOCK_URL: "http://sissi.pingxx.com/mock.php", runTestMode: function (a) {
                    var b = {ch_id: a.id, scheme: "http", channel: a.channel};
                    e.call(a, "order_no") ? b.order_no = a.order_no : e.call(a, "orderNo") && (b.order_no = a.orderNo), e.call(a, "time_expire") ? b.time_expire = a.time_expire : e.call(a, "timeExpire") && (b.time_expire = a.timeExpire), e.call(a, "extra") && (b.extra = encodeURIComponent(JSON.stringify(a.extra))), d.redirectTo(this.PINGPP_MOCK_URL + "?" + d.stringifyData(b), a.channel)
                }
            }
        }, {"./utils": 36}], 36: [function (a, b, c) {
            var d = a("./callbacks"), e = {}.hasOwnProperty, f = b.exports = {
                stringifyData: function (a, b, c) {
                    void 0 === c && (c = !1);
                    var d = [];
                    for (var f in a)e.call(a, f) && "function" != typeof a[f] && ("bfb_wap" == b && "url" == f || "yeepay_wap" == b && "mode" == f || "channel_url" != f && d.push(f + "=" + (c ? encodeURIComponent(a[f]) : a[f])));
                    return d.join("&")
                }, request: function (a, b, c, d, g, h) {
                    if ("undefined" != typeof XMLHttpRequest) {
                        var i = new XMLHttpRequest;
                        if (void 0 !== i.timeout && (i.timeout = 6e3), "GET" === (b = b.toUpperCase()) && "object" == typeof c && c && (a += "?" + f.stringifyData(c, "", !0)), i.open(b, a, !0), void 0 !== h)for (var j in h)e.call(h, j) && i.setRequestHeader(j, h[j]);
                        "POST" === b ? (i.setRequestHeader("Content-type", "application/json; charset=utf-8"), i.send(JSON.stringify(c))) : i.send(), void 0 === d && (d = function () {
                        }), void 0 === g && (g = function () {
                        }), i.onreadystatechange = function () {
                            4 == i.readyState && d(i.responseText, i.status, i)
                        }, i.onerror = function (a) {
                            g(i, 0, a)
                        }
                    } else console.log("Function XMLHttpRequest is undefined.")
                }, formSubmit: function (a, b, c) {
                    if ("undefined" != typeof window) {
                        var d = document.createElement("form");
                        d.setAttribute("method", b), d.setAttribute("action", a);
                        for (var f in c)if (e.call(c, f)) {
                            var g = document.createElement("input");
                            g.setAttribute("type", "hidden"), g.setAttribute("name", f), g.setAttribute("value", c[f]), d.appendChild(g)
                        }
                        document.body.appendChild(d), d.submit()
                    } else console.log("Not a browser, form submit url: " + a)
                }, randomString: function (a) {
                    void 0 === a && (a = 32);
                    for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", c = b.length, d = "", e = 0; e < a; e++)d += b.charAt(Math.floor(Math.random() * c));
                    return d
                }, redirectTo: function (a, b) {
                    d.shouldReturnUrlByCallback(b) ? d.triggerUrlReturnCallback(null, a) : "undefined" != typeof window ? window.location.href = a : console.log("Not a browser, redirect url: " + a)
                }, inWeixin: function () {
                    return "undefined" != typeof navigator && -1 !== navigator.userAgent.toLowerCase().indexOf("micromessenger")
                }, inAlipay: function () {
                    return "undefined" != typeof navigator && -1 !== navigator.userAgent.toLowerCase().indexOf("alipayclient")
                }, inWxLite: function () {
                    return "undefined" != typeof wx && (wx.miniProgram || wx.requestPayment)
                }, inAlipayLite: function () {
                    return "undefined" != typeof my && my.tradePay
                }, documentReady: function (a) {
                    "undefined" != typeof document ? "loading" != document.readyState ? a() : document.addEventListener("DOMContentLoaded", a) : a()
                }, loadUrlJs: function (a, b, c) {
                    var d = document.getElementsByTagName("head")[0], e = null;
                    null == document.getElementById(a) ? ((e = document.createElement("script")).setAttribute("type", "text/javascript"), e.setAttribute("src", b), e.setAttribute("id", a), e.async = !0, null != c && (e.onload = e.onreadystatechange = function () {
                        if (e.ready)return !1;
                        e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (e.ready = !0, c())
                    }), d.appendChild(e)) : null != c && c()
                }
            }
        }, {"./callbacks": 2}], 37: [function (a, b, c) {
            b.exports = {v: "2.2.11"}
        }, {}]
    }, {}, [31])(31)
}), function () {
    var a, b, c, d, e, f, g, h, i, j, k;
    k = '{{prices}}\n  <div class="package-card {{className}}">\n    <div class="package-header">\n      <h2>{{package_size}}</h2>\n      <small>累计下载次数</small>\n    </div>\n    <div class="package-content">\n      {{if active}}\n      <div class="package-badge">\n        <div class="badge-wrap">\n          <span>推荐</span>\n          <span class="arraw"></span>\n        </div>\n      </div>\n      {{/if}}\n      <div>￥{{price}}</div>\n      <div class="text-gift {{visibleClass}}">\n        { 赠 <span>{{download_count_gift}}</span> 次 }\n      </div>\n    </div>\n    <div class="package-action">\n      <button class="btn" data-package="{{name}}" onClick="pay(this)">购买</button>\n    </div>\n  </div>\n {{/prices}}', h = function (a) {
        var b, c;
        return c = new RegExp("s*" + a + "=([^;]*)"), b = document.cookie.match(c), b ? b[1] : ""
    }, j = function (a) {
        return a.split("").reverse().join("")
    }, a = function (a) {
        var b, c;
        return a ? (c = j("" + a), c = c.replace(/(\d{3})/g, "$1,"), b = c.length - 1, "," === c.charAt(b) && (c = c.substr(0, b)), c = j(c)) : 0
    }, b = function (a) {
        return a / 100
    }, e = function (c) {
        var d, e, f, g;
        for (e = 0, f = c.length; e < f; e++)g = c[e], g.package_size = a(g.package_size), g.price = b(g.price), g.className = "", g.visibleClass = g.download_count_gift ? "" : "invisible";
        return d = c[parseInt(c.length / 2)], d.active = !0, d.className = "active", i({prices: c}), $("#root-packages").removeClass("invisible")
    }, f = function (a) {
        return console.log(a)
    }, d = function () {
        return $.ajax({
            url: window.endpoint + "/data_package_prices", type: "get", beforeSend: function (a) {
                return a.setRequestHeader("Access-Control-Allow-Origin", "*")
            }, success: function (a) {
                return e(a)
            }, error: function (a) {
                return f(a)
            }
        })
    }, i = function (a) {
        var b;
        return b = Mark.up(k, a), $("#package_content").html(b)
    }, c = function () {
        var a;
        if (window.currentUser)return window.currentUser;
        try {
            a = localStorage.getItem("rio.web.currentUser")
        } catch (b) {
            b
        }
        a || (a = h(currentUser));
        try {
            if (a)return a = JSON.parse(a)
        } catch (b) {
            b
        }
    }, g = function (a) {
        var b, d;
        if (a)return d = c(), b = d.orgs[0], h(), $.ajax({
            url: window.endpoint + "/orgs/" + b.id + "/charge_for_data_package",
            method: "post",
            data: {data_package_price_name: a},
            headers: {AccessToken: d.access_token}
        }).done(function (a) {
            return pingpp.createPayment(a, function (a, b) {
                return console.log(a, b)
            })
        })
    }, window.pay = function (a, b) {
        var d, e, f, h;
        return d = $(a), e = d.attr("data-package"), b && (e = $("#undevelop_confirm").attr("data-package")), h = c(), ga("send", "event", "pricing", "pay_package", e), h ? b || h.is_developer ? g(e) : ($("#undevelop_confirm").removeClass("hide").attr("data-package", e), void $(".dialog-mask").removeClass("hide")) : (ga("send", "event", "pricing", "need_login", e), f = new Date(Date.now() + 864e5), document.cookie = "previousUrl=" + location.href + "; expires=" + f + "; path=/", void(window.location.href = "/oauth/signin"))
    }, window.closeConfirm = function () {
        return $(".dialog-mask").addClass("hide"), $("#undevelop_confirm").addClass("hide")
    }, window.contact = function () {
        return ga("send", "event", "pricing", "click", "contact_mkt")
    }, d()
}.call(this);