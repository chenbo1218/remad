var Mark = {
    includes: {}, globals: {}, delimiter: ">", compact: !1, _copy: function (a, b) {
        b = b || [];
        for (var c in a)b[c] = a[c];
        return b
    }, _size: function (a) {
        return a instanceof Array ? a.length : a || 0
    }, _iter: function (a, b) {
        this.idx = a, this.size = b, this.length = b, this.sign = "#", this.toString = function () {
            return this.idx + this.sign.length - 1
        }
    }, _pipe: function (a, b) {
        var c, d, e, f;
        if (c = b.shift()) {
            d = c.split(this.delimiter), e = d.shift().trim();
            try {
                f = Mark.pipes[e].apply(null, [a].concat(d)), a = this._pipe(f, b)
            } catch (g) {
            }
        }
        return a
    }, _eval: function (a, b, c) {
        var d, e, f = this._pipe(a, b), g = f, h = -1;
        if (f instanceof Array)for (f = "", d = g.length; ++h < d;)e = {iter: new this._iter(h, d)}, f += c ? Mark.up(c, g[h], e) : g[h]; else f instanceof Object && (f = Mark.up(c, g));
        return f
    }, _test: function (a, b, c, d) {
        var e = Mark.up(b, c, d).split(/\{\{\s*else\s*\}\}/);
        return (!1 === a ? e[1] : e[0]) || ""
    }, _bridge: function (a, b) {
        b = "." == b ? "\\." : b.replace(/\$/g, "\\$");
        var c, d, e = "{{\\s*" + b + "([^/}]+\\w*)?}}|{{/" + b + "\\s*}}", f = new RegExp(e, "g"), g = a.match(f) || [], h = 0, i = 0, j = -1, k = 0;
        for (d = 0; d < g.length && (c = d, j = a.indexOf(g[c], j + 1), g[c].indexOf("{{/") > -1 ? i++ : h++, h !== i); d++);
        return h = a.indexOf(g[0]), i = h + g[0].length, k = j + g[c].length, [a.substring(h, k), a.substring(i, j)]
    }
};
Mark.up = function (a, b, c) {
    b = b || {}, c = c || {};
    var d, e, f, g, h, i, j, k, l, m, n = /\{\{(.+?)\}\}/g, o = a.match(n) || [], p = [], q = 0, r = 0;
    for (c.pipes && this._copy(c.pipes, this.pipes), c.includes && this._copy(c.includes, this.includes), c.globals && this._copy(c.globals, this.globals), c.delimiter && (this.delimiter = c.delimiter), void 0 !== c.compact && (this.compact = c.compact); d = o[q++];)if (j = void 0, i = "", g = d.indexOf("/}}") > -1, e = d.substr(2, d.length - (g ? 5 : 4)), e = e.replace(/`(.+?)`/g, function (a, c) {
            return Mark.up("{{" + c + "}}", b)
        }), h = 0 === e.trim().indexOf("if "), p = e.split("|"), p.shift(), e = e.replace(/^\s*if/, "").split("|").shift().trim(), f = h ? "if" : e.split("|")[0], m = b[e], h && !p.length && (p = ["notempty"]), !g && a.indexOf("{{/" + f) > -1 && (j = this._bridge(a, f), d = j[0], i = j[1], q += d.match(n).length - 1), !/^\{\{\s*else\s*\}\}$/.test(d)) {
        if (void 0 !== (k = this.globals[e]))j = this._eval(k, p, i); else if (l = this.includes[e])l instanceof Function && (l = l()), j = this._pipe(Mark.up(l, b, c), p); else if (e.indexOf("#") > -1)c.iter.sign = e, j = this._pipe(c.iter, p); else if ("." === e)j = this._pipe(b, p); else if (e.indexOf(".") > -1) {
            for (e = e.split("."), m = Mark.globals[e[0]], m ? r = 1 : (r = 0, m = b); m && r < e.length;)m = m[e[r++]];
            j = this._eval(m, p, i)
        } else h ? j = this._pipe(m, p) : m instanceof Array ? j = this._eval(m, p, i) : i ? j = m ? Mark.up(i, m) : void 0 : b.hasOwnProperty(e) && (j = this._pipe(m, p));
        j instanceof Array && (j = this._eval(j, p, i)), h && (j = this._test(j, i, b, c)), a = a.replace(d, void 0 === j ? "???" : j)
    }
    return this.compact ? a.replace(/>\s+</g, "><") : a
}, Mark.pipes = {
    empty: function (a) {
        return (!a || 0 === (a + "").trim().length) && a
    }, notempty: function (a) {
        return !(!a || !(a + "").trim().length) && a
    }, blank: function (a, b) {
        return a || 0 === a ? a : b
    }, more: function (a, b) {
        return Mark._size(a) > b && a
    }, less: function (a, b) {
        return Mark._size(a) < b && a
    }, ormore: function (a, b) {
        return Mark._size(a) >= b && a
    }, orless: function (a, b) {
        return Mark._size(a) <= b && a
    }, between: function (a, b, c) {
        return (a = Mark._size(a)) >= b && a <= c && a
    }, equals: function (a, b) {
        return a == b && a
    }, notequals: function (a, b) {
        return a != b && a
    }, like: function (a, b) {
        return !!new RegExp(b, "i").test(a) && a
    }, notlike: function (a, b) {
        return !Mark.pipes.like(a, b) && a
    }, upcase: function (a) {
        return String(a).toUpperCase()
    }, downcase: function (a) {
        return String(a).toLowerCase()
    }, capcase: function (a) {
        return a.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase()
        })
    }, chop: function (a, b) {
        return a.length > b ? a.substr(0, b) + "..." : a
    }, tease: function (a, b) {
        var c = a.split(/\s+/);
        return c.slice(0, b).join(" ") + (c.length > b ? "..." : "")
    }, trim: function (a) {
        return a.trim()
    }, pack: function (a) {
        return a.trim().replace(/\s{2,}/g, " ")
    }, round: function (a) {
        return Math.round(+a)
    }, clean: function (a) {
        return String(a).replace(/<\/?[^>]+>/gi, "")
    }, size: function (a) {
        return a.length
    }, length: function (a) {
        return a.length
    }, reverse: function (a) {
        return [].concat(a).reverse()
    }, join: function (a, b) {
        return a.join(b)
    }, limit: function (a, b, c) {
        return a.slice(+c || 0, +b + (+c || 0))
    }, split: function (a, b) {
        return a.split(b || ",")
    }, choose: function (a, b, c) {
        return a ? b : c || ""
    }, toggle: function (a, b, c, d) {
        return c.split(",")[b.match(/\w+/g).indexOf(a + "")] || d
    }, sort: function (a, b) {
        var c = function (a, c) {
            return a[b] > c[b] ? 1 : -1
        };
        return [].concat(a).sort(b ? c : void 0)
    }, fix: function (a, b) {
        return (+a).toFixed(b)
    }, mod: function (a, b) {
        return +a % +b
    }, divisible: function (a, b) {
        return !(!a || +a % b != 0) && a
    }, even: function (a) {
        return !(!a || 0 != (1 & +a)) && a
    }, odd: function (a) {
        return !(!a || 1 != (1 & +a)) && a
    }, number: function (a) {
        return parseFloat(a.replace(/[^\-\d\.]/g, ""))
    }, url: function (a) {
        return encodeURI(a)
    }, bool: function (a) {
        return !!a
    }, falsy: function (a) {
        return !a
    }, first: function (a) {
        return 0 === a.idx
    }, last: function (a) {
        return a.idx === a.size - 1
    }, call: function (a, b) {
        return a[b].apply(a, [].slice.call(arguments, 2))
    }, set: function (a, b) {
        return Mark.globals[b] = a, ""
    }, log: function (a) {
        return console.log(a), a
    }
}, "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
}), "undefined" != typeof module && module.exports ? module.exports = Mark : "function" == typeof define && define.amd && define(function () {
    return Mark
});