; var eaf.util.namespace = function (c, f, b) { var e = c.split(f || "."), g = b || window, d, a; for (d = 0, a = e.length; d < a; d++) { g = g[e[d]] = g[e[d]] || {} } return g };


