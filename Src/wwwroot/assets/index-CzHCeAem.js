(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production_min;
function requireReact_production_min() {
  if (hasRequiredReact_production_min) return react_production_min;
  hasRequiredReact_production_min = 1;
  var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p2 = Symbol.for("react.fragment"), q2 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u2 = Symbol.for("react.context"), v2 = Symbol.for("react.forward_ref"), w2 = Symbol.for("react.suspense"), x2 = Symbol.for("react.memo"), y2 = Symbol.for("react.lazy"), z = Symbol.iterator;
  function A(a) {
    if (null === a || "object" !== typeof a) return null;
    a = z && a[z] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var B = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C2 = Object.assign, D2 = {};
  function E(a, b2, e) {
    this.props = a;
    this.context = b2;
    this.refs = D2;
    this.updater = e || B;
  }
  E.prototype.isReactComponent = {};
  E.prototype.setState = function(a, b2) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b2, "setState");
  };
  E.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function F2() {
  }
  F2.prototype = E.prototype;
  function G(a, b2, e) {
    this.props = a;
    this.context = b2;
    this.refs = D2;
    this.updater = e || B;
  }
  var H = G.prototype = new F2();
  H.constructor = G;
  C2(H, E.prototype);
  H.isPureReactComponent = true;
  var I2 = Array.isArray, J2 = Object.prototype.hasOwnProperty, K2 = { current: null }, L2 = { key: true, ref: true, __self: true, __source: true };
  function M(a, b2, e) {
    var d2, c2 = {}, k = null, h2 = null;
    if (null != b2) for (d2 in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k = "" + b2.key), b2) J2.call(b2, d2) && !L2.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
    var g2 = arguments.length - 2;
    if (1 === g2) c2.children = e;
    else if (1 < g2) {
      for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++) f2[m2] = arguments[m2 + 2];
      c2.children = f2;
    }
    if (a && a.defaultProps) for (d2 in g2 = a.defaultProps, g2) void 0 === c2[d2] && (c2[d2] = g2[d2]);
    return { $$typeof: l, type: a, key: k, ref: h2, props: c2, _owner: K2.current };
  }
  function N(a, b2) {
    return { $$typeof: l, type: a.type, key: b2, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === l;
  }
  function escape(a) {
    var b2 = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(a2) {
      return b2[a2];
    });
  }
  var P = /\/+/g;
  function Q2(a, b2) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b2.toString(36);
  }
  function R(a, b2, e, d2, c2) {
    var k = typeof a;
    if ("undefined" === k || "boolean" === k) a = null;
    var h2 = false;
    if (null === a) h2 = true;
    else switch (k) {
      case "string":
      case "number":
        h2 = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l:
          case n:
            h2 = true;
        }
    }
    if (h2) return h2 = a, c2 = c2(h2), a = "" === d2 ? "." + Q2(h2, 0) : d2, I2(c2) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c2, b2, e, "", function(a2) {
      return a2;
    })) : null != c2 && (O(c2) && (c2 = N(c2, e + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P, "$&/") + "/") + a)), b2.push(c2)), 1;
    h2 = 0;
    d2 = "" === d2 ? "." : d2 + ":";
    if (I2(a)) for (var g2 = 0; g2 < a.length; g2++) {
      k = a[g2];
      var f2 = d2 + Q2(k, g2);
      h2 += R(k, b2, e, f2, c2);
    }
    else if (f2 = A(a), "function" === typeof f2) for (a = f2.call(a), g2 = 0; !(k = a.next()).done; ) k = k.value, f2 = d2 + Q2(k, g2++), h2 += R(k, b2, e, f2, c2);
    else if ("object" === k) throw b2 = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
    return h2;
  }
  function S2(a, b2, e) {
    if (null == a) return a;
    var d2 = [], c2 = 0;
    R(a, d2, "", "", function(a2) {
      return b2.call(e, a2, c2++);
    });
    return d2;
  }
  function T2(a) {
    if (-1 === a._status) {
      var b2 = a._result;
      b2 = b2();
      b2.then(function(b3) {
        if (0 === a._status || -1 === a._status) a._status = 1, a._result = b3;
      }, function(b3) {
        if (0 === a._status || -1 === a._status) a._status = 2, a._result = b3;
      });
      -1 === a._status && (a._status = 0, a._result = b2);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
  }
  var U2 = { current: null }, V2 = { transition: null }, W2 = { ReactCurrentDispatcher: U2, ReactCurrentBatchConfig: V2, ReactCurrentOwner: K2 };
  function X2() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S2, forEach: function(a, b2, e) {
    S2(a, function() {
      b2.apply(this, arguments);
    }, e);
  }, count: function(a) {
    var b2 = 0;
    S2(a, function() {
      b2++;
    });
    return b2;
  }, toArray: function(a) {
    return S2(a, function(a2) {
      return a2;
    }) || [];
  }, only: function(a) {
    if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  } };
  react_production_min.Component = E;
  react_production_min.Fragment = p2;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G;
  react_production_min.StrictMode = q2;
  react_production_min.Suspense = w2;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W2;
  react_production_min.act = X2;
  react_production_min.cloneElement = function(a, b2, e) {
    if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d2 = C2({}, a.props), c2 = a.key, k = a.ref, h2 = a._owner;
    if (null != b2) {
      void 0 !== b2.ref && (k = b2.ref, h2 = K2.current);
      void 0 !== b2.key && (c2 = "" + b2.key);
      if (a.type && a.type.defaultProps) var g2 = a.type.defaultProps;
      for (f2 in b2) J2.call(b2, f2) && !L2.hasOwnProperty(f2) && (d2[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) d2.children = e;
    else if (1 < f2) {
      g2 = Array(f2);
      for (var m2 = 0; m2 < f2; m2++) g2[m2] = arguments[m2 + 2];
      d2.children = g2;
    }
    return { $$typeof: l, type: a.type, key: c2, ref: k, props: d2, _owner: h2 };
  };
  react_production_min.createContext = function(a) {
    a = { $$typeof: u2, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a.Provider = { $$typeof: t, _context: a };
    return a.Consumer = a;
  };
  react_production_min.createElement = M;
  react_production_min.createFactory = function(a) {
    var b2 = M.bind(null, a);
    b2.type = a;
    return b2;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a) {
    return { $$typeof: v2, render: a };
  };
  react_production_min.isValidElement = O;
  react_production_min.lazy = function(a) {
    return { $$typeof: y2, _payload: { _status: -1, _result: a }, _init: T2 };
  };
  react_production_min.memo = function(a, b2) {
    return { $$typeof: x2, type: a, compare: void 0 === b2 ? null : b2 };
  };
  react_production_min.startTransition = function(a) {
    var b2 = V2.transition;
    V2.transition = {};
    try {
      a();
    } finally {
      V2.transition = b2;
    }
  };
  react_production_min.unstable_act = X2;
  react_production_min.useCallback = function(a, b2) {
    return U2.current.useCallback(a, b2);
  };
  react_production_min.useContext = function(a) {
    return U2.current.useContext(a);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a) {
    return U2.current.useDeferredValue(a);
  };
  react_production_min.useEffect = function(a, b2) {
    return U2.current.useEffect(a, b2);
  };
  react_production_min.useId = function() {
    return U2.current.useId();
  };
  react_production_min.useImperativeHandle = function(a, b2, e) {
    return U2.current.useImperativeHandle(a, b2, e);
  };
  react_production_min.useInsertionEffect = function(a, b2) {
    return U2.current.useInsertionEffect(a, b2);
  };
  react_production_min.useLayoutEffect = function(a, b2) {
    return U2.current.useLayoutEffect(a, b2);
  };
  react_production_min.useMemo = function(a, b2) {
    return U2.current.useMemo(a, b2);
  };
  react_production_min.useReducer = function(a, b2, e) {
    return U2.current.useReducer(a, b2, e);
  };
  react_production_min.useRef = function(a) {
    return U2.current.useRef(a);
  };
  react_production_min.useState = function(a) {
    return U2.current.useState(a);
  };
  react_production_min.useSyncExternalStore = function(a, b2, e) {
    return U2.current.useSyncExternalStore(a, b2, e);
  };
  react_production_min.useTransition = function() {
    return U2.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  return react_production_min;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production_min();
  }
  return react.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f2 = requireReact(), k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m2 = Object.prototype.hasOwnProperty, n = f2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p2 = { key: true, ref: true, __self: true, __source: true };
  function q2(c2, a, g2) {
    var b2, d2 = {}, e = null, h2 = null;
    void 0 !== g2 && (e = "" + g2);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h2 = a.ref);
    for (b2 in a) m2.call(a, b2) && !p2.hasOwnProperty(b2) && (d2[b2] = a[b2]);
    if (c2 && c2.defaultProps) for (b2 in a = c2.defaultProps, a) void 0 === d2[b2] && (d2[b2] = a[b2]);
    return { $$typeof: k, type: c2, key: e, ref: h2, props: d2, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q2;
  reactJsxRuntime_production_min.jsxs = q2;
  return reactJsxRuntime_production_min;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredScheduler_production_min;
function requireScheduler_production_min() {
  if (hasRequiredScheduler_production_min) return scheduler_production_min;
  hasRequiredScheduler_production_min = 1;
  (function(exports) {
    function f2(a, b2) {
      var c2 = a.length;
      a.push(b2);
      a: for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e = a[d2];
        if (0 < g2(e, b2)) a[d2] = b2, a[c2] = e, c2 = d2;
        else break a;
      }
    }
    function h2(a) {
      return 0 === a.length ? null : a[0];
    }
    function k(a) {
      if (0 === a.length) return null;
      var b2 = a[0], c2 = a.pop();
      if (c2 !== b2) {
        a[0] = c2;
        a: for (var d2 = 0, e = a.length, w2 = e >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C2 = a[m2], n = m2 + 1, x2 = a[n];
          if (0 > g2(C2, c2)) n < e && 0 > g2(x2, C2) ? (a[d2] = x2, a[n] = c2, d2 = n) : (a[d2] = C2, a[m2] = c2, d2 = m2);
          else if (n < e && 0 > g2(x2, c2)) a[d2] = x2, a[n] = c2, d2 = n;
          else break a;
        }
      }
      return b2;
    }
    function g2(a, b2) {
      var c2 = a.sortIndex - b2.sortIndex;
      return 0 !== c2 ? c2 : a.id - b2.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      var p2 = Date, q2 = p2.now();
      exports.unstable_now = function() {
        return p2.now() - q2;
      };
    }
    var r = [], t = [], u2 = 1, v2 = null, y2 = 3, z = false, A = false, B = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G(a) {
      for (var b2 = h2(t); null !== b2; ) {
        if (null === b2.callback) k(t);
        else if (b2.startTime <= a) k(t), b2.sortIndex = b2.expirationTime, f2(r, b2);
        else break;
        b2 = h2(t);
      }
    }
    function H(a) {
      B = false;
      G(a);
      if (!A) if (null !== h2(r)) A = true, I2(J2);
      else {
        var b2 = h2(t);
        null !== b2 && K2(H, b2.startTime - a);
      }
    }
    function J2(a, b2) {
      A = false;
      B && (B = false, E(L2), L2 = -1);
      z = true;
      var c2 = y2;
      try {
        G(b2);
        for (v2 = h2(r); null !== v2 && (!(v2.expirationTime > b2) || a && !M()); ) {
          var d2 = v2.callback;
          if ("function" === typeof d2) {
            v2.callback = null;
            y2 = v2.priorityLevel;
            var e = d2(v2.expirationTime <= b2);
            b2 = exports.unstable_now();
            "function" === typeof e ? v2.callback = e : v2 === h2(r) && k(r);
            G(b2);
          } else k(r);
          v2 = h2(r);
        }
        if (null !== v2) var w2 = true;
        else {
          var m2 = h2(t);
          null !== m2 && K2(H, m2.startTime - b2);
          w2 = false;
        }
        return w2;
      } finally {
        v2 = null, y2 = c2, z = false;
      }
    }
    var N = false, O = null, L2 = -1, P = 5, Q2 = -1;
    function M() {
      return exports.unstable_now() - Q2 < P ? false : true;
    }
    function R() {
      if (null !== O) {
        var a = exports.unstable_now();
        Q2 = a;
        var b2 = true;
        try {
          b2 = O(true, a);
        } finally {
          b2 ? S2() : (N = false, O = null);
        }
      } else N = false;
    }
    var S2;
    if ("function" === typeof F2) S2 = function() {
      F2(R);
    };
    else if ("undefined" !== typeof MessageChannel) {
      var T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R;
      S2 = function() {
        U2.postMessage(null);
      };
    } else S2 = function() {
      D2(R, 0);
    };
    function I2(a) {
      O = a;
      N || (N = true, S2());
    }
    function K2(a, b2) {
      L2 = D2(function() {
        a(exports.unstable_now());
      }, b2);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A || z || (A = true, I2(J2));
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y2;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h2(r);
    };
    exports.unstable_next = function(a) {
      switch (y2) {
        case 1:
        case 2:
        case 3:
          var b2 = 3;
          break;
        default:
          b2 = y2;
      }
      var c2 = y2;
      y2 = b2;
      try {
        return a();
      } finally {
        y2 = c2;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a, b2) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c2 = y2;
      y2 = a;
      try {
        return b2();
      } finally {
        y2 = c2;
      }
    };
    exports.unstable_scheduleCallback = function(a, b2, c2) {
      var d2 = exports.unstable_now();
      "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c2 + e;
      a = { id: u2++, callback: b2, priorityLevel: a, startTime: c2, expirationTime: e, sortIndex: -1 };
      c2 > d2 ? (a.sortIndex = c2, f2(t, a), null === h2(r) && a === h2(t) && (B ? (E(L2), L2 = -1) : B = true, K2(H, c2 - d2))) : (a.sortIndex = e, f2(r, a), A || z || (A = true, I2(J2)));
      return a;
    };
    exports.unstable_shouldYield = M;
    exports.unstable_wrapCallback = function(a) {
      var b2 = y2;
      return function() {
        var c2 = y2;
        y2 = b2;
        try {
          return a.apply(this, arguments);
        } finally {
          y2 = c2;
        }
      };
    };
  })(scheduler_production_min);
  return scheduler_production_min;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production_min();
  }
  return scheduler.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_production_min;
function requireReactDom_production_min() {
  if (hasRequiredReactDom_production_min) return reactDom_production_min;
  hasRequiredReactDom_production_min = 1;
  var aa = requireReact(), ca = requireScheduler();
  function p2(a) {
    for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c2 = 1; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
    return "Minified React error #" + a + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a, b2) {
    ha(a, b2);
    ha(a + "Capture", b2);
  }
  function ha(a, b2) {
    ea[a] = b2;
    for (a = 0; a < b2.length; a++) da.add(b2[a]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a) {
    if (ja.call(ma, a)) return true;
    if (ja.call(la, a)) return false;
    if (ka.test(a)) return ma[a] = true;
    la[a] = true;
    return false;
  }
  function pa(a, b2, c2, d2) {
    if (null !== c2 && 0 === c2.type) return false;
    switch (typeof b2) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d2) return false;
        if (null !== c2) return !c2.acceptsBooleans;
        a = a.toLowerCase().slice(0, 5);
        return "data-" !== a && "aria-" !== a;
      default:
        return false;
    }
  }
  function qa(a, b2, c2, d2) {
    if (null === b2 || "undefined" === typeof b2 || pa(a, b2, c2, d2)) return true;
    if (d2) return false;
    if (null !== c2) switch (c2.type) {
      case 3:
        return !b2;
      case 4:
        return false === b2;
      case 5:
        return isNaN(b2);
      case 6:
        return isNaN(b2) || 1 > b2;
    }
    return false;
  }
  function v2(a, b2, c2, d2, e, f2, g2) {
    this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
    this.attributeName = d2;
    this.attributeNamespace = e;
    this.mustUseProperty = c2;
    this.propertyName = a;
    this.type = b2;
    this.sanitizeURL = f2;
    this.removeEmptyString = g2;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    z[a] = new v2(a, 0, false, a, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var b2 = a[0];
    z[b2] = new v2(b2, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    z[a] = new v2(a, 2, false, a.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    z[a] = new v2(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    z[a] = new v2(a, 3, false, a.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    z[a] = new v2(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function(a) {
    z[a] = new v2(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a) {
    z[a] = new v2(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a) {
    z[a] = new v2(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b2 = a.replace(
      ra,
      sa
    );
    z[b2] = new v2(b2, 1, false, a, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b2 = a.replace(ra, sa);
    z[b2] = new v2(b2, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var b2 = a.replace(ra, sa);
    z[b2] = new v2(b2, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a) {
    z[a] = new v2(a, 1, false, a.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new v2("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a) {
    z[a] = new v2(a, 1, false, a.toLowerCase(), null, true, true);
  });
  function ta(a, b2, c2, d2) {
    var e = z.hasOwnProperty(b2) ? z[b2] : null;
    if (null !== e ? 0 !== e.type : d2 || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1]) qa(b2, c2, e, d2) && (c2 = null), d2 || null === e ? oa(b2) && (null === c2 ? a.removeAttribute(b2) : a.setAttribute(b2, "" + c2)) : e.mustUseProperty ? a[e.propertyName] = null === c2 ? 3 === e.type ? false : "" : c2 : (b2 = e.attributeName, d2 = e.attributeNamespace, null === c2 ? a.removeAttribute(b2) : (e = e.type, c2 = 3 === e || 4 === e && true === c2 ? "" : "" + c2, d2 ? a.setAttributeNS(d2, b2, c2) : a.setAttribute(b2, c2)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a) {
    if (null === a || "object" !== typeof a) return null;
    a = Ja && a[Ja] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var A = Object.assign, La;
  function Ma(a) {
    if (void 0 === La) try {
      throw Error();
    } catch (c2) {
      var b2 = c2.stack.trim().match(/\n( *(at )?)/);
      La = b2 && b2[1] || "";
    }
    return "\n" + La + a;
  }
  var Na = false;
  function Oa(a, b2) {
    if (!a || Na) return "";
    Na = true;
    var c2 = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b2) if (b2 = function() {
        throw Error();
      }, Object.defineProperty(b2.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b2, []);
        } catch (l) {
          var d2 = l;
        }
        Reflect.construct(a, [], b2);
      } else {
        try {
          b2.call();
        } catch (l) {
          d2 = l;
        }
        a.call(b2.prototype);
      }
      else {
        try {
          throw Error();
        } catch (l) {
          d2 = l;
        }
        a();
      }
    } catch (l) {
      if (l && d2 && "string" === typeof l.stack) {
        for (var e = l.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e[g2] !== f2[h2]; ) h2--;
        for (; 1 <= g2 && 0 <= h2; g2--, h2--) if (e[g2] !== f2[h2]) {
          if (1 !== g2 || 1 !== h2) {
            do
              if (g2--, h2--, 0 > h2 || e[g2] !== f2[h2]) {
                var k = "\n" + e[g2].replace(" at new ", " at ");
                a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                return k;
              }
            while (1 <= g2 && 0 <= h2);
          }
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c2;
    }
    return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
  }
  function Pa(a) {
    switch (a.tag) {
      case 5:
        return Ma(a.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = Oa(a.type, false), a;
      case 11:
        return a = Oa(a.type.render, false), a;
      case 1:
        return a = Oa(a.type, true), a;
      default:
        return "";
    }
  }
  function Qa(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a) switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b2 = a.render;
        a = a.displayName;
        a || (a = b2.displayName || b2.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b2 = a.displayName || null, null !== b2 ? b2 : Qa(a.type) || "Memo";
      case Ha:
        b2 = a._payload;
        a = a._init;
        try {
          return Qa(a(b2));
        } catch (c2) {
        }
    }
    return null;
  }
  function Ra(a) {
    var b2 = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b2.displayName || "Context") + ".Consumer";
      case 10:
        return (b2._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = b2.render, a = a.displayName || a.name || "", b2.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b2;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b2);
      case 8:
        return b2 === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b2) return b2.displayName || b2.name || null;
        if ("string" === typeof b2) return b2;
    }
    return null;
  }
  function Sa(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a;
      case "object":
        return a;
      default:
        return "";
    }
  }
  function Ta(a) {
    var b2 = a.type;
    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
  }
  function Ua(a) {
    var b2 = Ta(a) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a.constructor.prototype, b2), d2 = "" + a[b2];
    if (!a.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
      var e = c2.get, f2 = c2.set;
      Object.defineProperty(a, b2, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(a2) {
        d2 = "" + a2;
        f2.call(this, a2);
      } });
      Object.defineProperty(a, b2, { enumerable: c2.enumerable });
      return { getValue: function() {
        return d2;
      }, setValue: function(a2) {
        d2 = "" + a2;
      }, stopTracking: function() {
        a._valueTracker = null;
        delete a[b2];
      } };
    }
  }
  function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
  }
  function Wa(a) {
    if (!a) return false;
    var b2 = a._valueTracker;
    if (!b2) return true;
    var c2 = b2.getValue();
    var d2 = "";
    a && (d2 = Ta(a) ? a.checked ? "true" : "false" : a.value);
    a = d2;
    return a !== c2 ? (b2.setValue(a), true) : false;
  }
  function Xa(a) {
    a = a || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a) return null;
    try {
      return a.activeElement || a.body;
    } catch (b2) {
      return a.body;
    }
  }
  function Ya(a, b2) {
    var c2 = b2.checked;
    return A({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a._wrapperState.initialChecked });
  }
  function Za(a, b2) {
    var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d2 = null != b2.checked ? b2.checked : b2.defaultChecked;
    c2 = Sa(null != b2.value ? b2.value : c2);
    a._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
  }
  function ab(a, b2) {
    b2 = b2.checked;
    null != b2 && ta(a, "checked", b2, false);
  }
  function bb(a, b2) {
    ab(a, b2);
    var c2 = Sa(b2.value), d2 = b2.type;
    if (null != c2) if ("number" === d2) {
      if (0 === c2 && "" === a.value || a.value != c2) a.value = "" + c2;
    } else a.value !== "" + c2 && (a.value = "" + c2);
    else if ("submit" === d2 || "reset" === d2) {
      a.removeAttribute("value");
      return;
    }
    b2.hasOwnProperty("value") ? cb(a, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb(a, b2.type, Sa(b2.defaultValue));
    null == b2.checked && null != b2.defaultChecked && (a.defaultChecked = !!b2.defaultChecked);
  }
  function db(a, b2, c2) {
    if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
      var d2 = b2.type;
      if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b2.value && null !== b2.value)) return;
      b2 = "" + a._wrapperState.initialValue;
      c2 || b2 === a.value || (a.value = b2);
      a.defaultValue = b2;
    }
    c2 = a.name;
    "" !== c2 && (a.name = "");
    a.defaultChecked = !!a._wrapperState.initialChecked;
    "" !== c2 && (a.name = c2);
  }
  function cb(a, b2, c2) {
    if ("number" !== b2 || Xa(a.ownerDocument) !== a) null == c2 ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c2 && (a.defaultValue = "" + c2);
  }
  var eb = Array.isArray;
  function fb(a, b2, c2, d2) {
    a = a.options;
    if (b2) {
      b2 = {};
      for (var e = 0; e < c2.length; e++) b2["$" + c2[e]] = true;
      for (c2 = 0; c2 < a.length; c2++) e = b2.hasOwnProperty("$" + a[c2].value), a[c2].selected !== e && (a[c2].selected = e), e && d2 && (a[c2].defaultSelected = true);
    } else {
      c2 = "" + Sa(c2);
      b2 = null;
      for (e = 0; e < a.length; e++) {
        if (a[e].value === c2) {
          a[e].selected = true;
          d2 && (a[e].defaultSelected = true);
          return;
        }
        null !== b2 || a[e].disabled || (b2 = a[e]);
      }
      null !== b2 && (b2.selected = true);
    }
  }
  function gb(a, b2) {
    if (null != b2.dangerouslySetInnerHTML) throw Error(p2(91));
    return A({}, b2, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }
  function hb(a, b2) {
    var c2 = b2.value;
    if (null == c2) {
      c2 = b2.children;
      b2 = b2.defaultValue;
      if (null != c2) {
        if (null != b2) throw Error(p2(92));
        if (eb(c2)) {
          if (1 < c2.length) throw Error(p2(93));
          c2 = c2[0];
        }
        b2 = c2;
      }
      null == b2 && (b2 = "");
      c2 = b2;
    }
    a._wrapperState = { initialValue: Sa(c2) };
  }
  function ib(a, b2) {
    var c2 = Sa(b2.value), d2 = Sa(b2.defaultValue);
    null != c2 && (c2 = "" + c2, c2 !== a.value && (a.value = c2), null == b2.defaultValue && a.defaultValue !== c2 && (a.defaultValue = c2));
    null != d2 && (a.defaultValue = "" + d2);
  }
  function jb(a) {
    var b2 = a.textContent;
    b2 === a._wrapperState.initialValue && "" !== b2 && null !== b2 && (a.value = b2);
  }
  function kb(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a, b2) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b2) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a;
  }
  var mb, nb = function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b2, c2, d2, e);
      });
    } : a;
  }(function(a, b2) {
    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b2;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
      for (b2 = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
      for (; b2.firstChild; ) a.appendChild(b2.firstChild);
    }
  });
  function ob(a, b2) {
    if (b2) {
      var c2 = a.firstChild;
      if (c2 && c2 === a.lastChild && 3 === c2.nodeType) {
        c2.nodeValue = b2;
        return;
      }
    }
    a.textContent = b2;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a) {
    qb.forEach(function(b2) {
      b2 = b2 + a.charAt(0).toUpperCase() + a.substring(1);
      pb[b2] = pb[a];
    });
  });
  function rb(a, b2, c2) {
    return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a) && pb[a] ? ("" + b2).trim() : b2 + "px";
  }
  function sb(a, b2) {
    a = a.style;
    for (var c2 in b2) if (b2.hasOwnProperty(c2)) {
      var d2 = 0 === c2.indexOf("--"), e = rb(c2, b2[c2], d2);
      "float" === c2 && (c2 = "cssFloat");
      d2 ? a.setProperty(c2, e) : a[c2] = e;
    }
  }
  var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a, b2) {
    if (b2) {
      if (tb[a] && (null != b2.children || null != b2.dangerouslySetInnerHTML)) throw Error(p2(137, a));
      if (null != b2.dangerouslySetInnerHTML) {
        if (null != b2.children) throw Error(p2(60));
        if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML)) throw Error(p2(61));
      }
      if (null != b2.style && "object" !== typeof b2.style) throw Error(p2(62));
    }
  }
  function vb(a, b2) {
    if (-1 === a.indexOf("-")) return "string" === typeof b2.is;
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a) {
    a = a.target || a.srcElement || window;
    a.correspondingUseElement && (a = a.correspondingUseElement);
    return 3 === a.nodeType ? a.parentNode : a;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a) {
    if (a = Cb(a)) {
      if ("function" !== typeof yb) throw Error(p2(280));
      var b2 = a.stateNode;
      b2 && (b2 = Db(b2), yb(a.stateNode, a.type, b2));
    }
  }
  function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
  }
  function Fb() {
    if (zb) {
      var a = zb, b2 = Ab;
      Ab = zb = null;
      Bb(a);
      if (b2) for (a = 0; a < b2.length; a++) Bb(b2[a]);
    }
  }
  function Gb(a, b2) {
    return a(b2);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a, b2, c2) {
    if (Ib) return a(b2, c2);
    Ib = true;
    try {
      return Gb(a, b2, c2);
    } finally {
      if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
    }
  }
  function Kb(a, b2) {
    var c2 = a.stateNode;
    if (null === c2) return null;
    var d2 = Db(c2);
    if (null === d2) return null;
    c2 = d2[b2];
    a: switch (b2) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d2 = !d2.disabled) || (a = a.type, d2 = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d2;
        break a;
      default:
        a = false;
    }
    if (a) return null;
    if (c2 && "function" !== typeof c2) throw Error(p2(231, b2, typeof c2));
    return c2;
  }
  var Lb = false;
  if (ia) try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
  function Nb(a, b2, c2, d2, e, f2, g2, h2, k) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
      b2.apply(c2, l);
    } catch (m2) {
      this.onError(m2);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
    Ob = true;
    Pb = a;
  } };
  function Tb(a, b2, c2, d2, e, f2, g2, h2, k) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a, b2, c2, d2, e, f2, g2, h2, k) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l = Pb;
        Ob = false;
        Pb = null;
      } else throw Error(p2(198));
      Qb || (Qb = true, Rb = l);
    }
  }
  function Vb(a) {
    var b2 = a, c2 = a;
    if (a.alternate) for (; b2.return; ) b2 = b2.return;
    else {
      a = b2;
      do
        b2 = a, 0 !== (b2.flags & 4098) && (c2 = b2.return), a = b2.return;
      while (a);
    }
    return 3 === b2.tag ? c2 : null;
  }
  function Wb(a) {
    if (13 === a.tag) {
      var b2 = a.memoizedState;
      null === b2 && (a = a.alternate, null !== a && (b2 = a.memoizedState));
      if (null !== b2) return b2.dehydrated;
    }
    return null;
  }
  function Xb(a) {
    if (Vb(a) !== a) throw Error(p2(188));
  }
  function Yb(a) {
    var b2 = a.alternate;
    if (!b2) {
      b2 = Vb(a);
      if (null === b2) throw Error(p2(188));
      return b2 !== a ? null : a;
    }
    for (var c2 = a, d2 = b2; ; ) {
      var e = c2.return;
      if (null === e) break;
      var f2 = e.alternate;
      if (null === f2) {
        d2 = e.return;
        if (null !== d2) {
          c2 = d2;
          continue;
        }
        break;
      }
      if (e.child === f2.child) {
        for (f2 = e.child; f2; ) {
          if (f2 === c2) return Xb(e), a;
          if (f2 === d2) return Xb(e), b2;
          f2 = f2.sibling;
        }
        throw Error(p2(188));
      }
      if (c2.return !== d2.return) c2 = e, d2 = f2;
      else {
        for (var g2 = false, h2 = e.child; h2; ) {
          if (h2 === c2) {
            g2 = true;
            c2 = e;
            d2 = f2;
            break;
          }
          if (h2 === d2) {
            g2 = true;
            d2 = e;
            c2 = f2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2) {
          for (h2 = f2.child; h2; ) {
            if (h2 === c2) {
              g2 = true;
              c2 = f2;
              d2 = e;
              break;
            }
            if (h2 === d2) {
              g2 = true;
              d2 = f2;
              c2 = e;
              break;
            }
            h2 = h2.sibling;
          }
          if (!g2) throw Error(p2(189));
        }
      }
      if (c2.alternate !== d2) throw Error(p2(190));
    }
    if (3 !== c2.tag) throw Error(p2(188));
    return c2.stateNode.current === c2 ? a : b2;
  }
  function Zb(a) {
    a = Yb(a);
    return null !== a ? $b(a) : null;
  }
  function $b(a) {
    if (5 === a.tag || 6 === a.tag) return a;
    for (a = a.child; null !== a; ) {
      var b2 = $b(a);
      if (null !== b2) return b2;
      a = a.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b2) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a) {
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function uc(a, b2) {
    var c2 = a.pendingLanes;
    if (0 === c2) return 0;
    var d2 = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g2 = c2 & 268435455;
    if (0 !== g2) {
      var h2 = g2 & ~e;
      0 !== h2 ? d2 = tc(h2) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
    } else g2 = c2 & ~e, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
    if (0 === d2) return 0;
    if (0 !== b2 && b2 !== d2 && 0 === (b2 & e) && (e = d2 & -d2, f2 = b2 & -b2, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b2;
    0 !== (d2 & 4) && (d2 |= c2 & 16);
    b2 = a.entangledLanes;
    if (0 !== b2) for (a = a.entanglements, b2 &= d2; 0 < b2; ) c2 = 31 - oc(b2), e = 1 << c2, d2 |= a[c2], b2 &= ~e;
    return d2;
  }
  function vc(a, b2) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return b2 + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b2 + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a, b2) {
    for (var c2 = a.suspendedLanes, d2 = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
      var g2 = 31 - oc(f2), h2 = 1 << g2, k = e[g2];
      if (-1 === k) {
        if (0 === (h2 & c2) || 0 !== (h2 & d2)) e[g2] = vc(h2, b2);
      } else k <= b2 && (a.expiredLanes |= h2);
      f2 &= ~h2;
    }
  }
  function xc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a;
  }
  function zc(a) {
    for (var b2 = [], c2 = 0; 31 > c2; c2++) b2.push(a);
    return b2;
  }
  function Ac(a, b2, c2) {
    a.pendingLanes |= b2;
    536870912 !== b2 && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b2 = 31 - oc(b2);
    a[b2] = c2;
  }
  function Bc(a, b2) {
    var c2 = a.pendingLanes & ~b2;
    a.pendingLanes = b2;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= b2;
    a.mutableReadLanes &= b2;
    a.entangledLanes &= b2;
    b2 = a.entanglements;
    var d2 = a.eventTimes;
    for (a = a.expirationTimes; 0 < c2; ) {
      var e = 31 - oc(c2), f2 = 1 << e;
      b2[e] = 0;
      d2[e] = -1;
      a[e] = -1;
      c2 &= ~f2;
    }
  }
  function Cc(a, b2) {
    var c2 = a.entangledLanes |= b2;
    for (a = a.entanglements; c2; ) {
      var d2 = 31 - oc(c2), e = 1 << d2;
      e & b2 | a[d2] & b2 && (a[d2] |= b2);
      c2 &= ~e;
    }
  }
  var C2 = 0;
  function Dc(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a, b2) {
    switch (a) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b2.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b2.pointerId);
    }
  }
  function Tc(a, b2, c2, d2, e, f2) {
    if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a;
    a.eventSystemFlags |= d2;
    b2 = a.targetContainers;
    null !== e && -1 === b2.indexOf(e) && b2.push(e);
    return a;
  }
  function Uc(a, b2, c2, d2, e) {
    switch (b2) {
      case "focusin":
        return Lc = Tc(Lc, a, b2, c2, d2, e), true;
      case "dragenter":
        return Mc = Tc(Mc, a, b2, c2, d2, e), true;
      case "mouseover":
        return Nc = Tc(Nc, a, b2, c2, d2, e), true;
      case "pointerover":
        var f2 = e.pointerId;
        Oc.set(f2, Tc(Oc.get(f2) || null, a, b2, c2, d2, e));
        return true;
      case "gotpointercapture":
        return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b2, c2, d2, e)), true;
    }
    return false;
  }
  function Vc(a) {
    var b2 = Wc(a.target);
    if (null !== b2) {
      var c2 = Vb(b2);
      if (null !== c2) {
        if (b2 = c2.tag, 13 === b2) {
          if (b2 = Wb(c2), null !== b2) {
            a.blockedOn = b2;
            Ic(a.priority, function() {
              Gc(c2);
            });
            return;
          }
        } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
          a.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function Xc(a) {
    if (null !== a.blockedOn) return false;
    for (var b2 = a.targetContainers; 0 < b2.length; ) {
      var c2 = Yc(a.domEventName, a.eventSystemFlags, b2[0], a.nativeEvent);
      if (null === c2) {
        c2 = a.nativeEvent;
        var d2 = new c2.constructor(c2.type, c2);
        wb = d2;
        c2.target.dispatchEvent(d2);
        wb = null;
      } else return b2 = Cb(c2), null !== b2 && Fc(b2), a.blockedOn = c2, false;
      b2.shift();
    }
    return true;
  }
  function Zc(a, b2, c2) {
    Xc(a) && c2.delete(b2);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a, b2) {
    a.blockedOn === b2 && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a) {
    function b2(b3) {
      return ad(b3, a);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a);
      for (var c2 = 1; c2 < Kc.length; c2++) {
        var d2 = Kc[c2];
        d2.blockedOn === a && (d2.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a);
    null !== Mc && ad(Mc, a);
    null !== Nc && ad(Nc, a);
    Oc.forEach(b2);
    Pc.forEach(b2);
    for (c2 = 0; c2 < Qc.length; c2++) d2 = Qc[c2], d2.blockedOn === a && (d2.blockedOn = null);
    for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); ) Vc(c2), null === c2.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a, b2, c2, d2) {
    var e = C2, f2 = cd.transition;
    cd.transition = null;
    try {
      C2 = 1, fd(a, b2, c2, d2);
    } finally {
      C2 = e, cd.transition = f2;
    }
  }
  function gd(a, b2, c2, d2) {
    var e = C2, f2 = cd.transition;
    cd.transition = null;
    try {
      C2 = 4, fd(a, b2, c2, d2);
    } finally {
      C2 = e, cd.transition = f2;
    }
  }
  function fd(a, b2, c2, d2) {
    if (dd) {
      var e = Yc(a, b2, c2, d2);
      if (null === e) hd(a, b2, d2, id, c2), Sc(a, d2);
      else if (Uc(e, a, b2, c2, d2)) d2.stopPropagation();
      else if (Sc(a, d2), b2 & 4 && -1 < Rc.indexOf(a)) {
        for (; null !== e; ) {
          var f2 = Cb(e);
          null !== f2 && Ec(f2);
          f2 = Yc(a, b2, c2, d2);
          null === f2 && hd(a, b2, d2, id, c2);
          if (f2 === e) break;
          e = f2;
        }
        null !== e && d2.stopPropagation();
      } else hd(a, b2, d2, null, c2);
    }
  }
  var id = null;
  function Yc(a, b2, c2, d2) {
    id = null;
    a = xb(d2);
    a = Wc(a);
    if (null !== a) if (b2 = Vb(a), null === b2) a = null;
    else if (c2 = b2.tag, 13 === c2) {
      a = Wb(b2);
      if (null !== a) return a;
      a = null;
    } else if (3 === c2) {
      if (b2.stateNode.current.memoizedState.isDehydrated) return 3 === b2.tag ? b2.stateNode.containerInfo : null;
      a = null;
    } else b2 !== a && (a = null);
    id = a;
    return null;
  }
  function jd(a) {
    switch (a) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a, b2 = ld, c2 = b2.length, d2, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
    for (a = 0; a < c2 && b2[a] === e[a]; a++) ;
    var g2 = c2 - a;
    for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e[f2 - d2]; d2++) ;
    return md = e.slice(a, 1 < d2 ? 1 - d2 : void 0);
  }
  function od(a) {
    var b2 = a.keyCode;
    "charCode" in a ? (a = a.charCode, 0 === a && 13 === b2 && (a = 13)) : a = b2;
    10 === a && (a = 13);
    return 32 <= a || 13 === a ? a : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a) {
    function b2(b3, d2, e, f2, g2) {
      this._reactName = b3;
      this._targetInst = e;
      this.type = d2;
      this.nativeEvent = f2;
      this.target = g2;
      this.currentTarget = null;
      for (var c2 in a) a.hasOwnProperty(c2) && (b3 = a[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
      this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A(b2.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a2 = this.nativeEvent;
      a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a2 = this.nativeEvent;
      a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b2;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    if ("movementX" in a) return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a) {
    var b2 = this.nativeEvent;
    return b2.getModifierState ? b2.getModifierState(a) : (a = Od[a]) ? !!b2[a] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A({}, ud, { key: function(a) {
    if (a.key) {
      var b2 = Md[a.key] || a.key;
      if ("Unidentified" !== b2) return b2;
    }
    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
    return "keypress" === a.type ? od(a) : 0;
  }, keyCode: function(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function(a) {
    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a, b2) {
    switch (a) {
      case "keyup":
        return -1 !== $d.indexOf(b2.keyCode);
      case "keydown":
        return 229 !== b2.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a) {
    a = a.detail;
    return "object" === typeof a && "data" in a ? a.data : null;
  }
  var ie = false;
  function je(a, b2) {
    switch (a) {
      case "compositionend":
        return he(b2);
      case "keypress":
        if (32 !== b2.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a = b2.data, a === ee && fe ? null : a;
      default:
        return null;
    }
  }
  function ke(a, b2) {
    if (ie) return "compositionend" === a || !ae && ge(a, b2) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
          if (b2.char && 1 < b2.char.length) return b2.char;
          if (b2.which) return String.fromCharCode(b2.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b2.locale ? null : b2.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a) {
    var b2 = a && a.nodeName && a.nodeName.toLowerCase();
    return "input" === b2 ? !!le[a.type] : "textarea" === b2 ? true : false;
  }
  function ne(a, b2, c2, d2) {
    Eb(d2);
    b2 = oe(b2, "onChange");
    0 < b2.length && (c2 = new td("onChange", "change", null, c2, d2), a.push({ event: c2, listeners: b2 }));
  }
  var pe = null, qe = null;
  function re(a) {
    se(a, 0);
  }
  function te(a) {
    var b2 = ue(a);
    if (Wa(b2)) return a;
  }
  function ve(a, b2) {
    if ("change" === a) return b2;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a) {
    if ("value" === a.propertyName && te(qe)) {
      var b2 = [];
      ne(b2, qe, a, xb(a));
      Jb(re, b2);
    }
  }
  function Ce(a, b2, c2) {
    "focusin" === a ? (Ae(), pe = b2, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
  }
  function De(a) {
    if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
  }
  function Ee(a, b2) {
    if ("click" === a) return te(b2);
  }
  function Fe(a, b2) {
    if ("input" === a || "change" === a) return te(b2);
  }
  function Ge(a, b2) {
    return a === b2 && (0 !== a || 1 / a === 1 / b2) || a !== a && b2 !== b2;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a, b2) {
    if (He(a, b2)) return true;
    if ("object" !== typeof a || null === a || "object" !== typeof b2 || null === b2) return false;
    var c2 = Object.keys(a), d2 = Object.keys(b2);
    if (c2.length !== d2.length) return false;
    for (d2 = 0; d2 < c2.length; d2++) {
      var e = c2[d2];
      if (!ja.call(b2, e) || !He(a[e], b2[e])) return false;
    }
    return true;
  }
  function Je(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function Ke(a, b2) {
    var c2 = Je(a);
    a = 0;
    for (var d2; c2; ) {
      if (3 === c2.nodeType) {
        d2 = a + c2.textContent.length;
        if (a <= b2 && d2 >= b2) return { node: c2, offset: b2 - a };
        a = d2;
      }
      a: {
        for (; c2; ) {
          if (c2.nextSibling) {
            c2 = c2.nextSibling;
            break a;
          }
          c2 = c2.parentNode;
        }
        c2 = void 0;
      }
      c2 = Je(c2);
    }
  }
  function Le(a, b2) {
    return a && b2 ? a === b2 ? true : a && 3 === a.nodeType ? false : b2 && 3 === b2.nodeType ? Le(a, b2.parentNode) : "contains" in a ? a.contains(b2) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b2) & 16) : false : false;
  }
  function Me() {
    for (var a = window, b2 = Xa(); b2 instanceof a.HTMLIFrameElement; ) {
      try {
        var c2 = "string" === typeof b2.contentWindow.location.href;
      } catch (d2) {
        c2 = false;
      }
      if (c2) a = b2.contentWindow;
      else break;
      b2 = Xa(a.document);
    }
    return b2;
  }
  function Ne(a) {
    var b2 = a && a.nodeName && a.nodeName.toLowerCase();
    return b2 && ("input" === b2 && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b2 || "true" === a.contentEditable);
  }
  function Oe(a) {
    var b2 = Me(), c2 = a.focusedElem, d2 = a.selectionRange;
    if (b2 !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
      if (null !== d2 && Ne(c2)) {
        if (b2 = d2.start, a = d2.end, void 0 === a && (a = b2), "selectionStart" in c2) c2.selectionStart = b2, c2.selectionEnd = Math.min(a, c2.value.length);
        else if (a = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a.getSelection) {
          a = a.getSelection();
          var e = c2.textContent.length, f2 = Math.min(d2.start, e);
          d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e);
          !a.extend && f2 > d2 && (e = d2, d2 = f2, f2 = e);
          e = Ke(c2, f2);
          var g2 = Ke(
            c2,
            d2
          );
          e && g2 && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g2.node || a.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d2 ? (a.addRange(b2), a.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a.addRange(b2)));
        }
      }
      b2 = [];
      for (a = c2; a = a.parentNode; ) 1 === a.nodeType && b2.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      "function" === typeof c2.focus && c2.focus();
      for (c2 = 0; c2 < b2.length; c2++) a = b2[c2], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a, b2, c2) {
    var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
    Te || null == Qe || Qe !== Xa(d2) || (d2 = Qe, "selectionStart" in d2 && Ne(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se && Ie(Se, d2) || (Se = d2, d2 = oe(Re, "onSelect"), 0 < d2.length && (b2 = new td("onSelect", "select", null, b2, c2), a.push({ event: b2, listeners: d2 }), b2.target = Qe)));
  }
  function Ve(a, b2) {
    var c2 = {};
    c2[a.toLowerCase()] = b2.toLowerCase();
    c2["Webkit" + a] = "webkit" + b2;
    c2["Moz" + a] = "moz" + b2;
    return c2;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a) {
    if (Xe[a]) return Xe[a];
    if (!We[a]) return a;
    var b2 = We[a], c2;
    for (c2 in b2) if (b2.hasOwnProperty(c2) && c2 in Ye) return Xe[a] = b2[c2];
    return a;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a, b2) {
    df.set(a, b2);
    fa(b2, [a]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a, b2, c2) {
    var d2 = a.type || "unknown-event";
    a.currentTarget = c2;
    Ub(d2, b2, void 0, a);
    a.currentTarget = null;
  }
  function se(a, b2) {
    b2 = 0 !== (b2 & 4);
    for (var c2 = 0; c2 < a.length; c2++) {
      var d2 = a[c2], e = d2.event;
      d2 = d2.listeners;
      a: {
        var f2 = void 0;
        if (b2) for (var g2 = d2.length - 1; 0 <= g2; g2--) {
          var h2 = d2[g2], k = h2.instance, l = h2.currentTarget;
          h2 = h2.listener;
          if (k !== f2 && e.isPropagationStopped()) break a;
          nf(e, h2, l);
          f2 = k;
        }
        else for (g2 = 0; g2 < d2.length; g2++) {
          h2 = d2[g2];
          k = h2.instance;
          l = h2.currentTarget;
          h2 = h2.listener;
          if (k !== f2 && e.isPropagationStopped()) break a;
          nf(e, h2, l);
          f2 = k;
        }
      }
    }
    if (Qb) throw a = Rb, Qb = false, Rb = null, a;
  }
  function D2(a, b2) {
    var c2 = b2[of];
    void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
    var d2 = a + "__bubble";
    c2.has(d2) || (pf(b2, a, 2, false), c2.add(d2));
  }
  function qf(a, b2, c2) {
    var d2 = 0;
    b2 && (d2 |= 4);
    pf(c2, a, d2, b2);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a) {
    if (!a[rf]) {
      a[rf] = true;
      da.forEach(function(b3) {
        "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a), qf(b3, true, a));
      });
      var b2 = 9 === a.nodeType ? a : a.ownerDocument;
      null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
    }
  }
  function pf(a, b2, c2, d2) {
    switch (jd(b2)) {
      case 1:
        var e = ed;
        break;
      case 4:
        e = gd;
        break;
      default:
        e = fd;
    }
    c2 = e.bind(null, b2, c2, a);
    e = void 0;
    !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e = true);
    d2 ? void 0 !== e ? a.addEventListener(b2, c2, { capture: true, passive: e }) : a.addEventListener(b2, c2, true) : void 0 !== e ? a.addEventListener(b2, c2, { passive: e }) : a.addEventListener(b2, c2, false);
  }
  function hd(a, b2, c2, d2, e) {
    var f2 = d2;
    if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d2) a: for (; ; ) {
      if (null === d2) return;
      var g2 = d2.tag;
      if (3 === g2 || 4 === g2) {
        var h2 = d2.stateNode.containerInfo;
        if (h2 === e || 8 === h2.nodeType && h2.parentNode === e) break;
        if (4 === g2) for (g2 = d2.return; null !== g2; ) {
          var k = g2.tag;
          if (3 === k || 4 === k) {
            if (k = g2.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
          }
          g2 = g2.return;
        }
        for (; null !== h2; ) {
          g2 = Wc(h2);
          if (null === g2) return;
          k = g2.tag;
          if (5 === k || 6 === k) {
            d2 = f2 = g2;
            continue a;
          }
          h2 = h2.parentNode;
        }
      }
      d2 = d2.return;
    }
    Jb(function() {
      var d3 = f2, e2 = xb(c2), g3 = [];
      a: {
        var h3 = df.get(a);
        if (void 0 !== h3) {
          var k2 = td, n = a;
          switch (a) {
            case "keypress":
              if (0 === od(c2)) break a;
            case "keydown":
            case "keyup":
              k2 = Rd;
              break;
            case "focusin":
              n = "focus";
              k2 = Fd;
              break;
            case "focusout":
              n = "blur";
              k2 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k2 = Fd;
              break;
            case "click":
              if (2 === c2.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k2 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k2 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k2 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k2 = Hd;
              break;
            case cf:
              k2 = Xd;
              break;
            case "scroll":
              k2 = vd;
              break;
            case "wheel":
              k2 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k2 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k2 = Td;
          }
          var t = 0 !== (b2 & 4), J2 = !t && "scroll" === a, x2 = t ? null !== h3 ? h3 + "Capture" : null : h3;
          t = [];
          for (var w2 = d3, u2; null !== w2; ) {
            u2 = w2;
            var F2 = u2.stateNode;
            5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t.push(tf(w2, F2, u2))));
            if (J2) break;
            w2 = w2.return;
          }
          0 < t.length && (h3 = new k2(h3, n, null, c2, e2), g3.push({ event: h3, listeners: t }));
        }
      }
      if (0 === (b2 & 7)) {
        a: {
          h3 = "mouseover" === a || "pointerover" === a;
          k2 = "mouseout" === a || "pointerout" === a;
          if (h3 && c2 !== wb && (n = c2.relatedTarget || c2.fromElement) && (Wc(n) || n[uf])) break a;
          if (k2 || h3) {
            h3 = e2.window === e2 ? e2 : (h3 = e2.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
            if (k2) {
              if (n = c2.relatedTarget || c2.toElement, k2 = d3, n = n ? Wc(n) : null, null !== n && (J2 = Vb(n), n !== J2 || 5 !== n.tag && 6 !== n.tag)) n = null;
            } else k2 = null, n = d3;
            if (k2 !== n) {
              t = Bd;
              F2 = "onMouseLeave";
              x2 = "onMouseEnter";
              w2 = "mouse";
              if ("pointerout" === a || "pointerover" === a) t = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
              J2 = null == k2 ? h3 : ue(k2);
              u2 = null == n ? h3 : ue(n);
              h3 = new t(F2, w2 + "leave", k2, c2, e2);
              h3.target = J2;
              h3.relatedTarget = u2;
              F2 = null;
              Wc(e2) === d3 && (t = new t(x2, w2 + "enter", n, c2, e2), t.target = u2, t.relatedTarget = J2, F2 = t);
              J2 = F2;
              if (k2 && n) b: {
                t = k2;
                x2 = n;
                w2 = 0;
                for (u2 = t; u2; u2 = vf(u2)) w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2)) u2++;
                for (; 0 < w2 - u2; ) t = vf(t), w2--;
                for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t === x2 || null !== x2 && t === x2.alternate) break b;
                  t = vf(t);
                  x2 = vf(x2);
                }
                t = null;
              }
              else t = null;
              null !== k2 && wf(g3, h3, k2, t, false);
              null !== n && null !== J2 && wf(g3, J2, n, t, true);
            }
          }
        }
        a: {
          h3 = d3 ? ue(d3) : window;
          k2 = h3.nodeName && h3.nodeName.toLowerCase();
          if ("select" === k2 || "input" === k2 && "file" === h3.type) var na = ve;
          else if (me(h3)) if (we) na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
          else (k2 = h3.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee);
          if (na && (na = na(a, d3))) {
            ne(g3, na, c2, e2);
            break a;
          }
          xa && xa(a, h3, d3);
          "focusout" === a && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
        }
        xa = d3 ? ue(d3) : window;
        switch (a) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d3, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g3, c2, e2);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g3, c2, e2);
        }
        var $a;
        if (ae) b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
        else ie ? ge(a, c2) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c2.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d3, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c2, e2), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a, c2) : ke(a, c2)) d3 = oe(d3, "onBeforeInput"), 0 < d3.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c2, e2), g3.push({ event: e2, listeners: d3 }), e2.data = $a);
      }
      se(g3, b2);
    });
  }
  function tf(a, b2, c2) {
    return { instance: a, listener: b2, currentTarget: c2 };
  }
  function oe(a, b2) {
    for (var c2 = b2 + "Capture", d2 = []; null !== a; ) {
      var e = a, f2 = e.stateNode;
      5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c2), null != f2 && d2.unshift(tf(a, f2, e)), f2 = Kb(a, b2), null != f2 && d2.push(tf(a, f2, e)));
      a = a.return;
    }
    return d2;
  }
  function vf(a) {
    if (null === a) return null;
    do
      a = a.return;
    while (a && 5 !== a.tag);
    return a ? a : null;
  }
  function wf(a, b2, c2, d2, e) {
    for (var f2 = b2._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
      var h2 = c2, k = h2.alternate, l = h2.stateNode;
      if (null !== k && k === d2) break;
      5 === h2.tag && null !== l && (h2 = l, e ? (k = Kb(c2, f2), null != k && g2.unshift(tf(c2, k, h2))) : e || (k = Kb(c2, f2), null != k && g2.push(tf(c2, k, h2))));
      c2 = c2.return;
    }
    0 !== g2.length && a.push({ event: b2, listeners: g2 });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a) {
    return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
  }
  function Af(a, b2, c2) {
    b2 = zf(b2);
    if (zf(a) !== b2 && c2) throw Error(p2(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a, b2) {
    return "textarea" === a || "noscript" === a || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
    return Hf.resolve(null).then(a).catch(If);
  } : Ff;
  function If(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function Kf(a, b2) {
    var c2 = b2, d2 = 0;
    do {
      var e = c2.nextSibling;
      a.removeChild(c2);
      if (e && 8 === e.nodeType) if (c2 = e.data, "/$" === c2) {
        if (0 === d2) {
          a.removeChild(e);
          bd(b2);
          return;
        }
        d2--;
      } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
      c2 = e;
    } while (c2);
    bd(b2);
  }
  function Lf(a) {
    for (; null != a; a = a.nextSibling) {
      var b2 = a.nodeType;
      if (1 === b2 || 3 === b2) break;
      if (8 === b2) {
        b2 = a.data;
        if ("$" === b2 || "$!" === b2 || "$?" === b2) break;
        if ("/$" === b2) return null;
      }
    }
    return a;
  }
  function Mf(a) {
    a = a.previousSibling;
    for (var b2 = 0; a; ) {
      if (8 === a.nodeType) {
        var c2 = a.data;
        if ("$" === c2 || "$!" === c2 || "$?" === c2) {
          if (0 === b2) return a;
          b2--;
        } else "/$" === c2 && b2++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a) {
    var b2 = a[Of];
    if (b2) return b2;
    for (var c2 = a.parentNode; c2; ) {
      if (b2 = c2[uf] || c2[Of]) {
        c2 = b2.alternate;
        if (null !== b2.child || null !== c2 && null !== c2.child) for (a = Mf(a); null !== a; ) {
          if (c2 = a[Of]) return c2;
          a = Mf(a);
        }
        return b2;
      }
      a = c2;
      c2 = a.parentNode;
    }
    return null;
  }
  function Cb(a) {
    a = a[Of] || a[uf];
    return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
  }
  function ue(a) {
    if (5 === a.tag || 6 === a.tag) return a.stateNode;
    throw Error(p2(33));
  }
  function Db(a) {
    return a[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a) {
    return { current: a };
  }
  function E(a) {
    0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a, b2) {
    Tf++;
    Sf[Tf] = a.current;
    a.current = b2;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a, b2) {
    var c2 = a.type.contextTypes;
    if (!c2) return Vf;
    var d2 = a.stateNode;
    if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2) return d2.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f2;
    for (f2 in c2) e[f2] = b2[f2];
    d2 && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b2, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function Zf(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function $f() {
    E(Wf);
    E(H);
  }
  function ag(a, b2, c2) {
    if (H.current !== Vf) throw Error(p2(168));
    G(H, b2);
    G(Wf, c2);
  }
  function bg(a, b2, c2) {
    var d2 = a.stateNode;
    b2 = b2.childContextTypes;
    if ("function" !== typeof d2.getChildContext) return c2;
    d2 = d2.getChildContext();
    for (var e in d2) if (!(e in b2)) throw Error(p2(108, Ra(a) || "Unknown", e));
    return A({}, c2, d2);
  }
  function cg(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a, b2, c2) {
    var d2 = a.stateNode;
    if (!d2) throw Error(p2(169));
    c2 ? (a = bg(a, b2, Xf), d2.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
    G(Wf, c2);
  }
  var eg = null, fg = false, gg = false;
  function hg(a) {
    null === eg ? eg = [a] : eg.push(a);
  }
  function ig(a) {
    fg = true;
    hg(a);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a = 0, b2 = C2;
      try {
        var c2 = eg;
        for (C2 = 1; a < c2.length; a++) {
          var d2 = c2[a];
          do
            d2 = d2(true);
          while (null !== d2);
        }
        eg = null;
        fg = false;
      } catch (e) {
        throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
      } finally {
        C2 = b2, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a, b2) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a;
    ng = b2;
  }
  function ug(a, b2, c2) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a;
    var d2 = rg;
    a = sg;
    var e = 32 - oc(d2) - 1;
    d2 &= ~(1 << e);
    c2 += 1;
    var f2 = 32 - oc(b2) + e;
    if (30 < f2) {
      var g2 = e - e % 5;
      f2 = (d2 & (1 << g2) - 1).toString(32);
      d2 >>= g2;
      e -= g2;
      rg = 1 << 32 - oc(b2) + e | c2 << e | d2;
      sg = f2 + a;
    } else rg = 1 << f2 | c2 << e | d2, sg = a;
  }
  function vg(a) {
    null !== a.return && (tg(a, 1), ug(a, 1, 0));
  }
  function wg(a) {
    for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I2 = false, zg = null;
  function Ag(a, b2) {
    var c2 = Bg(5, null, null, 0);
    c2.elementType = "DELETED";
    c2.stateNode = b2;
    c2.return = a;
    b2 = a.deletions;
    null === b2 ? (a.deletions = [c2], a.flags |= 16) : b2.push(c2);
  }
  function Cg(a, b2) {
    switch (a.tag) {
      case 5:
        var c2 = a.type;
        b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
        return null !== b2 ? (a.stateNode = b2, xg = a, yg = Lf(b2.firstChild), true) : false;
      case 6:
        return b2 = "" === a.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a.stateNode = b2, xg = a, yg = null, true) : false;
      case 13:
        return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b2, c2.return = a, a.child = c2, xg = a, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function Eg(a) {
    if (I2) {
      var b2 = yg;
      if (b2) {
        var c2 = b2;
        if (!Cg(a, b2)) {
          if (Dg(a)) throw Error(p2(418));
          b2 = Lf(c2.nextSibling);
          var d2 = xg;
          b2 && Cg(a, b2) ? Ag(d2, c2) : (a.flags = a.flags & -4097 | 2, I2 = false, xg = a);
        }
      } else {
        if (Dg(a)) throw Error(p2(418));
        a.flags = a.flags & -4097 | 2;
        I2 = false;
        xg = a;
      }
    }
  }
  function Fg(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
    xg = a;
  }
  function Gg(a) {
    if (a !== xg) return false;
    if (!I2) return Fg(a), I2 = true, false;
    var b2;
    (b2 = 3 !== a.tag) && !(b2 = 5 !== a.tag) && (b2 = a.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a.type, a.memoizedProps));
    if (b2 && (b2 = yg)) {
      if (Dg(a)) throw Hg(), Error(p2(418));
      for (; b2; ) Ag(a, b2), b2 = Lf(b2.nextSibling);
    }
    Fg(a);
    if (13 === a.tag) {
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(p2(317));
      a: {
        a = a.nextSibling;
        for (b2 = 0; a; ) {
          if (8 === a.nodeType) {
            var c2 = a.data;
            if ("/$" === c2) {
              if (0 === b2) {
                yg = Lf(a.nextSibling);
                break a;
              }
              b2--;
            } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
          }
          a = a.nextSibling;
        }
        yg = null;
      }
    } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a = yg; a; ) a = Lf(a.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I2 = false;
  }
  function Jg(a) {
    null === zg ? zg = [a] : zg.push(a);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a, b2, c2) {
    a = c2.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c2._owner) {
        c2 = c2._owner;
        if (c2) {
          if (1 !== c2.tag) throw Error(p2(309));
          var d2 = c2.stateNode;
        }
        if (!d2) throw Error(p2(147, a));
        var e = d2, f2 = "" + a;
        if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2) return b2.ref;
        b2 = function(a2) {
          var b3 = e.refs;
          null === a2 ? delete b3[f2] : b3[f2] = a2;
        };
        b2._stringRef = f2;
        return b2;
      }
      if ("string" !== typeof a) throw Error(p2(284));
      if (!c2._owner) throw Error(p2(290, a));
    }
    return a;
  }
  function Mg(a, b2) {
    a = Object.prototype.toString.call(b2);
    throw Error(p2(31, "[object Object]" === a ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a));
  }
  function Ng(a) {
    var b2 = a._init;
    return b2(a._payload);
  }
  function Og(a) {
    function b2(b3, c3) {
      if (a) {
        var d3 = b3.deletions;
        null === d3 ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
      }
    }
    function c2(c3, d3) {
      if (!a) return null;
      for (; null !== d3; ) b2(c3, d3), d3 = d3.sibling;
      return null;
    }
    function d2(a2, b3) {
      for (a2 = /* @__PURE__ */ new Map(); null !== b3; ) null !== b3.key ? a2.set(b3.key, b3) : a2.set(b3.index, b3), b3 = b3.sibling;
      return a2;
    }
    function e(a2, b3) {
      a2 = Pg(a2, b3);
      a2.index = 0;
      a2.sibling = null;
      return a2;
    }
    function f2(b3, c3, d3) {
      b3.index = d3;
      if (!a) return b3.flags |= 1048576, c3;
      d3 = b3.alternate;
      if (null !== d3) return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
      b3.flags |= 2;
      return c3;
    }
    function g2(b3) {
      a && null === b3.alternate && (b3.flags |= 2);
      return b3;
    }
    function h2(a2, b3, c3, d3) {
      if (null === b3 || 6 !== b3.tag) return b3 = Qg(c3, a2.mode, d3), b3.return = a2, b3;
      b3 = e(b3, c3);
      b3.return = a2;
      return b3;
    }
    function k(a2, b3, c3, d3) {
      var f3 = c3.type;
      if (f3 === ya) return m2(a2, b3, c3.props.children, d3, c3.key);
      if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b3.type)) return d3 = e(b3, c3.props), d3.ref = Lg(a2, b3, c3), d3.return = a2, d3;
      d3 = Rg(c3.type, c3.key, c3.props, null, a2.mode, d3);
      d3.ref = Lg(a2, b3, c3);
      d3.return = a2;
      return d3;
    }
    function l(a2, b3, c3, d3) {
      if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation) return b3 = Sg(c3, a2.mode, d3), b3.return = a2, b3;
      b3 = e(b3, c3.children || []);
      b3.return = a2;
      return b3;
    }
    function m2(a2, b3, c3, d3, f3) {
      if (null === b3 || 7 !== b3.tag) return b3 = Tg(c3, a2.mode, d3, f3), b3.return = a2, b3;
      b3 = e(b3, c3);
      b3.return = a2;
      return b3;
    }
    function q2(a2, b3, c3) {
      if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3) return b3 = Qg("" + b3, a2.mode, c3), b3.return = a2, b3;
      if ("object" === typeof b3 && null !== b3) {
        switch (b3.$$typeof) {
          case va:
            return c3 = Rg(b3.type, b3.key, b3.props, null, a2.mode, c3), c3.ref = Lg(a2, null, b3), c3.return = a2, c3;
          case wa:
            return b3 = Sg(b3, a2.mode, c3), b3.return = a2, b3;
          case Ha:
            var d3 = b3._init;
            return q2(a2, d3(b3._payload), c3);
        }
        if (eb(b3) || Ka(b3)) return b3 = Tg(b3, a2.mode, c3, null), b3.return = a2, b3;
        Mg(a2, b3);
      }
      return null;
    }
    function r(a2, b3, c3, d3) {
      var e2 = null !== b3 ? b3.key : null;
      if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e2 ? null : h2(a2, b3, "" + c3, d3);
      if ("object" === typeof c3 && null !== c3) {
        switch (c3.$$typeof) {
          case va:
            return c3.key === e2 ? k(a2, b3, c3, d3) : null;
          case wa:
            return c3.key === e2 ? l(a2, b3, c3, d3) : null;
          case Ha:
            return e2 = c3._init, r(
              a2,
              b3,
              e2(c3._payload),
              d3
            );
        }
        if (eb(c3) || Ka(c3)) return null !== e2 ? null : m2(a2, b3, c3, d3, null);
        Mg(a2, c3);
      }
      return null;
    }
    function y2(a2, b3, c3, d3, e2) {
      if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3) return a2 = a2.get(c3) || null, h2(b3, a2, "" + d3, e2);
      if ("object" === typeof d3 && null !== d3) {
        switch (d3.$$typeof) {
          case va:
            return a2 = a2.get(null === d3.key ? c3 : d3.key) || null, k(b3, a2, d3, e2);
          case wa:
            return a2 = a2.get(null === d3.key ? c3 : d3.key) || null, l(b3, a2, d3, e2);
          case Ha:
            var f3 = d3._init;
            return y2(a2, b3, c3, f3(d3._payload), e2);
        }
        if (eb(d3) || Ka(d3)) return a2 = a2.get(c3) || null, m2(b3, a2, d3, e2, null);
        Mg(b3, d3);
      }
      return null;
    }
    function n(e2, g3, h3, k2) {
      for (var l2 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
        u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
        var n2 = r(e2, u2, h3[w2], k2);
        if (null === n2) {
          null === u2 && (u2 = x2);
          break;
        }
        a && u2 && null === n2.alternate && b2(e2, u2);
        g3 = f2(n2, g3, w2);
        null === m3 ? l2 = n2 : m3.sibling = n2;
        m3 = n2;
        u2 = x2;
      }
      if (w2 === h3.length) return c2(e2, u2), I2 && tg(e2, w2), l2;
      if (null === u2) {
        for (; w2 < h3.length; w2++) u2 = q2(e2, h3[w2], k2), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l2 = u2 : m3.sibling = u2, m3 = u2);
        I2 && tg(e2, w2);
        return l2;
      }
      for (u2 = d2(e2, u2); w2 < h3.length; w2++) x2 = y2(u2, e2, w2, h3[w2], k2), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l2 = x2 : m3.sibling = x2, m3 = x2);
      a && u2.forEach(function(a2) {
        return b2(e2, a2);
      });
      I2 && tg(e2, w2);
      return l2;
    }
    function t(e2, g3, h3, k2) {
      var l2 = Ka(h3);
      if ("function" !== typeof l2) throw Error(p2(150));
      h3 = l2.call(h3);
      if (null == h3) throw Error(p2(151));
      for (var u2 = l2 = null, m3 = g3, w2 = g3 = 0, x2 = null, n2 = h3.next(); null !== m3 && !n2.done; w2++, n2 = h3.next()) {
        m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
        var t2 = r(e2, m3, n2.value, k2);
        if (null === t2) {
          null === m3 && (m3 = x2);
          break;
        }
        a && m3 && null === t2.alternate && b2(e2, m3);
        g3 = f2(t2, g3, w2);
        null === u2 ? l2 = t2 : u2.sibling = t2;
        u2 = t2;
        m3 = x2;
      }
      if (n2.done) return c2(
        e2,
        m3
      ), I2 && tg(e2, w2), l2;
      if (null === m3) {
        for (; !n2.done; w2++, n2 = h3.next()) n2 = q2(e2, n2.value, k2), null !== n2 && (g3 = f2(n2, g3, w2), null === u2 ? l2 = n2 : u2.sibling = n2, u2 = n2);
        I2 && tg(e2, w2);
        return l2;
      }
      for (m3 = d2(e2, m3); !n2.done; w2++, n2 = h3.next()) n2 = y2(m3, e2, w2, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m3.delete(null === n2.key ? w2 : n2.key), g3 = f2(n2, g3, w2), null === u2 ? l2 = n2 : u2.sibling = n2, u2 = n2);
      a && m3.forEach(function(a2) {
        return b2(e2, a2);
      });
      I2 && tg(e2, w2);
      return l2;
    }
    function J2(a2, d3, f3, h3) {
      "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
      if ("object" === typeof f3 && null !== f3) {
        switch (f3.$$typeof) {
          case va:
            a: {
              for (var k2 = f3.key, l2 = d3; null !== l2; ) {
                if (l2.key === k2) {
                  k2 = f3.type;
                  if (k2 === ya) {
                    if (7 === l2.tag) {
                      c2(a2, l2.sibling);
                      d3 = e(l2, f3.props.children);
                      d3.return = a2;
                      a2 = d3;
                      break a;
                    }
                  } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                    c2(a2, l2.sibling);
                    d3 = e(l2, f3.props);
                    d3.ref = Lg(a2, l2, f3);
                    d3.return = a2;
                    a2 = d3;
                    break a;
                  }
                  c2(a2, l2);
                  break;
                } else b2(a2, l2);
                l2 = l2.sibling;
              }
              f3.type === ya ? (d3 = Tg(f3.props.children, a2.mode, h3, f3.key), d3.return = a2, a2 = d3) : (h3 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h3), h3.ref = Lg(a2, d3, f3), h3.return = a2, a2 = h3);
            }
            return g2(a2);
          case wa:
            a: {
              for (l2 = f3.key; null !== d3; ) {
                if (d3.key === l2) if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                  c2(a2, d3.sibling);
                  d3 = e(d3, f3.children || []);
                  d3.return = a2;
                  a2 = d3;
                  break a;
                } else {
                  c2(a2, d3);
                  break;
                }
                else b2(a2, d3);
                d3 = d3.sibling;
              }
              d3 = Sg(f3, a2.mode, h3);
              d3.return = a2;
              a2 = d3;
            }
            return g2(a2);
          case Ha:
            return l2 = f3._init, J2(a2, d3, l2(f3._payload), h3);
        }
        if (eb(f3)) return n(a2, d3, f3, h3);
        if (Ka(f3)) return t(a2, d3, f3, h3);
        Mg(a2, f3);
      }
      return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a2, d3.sibling), d3 = e(d3, f3), d3.return = a2, a2 = d3) : (c2(a2, d3), d3 = Qg(f3, a2.mode, h3), d3.return = a2, a2 = d3), g2(a2)) : c2(a2, d3);
    }
    return J2;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a) {
    var b2 = Wg.current;
    E(Wg);
    a._currentValue = b2;
  }
  function bh(a, b2, c2) {
    for (; null !== a; ) {
      var d2 = a.alternate;
      (a.childLanes & b2) !== b2 ? (a.childLanes |= b2, null !== d2 && (d2.childLanes |= b2)) : null !== d2 && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
      if (a === c2) break;
      a = a.return;
    }
  }
  function ch(a, b2) {
    Xg = a;
    Zg = Yg = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b2) && (dh = true), a.firstContext = null);
  }
  function eh(a) {
    var b2 = a._currentValue;
    if (Zg !== a) if (a = { context: a, memoizedValue: b2, next: null }, null === Yg) {
      if (null === Xg) throw Error(p2(308));
      Yg = a;
      Xg.dependencies = { lanes: 0, firstContext: a };
    } else Yg = Yg.next = a;
    return b2;
  }
  var fh = null;
  function gh(a) {
    null === fh ? fh = [a] : fh.push(a);
  }
  function hh(a, b2, c2, d2) {
    var e = b2.interleaved;
    null === e ? (c2.next = c2, gh(b2)) : (c2.next = e.next, e.next = c2);
    b2.interleaved = c2;
    return ih(a, d2);
  }
  function ih(a, b2) {
    a.lanes |= b2;
    var c2 = a.alternate;
    null !== c2 && (c2.lanes |= b2);
    c2 = a;
    for (a = a.return; null !== a; ) a.childLanes |= b2, c2 = a.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a, a = a.return;
    return 3 === c2.tag ? c2.stateNode : null;
  }
  var jh = false;
  function kh(a) {
    a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a, b2) {
    a = a.updateQueue;
    b2.updateQueue === a && (b2.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
  }
  function mh(a, b2) {
    return { eventTime: a, lane: b2, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a, b2, c2) {
    var d2 = a.updateQueue;
    if (null === d2) return null;
    d2 = d2.shared;
    if (0 !== (K2 & 2)) {
      var e = d2.pending;
      null === e ? b2.next = b2 : (b2.next = e.next, e.next = b2);
      d2.pending = b2;
      return ih(a, c2);
    }
    e = d2.interleaved;
    null === e ? (b2.next = b2, gh(d2)) : (b2.next = e.next, e.next = b2);
    d2.interleaved = b2;
    return ih(a, c2);
  }
  function oh(a, b2, c2) {
    b2 = b2.updateQueue;
    if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
      var d2 = b2.lanes;
      d2 &= a.pendingLanes;
      c2 |= d2;
      b2.lanes = c2;
      Cc(a, c2);
    }
  }
  function ph(a, b2) {
    var c2 = a.updateQueue, d2 = a.alternate;
    if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
      var e = null, f2 = null;
      c2 = c2.firstBaseUpdate;
      if (null !== c2) {
        do {
          var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
          null === f2 ? e = f2 = g2 : f2 = f2.next = g2;
          c2 = c2.next;
        } while (null !== c2);
        null === f2 ? e = f2 = b2 : f2 = f2.next = b2;
      } else e = f2 = b2;
      c2 = { baseState: d2.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
      a.updateQueue = c2;
      return;
    }
    a = c2.lastBaseUpdate;
    null === a ? c2.firstBaseUpdate = b2 : a.next = b2;
    c2.lastBaseUpdate = b2;
  }
  function qh(a, b2, c2, d2) {
    var e = a.updateQueue;
    jh = false;
    var f2 = e.firstBaseUpdate, g2 = e.lastBaseUpdate, h2 = e.shared.pending;
    if (null !== h2) {
      e.shared.pending = null;
      var k = h2, l = k.next;
      k.next = null;
      null === g2 ? f2 = l : g2.next = l;
      g2 = k;
      var m2 = a.alternate;
      null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l : h2.next = l, m2.lastBaseUpdate = k));
    }
    if (null !== f2) {
      var q2 = e.baseState;
      g2 = 0;
      m2 = l = k = null;
      h2 = f2;
      do {
        var r = h2.lane, y2 = h2.eventTime;
        if ((d2 & r) === r) {
          null !== m2 && (m2 = m2.next = {
            eventTime: y2,
            lane: 0,
            tag: h2.tag,
            payload: h2.payload,
            callback: h2.callback,
            next: null
          });
          a: {
            var n = a, t = h2;
            r = b2;
            y2 = c2;
            switch (t.tag) {
              case 1:
                n = t.payload;
                if ("function" === typeof n) {
                  q2 = n.call(y2, q2, r);
                  break a;
                }
                q2 = n;
                break a;
              case 3:
                n.flags = n.flags & -65537 | 128;
              case 0:
                n = t.payload;
                r = "function" === typeof n ? n.call(y2, q2, r) : n;
                if (null === r || void 0 === r) break a;
                q2 = A({}, q2, r);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h2.callback && 0 !== h2.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h2] : r.push(h2));
        } else y2 = { eventTime: y2, lane: r, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l = m2 = y2, k = q2) : m2 = m2.next = y2, g2 |= r;
        h2 = h2.next;
        if (null === h2) if (h2 = e.shared.pending, null === h2) break;
        else r = h2, h2 = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
      } while (1);
      null === m2 && (k = q2);
      e.baseState = k;
      e.firstBaseUpdate = l;
      e.lastBaseUpdate = m2;
      b2 = e.shared.interleaved;
      if (null !== b2) {
        e = b2;
        do
          g2 |= e.lane, e = e.next;
        while (e !== b2);
      } else null === f2 && (e.shared.lanes = 0);
      rh |= g2;
      a.lanes = g2;
      a.memoizedState = q2;
    }
  }
  function sh(a, b2, c2) {
    a = b2.effects;
    b2.effects = null;
    if (null !== a) for (b2 = 0; b2 < a.length; b2++) {
      var d2 = a[b2], e = d2.callback;
      if (null !== e) {
        d2.callback = null;
        d2 = c2;
        if ("function" !== typeof e) throw Error(p2(191, e));
        e.call(d2);
      }
    }
  }
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
  function xh(a) {
    if (a === th) throw Error(p2(174));
    return a;
  }
  function yh(a, b2) {
    G(wh, b2);
    G(vh, a);
    G(uh, th);
    a = b2.nodeType;
    switch (a) {
      case 9:
      case 11:
        b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
        break;
      default:
        a = 8 === a ? b2.parentNode : b2, b2 = a.namespaceURI || null, a = a.tagName, b2 = lb(b2, a);
    }
    E(uh);
    G(uh, b2);
  }
  function zh() {
    E(uh);
    E(vh);
    E(wh);
  }
  function Ah(a) {
    xh(wh.current);
    var b2 = xh(uh.current);
    var c2 = lb(b2, a.type);
    b2 !== c2 && (G(vh, a), G(uh, c2));
  }
  function Bh(a) {
    vh.current === a && (E(uh), E(vh));
  }
  var L2 = Uf(0);
  function Ch(a) {
    for (var b2 = a; null !== b2; ) {
      if (13 === b2.tag) {
        var c2 = b2.memoizedState;
        if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b2;
      } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
        if (0 !== (b2.flags & 128)) return b2;
      } else if (null !== b2.child) {
        b2.child.return = b2;
        b2 = b2.child;
        continue;
      }
      if (b2 === a) break;
      for (; null === b2.sibling; ) {
        if (null === b2.return || b2.return === a) return null;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P() {
    throw Error(p2(321));
  }
  function Mh(a, b2) {
    if (null === b2) return false;
    for (var c2 = 0; c2 < b2.length && c2 < a.length; c2++) if (!He(a[c2], b2[c2])) return false;
    return true;
  }
  function Nh(a, b2, c2, d2, e, f2) {
    Hh = f2;
    M = b2;
    b2.memoizedState = null;
    b2.updateQueue = null;
    b2.lanes = 0;
    Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
    a = c2(d2, e);
    if (Jh) {
      f2 = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f2) throw Error(p2(301));
        f2 += 1;
        O = N = null;
        b2.updateQueue = null;
        Fh.current = Qh;
        a = c2(d2, e);
      } while (Jh);
    }
    Fh.current = Rh;
    b2 = null !== N && null !== N.next;
    Hh = 0;
    O = N = M = null;
    Ih = false;
    if (b2) throw Error(p2(300));
    return a;
  }
  function Sh() {
    var a = 0 !== Kh;
    Kh = 0;
    return a;
  }
  function Th() {
    var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
    return O;
  }
  function Uh() {
    if (null === N) {
      var a = M.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = N.next;
    var b2 = null === O ? M.memoizedState : O.next;
    if (null !== b2) O = b2, N = a;
    else {
      if (null === a) throw Error(p2(310));
      N = a;
      a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
    }
    return O;
  }
  function Vh(a, b2) {
    return "function" === typeof b2 ? b2(a) : b2;
  }
  function Wh(a) {
    var b2 = Uh(), c2 = b2.queue;
    if (null === c2) throw Error(p2(311));
    c2.lastRenderedReducer = a;
    var d2 = N, e = d2.baseQueue, f2 = c2.pending;
    if (null !== f2) {
      if (null !== e) {
        var g2 = e.next;
        e.next = f2.next;
        f2.next = g2;
      }
      d2.baseQueue = e = f2;
      c2.pending = null;
    }
    if (null !== e) {
      f2 = e.next;
      d2 = d2.baseState;
      var h2 = g2 = null, k = null, l = f2;
      do {
        var m2 = l.lane;
        if ((Hh & m2) === m2) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d2 = l.hasEagerState ? l.eagerState : a(d2, l.action);
        else {
          var q2 = {
            lane: m2,
            action: l.action,
            hasEagerState: l.hasEagerState,
            eagerState: l.eagerState,
            next: null
          };
          null === k ? (h2 = k = q2, g2 = d2) : k = k.next = q2;
          M.lanes |= m2;
          rh |= m2;
        }
        l = l.next;
      } while (null !== l && l !== f2);
      null === k ? g2 = d2 : k.next = h2;
      He(d2, b2.memoizedState) || (dh = true);
      b2.memoizedState = d2;
      b2.baseState = g2;
      b2.baseQueue = k;
      c2.lastRenderedState = d2;
    }
    a = c2.interleaved;
    if (null !== a) {
      e = a;
      do
        f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
      while (e !== a);
    } else null === e && (c2.lanes = 0);
    return [b2.memoizedState, c2.dispatch];
  }
  function Xh(a) {
    var b2 = Uh(), c2 = b2.queue;
    if (null === c2) throw Error(p2(311));
    c2.lastRenderedReducer = a;
    var d2 = c2.dispatch, e = c2.pending, f2 = b2.memoizedState;
    if (null !== e) {
      c2.pending = null;
      var g2 = e = e.next;
      do
        f2 = a(f2, g2.action), g2 = g2.next;
      while (g2 !== e);
      He(f2, b2.memoizedState) || (dh = true);
      b2.memoizedState = f2;
      null === b2.baseQueue && (b2.baseState = f2);
      c2.lastRenderedState = f2;
    }
    return [f2, d2];
  }
  function Yh() {
  }
  function Zh(a, b2) {
    var c2 = M, d2 = Uh(), e = b2(), f2 = !He(d2.memoizedState, e);
    f2 && (d2.memoizedState = e, dh = true);
    d2 = d2.queue;
    $h(ai.bind(null, c2, d2, a), [a]);
    if (d2.getSnapshot !== b2 || f2 || null !== O && O.memoizedState.tag & 1) {
      c2.flags |= 2048;
      bi(9, ci.bind(null, c2, d2, e, b2), void 0, null);
      if (null === Q2) throw Error(p2(349));
      0 !== (Hh & 30) || di(c2, b2, e);
    }
    return e;
  }
  function di(a, b2, c2) {
    a.flags |= 16384;
    a = { getSnapshot: b2, value: c2 };
    b2 = M.updateQueue;
    null === b2 ? (b2 = { lastEffect: null, stores: null }, M.updateQueue = b2, b2.stores = [a]) : (c2 = b2.stores, null === c2 ? b2.stores = [a] : c2.push(a));
  }
  function ci(a, b2, c2, d2) {
    b2.value = c2;
    b2.getSnapshot = d2;
    ei(b2) && fi(a);
  }
  function ai(a, b2, c2) {
    return c2(function() {
      ei(b2) && fi(a);
    });
  }
  function ei(a) {
    var b2 = a.getSnapshot;
    a = a.value;
    try {
      var c2 = b2();
      return !He(a, c2);
    } catch (d2) {
      return true;
    }
  }
  function fi(a) {
    var b2 = ih(a, 1);
    null !== b2 && gi(b2, a, 1, -1);
  }
  function hi(a) {
    var b2 = Th();
    "function" === typeof a && (a = a());
    b2.memoizedState = b2.baseState = a;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
    b2.queue = a;
    a = a.dispatch = ii.bind(null, M, a);
    return [b2.memoizedState, a];
  }
  function bi(a, b2, c2, d2) {
    a = { tag: a, create: b2, destroy: c2, deps: d2, next: null };
    b2 = M.updateQueue;
    null === b2 ? (b2 = { lastEffect: null, stores: null }, M.updateQueue = b2, b2.lastEffect = a.next = a) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a.next = a : (d2 = c2.next, c2.next = a, a.next = d2, b2.lastEffect = a));
    return a;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a, b2, c2, d2) {
    var e = Th();
    M.flags |= a;
    e.memoizedState = bi(1 | b2, c2, void 0, void 0 === d2 ? null : d2);
  }
  function li(a, b2, c2, d2) {
    var e = Uh();
    d2 = void 0 === d2 ? null : d2;
    var f2 = void 0;
    if (null !== N) {
      var g2 = N.memoizedState;
      f2 = g2.destroy;
      if (null !== d2 && Mh(d2, g2.deps)) {
        e.memoizedState = bi(b2, c2, f2, d2);
        return;
      }
    }
    M.flags |= a;
    e.memoizedState = bi(1 | b2, c2, f2, d2);
  }
  function mi(a, b2) {
    return ki(8390656, 8, a, b2);
  }
  function $h(a, b2) {
    return li(2048, 8, a, b2);
  }
  function ni(a, b2) {
    return li(4, 2, a, b2);
  }
  function oi(a, b2) {
    return li(4, 4, a, b2);
  }
  function pi(a, b2) {
    if ("function" === typeof b2) return a = a(), b2(a), function() {
      b2(null);
    };
    if (null !== b2 && void 0 !== b2) return a = a(), b2.current = a, function() {
      b2.current = null;
    };
  }
  function qi(a, b2, c2) {
    c2 = null !== c2 && void 0 !== c2 ? c2.concat([a]) : null;
    return li(4, 4, pi.bind(null, b2, a), c2);
  }
  function ri() {
  }
  function si(a, b2) {
    var c2 = Uh();
    b2 = void 0 === b2 ? null : b2;
    var d2 = c2.memoizedState;
    if (null !== d2 && null !== b2 && Mh(b2, d2[1])) return d2[0];
    c2.memoizedState = [a, b2];
    return a;
  }
  function ti(a, b2) {
    var c2 = Uh();
    b2 = void 0 === b2 ? null : b2;
    var d2 = c2.memoizedState;
    if (null !== d2 && null !== b2 && Mh(b2, d2[1])) return d2[0];
    a = a();
    c2.memoizedState = [a, b2];
    return a;
  }
  function ui(a, b2, c2) {
    if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c2;
    He(c2, b2) || (c2 = yc(), M.lanes |= c2, rh |= c2, a.baseState = true);
    return b2;
  }
  function vi(a, b2) {
    var c2 = C2;
    C2 = 0 !== c2 && 4 > c2 ? c2 : 4;
    a(true);
    var d2 = Gh.transition;
    Gh.transition = {};
    try {
      a(false), b2();
    } finally {
      C2 = c2, Gh.transition = d2;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a, b2, c2) {
    var d2 = yi(a);
    c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b2, c2);
    else if (c2 = hh(a, b2, c2, d2), null !== c2) {
      var e = R();
      gi(c2, a, d2, e);
      Bi(c2, b2, d2);
    }
  }
  function ii(a, b2, c2) {
    var d2 = yi(a), e = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b2, e);
    else {
      var f2 = a.alternate;
      if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2)) try {
        var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
        e.hasEagerState = true;
        e.eagerState = h2;
        if (He(h2, g2)) {
          var k = b2.interleaved;
          null === k ? (e.next = e, gh(b2)) : (e.next = k.next, k.next = e);
          b2.interleaved = e;
          return;
        }
      } catch (l) {
      } finally {
      }
      c2 = hh(a, b2, e, d2);
      null !== c2 && (e = R(), gi(c2, a, d2, e), Bi(c2, b2, d2));
    }
  }
  function zi(a) {
    var b2 = a.alternate;
    return a === M || null !== b2 && b2 === M;
  }
  function Ai(a, b2) {
    Jh = Ih = true;
    var c2 = a.pending;
    null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
    a.pending = b2;
  }
  function Bi(a, b2, c2) {
    if (0 !== (c2 & 4194240)) {
      var d2 = b2.lanes;
      d2 &= a.pendingLanes;
      c2 |= d2;
      b2.lanes = c2;
      Cc(a, c2);
    }
  }
  var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b2) {
    Th().memoizedState = [a, void 0 === b2 ? null : b2];
    return a;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b2, c2) {
    c2 = null !== c2 && void 0 !== c2 ? c2.concat([a]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b2, a),
      c2
    );
  }, useLayoutEffect: function(a, b2) {
    return ki(4194308, 4, a, b2);
  }, useInsertionEffect: function(a, b2) {
    return ki(4, 2, a, b2);
  }, useMemo: function(a, b2) {
    var c2 = Th();
    b2 = void 0 === b2 ? null : b2;
    a = a();
    c2.memoizedState = [a, b2];
    return a;
  }, useReducer: function(a, b2, c2) {
    var d2 = Th();
    b2 = void 0 !== c2 ? c2(b2) : b2;
    d2.memoizedState = d2.baseState = b2;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b2 };
    d2.queue = a;
    a = a.dispatch = xi.bind(null, M, a);
    return [d2.memoizedState, a];
  }, useRef: function(a) {
    var b2 = Th();
    a = { current: a };
    return b2.memoizedState = a;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
    return Th().memoizedState = a;
  }, useTransition: function() {
    var a = hi(false), b2 = a[0];
    a = vi.bind(null, a[1]);
    Th().memoizedState = a;
    return [b2, a];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a, b2, c2) {
    var d2 = M, e = Th();
    if (I2) {
      if (void 0 === c2) throw Error(p2(407));
      c2 = c2();
    } else {
      c2 = b2();
      if (null === Q2) throw Error(p2(349));
      0 !== (Hh & 30) || di(d2, b2, c2);
    }
    e.memoizedState = c2;
    var f2 = { value: c2, getSnapshot: b2 };
    e.queue = f2;
    mi(ai.bind(
      null,
      d2,
      f2,
      a
    ), [a]);
    d2.flags |= 2048;
    bi(9, ci.bind(null, d2, f2, c2, b2), void 0, null);
    return c2;
  }, useId: function() {
    var a = Th(), b2 = Q2.identifierPrefix;
    if (I2) {
      var c2 = sg;
      var d2 = rg;
      c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
      b2 = ":" + b2 + "R" + c2;
      c2 = Kh++;
      0 < c2 && (b2 += "H" + c2.toString(32));
      b2 += ":";
    } else c2 = Lh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
    return a.memoizedState = b2;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a) {
      var b2 = Uh();
      return ui(b2, N.memoizedState, a);
    },
    useTransition: function() {
      var a = Wh(Vh)[0], b2 = Uh().memoizedState;
      return [a, b2];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a) {
    var b2 = Uh();
    return null === N ? b2.memoizedState = a : ui(b2, N.memoizedState, a);
  }, useTransition: function() {
    var a = Xh(Vh)[0], b2 = Uh().memoizedState;
    return [a, b2];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a, b2) {
    if (a && a.defaultProps) {
      b2 = A({}, b2);
      a = a.defaultProps;
      for (var c2 in a) void 0 === b2[c2] && (b2[c2] = a[c2]);
      return b2;
    }
    return b2;
  }
  function Di(a, b2, c2, d2) {
    b2 = a.memoizedState;
    c2 = c2(d2, b2);
    c2 = null === c2 || void 0 === c2 ? b2 : A({}, b2, c2);
    a.memoizedState = c2;
    0 === a.lanes && (a.updateQueue.baseState = c2);
  }
  var Ei = { isMounted: function(a) {
    return (a = a._reactInternals) ? Vb(a) === a : false;
  }, enqueueSetState: function(a, b2, c2) {
    a = a._reactInternals;
    var d2 = R(), e = yi(a), f2 = mh(d2, e);
    f2.payload = b2;
    void 0 !== c2 && null !== c2 && (f2.callback = c2);
    b2 = nh(a, f2, e);
    null !== b2 && (gi(b2, a, e, d2), oh(b2, a, e));
  }, enqueueReplaceState: function(a, b2, c2) {
    a = a._reactInternals;
    var d2 = R(), e = yi(a), f2 = mh(d2, e);
    f2.tag = 1;
    f2.payload = b2;
    void 0 !== c2 && null !== c2 && (f2.callback = c2);
    b2 = nh(a, f2, e);
    null !== b2 && (gi(b2, a, e, d2), oh(b2, a, e));
  }, enqueueForceUpdate: function(a, b2) {
    a = a._reactInternals;
    var c2 = R(), d2 = yi(a), e = mh(c2, d2);
    e.tag = 2;
    void 0 !== b2 && null !== b2 && (e.callback = b2);
    b2 = nh(a, e, d2);
    null !== b2 && (gi(b2, a, d2, c2), oh(b2, a, d2));
  } };
  function Fi(a, b2, c2, d2, e, f2, g2) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie(c2, d2) || !Ie(e, f2) : true;
  }
  function Gi(a, b2, c2) {
    var d2 = false, e = Vf;
    var f2 = b2.contextType;
    "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b2) ? Xf : H.current, d2 = b2.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a, e) : Vf);
    b2 = new b2(c2, f2);
    a.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
    b2.updater = Ei;
    a.stateNode = b2;
    b2._reactInternals = a;
    d2 && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
    return b2;
  }
  function Hi(a, b2, c2, d2) {
    a = b2.state;
    "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d2);
    "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d2);
    b2.state !== a && Ei.enqueueReplaceState(b2, b2.state, null);
  }
  function Ii(a, b2, c2, d2) {
    var e = a.stateNode;
    e.props = c2;
    e.state = a.memoizedState;
    e.refs = {};
    kh(a);
    var f2 = b2.contextType;
    "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b2) ? Xf : H.current, e.context = Yf(a, f2));
    e.state = a.memoizedState;
    f2 = b2.getDerivedStateFromProps;
    "function" === typeof f2 && (Di(a, b2, f2, c2), e.state = a.memoizedState);
    "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b2 = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b2 !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c2, e, d2), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function Ji(a, b2) {
    try {
      var c2 = "", d2 = b2;
      do
        c2 += Pa(d2), d2 = d2.return;
      while (d2);
      var e = c2;
    } catch (f2) {
      e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
    }
    return { value: a, source: b2, stack: e, digest: null };
  }
  function Ki(a, b2, c2) {
    return { value: a, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
  }
  function Li(a, b2) {
    try {
      console.error(b2.value);
    } catch (c2) {
      setTimeout(function() {
        throw c2;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a, b2, c2) {
    c2 = mh(-1, c2);
    c2.tag = 3;
    c2.payload = { element: null };
    var d2 = b2.value;
    c2.callback = function() {
      Oi || (Oi = true, Pi = d2);
      Li(a, b2);
    };
    return c2;
  }
  function Qi(a, b2, c2) {
    c2 = mh(-1, c2);
    c2.tag = 3;
    var d2 = a.type.getDerivedStateFromError;
    if ("function" === typeof d2) {
      var e = b2.value;
      c2.payload = function() {
        return d2(e);
      };
      c2.callback = function() {
        Li(a, b2);
      };
    }
    var f2 = a.stateNode;
    null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
      Li(a, b2);
      "function" !== typeof d2 && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c3 = b2.stack;
      this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
    });
    return c2;
  }
  function Si(a, b2, c2) {
    var d2 = a.pingCache;
    if (null === d2) {
      d2 = a.pingCache = new Mi();
      var e = /* @__PURE__ */ new Set();
      d2.set(b2, e);
    } else e = d2.get(b2), void 0 === e && (e = /* @__PURE__ */ new Set(), d2.set(b2, e));
    e.has(c2) || (e.add(c2), a = Ti.bind(null, a, b2, c2), b2.then(a, a));
  }
  function Ui(a) {
    do {
      var b2;
      if (b2 = 13 === a.tag) b2 = a.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
      if (b2) return a;
      a = a.return;
    } while (null !== a);
    return null;
  }
  function Vi(a, b2, c2, d2, e) {
    if (0 === (a.mode & 1)) return a === b2 ? a.flags |= 65536 : (a.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = mh(-1, 1), b2.tag = 2, nh(c2, b2, 1))), c2.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a, b2, c2, d2) {
    b2.child = null === a ? Vg(b2, null, c2, d2) : Ug(b2, a.child, c2, d2);
  }
  function Yi(a, b2, c2, d2, e) {
    c2 = c2.render;
    var f2 = b2.ref;
    ch(b2, e);
    d2 = Nh(a, b2, c2, d2, f2, e);
    c2 = Sh();
    if (null !== a && !dh) return b2.updateQueue = a.updateQueue, b2.flags &= -2053, a.lanes &= ~e, Zi(a, b2, e);
    I2 && c2 && vg(b2);
    b2.flags |= 1;
    Xi(a, b2, d2, e);
    return b2.child;
  }
  function $i(a, b2, c2, d2, e) {
    if (null === a) {
      var f2 = c2.type;
      if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b2.tag = 15, b2.type = f2, bj(a, b2, f2, d2, e);
      a = Rg(c2.type, null, d2, b2, b2.mode, e);
      a.ref = b2.ref;
      a.return = b2;
      return b2.child = a;
    }
    f2 = a.child;
    if (0 === (a.lanes & e)) {
      var g2 = f2.memoizedProps;
      c2 = c2.compare;
      c2 = null !== c2 ? c2 : Ie;
      if (c2(g2, d2) && a.ref === b2.ref) return Zi(a, b2, e);
    }
    b2.flags |= 1;
    a = Pg(f2, d2);
    a.ref = b2.ref;
    a.return = b2;
    return b2.child = a;
  }
  function bj(a, b2, c2, d2, e) {
    if (null !== a) {
      var f2 = a.memoizedProps;
      if (Ie(f2, d2) && a.ref === b2.ref) if (dh = false, b2.pendingProps = d2 = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
      else return b2.lanes = a.lanes, Zi(a, b2, e);
    }
    return cj(a, b2, c2, d2, e);
  }
  function dj(a, b2, c2) {
    var d2 = b2.pendingProps, e = d2.children, f2 = null !== a ? a.memoizedState : null;
    if ("hidden" === d2.mode) if (0 === (b2.mode & 1)) b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c2;
    else {
      if (0 === (c2 & 1073741824)) return a = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b2.updateQueue = null, G(ej, fj), fj |= a, null;
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d2 = null !== f2 ? f2.baseLanes : c2;
      G(ej, fj);
      fj |= d2;
    }
    else null !== f2 ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, G(ej, fj), fj |= d2;
    Xi(a, b2, e, c2);
    return b2.child;
  }
  function gj(a, b2) {
    var c2 = b2.ref;
    if (null === a && null !== c2 || null !== a && a.ref !== c2) b2.flags |= 512, b2.flags |= 2097152;
  }
  function cj(a, b2, c2, d2, e) {
    var f2 = Zf(c2) ? Xf : H.current;
    f2 = Yf(b2, f2);
    ch(b2, e);
    c2 = Nh(a, b2, c2, d2, f2, e);
    d2 = Sh();
    if (null !== a && !dh) return b2.updateQueue = a.updateQueue, b2.flags &= -2053, a.lanes &= ~e, Zi(a, b2, e);
    I2 && d2 && vg(b2);
    b2.flags |= 1;
    Xi(a, b2, c2, e);
    return b2.child;
  }
  function hj(a, b2, c2, d2, e) {
    if (Zf(c2)) {
      var f2 = true;
      cg(b2);
    } else f2 = false;
    ch(b2, e);
    if (null === b2.stateNode) ij(a, b2), Gi(b2, c2, d2), Ii(b2, c2, d2, e), d2 = true;
    else if (null === a) {
      var g2 = b2.stateNode, h2 = b2.memoizedProps;
      g2.props = h2;
      var k = g2.context, l = c2.contextType;
      "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c2) ? Xf : H.current, l = Yf(b2, l));
      var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
      q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k !== l) && Hi(b2, g2, d2, l);
      jh = false;
      var r = b2.memoizedState;
      g2.state = r;
      qh(b2, d2, g2, e);
      k = b2.memoizedState;
      h2 !== d2 || r !== k || Wf.current || jh ? ("function" === typeof m2 && (Di(b2, c2, m2, d2), k = b2.memoizedState), (h2 = jh || Fi(b2, c2, h2, d2, r, k, l)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k), g2.props = d2, g2.state = k, g2.context = l, d2 = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d2 = false);
    } else {
      g2 = b2.stateNode;
      lh(a, b2);
      h2 = b2.memoizedProps;
      l = b2.type === b2.elementType ? h2 : Ci(b2.type, h2);
      g2.props = l;
      q2 = b2.pendingProps;
      r = g2.context;
      k = c2.contextType;
      "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c2) ? Xf : H.current, k = Yf(b2, k));
      var y2 = c2.getDerivedStateFromProps;
      (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r !== k) && Hi(b2, g2, d2, k);
      jh = false;
      r = b2.memoizedState;
      g2.state = r;
      qh(b2, d2, g2, e);
      var n = b2.memoizedState;
      h2 !== q2 || r !== n || Wf.current || jh ? ("function" === typeof y2 && (Di(b2, c2, y2, d2), n = b2.memoizedState), (l = jh || Fi(b2, c2, l, d2, r, n, k) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n, k), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n, k)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && r === a.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r === a.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = n), g2.props = d2, g2.state = n, g2.context = k, d2 = l) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && r === a.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r === a.memoizedState || (b2.flags |= 1024), d2 = false);
    }
    return jj(a, b2, c2, d2, f2, e);
  }
  function jj(a, b2, c2, d2, e, f2) {
    gj(a, b2);
    var g2 = 0 !== (b2.flags & 128);
    if (!d2 && !g2) return e && dg(b2, c2, false), Zi(a, b2, f2);
    d2 = b2.stateNode;
    Wi.current = b2;
    var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
    b2.flags |= 1;
    null !== a && g2 ? (b2.child = Ug(b2, a.child, null, f2), b2.child = Ug(b2, null, h2, f2)) : Xi(a, b2, h2, f2);
    b2.memoizedState = d2.state;
    e && dg(b2, c2, true);
    return b2.child;
  }
  function kj(a) {
    var b2 = a.stateNode;
    b2.pendingContext ? ag(a, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a, b2.context, false);
    yh(a, b2.containerInfo);
  }
  function lj(a, b2, c2, d2, e) {
    Ig();
    Jg(e);
    b2.flags |= 256;
    Xi(a, b2, c2, d2);
    return b2.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a) {
    return { baseLanes: a, cachePool: null, transitions: null };
  }
  function oj(a, b2, c2) {
    var d2 = b2.pendingProps, e = L2.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
    (h2 = g2) || (h2 = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
    if (h2) f2 = true, b2.flags &= -129;
    else if (null === a || null !== a.memoizedState) e |= 1;
    G(L2, e & 1);
    if (null === a) {
      Eg(b2);
      a = b2.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
      g2 = d2.children;
      a = d2.fallback;
      return f2 ? (d2 = b2.mode, f2 = b2.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = pj(g2, d2, 0, null), a = Tg(a, d2, c2, null), f2.return = b2, a.return = b2, f2.sibling = a, b2.child = f2, b2.child.memoizedState = nj(c2), b2.memoizedState = mj, a) : qj(b2, g2);
    }
    e = a.memoizedState;
    if (null !== e && (h2 = e.dehydrated, null !== h2)) return rj(a, b2, g2, d2, h2, e, c2);
    if (f2) {
      f2 = d2.fallback;
      g2 = b2.mode;
      e = a.child;
      h2 = e.sibling;
      var k = { mode: "hidden", children: d2.children };
      0 === (g2 & 1) && b2.child !== e ? (d2 = b2.child, d2.childLanes = 0, d2.pendingProps = k, b2.deletions = null) : (d2 = Pg(e, k), d2.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g2, c2, null), f2.flags |= 2);
      f2.return = b2;
      d2.return = b2;
      d2.sibling = f2;
      b2.child = d2;
      d2 = f2;
      f2 = b2.child;
      g2 = a.child.memoizedState;
      g2 = null === g2 ? nj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
      f2.memoizedState = g2;
      f2.childLanes = a.childLanes & ~c2;
      b2.memoizedState = mj;
      return d2;
    }
    f2 = a.child;
    a = f2.sibling;
    d2 = Pg(f2, { mode: "visible", children: d2.children });
    0 === (b2.mode & 1) && (d2.lanes = c2);
    d2.return = b2;
    d2.sibling = null;
    null !== a && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a], b2.flags |= 16) : c2.push(a));
    b2.child = d2;
    b2.memoizedState = null;
    return d2;
  }
  function qj(a, b2) {
    b2 = pj({ mode: "visible", children: b2 }, a.mode, 0, null);
    b2.return = a;
    return a.child = b2;
  }
  function sj(a, b2, c2, d2) {
    null !== d2 && Jg(d2);
    Ug(b2, a.child, null, c2);
    a = qj(b2, b2.pendingProps.children);
    a.flags |= 2;
    b2.memoizedState = null;
    return a;
  }
  function rj(a, b2, c2, d2, e, f2, g2) {
    if (c2) {
      if (b2.flags & 256) return b2.flags &= -257, d2 = Ki(Error(p2(422))), sj(a, b2, g2, d2);
      if (null !== b2.memoizedState) return b2.child = a.child, b2.flags |= 128, null;
      f2 = d2.fallback;
      e = b2.mode;
      d2 = pj({ mode: "visible", children: d2.children }, e, 0, null);
      f2 = Tg(f2, e, g2, null);
      f2.flags |= 2;
      d2.return = b2;
      f2.return = b2;
      d2.sibling = f2;
      b2.child = d2;
      0 !== (b2.mode & 1) && Ug(b2, a.child, null, g2);
      b2.child.memoizedState = nj(g2);
      b2.memoizedState = mj;
      return f2;
    }
    if (0 === (b2.mode & 1)) return sj(a, b2, g2, null);
    if ("$!" === e.data) {
      d2 = e.nextSibling && e.nextSibling.dataset;
      if (d2) var h2 = d2.dgst;
      d2 = h2;
      f2 = Error(p2(419));
      d2 = Ki(f2, d2, void 0);
      return sj(a, b2, g2, d2);
    }
    h2 = 0 !== (g2 & a.childLanes);
    if (dh || h2) {
      d2 = Q2;
      if (null !== d2) {
        switch (g2 & -g2) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d2.suspendedLanes | g2)) ? 0 : e;
        0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d2, a, e, -1));
      }
      tj();
      d2 = Ki(Error(p2(421)));
      return sj(a, b2, g2, d2);
    }
    if ("$?" === e.data) return b2.flags |= 128, b2.child = a.child, b2 = uj.bind(null, a), e._reactRetry = b2, null;
    a = f2.treeContext;
    yg = Lf(e.nextSibling);
    xg = b2;
    I2 = true;
    zg = null;
    null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b2);
    b2 = qj(b2, d2.children);
    b2.flags |= 4096;
    return b2;
  }
  function vj(a, b2, c2) {
    a.lanes |= b2;
    var d2 = a.alternate;
    null !== d2 && (d2.lanes |= b2);
    bh(a.return, b2, c2);
  }
  function wj(a, b2, c2, d2, e) {
    var f2 = a.memoizedState;
    null === f2 ? a.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e);
  }
  function xj(a, b2, c2) {
    var d2 = b2.pendingProps, e = d2.revealOrder, f2 = d2.tail;
    Xi(a, b2, d2.children, c2);
    d2 = L2.current;
    if (0 !== (d2 & 2)) d2 = d2 & 1 | 2, b2.flags |= 128;
    else {
      if (null !== a && 0 !== (a.flags & 128)) a: for (a = b2.child; null !== a; ) {
        if (13 === a.tag) null !== a.memoizedState && vj(a, c2, b2);
        else if (19 === a.tag) vj(a, c2, b2);
        else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === b2) break a;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === b2) break a;
          a = a.return;
        }
        a.sibling.return = a.return;
        a = a.sibling;
      }
      d2 &= 1;
    }
    G(L2, d2);
    if (0 === (b2.mode & 1)) b2.memoizedState = null;
    else switch (e) {
      case "forwards":
        c2 = b2.child;
        for (e = null; null !== c2; ) a = c2.alternate, null !== a && null === Ch(a) && (e = c2), c2 = c2.sibling;
        c2 = e;
        null === c2 ? (e = b2.child, b2.child = null) : (e = c2.sibling, c2.sibling = null);
        wj(b2, false, e, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e = b2.child;
        for (b2.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === Ch(a)) {
            b2.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c2;
          c2 = e;
          e = a;
        }
        wj(b2, true, c2, null, f2);
        break;
      case "together":
        wj(b2, false, null, null, void 0);
        break;
      default:
        b2.memoizedState = null;
    }
    return b2.child;
  }
  function ij(a, b2) {
    0 === (b2.mode & 1) && null !== a && (a.alternate = null, b2.alternate = null, b2.flags |= 2);
  }
  function Zi(a, b2, c2) {
    null !== a && (b2.dependencies = a.dependencies);
    rh |= b2.lanes;
    if (0 === (c2 & b2.childLanes)) return null;
    if (null !== a && b2.child !== a.child) throw Error(p2(153));
    if (null !== b2.child) {
      a = b2.child;
      c2 = Pg(a, a.pendingProps);
      b2.child = c2;
      for (c2.return = b2; null !== a.sibling; ) a = a.sibling, c2 = c2.sibling = Pg(a, a.pendingProps), c2.return = b2;
      c2.sibling = null;
    }
    return b2.child;
  }
  function yj(a, b2, c2) {
    switch (b2.tag) {
      case 3:
        kj(b2);
        Ig();
        break;
      case 5:
        Ah(b2);
        break;
      case 1:
        Zf(b2.type) && cg(b2);
        break;
      case 4:
        yh(b2, b2.stateNode.containerInfo);
        break;
      case 10:
        var d2 = b2.type._context, e = b2.memoizedProps.value;
        G(Wg, d2._currentValue);
        d2._currentValue = e;
        break;
      case 13:
        d2 = b2.memoizedState;
        if (null !== d2) {
          if (null !== d2.dehydrated) return G(L2, L2.current & 1), b2.flags |= 128, null;
          if (0 !== (c2 & b2.child.childLanes)) return oj(a, b2, c2);
          G(L2, L2.current & 1);
          a = Zi(a, b2, c2);
          return null !== a ? a.sibling : null;
        }
        G(L2, L2.current & 1);
        break;
      case 19:
        d2 = 0 !== (c2 & b2.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d2) return xj(a, b2, c2);
          b2.flags |= 128;
        }
        e = b2.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        G(L2, L2.current);
        if (d2) break;
        else return null;
      case 22:
      case 23:
        return b2.lanes = 0, dj(a, b2, c2);
    }
    return Zi(a, b2, c2);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a, b2) {
    for (var c2 = b2.child; null !== c2; ) {
      if (5 === c2.tag || 6 === c2.tag) a.appendChild(c2.stateNode);
      else if (4 !== c2.tag && null !== c2.child) {
        c2.child.return = c2;
        c2 = c2.child;
        continue;
      }
      if (c2 === b2) break;
      for (; null === c2.sibling; ) {
        if (null === c2.return || c2.return === b2) return;
        c2 = c2.return;
      }
      c2.sibling.return = c2.return;
      c2 = c2.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a, b2, c2, d2) {
    var e = a.memoizedProps;
    if (e !== d2) {
      a = b2.stateNode;
      xh(uh.current);
      var f2 = null;
      switch (c2) {
        case "input":
          e = Ya(a, e);
          d2 = Ya(a, d2);
          f2 = [];
          break;
        case "select":
          e = A({}, e, { value: void 0 });
          d2 = A({}, d2, { value: void 0 });
          f2 = [];
          break;
        case "textarea":
          e = gb(a, e);
          d2 = gb(a, d2);
          f2 = [];
          break;
        default:
          "function" !== typeof e.onClick && "function" === typeof d2.onClick && (a.onclick = Bf);
      }
      ub(c2, d2);
      var g2;
      c2 = null;
      for (l in e) if (!d2.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
        var h2 = e[l];
        for (g2 in h2) h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
      } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f2 || (f2 = []) : (f2 = f2 || []).push(l, null));
      for (l in d2) {
        var k = d2[l];
        h2 = null != e ? e[l] : void 0;
        if (d2.hasOwnProperty(l) && k !== h2 && (null != k || null != h2)) if ("style" === l) if (h2) {
          for (g2 in h2) !h2.hasOwnProperty(g2) || k && k.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
          for (g2 in k) k.hasOwnProperty(g2) && h2[g2] !== k[g2] && (c2 || (c2 = {}), c2[g2] = k[g2]);
        } else c2 || (f2 || (f2 = []), f2.push(
          l,
          c2
        )), c2 = k;
        else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k && h2 !== k && (f2 = f2 || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f2 = f2 || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D2("scroll", a), f2 || h2 === k || (f2 = [])) : (f2 = f2 || []).push(l, k));
      }
      c2 && (f2 = f2 || []).push("style", c2);
      var l = f2;
      if (b2.updateQueue = l) b2.flags |= 4;
    }
  };
  Cj = function(a, b2, c2, d2) {
    c2 !== d2 && (b2.flags |= 4);
  };
  function Dj(a, b2) {
    if (!I2) switch (a.tailMode) {
      case "hidden":
        b2 = a.tail;
        for (var c2 = null; null !== b2; ) null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
        null === c2 ? a.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a.tail;
        for (var d2 = null; null !== c2; ) null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
        null === d2 ? b2 || null === a.tail ? a.tail = null : a.tail.sibling = null : d2.sibling = null;
    }
  }
  function S2(a) {
    var b2 = null !== a.alternate && a.alternate.child === a.child, c2 = 0, d2 = 0;
    if (b2) for (var e = a.child; null !== e; ) c2 |= e.lanes | e.childLanes, d2 |= e.subtreeFlags & 14680064, d2 |= e.flags & 14680064, e.return = a, e = e.sibling;
    else for (e = a.child; null !== e; ) c2 |= e.lanes | e.childLanes, d2 |= e.subtreeFlags, d2 |= e.flags, e.return = a, e = e.sibling;
    a.subtreeFlags |= d2;
    a.childLanes = c2;
    return b2;
  }
  function Ej(a, b2, c2) {
    var d2 = b2.pendingProps;
    wg(b2);
    switch (b2.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return S2(b2), null;
      case 1:
        return Zf(b2.type) && $f(), S2(b2), null;
      case 3:
        d2 = b2.stateNode;
        zh();
        E(Wf);
        E(H);
        Eh();
        d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
        if (null === a || null === a.child) Gg(b2) ? b2.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a, b2);
        S2(b2);
        return null;
      case 5:
        Bh(b2);
        var e = xh(wh.current);
        c2 = b2.type;
        if (null !== a && null != b2.stateNode) Bj(a, b2, c2, d2, e), a.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
        else {
          if (!d2) {
            if (null === b2.stateNode) throw Error(p2(166));
            S2(b2);
            return null;
          }
          a = xh(uh.current);
          if (Gg(b2)) {
            d2 = b2.stateNode;
            c2 = b2.type;
            var f2 = b2.memoizedProps;
            d2[Of] = b2;
            d2[Pf] = f2;
            a = 0 !== (b2.mode & 1);
            switch (c2) {
              case "dialog":
                D2("cancel", d2);
                D2("close", d2);
                break;
              case "iframe":
              case "object":
              case "embed":
                D2("load", d2);
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D2(lf[e], d2);
                break;
              case "source":
                D2("error", d2);
                break;
              case "img":
              case "image":
              case "link":
                D2(
                  "error",
                  d2
                );
                D2("load", d2);
                break;
              case "details":
                D2("toggle", d2);
                break;
              case "input":
                Za(d2, f2);
                D2("invalid", d2);
                break;
              case "select":
                d2._wrapperState = { wasMultiple: !!f2.multiple };
                D2("invalid", d2);
                break;
              case "textarea":
                hb(d2, f2), D2("invalid", d2);
            }
            ub(c2, f2);
            e = null;
            for (var g2 in f2) if (f2.hasOwnProperty(g2)) {
              var h2 = f2[g2];
              "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a), e = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
                d2.textContent,
                h2,
                a
              ), e = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D2("scroll", d2);
            }
            switch (c2) {
              case "input":
                Va(d2);
                db(d2, f2, true);
                break;
              case "textarea":
                Va(d2);
                jb(d2);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f2.onClick && (d2.onclick = Bf);
            }
            d2 = e;
            b2.updateQueue = d2;
            null !== d2 && (b2.flags |= 4);
          } else {
            g2 = 9 === e.nodeType ? e : e.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a && (a = kb(c2));
            "http://www.w3.org/1999/xhtml" === a ? "script" === c2 ? (a = g2.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d2.is ? a = g2.createElement(c2, { is: d2.is }) : (a = g2.createElement(c2), "select" === c2 && (g2 = a, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a = g2.createElementNS(a, c2);
            a[Of] = b2;
            a[Pf] = d2;
            zj(a, b2, false, false);
            b2.stateNode = a;
            a: {
              g2 = vb(c2, d2);
              switch (c2) {
                case "dialog":
                  D2("cancel", a);
                  D2("close", a);
                  e = d2;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D2("load", a);
                  e = d2;
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D2(lf[e], a);
                  e = d2;
                  break;
                case "source":
                  D2("error", a);
                  e = d2;
                  break;
                case "img":
                case "image":
                case "link":
                  D2(
                    "error",
                    a
                  );
                  D2("load", a);
                  e = d2;
                  break;
                case "details":
                  D2("toggle", a);
                  e = d2;
                  break;
                case "input":
                  Za(a, d2);
                  e = Ya(a, d2);
                  D2("invalid", a);
                  break;
                case "option":
                  e = d2;
                  break;
                case "select":
                  a._wrapperState = { wasMultiple: !!d2.multiple };
                  e = A({}, d2, { value: void 0 });
                  D2("invalid", a);
                  break;
                case "textarea":
                  hb(a, d2);
                  e = gb(a, d2);
                  D2("invalid", a);
                  break;
                default:
                  e = d2;
              }
              ub(c2, e);
              h2 = e;
              for (f2 in h2) if (h2.hasOwnProperty(f2)) {
                var k = h2[f2];
                "style" === f2 ? sb(a, k) : "dangerouslySetInnerHTML" === f2 ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f2 ? "string" === typeof k ? ("textarea" !== c2 || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k && "onScroll" === f2 && D2("scroll", a) : null != k && ta(a, f2, k, g2));
              }
              switch (c2) {
                case "input":
                  Va(a);
                  db(a, d2, false);
                  break;
                case "textarea":
                  Va(a);
                  jb(a);
                  break;
                case "option":
                  null != d2.value && a.setAttribute("value", "" + Sa(d2.value));
                  break;
                case "select":
                  a.multiple = !!d2.multiple;
                  f2 = d2.value;
                  null != f2 ? fb(a, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                    a,
                    !!d2.multiple,
                    d2.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e.onClick && (a.onclick = Bf);
              }
              switch (c2) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d2 = !!d2.autoFocus;
                  break a;
                case "img":
                  d2 = true;
                  break a;
                default:
                  d2 = false;
              }
            }
            d2 && (b2.flags |= 4);
          }
          null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
        }
        S2(b2);
        return null;
      case 6:
        if (a && null != b2.stateNode) Cj(a, b2, a.memoizedProps, d2);
        else {
          if ("string" !== typeof d2 && null === b2.stateNode) throw Error(p2(166));
          c2 = xh(wh.current);
          xh(uh.current);
          if (Gg(b2)) {
            d2 = b2.stateNode;
            c2 = b2.memoizedProps;
            d2[Of] = b2;
            if (f2 = d2.nodeValue !== c2) {
              if (a = xg, null !== a) switch (a.tag) {
                case 3:
                  Af(d2.nodeValue, c2, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a.mode & 1));
              }
            }
            f2 && (b2.flags |= 4);
          } else d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b2, b2.stateNode = d2;
        }
        S2(b2);
        return null;
      case 13:
        E(L2);
        d2 = b2.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (I2 && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128)) Hg(), Ig(), b2.flags |= 98560, f2 = false;
          else if (f2 = Gg(b2), null !== d2 && null !== d2.dehydrated) {
            if (null === a) {
              if (!f2) throw Error(p2(318));
              f2 = b2.memoizedState;
              f2 = null !== f2 ? f2.dehydrated : null;
              if (!f2) throw Error(p2(317));
              f2[Of] = b2;
            } else Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
            S2(b2);
            f2 = false;
          } else null !== zg && (Fj(zg), zg = null), f2 = true;
          if (!f2) return b2.flags & 65536 ? b2 : null;
        }
        if (0 !== (b2.flags & 128)) return b2.lanes = c2, b2;
        d2 = null !== d2;
        d2 !== (null !== a && null !== a.memoizedState) && d2 && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a || 0 !== (L2.current & 1) ? 0 === T2 && (T2 = 3) : tj()));
        null !== b2.updateQueue && (b2.flags |= 4);
        S2(b2);
        return null;
      case 4:
        return zh(), Aj(a, b2), null === a && sf(b2.stateNode.containerInfo), S2(b2), null;
      case 10:
        return ah(b2.type._context), S2(b2), null;
      case 17:
        return Zf(b2.type) && $f(), S2(b2), null;
      case 19:
        E(L2);
        f2 = b2.memoizedState;
        if (null === f2) return S2(b2), null;
        d2 = 0 !== (b2.flags & 128);
        g2 = f2.rendering;
        if (null === g2) if (d2) Dj(f2, false);
        else {
          if (0 !== T2 || null !== a && 0 !== (a.flags & 128)) for (a = b2.child; null !== a; ) {
            g2 = Ch(a);
            if (null !== g2) {
              b2.flags |= 128;
              Dj(f2, false);
              d2 = g2.updateQueue;
              null !== d2 && (b2.updateQueue = d2, b2.flags |= 4);
              b2.subtreeFlags = 0;
              d2 = c2;
              for (c2 = b2.child; null !== c2; ) f2 = c2, a = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a = g2.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c2 = c2.sibling;
              G(L2, L2.current & 1 | 2);
              return b2.child;
            }
            a = a.sibling;
          }
          null !== f2.tail && B() > Gj && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
        }
        else {
          if (!d2) if (a = Ch(g2), null !== a) {
            if (b2.flags |= 128, d2 = true, c2 = a.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I2) return S2(b2), null;
          } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
          f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
        }
        if (null !== f2.tail) return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B(), b2.sibling = null, c2 = L2.current, G(L2, d2 ? c2 & 1 | 2 : c2 & 1), b2;
        S2(b2);
        return null;
      case 22:
      case 23:
        return Hj(), d2 = null !== b2.memoizedState, null !== a && null !== a.memoizedState !== d2 && (b2.flags |= 8192), d2 && 0 !== (b2.mode & 1) ? 0 !== (fj & 1073741824) && (S2(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S2(b2), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p2(156, b2.tag));
  }
  function Ij(a, b2) {
    wg(b2);
    switch (b2.tag) {
      case 1:
        return Zf(b2.type) && $f(), a = b2.flags, a & 65536 ? (b2.flags = a & -65537 | 128, b2) : null;
      case 3:
        return zh(), E(Wf), E(H), Eh(), a = b2.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b2.flags = a & -65537 | 128, b2) : null;
      case 5:
        return Bh(b2), null;
      case 13:
        E(L2);
        a = b2.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b2.alternate) throw Error(p2(340));
          Ig();
        }
        a = b2.flags;
        return a & 65536 ? (b2.flags = a & -65537 | 128, b2) : null;
      case 19:
        return E(L2), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b2.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U2 = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V2 = null;
  function Lj(a, b2) {
    var c2 = a.ref;
    if (null !== c2) if ("function" === typeof c2) try {
      c2(null);
    } catch (d2) {
      W2(a, b2, d2);
    }
    else c2.current = null;
  }
  function Mj(a, b2, c2) {
    try {
      c2();
    } catch (d2) {
      W2(a, b2, d2);
    }
  }
  var Nj = false;
  function Oj(a, b2) {
    Cf = dd;
    a = Me();
    if (Ne(a)) {
      if ("selectionStart" in a) var c2 = { start: a.selectionStart, end: a.selectionEnd };
      else a: {
        c2 = (c2 = a.ownerDocument) && c2.defaultView || window;
        var d2 = c2.getSelection && c2.getSelection();
        if (d2 && 0 !== d2.rangeCount) {
          c2 = d2.anchorNode;
          var e = d2.anchorOffset, f2 = d2.focusNode;
          d2 = d2.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (F2) {
            c2 = null;
            break a;
          }
          var g2 = 0, h2 = -1, k = -1, l = 0, m2 = 0, q2 = a, r = null;
          b: for (; ; ) {
            for (var y2; ; ) {
              q2 !== c2 || 0 !== e && 3 !== q2.nodeType || (h2 = g2 + e);
              q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k = g2 + d2);
              3 === q2.nodeType && (g2 += q2.nodeValue.length);
              if (null === (y2 = q2.firstChild)) break;
              r = q2;
              q2 = y2;
            }
            for (; ; ) {
              if (q2 === a) break b;
              r === c2 && ++l === e && (h2 = g2);
              r === f2 && ++m2 === d2 && (k = g2);
              if (null !== (y2 = q2.nextSibling)) break;
              q2 = r;
              r = q2.parentNode;
            }
            q2 = y2;
          }
          c2 = -1 === h2 || -1 === k ? null : { start: h2, end: k };
        } else c2 = null;
      }
      c2 = c2 || { start: 0, end: 0 };
    } else c2 = null;
    Df = { focusedElem: a, selectionRange: c2 };
    dd = false;
    for (V2 = b2; null !== V2; ) if (b2 = V2, a = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a) a.return = b2, V2 = a;
    else for (; null !== V2; ) {
      b2 = V2;
      try {
        var n = b2.alternate;
        if (0 !== (b2.flags & 1024)) switch (b2.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n) {
              var t = n.memoizedProps, J2 = n.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t : Ci(b2.type, t), J2);
              x2.__reactInternalSnapshotBeforeUpdate = w2;
            }
            break;
          case 3:
            var u2 = b2.stateNode.containerInfo;
            1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p2(163));
        }
      } catch (F2) {
        W2(b2, b2.return, F2);
      }
      a = b2.sibling;
      if (null !== a) {
        a.return = b2.return;
        V2 = a;
        break;
      }
      V2 = b2.return;
    }
    n = Nj;
    Nj = false;
    return n;
  }
  function Pj(a, b2, c2) {
    var d2 = b2.updateQueue;
    d2 = null !== d2 ? d2.lastEffect : null;
    if (null !== d2) {
      var e = d2 = d2.next;
      do {
        if ((e.tag & a) === a) {
          var f2 = e.destroy;
          e.destroy = void 0;
          void 0 !== f2 && Mj(b2, c2, f2);
        }
        e = e.next;
      } while (e !== d2);
    }
  }
  function Qj(a, b2) {
    b2 = b2.updateQueue;
    b2 = null !== b2 ? b2.lastEffect : null;
    if (null !== b2) {
      var c2 = b2 = b2.next;
      do {
        if ((c2.tag & a) === a) {
          var d2 = c2.create;
          c2.destroy = d2();
        }
        c2 = c2.next;
      } while (c2 !== b2);
    }
  }
  function Rj(a) {
    var b2 = a.ref;
    if (null !== b2) {
      var c2 = a.stateNode;
      switch (a.tag) {
        case 5:
          a = c2;
          break;
        default:
          a = c2;
      }
      "function" === typeof b2 ? b2(a) : b2.current = a;
    }
  }
  function Sj(a) {
    var b2 = a.alternate;
    null !== b2 && (a.alternate = null, Sj(b2));
    a.child = null;
    a.deletions = null;
    a.sibling = null;
    5 === a.tag && (b2 = a.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
    a.stateNode = null;
    a.return = null;
    a.dependencies = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.stateNode = null;
    a.updateQueue = null;
  }
  function Tj(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Uj(a) {
    a: for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Tj(a.return)) return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2) continue a;
        if (null === a.child || 4 === a.tag) continue a;
        else a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function Vj(a, b2, c2) {
    var d2 = a.tag;
    if (5 === d2 || 6 === d2) a = a.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a, b2) : c2.insertBefore(a, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a, c2)) : (b2 = c2, b2.appendChild(a)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
    else if (4 !== d2 && (a = a.child, null !== a)) for (Vj(a, b2, c2), a = a.sibling; null !== a; ) Vj(a, b2, c2), a = a.sibling;
  }
  function Wj(a, b2, c2) {
    var d2 = a.tag;
    if (5 === d2 || 6 === d2) a = a.stateNode, b2 ? c2.insertBefore(a, b2) : c2.appendChild(a);
    else if (4 !== d2 && (a = a.child, null !== a)) for (Wj(a, b2, c2), a = a.sibling; null !== a; ) Wj(a, b2, c2), a = a.sibling;
  }
  var X2 = null, Xj = false;
  function Yj(a, b2, c2) {
    for (c2 = c2.child; null !== c2; ) Zj(a, b2, c2), c2 = c2.sibling;
  }
  function Zj(a, b2, c2) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
      lc.onCommitFiberUnmount(kc, c2);
    } catch (h2) {
    }
    switch (c2.tag) {
      case 5:
        U2 || Lj(c2, b2);
      case 6:
        var d2 = X2, e = Xj;
        X2 = null;
        Yj(a, b2, c2);
        X2 = d2;
        Xj = e;
        null !== X2 && (Xj ? (a = X2, c2 = c2.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c2) : a.removeChild(c2)) : X2.removeChild(c2.stateNode));
        break;
      case 18:
        null !== X2 && (Xj ? (a = X2, c2 = c2.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c2) : 1 === a.nodeType && Kf(a, c2), bd(a)) : Kf(X2, c2.stateNode));
        break;
      case 4:
        d2 = X2;
        e = Xj;
        X2 = c2.stateNode.containerInfo;
        Xj = true;
        Yj(a, b2, c2);
        X2 = d2;
        Xj = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U2 && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
          e = d2 = d2.next;
          do {
            var f2 = e, g2 = f2.destroy;
            f2 = f2.tag;
            void 0 !== g2 && (0 !== (f2 & 2) ? Mj(c2, b2, g2) : 0 !== (f2 & 4) && Mj(c2, b2, g2));
            e = e.next;
          } while (e !== d2);
        }
        Yj(a, b2, c2);
        break;
      case 1:
        if (!U2 && (Lj(c2, b2), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount)) try {
          d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
        } catch (h2) {
          W2(c2, b2, h2);
        }
        Yj(a, b2, c2);
        break;
      case 21:
        Yj(a, b2, c2);
        break;
      case 22:
        c2.mode & 1 ? (U2 = (d2 = U2) || null !== c2.memoizedState, Yj(a, b2, c2), U2 = d2) : Yj(a, b2, c2);
        break;
      default:
        Yj(a, b2, c2);
    }
  }
  function ak(a) {
    var b2 = a.updateQueue;
    if (null !== b2) {
      a.updateQueue = null;
      var c2 = a.stateNode;
      null === c2 && (c2 = a.stateNode = new Kj());
      b2.forEach(function(b3) {
        var d2 = bk.bind(null, a, b3);
        c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
      });
    }
  }
  function ck(a, b2) {
    var c2 = b2.deletions;
    if (null !== c2) for (var d2 = 0; d2 < c2.length; d2++) {
      var e = c2[d2];
      try {
        var f2 = a, g2 = b2, h2 = g2;
        a: for (; null !== h2; ) {
          switch (h2.tag) {
            case 5:
              X2 = h2.stateNode;
              Xj = false;
              break a;
            case 3:
              X2 = h2.stateNode.containerInfo;
              Xj = true;
              break a;
            case 4:
              X2 = h2.stateNode.containerInfo;
              Xj = true;
              break a;
          }
          h2 = h2.return;
        }
        if (null === X2) throw Error(p2(160));
        Zj(f2, g2, e);
        X2 = null;
        Xj = false;
        var k = e.alternate;
        null !== k && (k.return = null);
        e.return = null;
      } catch (l) {
        W2(e, b2, l);
      }
    }
    if (b2.subtreeFlags & 12854) for (b2 = b2.child; null !== b2; ) dk(b2, a), b2 = b2.sibling;
  }
  function dk(a, b2) {
    var c2 = a.alternate, d2 = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b2, a);
        ek(a);
        if (d2 & 4) {
          try {
            Pj(3, a, a.return), Qj(3, a);
          } catch (t) {
            W2(a, a.return, t);
          }
          try {
            Pj(5, a, a.return);
          } catch (t) {
            W2(a, a.return, t);
          }
        }
        break;
      case 1:
        ck(b2, a);
        ek(a);
        d2 & 512 && null !== c2 && Lj(c2, c2.return);
        break;
      case 5:
        ck(b2, a);
        ek(a);
        d2 & 512 && null !== c2 && Lj(c2, c2.return);
        if (a.flags & 32) {
          var e = a.stateNode;
          try {
            ob(e, "");
          } catch (t) {
            W2(a, a.return, t);
          }
        }
        if (d2 & 4 && (e = a.stateNode, null != e)) {
          var f2 = a.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a.type, k = a.updateQueue;
          a.updateQueue = null;
          if (null !== k) try {
            "input" === h2 && "radio" === f2.type && null != f2.name && ab(e, f2);
            vb(h2, g2);
            var l = vb(h2, f2);
            for (g2 = 0; g2 < k.length; g2 += 2) {
              var m2 = k[g2], q2 = k[g2 + 1];
              "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l);
            }
            switch (h2) {
              case "input":
                bb(e, f2);
                break;
              case "textarea":
                ib(e, f2);
                break;
              case "select":
                var r = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e, !!f2.multiple, y2, false) : r !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Pf] = f2;
          } catch (t) {
            W2(a, a.return, t);
          }
        }
        break;
      case 6:
        ck(b2, a);
        ek(a);
        if (d2 & 4) {
          if (null === a.stateNode) throw Error(p2(162));
          e = a.stateNode;
          f2 = a.memoizedProps;
          try {
            e.nodeValue = f2;
          } catch (t) {
            W2(a, a.return, t);
          }
        }
        break;
      case 3:
        ck(b2, a);
        ek(a);
        if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
          bd(b2.containerInfo);
        } catch (t) {
          W2(a, a.return, t);
        }
        break;
      case 4:
        ck(b2, a);
        ek(a);
        break;
      case 13:
        ck(b2, a);
        ek(a);
        e = a.child;
        e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
        d2 & 4 && ak(a);
        break;
      case 22:
        m2 = null !== c2 && null !== c2.memoizedState;
        a.mode & 1 ? (U2 = (l = U2) || m2, ck(b2, a), U2 = l) : ck(b2, a);
        ek(a);
        if (d2 & 8192) {
          l = null !== a.memoizedState;
          if ((a.stateNode.isHidden = l) && !m2 && 0 !== (a.mode & 1)) for (V2 = a, m2 = a.child; null !== m2; ) {
            for (q2 = V2 = m2; null !== V2; ) {
              r = V2;
              y2 = r.child;
              switch (r.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r, r.return);
                  break;
                case 1:
                  Lj(r, r.return);
                  var n = r.stateNode;
                  if ("function" === typeof n.componentWillUnmount) {
                    d2 = r;
                    c2 = r.return;
                    try {
                      b2 = d2, n.props = b2.memoizedProps, n.state = b2.memoizedState, n.componentWillUnmount();
                    } catch (t) {
                      W2(d2, c2, t);
                    }
                  }
                  break;
                case 5:
                  Lj(r, r.return);
                  break;
                case 22:
                  if (null !== r.memoizedState) {
                    gk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r, V2 = y2) : gk(q2);
            }
            m2 = m2.sibling;
          }
          a: for (m2 = null, q2 = a; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e = q2.stateNode, l ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k = q2.memoizedProps.style, g2 = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h2.style.display = rb("display", g2));
                } catch (t) {
                  W2(a, a.return, t);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2) try {
                q2.stateNode.nodeValue = l ? "" : q2.memoizedProps;
              } catch (t) {
                W2(a, a.return, t);
              }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a) break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a) break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
        }
        break;
      case 19:
        ck(b2, a);
        ek(a);
        d2 & 4 && ak(a);
        break;
      case 21:
        break;
      default:
        ck(
          b2,
          a
        ), ek(a);
    }
  }
  function ek(a) {
    var b2 = a.flags;
    if (b2 & 2) {
      try {
        a: {
          for (var c2 = a.return; null !== c2; ) {
            if (Tj(c2)) {
              var d2 = c2;
              break a;
            }
            c2 = c2.return;
          }
          throw Error(p2(160));
        }
        switch (d2.tag) {
          case 5:
            var e = d2.stateNode;
            d2.flags & 32 && (ob(e, ""), d2.flags &= -33);
            var f2 = Uj(a);
            Wj(a, f2, e);
            break;
          case 3:
          case 4:
            var g2 = d2.stateNode.containerInfo, h2 = Uj(a);
            Vj(a, h2, g2);
            break;
          default:
            throw Error(p2(161));
        }
      } catch (k) {
        W2(a, a.return, k);
      }
      a.flags &= -3;
    }
    b2 & 4096 && (a.flags &= -4097);
  }
  function hk(a, b2, c2) {
    V2 = a;
    ik(a);
  }
  function ik(a, b2, c2) {
    for (var d2 = 0 !== (a.mode & 1); null !== V2; ) {
      var e = V2, f2 = e.child;
      if (22 === e.tag && d2) {
        var g2 = null !== e.memoizedState || Jj;
        if (!g2) {
          var h2 = e.alternate, k = null !== h2 && null !== h2.memoizedState || U2;
          h2 = Jj;
          var l = U2;
          Jj = g2;
          if ((U2 = k) && !l) for (V2 = e; null !== V2; ) g2 = V2, k = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e) : null !== k ? (k.return = g2, V2 = k) : jk(e);
          for (; null !== f2; ) V2 = f2, ik(f2), f2 = f2.sibling;
          V2 = e;
          Jj = h2;
          U2 = l;
        }
        kk(a);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V2 = f2) : kk(a);
    }
  }
  function kk(a) {
    for (; null !== V2; ) {
      var b2 = V2;
      if (0 !== (b2.flags & 8772)) {
        var c2 = b2.alternate;
        try {
          if (0 !== (b2.flags & 8772)) switch (b2.tag) {
            case 0:
            case 11:
            case 15:
              U2 || Qj(5, b2);
              break;
            case 1:
              var d2 = b2.stateNode;
              if (b2.flags & 4 && !U2) if (null === c2) d2.componentDidMount();
              else {
                var e = b2.elementType === b2.type ? c2.memoizedProps : Ci(b2.type, c2.memoizedProps);
                d2.componentDidUpdate(e, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
              }
              var f2 = b2.updateQueue;
              null !== f2 && sh(b2, f2, d2);
              break;
            case 3:
              var g2 = b2.updateQueue;
              if (null !== g2) {
                c2 = null;
                if (null !== b2.child) switch (b2.child.tag) {
                  case 5:
                    c2 = b2.child.stateNode;
                    break;
                  case 1:
                    c2 = b2.child.stateNode;
                }
                sh(b2, g2, c2);
              }
              break;
            case 5:
              var h2 = b2.stateNode;
              if (null === c2 && b2.flags & 4) {
                c2 = h2;
                var k = b2.memoizedProps;
                switch (b2.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k.autoFocus && c2.focus();
                    break;
                  case "img":
                    k.src && (c2.src = k.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b2.memoizedState) {
                var l = b2.alternate;
                if (null !== l) {
                  var m2 = l.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p2(163));
          }
          U2 || b2.flags & 512 && Rj(b2);
        } catch (r) {
          W2(b2, b2.return, r);
        }
      }
      if (b2 === a) {
        V2 = null;
        break;
      }
      c2 = b2.sibling;
      if (null !== c2) {
        c2.return = b2.return;
        V2 = c2;
        break;
      }
      V2 = b2.return;
    }
  }
  function gk(a) {
    for (; null !== V2; ) {
      var b2 = V2;
      if (b2 === a) {
        V2 = null;
        break;
      }
      var c2 = b2.sibling;
      if (null !== c2) {
        c2.return = b2.return;
        V2 = c2;
        break;
      }
      V2 = b2.return;
    }
  }
  function jk(a) {
    for (; null !== V2; ) {
      var b2 = V2;
      try {
        switch (b2.tag) {
          case 0:
          case 11:
          case 15:
            var c2 = b2.return;
            try {
              Qj(4, b2);
            } catch (k) {
              W2(b2, c2, k);
            }
            break;
          case 1:
            var d2 = b2.stateNode;
            if ("function" === typeof d2.componentDidMount) {
              var e = b2.return;
              try {
                d2.componentDidMount();
              } catch (k) {
                W2(b2, e, k);
              }
            }
            var f2 = b2.return;
            try {
              Rj(b2);
            } catch (k) {
              W2(b2, f2, k);
            }
            break;
          case 5:
            var g2 = b2.return;
            try {
              Rj(b2);
            } catch (k) {
              W2(b2, g2, k);
            }
        }
      } catch (k) {
        W2(b2, b2.return, k);
      }
      if (b2 === a) {
        V2 = null;
        break;
      }
      var h2 = b2.sibling;
      if (null !== h2) {
        h2.return = b2.return;
        V2 = h2;
        break;
      }
      V2 = b2.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K2 = 0, Q2 = null, Y2 = null, Z2 = 0, fj = 0, ej = Uf(0), T2 = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K2 & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
  }
  function yi(a) {
    if (0 === (a.mode & 1)) return 1;
    if (0 !== (K2 & 2) && 0 !== Z2) return Z2 & -Z2;
    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
    a = C2;
    if (0 !== a) return a;
    a = window.event;
    a = void 0 === a ? 16 : jd(a.type);
    return a;
  }
  function gi(a, b2, c2, d2) {
    if (50 < yk) throw yk = 0, zk = null, Error(p2(185));
    Ac(a, c2, d2);
    if (0 === (K2 & 2) || a !== Q2) a === Q2 && (0 === (K2 & 2) && (qk |= c2), 4 === T2 && Ck(a, Z2)), Dk(a, d2), 1 === c2 && 0 === K2 && 0 === (b2.mode & 1) && (Gj = B() + 500, fg && jg());
  }
  function Dk(a, b2) {
    var c2 = a.callbackNode;
    wc(a, b2);
    var d2 = uc(a, a === Q2 ? Z2 : 0);
    if (0 === d2) null !== c2 && bc(c2), a.callbackNode = null, a.callbackPriority = 0;
    else if (b2 = d2 & -d2, a.callbackPriority !== b2) {
      null != c2 && bc(c2);
      if (1 === b2) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
        0 === (K2 & 6) && jg();
      }), c2 = null;
      else {
        switch (Dc(d2)) {
          case 1:
            c2 = fc;
            break;
          case 4:
            c2 = gc;
            break;
          case 16:
            c2 = hc;
            break;
          case 536870912:
            c2 = jc;
            break;
          default:
            c2 = hc;
        }
        c2 = Fk(c2, Gk.bind(null, a));
      }
      a.callbackPriority = b2;
      a.callbackNode = c2;
    }
  }
  function Gk(a, b2) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K2 & 6)) throw Error(p2(327));
    var c2 = a.callbackNode;
    if (Hk() && a.callbackNode !== c2) return null;
    var d2 = uc(a, a === Q2 ? Z2 : 0);
    if (0 === d2) return null;
    if (0 !== (d2 & 30) || 0 !== (d2 & a.expiredLanes) || b2) b2 = Ik(a, d2);
    else {
      b2 = d2;
      var e = K2;
      K2 |= 2;
      var f2 = Jk();
      if (Q2 !== a || Z2 !== b2) uk = null, Gj = B() + 500, Kk(a, b2);
      do
        try {
          Lk();
          break;
        } catch (h2) {
          Mk(a, h2);
        }
      while (1);
      $g();
      mk.current = f2;
      K2 = e;
      null !== Y2 ? b2 = 0 : (Q2 = null, Z2 = 0, b2 = T2);
    }
    if (0 !== b2) {
      2 === b2 && (e = xc(a), 0 !== e && (d2 = e, b2 = Nk(a, e)));
      if (1 === b2) throw c2 = pk, Kk(a, 0), Ck(a, d2), Dk(a, B()), c2;
      if (6 === b2) Ck(a, d2);
      else {
        e = a.current.alternate;
        if (0 === (d2 & 30) && !Ok(e) && (b2 = Ik(a, d2), 2 === b2 && (f2 = xc(a), 0 !== f2 && (d2 = f2, b2 = Nk(a, f2))), 1 === b2)) throw c2 = pk, Kk(a, 0), Ck(a, d2), Dk(a, B()), c2;
        a.finishedWork = e;
        a.finishedLanes = d2;
        switch (b2) {
          case 0:
          case 1:
            throw Error(p2(345));
          case 2:
            Pk(a, tk, uk);
            break;
          case 3:
            Ck(a, d2);
            if ((d2 & 130023424) === d2 && (b2 = fk + 500 - B(), 10 < b2)) {
              if (0 !== uc(a, 0)) break;
              e = a.suspendedLanes;
              if ((e & d2) !== d2) {
                R();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b2);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 4:
            Ck(a, d2);
            if ((d2 & 4194240) === d2) break;
            b2 = a.eventTimes;
            for (e = -1; 0 < d2; ) {
              var g2 = 31 - oc(d2);
              f2 = 1 << g2;
              g2 = b2[g2];
              g2 > e && (e = g2);
              d2 &= ~f2;
            }
            d2 = e;
            d2 = B() - d2;
            d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * lk(d2 / 1960)) - d2;
            if (10 < d2) {
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d2);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 5:
            Pk(a, tk, uk);
            break;
          default:
            throw Error(p2(329));
        }
      }
    }
    Dk(a, B());
    return a.callbackNode === c2 ? Gk.bind(null, a) : null;
  }
  function Nk(a, b2) {
    var c2 = sk;
    a.current.memoizedState.isDehydrated && (Kk(a, b2).flags |= 256);
    a = Ik(a, b2);
    2 !== a && (b2 = tk, tk = c2, null !== b2 && Fj(b2));
    return a;
  }
  function Fj(a) {
    null === tk ? tk = a : tk.push.apply(tk, a);
  }
  function Ok(a) {
    for (var b2 = a; ; ) {
      if (b2.flags & 16384) {
        var c2 = b2.updateQueue;
        if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d2 = 0; d2 < c2.length; d2++) {
          var e = c2[d2], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f2(), e)) return false;
          } catch (g2) {
            return false;
          }
        }
      }
      c2 = b2.child;
      if (b2.subtreeFlags & 16384 && null !== c2) c2.return = b2, b2 = c2;
      else {
        if (b2 === a) break;
        for (; null === b2.sibling; ) {
          if (null === b2.return || b2.return === a) return true;
          b2 = b2.return;
        }
        b2.sibling.return = b2.return;
        b2 = b2.sibling;
      }
    }
    return true;
  }
  function Ck(a, b2) {
    b2 &= ~rk;
    b2 &= ~qk;
    a.suspendedLanes |= b2;
    a.pingedLanes &= ~b2;
    for (a = a.expirationTimes; 0 < b2; ) {
      var c2 = 31 - oc(b2), d2 = 1 << c2;
      a[c2] = -1;
      b2 &= ~d2;
    }
  }
  function Ek(a) {
    if (0 !== (K2 & 6)) throw Error(p2(327));
    Hk();
    var b2 = uc(a, 0);
    if (0 === (b2 & 1)) return Dk(a, B()), null;
    var c2 = Ik(a, b2);
    if (0 !== a.tag && 2 === c2) {
      var d2 = xc(a);
      0 !== d2 && (b2 = d2, c2 = Nk(a, d2));
    }
    if (1 === c2) throw c2 = pk, Kk(a, 0), Ck(a, b2), Dk(a, B()), c2;
    if (6 === c2) throw Error(p2(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b2;
    Pk(a, tk, uk);
    Dk(a, B());
    return null;
  }
  function Qk(a, b2) {
    var c2 = K2;
    K2 |= 1;
    try {
      return a(b2);
    } finally {
      K2 = c2, 0 === K2 && (Gj = B() + 500, fg && jg());
    }
  }
  function Rk(a) {
    null !== wk && 0 === wk.tag && 0 === (K2 & 6) && Hk();
    var b2 = K2;
    K2 |= 1;
    var c2 = ok.transition, d2 = C2;
    try {
      if (ok.transition = null, C2 = 1, a) return a();
    } finally {
      C2 = d2, ok.transition = c2, K2 = b2, 0 === (K2 & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E(ej);
  }
  function Kk(a, b2) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c2 = a.timeoutHandle;
    -1 !== c2 && (a.timeoutHandle = -1, Gf(c2));
    if (null !== Y2) for (c2 = Y2.return; null !== c2; ) {
      var d2 = c2;
      wg(d2);
      switch (d2.tag) {
        case 1:
          d2 = d2.type.childContextTypes;
          null !== d2 && void 0 !== d2 && $f();
          break;
        case 3:
          zh();
          E(Wf);
          E(H);
          Eh();
          break;
        case 5:
          Bh(d2);
          break;
        case 4:
          zh();
          break;
        case 13:
          E(L2);
          break;
        case 19:
          E(L2);
          break;
        case 10:
          ah(d2.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c2 = c2.return;
    }
    Q2 = a;
    Y2 = a = Pg(a.current, null);
    Z2 = fj = b2;
    T2 = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b2 = 0; b2 < fh.length; b2++) if (c2 = fh[b2], d2 = c2.interleaved, null !== d2) {
        c2.interleaved = null;
        var e = d2.next, f2 = c2.pending;
        if (null !== f2) {
          var g2 = f2.next;
          f2.next = e;
          d2.next = g2;
        }
        c2.pending = d2;
      }
      fh = null;
    }
    return a;
  }
  function Mk(a, b2) {
    do {
      var c2 = Y2;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d2 = M.memoizedState; null !== d2; ) {
            var e = d2.queue;
            null !== e && (e.pending = null);
            d2 = d2.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c2 || null === c2.return) {
          T2 = 1;
          pk = b2;
          Y2 = null;
          break;
        }
        a: {
          var f2 = a, g2 = c2.return, h2 = c2, k = b2;
          b2 = Z2;
          h2.flags |= 32768;
          if (null !== k && "object" === typeof k && "function" === typeof k.then) {
            var l = k, m2 = h2, q2 = m2.tag;
            if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
              var r = m2.alternate;
              r ? (m2.updateQueue = r.updateQueue, m2.memoizedState = r.memoizedState, m2.lanes = r.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
            }
            var y2 = Ui(g2);
            if (null !== y2) {
              y2.flags &= -257;
              Vi(y2, g2, h2, f2, b2);
              y2.mode & 1 && Si(f2, l, b2);
              b2 = y2;
              k = l;
              var n = b2.updateQueue;
              if (null === n) {
                var t = /* @__PURE__ */ new Set();
                t.add(k);
                b2.updateQueue = t;
              } else n.add(k);
              break a;
            } else {
              if (0 === (b2 & 1)) {
                Si(f2, l, b2);
                tj();
                break a;
              }
              k = Error(p2(426));
            }
          } else if (I2 && h2.mode & 1) {
            var J2 = Ui(g2);
            if (null !== J2) {
              0 === (J2.flags & 65536) && (J2.flags |= 256);
              Vi(J2, g2, h2, f2, b2);
              Jg(Ji(k, h2));
              break a;
            }
          }
          f2 = k = Ji(k, h2);
          4 !== T2 && (T2 = 2);
          null === sk ? sk = [f2] : sk.push(f2);
          f2 = g2;
          do {
            switch (f2.tag) {
              case 3:
                f2.flags |= 65536;
                b2 &= -b2;
                f2.lanes |= b2;
                var x2 = Ni(f2, k, b2);
                ph(f2, x2);
                break a;
              case 1:
                h2 = k;
                var w2 = f2.type, u2 = f2.stateNode;
                if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                  f2.flags |= 65536;
                  b2 &= -b2;
                  f2.lanes |= b2;
                  var F2 = Qi(f2, h2, b2);
                  ph(f2, F2);
                  break a;
                }
            }
            f2 = f2.return;
          } while (null !== f2);
        }
        Sk(c2);
      } catch (na) {
        b2 = na;
        Y2 === c2 && null !== c2 && (Y2 = c2 = c2.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a = mk.current;
    mk.current = Rh;
    return null === a ? Rh : a;
  }
  function tj() {
    if (0 === T2 || 3 === T2 || 2 === T2) T2 = 4;
    null === Q2 || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q2, Z2);
  }
  function Ik(a, b2) {
    var c2 = K2;
    K2 |= 2;
    var d2 = Jk();
    if (Q2 !== a || Z2 !== b2) uk = null, Kk(a, b2);
    do
      try {
        Tk();
        break;
      } catch (e) {
        Mk(a, e);
      }
    while (1);
    $g();
    K2 = c2;
    mk.current = d2;
    if (null !== Y2) throw Error(p2(261));
    Q2 = null;
    Z2 = 0;
    return T2;
  }
  function Tk() {
    for (; null !== Y2; ) Uk(Y2);
  }
  function Lk() {
    for (; null !== Y2 && !cc(); ) Uk(Y2);
  }
  function Uk(a) {
    var b2 = Vk(a.alternate, a, fj);
    a.memoizedProps = a.pendingProps;
    null === b2 ? Sk(a) : Y2 = b2;
    nk.current = null;
  }
  function Sk(a) {
    var b2 = a;
    do {
      var c2 = b2.alternate;
      a = b2.return;
      if (0 === (b2.flags & 32768)) {
        if (c2 = Ej(c2, b2, fj), null !== c2) {
          Y2 = c2;
          return;
        }
      } else {
        c2 = Ij(c2, b2);
        if (null !== c2) {
          c2.flags &= 32767;
          Y2 = c2;
          return;
        }
        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
        else {
          T2 = 6;
          Y2 = null;
          return;
        }
      }
      b2 = b2.sibling;
      if (null !== b2) {
        Y2 = b2;
        return;
      }
      Y2 = b2 = a;
    } while (null !== b2);
    0 === T2 && (T2 = 5);
  }
  function Pk(a, b2, c2) {
    var d2 = C2, e = ok.transition;
    try {
      ok.transition = null, C2 = 1, Wk(a, b2, c2, d2);
    } finally {
      ok.transition = e, C2 = d2;
    }
    return null;
  }
  function Wk(a, b2, c2, d2) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K2 & 6)) throw Error(p2(327));
    c2 = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c2) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c2 === a.current) throw Error(p2(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f2 = c2.lanes | c2.childLanes;
    Bc(a, f2);
    a === Q2 && (Y2 = Q2 = null, Z2 = 0);
    0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f2 = 0 !== (c2.flags & 15990);
    if (0 !== (c2.subtreeFlags & 15990) || f2) {
      f2 = ok.transition;
      ok.transition = null;
      var g2 = C2;
      C2 = 1;
      var h2 = K2;
      K2 |= 4;
      nk.current = null;
      Oj(a, c2);
      dk(c2, a);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a.current = c2;
      hk(c2);
      dc();
      K2 = h2;
      C2 = g2;
      ok.transition = f2;
    } else a.current = c2;
    vk && (vk = false, wk = a, xk = e);
    f2 = a.pendingLanes;
    0 === f2 && (Ri = null);
    mc(c2.stateNode);
    Dk(a, B());
    if (null !== b2) for (d2 = a.onRecoverableError, c2 = 0; c2 < b2.length; c2++) e = b2[c2], d2(e.value, { componentStack: e.stack, digest: e.digest });
    if (Oi) throw Oi = false, a = Pi, Pi = null, a;
    0 !== (xk & 1) && 0 !== a.tag && Hk();
    f2 = a.pendingLanes;
    0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a = Dc(xk), b2 = ok.transition, c2 = C2;
      try {
        ok.transition = null;
        C2 = 16 > a ? 16 : a;
        if (null === wk) var d2 = false;
        else {
          a = wk;
          wk = null;
          xk = 0;
          if (0 !== (K2 & 6)) throw Error(p2(331));
          var e = K2;
          K2 |= 4;
          for (V2 = a.current; null !== V2; ) {
            var f2 = V2, g2 = f2.child;
            if (0 !== (V2.flags & 16)) {
              var h2 = f2.deletions;
              if (null !== h2) {
                for (var k = 0; k < h2.length; k++) {
                  var l = h2[k];
                  for (V2 = l; null !== V2; ) {
                    var m2 = V2;
                    switch (m2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m2, f2);
                    }
                    var q2 = m2.child;
                    if (null !== q2) q2.return = m2, V2 = q2;
                    else for (; null !== V2; ) {
                      m2 = V2;
                      var r = m2.sibling, y2 = m2.return;
                      Sj(m2);
                      if (m2 === l) {
                        V2 = null;
                        break;
                      }
                      if (null !== r) {
                        r.return = y2;
                        V2 = r;
                        break;
                      }
                      V2 = y2;
                    }
                  }
                }
                var n = f2.alternate;
                if (null !== n) {
                  var t = n.child;
                  if (null !== t) {
                    n.child = null;
                    do {
                      var J2 = t.sibling;
                      t.sibling = null;
                      t = J2;
                    } while (null !== t);
                  }
                }
                V2 = f2;
              }
            }
            if (0 !== (f2.subtreeFlags & 2064) && null !== g2) g2.return = f2, V2 = g2;
            else b: for (; null !== V2; ) {
              f2 = V2;
              if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                case 0:
                case 11:
                case 15:
                  Pj(9, f2, f2.return);
              }
              var x2 = f2.sibling;
              if (null !== x2) {
                x2.return = f2.return;
                V2 = x2;
                break b;
              }
              V2 = f2.return;
            }
          }
          var w2 = a.current;
          for (V2 = w2; null !== V2; ) {
            g2 = V2;
            var u2 = g2.child;
            if (0 !== (g2.subtreeFlags & 2064) && null !== u2) u2.return = g2, V2 = u2;
            else b: for (g2 = w2; null !== V2; ) {
              h2 = V2;
              if (0 !== (h2.flags & 2048)) try {
                switch (h2.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qj(9, h2);
                }
              } catch (na) {
                W2(h2, h2.return, na);
              }
              if (h2 === g2) {
                V2 = null;
                break b;
              }
              var F2 = h2.sibling;
              if (null !== F2) {
                F2.return = h2.return;
                V2 = F2;
                break b;
              }
              V2 = h2.return;
            }
          }
          K2 = e;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
          d2 = true;
        }
        return d2;
      } finally {
        C2 = c2, ok.transition = b2;
      }
    }
    return false;
  }
  function Xk(a, b2, c2) {
    b2 = Ji(c2, b2);
    b2 = Ni(a, b2, 1);
    a = nh(a, b2, 1);
    b2 = R();
    null !== a && (Ac(a, 1, b2), Dk(a, b2));
  }
  function W2(a, b2, c2) {
    if (3 === a.tag) Xk(a, a, c2);
    else for (; null !== b2; ) {
      if (3 === b2.tag) {
        Xk(b2, a, c2);
        break;
      } else if (1 === b2.tag) {
        var d2 = b2.stateNode;
        if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Ri || !Ri.has(d2))) {
          a = Ji(c2, a);
          a = Qi(b2, a, 1);
          b2 = nh(b2, a, 1);
          a = R();
          null !== b2 && (Ac(b2, 1, a), Dk(b2, a));
          break;
        }
      }
      b2 = b2.return;
    }
  }
  function Ti(a, b2, c2) {
    var d2 = a.pingCache;
    null !== d2 && d2.delete(b2);
    b2 = R();
    a.pingedLanes |= a.suspendedLanes & c2;
    Q2 === a && (Z2 & c2) === c2 && (4 === T2 || 3 === T2 && (Z2 & 130023424) === Z2 && 500 > B() - fk ? Kk(a, 0) : rk |= c2);
    Dk(a, b2);
  }
  function Yk(a, b2) {
    0 === b2 && (0 === (a.mode & 1) ? b2 = 1 : (b2 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c2 = R();
    a = ih(a, b2);
    null !== a && (Ac(a, b2, c2), Dk(a, c2));
  }
  function uj(a) {
    var b2 = a.memoizedState, c2 = 0;
    null !== b2 && (c2 = b2.retryLane);
    Yk(a, c2);
  }
  function bk(a, b2) {
    var c2 = 0;
    switch (a.tag) {
      case 13:
        var d2 = a.stateNode;
        var e = a.memoizedState;
        null !== e && (c2 = e.retryLane);
        break;
      case 19:
        d2 = a.stateNode;
        break;
      default:
        throw Error(p2(314));
    }
    null !== d2 && d2.delete(b2);
    Yk(a, c2);
  }
  var Vk;
  Vk = function(a, b2, c2) {
    if (null !== a) if (a.memoizedProps !== b2.pendingProps || Wf.current) dh = true;
    else {
      if (0 === (a.lanes & c2) && 0 === (b2.flags & 128)) return dh = false, yj(a, b2, c2);
      dh = 0 !== (a.flags & 131072) ? true : false;
    }
    else dh = false, I2 && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
    b2.lanes = 0;
    switch (b2.tag) {
      case 2:
        var d2 = b2.type;
        ij(a, b2);
        a = b2.pendingProps;
        var e = Yf(b2, H.current);
        ch(b2, c2);
        e = Nh(null, b2, d2, a, e, c2);
        var f2 = Sh();
        b2.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d2) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b2), e.updater = Ei, b2.stateNode = e, e._reactInternals = b2, Ii(b2, d2, a, c2), b2 = jj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, I2 && f2 && vg(b2), Xi(null, b2, e, c2), b2 = b2.child);
        return b2;
      case 16:
        d2 = b2.elementType;
        a: {
          ij(a, b2);
          a = b2.pendingProps;
          e = d2._init;
          d2 = e(d2._payload);
          b2.type = d2;
          e = b2.tag = Zk(d2);
          a = Ci(d2, a);
          switch (e) {
            case 0:
              b2 = cj(null, b2, d2, a, c2);
              break a;
            case 1:
              b2 = hj(null, b2, d2, a, c2);
              break a;
            case 11:
              b2 = Yi(null, b2, d2, a, c2);
              break a;
            case 14:
              b2 = $i(null, b2, d2, Ci(d2.type, a), c2);
              break a;
          }
          throw Error(p2(
            306,
            d2,
            ""
          ));
        }
        return b2;
      case 0:
        return d2 = b2.type, e = b2.pendingProps, e = b2.elementType === d2 ? e : Ci(d2, e), cj(a, b2, d2, e, c2);
      case 1:
        return d2 = b2.type, e = b2.pendingProps, e = b2.elementType === d2 ? e : Ci(d2, e), hj(a, b2, d2, e, c2);
      case 3:
        a: {
          kj(b2);
          if (null === a) throw Error(p2(387));
          d2 = b2.pendingProps;
          f2 = b2.memoizedState;
          e = f2.element;
          lh(a, b2);
          qh(b2, d2, null, c2);
          var g2 = b2.memoizedState;
          d2 = g2.element;
          if (f2.isDehydrated) if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
            e = Ji(Error(p2(423)), b2);
            b2 = lj(a, b2, d2, c2, e);
            break a;
          } else if (d2 !== e) {
            e = Ji(Error(p2(424)), b2);
            b2 = lj(a, b2, d2, c2, e);
            break a;
          } else for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I2 = true, zg = null, c2 = Vg(b2, null, d2, c2), b2.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
          else {
            Ig();
            if (d2 === e) {
              b2 = Zi(a, b2, c2);
              break a;
            }
            Xi(a, b2, d2, c2);
          }
          b2 = b2.child;
        }
        return b2;
      case 5:
        return Ah(b2), null === a && Eg(b2), d2 = b2.type, e = b2.pendingProps, f2 = null !== a ? a.memoizedProps : null, g2 = e.children, Ef(d2, e) ? g2 = null : null !== f2 && Ef(d2, f2) && (b2.flags |= 32), gj(a, b2), Xi(a, b2, g2, c2), b2.child;
      case 6:
        return null === a && Eg(b2), null;
      case 13:
        return oj(a, b2, c2);
      case 4:
        return yh(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, null === a ? b2.child = Ug(b2, null, d2, c2) : Xi(a, b2, d2, c2), b2.child;
      case 11:
        return d2 = b2.type, e = b2.pendingProps, e = b2.elementType === d2 ? e : Ci(d2, e), Yi(a, b2, d2, e, c2);
      case 7:
        return Xi(a, b2, b2.pendingProps, c2), b2.child;
      case 8:
        return Xi(a, b2, b2.pendingProps.children, c2), b2.child;
      case 12:
        return Xi(a, b2, b2.pendingProps.children, c2), b2.child;
      case 10:
        a: {
          d2 = b2.type._context;
          e = b2.pendingProps;
          f2 = b2.memoizedProps;
          g2 = e.value;
          G(Wg, d2._currentValue);
          d2._currentValue = g2;
          if (null !== f2) if (He(f2.value, g2)) {
            if (f2.children === e.children && !Wf.current) {
              b2 = Zi(a, b2, c2);
              break a;
            }
          } else for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
            var h2 = f2.dependencies;
            if (null !== h2) {
              g2 = f2.child;
              for (var k = h2.firstContext; null !== k; ) {
                if (k.context === d2) {
                  if (1 === f2.tag) {
                    k = mh(-1, c2 & -c2);
                    k.tag = 2;
                    var l = f2.updateQueue;
                    if (null !== l) {
                      l = l.shared;
                      var m2 = l.pending;
                      null === m2 ? k.next = k : (k.next = m2.next, m2.next = k);
                      l.pending = k;
                    }
                  }
                  f2.lanes |= c2;
                  k = f2.alternate;
                  null !== k && (k.lanes |= c2);
                  bh(
                    f2.return,
                    c2,
                    b2
                  );
                  h2.lanes |= c2;
                  break;
                }
                k = k.next;
              }
            } else if (10 === f2.tag) g2 = f2.type === b2.type ? null : f2.child;
            else if (18 === f2.tag) {
              g2 = f2.return;
              if (null === g2) throw Error(p2(341));
              g2.lanes |= c2;
              h2 = g2.alternate;
              null !== h2 && (h2.lanes |= c2);
              bh(g2, c2, b2);
              g2 = f2.sibling;
            } else g2 = f2.child;
            if (null !== g2) g2.return = f2;
            else for (g2 = f2; null !== g2; ) {
              if (g2 === b2) {
                g2 = null;
                break;
              }
              f2 = g2.sibling;
              if (null !== f2) {
                f2.return = g2.return;
                g2 = f2;
                break;
              }
              g2 = g2.return;
            }
            f2 = g2;
          }
          Xi(a, b2, e.children, c2);
          b2 = b2.child;
        }
        return b2;
      case 9:
        return e = b2.type, d2 = b2.pendingProps.children, ch(b2, c2), e = eh(e), d2 = d2(e), b2.flags |= 1, Xi(a, b2, d2, c2), b2.child;
      case 14:
        return d2 = b2.type, e = Ci(d2, b2.pendingProps), e = Ci(d2.type, e), $i(a, b2, d2, e, c2);
      case 15:
        return bj(a, b2, b2.type, b2.pendingProps, c2);
      case 17:
        return d2 = b2.type, e = b2.pendingProps, e = b2.elementType === d2 ? e : Ci(d2, e), ij(a, b2), b2.tag = 1, Zf(d2) ? (a = true, cg(b2)) : a = false, ch(b2, c2), Gi(b2, d2, e), Ii(b2, d2, e, c2), jj(null, b2, d2, true, a, c2);
      case 19:
        return xj(a, b2, c2);
      case 22:
        return dj(a, b2, c2);
    }
    throw Error(p2(156, b2.tag));
  };
  function Fk(a, b2) {
    return ac(a, b2);
  }
  function $k(a, b2, c2, d2) {
    this.tag = a;
    this.key = c2;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b2;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d2;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a, b2, c2, d2) {
    return new $k(a, b2, c2, d2);
  }
  function aj(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function Zk(a) {
    if ("function" === typeof a) return aj(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === Da) return 11;
      if (a === Ga) return 14;
    }
    return 2;
  }
  function Pg(a, b2) {
    var c2 = a.alternate;
    null === c2 ? (c2 = Bg(a.tag, b2, a.key, a.mode), c2.elementType = a.elementType, c2.type = a.type, c2.stateNode = a.stateNode, c2.alternate = a, a.alternate = c2) : (c2.pendingProps = b2, c2.type = a.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
    c2.flags = a.flags & 14680064;
    c2.childLanes = a.childLanes;
    c2.lanes = a.lanes;
    c2.child = a.child;
    c2.memoizedProps = a.memoizedProps;
    c2.memoizedState = a.memoizedState;
    c2.updateQueue = a.updateQueue;
    b2 = a.dependencies;
    c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
    c2.sibling = a.sibling;
    c2.index = a.index;
    c2.ref = a.ref;
    return c2;
  }
  function Rg(a, b2, c2, d2, e, f2) {
    var g2 = 2;
    d2 = a;
    if ("function" === typeof a) aj(a) && (g2 = 1);
    else if ("string" === typeof a) g2 = 5;
    else a: switch (a) {
      case ya:
        return Tg(c2.children, e, f2, b2);
      case za:
        g2 = 8;
        e |= 8;
        break;
      case Aa:
        return a = Bg(12, c2, b2, e | 2), a.elementType = Aa, a.lanes = f2, a;
      case Ea:
        return a = Bg(13, c2, b2, e), a.elementType = Ea, a.lanes = f2, a;
      case Fa:
        return a = Bg(19, c2, b2, e), a.elementType = Fa, a.lanes = f2, a;
      case Ia:
        return pj(c2, e, f2, b2);
      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case Ba:
            g2 = 10;
            break a;
          case Ca:
            g2 = 9;
            break a;
          case Da:
            g2 = 11;
            break a;
          case Ga:
            g2 = 14;
            break a;
          case Ha:
            g2 = 16;
            d2 = null;
            break a;
        }
        throw Error(p2(130, null == a ? a : typeof a, ""));
    }
    b2 = Bg(g2, c2, b2, e);
    b2.elementType = a;
    b2.type = d2;
    b2.lanes = f2;
    return b2;
  }
  function Tg(a, b2, c2, d2) {
    a = Bg(7, a, d2, b2);
    a.lanes = c2;
    return a;
  }
  function pj(a, b2, c2, d2) {
    a = Bg(22, a, d2, b2);
    a.elementType = Ia;
    a.lanes = c2;
    a.stateNode = { isHidden: false };
    return a;
  }
  function Qg(a, b2, c2) {
    a = Bg(6, a, null, b2);
    a.lanes = c2;
    return a;
  }
  function Sg(a, b2, c2) {
    b2 = Bg(4, null !== a.children ? a.children : [], a.key, b2);
    b2.lanes = c2;
    b2.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
    return b2;
  }
  function al(a, b2, c2, d2, e) {
    this.tag = b2;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d2;
    this.onRecoverableError = e;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a, b2, c2, d2, e, f2, g2, h2, k) {
    a = new al(a, b2, c2, h2, k);
    1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
    f2 = Bg(3, null, null, b2);
    a.current = f2;
    f2.stateNode = a;
    f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f2);
    return a;
  }
  function cl(a, b2, c2) {
    var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a, containerInfo: b2, implementation: c2 };
  }
  function dl(a) {
    if (!a) return Vf;
    a = a._reactInternals;
    a: {
      if (Vb(a) !== a || 1 !== a.tag) throw Error(p2(170));
      var b2 = a;
      do {
        switch (b2.tag) {
          case 3:
            b2 = b2.stateNode.context;
            break a;
          case 1:
            if (Zf(b2.type)) {
              b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b2 = b2.return;
      } while (null !== b2);
      throw Error(p2(171));
    }
    if (1 === a.tag) {
      var c2 = a.type;
      if (Zf(c2)) return bg(a, c2, b2);
    }
    return b2;
  }
  function el(a, b2, c2, d2, e, f2, g2, h2, k) {
    a = bl(c2, d2, true, a, e, f2, g2, h2, k);
    a.context = dl(null);
    c2 = a.current;
    d2 = R();
    e = yi(c2);
    f2 = mh(d2, e);
    f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
    nh(c2, f2, e);
    a.current.lanes = e;
    Ac(a, e, d2);
    Dk(a, d2);
    return a;
  }
  function fl(a, b2, c2, d2) {
    var e = b2.current, f2 = R(), g2 = yi(e);
    c2 = dl(c2);
    null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
    b2 = mh(f2, g2);
    b2.payload = { element: a };
    d2 = void 0 === d2 ? null : d2;
    null !== d2 && (b2.callback = d2);
    a = nh(e, b2, g2);
    null !== a && (gi(a, e, g2, f2), oh(a, e, g2));
    return g2;
  }
  function gl(a) {
    a = a.current;
    if (!a.child) return null;
    switch (a.child.tag) {
      case 5:
        return a.child.stateNode;
      default:
        return a.child.stateNode;
    }
  }
  function hl(a, b2) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c2 = a.retryLane;
      a.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
    }
  }
  function il(a, b2) {
    hl(a, b2);
    (a = a.alternate) && hl(a, b2);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a) {
    console.error(a);
  };
  function ll(a) {
    this._internalRoot = a;
  }
  ml.prototype.render = ll.prototype.render = function(a) {
    var b2 = this._internalRoot;
    if (null === b2) throw Error(p2(409));
    fl(a, b2, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a = this._internalRoot;
    if (null !== a) {
      this._internalRoot = null;
      var b2 = a.containerInfo;
      Rk(function() {
        fl(null, a, null, null);
      });
      b2[uf] = null;
    }
  };
  function ml(a) {
    this._internalRoot = a;
  }
  ml.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var b2 = Hc();
      a = { blockedOn: null, target: a, priority: b2 };
      for (var c2 = 0; c2 < Qc.length && 0 !== b2 && b2 < Qc[c2].priority; c2++) ;
      Qc.splice(c2, 0, a);
      0 === c2 && Vc(a);
    }
  };
  function nl(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
  }
  function ol(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
  }
  function pl() {
  }
  function ql(a, b2, c2, d2, e) {
    if (e) {
      if ("function" === typeof d2) {
        var f2 = d2;
        d2 = function() {
          var a2 = gl(g2);
          f2.call(a2);
        };
      }
      var g2 = el(b2, d2, a, 0, null, false, false, "", pl);
      a._reactRootContainer = g2;
      a[uf] = g2.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk();
      return g2;
    }
    for (; e = a.lastChild; ) a.removeChild(e);
    if ("function" === typeof d2) {
      var h2 = d2;
      d2 = function() {
        var a2 = gl(k);
        h2.call(a2);
      };
    }
    var k = bl(a, 0, false, null, null, false, false, "", pl);
    a._reactRootContainer = k;
    a[uf] = k.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk(function() {
      fl(b2, k, c2, d2);
    });
    return k;
  }
  function rl(a, b2, c2, d2, e) {
    var f2 = c2._reactRootContainer;
    if (f2) {
      var g2 = f2;
      if ("function" === typeof e) {
        var h2 = e;
        e = function() {
          var a2 = gl(g2);
          h2.call(a2);
        };
      }
      fl(b2, g2, a, e);
    } else g2 = ql(c2, b2, a, e, d2);
    return gl(g2);
  }
  Ec = function(a) {
    switch (a.tag) {
      case 3:
        var b2 = a.stateNode;
        if (b2.current.memoizedState.isDehydrated) {
          var c2 = tc(b2.pendingLanes);
          0 !== c2 && (Cc(b2, c2 | 1), Dk(b2, B()), 0 === (K2 & 6) && (Gj = B() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b3 = ih(a, 1);
          if (null !== b3) {
            var c3 = R();
            gi(b3, a, 1, c3);
          }
        }), il(a, 1);
    }
  };
  Fc = function(a) {
    if (13 === a.tag) {
      var b2 = ih(a, 134217728);
      if (null !== b2) {
        var c2 = R();
        gi(b2, a, 134217728, c2);
      }
      il(a, 134217728);
    }
  };
  Gc = function(a) {
    if (13 === a.tag) {
      var b2 = yi(a), c2 = ih(a, b2);
      if (null !== c2) {
        var d2 = R();
        gi(c2, a, b2, d2);
      }
      il(a, b2);
    }
  };
  Hc = function() {
    return C2;
  };
  Ic = function(a, b2) {
    var c2 = C2;
    try {
      return C2 = a, b2();
    } finally {
      C2 = c2;
    }
  };
  yb = function(a, b2, c2) {
    switch (b2) {
      case "input":
        bb(a, c2);
        b2 = c2.name;
        if ("radio" === c2.type && null != b2) {
          for (c2 = a; c2.parentNode; ) c2 = c2.parentNode;
          c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
          for (b2 = 0; b2 < c2.length; b2++) {
            var d2 = c2[b2];
            if (d2 !== a && d2.form === a.form) {
              var e = Db(d2);
              if (!e) throw Error(p2(90));
              Wa(d2);
              bb(d2, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a, c2);
        break;
      case "select":
        b2 = c2.value, null != b2 && fb(a, !!c2.multiple, b2, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a, b2) {
    var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b2)) throw Error(p2(200));
    return cl(a, b2, null, c2);
  };
  reactDom_production_min.createRoot = function(a, b2) {
    if (!nl(a)) throw Error(p2(299));
    var c2 = false, d2 = "", e = kl;
    null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d2 = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e = b2.onRecoverableError));
    b2 = bl(a, 1, false, null, null, c2, false, d2, e);
    a[uf] = b2.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    return new ll(b2);
  };
  reactDom_production_min.findDOMNode = function(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b2 = a._reactInternals;
    if (void 0 === b2) {
      if ("function" === typeof a.render) throw Error(p2(188));
      a = Object.keys(a).join(",");
      throw Error(p2(268, a));
    }
    a = Zb(b2);
    a = null === a ? null : a.stateNode;
    return a;
  };
  reactDom_production_min.flushSync = function(a) {
    return Rk(a);
  };
  reactDom_production_min.hydrate = function(a, b2, c2) {
    if (!ol(b2)) throw Error(p2(200));
    return rl(null, a, b2, true, c2);
  };
  reactDom_production_min.hydrateRoot = function(a, b2, c2) {
    if (!nl(a)) throw Error(p2(405));
    var d2 = null != c2 && c2.hydratedSources || null, e = false, f2 = "", g2 = kl;
    null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
    b2 = el(b2, null, a, 1, null != c2 ? c2 : null, e, false, f2, g2);
    a[uf] = b2.current;
    sf(a);
    if (d2) for (a = 0; a < d2.length; a++) c2 = d2[a], e = c2._getVersion, e = e(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e] : b2.mutableSourceEagerHydrationData.push(
      c2,
      e
    );
    return new ml(b2);
  };
  reactDom_production_min.render = function(a, b2, c2) {
    if (!ol(b2)) throw Error(p2(200));
    return rl(null, a, b2, false, c2);
  };
  reactDom_production_min.unmountComponentAtNode = function(a) {
    if (!ol(a)) throw Error(p2(40));
    return a._reactRootContainer ? (Rk(function() {
      rl(null, null, a, false, function() {
        a._reactRootContainer = null;
        a[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b2, c2, d2) {
    if (!ol(c2)) throw Error(p2(200));
    if (null == a || void 0 === a._reactInternals) throw Error(p2(38));
    return rl(a, b2, c2, false, d2);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  return reactDom_production_min;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production_min();
  }
  return reactDom.exports;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client;
  hasRequiredClient = 1;
  var m2 = requireReactDom();
  {
    client.createRoot = m2.createRoot;
    client.hydrateRoot = m2.hydrateRoot;
  }
  return client;
}
var clientExports = requireClient();
var dist = {};
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  Object.defineProperty(dist, "__esModule", { value: true });
  dist.parse = parse;
  dist.serialize = serialize;
  const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
  const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
  const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
  const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
  const __toString = Object.prototype.toString;
  const NullObject = /* @__PURE__ */ (() => {
    const C2 = function() {
    };
    C2.prototype = /* @__PURE__ */ Object.create(null);
    return C2;
  })();
  function parse(str, options) {
    const obj = new NullObject();
    const len = str.length;
    if (len < 2)
      return obj;
    const dec = (options == null ? void 0 : options.decode) || decode;
    let index = 0;
    do {
      const eqIdx = str.indexOf("=", index);
      if (eqIdx === -1)
        break;
      const colonIdx = str.indexOf(";", index);
      const endIdx = colonIdx === -1 ? len : colonIdx;
      if (eqIdx > endIdx) {
        index = str.lastIndexOf(";", eqIdx - 1) + 1;
        continue;
      }
      const keyStartIdx = startIndex(str, index, eqIdx);
      const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
      const key = str.slice(keyStartIdx, keyEndIdx);
      if (obj[key] === void 0) {
        let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
        let valEndIdx = endIndex(str, endIdx, valStartIdx);
        const value = dec(str.slice(valStartIdx, valEndIdx));
        obj[key] = value;
      }
      index = endIdx + 1;
    } while (index < len);
    return obj;
  }
  function startIndex(str, index, max) {
    do {
      const code = str.charCodeAt(index);
      if (code !== 32 && code !== 9)
        return index;
    } while (++index < max);
    return max;
  }
  function endIndex(str, index, min) {
    while (index > min) {
      const code = str.charCodeAt(--index);
      if (code !== 32 && code !== 9)
        return index + 1;
    }
    return min;
  }
  function serialize(name, val, options) {
    const enc = (options == null ? void 0 : options.encode) || encodeURIComponent;
    if (!cookieNameRegExp.test(name)) {
      throw new TypeError(`argument name is invalid: ${name}`);
    }
    const value = enc(val);
    if (!cookieValueRegExp.test(value)) {
      throw new TypeError(`argument val is invalid: ${val}`);
    }
    let str = name + "=" + value;
    if (!options)
      return str;
    if (options.maxAge !== void 0) {
      if (!Number.isInteger(options.maxAge)) {
        throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
      }
      str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
      if (!domainValueRegExp.test(options.domain)) {
        throw new TypeError(`option domain is invalid: ${options.domain}`);
      }
      str += "; Domain=" + options.domain;
    }
    if (options.path) {
      if (!pathValueRegExp.test(options.path)) {
        throw new TypeError(`option path is invalid: ${options.path}`);
      }
      str += "; Path=" + options.path;
    }
    if (options.expires) {
      if (!isDate2(options.expires) || !Number.isFinite(options.expires.valueOf())) {
        throw new TypeError(`option expires is invalid: ${options.expires}`);
      }
      str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
      str += "; HttpOnly";
    }
    if (options.secure) {
      str += "; Secure";
    }
    if (options.partitioned) {
      str += "; Partitioned";
    }
    if (options.priority) {
      const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
      switch (priority) {
        case "low":
          str += "; Priority=Low";
          break;
        case "medium":
          str += "; Priority=Medium";
          break;
        case "high":
          str += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${options.priority}`);
      }
    }
    if (options.sameSite) {
      const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
      switch (sameSite) {
        case true:
        case "strict":
          str += "; SameSite=Strict";
          break;
        case "lax":
          str += "; SameSite=Lax";
          break;
        case "none":
          str += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
      }
    }
    return str;
  }
  function decode(str) {
    if (str.indexOf("%") === -1)
      return str;
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }
  function isDate2(val) {
    return __toString.call(val) === "[object Date]";
  }
  return dist;
}
requireDist();
/**
 * react-router v7.1.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var PopStateEventType = "popstate";
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    let { pathname, search, hash } = window2.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state = null, key) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options;
  let globalHistory = window2.history;
  let action = "POP";
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }
  function handlePop() {
    action = "POP";
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }
  function push(to, state) {
    action = "PUSH";
    let location = createLocation(history.location, to, state);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error2) {
      if (error2 instanceof DOMException && error2.name === "DataCloneError") {
        throw error2;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }
  function replace2(to, state) {
    action = "REPLACE";
    let location = createLocation(history.location, to, state);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(
      base,
      `No window.location.(origin|href) available to create URL for href: ${href}`
    );
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref2(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i2],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "") {
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _a;
    if (route.path === "" || !((_a = route.path) == null ? void 0 : _a.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b2) => a.score !== b2.score ? b2.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b2.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s2) => s2 === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b2) {
  let siblings = a.length === b2.length && a.slice(0, -1).every((n, i2) => n === b2[i2]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b2[b2.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (_, paramName, isOptional) => {
      params.push({ paramName, isOptional: isOptional != null });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    }
  );
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error2) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error2}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
function isRouteErrorResponse(error2) {
  return error2 != null && typeof error2.status === "number" && typeof error2.statusText === "string" && typeof error2.internal === "boolean" && "data" in error2;
}
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
new Set(validRequestMethodsArr);
var DataRouterContext = reactExports.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = reactExports.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var ViewTransitionContext = reactExports.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = reactExports.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = reactExports.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = reactExports.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = reactExports.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = reactExports.createContext(null);
RouteErrorContext.displayName = "RouteError";
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return reactExports.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let { basename, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator2.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator2,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
reactExports.createContext(null);
function useResolvedPath(to, { relative } = {}) {
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return reactExports.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  var _a;
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator: navigator2, static: isStatic } = reactExports.useContext(NavigationContext);
  let { matches: parentMatches } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    invariant(
      parentPathnameBase === "/" || ((_a = parsedLocationArg.pathname) == null ? void 0 : _a.startsWith(parentPathnameBase)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
    );
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = !isStatic && dataRouterState && dataRouterState.matches && dataRouterState.matches.length > 0 ? dataRouterState.matches : matchRoutes(routes, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterState,
    future
  );
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            ...location
          },
          navigationType: "POP"
          /* Pop */
        }
      },
      renderedMatches
    );
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error2 = useRouteError();
  let message = isRouteErrorResponse(error2) ? `${error2.status} ${error2.statusText}` : error2 instanceof Error ? error2.message : JSON.stringify(error2);
  let stack = error2 instanceof Error ? error2.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error2
    );
    devInfo = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ reactExports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error2) {
    return { error: error2 };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error2, errorInfo) {
    console.error(
      "React Router caught the following error during render",
      error2,
      errorInfo
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ reactExports.createElement(
      RouteErrorContext.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterState = null, future = null) {
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState) {
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error2;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error2 = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce(
            "route-fallback",
            false,
            "No `HydrateFallback` element provided to render during initial hydration"
          );
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error2) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(
        RenderedRoute,
        {
          match,
          routeContext: {
            outlet,
            matches: matches2,
            isDataRoute: dataRouterState != null
          },
          children
        }
      );
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(
      RenderErrorBoundary,
      {
        location: dataRouterState.location,
        revalidation: dataRouterState.revalidation,
        component: errorElement,
        error: error2,
        children: getChildren(),
        routeContext: { outlet: null, matches: matches2, isDataRoute: true }
      }
    ) : getChildren();
  }, null);
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useRouteError() {
  var _a;
  let error2 = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  );
  let routeId = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  if (error2 !== void 0) {
    return error2;
  }
  return (_a = state.errors) == null ? void 0 : _a[routeId];
}
function useNavigateStable() {
  let { router } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  );
  let id = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  );
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
reactExports.memo(DataRoutes);
function DataRoutes({
  routes,
  future,
  state
}) {
  return useRoutesImpl(routes, void 0, state, future);
}
function Route(_props) {
  invariant(
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP",
  navigator: navigator2,
  static: staticProp = false
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(
    () => ({
      basename,
      navigator: navigator2,
      static: staticProp,
      future: {}
    }),
    [basename, navigator2, staticProp]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, { children, value: locationContext }));
}
function Routes({
  children,
  location
}) {
  return useRoutes(createRoutesFromChildren(children), location);
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = [];
  reactExports.Children.forEach(children, (element, index) => {
    if (!reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children, treePath)
      );
      return;
    }
    invariant(
      element.type === Route,
      `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    );
    invariant(
      !element.props.index || !element.props.children,
      "An index route cannot have child routes."
    );
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      hydrateFallbackElement: element.props.hydrateFallbackElement,
      HydrateFallback: element.props.HydrateFallback,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(
        element.props.children,
        treePath
      );
    }
    routes.push(route);
  });
  return routes;
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error2) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error2);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) ;
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    var _a;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_a = currentMatches[index].route.path) == null ? void 0 : _a.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      var _a;
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: ((_a = currentMatches[0]) == null ? void 0 : _a.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifestPatch.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors2, preloads) {
  let set = /* @__PURE__ */ new Set();
  new Set(preloads);
  return descriptors2.reduce((deduped, descriptor) => {
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
function singleFetchUrl(reqUrl) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = "_root.data";
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.data`;
  }
  return url;
}
function useDataRouterContext2() {
  let context = reactExports.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = reactExports.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = reactExports.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = reactExports.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = reactExports.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = reactExports.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = reactExports.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  reactExports.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let { router } = useDataRouterContext2();
  let matches = reactExports.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(PrefetchPageLinksImpl, { page, matches, ...dataLinkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { manifest, routeModules } = useFrameworkContext();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m2) => {
      var _a;
      let manifestRoute = manifest.routes[m2.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m22) => m22.route.id === m2.route.id) && m2.route.id in loaderData && ((_a = routeModules[m2.route.id]) == null ? void 0 : _a.shouldRevalidate)) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m2.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page);
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m2) => routesParams.has(m2.route.id)).map((m2) => m2.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = reactExports.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ reactExports.createElement("link", { key, ...link })
  )));
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser) {
    window.__reactRouterVersion = "7.1.5";
  }
} catch (e) {
}
function BrowserRouter({
  basename,
  children,
  window: window2
}) {
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let setState = reactExports.useCallback(
    (newState) => {
      reactExports.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ reactExports.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = reactExports.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    ...rest
  }, forwardedRef) {
    let { basename } = reactExports.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let absoluteHref;
    let isExternal = false;
    if (typeof to === "string" && isAbsolute) {
      absoluteHref = to;
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
          let path = stripBasename(targetUrl.pathname, basename);
          if (targetUrl.origin === currentUrl.origin && path != null) {
            to = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          warning(
            false,
            `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
          );
        }
      }
    }
    let href = useHref(to, { relative });
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ reactExports.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: absoluteHref || href,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, link, /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = reactExports.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = reactExports.useContext(DataRouterStateContext);
    let { navigator: navigator2, basename } = reactExports.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ reactExports.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = reactExports.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    ...props
  }, forwardedRef) => {
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
      submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition
      });
    };
    return /* @__PURE__ */ reactExports.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  viewTransition
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return reactExports.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        navigate(to, {
          replace: replace2,
          state,
          preventScrollReset,
          relative,
          viewTransition
        });
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition
    ]
  );
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  );
  let { basename } = reactExports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return reactExports.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await router.fetch(key, currentRouteId, options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await router.navigate(options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [router, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = reactExports.useContext(NavigationContext);
  let routeContext = reactExports.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v2) => v2 === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v2) => v2).forEach((v2) => params.append("index", v2));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, opts = {}) {
  let vtContext = reactExports.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative: opts.relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
new TextEncoder();
const loginContainer = "_loginContainer_br91o_1";
const loginForm = "_loginForm_br91o_19";
const inputGroup$1 = "_inputGroup_br91o_37";
const loginButton = "_loginButton_br91o_77";
const error$1 = "_error_br91o_109";
const styles$4 = {
  loginContainer,
  loginForm,
  inputGroup: inputGroup$1,
  loginButton,
  error: error$1
};
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i2;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i2 = 0, l = obj.length; i2 < l; i2++) {
      fn.call(null, obj[i2], i2, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i2 = 0; i2 < len; i2++) {
      key = keys[i2];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i2 = keys.length;
  let _key;
  while (i2-- > 0) {
    _key = keys[i2];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i2 = 0, l = arguments.length; i2 < l; i2++) {
    arguments[i2] && forEach(arguments[i2], assignValue);
  }
  return result;
}
const extend = (a, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(b2, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i2;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i2 = props.length;
    while (i2-- > 0) {
      prop = props[i2];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i2 = thing.length;
  if (!isNumber(i2)) return null;
  const arr = new Array(i2);
  while (i2-- > 0) {
    arr[i2] = thing[i2];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m2, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i2) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i2] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i2 + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i2] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error2, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error2, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError$1.call(axiosError, error2.message, code, config, request, response);
  axiosError.cause = error2;
  axiosError.name = error2.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i2) {
    token = removeBrackets(token);
    return !dots && i2 ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i2;
  const len = keys.length;
  let key;
  for (i2 = 0; i2 < len; i2++) {
    key = keys[i2];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i2;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i2 = line.indexOf(":");
    key = line.substring(0, i2).trim().toLowerCase();
    val = line.substring(i2 + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header2) {
  return header2 && String(header2).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header2, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header2);
  }
  if (isHeaderNameFilter) {
    value = header2;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header2) {
  return header2.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header2) {
  const accessorName = utils$1.toCamelCase(" " + header2);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header2, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header2, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header2) || header2 instanceof this.constructor) {
      setHeaders(header2, valueOrRewrite);
    } else if (utils$1.isString(header2) && (header2 = header2.trim()) && !isValidHeaderName(header2)) {
      setHeaders(parseHeaders(header2), valueOrRewrite);
    } else if (utils$1.isHeaders(header2)) {
      for (const [key, value] of header2.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header2 != null && setHeader(valueOrRewrite, header2, rewrite);
    }
    return this;
  }
  get(header2, parser) {
    header2 = normalizeHeader(header2);
    if (header2) {
      const key = utils$1.findKey(this, header2);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header2, matcher) {
    header2 = normalizeHeader(header2);
    if (header2) {
      const key = utils$1.findKey(this, header2);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header2, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header2)) {
      header2.forEach(deleteHeader);
    } else {
      deleteHeader(header2);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i2 = keys.length;
    let deleted = false;
    while (i2--) {
      const key = keys[i2];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header2) => {
      const key = utils$1.findKey(headers, header2);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header2];
        return;
      }
      const normalized = format ? formatHeader(header2) : String(header2).trim();
      if (normalized !== header2) {
        delete self2[header2];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header2) => {
      value != null && value !== false && (obj[header2] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header2, value]) => header2 + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header2) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header2) ? header2.forEach(defineAccessor) : defineAccessor(header2);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i2 = tail;
    let bytesCount = 0;
    while (i2 !== head) {
      bytesCount += bytes[i2++];
      i2 = i2 % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL2, relativeURL) {
  return relativeURL ? baseURL2.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL2;
}
function buildFullPath(baseURL2, requestedURL) {
  if (baseURL2 && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL2, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b2, prop, caseless) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(a, b2, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    }
  }
  function defaultToConfig2(a, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b2, prop) {
    if (prop in config2) {
      return getMergedValue(a, b2);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b2, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b2), prop, true)
  };
  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
      throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError$1.from(err, err && err.code, config, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i2 = 0; i2 < length; i2++) {
      nameOrAdapter = adapters2[i2];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i2] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s2 = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s2,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.7.9";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i2 = keys.length;
  while (i2-- > 0) {
    const opt = keys[i2];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i2 = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i2 < len) {
        promise = promise.then(chain[i2++], chain[i2++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i2 = 0;
    while (i2 < len) {
      const onFulfilled = requestInterceptorChain[i2++];
      const onRejected = requestInterceptorChain[i2++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error2) {
        onRejected.call(this, error2);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error2) {
      return Promise.reject(error2);
    }
    i2 = 0;
    len = responseInterceptorChain.length;
    while (i2 < len) {
      promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i2 = token._listeners.length;
      while (i2-- > 0) {
        token._listeners[i2](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
const api$1 = axios.create({
  baseURL: "/auth",
  headers: {
    "Content-Type": "application/json"
  }
});
const authService = {
  async login(credentials) {
    var _a, _b, _c, _d, _e;
    try {
      const { data } = await api$1.post("/login", credentials);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error2) {
      if (axios.isAxiosError(error2)) {
        console.log(error2);
        console.log(error2.response);
        console.log((_a = error2.response) == null ? void 0 : _a.data);
        console.log((_c = (_b = error2.response) == null ? void 0 : _b.data) == null ? void 0 : _c.error);
        throw new Error(((_e = (_d = error2.response) == null ? void 0 : _d.data) == null ? void 0 : _e.error) || "Login failed. Please try again later.");
      }
      throw error2;
    }
  },
  async register(credentials) {
    var _a, _b;
    try {
      const { data } = await api$1.post("/register", credentials);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error2) {
      if (axios.isAxiosError(error2)) {
        throw new Error(((_b = (_a = error2.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || "Registration failed. Please try again later.");
      }
      throw error2;
    }
  },
  async refreshToken() {
    try {
      const { data } = await api$1.post("/refresh", {}, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
      localStorage.setItem("token", data.token);
      return data.token;
    } catch (error2) {
      this.logout();
      throw new Error("Session expired. Please login again.");
    }
  },
  async makeAuthenticatedRequest(request) {
    var _a;
    try {
      return await request();
    } catch (error2) {
      if (axios.isAxiosError(error2) && ((_a = error2.response) == null ? void 0 : _a.status) === 401) {
        try {
          await this.refreshToken();
          return await request();
        } catch (refreshError) {
          this.logout();
          throw new Error("Session expired. Please login again.");
        }
      }
      throw error2;
    }
  },
  logout() {
    localStorage.removeItem("token");
  },
  getToken() {
    return localStorage.getItem("token");
  },
  isAuthenticated() {
    return !!this.getToken();
  }
};
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = reactExports.useState({
    email: "",
    password: ""
  });
  const [error2, setError] = reactExports.useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await authService.login(credentials);
      navigate("/", { state: { justLoggedIn: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.loginContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: styles$4.loginForm, onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.inputGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "email",
          id: "email",
          name: "email",
          value: credentials.email,
          onChange: handleChange,
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.inputGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "password",
          id: "password",
          name: "password",
          value: credentials.password,
          onChange: handleChange,
          required: true
        }
      )
    ] }),
    error2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.error, children: error2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: styles$4.loginButton, children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.loginLink, children: [
      "Don't have an account? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register here" })
    ] })
  ] }) });
};
const registerContainer = "_registerContainer_6gemz_1";
const registerForm = "_registerForm_6gemz_19";
const inputGroup = "_inputGroup_6gemz_37";
const registerButton = "_registerButton_6gemz_77";
const error = "_error_6gemz_109";
const loginLink = "_loginLink_6gemz_123";
const passwordRequirements = "_passwordRequirements_6gemz_153";
const styles$3 = {
  registerContainer,
  registerForm,
  inputGroup,
  registerButton,
  error,
  loginLink,
  passwordRequirements
};
const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = reactExports.useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error2, setError] = reactExports.useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const validateForm = () => {
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (credentials.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    try {
      await authService.register({
        email: credentials.email,
        password: credentials.password
      });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.registerContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: styles$3.registerForm, onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Create Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.inputGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "email",
          id: "email",
          name: "email",
          value: credentials.email,
          onChange: handleChange,
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.inputGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "password",
          id: "password",
          name: "password",
          value: credentials.password,
          onChange: handleChange,
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.passwordRequirements, children: "Password must be at least 8 characters long" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.inputGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "password",
          id: "confirmPassword",
          name: "confirmPassword",
          value: credentials.confirmPassword,
          onChange: handleChange,
          required: true
        }
      )
    ] }),
    error2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.error, children: error2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: styles$3.registerButton, children: "Create Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.loginLink, children: [
      "Already have an account? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Login here" })
    ] })
  ] }) });
};
const container = "_container_1j084_43";
const header = "_header_1j084_61";
const addButton = "_addButton_1j084_75";
const goalsList = "_goalsList_1j084_101";
const dragBefore = "_dragBefore_1j084_113";
const dragAfter = "_dragAfter_1j084_121";
const goalCard = "_goalCard_1j084_129";
const goalFooter = "_goalFooter_1j084_145";
const goalHeader = "_goalHeader_1j084_161";
const dragHandle = "_dragHandle_1j084_175";
const dragging = "_dragging_1j084_199";
const taskList = "_taskList_1j084_209";
const taskItem = "_taskItem_1j084_233";
const doneButton = "_doneButton_1j084_263";
const menuContainer = "_menuContainer_1j084_295";
const menuButton = "_menuButton_1j084_307";
const menuDropdown = "_menuDropdown_1j084_357";
const menuItem = "_menuItem_1j084_385";
const modal$1 = "_modal_1j084_415";
const modalContent = "_modalContent_1j084_441";
const modalButtons = "_modalButtons_1j084_457";
const confirmButton = "_confirmButton_1j084_471";
const cancelButton$1 = "_cancelButton_1j084_489";
const styles$2 = {
  container,
  header,
  addButton,
  goalsList,
  dragBefore,
  dragAfter,
  goalCard,
  goalFooter,
  goalHeader,
  dragHandle,
  dragging,
  taskList,
  taskItem,
  doneButton,
  menuContainer,
  menuButton,
  menuDropdown,
  menuItem,
  modal: modal$1,
  modalContent,
  modalButtons,
  confirmButton,
  cancelButton: cancelButton$1
};
const modalOverlay = "_modalOverlay_fhhzo_1";
const modal = "_modal_fhhzo_1";
const modalHeader = "_modalHeader_fhhzo_45";
const closeButton = "_closeButton_fhhzo_73";
const formGroup = "_formGroup_fhhzo_99";
const taskInput = "_taskInput_fhhzo_149";
const removeTask = "_removeTask_fhhzo_161";
const addTask = "_addTask_fhhzo_185";
const modalFooter = "_modalFooter_fhhzo_215";
const cancelButton = "_cancelButton_fhhzo_233";
const submitButton = "_submitButton_fhhzo_259";
const titleColorContainer = "_titleColorContainer_fhhzo_297";
const colorPickerContainer = "_colorPickerContainer_fhhzo_323";
const colorPreview = "_colorPreview_fhhzo_337";
const colorPickerPopover = "_colorPickerPopover_fhhzo_371";
const colorPickerCover = "_colorPickerCover_fhhzo_385";
const styles$1 = {
  modalOverlay,
  modal,
  modalHeader,
  closeButton,
  formGroup,
  taskInput,
  removeTask,
  addTask,
  modalFooter,
  cancelButton,
  submitButton,
  titleColorContainer,
  colorPickerContainer,
  colorPreview,
  colorPickerPopover,
  colorPickerCover
};
function u() {
  return (u = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }).apply(this, arguments);
}
function c(e, r) {
  if (null == e) return {};
  var t, n, o = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++) r.indexOf(t = a[n]) >= 0 || (o[t] = e[t]);
  return o;
}
function i(e) {
  var t = reactExports.useRef(e), n = reactExports.useRef(function(e2) {
    t.current && t.current(e2);
  });
  return t.current = e, n.current;
}
var s = function(e, r, t) {
  return void 0 === r && (r = 0), void 0 === t && (t = 1), e > t ? t : e < r ? r : e;
}, f = function(e) {
  return "touches" in e;
}, v = function(e) {
  return e && e.ownerDocument.defaultView || self;
}, d = function(e, r, t) {
  var n = e.getBoundingClientRect(), o = f(r) ? function(e2, r2) {
    for (var t2 = 0; t2 < e2.length; t2++) if (e2[t2].identifier === r2) return e2[t2];
    return e2[0];
  }(r.touches, t) : r;
  return { left: s((o.pageX - (n.left + v(e).pageXOffset)) / n.width), top: s((o.pageY - (n.top + v(e).pageYOffset)) / n.height) };
}, h = function(e) {
  !f(e) && e.preventDefault();
}, m = React.memo(function(o) {
  var a = o.onMove, l = o.onKey, s2 = c(o, ["onMove", "onKey"]), m2 = reactExports.useRef(null), g2 = i(a), p2 = i(l), b2 = reactExports.useRef(null), _ = reactExports.useRef(false), x2 = reactExports.useMemo(function() {
    var e = function(e2) {
      h(e2), (f(e2) ? e2.touches.length > 0 : e2.buttons > 0) && m2.current ? g2(d(m2.current, e2, b2.current)) : t(false);
    }, r = function() {
      return t(false);
    };
    function t(t2) {
      var n = _.current, o2 = v(m2.current), a2 = t2 ? o2.addEventListener : o2.removeEventListener;
      a2(n ? "touchmove" : "mousemove", e), a2(n ? "touchend" : "mouseup", r);
    }
    return [function(e2) {
      var r2 = e2.nativeEvent, n = m2.current;
      if (n && (h(r2), !function(e3, r3) {
        return r3 && !f(e3);
      }(r2, _.current) && n)) {
        if (f(r2)) {
          _.current = true;
          var o2 = r2.changedTouches || [];
          o2.length && (b2.current = o2[0].identifier);
        }
        n.focus(), g2(d(n, r2, b2.current)), t(true);
      }
    }, function(e2) {
      var r2 = e2.which || e2.keyCode;
      r2 < 37 || r2 > 40 || (e2.preventDefault(), p2({ left: 39 === r2 ? 0.05 : 37 === r2 ? -0.05 : 0, top: 40 === r2 ? 0.05 : 38 === r2 ? -0.05 : 0 }));
    }, t];
  }, [p2, g2]), C2 = x2[0], E = x2[1], H = x2[2];
  return reactExports.useEffect(function() {
    return H;
  }, [H]), React.createElement("div", u({}, s2, { onTouchStart: C2, onMouseDown: C2, className: "react-colorful__interactive", ref: m2, onKeyDown: E, tabIndex: 0, role: "slider" }));
}), g = function(e) {
  return e.filter(Boolean).join(" ");
}, p = function(r) {
  var t = r.color, n = r.left, o = r.top, a = void 0 === o ? 0.5 : o, l = g(["react-colorful__pointer", r.className]);
  return React.createElement("div", { className: l, style: { top: 100 * a + "%", left: 100 * n + "%" } }, React.createElement("div", { className: "react-colorful__pointer-fill", style: { backgroundColor: t } }));
}, b = function(e, r, t) {
  return void 0 === r && (r = 0), void 0 === t && (t = Math.pow(10, r)), Math.round(t * e) / t;
}, x = function(e) {
  return L(C(e));
}, C = function(e) {
  return "#" === e[0] && (e = e.substring(1)), e.length < 6 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: 4 === e.length ? b(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : { r: parseInt(e.substring(0, 2), 16), g: parseInt(e.substring(2, 4), 16), b: parseInt(e.substring(4, 6), 16), a: 8 === e.length ? b(parseInt(e.substring(6, 8), 16) / 255, 2) : 1 };
}, w = function(e) {
  return K(I(e));
}, y = function(e) {
  var r = e.s, t = e.v, n = e.a, o = (200 - r) * t / 100;
  return { h: b(e.h), s: b(o > 0 && o < 200 ? r * t / 100 / (o <= 100 ? o : 200 - o) * 100 : 0), l: b(o / 2), a: b(n, 2) };
}, q = function(e) {
  var r = y(e);
  return "hsl(" + r.h + ", " + r.s + "%, " + r.l + "%)";
}, I = function(e) {
  var r = e.h, t = e.s, n = e.v, o = e.a;
  r = r / 360 * 6, t /= 100, n /= 100;
  var a = Math.floor(r), l = n * (1 - t), u2 = n * (1 - (r - a) * t), c2 = n * (1 - (1 - r + a) * t), i2 = a % 6;
  return { r: b(255 * [n, u2, l, l, c2, n][i2]), g: b(255 * [c2, n, n, u2, l, l][i2]), b: b(255 * [l, l, c2, n, n, u2][i2]), a: b(o, 2) };
}, D = function(e) {
  var r = e.toString(16);
  return r.length < 2 ? "0" + r : r;
}, K = function(e) {
  var r = e.r, t = e.g, n = e.b, o = e.a, a = o < 1 ? D(b(255 * o)) : "";
  return "#" + D(r) + D(t) + D(n) + a;
}, L = function(e) {
  var r = e.r, t = e.g, n = e.b, o = e.a, a = Math.max(r, t, n), l = a - Math.min(r, t, n), u2 = l ? a === r ? (t - n) / l : a === t ? 2 + (n - r) / l : 4 + (r - t) / l : 0;
  return { h: b(60 * (u2 < 0 ? u2 + 6 : u2)), s: b(a ? l / a * 100 : 0), v: b(a / 255 * 100), a: o };
}, S = React.memo(function(r) {
  var t = r.hue, n = r.onChange, o = g(["react-colorful__hue", r.className]);
  return React.createElement("div", { className: o }, React.createElement(m, { onMove: function(e) {
    n({ h: 360 * e.left });
  }, onKey: function(e) {
    n({ h: s(t + 360 * e.left, 0, 360) });
  }, "aria-label": "Hue", "aria-valuenow": b(t), "aria-valuemax": "360", "aria-valuemin": "0" }, React.createElement(p, { className: "react-colorful__hue-pointer", left: t / 360, color: q({ h: t, s: 100, v: 100, a: 1 }) })));
}), T = React.memo(function(r) {
  var t = r.hsva, n = r.onChange, o = { backgroundColor: q({ h: t.h, s: 100, v: 100, a: 1 }) };
  return React.createElement("div", { className: "react-colorful__saturation", style: o }, React.createElement(m, { onMove: function(e) {
    n({ s: 100 * e.left, v: 100 - 100 * e.top });
  }, onKey: function(e) {
    n({ s: s(t.s + 100 * e.left, 0, 100), v: s(t.v - 100 * e.top, 0, 100) });
  }, "aria-label": "Color", "aria-valuetext": "Saturation " + b(t.s) + "%, Brightness " + b(t.v) + "%" }, React.createElement(p, { className: "react-colorful__saturation-pointer", top: 1 - t.v / 100, left: t.s / 100, color: q(t) })));
}), F = function(e, r) {
  if (e === r) return true;
  for (var t in e) if (e[t] !== r[t]) return false;
  return true;
}, X = function(e, r) {
  return e.toLowerCase() === r.toLowerCase() || F(C(e), C(r));
};
function Y(e, t, l) {
  var u2 = i(l), c2 = reactExports.useState(function() {
    return e.toHsva(t);
  }), s2 = c2[0], f2 = c2[1], v2 = reactExports.useRef({ color: t, hsva: s2 });
  reactExports.useEffect(function() {
    if (!e.equal(t, v2.current.color)) {
      var r = e.toHsva(t);
      v2.current = { hsva: r, color: t }, f2(r);
    }
  }, [t, e]), reactExports.useEffect(function() {
    var r;
    F(s2, v2.current.hsva) || e.equal(r = e.fromHsva(s2), v2.current.color) || (v2.current = { hsva: s2, color: r }, u2(r));
  }, [s2, e, u2]);
  var d2 = reactExports.useCallback(function(e2) {
    f2(function(r) {
      return Object.assign({}, r, e2);
    });
  }, []);
  return [s2, d2];
}
var V = "undefined" != typeof window ? reactExports.useLayoutEffect : reactExports.useEffect, $ = function() {
  return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : void 0;
}, J = /* @__PURE__ */ new Map(), Q = function(e) {
  V(function() {
    var r = e.current ? e.current.ownerDocument : document;
    if (void 0 !== r && !J.has(r)) {
      var t = r.createElement("style");
      t.innerHTML = `.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`, J.set(r, t);
      var n = $();
      n && t.setAttribute("nonce", n), r.head.appendChild(t);
    }
  }, []);
}, U = function(t) {
  var n = t.className, o = t.colorModel, a = t.color, l = void 0 === a ? o.defaultColor : a, i2 = t.onChange, s2 = c(t, ["className", "colorModel", "color", "onChange"]), f2 = reactExports.useRef(null);
  Q(f2);
  var v2 = Y(o, l, i2), d2 = v2[0], h2 = v2[1], m2 = g(["react-colorful", n]);
  return React.createElement("div", u({}, s2, { ref: f2, className: m2 }), React.createElement(T, { hsva: d2, onChange: h2 }), React.createElement(S, { hue: d2.h, onChange: h2, className: "react-colorful__last-control" }));
}, W = { defaultColor: "000", toHsva: x, fromHsva: function(e) {
  return w({ h: e.h, s: e.s, v: e.v, a: 1 });
}, equal: X }, Z = function(r) {
  return React.createElement(U, u({}, r, { colorModel: W }));
};
const AddGoalModal = ({ onClose, onSubmit, goalToEdit, goalCount }) => {
  const [title, setTitle] = reactExports.useState((goalToEdit == null ? void 0 : goalToEdit.title) || "");
  const [tasks, setTasks] = reactExports.useState(
    (goalToEdit == null ? void 0 : goalToEdit.goalTasks) || [{ id: 1, name: "" }]
  );
  const [selectedColor, setSelectedColor] = reactExports.useState((goalToEdit == null ? void 0 : goalToEdit.color) || "#238636");
  const [showColorPicker, setShowColorPicker] = reactExports.useState(false);
  const handleAddTask = () => {
    setTasks((prev) => [...prev, { id: tasks[tasks.length - 1].id + 1, name: "" }]);
  };
  const handleRemoveTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const handleTaskChange = (id, value) => {
    setTasks(
      (prev) => prev.map(
        (task) => task.id === id ? { ...task, name: value } : task
      )
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      id: (goalToEdit == null ? void 0 : goalToEdit.id) || "",
      title,
      goalTasks: tasks.filter((task) => task.name.trim() !== ""),
      color: selectedColor,
      order: (goalToEdit == null ? void 0 : goalToEdit.order) || goalCount + 1,
      activityLog: (goalToEdit == null ? void 0 : goalToEdit.activityLog) || {}
    };
    onSubmit(goalData);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.modalOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.modalHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: goalToEdit ? "Edit Goal" : "Create New Goal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: styles$1.closeButton,
          onClick: onClose,
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "title", children: "Goal Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.titleColorContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "title",
              type: "text",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "Enter goal title",
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.colorPickerContainer, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: styles$1.colorPreview,
                onClick: () => setShowColorPicker(!showColorPicker),
                style: { backgroundColor: selectedColor },
                "aria-label": "Select color"
              }
            ),
            showColorPicker && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.colorPickerPopover, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: styles$1.colorPickerCover,
                  onClick: () => setShowColorPicker(false)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Z,
                {
                  color: selectedColor,
                  onChange: setSelectedColor
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tasks (Optional)" }),
        tasks.map((task, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.taskInput, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: task.name,
              onChange: (e) => handleTaskChange(task.id, e.target.value),
              placeholder: `Task ${index + 1}`
            }
          ),
          tasks.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: styles$1.removeTask,
              onClick: () => handleRemoveTask(task.id),
              children: "×"
            }
          )
        ] }, task.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: styles$1.addTask,
            onClick: handleAddTask,
            children: "+ Add Task"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.modalFooter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: styles$1.cancelButton,
            onClick: onClose,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: styles$1.submitButton,
            disabled: !title.trim(),
            children: goalToEdit ? "Save Changes" : "Create Goal"
          }
        )
      ] })
    ] })
  ] }) });
};
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && /* @__PURE__ */ React.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key = sourceSymbolKeys[i2];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i2 = _toPrimitive(t, "string");
  return "symbol" == typeof i2 ? i2 : i2 + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t, r);
    if ("object" != typeof i2) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i2) => /* @__PURE__ */ React.createElement(node.tag, _objectSpread({
    key: i2
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function MdDragIndicator(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0V0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }, "child": [] }] })(props);
}
const calendar = "_calendar_79a2a_1";
const column = "_column_79a2a_15";
const day = "_day_79a2a_27";
const calendarContainer = "_calendarContainer_79a2a_47";
const yearSelector = "_yearSelector_79a2a_65";
const yearButton = "_yearButton_79a2a_89";
const selected = "_selected_79a2a_131";
const monthLabel = "_monthLabel_79a2a_141";
const weekRow = "_weekRow_79a2a_153";
const styles = {
  calendar,
  column,
  day,
  calendarContainer,
  yearSelector,
  yearButton,
  selected,
  monthLabel,
  weekRow
};
const ActivityCalendar = ({ activityLog, color, year, onYearSelect }) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  const getOpacity = reactExports.useCallback((count) => {
    if (count === 0) return 1;
    return Math.min(count / 5 * 100, 100) / 100;
  }, []);
  const daysArray = reactExports.useMemo(() => {
    if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      const daysBeforeStart = startDate.getDay();
      if (daysBeforeStart > 0) {
        startDate.setDate(startDate.getDate() - daysBeforeStart);
      }
      const daysAfterEnd = 6 - endDate.getDay();
      if (daysAfterEnd > 0) {
        endDate.setDate(endDate.getDate() + daysAfterEnd);
      }
      const days = [];
      for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        days.push(new Date(dt));
      }
      return days;
    } else {
      const today = /* @__PURE__ */ new Date();
      const mostRecentSunday = new Date(today);
      mostRecentSunday.setDate(today.getDate() - today.getDay());
      const startDate = new Date(mostRecentSunday);
      startDate.setDate(startDate.getDate() - 364);
      const days = [];
      for (let dt = new Date(startDate); dt <= today; dt.setDate(dt.getDate() + 1)) {
        days.push(new Date(dt));
      }
      return days;
    }
  }, [year]);
  const totalWeeks = reactExports.useMemo(
    () => year ? Math.ceil(daysArray.length / 7) : 53,
    [year, daysArray.length]
  );
  const calendarGrid = reactExports.useMemo(() => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.weekRow, children: Array.from({ length: totalWeeks }, (_, weekIndex) => {
      const firstDayOfWeek = daysArray[weekIndex * 7];
      const isFirstSundayOfMonth = firstDayOfWeek && firstDayOfWeek.getDate() <= 7 && firstDayOfWeek.getDay() === 0;
      const isLastWeek = weekIndex === totalWeeks - 1;
      const shouldShowLabel = isFirstSundayOfMonth && !isLastWeek;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.column, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.monthLabel, children: shouldShowLabel ? firstDayOfWeek.toLocaleString("en-US", { month: "short" }) : "" }) }, weekIndex);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.weekRow, children: Array.from({ length: totalWeeks }, (_, weekIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.column, children: [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
      const date = daysArray[weekIndex * 7 + dayOfWeek];
      if (!date) return null;
      const dateStr = date.toLocaleDateString("en-CA");
      if (year && date.getFullYear() !== year) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.day, style: { visibility: "hidden" } }, dateStr);
      }
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }).replace(/(\d+)/, (d2) => {
        const num = parseInt(d2, 10);
        const suffix = ["th", "st", "nd", "rd"][num > 3 && num < 21 || num % 10 > 3 ? 0 : num % 10];
        return num + suffix;
      });
      const count = activityLog[dateStr] || 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: styles.day,
          style: {
            opacity: getOpacity(count),
            backgroundColor: count > 0 ? color : "#161b22",
            border: count > 0 ? "none" : "1px solid #2d333b"
          },
          title: `${count} contributions on ${formattedDate}`,
          role: "tooltip",
          "aria-label": `${count} contributions on ${formattedDate}`
        },
        dateStr
      );
    }) }, weekIndex)) })
  ] }), [daysArray, totalWeeks, year, activityLog, getOpacity, color]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.calendarContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.calendar, children: calendarGrid }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.yearSelector, children: years.map((y2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `${styles.yearButton} ${year === y2 ? styles.selected : ""}`,
        onClick: () => onYearSelect == null ? void 0 : onYearSelect(year === y2 ? void 0 : y2),
        children: y2
      },
      y2
    )) })
  ] });
};
const ActivityCalendar$1 = React.memo(ActivityCalendar);
function BsThreeDotsVertical(props) {
  return GenIcon({ "attr": { "fill": "currentColor", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" }, "child": [] }] })(props);
}
const Goal = ({
  goal,
  onDelete,
  onEdit,
  handleComplete,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop
}) => {
  const [showConfirmation, setShowConfirmation] = reactExports.useState(false);
  const [selectedYears, setSelectedYears] = reactExports.useState({});
  const [showMenu, setShowMenu] = reactExports.useState(false);
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleYearSelect = (goalId, year) => {
    setSelectedYears((prev) => ({
      ...prev,
      [goalId]: year
    }));
  };
  const handleEdit = () => {
    onEdit(goal);
    setShowMenu(false);
  };
  const handleDelete = () => {
    setShowConfirmation(true);
  };
  const confirmDelete = () => {
    onDelete(goal.id);
    setShowConfirmation(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: styles$2.goalCard,
      draggable: true,
      onDragStart: (e) => onDragStart(e, goal.id),
      onDragEnd,
      onDragOver: (e) => onDragOver(e, goal.id),
      onDrop: (e) => onDrop(e, goal.id),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.menuContainer, ref: menuRef, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: styles$2.menuButton,
              onClick: () => setShowMenu(!showMenu),
              "aria-label": "Menu",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BsThreeDotsVertical, { size: 16 })
            }
          ),
          showMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.menuDropdown, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: styles$2.menuItem,
                onClick: handleEdit,
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: styles$2.menuItem,
                onClick: handleDelete,
                children: "Delete"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.goalHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: goal.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MdDragIndicator, { className: styles$2.dragHandle, size: 28 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActivityCalendar$1,
            {
              activityLog: goal.activityLog,
              color: goal.color,
              year: selectedYears[goal.id],
              onYearSelect: (year) => handleYearSelect(goal.id, year)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.goalFooter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: styles$2.taskList, children: goal.goalTasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: styles$2.taskItem,
                style: { ["--bullet-color"]: goal.color },
                children: task.name
              },
              task.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: styles$2.doneButton,
                onClick: () => handleComplete(goal.id),
                style: { backgroundColor: goal.color },
                children: "Done"
              }
            )
          ] })
        ] }, goal.id),
        showConfirmation && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.modal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.modalContent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            'Are you sure you want to delete "',
            goal.title,
            '"?'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.modalButtons, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: styles$2.cancelButton,
                onClick: () => setShowConfirmation(false),
                children: "No"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: styles$2.confirmButton,
                onClick: confirmDelete,
                children: "Yes"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
};
const baseURL = "/api";
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});
const goalService = {
  async getGoals() {
    return authService.makeAuthenticatedRequest(async () => {
      const { data } = await api.get("/goals", {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
      return data;
    });
  },
  async addGoal(goal) {
    const { id, ...goalWithoutId } = goal;
    return authService.makeAuthenticatedRequest(async () => {
      const { data } = await api.post("/goals", goalWithoutId, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
      return data;
    });
  },
  async updateGoal(goal) {
    return authService.makeAuthenticatedRequest(async () => {
      await api.put("/goals", goal, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
    });
  },
  async deleteGoal(goalId) {
    return authService.makeAuthenticatedRequest(async () => {
      await api.delete(`/goals/${goalId}`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
    });
  },
  async addContribution(goalId, date) {
    return authService.makeAuthenticatedRequest(async () => {
      await api.post(`/goals/${goalId}/contributions`, JSON.stringify(date), {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
    });
  }
};
const Dashboard = () => {
  const [goals, setGoals] = reactExports.useState([]);
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [draggedId, setDraggedId] = reactExports.useState(null);
  const [goalToEdit, setGoalToEdit] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await goalService.getGoals();
        setGoals(data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };
    fetchGoals();
  }, []);
  const handleAddGoal = async (newGoal) => {
    try {
      const goalId = await goalService.addGoal(newGoal);
      setGoals((prev) => [...prev, { ...newGoal, id: goalId }]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };
  const handleEditGoal = async (updatedGoal) => {
    try {
      await goalService.updateGoal(updatedGoal);
      setGoals((prev) => prev.map(
        (goal) => goal.id === updatedGoal.id ? updatedGoal : goal
      ));
      setIsModalOpen(false);
      setGoalToEdit(void 0);
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };
  const handleDeleteGoal = async (goalId) => {
    try {
      await goalService.deleteGoal(goalId);
      setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };
  const handleComplete = async (goalId) => {
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
    try {
      setGoals((prev) => prev.map((goal) => {
        if (goal.id === goalId) {
          const currentCount = goal.activityLog[today] || 0;
          return {
            ...goal,
            activityLog: {
              ...goal.activityLog,
              [today]: currentCount + 1
            }
          };
        }
        return goal;
      }));
      await goalService.addContribution(goalId, today);
    } catch (err) {
      console.error("Error adding contribution:", err);
      const updatedGoals = await goalService.getGoals();
      setGoals(updatedGoals);
    }
  };
  const handleStartEdit = (goal) => {
    setGoalToEdit(goal);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setGoalToEdit(void 0);
  };
  const handleDragStart = (e, goalId) => {
    e.dataTransfer.setData("text/plain", goalId);
    setDraggedId(goalId);
    e.target.classList.add(styles$2.dragging);
  };
  const handleDragEnd = (e) => {
    e.target.classList.remove(styles$2.dragging);
    setDraggedId(null);
    document.querySelectorAll(`.${styles$2.goalCard}`).forEach((card) => {
      card.classList.remove(styles$2.dragBefore, styles$2.dragAfter);
    });
  };
  const handleDragOver = (e, goalId) => {
    e.preventDefault();
    if (draggedId === goalId) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.top + rect.height / 2;
    target.classList.remove(styles$2.dragAfter, styles$2.dragBefore);
    if (mouseY > threshold) {
      target.classList.add(styles$2.dragAfter);
    } else {
      target.classList.add(styles$2.dragBefore);
    }
  };
  const handleDrop = (e, targetGoalId) => {
    e.preventDefault();
    const draggedGoalId = e.dataTransfer.getData("text/plain");
    if (draggedGoalId === targetGoalId) return;
    const draggedGoal = goals.find((g2) => g2.id === draggedGoalId);
    const targetGoal = goals.find((g2) => g2.id === targetGoalId);
    if (!draggedGoal || !targetGoal) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.top + rect.height / 2;
    const insertAfter = mouseY > threshold;
    setGoals((prev) => {
      const newGoals = prev.filter((g2) => g2.id !== draggedGoalId);
      const targetIndex = newGoals.findIndex((g2) => g2.id === targetGoalId);
      const insertIndex = insertAfter ? targetIndex + 1 : targetIndex;
      newGoals.splice(insertIndex, 0, draggedGoal);
      return newGoals.map((goal, index) => ({
        ...goal,
        order: index
      }));
    });
    e.currentTarget.classList.remove(styles$2.dragAfter, styles$2.dragBefore);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: styles$2.header, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: styles$2.addButton,
        onClick: () => setIsModalOpen(true),
        children: "+ Add Goal"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.goalsList, children: goals.map((goal) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Goal,
      {
        goal,
        onDelete: handleDeleteGoal,
        onEdit: handleStartEdit,
        handleComplete,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver,
        onDrop: handleDrop
      },
      goal.id
    )) }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddGoalModal,
      {
        onClose: handleCloseModal,
        onSubmit: goalToEdit ? handleEditGoal : handleAddGoal,
        goalToEdit,
        goalCount: goals.length
      }
    )
  ] });
};
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      var _a;
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        if (!((_a = location.state) == null ? void 0 : _a.justLoggedIn)) {
          await authService.refreshToken();
        }
        setIsLoading(false);
      } catch (error2) {
        navigate("/login");
      }
    };
    checkAuth();
    const refreshInterval = setInterval(async () => {
      try {
        await authService.refreshToken();
      } catch (error2) {
        navigate("/login");
      }
    }, 45 * 1e3);
    return () => clearInterval(refreshInterval);
  }, [navigate]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Login, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/register", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Register, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Route,
      {
        path: "/",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(PrivateRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) })
      }
    )
  ] }) });
};
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
