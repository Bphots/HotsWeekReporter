/*!
  * web-boilerplate v0.0.5 (https://github.com/thecreation/web-boilerplate)
  * Copyright 2018 Creation Studio Limited
  * Licensed under MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
   *
   *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
   *
   */

  (function (window, document) {

    // Exits early if all IntersectionObserver and IntersectionObserverEntry
    // features are natively supported.

    if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

      // Minimal polyfill for Edge 15's lack of `isIntersecting`
      // See: https://github.com/w3c/IntersectionObserver/issues/211
      if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
        Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
          get: function get() {
            return this.intersectionRatio > 0;
          }
        });
      }
      return;
    }

    /**
     * Creates the global IntersectionObserverEntry constructor.
     * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
     * @param {Object} entry A dictionary of instance properties.
     * @constructor
     */
    function IntersectionObserverEntry(entry) {
      this.time = entry.time;
      this.target = entry.target;
      this.rootBounds = entry.rootBounds;
      this.boundingClientRect = entry.boundingClientRect;
      this.intersectionRect = entry.intersectionRect || getEmptyRect();
      this.isIntersecting = !!entry.intersectionRect;

      // Calculates the intersection ratio.
      var targetRect = this.boundingClientRect;
      var targetArea = targetRect.width * targetRect.height;
      var intersectionRect = this.intersectionRect;
      var intersectionArea = intersectionRect.width * intersectionRect.height;

      // Sets intersection ratio.
      if (targetArea) {
        this.intersectionRatio = intersectionArea / targetArea;
      } else {
        // If area is zero and is intersecting, sets to 1, otherwise to 0
        this.intersectionRatio = this.isIntersecting ? 1 : 0;
      }
    }

    /**
     * Creates the global IntersectionObserver constructor.
     * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
     * @param {Function} callback The function to be invoked after intersection
     *     changes have queued. The function is not invoked if the queue has
     *     been emptied by calling the `takeRecords` method.
     * @param {Object=} opt_options Optional configuration options.
     * @constructor
     */
    function IntersectionObserver(callback, opt_options) {

      var options = opt_options || {};

      if (typeof callback != 'function') {
        throw new Error('callback must be a function');
      }

      if (options.root && options.root.nodeType != 1) {
        throw new Error('root must be an Element');
      }

      // Binds and throttles `this._checkForIntersections`.
      this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

      // Private properties.
      this._callback = callback;
      this._observationTargets = [];
      this._queuedEntries = [];
      this._rootMarginValues = this._parseRootMargin(options.rootMargin);

      // Public properties.
      this.thresholds = this._initThresholds(options.threshold);
      this.root = options.root || null;
      this.rootMargin = this._rootMarginValues.map(function (margin) {
        return margin.value + margin.unit;
      }).join(' ');
    }

    /**
     * The minimum interval within which the document will be checked for
     * intersection changes.
     */
    IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;

    /**
     * The frequency in which the polyfill polls for intersection changes.
     * this can be updated on a per instance basis and must be set prior to
     * calling `observe` on the first target.
     */
    IntersectionObserver.prototype.POLL_INTERVAL = null;

    /**
     * Use a mutation observer on the root element
     * to detect intersection changes.
     */
    IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;

    /**
     * Starts observing a target element for intersection changes based on
     * the thresholds values.
     * @param {Element} target The DOM element to observe.
     */
    IntersectionObserver.prototype.observe = function (target) {
      var isTargetAlreadyObserved = this._observationTargets.some(function (item) {
        return item.element == target;
      });

      if (isTargetAlreadyObserved) {
        return;
      }

      if (!(target && target.nodeType == 1)) {
        throw new Error('target must be an Element');
      }

      this._registerInstance();
      this._observationTargets.push({ element: target, entry: null });
      this._monitorIntersections();
      this._checkForIntersections();
    };

    /**
     * Stops observing a target element for intersection changes.
     * @param {Element} target The DOM element to observe.
     */
    IntersectionObserver.prototype.unobserve = function (target) {
      this._observationTargets = this._observationTargets.filter(function (item) {

        return item.element != target;
      });
      if (!this._observationTargets.length) {
        this._unmonitorIntersections();
        this._unregisterInstance();
      }
    };

    /**
     * Stops observing all target elements for intersection changes.
     */
    IntersectionObserver.prototype.disconnect = function () {
      this._observationTargets = [];
      this._unmonitorIntersections();
      this._unregisterInstance();
    };

    /**
     * Returns any queue entries that have not yet been reported to the
     * callback and clears the queue. This can be used in conjunction with the
     * callback to obtain the absolute most up-to-date intersection information.
     * @return {Array} The currently queued entries.
     */
    IntersectionObserver.prototype.takeRecords = function () {
      var records = this._queuedEntries.slice();
      this._queuedEntries = [];
      return records;
    };

    /**
     * Accepts the threshold value from the user configuration object and
     * returns a sorted array of unique threshold values. If a value is not
     * between 0 and 1 and error is thrown.
     * @private
     * @param {Array|number=} opt_threshold An optional threshold value or
     *     a list of threshold values, defaulting to [0].
     * @return {Array} A sorted list of unique and valid threshold values.
     */
    IntersectionObserver.prototype._initThresholds = function (opt_threshold) {
      var threshold = opt_threshold || [0];
      if (!Array.isArray(threshold)) threshold = [threshold];

      return threshold.sort().filter(function (t, i, a) {
        if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
          throw new Error('threshold must be a number between 0 and 1 inclusively');
        }
        return t !== a[i - 1];
      });
    };

    /**
     * Accepts the rootMargin value from the user configuration object
     * and returns an array of the four margin values as an object containing
     * the value and unit properties. If any of the values are not properly
     * formatted or use a unit other than px or %, and error is thrown.
     * @private
     * @param {string=} opt_rootMargin An optional rootMargin value,
     *     defaulting to '0px'.
     * @return {Array<Object>} An array of margin objects with the keys
     *     value and unit.
     */
    IntersectionObserver.prototype._parseRootMargin = function (opt_rootMargin) {
      var marginString = opt_rootMargin || '0px';
      var margins = marginString.split(/\s+/).map(function (margin) {
        var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
        if (!parts) {
          throw new Error('rootMargin must be specified in pixels or percent');
        }
        return { value: parseFloat(parts[1]), unit: parts[2] };
      });

      // Handles shorthand.
      margins[1] = margins[1] || margins[0];
      margins[2] = margins[2] || margins[0];
      margins[3] = margins[3] || margins[1];

      return margins;
    };

    /**
     * Starts polling for intersection changes if the polling is not already
     * happening, and if the page's visibilty state is visible.
     * @private
     */
    IntersectionObserver.prototype._monitorIntersections = function () {
      if (!this._monitoringIntersections) {
        this._monitoringIntersections = true;

        // If a poll interval is set, use polling instead of listening to
        // resize and scroll events or DOM mutations.
        if (this.POLL_INTERVAL) {
          this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
        } else {
          addEvent(window, 'resize', this._checkForIntersections, true);
          addEvent(document, 'scroll', this._checkForIntersections, true);

          if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
            this._domObserver = new MutationObserver(this._checkForIntersections);
            this._domObserver.observe(document, {
              attributes: true,
              childList: true,
              characterData: true,
              subtree: true
            });
          }
        }
      }
    };

    /**
     * Stops polling for intersection changes.
     * @private
     */
    IntersectionObserver.prototype._unmonitorIntersections = function () {
      if (this._monitoringIntersections) {
        this._monitoringIntersections = false;

        clearInterval(this._monitoringInterval);
        this._monitoringInterval = null;

        removeEvent(window, 'resize', this._checkForIntersections, true);
        removeEvent(document, 'scroll', this._checkForIntersections, true);

        if (this._domObserver) {
          this._domObserver.disconnect();
          this._domObserver = null;
        }
      }
    };

    /**
     * Scans each observation target for intersection changes and adds them
     * to the internal entries queue. If new entries are found, it
     * schedules the callback to be invoked.
     * @private
     */
    IntersectionObserver.prototype._checkForIntersections = function () {
      var rootIsInDom = this._rootIsInDom();
      var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

      this._observationTargets.forEach(function (item) {
        var target = item.element;
        var targetRect = getBoundingClientRect(target);
        var rootContainsTarget = this._rootContainsTarget(target);
        var oldEntry = item.entry;
        var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);

        var newEntry = item.entry = new IntersectionObserverEntry({
          time: now(),
          target: target,
          boundingClientRect: targetRect,
          rootBounds: rootRect,
          intersectionRect: intersectionRect
        });

        if (!oldEntry) {
          this._queuedEntries.push(newEntry);
        } else if (rootIsInDom && rootContainsTarget) {
          // If the new entry intersection ratio has crossed any of the
          // thresholds, add a new entry.
          if (this._hasCrossedThreshold(oldEntry, newEntry)) {
            this._queuedEntries.push(newEntry);
          }
        } else {
          // If the root is not in the DOM or target is not contained within
          // root but the previous entry for this target had an intersection,
          // add a new record indicating removal.
          if (oldEntry && oldEntry.isIntersecting) {
            this._queuedEntries.push(newEntry);
          }
        }
      }, this);

      if (this._queuedEntries.length) {
        this._callback(this.takeRecords(), this);
      }
    };

    /**
     * Accepts a target and root rect computes the intersection between then
     * following the algorithm in the spec.
     * TODO(philipwalton): at this time clip-path is not considered.
     * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
     * @param {Element} target The target DOM element
     * @param {Object} rootRect The bounding rect of the root after being
     *     expanded by the rootMargin value.
     * @return {?Object} The final intersection rect object or undefined if no
     *     intersection is found.
     * @private
     */
    IntersectionObserver.prototype._computeTargetAndRootIntersection = function (target, rootRect) {

      // If the element isn't displayed, an intersection can't happen.
      if (window.getComputedStyle(target).display == 'none') return;

      var targetRect = getBoundingClientRect(target);
      var intersectionRect = targetRect;
      var parent = getParentNode(target);
      var atRoot = false;

      while (!atRoot) {
        var parentRect = null;
        var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};

        // If the parent isn't displayed, an intersection can't happen.
        if (parentComputedStyle.display == 'none') return;

        if (parent == this.root || parent == document) {
          atRoot = true;
          parentRect = rootRect;
        } else {
          // If the element has a non-visible overflow, and it's not the <body>
          // or <html> element, update the intersection rect.
          // Note: <body> and <html> cannot be clipped to a rect that's not also
          // the document rect, so no need to compute a new intersection.
          if (parent != document.body && parent != document.documentElement && parentComputedStyle.overflow != 'visible') {
            parentRect = getBoundingClientRect(parent);
          }
        }

        // If either of the above conditionals set a new parentRect,
        // calculate new intersection data.
        if (parentRect) {
          intersectionRect = computeRectIntersection(parentRect, intersectionRect);

          if (!intersectionRect) break;
        }
        parent = getParentNode(parent);
      }
      return intersectionRect;
    };

    /**
     * Returns the root rect after being expanded by the rootMargin value.
     * @return {Object} The expanded root rect.
     * @private
     */
    IntersectionObserver.prototype._getRootRect = function () {
      var rootRect;
      if (this.root) {
        rootRect = getBoundingClientRect(this.root);
      } else {
        // Use <html>/<body> instead of window since scroll bars affect size.
        var html = document.documentElement;
        var body = document.body;
        rootRect = {
          top: 0,
          left: 0,
          right: html.clientWidth || body.clientWidth,
          width: html.clientWidth || body.clientWidth,
          bottom: html.clientHeight || body.clientHeight,
          height: html.clientHeight || body.clientHeight
        };
      }
      return this._expandRectByRootMargin(rootRect);
    };

    /**
     * Accepts a rect and expands it by the rootMargin value.
     * @param {Object} rect The rect object to expand.
     * @return {Object} The expanded rect.
     * @private
     */
    IntersectionObserver.prototype._expandRectByRootMargin = function (rect) {
      var margins = this._rootMarginValues.map(function (margin, i) {
        return margin.unit == 'px' ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
      });
      var newRect = {
        top: rect.top - margins[0],
        right: rect.right + margins[1],
        bottom: rect.bottom + margins[2],
        left: rect.left - margins[3]
      };
      newRect.width = newRect.right - newRect.left;
      newRect.height = newRect.bottom - newRect.top;

      return newRect;
    };

    /**
     * Accepts an old and new entry and returns true if at least one of the
     * threshold values has been crossed.
     * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
     *    particular target element or null if no previous entry exists.
     * @param {IntersectionObserverEntry} newEntry The current entry for a
     *    particular target element.
     * @return {boolean} Returns true if a any threshold has been crossed.
     * @private
     */
    IntersectionObserver.prototype._hasCrossedThreshold = function (oldEntry, newEntry) {

      // To make comparing easier, an entry that has a ratio of 0
      // but does not actually intersect is given a value of -1
      var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
      var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;

      // Ignore unchanged ratios
      if (oldRatio === newRatio) return;

      for (var i = 0; i < this.thresholds.length; i++) {
        var threshold = this.thresholds[i];

        // Return true if an entry matches a threshold or if the new ratio
        // and the old ratio are on the opposite sides of a threshold.
        if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
          return true;
        }
      }
    };

    /**
     * Returns whether or not the root element is an element and is in the DOM.
     * @return {boolean} True if the root element is an element and is in the DOM.
     * @private
     */
    IntersectionObserver.prototype._rootIsInDom = function () {
      return !this.root || containsDeep(document, this.root);
    };

    /**
     * Returns whether or not the target element is a child of root.
     * @param {Element} target The target element to check.
     * @return {boolean} True if the target element is a child of root.
     * @private
     */
    IntersectionObserver.prototype._rootContainsTarget = function (target) {
      return containsDeep(this.root || document, target);
    };

    /**
     * Adds the instance to the global IntersectionObserver registry if it isn't
     * already present.
     * @private
     */
    IntersectionObserver.prototype._registerInstance = function () {
    };

    /**
     * Removes the instance from the global IntersectionObserver registry.
     * @private
     */
    IntersectionObserver.prototype._unregisterInstance = function () {
    };

    /**
     * Returns the result of the performance.now() method or null in browsers
     * that don't support the API.
     * @return {number} The elapsed time since the page was requested.
     */
    function now() {
      return window.performance && performance.now && performance.now();
    }

    /**
     * Throttles a function and delays its executiong, so it's only called at most
     * once within a given time period.
     * @param {Function} fn The function to throttle.
     * @param {number} timeout The amount of time that must pass before the
     *     function can be called again.
     * @return {Function} The throttled function.
     */
    function throttle(fn, timeout) {
      var timer = null;
      return function () {
        if (!timer) {
          timer = setTimeout(function () {
            fn();
            timer = null;
          }, timeout);
        }
      };
    }

    /**
     * Adds an event handler to a DOM node ensuring cross-browser compatibility.
     * @param {Node} node The DOM node to add the event handler to.
     * @param {string} event The event name.
     * @param {Function} fn The event handler to add.
     * @param {boolean} opt_useCapture Optionally adds the even to the capture
     *     phase. Note: this only works in modern browsers.
     */
    function addEvent(node, event, fn, opt_useCapture) {
      if (typeof node.addEventListener == 'function') {
        node.addEventListener(event, fn, opt_useCapture || false);
      } else if (typeof node.attachEvent == 'function') {
        node.attachEvent('on' + event, fn);
      }
    }

    /**
     * Removes a previously added event handler from a DOM node.
     * @param {Node} node The DOM node to remove the event handler from.
     * @param {string} event The event name.
     * @param {Function} fn The event handler to remove.
     * @param {boolean} opt_useCapture If the event handler was added with this
     *     flag set to true, it should be set to true here in order to remove it.
     */
    function removeEvent(node, event, fn, opt_useCapture) {
      if (typeof node.removeEventListener == 'function') {
        node.removeEventListener(event, fn, opt_useCapture || false);
      } else if (typeof node.detatchEvent == 'function') {
        node.detatchEvent('on' + event, fn);
      }
    }

    /**
     * Returns the intersection between two rect objects.
     * @param {Object} rect1 The first rect.
     * @param {Object} rect2 The second rect.
     * @return {?Object} The intersection rect or undefined if no intersection
     *     is found.
     */
    function computeRectIntersection(rect1, rect2) {
      var top = Math.max(rect1.top, rect2.top);
      var bottom = Math.min(rect1.bottom, rect2.bottom);
      var left = Math.max(rect1.left, rect2.left);
      var right = Math.min(rect1.right, rect2.right);
      var width = right - left;
      var height = bottom - top;

      return width >= 0 && height >= 0 && {
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        width: width,
        height: height
      };
    }

    /**
     * Shims the native getBoundingClientRect for compatibility with older IE.
     * @param {Element} el The element whose bounding rect to get.
     * @return {Object} The (possibly shimmed) rect of the element.
     */
    function getBoundingClientRect(el) {
      var rect;

      try {
        rect = el.getBoundingClientRect();
      } catch (err) {
        // Ignore Windows 7 IE11 "Unspecified error"
        // https://github.com/w3c/IntersectionObserver/pull/205
      }

      if (!rect) return getEmptyRect();

      // Older IE
      if (!(rect.width && rect.height)) {
        rect = {
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.right - rect.left,
          height: rect.bottom - rect.top
        };
      }
      return rect;
    }

    /**
     * Returns an empty rect object. An empty rect is returned when an element
     * is not in the DOM.
     * @return {Object} The empty rect.
     */
    function getEmptyRect() {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0
      };
    }

    /**
     * Checks to see if a parent element contains a child elemnt (including inside
     * shadow DOM).
     * @param {Node} parent The parent element.
     * @param {Node} child The child element.
     * @return {boolean} True if the parent node contains the child node.
     */
    function containsDeep(parent, child) {
      var node = child;
      while (node) {
        if (node == parent) return true;

        node = getParentNode(node);
      }
      return false;
    }

    /**
     * Gets the parent node of an element or its host element if the parent node
     * is a shadow root.
     * @param {Node} node The node whose parent to get.
     * @return {Node|null} The parent node or null if no parent exists.
     */
    function getParentNode(node) {
      var parent = node.parentNode;

      if (parent && parent.nodeType == 11 && parent.host) {
        // If the parent is a shadow root, return the host element.
        return parent.host;
      }
      return parent;
    }

    // Exposes the constructors globally.
    window.IntersectionObserver = IntersectionObserver;
    window.IntersectionObserverEntry = IntersectionObserverEntry;
  })(window, document);

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var aos = createCommonjsModule(function (module, exports) {
    !function (e, t) {
      module.exports = t();
    }(commonjsGlobal, function () {
      var e = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : {},
          t = "Expected a function",
          n = NaN,
          o = "[object Symbol]",
          i = /^\s+|\s+$/g,
          a = /^[-+]0x[0-9a-f]+$/i,
          r = /^0b[01]+$/i,
          c = /^0o[0-7]+$/i,
          s = parseInt,
          u = "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && e && e.Object === Object && e,
          d = "object" == (typeof self === 'undefined' ? 'undefined' : _typeof(self)) && self && self.Object === Object && self,
          f = u || d || Function("return this")(),
          l = Object.prototype.toString,
          m = Math.max,
          p = Math.min,
          v = function v() {
        return f.Date.now();
      };function b(e, n, o) {
        var i,
            a,
            r,
            c,
            s,
            u,
            d = 0,
            f = !1,
            l = !1,
            b = !0;if ("function" != typeof e) throw new TypeError(t);function h(t) {
          var n = i,
              o = a;return i = a = void 0, d = t, c = e.apply(o, n);
        }function y(e) {
          var t = e - u;return void 0 === u || t >= n || t < 0 || l && e - d >= r;
        }function k() {
          var e = v();if (y(e)) return x(e);s = setTimeout(k, function (e) {
            var t = n - (e - u);return l ? p(t, r - (e - d)) : t;
          }(e));
        }function x(e) {
          return s = void 0, b && i ? h(e) : (i = a = void 0, c);
        }function j() {
          var e = v(),
              t = y(e);if (i = arguments, a = this, u = e, t) {
            if (void 0 === s) return function (e) {
              return d = e, s = setTimeout(k, n), f ? h(e) : c;
            }(u);if (l) return s = setTimeout(k, n), h(u);
          }return void 0 === s && (s = setTimeout(k, n)), c;
        }return n = w(n) || 0, g(o) && (f = !!o.leading, r = (l = "maxWait" in o) ? m(w(o.maxWait) || 0, n) : r, b = "trailing" in o ? !!o.trailing : b), j.cancel = function () {
          void 0 !== s && clearTimeout(s), d = 0, i = u = a = s = void 0;
        }, j.flush = function () {
          return void 0 === s ? c : x(v());
        }, j;
      }function g(e) {
        var t = typeof e === 'undefined' ? 'undefined' : _typeof(e);return !!e && ("object" == t || "function" == t);
      }function w(e) {
        if ("number" == typeof e) return e;if (function (e) {
          return "symbol" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) || function (e) {
            return !!e && "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e));
          }(e) && l.call(e) == o;
        }(e)) return n;if (g(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;e = g(t) ? t + "" : t;
        }if ("string" != typeof e) return 0 === e ? e : +e;e = e.replace(i, "");var u = r.test(e);return u || c.test(e) ? s(e.slice(2), u ? 2 : 8) : a.test(e) ? n : +e;
      }var h = function h(e, n, o) {
        var i = !0,
            a = !0;if ("function" != typeof e) throw new TypeError(t);return g(o) && (i = "leading" in o ? !!o.leading : i, a = "trailing" in o ? !!o.trailing : a), b(e, n, { leading: i, maxWait: n, trailing: a });
      },
          y = "Expected a function",
          k = NaN,
          x = "[object Symbol]",
          j = /^\s+|\s+$/g,
          O = /^[-+]0x[0-9a-f]+$/i,
          E = /^0b[01]+$/i,
          N = /^0o[0-7]+$/i,
          z = parseInt,
          C = "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && e && e.Object === Object && e,
          A = "object" == (typeof self === 'undefined' ? 'undefined' : _typeof(self)) && self && self.Object === Object && self,
          q = C || A || Function("return this")(),
          L = Object.prototype.toString,
          T = Math.max,
          S = Math.min,
          M = function M() {
        return q.Date.now();
      };function H(e) {
        var t = typeof e === 'undefined' ? 'undefined' : _typeof(e);return !!e && ("object" == t || "function" == t);
      }function $(e) {
        if ("number" == typeof e) return e;if (function (e) {
          return "symbol" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) || function (e) {
            return !!e && "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e));
          }(e) && L.call(e) == x;
        }(e)) return k;if (H(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;e = H(t) ? t + "" : t;
        }if ("string" != typeof e) return 0 === e ? e : +e;e = e.replace(j, "");var n = E.test(e);return n || N.test(e) ? z(e.slice(2), n ? 2 : 8) : O.test(e) ? k : +e;
      }var D = function D(e, t, n) {
        var o,
            i,
            a,
            r,
            c,
            s,
            u = 0,
            d = !1,
            f = !1,
            l = !0;if ("function" != typeof e) throw new TypeError(y);function m(t) {
          var n = o,
              a = i;return o = i = void 0, u = t, r = e.apply(a, n);
        }function p(e) {
          var n = e - s;return void 0 === s || n >= t || n < 0 || f && e - u >= a;
        }function v() {
          var e = M();if (p(e)) return b(e);c = setTimeout(v, function (e) {
            var n = t - (e - s);return f ? S(n, a - (e - u)) : n;
          }(e));
        }function b(e) {
          return c = void 0, l && o ? m(e) : (o = i = void 0, r);
        }function g() {
          var e = M(),
              n = p(e);if (o = arguments, i = this, s = e, n) {
            if (void 0 === c) return function (e) {
              return u = e, c = setTimeout(v, t), d ? m(e) : r;
            }(s);if (f) return c = setTimeout(v, t), m(s);
          }return void 0 === c && (c = setTimeout(v, t)), r;
        }return t = $(t) || 0, H(n) && (d = !!n.leading, a = (f = "maxWait" in n) ? T($(n.maxWait) || 0, t) : a, l = "trailing" in n ? !!n.trailing : l), g.cancel = function () {
          void 0 !== c && clearTimeout(c), u = 0, o = s = i = c = void 0;
        }, g.flush = function () {
          return void 0 === c ? r : b(M());
        }, g;
      },
          W = function W() {};function P(e) {
        e && e.forEach(function (e) {
          var t = Array.prototype.slice.call(e.addedNodes),
              n = Array.prototype.slice.call(e.removedNodes);if (function e(t) {
            var n = void 0,
                o = void 0;for (n = 0; n < t.length; n += 1) {
              if ((o = t[n]).dataset && o.dataset.aos) return !0;if (o.children && e(o.children)) return !0;
            }return !1;
          }(t.concat(n))) return W();
        });
      }var _ = function _(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      },
          Y = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
          }
        }return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      }(),
          B = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];for (var o in n) {
            Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
        }return e;
      },
          F = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
          I = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          K = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
          G = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;function J() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
      }var Q = new (function () {
        function e() {
          _(this, e);
        }return Y(e, [{ key: "phone", value: function value() {
            var e = J();return !(!F.test(e) && !I.test(e.substr(0, 4)));
          } }, { key: "mobile", value: function value() {
            var e = J();return !(!K.test(e) && !G.test(e.substr(0, 4)));
          } }, { key: "tablet", value: function value() {
            return this.mobile() && !this.phone();
          } }, { key: "ie11", value: function value() {
            return "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
          } }]), e;
      }())(),
          R = function R(e, t) {
        var n = void 0;return Q.ie11() ? (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, { detail: t }) : n = new CustomEvent(e, { detail: t }), document.dispatchEvent(n);
      },
          U = function U(e) {
        return e.forEach(function (e, t) {
          return function (e, t) {
            var n = e.options,
                o = e.position,
                i = e.node,
                a = (e.data, function () {
              e.animated && (function (e, t) {
                t && t.forEach(function (t) {
                  return e.classList.remove(t);
                });
              }(i, n.animatedClassNames), R("aos:out", i), e.options.id && R("aos:in:" + e.options.id, i), e.animated = !1);
            });n.mirror && t >= o.out && !n.once ? a() : t >= o.in ? e.animated || (function (e, t) {
              t && t.forEach(function (t) {
                return e.classList.add(t);
              });
            }(i, n.animatedClassNames), R("aos:in", i), e.options.id && R("aos:in:" + e.options.id, i), e.animated = !0) : e.animated && !n.once && a();
          }(e, window.pageYOffset);
        });
      },
          V = function V(e) {
        for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) {
          t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
        }return { top: n, left: t };
      },
          X = function X(e, t, n) {
        var o = e.getAttribute("data-aos-" + t);if (void 0 !== o) {
          if ("true" === o) return !0;if ("false" === o) return !1;
        }return o || n;
      },
          Z = function Z(e, t) {
        return e.forEach(function (e, n) {
          var o = X(e.node, "mirror", t.mirror),
              i = X(e.node, "once", t.once),
              a = X(e.node, "id"),
              r = t.useClassNames && e.node.getAttribute("data-aos"),
              c = [t.animatedClassName].concat(r ? r.split(" ") : []).filter(function (e) {
            return "string" == typeof e;
          });t.initClassName && e.node.classList.add(t.initClassName), e.position = { in: function (e, t, n) {
              var o = window.innerHeight,
                  i = X(e, "anchor"),
                  a = X(e, "anchor-placement"),
                  r = Number(X(e, "offset", a ? 0 : t)),
                  c = a || n,
                  s = e;i && document.querySelectorAll(i) && (s = document.querySelectorAll(i)[0]);var u = V(s).top - o;switch (c) {case "top-bottom":
                  break;case "center-bottom":
                  u += s.offsetHeight / 2;break;case "bottom-bottom":
                  u += s.offsetHeight;break;case "top-center":
                  u += o / 2;break;case "center-center":
                  u += o / 2 + s.offsetHeight / 2;break;case "bottom-center":
                  u += o / 2 + s.offsetHeight;break;case "top-top":
                  u += o;break;case "bottom-top":
                  u += o + s.offsetHeight;break;case "center-top":
                  u += o + s.offsetHeight / 2;}return u + r;
            }(e.node, t.offset, t.anchorPlacement), out: o && function (e, t) {
              window.innerHeight;var n = X(e, "anchor"),
                  o = X(e, "offset", t),
                  i = e;return n && document.querySelectorAll(n) && (i = document.querySelectorAll(n)[0]), V(i).top + i.offsetHeight - o;
            }(e.node, t.offset) }, e.options = { once: i, mirror: o, animatedClassNames: c, id: a };
        }), e;
      },
          ee = function ee() {
        var e = document.querySelectorAll("[data-aos]");return Array.prototype.map.call(e, function (e) {
          return { node: e };
        });
      },
          te = [],
          ne = !1,
          oe = { offset: 120, delay: 0, easing: "ease", duration: 400, disable: !1, once: !1, mirror: !1, anchorPlacement: "top-bottom", startEvent: "DOMContentLoaded", animatedClassName: "aos-animate", initClassName: "aos-init", useClassNames: !1 },
          ie = function ie() {
        return document.all && !window.atob;
      },
          ae = function ae() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && (ne = !0), ne && (te = Z(te, oe), U(te), window.addEventListener("scroll", h(function () {
          U(te, oe.once);
        }, 99)));
      },
          re = function re() {
        if (te = ee(), se(oe.disable) || ie()) return ce();ae();
      },
          ce = function ce() {
        te.forEach(function (e, t) {
          e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay"), oe.initClassName && e.node.classList.remove(oe.initClassName), oe.animatedClassName && e.node.classList.remove(oe.animatedClassName);
        });
      },
          se = function se(e) {
        return !0 === e || "mobile" === e && Q.mobile() || "phone" === e && Q.phone() || "tablet" === e && Q.tablet() || "function" == typeof e && !0 === e();
      };return { init: function init(e) {
          var t, n, o;return oe = B(oe, e), te = ee(), t = re, n = window.document, o = new (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver)(P), W = t, o.observe(n.documentElement, { childList: !0, subtree: !0, removedNodes: !0 }), se(oe.disable) || ie() ? ce() : (document.querySelector("body").setAttribute("data-aos-easing", oe.easing), document.querySelector("body").setAttribute("data-aos-duration", oe.duration), document.querySelector("body").setAttribute("data-aos-delay", oe.delay), -1 === ["DOMContentLoaded", "load"].indexOf(oe.startEvent) ? document.addEventListener(oe.startEvent, function () {
            ae(!0);
          }) : window.addEventListener("load", function () {
            ae(!0);
          }), "DOMContentLoaded" === oe.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 && ae(!0), window.addEventListener("resize", D(ae, 50, !0)), window.addEventListener("orientationchange", D(ae, 50, !0)), te);
        }, refresh: ae, refreshHard: re };
    });
  });

  var inView_min = createCommonjsModule(function (module, exports) {
    /*!
     * in-view 0.6.1 - Get notified when a DOM element enters or exits the viewport.
     * Copyright (c) 2016 Cam Wiegert <cam@camwiegert.com> - https://camwiegert.github.io/in-view
     * License: MIT
     */
    !function (t, e) {
      module.exports = e();
    }(commonjsGlobal, function () {
      return function (t) {
        function e(r) {
          if (n[r]) return n[r].exports;var i = n[r] = { exports: {}, id: r, loaded: !1 };return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
        }var n = {};return e.m = t, e.c = n, e.p = "", e(0);
      }([function (t, e, n) {
        function r(t) {
          return t && t.__esModule ? t : { "default": t };
        }var i = n(2),
            o = r(i);t.exports = o["default"];
      }, function (t, e) {
        function n(t) {
          var e = typeof t === 'undefined' ? 'undefined' : _typeof(t);return null != t && ("object" == e || "function" == e);
        }t.exports = n;
      }, function (t, e, n) {
        function r(t) {
          return t && t.__esModule ? t : { "default": t };
        }Object.defineProperty(e, "__esModule", { value: !0 });var i = n(9),
            o = r(i),
            u = n(3),
            f = r(u),
            s = n(4),
            c = function c() {
          if ("undefined" != typeof window) {
            var t = 100,
                e = ["scroll", "resize", "load"],
                n = { history: [] },
                r = { offset: {}, threshold: 0, test: s.inViewport },
                i = (0, o["default"])(function () {
              n.history.forEach(function (t) {
                n[t].check();
              });
            }, t);e.forEach(function (t) {
              return addEventListener(t, i);
            }), window.MutationObserver && addEventListener("DOMContentLoaded", function () {
              new MutationObserver(i).observe(document.body, { attributes: !0, childList: !0, subtree: !0 });
            });var u = function u(t) {
              if ("string" == typeof t) {
                var e = [].slice.call(document.querySelectorAll(t));return n.history.indexOf(t) > -1 ? n[t].elements = e : (n[t] = (0, f["default"])(e, r), n.history.push(t)), n[t];
              }
            };return u.offset = function (t) {
              if (void 0 === t) return r.offset;var e = function e(t) {
                return "number" == typeof t;
              };return ["top", "right", "bottom", "left"].forEach(e(t) ? function (e) {
                return r.offset[e] = t;
              } : function (n) {
                return e(t[n]) ? r.offset[n] = t[n] : null;
              }), r.offset;
            }, u.threshold = function (t) {
              return "number" == typeof t && t >= 0 && t <= 1 ? r.threshold = t : r.threshold;
            }, u.test = function (t) {
              return "function" == typeof t ? r.test = t : r.test;
            }, u.is = function (t) {
              return r.test(t, r);
            }, u.offset(0), u;
          }
        };e["default"] = c();
      }, function (t, e) {
        function n(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }Object.defineProperty(e, "__esModule", { value: !0 });var r = function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
            }
          }return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e;
          };
        }(),
            i = function () {
          function t(e, r) {
            n(this, t), this.options = r, this.elements = e, this.current = [], this.handlers = { enter: [], exit: [] }, this.singles = { enter: [], exit: [] };
          }return r(t, [{ key: "check", value: function value() {
              var t = this;return this.elements.forEach(function (e) {
                var n = t.options.test(e, t.options),
                    r = t.current.indexOf(e),
                    i = r > -1,
                    o = n && !i,
                    u = !n && i;o && (t.current.push(e), t.emit("enter", e)), u && (t.current.splice(r, 1), t.emit("exit", e));
              }), this;
            } }, { key: "on", value: function value(t, e) {
              return this.handlers[t].push(e), this;
            } }, { key: "once", value: function value(t, e) {
              return this.singles[t].unshift(e), this;
            } }, { key: "emit", value: function value(t, e) {
              for (; this.singles[t].length;) {
                this.singles[t].pop()(e);
              }for (var n = this.handlers[t].length; --n > -1;) {
                this.handlers[t][n](e);
              }return this;
            } }]), t;
        }();e["default"] = function (t, e) {
          return new i(t, e);
        };
      }, function (t, e) {
        function n(t, e) {
          var n = t.getBoundingClientRect(),
              r = n.top,
              i = n.right,
              o = n.bottom,
              u = n.left,
              f = n.width,
              s = n.height,
              c = { t: o, r: window.innerWidth - u, b: window.innerHeight - r, l: i },
              a = { x: e.threshold * f, y: e.threshold * s };return c.t > e.offset.top + a.y && c.r > e.offset.right + a.x && c.b > e.offset.bottom + a.y && c.l > e.offset.left + a.x;
        }Object.defineProperty(e, "__esModule", { value: !0 }), e.inViewport = n;
      }, function (t, e) {
        (function (e) {
          var n = "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && e && e.Object === Object && e;t.exports = n;
        }).call(e, function () {
          return this;
        }());
      }, function (t, e, n) {
        var r = n(5),
            i = "object" == (typeof self === 'undefined' ? 'undefined' : _typeof(self)) && self && self.Object === Object && self,
            o = r || i || Function("return this")();t.exports = o;
      }, function (t, e, n) {
        function r(t, e, n) {
          function r(e) {
            var n = x,
                r = m;return x = m = void 0, E = e, w = t.apply(r, n);
          }function a(t) {
            return E = t, j = setTimeout(h, e), M ? r(t) : w;
          }function l(t) {
            var n = t - O,
                r = t - E,
                i = e - n;return _ ? c(i, g - r) : i;
          }function d(t) {
            var n = t - O,
                r = t - E;return void 0 === O || n >= e || n < 0 || _ && r >= g;
          }function h() {
            var t = o();return d(t) ? p(t) : void (j = setTimeout(h, l(t)));
          }function p(t) {
            return j = void 0, T && x ? r(t) : (x = m = void 0, w);
          }function v() {
            void 0 !== j && clearTimeout(j), E = 0, x = O = m = j = void 0;
          }function y() {
            return void 0 === j ? w : p(o());
          }function b() {
            var t = o(),
                n = d(t);if (x = arguments, m = this, O = t, n) {
              if (void 0 === j) return a(O);if (_) return j = setTimeout(h, e), r(O);
            }return void 0 === j && (j = setTimeout(h, e)), w;
          }var x,
              m,
              g,
              w,
              j,
              O,
              E = 0,
              M = !1,
              _ = !1,
              T = !0;if ("function" != typeof t) throw new TypeError(f);return e = u(e) || 0, i(n) && (M = !!n.leading, _ = "maxWait" in n, g = _ ? s(u(n.maxWait) || 0, e) : g, T = "trailing" in n ? !!n.trailing : T), b.cancel = v, b.flush = y, b;
        }var i = n(1),
            o = n(8),
            u = n(10),
            f = "Expected a function",
            s = Math.max,
            c = Math.min;t.exports = r;
      }, function (t, e, n) {
        var r = n(6),
            i = function i() {
          return r.Date.now();
        };t.exports = i;
      }, function (t, e, n) {
        function r(t, e, n) {
          var r = !0,
              f = !0;if ("function" != typeof t) throw new TypeError(u);return o(n) && (r = "leading" in n ? !!n.leading : r, f = "trailing" in n ? !!n.trailing : f), i(t, e, { leading: r, maxWait: e, trailing: f });
        }var i = n(7),
            o = n(1),
            u = "Expected a function";t.exports = r;
      }, function (t, e) {
        function n(t) {
          return t;
        }t.exports = n;
      }]);
    });
  });

  var inView = unwrapExports(inView_min);
  var inView_min_1 = inView_min.inView;

  var bounty = createCommonjsModule(function (module, exports) {
    !function (t, e) {
      module.exports = e();
    }(commonjsGlobal, function () {
      return function (t) {
        function e(a) {
          if (r[a]) return r[a].exports;var n = r[a] = { exports: {}, id: a, loaded: !1 };return t[a].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports;
        }var r = {};return e.m = t, e.c = r, e.p = "/", e(0);
      }([function (t, e, r) {
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }Object.defineProperty(e, "__esModule", { value: !0 });var n = r(1);Object.defineProperty(e, "default", { enumerable: !0, get: function get() {
            return a(n).default;
          } });
      }, function (t, e, r) {
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }function n(t) {
          if (Array.isArray(t)) {
            for (var e = 0, r = Array(t.length); e < t.length; e++) {
              r[e] = t[e];
            }return r;
          }return Array.from(t);
        }Object.defineProperty(e, "__esModule", { value: !0 });var l = r(2),
            i = a(l),
            o = r(5),
            u = r(10),
            c = a(u),
            f = 10,
            d = 3,
            s = function s(t, e, r, a) {
          var n,
              l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
              i = (n = (n = o.append.call(t, "g"), o.attr).call(n, "id", "digit-" + a), o.style).call(n, "filter", "url(#motionFilter-" + a + ")");return l.forEach(function (t, a) {
            var n;(n = (n = o.append.call(i, "text"), o.attr).call(n, "y", -a * e * r), o.text).call(n, t);
          }), i;
        },
            p = function p(t, e, r) {
          var a;return (a = (a = o.append.call(t, "g"), o.append).call(a, "text"), o.text).call(a, e);
        },
            v = function v(t, e) {
          var r;return (r = (r = (r = (r = (r = (r = (r = o.append.call(t, "filter"), o.attr).call(r, "id", "motionFilter-" + e), o.attr).call(r, "width", "300%"), o.attr).call(r, "x", "-100%"), o.append).call(r, "feGaussianBlur"), o.attr).call(r, "class", "blurValues"), o.attr).call(r, "in", "SourceGraphic"), o.attr).call(r, "stdDeviation", "0 0");
        },
            y = function y(t, e) {
          var r;return (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = (r = o.append.call(t, "linearGradient"), o.attr).call(r, "id", "gradient-" + e), o.attr).call(r, "x1", "0%"), o.attr).call(r, "y1", "0%"), o.attr).call(r, "x2", "0%"), o.attr).call(r, "y2", "100%"), o.append).call(r, "stop"), o.attr).call(r, "offset", "0"), o.attr).call(r, "stop-color", "white"), o.attr).call(r, "stop-opacity", "0"), o.select).call(r, "#gradient-" + e), o.append).call(r, "stop"), o.attr).call(r, "offset", "0.2"), o.attr).call(r, "stop-color", "white"), o.attr).call(r, "stop-opacity", "1"), o.select).call(r, "#gradient-" + e), o.append).call(r, "stop"), o.attr).call(r, "offset", "0.8"), o.attr).call(r, "stop-color", "white"), o.attr).call(r, "stop-opacity", "1"), o.select).call(r, "#gradient-" + e), o.append).call(r, "stop"), o.attr).call(r, "offset", "1"), o.attr).call(r, "stop-color", "white"), o.attr).call(r, "stop-opacity", "0");
        },
            h = function h(t, e) {
          var r;return (r = (r = (r = (r = (r = (r = (r = o.append.call(t, "mask"), o.attr).call(r, "id", "mask-" + e), o.append).call(r, "rect"), o.attr).call(r, "x", 0), o.attr).call(r, "y", 0), o.attr).call(r, "width", "100%"), o.attr).call(r, "height", "100%"), o.attr).call(r, "fill", "url(#gradient-" + e + ")");
        },
            g = function g(t, e, r) {
          o.attr.call(t, "width", e), o.attr.call(t, "height", r), o.attr.call(t, "viewBox", "0 0 " + e + " " + r), o.style.call(t, "overflow", "hidden");
        };e.default = function (t) {
          var e,
              r = t.el,
              a = t.value,
              l = t.initialValue,
              u = void 0 === l ? null : l,
              b = t.lineHeight,
              m = void 0 === b ? 1.35 : b,
              x = t.letterSpacing,
              _ = void 0 === x ? 1 : x,
              M = t.animationDelay,
              j = void 0 === M ? 100 : M,
              w = t.letterAnimationDelay,
              P = void 0 === w ? 100 : w,
              O = (0, o.select)(r),
              N = window.getComputedStyle(O),
              S = parseInt(N.fontSize, 10),
              A = (S * m - S) / 2 + S / 10,
              D = S * m - A,
              E = Date.now(),
              B = 0,
              F = S * m + A;O.innerHTML = "";var k = o.append.call(O, "svg"),
              I = (e = o.append.call(k, "svg"), o.attr).call(e, "mask", "url(#mask-" + E + ")"),
              C = o.append.call(k, "defs");y(C, E), h(C, E);var G = function G(t, e) {
            for (var r = String(t).replace(/ /g, " ").split(""), a = String(t).search(/\d/); e.length > r.length;) {
              var n = e[e.length - r.length - 1 + a];r.splice(a, 0, isNaN(parseInt(n, 10)) ? n : "0");
            }return r;
          },
              q = String(u || "0"),
              H = G(String(a), q),
              V = G(q, String(a)),
              z = H.map(function (t, e) {
            var r = e + "-" + E;return isNaN(parseInt(t, 10)) || isNaN(parseInt(V[e], 10)) ? { isDigit: !1, node: p(I, t, S), value: t, offset: { x: 0, y: D } } : { isDigit: !0, id: r, node: s(I, S, m, r), filter: v(C, r), value: Number(t), initial: Number(V[e]), offset: { x: 0, y: D + Number(V[e]) * (S * m) } };
          }),
              L = [],
              T = z.filter(function (t) {
            return t.isDigit;
          });T.forEach(function (t, e) {
            var r = t.initial * (S * m),
                a = (d * f + t.value) * (S * m),
                n = (0, c.default)({ from: r, to: a, delay: (T.length - 1 - e) * P + j, step: function step(e) {
                var n;t.offset.y = D + e % (S * m * f), (n = t.node, o.attr).call(n, "transform", "translate(" + t.offset.x + ", " + t.offset.y + ")");var l = (r + a) / 2,
                    i = Number(Math.abs(Math.abs(Math.abs(e - l) - l) - r) / 100).toFixed(1);(n = t.filter, o.attr).call(n, "stdDeviation", "0 " + i);
              }, end: 0 === e ? function () {
                return K();
              } : function (t) {
                return t;
              } });L.push(n);
          });var J = function J(t) {
            B = 0, z.forEach(function (t) {
              var e = t.node.getBBox(),
                  r = e.width;t.offset.x = B, t.isDigit && [].concat(n(t.node.childNodes)).forEach(function (t) {
                var e = t.getBBox(),
                    a = e.width,
                    n = (r - a) / 2;t.setAttribute("x", n);
              }), B += r + _;
            }), B -= _, z.forEach(function (t) {
              var e;(e = t.node, o.attr).call(e, "transform", "translate(" + t.offset.x + ", " + t.offset.y + ")");
            }), g(k, B, F), L.forEach(function (e) {
              return e.update(t);
            });
          },
              K = (0, i.default)(J);return K;
        };
      }, function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = function (t) {
          var e = void 0,
              r = function r(a) {
            e = requestAnimationFrame(r), t(a);
          };return r(0), function () {
            return cancelAnimationFrame(e);
          };
        };
      }, function (t, e, r) {
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }Object.defineProperty(e, "__esModule", { value: !0 }), e.default = function (t) {
          var e = document.createElementNS(l.default.svg, t);return this.appendChild(e), e;
        };var n = r(6),
            l = a(n);
      }, function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = function (t, e) {
          return this.setAttribute(t, e), this;
        };
      }, function (t, e, r) {
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }Object.defineProperty(e, "__esModule", { value: !0 });var n = r(7);Object.defineProperty(e, "select", { enumerable: !0, get: function get() {
            return a(n).default;
          } });var l = r(3);Object.defineProperty(e, "append", { enumerable: !0, get: function get() {
            return a(l).default;
          } });var i = r(4);Object.defineProperty(e, "attr", { enumerable: !0, get: function get() {
            return a(i).default;
          } });var o = r(8);Object.defineProperty(e, "style", { enumerable: !0, get: function get() {
            return a(o).default;
          } });var u = r(9);Object.defineProperty(e, "text", { enumerable: !0, get: function get() {
            return a(u).default;
          } });
      }, function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { svg: "http://www.w3.org/2000/svg" };
      }, function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = function (t) {
          return t === String(t) ? document.querySelector(t) : t;
        };
      }, function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = function (t, e) {
          var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";return this.style.setProperty(t, e, r), this;
        };
      }, function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = function (t) {
          return this.textContent = t, this;
        };
      }, function (t, e) {
        Object.defineProperty(e, "__esModule", { value: !0 });var r = function r(t) {
          return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
        };e.default = function (t) {
          var e = t.from,
              a = t.to,
              n = t.duration,
              l = void 0 === n ? 3e3 : n,
              i = t.delay,
              o = void 0 === i ? 0 : i,
              u = t.easing,
              c = void 0 === u ? r : u,
              f = t.start,
              d = void 0 === f ? function (t) {
            return t;
          } : f,
              s = t.step,
              p = void 0 === s ? function (t) {
            return t;
          } : s,
              v = t.end,
              y = void 0 === v ? function (t) {
            return t;
          } : v,
              h = e,
              g = 0,
              b = !1,
              m = function m(t) {
            if (!b) {
              g || (g = t, d(h));var r = Math.min(Math.max(t - g - o, 0), l) / l;h = c(r) * (a - e) + e, p(h), 1 === r && (b = !0, y(h));
            }
          };return { update: m };
        };
      }]);
    });
  });

  var bounty$1 = unwrapExports(bounty);
  var bounty_1 = bounty.bounty;

  var swipe = createCommonjsModule(function (module) {
  (function (root, factory) {
      // eslint-disable-next-line no-undef
      if (module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
      } else {
        // Browser globals
        root.Swipe = factory();
      }
    })(commonjsGlobal, function () {
      // Establish the root object, `window` (`self`) in the browser, `global`
      // on the server, or `this` in some virtual machines. We use `self`
      // instead of `window` for `WebWorker` support.
      var root = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self.self === self && self || _typeof(commonjsGlobal) == 'object' && commonjsGlobal.global === commonjsGlobal && commonjsGlobal || this;

      var _document = root.document;

      function Swipe(container, options) {

        options = options || {};

        // setup initial vars
        var _start = {};
        var delta = {};
        var isScrolling;

        // setup auto slideshow
        var delay = options.auto || 0;
        var interval;

        var disabled = false;

        // utilities
        // simple no operation function
        var noop = function noop() {};
        // offload a functions execution
        var offloadFn = function offloadFn(fn) {
          setTimeout(fn || noop, 0);
        };
        // Returns a function, that, as long as it continues to be invoked, will not
        // be triggered.
        var throttle = function throttle(fn, threshhold) {
          threshhold = threshhold || 100;
          var timeout = null;

          function cancel() {
            if (timeout) clearTimeout(timeout);
          }

          function throttledFn() {
            var context = this;
            var args = arguments;
            cancel();
            timeout = setTimeout(function () {
              timeout = null;
              fn.apply(context, args);
            }, threshhold);
          }

          // allow remove throttled timeout
          throttledFn.cancel = cancel;

          return throttledFn;
        };

        // check browser capabilities
        var browser = {
          addEventListener: !!root.addEventListener,
          // eslint-disable-next-line no-undef
          touch: 'ontouchstart' in root || root.DocumentTouch && _document instanceof DocumentTouch,
          transitions: function (temp) {
            var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
            for (var i in props) {
              if (temp.style[props[i]] !== undefined) {
                return true;
              }
            }
            return false;
          }(_document.createElement('swipe'))
        };

        // quit if no root element
        if (!container) return;

        var element = container.children[0];
        var slides, slidePos, width, length;
        var index = parseInt(options.startSlide, 10) || 0;
        var speed = options.speed || 300;
        options.continuous = options.continuous !== undefined ? options.continuous : true;

        // AutoRestart option: auto restart slideshow after user's touch event
        options.autoRestart = options.autoRestart !== undefined ? options.autoRestart : false;

        // throttled setup
        var throttledSetup = throttle(setup);

        // setup event capturing
        var events = {

          handleEvent: function handleEvent(event) {
            if (disabled) return;

            switch (event.type) {
              case 'mousedown':
              case 'touchstart':
                this.start(event);break;
              case 'mousemove':
              case 'touchmove':
                this.move(event);break;
              case 'mouseup':
              case 'mouseleave':
              case 'touchend':
                this.end(event);break;
              case 'webkitTransitionEnd':
              case 'msTransitionEnd':
              case 'oTransitionEnd':
              case 'otransitionend':
              case 'transitionend':
                this.transitionEnd(event);break;
              case 'resize':
                throttledSetup();break;
            }

            if (options.stopPropagation) {
              event.stopPropagation();
            }
          },

          start: function start(event) {
            var touches;

            if (isMouseEvent(event)) {
              touches = event;
              event.preventDefault(); // For desktop Safari drag
            } else {
              touches = event.touches[0];
            }

            // measure start values
            _start = {

              // get initial touch coords
              x: touches.pageX,
              y: touches.pageY,

              // store time to determine touch duration
              time: +new Date()

            };

            // used for testing first move event
            isScrolling = undefined;

            // reset delta and end measurements
            delta = {};

            // attach touchmove and touchend listeners
            if (isMouseEvent(event)) {
              element.addEventListener('mousemove', this, false);
              element.addEventListener('mouseup', this, false);
              element.addEventListener('mouseleave', this, false);
            } else {
              element.addEventListener('touchmove', this, false);
              element.addEventListener('touchend', this, false);
            }
          },

          move: function move(event) {
            var touches;

            if (isMouseEvent(event)) {
              touches = event;
            } else {
              // ensure swiping with one touch and not pinching
              if (event.touches.length > 1 || event.scale && event.scale !== 1) {
                return;
              }

              if (options.disableScroll) {
                event.preventDefault();
              }

              touches = event.touches[0];
            }

            // measure change in x and y
            delta = {
              x: touches.pageX - _start.x,
              y: touches.pageY - _start.y
            };

            // determine if scrolling test has run - one time test
            if (typeof isScrolling === 'undefined') {
              isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
            }

            // if user is not trying to scroll vertically
            if (!isScrolling) {

              // prevent native scrolling
              event.preventDefault();

              // stop slideshow
              stop();

              // increase resistance if first or last slide
              if (options.continuous) {
                // we don't add resistance at the end

                translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);
                translate(index, delta.x + slidePos[index], 0);
                translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0);
              } else {

                delta.x = delta.x / (!index && delta.x > 0 || // if first slide and sliding left
                index === slides.length - 1 && // or if last slide and sliding right
                delta.x < 0 // and if sliding at all
                ? Math.abs(delta.x) / width + 1 : // determine resistance level
                1); // no resistance if false

                // translate 1:1
                translate(index - 1, delta.x + slidePos[index - 1], 0);
                translate(index, delta.x + slidePos[index], 0);
                translate(index + 1, delta.x + slidePos[index + 1], 0);
              }
            }
          },

          end: function end(event) {

            // measure duration
            var duration = +new Date() - _start.time;

            // determine if slide attempt triggers next/prev slide
            var isValidSlide = Number(duration) < 250 && // if slide duration is less than 250ms
            Math.abs(delta.x) > 20 || // and if slide amt is greater than 20px
            Math.abs(delta.x) > width / 2; // or if slide amt is greater than half the width

            // determine if slide attempt is past start and end
            var isPastBounds = !index && delta.x > 0 || // if first slide and slide amt is greater than 0
            index === slides.length - 1 && delta.x < 0; // or if last slide and slide amt is less than 0

            if (options.continuous) {
              isPastBounds = false;
            }

            // OLD determine direction of swipe (true:right, false:left)
            // determine direction of swipe (1: backward, -1: forward)
            var direction = Math.abs(delta.x) / delta.x;

            // if not scrolling vertically
            if (!isScrolling) {

              if (isValidSlide && !isPastBounds) {

                // if we're moving right
                if (direction < 0) {

                  if (options.continuous) {
                    // we need to get the next in this direction in place

                    move(circle(index - 1), -width, 0);
                    move(circle(index + 2), width, 0);
                  } else {
                    move(index - 1, -width, 0);
                  }

                  move(index, slidePos[index] - width, speed);
                  move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);
                  index = circle(index + 1);
                } else {
                  if (options.continuous) {
                    // we need to get the next in this direction in place

                    move(circle(index + 1), width, 0);
                    move(circle(index - 2), -width, 0);
                  } else {
                    move(index + 1, width, 0);
                  }

                  move(index, slidePos[index] + width, speed);
                  move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);
                  index = circle(index - 1);
                }

                runCallback(getPos(), slides[index], direction);
              } else {

                if (options.continuous) {

                  move(circle(index - 1), -width, speed);
                  move(index, 0, speed);
                  move(circle(index + 1), width, speed);
                } else {

                  move(index - 1, -width, speed);
                  move(index, 0, speed);
                  move(index + 1, width, speed);
                }
              }
            }

            // kill touchmove and touchend event listeners until touchstart called again
            if (isMouseEvent(event)) {
              element.removeEventListener('mousemove', events, false);
              element.removeEventListener('mouseup', events, false);
              element.removeEventListener('mouseleave', events, false);
            } else {
              element.removeEventListener('touchmove', events, false);
              element.removeEventListener('touchend', events, false);
            }
          },

          transitionEnd: function transitionEnd(event) {
            var currentIndex = parseInt(event.target.getAttribute('data-index'), 10);
            if (currentIndex === index) {
              if (delay || options.autoRestart) restart();

              runTransitionEnd(getPos(), slides[index]);
            }
          }
        };

        // trigger setup
        setup();

        // start auto slideshow if applicable
        begin();

        // Expose the Swipe API
        return {
          // initialize
          setup: setup,

          // go to slide
          slide: function slide(to, speed) {
            stop();
            _slide(to, speed);
          },

          // move to previous
          prev: function prev() {
            stop();
            _prev();
          },

          // move to next
          next: function next() {
            stop();
            _next();
          },

          // Restart slideshow
          restart: restart,

          // cancel slideshow
          stop: stop,

          // return current index position
          getPos: getPos,

          // disable slideshow
          disable: disable,

          // enable slideshow
          enable: enable,

          // return total number of slides
          getNumSlides: function getNumSlides() {
            return length;
          },

          // completely remove swipe
          kill: kill
        };

        // remove all event listeners
        function detachEvents() {
          if (browser.addEventListener) {
            // remove current event listeners
            element.removeEventListener('touchstart', events, false);
            element.removeEventListener('mousedown', events, false);
            element.removeEventListener('webkitTransitionEnd', events, false);
            element.removeEventListener('msTransitionEnd', events, false);
            element.removeEventListener('oTransitionEnd', events, false);
            element.removeEventListener('otransitionend', events, false);
            element.removeEventListener('transitionend', events, false);
            root.removeEventListener('resize', events, false);
          } else {
            root.onresize = null;
          }
        }

        // add event listeners
        function attachEvents() {
          if (browser.addEventListener) {

            // set touchstart event on element
            if (browser.touch) {
              element.addEventListener('touchstart', events, false);
            }

            if (options.draggable) {
              element.addEventListener('mousedown', events, false);
            }

            if (browser.transitions) {
              element.addEventListener('webkitTransitionEnd', events, false);
              element.addEventListener('msTransitionEnd', events, false);
              element.addEventListener('oTransitionEnd', events, false);
              element.addEventListener('otransitionend', events, false);
              element.addEventListener('transitionend', events, false);
            }

            // set resize event on window
            root.addEventListener('resize', events, false);
          } else {
            root.onresize = throttledSetup; // to play nice with old IE
          }
        }

        // clone nodes when there is only two slides
        function cloneNode(el) {
          var clone = el.cloneNode(true);
          element.appendChild(clone);

          // tag these slides as clones (to remove them on kill)
          clone.setAttribute('data-cloned', true);

          // Remove id from element
          clone.removeAttribute('id');
        }

        function setup(opts) {
          // Overwrite options if necessary
          if (opts != null) {
            for (var prop in opts) {
              options[prop] = opts[prop];
            }
          }

          // cache slides
          slides = element.children;
          length = slides.length;

          // slides length correction, minus cloned slides
          for (var i = 0; i < slides.length; i++) {
            if (slides[i].getAttribute('data-cloned')) length--;
          }

          // set continuous to false if only one slide
          if (slides.length < 2) {
            options.continuous = false;
          }

          // special case if two slides
          if (browser.transitions && options.continuous && slides.length < 3) {
            cloneNode(slides[0]);
            cloneNode(slides[1]);

            slides = element.children;
          }

          // create an array to store current positions of each slide
          slidePos = new Array(slides.length);

          // determine width of each slide
          width = container.getBoundingClientRect().width || container.offsetWidth;

          element.style.width = slides.length * width * 2 + 'px';

          // stack elements
          var pos = slides.length;
          while (pos--) {
            var slide = slides[pos];

            slide.style.width = width + 'px';
            slide.setAttribute('data-index', pos);

            if (browser.transitions) {
              slide.style.left = pos * -width + 'px';
              move(pos, index > pos ? -width : index < pos ? width : 0, 0);
            }
          }

          // reposition elements before and after index
          if (options.continuous && browser.transitions) {
            move(circle(index - 1), -width, 0);
            move(circle(index + 1), width, 0);
          }

          if (!browser.transitions) {
            element.style.left = index * -width + 'px';
          }

          container.style.visibility = 'visible';

          // reinitialize events
          detachEvents();
          attachEvents();
        }

        function _prev() {
          if (disabled) return;

          if (options.continuous) {
            _slide(index - 1);
          } else if (index) {
            _slide(index - 1);
          }
        }

        function _next() {
          if (disabled) return;

          if (options.continuous) {
            _slide(index + 1);
          } else if (index < slides.length - 1) {
            _slide(index + 1);
          }
        }

        function runCallback(pos, index, dir) {
          if (options.callback) {
            options.callback(pos, index, dir);
          }
        }

        function runTransitionEnd(pos, index) {
          if (options.transitionEnd) {
            options.transitionEnd(pos, index);
          }
        }

        function circle(index) {

          // a simple positive modulo using slides.length
          return (slides.length + index % slides.length) % slides.length;
        }

        function getPos() {
          // Fix for the clone issue in the event of 2 slides
          var currentIndex = index;

          if (currentIndex >= length) {
            currentIndex = currentIndex - length;
          }

          return currentIndex;
        }

        function _slide(to, slideSpeed) {

          // ensure to is of type 'number'
          to = typeof to !== 'number' ? parseInt(to, 10) : to;

          // do nothing if already on requested slide
          if (index === to) return;

          if (browser.transitions) {

            var direction = Math.abs(index - to) / (index - to); // 1: backward, -1: forward

            // get the actual position of the slide
            if (options.continuous) {
              var natural_direction = direction;
              direction = -slidePos[circle(to)] / width;

              // if going forward but to < index, use to = slides.length + to
              // if going backward but to > index, use to = -slides.length + to
              if (direction !== natural_direction) {
                to = -direction * slides.length + to;
              }
            }

            var diff = Math.abs(index - to) - 1;

            // move all the slides between index and to in the right direction
            while (diff--) {
              move(circle((to > index ? to : index) - diff - 1), width * direction, 0);
            }

            to = circle(to);

            move(index, width * direction, slideSpeed || speed);
            move(to, 0, slideSpeed || speed);

            if (options.continuous) {
              // we need to get the next in place
              move(circle(to - direction), -(width * direction), 0);
            }
          } else {

            to = circle(to);
            animate(index * -width, to * -width, slideSpeed || speed);
            // no fallback for a circular continuous if the browser does not accept transitions
          }

          index = to;
          offloadFn(function () {
            runCallback(getPos(), slides[index], direction);
          });
        }

        function move(index, dist, speed) {
          translate(index, dist, speed);
          slidePos[index] = dist;
        }

        function translate(index, dist, speed) {

          var slide = slides[index];
          var style = slide && slide.style;

          if (!style) return;

          style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + 'ms';

          style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
          style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + dist + 'px)';
        }

        function animate(from, to, speed) {

          // if not an animation, just reposition
          if (!speed) {
            element.style.left = to + 'px';
            return;
          }

          var start = +new Date();

          var timer = setInterval(function () {
            var timeElap = +new Date() - start;

            if (timeElap > speed) {

              element.style.left = to + 'px';

              if (delay || options.autoRestart) restart();

              runTransitionEnd(getPos(), slides[index]);

              clearInterval(timer);

              return;
            }

            element.style.left = (to - from) * (Math.floor(timeElap / speed * 100) / 100) + from + 'px';
          }, 4);
        }

        function begin() {
          delay = options.auto || 0;
          if (delay) interval = setTimeout(_next, delay);
        }

        function stop() {
          delay = 0;
          clearTimeout(interval);
        }

        function restart() {
          stop();
          begin();
        }

        function disable() {
          stop();
          disabled = true;
        }

        function enable() {
          disabled = false;
          restart();
        }

        function isMouseEvent(e) {
          return (/^mouse/.test(e.type)
          );
        }

        function kill() {
          // cancel slideshow
          stop();

          // remove inline styles
          container.style.visibility = '';

          // reset element
          element.style.width = '';
          element.style.left = '';

          // reset slides
          var pos = slides.length;
          while (pos--) {

            if (browser.transitions) {
              translate(pos, 0, 0);
            }

            var slide = slides[pos];

            // if the slide is tagged as clone, remove it
            if (slide.getAttribute('data-cloned')) {
              var _parent = slide.parentElement;
              _parent.removeChild(slide);
            }

            // remove styles
            slide.style.width = '';
            slide.style.left = '';

            slide.style.webkitTransitionDuration = slide.style.MozTransitionDuration = slide.style.msTransitionDuration = slide.style.OTransitionDuration = slide.style.transitionDuration = '';

            slide.style.webkitTransform = slide.style.msTransform = slide.style.MozTransform = slide.style.OTransform = '';

            // remove custom attributes (?)
            // slide.removeAttribute('data-index');
          }

          // remove all events
          detachEvents();

          // remove throttled function timeout
          throttledSetup.cancel();
        }
      }

      if (root.jQuery || root.Zepto) {
        (function ($) {
          $.fn.Swipe = function (params) {
            return this.each(function () {
              $(this).data('Swipe', new Swipe($(this)[0], params));
            });
          };
        })(root.jQuery || root.Zepto);
      }

      return Swipe;
    });
  });

  // Aos初始化
  // https://github.com/michalsnik/aos
  // ******************************
  aos.init();

  var counter = document.querySelector('#weekGlobalTimes > .report-value');
  var number = 0;

  counter.addEventListener("DOMNodeInserted", function (e) {
    number = counter.innerHTML.split(' ')[0];
  });

  inView('.number-flip').on('enter', function (el) {
    bounty$1({
      el: el,
      initialValue: '0',
      value: '\u672C\u5468\u6709 ' + number + ' \u76D8\u6BD4\u8D5B\u88AB\u8BB0\u5F55',
      lineHeight: 1
    });
  });

  document.getElementById('events').addEventListener("DOMNodeInserted", function (e) {

    window.mySwipe = new swipe(document.getElementById('slider'), {
      startSlide: 0,
      speed: 400,
      auto: 3000,
      draggable: true,
      continuous: true,
      disableScroll: false,
      stopPropagation: false,
      callback: function callback(index, elem, dir) {},
      transitionEnd: function transitionEnd(index, elem) {}
    });
  }, false);

  var navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', winScroll);

  function winScroll(e) {
    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    navbar.classList.toggle('sticky', sTop > 50);
  }

  winScroll();

  var dataSwitch = document.querySelector('#switchData');
  var dataSwitchStatus = true;

  var heroTitle = document.querySelector('#heroTitle');

  dataSwitch.addEventListener('click', function (el) {
    dataSwitchStatus ? dataSwitch.innerHTML = '查看全球战报' : dataSwitch.innerHTML = '查看我的战绩';
    dataSwitchStatus ? heroTitle.innerHTML = '全球战报' : heroTitle.innerHTML = '我的战绩';
    dataSwitchStatus = !dataSwitchStatus;
    document.querySelector('.h-report').classList.toggle('global', !dataSwitchStatus);
    aos.refresh();
  });

})));
