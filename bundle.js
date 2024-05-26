(() => {
  // node_modules/tslib/tslib.es6.mjs
  var extendStatics = function(d3, b3) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b4) {
      d4.__proto__ = b4;
    } || function(d4, b4) {
      for (var p4 in b4)
        if (Object.prototype.hasOwnProperty.call(b4, p4))
          d4[p4] = b4[p4];
    };
    return extendStatics(d3, b3);
  };
  function __extends(d3, b3) {
    if (typeof b3 !== "function" && b3 !== null)
      throw new TypeError("Class extends value " + String(b3) + " is not a constructor or null");
    extendStatics(d3, b3);
    function __() {
      this.constructor = d3;
    }
    d3.prototype = b3 === null ? Object.create(b3) : (__.prototype = b3.prototype, new __());
  }
  function __awaiter(thisArg, _arguments, P3, generator) {
    function adopt(value) {
      return value instanceof P3 ? value : new P3(function(resolve) {
        resolve(value);
      });
    }
    return new (P3 || (P3 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e4) {
          reject(e4);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e4) {
          reject(e4);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _3 = { label: 0, sent: function() {
      if (t5[0] & 1)
        throw t5[1];
      return t5[1];
    }, trys: [], ops: [] }, f3, y3, t5, g2;
    return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
      return this;
    }), g2;
    function verb(n4) {
      return function(v3) {
        return step([n4, v3]);
      };
    }
    function step(op) {
      if (f3)
        throw new TypeError("Generator is already executing.");
      while (g2 && (g2 = 0, op[0] && (_3 = 0)), _3)
        try {
          if (f3 = 1, y3 && (t5 = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t5 = y3["return"]) && t5.call(y3), 0) : y3.next) && !(t5 = t5.call(y3, op[1])).done)
            return t5;
          if (y3 = 0, t5)
            op = [op[0] & 2, t5.value];
          switch (op[0]) {
            case 0:
            case 1:
              t5 = op;
              break;
            case 4:
              _3.label++;
              return { value: op[1], done: false };
            case 5:
              _3.label++;
              y3 = op[1];
              op = [0];
              continue;
            case 7:
              op = _3.ops.pop();
              _3.trys.pop();
              continue;
            default:
              if (!(t5 = _3.trys, t5 = t5.length > 0 && t5[t5.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _3 = 0;
                continue;
              }
              if (op[0] === 3 && (!t5 || op[1] > t5[0] && op[1] < t5[3])) {
                _3.label = op[1];
                break;
              }
              if (op[0] === 6 && _3.label < t5[1]) {
                _3.label = t5[1];
                t5 = op;
                break;
              }
              if (t5 && _3.label < t5[2]) {
                _3.label = t5[2];
                _3.ops.push(op);
                break;
              }
              if (t5[2])
                _3.ops.pop();
              _3.trys.pop();
              continue;
          }
          op = body.call(thisArg, _3);
        } catch (e4) {
          op = [6, e4];
          y3 = 0;
        } finally {
          f3 = t5 = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o4) {
    var s4 = typeof Symbol === "function" && Symbol.iterator, m3 = s4 && o4[s4], i4 = 0;
    if (m3)
      return m3.call(o4);
    if (o4 && typeof o4.length === "number")
      return {
        next: function() {
          if (o4 && i4 >= o4.length)
            o4 = void 0;
          return { value: o4 && o4[i4++], done: !o4 };
        }
      };
    throw new TypeError(s4 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o4, n4) {
    var m3 = typeof Symbol === "function" && o4[Symbol.iterator];
    if (!m3)
      return o4;
    var i4 = m3.call(o4), r3, ar = [], e4;
    try {
      while ((n4 === void 0 || n4-- > 0) && !(r3 = i4.next()).done)
        ar.push(r3.value);
    } catch (error) {
      e4 = { error };
    } finally {
      try {
        if (r3 && !r3.done && (m3 = i4["return"]))
          m3.call(i4);
      } finally {
        if (e4)
          throw e4.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i4 = 0, l4 = from2.length, ar; i4 < l4; i4++) {
        if (ar || !(i4 in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i4);
          ar[i4] = from2[i4];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }
  function __await(v3) {
    return this instanceof __await ? (this.v = v3, this) : new __await(v3);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g2 = generator.apply(thisArg, _arguments || []), i4, q3 = [];
    return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
      return this;
    }, i4;
    function verb(n4) {
      if (g2[n4])
        i4[n4] = function(v3) {
          return new Promise(function(a4, b3) {
            q3.push([n4, v3, a4, b3]) > 1 || resume(n4, v3);
          });
        };
    }
    function resume(n4, v3) {
      try {
        step(g2[n4](v3));
      } catch (e4) {
        settle(q3[0][3], e4);
      }
    }
    function step(r3) {
      r3.value instanceof __await ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q3[0][2], r3);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f3, v3) {
      if (f3(v3), q3.shift(), q3.length)
        resume(q3[0][0], q3[0][1]);
    }
  }
  function __asyncValues(o4) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m3 = o4[Symbol.asyncIterator], i4;
    return m3 ? m3.call(o4) : (o4 = typeof __values === "function" ? __values(o4) : o4[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
      return this;
    }, i4);
    function verb(n4) {
      i4[n4] = o4[n4] && function(v3) {
        return new Promise(function(resolve, reject) {
          v3 = o4[n4](v3), settle(resolve, reject, v3.done, v3.value);
        });
      };
    }
    function settle(resolve, reject, d3, v3) {
      Promise.resolve(v3).then(function(v4) {
        resolve({ value: v4, done: d3 });
      }, reject);
    }
  }

  // node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction(value) {
    return typeof value === "function";
  }

  // node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i4) {
        return i4 + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });

  // node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription = function() {
    function Subscription6(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription6.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e4) {
            errors = e4 instanceof UnsubscriptionError ? e4.errors : [e4];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription6.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription6) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription6.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription6.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription6.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription6.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription6) {
        teardown._removeParent(this);
      }
    };
    Subscription6.EMPTY = function() {
      var empty = new Subscription6();
      empty.closed = true;
      return empty;
    }();
    return Subscription6;
  }();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // node_modules/rxjs/dist/esm5/internal/config.js
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      var onUnhandledError = config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop() {
  }

  // node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION = function() {
    return createNotification("C", void 0, void 0);
  }();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context = null;
  function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber = function(_super) {
    __extends(Subscriber3, _super);
    function Subscriber3(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber3.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber3.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber3.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber3.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber3.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber3.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber3.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber3.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber3;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver3(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver3.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver3.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver3.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver3;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber3, _super);
    function SafeSubscriber3(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber3;
  }(Subscriber);
  function handleUnhandledError(error) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      captureError(error);
    } else {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };

  // node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();

  // node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity(x2) {
    return x2;
  }

  // node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  // node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable = function() {
    function Observable9(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable9.prototype.lift = function(operator) {
      var observable3 = new Observable9();
      observable3.source = this;
      observable3.operator = operator;
      return observable3;
    };
    Observable9.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable9.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable9.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable9.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable9.prototype[observable] = function() {
      return this;
    };
    Observable9.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable9.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x2) {
          return value = x2;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable9.create = function(subscribe) {
      return new Observable9(subscribe);
    };
    return Observable9;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }

  // node_modules/rxjs/dist/esm5/internal/util/lift.js
  function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }

  // node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber3, _super);
    function OperatorSubscriber3(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber3.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber3;
  }(Subscriber);

  // node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject = function(_super) {
    __extends(Subject3, _super);
    function Subject3() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject3.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject3.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject3.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject3.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject3.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject3.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject3.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject3.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject3.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject3.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    };
    Subject3.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject3.prototype.asObservable = function() {
      var observable3 = new Observable();
      observable3.source = this;
      return observable3;
    };
    Subject3.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject3;
  }(Observable);
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject3, _super);
    function AnonymousSubject3(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject3.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject3.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject3.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject3.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject3;
  }(Subject);

  // node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
  var isArrayLike = function(x2) {
    return x2 && typeof x2.length === "number" && typeof x2 !== "function";
  };

  // node_modules/rxjs/dist/esm5/internal/util/isPromise.js
  function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
  function isInteropObservable(input) {
    return isFunction(input[observable]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
  function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }

  // node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator = getSymbolIterator();

  // node_modules/rxjs/dist/esm5/internal/util/isIterable.js
  function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            if (false)
              return [3, 8];
            return [4, __await(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }

  // node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
  function innerFrom(input) {
    if (input instanceof Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike(input)) {
        return fromArrayLike(input);
      }
      if (isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function fromInteropObservable(obj) {
    return new Observable(function(subscriber) {
      var obs = obj[observable]();
      if (isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike(array) {
    return new Observable(function(subscriber) {
      for (var i4 = 0; i4 < array.length && !subscriber.closed; i4++) {
        subscriber.next(array[i4]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise) {
    return new Observable(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable(function(subscriber) {
      process(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
  var EmptyError = createErrorClass(function(_super) {
    return function EmptyErrorImpl() {
      _super(this);
      this.name = "EmptyError";
      this.message = "no elements in sequence";
    };
  });

  // node_modules/rxjs/dist/esm5/internal/firstValueFrom.js
  function firstValueFrom(source, config3) {
    var hasConfig = typeof config3 === "object";
    return new Promise(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          resolve(value);
          subscriber.unsubscribe();
        },
        error: reject,
        complete: function() {
          if (hasConfig) {
            resolve(config3.defaultValue);
          } else {
            reject(new EmptyError());
          }
        }
      });
      source.subscribe(subscriber);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/filter.js
  function filter(predicate, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return predicate.call(thisArg, value, index++) && subscriber.next(value);
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/share.js
  function share(options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.connector, connector = _a === void 0 ? function() {
      return new Subject();
    } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function(wrapperSource) {
      var connection;
      var resetConnection;
      var subject;
      var refCount = 0;
      var hasCompleted = false;
      var hasErrored = false;
      var cancelReset = function() {
        resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
        resetConnection = void 0;
      };
      var reset = function() {
        cancelReset();
        connection = subject = void 0;
        hasCompleted = hasErrored = false;
      };
      var resetAndUnsubscribe = function() {
        var conn = connection;
        reset();
        conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
      };
      return operate(function(source, subscriber) {
        refCount++;
        if (!hasErrored && !hasCompleted) {
          cancelReset();
        }
        var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
        subscriber.add(function() {
          refCount--;
          if (refCount === 0 && !hasErrored && !hasCompleted) {
            resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
          }
        });
        dest.subscribe(subscriber);
        if (!connection && refCount > 0) {
          connection = new SafeSubscriber({
            next: function(value) {
              return dest.next(value);
            },
            error: function(err) {
              hasErrored = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnError, err);
              dest.error(err);
            },
            complete: function() {
              hasCompleted = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnComplete);
              dest.complete();
            }
          });
          innerFrom(source).subscribe(connection);
        }
      })(wrapperSource);
    };
  }
  function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    if (on === true) {
      reset();
      return;
    }
    if (on === false) {
      return;
    }
    var onSubscriber = new SafeSubscriber({
      next: function() {
        onSubscriber.unsubscribe();
        reset();
      }
    });
    return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
  }

  // src/create-ws-client-connection.ts
  function* idGenerator() {
    while (true) {
      for (let id = 1; id < 99999999; id++) {
        yield id;
      }
    }
  }
  var idIterator = idGenerator();
  function createWsClientConnection(wsProtocol, wsPort, webDomain) {
    const showPort = wsProtocol === "ws" && wsPort != 80 || wsProtocol === "wss" && wsPort != 443;
    const wsUrl = `${wsProtocol}://${webDomain}${showPort ? ":" + wsPort : ""}/ws`;
    const socket = new WebSocket(wsUrl);
    const waitDisconnected = new Promise(function(resolve) {
      socket.onclose = () => resolve(void 0);
    });
    const waitConnected = new Promise(function(resolve, reject) {
      socket.onopen = () => resolve(void 0);
      waitDisconnected.finally(reject);
    });
    const messages$ = new Observable(function(subscriber) {
      socket.onmessage = function(event) {
        const deserialized = JSON.parse(event.data);
        subscriber.next(deserialized);
      };
      waitDisconnected.finally(() => subscriber.complete());
    }).pipe(share());
    let keepAliveInteval;
    waitConnected.then(function() {
      keepAliveInteval = setInterval(() => socket.send("KEEP_ALIVE"), 25e3);
      return waitDisconnected;
    }).finally(() => clearInterval(keepAliveInteval));
    return {
      id: idIterator.next().value,
      messages$,
      async send(message) {
        await waitConnected;
        const serialized = JSON.stringify(message);
        socket.send(serialized);
      }
    };
  }

  // ../core/node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var f;
  var e;
  var c;
  var s;
  var a;
  var h = {};
  var p = [];
  var v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var y = Array.isArray;
  function d(n4, l4) {
    for (var u4 in l4)
      n4[u4] = l4[u4];
    return n4;
  }
  function w(n4) {
    var l4 = n4.parentNode;
    l4 && l4.removeChild(n4);
  }
  function _(l4, u4, t5) {
    var i4, o4, r3, f3 = {};
    for (r3 in u4)
      "key" == r3 ? i4 = u4[r3] : "ref" == r3 ? o4 = u4[r3] : f3[r3] = u4[r3];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : t5), "function" == typeof l4 && null != l4.defaultProps)
      for (r3 in l4.defaultProps)
        void 0 === f3[r3] && (f3[r3] = l4.defaultProps[r3]);
    return g(l4, f3, i4, o4, null);
  }
  function g(n4, t5, i4, o4, r3) {
    var f3 = { type: n4, props: t5, key: i4, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r3 ? ++u : r3, __i: -1, __u: 0 };
    return null == r3 && null != l.vnode && l.vnode(f3), f3;
  }
  function k(n4) {
    return n4.children;
  }
  function b(n4, l4) {
    this.props = n4, this.context = l4;
  }
  function x(n4, l4) {
    if (null == l4)
      return n4.__ ? x(n4.__, n4.__i + 1) : null;
    for (var u4; l4 < n4.__k.length; l4++)
      if (null != (u4 = n4.__k[l4]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n4.type ? x(n4) : null;
  }
  function C(n4) {
    var l4, u4;
    if (null != (n4 = n4.__) && null != n4.__c) {
      for (n4.__e = n4.__c.base = null, l4 = 0; l4 < n4.__k.length; l4++)
        if (null != (u4 = n4.__k[l4]) && null != u4.__e) {
          n4.__e = n4.__c.base = u4.__e;
          break;
        }
      return C(n4);
    }
  }
  function M(n4) {
    (!n4.__d && (n4.__d = true) && i.push(n4) && !P.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(P);
  }
  function P() {
    var n4, u4, t5, o4, r3, e4, c4, s4;
    for (i.sort(f); n4 = i.shift(); )
      n4.__d && (u4 = i.length, o4 = void 0, e4 = (r3 = (t5 = n4).__v).__e, c4 = [], s4 = [], t5.__P && ((o4 = d({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(o4), O(t5.__P, o4, r3, t5.__n, t5.__P.namespaceURI, 32 & r3.__u ? [e4] : null, c4, null == e4 ? x(r3) : e4, !!(32 & r3.__u), s4), o4.__v = r3.__v, o4.__.__k[o4.__i] = o4, j(c4, o4, s4), o4.__e != e4 && C(o4)), i.length > u4 && i.sort(f));
    P.__r = 0;
  }
  function S(n4, l4, u4, t5, i4, o4, r3, f3, e4, c4, s4) {
    var a4, v3, y3, d3, w3, _3 = t5 && t5.__k || p, g2 = l4.length;
    for (u4.__d = e4, $(u4, l4, _3), e4 = u4.__d, a4 = 0; a4 < g2; a4++)
      null != (y3 = u4.__k[a4]) && "boolean" != typeof y3 && "function" != typeof y3 && (v3 = -1 === y3.__i ? h : _3[y3.__i] || h, y3.__i = a4, O(n4, y3, v3, i4, o4, r3, f3, e4, c4, s4), d3 = y3.__e, y3.ref && v3.ref != y3.ref && (v3.ref && N(v3.ref, null, y3), s4.push(y3.ref, y3.__c || d3, y3)), null == w3 && null != d3 && (w3 = d3), 65536 & y3.__u || v3.__k === y3.__k ? (e4 && !e4.isConnected && (e4 = x(v3)), e4 = I(y3, e4, n4)) : "function" == typeof y3.type && void 0 !== y3.__d ? e4 = y3.__d : d3 && (e4 = d3.nextSibling), y3.__d = void 0, y3.__u &= -196609);
    u4.__d = e4, u4.__e = w3;
  }
  function $(n4, l4, u4) {
    var t5, i4, o4, r3, f3, e4 = l4.length, c4 = u4.length, s4 = c4, a4 = 0;
    for (n4.__k = [], t5 = 0; t5 < e4; t5++)
      r3 = t5 + a4, null != (i4 = n4.__k[t5] = null == (i4 = l4[t5]) || "boolean" == typeof i4 || "function" == typeof i4 ? null : "string" == typeof i4 || "number" == typeof i4 || "bigint" == typeof i4 || i4.constructor == String ? g(null, i4, null, null, null) : y(i4) ? g(k, { children: i4 }, null, null, null) : void 0 === i4.constructor && i4.__b > 0 ? g(i4.type, i4.props, i4.key, i4.ref ? i4.ref : null, i4.__v) : i4) ? (i4.__ = n4, i4.__b = n4.__b + 1, f3 = L(i4, u4, r3, s4), i4.__i = f3, o4 = null, -1 !== f3 && (s4--, (o4 = u4[f3]) && (o4.__u |= 131072)), null == o4 || null === o4.__v ? (-1 == f3 && a4--, "function" != typeof i4.type && (i4.__u |= 65536)) : f3 !== r3 && (f3 === r3 + 1 ? a4++ : f3 > r3 ? s4 > e4 - r3 ? a4 += f3 - r3 : a4-- : f3 < r3 ? f3 == r3 - 1 && (a4 = f3 - r3) : a4 = 0, f3 !== t5 + a4 && (i4.__u |= 65536))) : (o4 = u4[r3]) && null == o4.key && o4.__e && 0 == (131072 & o4.__u) && (o4.__e == n4.__d && (n4.__d = x(o4)), V(o4, o4, false), u4[r3] = null, s4--);
    if (s4)
      for (t5 = 0; t5 < c4; t5++)
        null != (o4 = u4[t5]) && 0 == (131072 & o4.__u) && (o4.__e == n4.__d && (n4.__d = x(o4)), V(o4, o4));
  }
  function I(n4, l4, u4) {
    var t5, i4;
    if ("function" == typeof n4.type) {
      for (t5 = n4.__k, i4 = 0; t5 && i4 < t5.length; i4++)
        t5[i4] && (t5[i4].__ = n4, l4 = I(t5[i4], l4, u4));
      return l4;
    }
    n4.__e != l4 && (u4.insertBefore(n4.__e, l4 || null), l4 = n4.__e);
    do {
      l4 = l4 && l4.nextSibling;
    } while (null != l4 && 8 === l4.nodeType);
    return l4;
  }
  function L(n4, l4, u4, t5) {
    var i4 = n4.key, o4 = n4.type, r3 = u4 - 1, f3 = u4 + 1, e4 = l4[u4];
    if (null === e4 || e4 && i4 == e4.key && o4 === e4.type && 0 == (131072 & e4.__u))
      return u4;
    if (t5 > (null != e4 && 0 == (131072 & e4.__u) ? 1 : 0))
      for (; r3 >= 0 || f3 < l4.length; ) {
        if (r3 >= 0) {
          if ((e4 = l4[r3]) && 0 == (131072 & e4.__u) && i4 == e4.key && o4 === e4.type)
            return r3;
          r3--;
        }
        if (f3 < l4.length) {
          if ((e4 = l4[f3]) && 0 == (131072 & e4.__u) && i4 == e4.key && o4 === e4.type)
            return f3;
          f3++;
        }
      }
    return -1;
  }
  function T(n4, l4, u4) {
    "-" === l4[0] ? n4.setProperty(l4, null == u4 ? "" : u4) : n4[l4] = null == u4 ? "" : "number" != typeof u4 || v.test(l4) ? u4 : u4 + "px";
  }
  function A(n4, l4, u4, t5, i4) {
    var o4;
    n:
      if ("style" === l4)
        if ("string" == typeof u4)
          n4.style.cssText = u4;
        else {
          if ("string" == typeof t5 && (n4.style.cssText = t5 = ""), t5)
            for (l4 in t5)
              u4 && l4 in u4 || T(n4.style, l4, "");
          if (u4)
            for (l4 in u4)
              t5 && u4[l4] === t5[l4] || T(n4.style, l4, u4[l4]);
        }
      else if ("o" === l4[0] && "n" === l4[1])
        o4 = l4 !== (l4 = l4.replace(/(PointerCapture)$|Capture$/i, "$1")), l4 = l4.toLowerCase() in n4 || "onFocusOut" === l4 || "onFocusIn" === l4 ? l4.toLowerCase().slice(2) : l4.slice(2), n4.l || (n4.l = {}), n4.l[l4 + o4] = u4, u4 ? t5 ? u4.u = t5.u : (u4.u = e, n4.addEventListener(l4, o4 ? s : c, o4)) : n4.removeEventListener(l4, o4 ? s : c, o4);
      else {
        if ("http://www.w3.org/2000/svg" == i4)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" != l4 && "height" != l4 && "href" != l4 && "list" != l4 && "form" != l4 && "tabIndex" != l4 && "download" != l4 && "rowSpan" != l4 && "colSpan" != l4 && "role" != l4 && l4 in n4)
          try {
            n4[l4] = null == u4 ? "" : u4;
            break n;
          } catch (n5) {
          }
        "function" == typeof u4 || (null == u4 || false === u4 && "-" !== l4[4] ? n4.removeAttribute(l4) : n4.setAttribute(l4, u4));
      }
  }
  function F(n4) {
    return function(u4) {
      if (this.l) {
        var t5 = this.l[u4.type + n4];
        if (null == u4.t)
          u4.t = e++;
        else if (u4.t < t5.u)
          return;
        return t5(l.event ? l.event(u4) : u4);
      }
    };
  }
  function O(n4, u4, t5, i4, o4, r3, f3, e4, c4, s4) {
    var a4, h4, p4, v3, w3, _3, g2, m3, x2, C3, M2, P3, $2, I2, H, L2 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    128 & t5.__u && (c4 = !!(32 & t5.__u), r3 = [e4 = u4.__e = t5.__e]), (a4 = l.__b) && a4(u4);
    n:
      if ("function" == typeof L2)
        try {
          if (m3 = u4.props, x2 = (a4 = L2.contextType) && i4[a4.__c], C3 = a4 ? x2 ? x2.props.value : a4.__ : i4, t5.__c ? g2 = (h4 = u4.__c = t5.__c).__ = h4.__E : ("prototype" in L2 && L2.prototype.render ? u4.__c = h4 = new L2(m3, C3) : (u4.__c = h4 = new b(m3, C3), h4.constructor = L2, h4.render = q), x2 && x2.sub(h4), h4.props = m3, h4.state || (h4.state = {}), h4.context = C3, h4.__n = i4, p4 = h4.__d = true, h4.__h = [], h4._sb = []), null == h4.__s && (h4.__s = h4.state), null != L2.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = d({}, h4.__s)), d(h4.__s, L2.getDerivedStateFromProps(m3, h4.__s))), v3 = h4.props, w3 = h4.state, h4.__v = u4, p4)
            null == L2.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
          else {
            if (null == L2.getDerivedStateFromProps && m3 !== v3 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(m3, C3), !h4.__e && (null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(m3, h4.__s, C3) || u4.__v === t5.__v)) {
              for (u4.__v !== t5.__v && (h4.props = m3, h4.state = h4.__s, h4.__d = false), u4.__e = t5.__e, u4.__k = t5.__k, u4.__k.forEach(function(n5) {
                n5 && (n5.__ = u4);
              }), M2 = 0; M2 < h4._sb.length; M2++)
                h4.__h.push(h4._sb[M2]);
              h4._sb = [], h4.__h.length && f3.push(h4);
              break n;
            }
            null != h4.componentWillUpdate && h4.componentWillUpdate(m3, h4.__s, C3), null != h4.componentDidUpdate && h4.__h.push(function() {
              h4.componentDidUpdate(v3, w3, _3);
            });
          }
          if (h4.context = C3, h4.props = m3, h4.__P = n4, h4.__e = false, P3 = l.__r, $2 = 0, "prototype" in L2 && L2.prototype.render) {
            for (h4.state = h4.__s, h4.__d = false, P3 && P3(u4), a4 = h4.render(h4.props, h4.state, h4.context), I2 = 0; I2 < h4._sb.length; I2++)
              h4.__h.push(h4._sb[I2]);
            h4._sb = [];
          } else
            do {
              h4.__d = false, P3 && P3(u4), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
            } while (h4.__d && ++$2 < 25);
          h4.state = h4.__s, null != h4.getChildContext && (i4 = d(d({}, i4), h4.getChildContext())), p4 || null == h4.getSnapshotBeforeUpdate || (_3 = h4.getSnapshotBeforeUpdate(v3, w3)), S(n4, y(H = null != a4 && a4.type === k && null == a4.key ? a4.props.children : a4) ? H : [H], u4, t5, i4, o4, r3, f3, e4, c4, s4), h4.base = u4.__e, u4.__u &= -161, h4.__h.length && f3.push(h4), g2 && (h4.__E = h4.__ = null);
        } catch (n5) {
          u4.__v = null, c4 || null != r3 ? (u4.__e = e4, u4.__u |= c4 ? 160 : 32, r3[r3.indexOf(e4)] = null) : (u4.__e = t5.__e, u4.__k = t5.__k), l.__e(n5, u4, t5);
        }
      else
        null == r3 && u4.__v === t5.__v ? (u4.__k = t5.__k, u4.__e = t5.__e) : u4.__e = z(t5.__e, u4, t5, i4, o4, r3, f3, c4, s4);
    (a4 = l.diffed) && a4(u4);
  }
  function j(n4, u4, t5) {
    u4.__d = void 0;
    for (var i4 = 0; i4 < t5.length; i4++)
      N(t5[i4], t5[++i4], t5[++i4]);
    l.__c && l.__c(u4, n4), n4.some(function(u5) {
      try {
        n4 = u5.__h, u5.__h = [], n4.some(function(n5) {
          n5.call(u5);
        });
      } catch (n5) {
        l.__e(n5, u5.__v);
      }
    });
  }
  function z(l4, u4, t5, i4, o4, r3, f3, e4, c4) {
    var s4, a4, p4, v3, d3, _3, g2, m3 = t5.props, k3 = u4.props, b3 = u4.type;
    if ("svg" === b3 ? o4 = "http://www.w3.org/2000/svg" : "math" === b3 ? o4 = "http://www.w3.org/1998/Math/MathML" : o4 || (o4 = "http://www.w3.org/1999/xhtml"), null != r3) {
      for (s4 = 0; s4 < r3.length; s4++)
        if ((d3 = r3[s4]) && "setAttribute" in d3 == !!b3 && (b3 ? d3.localName === b3 : 3 === d3.nodeType)) {
          l4 = d3, r3[s4] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === b3)
        return document.createTextNode(k3);
      l4 = document.createElementNS(o4, b3, k3.is && k3), r3 = null, e4 = false;
    }
    if (null === b3)
      m3 === k3 || e4 && l4.data === k3 || (l4.data = k3);
    else {
      if (r3 = r3 && n.call(l4.childNodes), m3 = t5.props || h, !e4 && null != r3)
        for (m3 = {}, s4 = 0; s4 < l4.attributes.length; s4++)
          m3[(d3 = l4.attributes[s4]).name] = d3.value;
      for (s4 in m3)
        if (d3 = m3[s4], "children" == s4)
          ;
        else if ("dangerouslySetInnerHTML" == s4)
          p4 = d3;
        else if ("key" !== s4 && !(s4 in k3)) {
          if ("value" == s4 && "defaultValue" in k3 || "checked" == s4 && "defaultChecked" in k3)
            continue;
          A(l4, s4, null, d3, o4);
        }
      for (s4 in k3)
        d3 = k3[s4], "children" == s4 ? v3 = d3 : "dangerouslySetInnerHTML" == s4 ? a4 = d3 : "value" == s4 ? _3 = d3 : "checked" == s4 ? g2 = d3 : "key" === s4 || e4 && "function" != typeof d3 || m3[s4] === d3 || A(l4, s4, d3, m3[s4], o4);
      if (a4)
        e4 || p4 && (a4.__html === p4.__html || a4.__html === l4.innerHTML) || (l4.innerHTML = a4.__html), u4.__k = [];
      else if (p4 && (l4.innerHTML = ""), S(l4, y(v3) ? v3 : [v3], u4, t5, i4, "foreignObject" === b3 ? "http://www.w3.org/1999/xhtml" : o4, r3, f3, r3 ? r3[0] : t5.__k && x(t5, 0), e4, c4), null != r3)
        for (s4 = r3.length; s4--; )
          null != r3[s4] && w(r3[s4]);
      e4 || (s4 = "value", void 0 !== _3 && (_3 !== l4[s4] || "progress" === b3 && !_3 || "option" === b3 && _3 !== m3[s4]) && A(l4, s4, _3, m3[s4], o4), s4 = "checked", void 0 !== g2 && g2 !== l4[s4] && A(l4, s4, g2, m3[s4], o4));
    }
    return l4;
  }
  function N(n4, u4, t5) {
    try {
      "function" == typeof n4 ? n4(u4) : n4.current = u4;
    } catch (n5) {
      l.__e(n5, t5);
    }
  }
  function V(n4, u4, t5) {
    var i4, o4;
    if (l.unmount && l.unmount(n4), (i4 = n4.ref) && (i4.current && i4.current !== n4.__e || N(i4, null, u4)), null != (i4 = n4.__c)) {
      if (i4.componentWillUnmount)
        try {
          i4.componentWillUnmount();
        } catch (n5) {
          l.__e(n5, u4);
        }
      i4.base = i4.__P = null;
    }
    if (i4 = n4.__k)
      for (o4 = 0; o4 < i4.length; o4++)
        i4[o4] && V(i4[o4], u4, t5 || "function" != typeof n4.type);
    t5 || null == n4.__e || w(n4.__e), n4.__c = n4.__ = n4.__e = n4.__d = void 0;
  }
  function q(n4, l4, u4) {
    return this.constructor(n4, u4);
  }
  function B(u4, t5, i4) {
    var o4, r3, f3, e4;
    l.__ && l.__(u4, t5), r3 = (o4 = "function" == typeof i4) ? null : i4 && i4.__k || t5.__k, f3 = [], e4 = [], O(t5, u4 = (!o4 && i4 || t5).__k = _(k, null, [u4]), r3 || h, h, t5.namespaceURI, !o4 && i4 ? [i4] : r3 ? null : t5.firstChild ? n.call(t5.childNodes) : null, f3, !o4 && i4 ? i4 : r3 ? r3.__e : t5.firstChild, o4, e4), j(f3, u4, e4);
  }
  function G(n4, l4) {
    var u4 = { __c: l4 = "__cC" + a++, __: n4, Consumer: function(n5, l5) {
      return n5.children(l5);
    }, Provider: function(n5) {
      var u5, t5;
      return this.getChildContext || (u5 = [], (t5 = {})[l4] = this, this.getChildContext = function() {
        return t5;
      }, this.shouldComponentUpdate = function(n6) {
        this.props.value !== n6.value && u5.some(function(n7) {
          n7.__e = true, M(n7);
        });
      }, this.sub = function(n6) {
        u5.push(n6);
        var l5 = n6.componentWillUnmount;
        n6.componentWillUnmount = function() {
          u5.splice(u5.indexOf(n6), 1), l5 && l5.call(n6);
        };
      }), n5.children;
    } };
    return u4.Provider.__ = u4.Consumer.contextType = u4;
  }
  n = p.slice, l = { __e: function(n4, l4, u4, t5) {
    for (var i4, o4, r3; l4 = l4.__; )
      if ((i4 = l4.__c) && !i4.__)
        try {
          if ((o4 = i4.constructor) && null != o4.getDerivedStateFromError && (i4.setState(o4.getDerivedStateFromError(n4)), r3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n4, t5 || {}), r3 = i4.__d), r3)
            return i4.__E = i4;
        } catch (l5) {
          n4 = l5;
        }
    throw n4;
  } }, u = 0, t = function(n4) {
    return null != n4 && null == n4.constructor;
  }, b.prototype.setState = function(n4, l4) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n4 && (n4 = n4(d({}, u4), this.props)), n4 && d(u4, n4), null != n4 && this.__v && (l4 && this._sb.push(l4), M(this));
  }, b.prototype.forceUpdate = function(n4) {
    this.__v && (this.__e = true, n4 && this.__h.push(n4), M(this));
  }, b.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n4, l4) {
    return n4.__v.__b - l4.__v.__b;
  }, P.__r = 0, e = 0, c = F(false), s = F(true), a = 0;

  // ../core/node_modules/htm/dist/htm.module.js
  var n2 = function(t5, s4, r3, e4) {
    var u4;
    s4[0] = 0;
    for (var h4 = 1; h4 < s4.length; h4++) {
      var p4 = s4[h4++], a4 = s4[h4] ? (s4[0] |= p4 ? 1 : 2, r3[s4[h4++]]) : s4[++h4];
      3 === p4 ? e4[0] = a4 : 4 === p4 ? e4[1] = Object.assign(e4[1] || {}, a4) : 5 === p4 ? (e4[1] = e4[1] || {})[s4[++h4]] = a4 : 6 === p4 ? e4[1][s4[++h4]] += a4 + "" : p4 ? (u4 = t5.apply(a4, n2(t5, a4, r3, ["", null])), e4.push(u4), a4[0] ? s4[0] |= 2 : (s4[h4 - 2] = 0, s4[h4] = u4)) : e4.push(a4);
    }
    return e4;
  };
  var t2 = /* @__PURE__ */ new Map();
  function htm_module_default(s4) {
    var r3 = t2.get(this);
    return r3 || (r3 = /* @__PURE__ */ new Map(), t2.set(this, r3)), (r3 = n2(this, r3.get(s4) || (r3.set(s4, r3 = function(n4) {
      for (var t5, s5, r4 = 1, e4 = "", u4 = "", h4 = [0], p4 = function(n5) {
        1 === r4 && (n5 || (e4 = e4.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h4.push(0, n5, e4) : 3 === r4 && (n5 || e4) ? (h4.push(3, n5, e4), r4 = 2) : 2 === r4 && "..." === e4 && n5 ? h4.push(4, n5, 0) : 2 === r4 && e4 && !n5 ? h4.push(5, 0, true, e4) : r4 >= 5 && ((e4 || !n5 && 5 === r4) && (h4.push(r4, 0, e4, s5), r4 = 6), n5 && (h4.push(r4, n5, 0, s5), r4 = 6)), e4 = "";
      }, a4 = 0; a4 < n4.length; a4++) {
        a4 && (1 === r4 && p4(), p4(a4));
        for (var l4 = 0; l4 < n4[a4].length; l4++)
          t5 = n4[a4][l4], 1 === r4 ? "<" === t5 ? (p4(), h4 = [h4], r4 = 3) : e4 += t5 : 4 === r4 ? "--" === e4 && ">" === t5 ? (r4 = 1, e4 = "") : e4 = t5 + e4[0] : u4 ? t5 === u4 ? u4 = "" : e4 += t5 : '"' === t5 || "'" === t5 ? u4 = t5 : ">" === t5 ? (p4(), r4 = 1) : r4 && ("=" === t5 ? (r4 = 5, s5 = e4, e4 = "") : "/" === t5 && (r4 < 5 || ">" === n4[a4][l4 + 1]) ? (p4(), 3 === r4 && (h4 = h4[0]), r4 = h4, (h4 = h4[0]).push(2, 0, r4), r4 = 0) : " " === t5 || "	" === t5 || "\n" === t5 || "\r" === t5 ? (p4(), r4 = 2) : e4 += t5), 3 === r4 && "!--" === e4 && (r4 = 4, h4 = h4[0]);
      }
      return p4(), h4;
    }(s4)), r3), arguments, [])).length > 1 ? r3 : r3[0];
  }

  // ../core/node_modules/htm/preact/index.module.js
  var m = htm_module_default.bind(_);

  // ../core/src/app.ts
  function App(context4, dataTestid) {
    return m`
		<${appContext.Provider} value=${context4}>
			<${ManualRtc}/>
			<${Playground} dataTestid=${dataTestid}/>
		<//>
	`;
  }

  // ../core/src/app-context.ts
  var appContext = G(null);

  // ../core/src/compute-indication.ts
  function computeIndication(myCharacter, game) {
    if (myCharacter === null) {
      return "";
    }
    if (game === null) {
      return "";
    }
    switch (game.state) {
      case "WaitingPlayerB" /* WaitingPlayerB */:
        return "Attente d'un deuxieme joueur";
      case "Matte" /* Matte */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
          case "PlayerB" /* PlayerB */:
            return "Attendez...";
          default:
            return "";
        }
      case "AWins" /* AWins */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
            return "Vous gagnez !";
          case "PlayerB" /* PlayerB */:
            return "Vous perdez !";
          default:
            return "";
        }
      case "BWins" /* BWins */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
            return "Vous perdez !";
          case "PlayerB" /* PlayerB */:
            return "Vous gagnez !";
          default:
            return "";
        }
      case "AWinsByFault" /* AWinsByFault */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
            return "Gagn\xE9 ! L'adversaire a frapp\xE9 trop t\xF4t !";
          case "PlayerB" /* PlayerB */:
            return "Perdu ! vous frappez trop t\xF4t !";
          default:
            return "";
        }
      case "BWinsByFault" /* BWinsByFault */:
        switch (myCharacter) {
          case "PlayerA" /* PlayerA */:
            return "Perdu ! vous frappez trop t\xF4t !";
          case "PlayerB" /* PlayerB */:
            return "Gagn\xE9 ! L'adversaire a frapp\xE9 trop t\xF4t !";
          default:
            return "";
        }
      default:
        return "";
    }
  }

  // ../core/node_modules/tslib/tslib.es6.mjs
  var extendStatics2 = function(d3, b3) {
    extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b4) {
      d4.__proto__ = b4;
    } || function(d4, b4) {
      for (var p4 in b4)
        if (Object.prototype.hasOwnProperty.call(b4, p4))
          d4[p4] = b4[p4];
    };
    return extendStatics2(d3, b3);
  };
  function __extends2(d3, b3) {
    if (typeof b3 !== "function" && b3 !== null)
      throw new TypeError("Class extends value " + String(b3) + " is not a constructor or null");
    extendStatics2(d3, b3);
    function __() {
      this.constructor = d3;
    }
    d3.prototype = b3 === null ? Object.create(b3) : (__.prototype = b3.prototype, new __());
  }
  function __awaiter2(thisArg, _arguments, P3, generator) {
    function adopt(value) {
      return value instanceof P3 ? value : new P3(function(resolve) {
        resolve(value);
      });
    }
    return new (P3 || (P3 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e4) {
          reject(e4);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e4) {
          reject(e4);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator2(thisArg, body) {
    var _3 = { label: 0, sent: function() {
      if (t5[0] & 1)
        throw t5[1];
      return t5[1];
    }, trys: [], ops: [] }, f3, y3, t5, g2;
    return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
      return this;
    }), g2;
    function verb(n4) {
      return function(v3) {
        return step([n4, v3]);
      };
    }
    function step(op) {
      if (f3)
        throw new TypeError("Generator is already executing.");
      while (g2 && (g2 = 0, op[0] && (_3 = 0)), _3)
        try {
          if (f3 = 1, y3 && (t5 = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t5 = y3["return"]) && t5.call(y3), 0) : y3.next) && !(t5 = t5.call(y3, op[1])).done)
            return t5;
          if (y3 = 0, t5)
            op = [op[0] & 2, t5.value];
          switch (op[0]) {
            case 0:
            case 1:
              t5 = op;
              break;
            case 4:
              _3.label++;
              return { value: op[1], done: false };
            case 5:
              _3.label++;
              y3 = op[1];
              op = [0];
              continue;
            case 7:
              op = _3.ops.pop();
              _3.trys.pop();
              continue;
            default:
              if (!(t5 = _3.trys, t5 = t5.length > 0 && t5[t5.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _3 = 0;
                continue;
              }
              if (op[0] === 3 && (!t5 || op[1] > t5[0] && op[1] < t5[3])) {
                _3.label = op[1];
                break;
              }
              if (op[0] === 6 && _3.label < t5[1]) {
                _3.label = t5[1];
                t5 = op;
                break;
              }
              if (t5 && _3.label < t5[2]) {
                _3.label = t5[2];
                _3.ops.push(op);
                break;
              }
              if (t5[2])
                _3.ops.pop();
              _3.trys.pop();
              continue;
          }
          op = body.call(thisArg, _3);
        } catch (e4) {
          op = [6, e4];
          y3 = 0;
        } finally {
          f3 = t5 = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values2(o4) {
    var s4 = typeof Symbol === "function" && Symbol.iterator, m3 = s4 && o4[s4], i4 = 0;
    if (m3)
      return m3.call(o4);
    if (o4 && typeof o4.length === "number")
      return {
        next: function() {
          if (o4 && i4 >= o4.length)
            o4 = void 0;
          return { value: o4 && o4[i4++], done: !o4 };
        }
      };
    throw new TypeError(s4 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read2(o4, n4) {
    var m3 = typeof Symbol === "function" && o4[Symbol.iterator];
    if (!m3)
      return o4;
    var i4 = m3.call(o4), r3, ar = [], e4;
    try {
      while ((n4 === void 0 || n4-- > 0) && !(r3 = i4.next()).done)
        ar.push(r3.value);
    } catch (error) {
      e4 = { error };
    } finally {
      try {
        if (r3 && !r3.done && (m3 = i4["return"]))
          m3.call(i4);
      } finally {
        if (e4)
          throw e4.error;
      }
    }
    return ar;
  }
  function __spreadArray2(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i4 = 0, l4 = from2.length, ar; i4 < l4; i4++) {
        if (ar || !(i4 in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i4);
          ar[i4] = from2[i4];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }
  function __await2(v3) {
    return this instanceof __await2 ? (this.v = v3, this) : new __await2(v3);
  }
  function __asyncGenerator2(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g2 = generator.apply(thisArg, _arguments || []), i4, q3 = [];
    return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
      return this;
    }, i4;
    function verb(n4) {
      if (g2[n4])
        i4[n4] = function(v3) {
          return new Promise(function(a4, b3) {
            q3.push([n4, v3, a4, b3]) > 1 || resume(n4, v3);
          });
        };
    }
    function resume(n4, v3) {
      try {
        step(g2[n4](v3));
      } catch (e4) {
        settle(q3[0][3], e4);
      }
    }
    function step(r3) {
      r3.value instanceof __await2 ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q3[0][2], r3);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f3, v3) {
      if (f3(v3), q3.shift(), q3.length)
        resume(q3[0][0], q3[0][1]);
    }
  }
  function __asyncValues2(o4) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m3 = o4[Symbol.asyncIterator], i4;
    return m3 ? m3.call(o4) : (o4 = typeof __values2 === "function" ? __values2(o4) : o4[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
      return this;
    }, i4);
    function verb(n4) {
      i4[n4] = o4[n4] && function(v3) {
        return new Promise(function(resolve, reject) {
          v3 = o4[n4](v3), settle(resolve, reject, v3.done, v3.value);
        });
      };
    }
    function settle(resolve, reject, d3, v3) {
      Promise.resolve(v3).then(function(v4) {
        resolve({ value: v4, done: d3 });
      }, reject);
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction2(value) {
    return typeof value === "function";
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass2(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError2 = createErrorClass2(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i4) {
        return i4 + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });

  // ../core/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove2(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription2 = function() {
    function Subscription6(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription6.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values2(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction2(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e4) {
            errors = e4 instanceof UnsubscriptionError2 ? e4.errors : [e4];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values2(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer2(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError2) {
                  errors = __spreadArray2(__spreadArray2([], __read2(errors)), __read2(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError2(errors);
        }
      }
    };
    Subscription6.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer2(teardown);
        } else {
          if (teardown instanceof Subscription6) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription6.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription6.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription6.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove2(_parentage, parent);
      }
    };
    Subscription6.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove2(_finalizers, teardown);
      if (teardown instanceof Subscription6) {
        teardown._removeParent(this);
      }
    };
    Subscription6.EMPTY = function() {
      var empty = new Subscription6();
      empty.closed = true;
      return empty;
    }();
    return Subscription6;
  }();
  var EMPTY_SUBSCRIPTION2 = Subscription2.EMPTY;
  function isSubscription2(value) {
    return value instanceof Subscription2 || value && "closed" in value && isFunction2(value.remove) && isFunction2(value.add) && isFunction2(value.unsubscribe);
  }
  function execFinalizer2(finalizer) {
    if (isFunction2(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/config.js
  var config2 = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider2 = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider2.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray2([handler, timeout], __read2(args)));
      }
      return setTimeout.apply(void 0, __spreadArray2([handler, timeout], __read2(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider2.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError2(err) {
    timeoutProvider2.setTimeout(function() {
      var onUnhandledError = config2.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop2() {
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION2 = function() {
    return createNotification2("C", void 0, void 0);
  }();
  function errorNotification2(error) {
    return createNotification2("E", void 0, error);
  }
  function nextNotification2(value) {
    return createNotification2("N", value, void 0);
  }
  function createNotification2(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context2 = null;
  function errorContext2(cb) {
    if (config2.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context2;
      if (isRoot) {
        context2 = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context2, errorThrown = _a.errorThrown, error = _a.error;
        context2 = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError2(err) {
    if (config2.useDeprecatedSynchronousErrorHandling && context2) {
      context2.errorThrown = true;
      context2.error = err;
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber2 = function(_super) {
    __extends2(Subscriber3, _super);
    function Subscriber3(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription2(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER2;
      }
      return _this;
    }
    Subscriber3.create = function(next, error, complete) {
      return new SafeSubscriber2(next, error, complete);
    };
    Subscriber3.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification2(nextNotification2(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber3.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification2(errorNotification2(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber3.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification2(COMPLETE_NOTIFICATION2, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber3.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber3.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber3.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber3.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber3;
  }(Subscription2);
  var _bind2 = Function.prototype.bind;
  function bind2(fn, thisArg) {
    return _bind2.call(fn, thisArg);
  }
  var ConsumerObserver2 = function() {
    function ConsumerObserver3(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver3.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError2(error);
        }
      }
    };
    ConsumerObserver3.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError2(error);
        }
      } else {
        handleUnhandledError2(err);
      }
    };
    ConsumerObserver3.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError2(error);
        }
      }
    };
    return ConsumerObserver3;
  }();
  var SafeSubscriber2 = function(_super) {
    __extends2(SafeSubscriber3, _super);
    function SafeSubscriber3(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction2(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config2.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind2(observerOrNext.next, context_1),
            error: observerOrNext.error && bind2(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind2(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver2(partialObserver);
      return _this;
    }
    return SafeSubscriber3;
  }(Subscriber2);
  function handleUnhandledError2(error) {
    if (config2.useDeprecatedSynchronousErrorHandling) {
      captureError2(error);
    } else {
      reportUnhandledError2(error);
    }
  }
  function defaultErrorHandler2(err) {
    throw err;
  }
  function handleStoppedNotification2(notification, subscriber) {
    var onStoppedNotification = config2.onStoppedNotification;
    onStoppedNotification && timeoutProvider2.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER2 = {
    closed: true,
    next: noop2,
    error: defaultErrorHandler2,
    complete: noop2
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable2 = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();

  // ../core/node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity2(x2) {
    return x2;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipeFromArray2(fns) {
    if (fns.length === 0) {
      return identity2;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable2 = function() {
    function Observable9(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable9.prototype.lift = function(operator) {
      var observable3 = new Observable9();
      observable3.source = this;
      observable3.operator = operator;
      return observable3;
    };
    Observable9.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber2(observerOrNext) ? observerOrNext : new SafeSubscriber2(observerOrNext, error, complete);
      errorContext2(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable9.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable9.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor2(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber2({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable9.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable9.prototype[observable2] = function() {
      return this;
    };
    Observable9.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray2(operations)(this);
    };
    Observable9.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor2(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x2) {
          return value = x2;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable9.create = function(subscribe) {
      return new Observable9(subscribe);
    };
    return Observable9;
  }();
  function getPromiseCtor2(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config2.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver2(value) {
    return value && isFunction2(value.next) && isFunction2(value.error) && isFunction2(value.complete);
  }
  function isSubscriber2(value) {
    return value && value instanceof Subscriber2 || isObserver2(value) && isSubscription2(value);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/lift.js
  function hasLift2(source) {
    return isFunction2(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate2(init) {
    return function(source) {
      if (hasLift2(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
  function createOperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber2 = function(_super) {
    __extends2(OperatorSubscriber3, _super);
    function OperatorSubscriber3(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber3.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber3;
  }(Subscriber2);

  // ../core/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError2 = createErrorClass2(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // ../core/node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject2 = function(_super) {
    __extends2(Subject3, _super);
    function Subject3() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject3.prototype.lift = function(operator) {
      var subject = new AnonymousSubject2(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject3.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError2();
      }
    };
    Subject3.prototype.next = function(value) {
      var _this = this;
      errorContext2(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values2(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject3.prototype.error = function(err) {
      var _this = this;
      errorContext2(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject3.prototype.complete = function() {
      var _this = this;
      errorContext2(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject3.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject3.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject3.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject3.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject3.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION2;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription2(function() {
        _this.currentObservers = null;
        arrRemove2(observers, subscriber);
      });
    };
    Subject3.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject3.prototype.asObservable = function() {
      var observable3 = new Observable2();
      observable3.source = this;
      return observable3;
    };
    Subject3.create = function(destination, source) {
      return new AnonymousSubject2(destination, source);
    };
    return Subject3;
  }(Observable2);
  var AnonymousSubject2 = function(_super) {
    __extends2(AnonymousSubject3, _super);
    function AnonymousSubject3(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject3.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject3.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject3.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject3.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION2;
    };
    return AnonymousSubject3;
  }(Subject2);

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/empty.js
  var EMPTY = new Observable2(function(subscriber) {
    return subscriber.complete();
  });

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
  function isScheduler(value) {
    return value && isFunction2(value.schedule);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/args.js
  function last(arr) {
    return arr[arr.length - 1];
  }
  function popResultSelector(args) {
    return isFunction2(last(args)) ? args.pop() : void 0;
  }
  function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : void 0;
  }
  function popNumber(args, defaultValue) {
    return typeof last(args) === "number" ? args.pop() : defaultValue;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
  var isArrayLike2 = function(x2) {
    return x2 && typeof x2.length === "number" && typeof x2 !== "function";
  };

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isPromise.js
  function isPromise2(value) {
    return isFunction2(value === null || value === void 0 ? void 0 : value.then);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
  function isInteropObservable2(input) {
    return isFunction2(input[observable2]);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
  function isAsyncIterable2(obj) {
    return Symbol.asyncIterator && isFunction2(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
  function createInvalidObservableTypeError2(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
  function getSymbolIterator2() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator2 = getSymbolIterator2();

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isIterable.js
  function isIterable2(input) {
    return isFunction2(input === null || input === void 0 ? void 0 : input[iterator2]);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
  function readableStreamLikeToAsyncGenerator2(readableStream) {
    return __asyncGenerator2(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator2(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            if (false)
              return [3, 8];
            return [4, __await2(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await2(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await2(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike2(obj) {
    return isFunction2(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
  function innerFrom2(input) {
    if (input instanceof Observable2) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable2(input)) {
        return fromInteropObservable2(input);
      }
      if (isArrayLike2(input)) {
        return fromArrayLike2(input);
      }
      if (isPromise2(input)) {
        return fromPromise2(input);
      }
      if (isAsyncIterable2(input)) {
        return fromAsyncIterable2(input);
      }
      if (isIterable2(input)) {
        return fromIterable2(input);
      }
      if (isReadableStreamLike2(input)) {
        return fromReadableStreamLike2(input);
      }
    }
    throw createInvalidObservableTypeError2(input);
  }
  function fromInteropObservable2(obj) {
    return new Observable2(function(subscriber) {
      var obs = obj[observable2]();
      if (isFunction2(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike2(array) {
    return new Observable2(function(subscriber) {
      for (var i4 = 0; i4 < array.length && !subscriber.closed; i4++) {
        subscriber.next(array[i4]);
      }
      subscriber.complete();
    });
  }
  function fromPromise2(promise) {
    return new Observable2(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError2);
    });
  }
  function fromIterable2(iterable) {
    return new Observable2(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values2(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable2(asyncIterable) {
    return new Observable2(function(subscriber) {
      process2(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike2(readableStream) {
    return fromAsyncIterable2(readableStreamLikeToAsyncGenerator2(readableStream));
  }
  function process2(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter2(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator2(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues2(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
  function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) {
      delay = 0;
    }
    if (repeat === void 0) {
      repeat = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay));
      } else {
        this.unsubscribe();
      }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
      return scheduleSubscription;
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
  function observeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return operate2(function(source, subscriber) {
      source.subscribe(createOperatorSubscriber2(subscriber, function(value) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.next(value);
        }, delay);
      }, function() {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.complete();
        }, delay);
      }, function(err) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.error(err);
        }, delay);
      }));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
  function subscribeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return operate2(function(source, subscriber) {
      subscriber.add(scheduler.schedule(function() {
        return source.subscribe(subscriber);
      }, delay));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
  function scheduleObservable(input, scheduler) {
    return innerFrom2(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
  function schedulePromise(input, scheduler) {
    return innerFrom2(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
  function scheduleArray(input, scheduler) {
    return new Observable2(function(subscriber) {
      var i4 = 0;
      return scheduler.schedule(function() {
        if (i4 === input.length) {
          subscriber.complete();
        } else {
          subscriber.next(input[i4++]);
          if (!subscriber.closed) {
            this.schedule();
          }
        }
      });
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
  function scheduleIterable(input, scheduler) {
    return new Observable2(function(subscriber) {
      var iterator3;
      executeSchedule(subscriber, scheduler, function() {
        iterator3 = input[iterator2]();
        executeSchedule(subscriber, scheduler, function() {
          var _a;
          var value;
          var done;
          try {
            _a = iterator3.next(), value = _a.value, done = _a.done;
          } catch (err) {
            subscriber.error(err);
            return;
          }
          if (done) {
            subscriber.complete();
          } else {
            subscriber.next(value);
          }
        }, 0, true);
      });
      return function() {
        return isFunction2(iterator3 === null || iterator3 === void 0 ? void 0 : iterator3.return) && iterator3.return();
      };
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
  function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
      throw new Error("Iterable cannot be null");
    }
    return new Observable2(function(subscriber) {
      executeSchedule(subscriber, scheduler, function() {
        var iterator3 = input[Symbol.asyncIterator]();
        executeSchedule(subscriber, scheduler, function() {
          iterator3.next().then(function(result) {
            if (result.done) {
              subscriber.complete();
            } else {
              subscriber.next(result.value);
            }
          });
        }, 0, true);
      });
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
  function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator2(input), scheduler);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
  function scheduled(input, scheduler) {
    if (input != null) {
      if (isInteropObservable2(input)) {
        return scheduleObservable(input, scheduler);
      }
      if (isArrayLike2(input)) {
        return scheduleArray(input, scheduler);
      }
      if (isPromise2(input)) {
        return schedulePromise(input, scheduler);
      }
      if (isAsyncIterable2(input)) {
        return scheduleAsyncIterable(input, scheduler);
      }
      if (isIterable2(input)) {
        return scheduleIterable(input, scheduler);
      }
      if (isReadableStreamLike2(input)) {
        return scheduleReadableStreamLike(input, scheduler);
      }
    }
    throw createInvalidObservableTypeError2(input);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/from.js
  function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom2(input);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
  var EmptyError2 = createErrorClass2(function(_super) {
    return function EmptyErrorImpl() {
      _super(this);
      this.name = "EmptyError";
      this.message = "no elements in sequence";
    };
  });

  // ../core/node_modules/rxjs/dist/esm5/internal/firstValueFrom.js
  function firstValueFrom2(source, config3) {
    var hasConfig = typeof config3 === "object";
    return new Promise(function(resolve, reject) {
      var subscriber = new SafeSubscriber2({
        next: function(value) {
          resolve(value);
          subscriber.unsubscribe();
        },
        error: reject,
        complete: function() {
          if (hasConfig) {
            resolve(config3.defaultValue);
          } else {
            reject(new EmptyError2());
          }
        }
      });
      source.subscribe(subscriber);
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/map.js
  function map(project, thisArg) {
    return operate2(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber2(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
      }));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
  var isArray = Array.isArray;
  function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray2([], __read2(args))) : fn(args);
  }
  function mapOneOrManyArgs(fn) {
    return map(function(args) {
      return callOrApply(fn, args);
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
  var isArray2 = Array.isArray;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectProto = Object.prototype;
  var getKeys = Object.keys;
  function argsArgArrayOrObject(args) {
    if (args.length === 1) {
      var first_1 = args[0];
      if (isArray2(first_1)) {
        return { args: first_1, keys: null };
      }
      if (isPOJO(first_1)) {
        var keys = getKeys(first_1);
        return {
          args: keys.map(function(key) {
            return first_1[key];
          }),
          keys
        };
      }
    }
    return { args, keys: null };
  }
  function isPOJO(obj) {
    return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/util/createObject.js
  function createObject(keys, values) {
    return keys.reduce(function(result, key, i4) {
      return result[key] = values[i4], result;
    }, {});
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js
  function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var resultSelector = popResultSelector(args);
    var _a = argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
      return from([], scheduler);
    }
    var result = new Observable2(combineLatestInit(observables, scheduler, keys ? function(values) {
      return createObject(keys, values);
    } : identity2));
    return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
  }
  function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) {
      valueTransform = identity2;
    }
    return function(subscriber) {
      maybeSchedule(scheduler, function() {
        var length = observables.length;
        var values = new Array(length);
        var active = length;
        var remainingFirstValues = length;
        var _loop_1 = function(i5) {
          maybeSchedule(scheduler, function() {
            var source = from(observables[i5], scheduler);
            var hasFirstValue = false;
            source.subscribe(createOperatorSubscriber2(subscriber, function(value) {
              values[i5] = value;
              if (!hasFirstValue) {
                hasFirstValue = true;
                remainingFirstValues--;
              }
              if (!remainingFirstValues) {
                subscriber.next(valueTransform(values.slice()));
              }
            }, function() {
              if (!--active) {
                subscriber.complete();
              }
            }));
          }, subscriber);
        };
        for (var i4 = 0; i4 < length; i4++) {
          _loop_1(i4);
        }
      }, subscriber);
    };
  }
  function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
      executeSchedule(subscription, scheduler, execute);
    } else {
      execute();
    }
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
  function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      if (isComplete && !buffer.length && !active) {
        subscriber.complete();
      }
    };
    var outerNext = function(value) {
      return active < concurrent ? doInnerSub(value) : buffer.push(value);
    };
    var doInnerSub = function(value) {
      expand && subscriber.next(value);
      active++;
      var innerComplete = false;
      innerFrom2(project(value, index++)).subscribe(createOperatorSubscriber2(subscriber, function(innerValue) {
        onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
        if (expand) {
          outerNext(innerValue);
        } else {
          subscriber.next(innerValue);
        }
      }, function() {
        innerComplete = true;
      }, void 0, function() {
        if (innerComplete) {
          try {
            active--;
            var _loop_1 = function() {
              var bufferedValue = buffer.shift();
              if (innerSubScheduler) {
                executeSchedule(subscriber, innerSubScheduler, function() {
                  return doInnerSub(bufferedValue);
                });
              } else {
                doInnerSub(bufferedValue);
              }
            };
            while (buffer.length && active < concurrent) {
              _loop_1();
            }
            checkComplete();
          } catch (err) {
            subscriber.error(err);
          }
        }
      }));
    };
    source.subscribe(createOperatorSubscriber2(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
      additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction2(resultSelector)) {
      return mergeMap(function(a4, i4) {
        return map(function(b3, ii) {
          return resultSelector(a4, b3, i4, ii);
        })(innerFrom2(project(a4, i4)));
      }, concurrent);
    } else if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return operate2(function(source, subscriber) {
      return mergeInternals(source, subscriber, project, concurrent);
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    return mergeMap(identity2, concurrent);
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/observable/merge.js
  function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    var sources = args;
    return !sources.length ? EMPTY : sources.length === 1 ? innerFrom2(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/filter.js
  function filter2(predicate, thisArg) {
    return operate2(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber2(subscriber, function(value) {
        return predicate.call(thisArg, value, index++) && subscriber.next(value);
      }));
    });
  }

  // ../core/node_modules/rxjs/dist/esm5/internal/operators/tap.js
  function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction2(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
    return tapObserver ? operate2(function(source, subscriber) {
      var _a;
      (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
      var isUnsub = true;
      source.subscribe(createOperatorSubscriber2(subscriber, function(value) {
        var _a2;
        (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
        subscriber.next(value);
      }, function() {
        var _a2;
        isUnsub = false;
        (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
        subscriber.complete();
      }, function(err) {
        var _a2;
        isUnsub = false;
        (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
        subscriber.error(err);
      }, function() {
        var _a2, _b;
        if (isUnsub) {
          (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
        }
        (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
      }));
    }) : identity2;
  }

  // ../core/node_modules/uid/dist/index.mjs
  var IDX = 256;
  var HEX = [];
  var SIZE = 256;
  var BUFFER;
  while (IDX--)
    HEX[IDX] = (IDX + 256).toString(16).substring(1);
  function uid(len) {
    var i4 = 0, tmp = len || 11;
    if (!BUFFER || IDX + tmp > SIZE * 2) {
      for (BUFFER = "", IDX = 0; i4 < SIZE; i4++) {
        BUFFER += HEX[Math.random() * 256 | 0];
      }
    }
    return BUFFER.substring(IDX, IDX++ + tmp);
  }

  // ../core/src/create-client-connection.ts
  async function createClientConnection(context4) {
    const config3 = context4.configStorage.read();
    if (config3.offlineMode) {
      context4.offlineModeGameStorage = createGameStorage();
      const [
        createConnection,
        serverConnection$
      ] = await context4.createRtcConnection(context4.configStorage);
      initiateBackendHandlers(context4.offlineModeGameStorage, serverConnection$);
      return createConnection();
    } else {
      return context4.createWsClientConnection(
        config3.wsProtocol,
        config3.wsPort,
        config3.webDomain
      );
    }
  }

  // ../core/src/create-config-storage.ts
  function createConfigStorage(_config) {
    let config3 = { ..._config };
    const _config$ = new Subject2();
    return {
      read() {
        return { ...config3 };
      },
      save(update) {
        config3 = {
          ...config3,
          ...update
        };
        _config$.next(config3);
      },
      watch() {
        return _config$.asObservable();
      }
    };
  }

  // ../core/src/create-game-storage.ts
  function createGameStorage() {
    let game = {
      state: "WaitingPlayerA" /* WaitingPlayerA */
    };
    const _game$ = new Subject2();
    return {
      read() {
        return { ...game };
      },
      save(update) {
        game = {
          ...game,
          ...update
        };
        _game$.next(game);
      },
      watch() {
        return _game$.asObservable();
      }
    };
  }

  // ../core/src/game-state.ts
  var GameState = /* @__PURE__ */ ((GameState2) => {
    GameState2["WaitingPlayerA"] = "WaitingPlayerA";
    GameState2["WaitingPlayerB"] = "WaitingPlayerB";
    GameState2["Matte"] = "Matte";
    GameState2["Hajime"] = "Hajime";
    GameState2["AWins"] = "AWins";
    GameState2["BWins"] = "BWins";
    GameState2["AWinsByFault"] = "AWinsByFault";
    GameState2["BWinsByFault"] = "BWinsByFault";
    GameState2["PlayerADisconnected"] = "PlayerADisconnected";
    GameState2["PlayerBDisconnected"] = "PlayerBDisconnected";
    return GameState2;
  })(GameState || {});

  // ../core/src/get-game.ts
  async function getGame(connection) {
    const requestId = uid();
    const response$ = connection.messages$.pipe(
      map((m3) => m3.getGameResponse),
      filter2(Boolean),
      filter2((response2) => response2.requestId === requestId)
    );
    const response = firstValueFrom2(response$);
    const request = { getGameRequest: { requestId } };
    await connection.send(request);
    const game = (await response).game;
    return game;
  }

  // ../core/src/get-game-handle.ts
  function getGameHandle(gameStorage, connexions$) {
    return connexions$.subscribe(function(connection) {
      const subscription = connection.messages$.pipe(
        map((m3) => m3.getGameRequest),
        filter2(Boolean)
      ).subscribe({
        next(request) {
          const response = {
            getGameResponse: {
              requestId: request.requestId,
              game: gameStorage.read()
            }
          };
          connection.send(response);
        },
        complete() {
          subscription.unsubscribe();
        }
      });
    });
  }

  // ../core/src/get-my-character.ts
  async function getMyCharacter(connection) {
    const requestId = uid();
    const response$ = connection.messages$.pipe(
      map((m3) => m3.getMyCharacterResponse),
      filter2(Boolean),
      filter2((r3) => r3.requestId === requestId)
    );
    const response = firstValueFrom2(response$);
    const request = { getMyCharacterRequest: { requestId } };
    await connection.send(request);
    return (await response).character;
  }

  // ../core/src/get-my-character-handle.ts
  function getMyCharacterHandle(gameStorage, connexions$) {
    return connexions$.pipe(
      mergeMap(function(connection) {
        return connection.messages$.pipe(
          map((m3) => m3.getMyCharacterRequest),
          filter2(Boolean),
          tap(function(request) {
            connection.send({
              getMyCharacterResponse: {
                requestId: request.requestId,
                character: resolveMyCharacter(gameStorage, connection)
              }
            });
          })
        );
      })
    ).subscribe();
  }

  // ../core/src/incoming-signaling.ts
  var _incomingSignaling$ = new Subject2();
  var incomingSignaling$ = _incomingSignaling$.asObservable();
  function broadcastIncomingSignaling(event) {
    _incomingSignaling$.next(event);
  }

  // ../core/src/initiate-backend-handlers.ts
  function initiateBackendHandlers(gameStorage, connexion$) {
    interactHandle(gameStorage, connexion$);
    getGameHandle(gameStorage, connexion$);
    observeGameHandle(gameStorage, connexion$);
    getMyCharacterHandle(gameStorage, connexion$);
    observeMyCharacterHandle(gameStorage, connexion$);
  }

  // ../core/src/interact.ts
  async function interact(connection) {
    const message = { interactEmit: {} };
    await connection.send(message);
  }

  // ../core/src/interact-handle.ts
  var {
    WaitingPlayerA,
    WaitingPlayerB,
    Matte,
    Hajime,
    AWins,
    BWins,
    AWinsByFault,
    BWinsByFault,
    PlayerADisconnected,
    PlayerBDisconnected
  } = GameState;
  var hajimeTimeout;
  function interactHandle(gameStorage, connexions$) {
    return connexions$.subscribe(function(connection) {
      const messageSub = connection.messages$.pipe(filter2((message) => Boolean(message.interactEmit))).subscribe({
        next() {
          console.log("is interacting", connection.id);
          const game = gameStorage.read();
          switch (game.state) {
            case AWins:
            case BWins:
            case AWinsByFault:
            case BWinsByFault:
              game.state = WaitingPlayerA;
              game.playerA = void 0;
              game.playerB = void 0;
              break;
            case PlayerADisconnected:
            case PlayerBDisconnected:
            case WaitingPlayerA:
              game.playerA = connection.id;
              game.state = WaitingPlayerB;
              break;
            case WaitingPlayerB:
              if (game.playerA !== connection.id) {
                game.playerB = connection.id;
                game.state = Matte;
                hajimeTimeout = setTimeout(function() {
                  game.state = Hajime;
                  gameStorage.save(game);
                }, 2e3 + Math.random() * 4e3);
              } else {
                return;
              }
              break;
            case Matte:
              if (connection.id === game.playerA) {
                clearTimeout(hajimeTimeout);
                game.state = BWinsByFault;
              } else if (connection.id === game.playerB) {
                clearTimeout(hajimeTimeout);
                game.state = AWinsByFault;
              }
              break;
            case Hajime:
              if (connection.id === game.playerA) {
                game.state = AWins;
              } else if (connection.id === game.playerB) {
                game.state = BWins;
              }
              break;
            default:
              return;
          }
          gameStorage.save(game);
        },
        complete() {
          const game = gameStorage.read();
          switch (connection.id) {
            case game.playerA:
              clearTimeout(hajimeTimeout);
              game.playerA = void 0;
              game.playerB = void 0;
              game.state = PlayerADisconnected;
              break;
            case game.playerB:
              clearTimeout(hajimeTimeout);
              game.playerA = void 0;
              game.playerB = void 0;
              game.state = PlayerBDisconnected;
              break;
            default:
              return;
          }
          gameStorage.save(game);
          messageSub.unsubscribe();
        }
      });
    });
  }

  // ../core/src/is-title-shown.ts
  function isTitleShown(myCharacter, game) {
    if (game == null) {
      return true;
    }
    if (myCharacter == null) {
      return true;
    }
    switch (game.state) {
      case "WaitingPlayerA" /* WaitingPlayerA */:
      case "PlayerADisconnected" /* PlayerADisconnected */:
      case "PlayerBDisconnected" /* PlayerBDisconnected */:
        return true;
      case "WaitingPlayerB" /* WaitingPlayerB */:
        return myCharacter !== "PlayerA" /* PlayerA */;
      default:
        return false;
    }
  }

  // ../core/node_modules/preact/hooks/dist/hooks.module.js
  var t3;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = [];
  var e2 = l;
  var a2 = e2.__b;
  var v2 = e2.__r;
  var l2 = e2.diffed;
  var m2 = e2.__c;
  var s2 = e2.unmount;
  var d2 = e2.__;
  function h2(n4, t5) {
    e2.__h && e2.__h(r2, n4, o2 || t5), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n4 >= u4.__.length && u4.__.push({ __V: c2 }), u4.__[n4];
  }
  function p2(n4) {
    return o2 = 1, y2(D, n4);
  }
  function y2(n4, u4, i4) {
    var o4 = h2(t3++, 2);
    if (o4.t = n4, !o4.__c && (o4.__ = [i4 ? i4(u4) : D(void 0, u4), function(n5) {
      var t5 = o4.__N ? o4.__N[0] : o4.__[0], r3 = o4.t(t5, n5);
      t5 !== r3 && (o4.__N = [r3, o4.__[1]], o4.__c.setState({}));
    }], o4.__c = r2, !r2.u)) {
      var f3 = function(n5, t5, r3) {
        if (!o4.__c.__H)
          return true;
        var u5 = o4.__c.__H.__.filter(function(n6) {
          return !!n6.__c;
        });
        if (u5.every(function(n6) {
          return !n6.__N;
        }))
          return !c4 || c4.call(this, n5, t5, r3);
        var i5 = false;
        return u5.forEach(function(n6) {
          if (n6.__N) {
            var t6 = n6.__[0];
            n6.__ = n6.__N, n6.__N = void 0, t6 !== n6.__[0] && (i5 = true);
          }
        }), !(!i5 && o4.__c.props === n5) && (!c4 || c4.call(this, n5, t5, r3));
      };
      r2.u = true;
      var c4 = r2.shouldComponentUpdate, e4 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n5, t5, r3) {
        if (this.__e) {
          var u5 = c4;
          c4 = void 0, f3(n5, t5, r3), c4 = u5;
        }
        e4 && e4.call(this, n5, t5, r3);
      }, r2.shouldComponentUpdate = f3;
    }
    return o4.__N || o4.__;
  }
  function _2(n4, u4) {
    var i4 = h2(t3++, 3);
    !e2.__s && C2(i4.__H, u4) && (i4.__ = n4, i4.i = u4, r2.__H.__h.push(i4));
  }
  function q2(n4, r3) {
    var u4 = h2(t3++, 7);
    return C2(u4.__H, r3) ? (u4.__V = n4(), u4.i = r3, u4.__h = n4, u4.__V) : u4.__;
  }
  function P2(n4) {
    var u4 = r2.context[n4.__c], i4 = h2(t3++, 9);
    return i4.c = n4, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n4.__;
  }
  function j2() {
    for (var n4; n4 = f2.shift(); )
      if (n4.__P && n4.__H)
        try {
          n4.__H.__h.forEach(z2), n4.__H.__h.forEach(B2), n4.__H.__h = [];
        } catch (t5) {
          n4.__H.__h = [], e2.__e(t5, n4.__v);
        }
  }
  e2.__b = function(n4) {
    r2 = null, a2 && a2(n4);
  }, e2.__ = function(n4, t5) {
    n4 && t5.__k && t5.__k.__m && (n4.__m = t5.__k.__m), d2 && d2(n4, t5);
  }, e2.__r = function(n4) {
    v2 && v2(n4), t3 = 0;
    var i4 = (r2 = n4.__c).__H;
    i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n5) {
      n5.__N && (n5.__ = n5.__N), n5.__V = c2, n5.__N = n5.i = void 0;
    })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t3 = 0)), u2 = r2;
  }, e2.diffed = function(n4) {
    l2 && l2(n4);
    var t5 = n4.__c;
    t5 && t5.__H && (t5.__H.__h.length && (1 !== f2.push(t5) && i2 === e2.requestAnimationFrame || ((i2 = e2.requestAnimationFrame) || w2)(j2)), t5.__H.__.forEach(function(n5) {
      n5.i && (n5.__H = n5.i), n5.__V !== c2 && (n5.__ = n5.__V), n5.i = void 0, n5.__V = c2;
    })), u2 = r2 = null;
  }, e2.__c = function(n4, t5) {
    t5.some(function(n5) {
      try {
        n5.__h.forEach(z2), n5.__h = n5.__h.filter(function(n6) {
          return !n6.__ || B2(n6);
        });
      } catch (r3) {
        t5.some(function(n6) {
          n6.__h && (n6.__h = []);
        }), t5 = [], e2.__e(r3, n5.__v);
      }
    }), m2 && m2(n4, t5);
  }, e2.unmount = function(n4) {
    s2 && s2(n4);
    var t5, r3 = n4.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n5) {
      try {
        z2(n5);
      } catch (n6) {
        t5 = n6;
      }
    }), r3.__H = void 0, t5 && e2.__e(t5, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n4) {
    var t5, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t5), setTimeout(n4);
    }, u4 = setTimeout(r3, 100);
    k2 && (t5 = requestAnimationFrame(r3));
  }
  function z2(n4) {
    var t5 = r2, u4 = n4.__c;
    "function" == typeof u4 && (n4.__c = void 0, u4()), r2 = t5;
  }
  function B2(n4) {
    var t5 = r2;
    n4.__c = n4.__(), r2 = t5;
  }
  function C2(n4, t5) {
    return !n4 || n4.length !== t5.length || t5.some(function(t6, r3) {
      return t6 !== n4[r3];
    });
  }
  function D(n4, t5) {
    return "function" == typeof t5 ? t5(n4) : t5;
  }

  // ../core/node_modules/goober/dist/goober.modern.js
  var e3 = { data: "" };
  var t4 = (t5) => "object" == typeof window ? ((t5 ? t5.querySelector("#_goober") : window._goober) || Object.assign((t5 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t5 || e3;
  var l3 = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
  var a3 = /\/\*[^]*?\*\/|  +/g;
  var n3 = /\n+/g;
  var o3 = (e4, t5) => {
    let r3 = "", l4 = "", a4 = "";
    for (let n4 in e4) {
      let c4 = e4[n4];
      "@" == n4[0] ? "i" == n4[1] ? r3 = n4 + " " + c4 + ";" : l4 += "f" == n4[1] ? o3(c4, n4) : n4 + "{" + o3(c4, "k" == n4[1] ? "" : t5) + "}" : "object" == typeof c4 ? l4 += o3(c4, t5 ? t5.replace(/([^,])+/g, (e5) => n4.replace(/(^:.*)|([^,])+/g, (t6) => /&/.test(t6) ? t6.replace(/&/g, e5) : e5 ? e5 + " " + t6 : t6)) : n4) : null != c4 && (n4 = /^--/.test(n4) ? n4 : n4.replace(/[A-Z]/g, "-$&").toLowerCase(), a4 += o3.p ? o3.p(n4, c4) : n4 + ":" + c4 + ";");
    }
    return r3 + (t5 && a4 ? t5 + "{" + a4 + "}" : a4) + l4;
  };
  var c3 = {};
  var s3 = (e4) => {
    if ("object" == typeof e4) {
      let t5 = "";
      for (let r3 in e4)
        t5 += r3 + s3(e4[r3]);
      return t5;
    }
    return e4;
  };
  var i3 = (e4, t5, r3, i4, p4) => {
    let u4 = s3(e4), d3 = c3[u4] || (c3[u4] = ((e5) => {
      let t6 = 0, r4 = 11;
      for (; t6 < e5.length; )
        r4 = 101 * r4 + e5.charCodeAt(t6++) >>> 0;
      return "go" + r4;
    })(u4));
    if (!c3[d3]) {
      let t6 = u4 !== e4 ? e4 : ((e5) => {
        let t7, r4, o4 = [{}];
        for (; t7 = l3.exec(e5.replace(a3, "")); )
          t7[4] ? o4.shift() : t7[3] ? (r4 = t7[3].replace(n3, " ").trim(), o4.unshift(o4[0][r4] = o4[0][r4] || {})) : o4[0][t7[1]] = t7[2].replace(n3, " ").trim();
        return o4[0];
      })(e4);
      c3[d3] = o3(p4 ? { ["@keyframes " + d3]: t6 } : t6, r3 ? "" : "." + d3);
    }
    let f3 = r3 && c3.g ? c3.g : null;
    return r3 && (c3.g = c3[d3]), ((e5, t6, r4, l4) => {
      l4 ? t6.data = t6.data.replace(l4, e5) : -1 === t6.data.indexOf(e5) && (t6.data = r4 ? e5 + t6.data : t6.data + e5);
    })(c3[d3], t5, i4, f3), d3;
  };
  var p3 = (e4, t5, r3) => e4.reduce((e5, l4, a4) => {
    let n4 = t5[a4];
    if (n4 && n4.call) {
      let e6 = n4(r3), t6 = e6 && e6.props && e6.props.className || /^go/.test(e6) && e6;
      n4 = t6 ? "." + t6 : e6 && "object" == typeof e6 ? e6.props ? "" : o3(e6, "") : false === e6 ? "" : e6;
    }
    return e5 + l4 + (null == n4 ? "" : n4);
  }, "");
  function u3(e4) {
    let r3 = this || {}, l4 = e4.call ? e4(r3.p) : e4;
    return i3(l4.unshift ? l4.raw ? p3(l4, [].slice.call(arguments, 1), r3.p) : l4.reduce((e5, t5) => Object.assign(e5, t5 && t5.call ? t5(r3.p) : t5), {}) : l4, t4(r3.target), r3.g, r3.o, r3.k);
  }
  var b2 = u3.bind({ g: 1 });
  var h3 = u3.bind({ k: 1 });

  // ../core/src/manual-rtc.ts
  function ManualRtc() {
    let [receivedSignalingEvents, setReceivedSignalingEvents] = p2("");
    let [signalingEvents, setSignalingEvents] = p2([]);
    const context4 = P2(appContext);
    let [config3, setConfig] = p2(context4.configStorage.read());
    let sub = q2(() => context4.configStorage.watch().subscribe(setConfig), []);
    let [manualRtcCompleted, setManualRtcCompleted] = p2(false);
    function updateOfflineModeCharacter(offlineModeCharacter) {
      context4.configStorage.save({ offlineModeCharacter });
    }
    function updateStunServer(event) {
      context4.configStorage.save({ stunServer: event.target.value });
    }
    const sub2 = q2(function() {
      return outcomingSignaling$.subscribe(function(signalingEvent) {
        signalingEvents.push(signalingEvent);
        setSignalingEvents([...signalingEvents]);
      });
    }, []);
    async function receiveSignalingEvents(event) {
      broadcastIncomingSignaling(JSON.parse(event.target.value));
      setReceivedSignalingEvents("");
      if (config3.offlineModeCharacter === "PlayerA" /* PlayerA */) {
        setManualRtcCompleted(true);
      }
    }
    function copySignalingEventToClipBoard() {
      navigator.clipboard.writeText(JSON.stringify(signalingEvents, null, 4));
      setSignalingEvents([]);
      if (config3.offlineModeCharacter === "PlayerB" /* PlayerB */) {
        setManualRtcCompleted(true);
      }
    }
    _2(() => {
      return function() {
        console.log("unsibscribing from ManualRtc component.");
        sub.unsubscribe();
        sub2.unsubscribe();
      };
    }, []);
    const className = u3`
		background-color: white;

		& fieldset {
			display: inline;
			margin: 0.2rem;
		}
	`;
    return !manualRtcCompleted && m`
		<div className=${className}>
			<fieldset>
				<legend> Connexion WebRTC </legend>

				${config3.offlineModeCharacter === "None" /* None */ ? m`
					<fieldset>
						<legend> Serveur STUN (Si connexion via internet) </legend>
						<input placeholder="stun:<serveur>:<port>" onChange=${updateStunServer}/>
					</fieldset>

					<fieldset>
						<legend> Choix de votre joueur </legend>

						<button
							onClick=${() => updateOfflineModeCharacter("PlayerA" /* PlayerA */)}>
							Joueur 1
						</button>
						<button
							onClick=${() => updateOfflineModeCharacter("PlayerB" /* PlayerB */)}>
							Joueur 2
						</button>
					</fieldset>
				` : null}

				${config3.offlineModeCharacter !== "None" /* None */ ? m`
					${signalingEvents.length ? m`
						<div>
							<button onClick=${copySignalingEventToClipBoard} style="width: 10rem;">
								Copier mon signalement (⚠️&nbsp;CONFIDENTIEL&nbsp;⚠️,
								Adresse IP, routage réseau, ...)
							</button>
						</div>
					` : null}

					<textarea
						placeholder="Recevoir le signalement de l'autre joueur."
						onChange=${receiveSignalingEvents}
						value=${receivedSignalingEvents}
						style="width: 10rem;"
					></textarea>
				` : null}
			</fieldset>
		</div>
	`;
  }

  // ../core/src/mount-app.ts
  function mountApp(htmlElement, context4) {
    B(App(context4), htmlElement);
  }

  // ../core/src/observe-game.ts
  function observeGame(connection) {
    return new Observable2(function(subscriber) {
      const subscription = connection.messages$.pipe(
        map((m3) => m3.observeGameBroadcast),
        filter2(Boolean)
      ).subscribe({
        next(broadcast) {
          subscriber.next(broadcast.game);
        },
        complete() {
          subscription.unsubscribe();
        }
      });
    });
  }

  // ../core/src/observe-game-handle.ts
  function observeGameHandle(gameStorage, connexions$) {
    return connexions$.subscribe(function(connection) {
      const subscription = gameStorage.watch().subscribe(function(game) {
        connection.send({
          observeGameBroadcast: { game }
        });
      });
      const messageSubscription = connection.messages$.subscribe({
        complete() {
          subscription.unsubscribe();
          messageSubscription.unsubscribe();
        }
      });
    });
  }

  // ../core/src/observe-my-character.ts
  function observeMyCharacter(connection) {
    return connection.messages$.pipe(
      map((m3) => m3.observeMyCharacterBroadcast?.character),
      filter2(Boolean)
    );
  }

  // ../core/src/observe-my-character-handle.ts
  function observeMyCharacterHandle(gameStorage, connexions$) {
    return connexions$.subscribe(function(connection) {
      const subscription = gameStorage.watch().subscribe(function() {
        connection.send({
          observeMyCharacterBroadcast: {
            character: resolveMyCharacter(gameStorage, connection)
          }
        });
      });
      const messageSubscription = connection.messages$.subscribe({
        complete() {
          subscription.unsubscribe();
          messageSubscription.unsubscribe();
        }
      });
    });
  }

  // ../core/src/outcoming-signaling.ts
  var _outcomingSignaling$ = new Subject2();
  var outcomingSignaling$ = _outcomingSignaling$.asObservable();
  function broadcastOutcomingSignaling(event) {
    _outcomingSignaling$.next(event);
  }

  // ../core/src/playground.ts
  function Playground({ dataTestid }) {
    const context4 = P2(appContext);
    const waitConnection = q2(
      () => createClientConnection(context4),
      []
    );
    let [myCharacter, setMyCharacter] = p2(null);
    let [game, setGame] = p2(null);
    let [disconnected, setDisconnected] = p2(false);
    let showTitle = q2(() => isTitleShown(myCharacter, game), [myCharacter, game]);
    let aWins = q2(() => game !== null && (game.state === "AWins" /* AWins */ || game.state === "AWinsByFault" /* AWinsByFault */), [game]);
    let bWins = q2(() => game !== null && (game.state === "BWins" /* BWins */ || game.state === "BWinsByFault" /* BWinsByFault */), [game]);
    let indication = q2(() => computeIndication(myCharacter, game), [myCharacter, game]);
    const sub = q2(function() {
      return from(waitConnection).pipe(
        mergeMap(function(connection) {
          return combineLatest(
            merge(
              from(getGame(connection)),
              observeGame(connection)
            ),
            merge(
              from(getMyCharacter(connection)),
              observeMyCharacter(connection)
            )
          );
        })
      ).subscribe(function([_game, _myCharacter]) {
        setGame(_game);
        setMyCharacter(_myCharacter);
      });
    }, []);
    let connexionSub = q2(function() {
      return from(waitConnection).pipe(
        mergeMap(function(connection) {
          return connection.messages$;
        })
      ).subscribe({
        error: () => setDisconnected(true),
        complete: () => setDisconnected(true)
      });
    }, []);
    const interaction$ = q2(() => new Subject2(), []);
    let controlsSub = q2(function() {
      return combineLatest(
        from(waitConnection),
        interaction$
      ).subscribe(function([connection]) {
        interact(connection).catch(console.error);
      });
    }, []);
    _2(() => {
      return function() {
        sub?.unsubscribe();
        connexionSub?.unsubscribe();
        controlsSub?.unsubscribe();
      };
    }, []);
    return m`
		<div
			class="main"
			data-testid=${dataTestid}
			onClick=${() => interaction$.next(void 0)}
			onKeyDown=${() => interaction$.next(void 0)}
		>
			${disconnected && m`<p class="disconnectedFromServer">Disconnected from server.</p>`}
			${!disconnected && !game && m`<p aria-label="waitConnection" class="disconnectedFromServer">Attente d'une connexion.</p>`}
			${showTitle && game && m`<div aria-label="title" class="title"></div>`}

			${!showTitle && m`
				<div aria-label="arena" class="arena">
					<div aria-label="player" class="vue-player">
						${game?.playerA && !aWins && !bWins && m`<div aria-label="playerA" class="playerA"></div>`}
						${game?.playerB && !aWins && !bWins && m`<div aria-label="playerB" class="playerB"></div>`}
						${game?.playerA && aWins && m`<div class="playerAwins"></div>`}
						${game?.playerB && aWins && m`<div class="playerBloses"></div>`}
						${game?.playerA && bWins && m`<div class="playerAloses"></div>`}
						${game?.playerB && bWins && m`<div class="playerBwins"></div>`}
					</div>

					${game?.state === "Hajime" /* Hajime */ && m`<p aria-label="exclamationPoints" class="exclamationPoints">!!</p>`}
					${myCharacter === "PlayerA" /* PlayerA */ && m`<p class="playerADisplay">Joueur 1</p>`}
					${myCharacter === "PlayerB" /* PlayerB */ && m`<p class="playerBDisplay">Joueur 2</p>`}
					${myCharacter === "None" /* None */ && m`<p class="spectatorDisplay">Spectateur</p>`}
					<p aria-label="indication" class="indication">${indication}</p>
				</div>
			`}
		</div>
	`;
  }

  // ../core/src/resolve-my-character.ts
  function resolveMyCharacter(gameStorage, connection) {
    const game = gameStorage.read();
    switch (connection.id) {
      case game.playerA:
        return "PlayerA" /* PlayerA */;
      case game.playerB:
        return "PlayerB" /* PlayerB */;
      default:
        return "None" /* None */;
    }
  }

  // src/create-rtc-connection.ts
  async function createRtcConnection(configStorage2) {
    const broadcastToServer$ = new Subject();
    const broadcastToCurrentTabFromServer$ = new Subject();
    const broadcastToWebRTC$ = new Subject();
    const broadcastFromWebRTC$ = new Subject();
    const _offlineServer$ = new Subject();
    let waitServerPrepare = new Promise((r3) => setTimeout(r3, 150));
    let _connected$ = new Subject();
    let tabIsServer = false;
    let acceptedAnswer = false;
    const currentTabServerConnection = {
      id: 1,
      messages$: broadcastToServer$.asObservable(),
      send(message) {
        broadcastToCurrentTabFromServer$.next(message);
      }
    };
    const peerServerConnection = {
      id: 2,
      messages$: broadcastFromWebRTC$.asObservable(),
      send(message) {
        broadcastToWebRTC$.next(message);
      }
    };
    let config3 = configStorage2.read();
    const peerConnection = new RTCPeerConnection(config3.stunServer && {
      iceServers: [{ urls: config3.stunServer }]
    });
    configStorage2.watch().subscribe(function(c4) {
      config3 = c4;
      peerConnection.setConfiguration(c4.stunServer && {
        iceServers: [{ urls: c4.stunServer }]
      });
    });
    peerConnection.onicecandidate = function(e4) {
      const candidate = e4?.candidate?.toJSON();
      if (candidate) {
        broadcastOutcomingSignaling({ candidate });
      }
    };
    const signalingSubscription = incomingSignaling$.subscribe({
      async next(signalingEvents) {
        for (const signalingEvent of signalingEvents) {
          if (signalingEvent.offer) {
            await peerConnection.setRemoteDescription(signalingEvent.offer);
          }
          if (signalingEvent.answer) {
            await peerConnection.setRemoteDescription(signalingEvent.answer);
            acceptedAnswer = true;
          }
        }
        for (const signalingEvent of signalingEvents) {
          if (signalingEvent.candidate) {
            await peerConnection.addIceCandidate(signalingEvent.candidate);
          }
          if (signalingEvent.offer) {
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            broadcastOutcomingSignaling({ answer });
          }
        }
      },
      error(error) {
        console.error(error);
      }
    });
    async function sendOffers() {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      broadcastOutcomingSignaling({ offer });
    }
    firstValueFrom(
      configStorage2.watch().pipe(
        filter((config4) => config4.offlineModeCharacter === "PlayerA" /* PlayerA */)
      )
    ).then(sendOffers, console.error);
    peerConnection.ondatachannel = function receiveChannelCallback(event) {
      event.channel.onmessage = function(event2) {
        const message = JSON.parse(event2.data);
        broadcastFromWebRTC$.next(message);
      };
    };
    peerConnection.addEventListener("connectionstatechange", function() {
      switch (peerConnection.connectionState) {
        case "connecting":
          break;
        case "connected":
          _connected$.next();
          waitServerPrepare = new Promise((r3) => setTimeout(r3, 200));
          tabIsServer = acceptedAnswer;
          if (tabIsServer) {
            waitServerPrepare.then(() => {
              _offlineServer$.next(currentTabServerConnection);
              _offlineServer$.next(peerServerConnection);
            });
          }
          break;
        case "closed":
        case "disconnected":
        case "failed":
          signalingSubscription.unsubscribe();
          _offlineServer$.complete();
          break;
        default:
          throw new Error("Unhandled state change !");
      }
    });
    const sendChannel = peerConnection.createDataChannel("sendDataChannel");
    async function sendWhenConnected(m3) {
      while (peerConnection.connectionState !== "connected") {
        await new Promise((r3) => setTimeout(r3, 50));
      }
      await waitServerPrepare;
      sendChannel.send(JSON.stringify(m3));
    }
    async function sendWhenConnectedInternal(m3) {
      while (peerConnection.connectionState !== "connected") {
        await new Promise((r3) => setTimeout(r3, 50));
      }
      await waitServerPrepare;
      broadcastToServer$.next(m3);
    }
    const subscriptionToSendToWebRTC = broadcastToWebRTC$.subscribe({
      next: sendWhenConnected,
      error(error) {
        console.error(error);
      }
    });
    function createClientConnection2() {
      return {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        messages$: new Observable(function(subscriber) {
          const connMessagesSub1 = broadcastToCurrentTabFromServer$.pipe(filter(() => tabIsServer)).subscribe({
            next(message) {
              subscriber.next(message);
            },
            error(error) {
              console.error(error);
            }
          });
          const connMessagesSub2 = broadcastFromWebRTC$.pipe(filter(() => !tabIsServer)).subscribe({
            next(message) {
              subscriber.next(message);
            },
            error(error) {
              console.error(error);
            }
          });
          peerConnection.addEventListener("connectionstatechange", function() {
            switch (peerConnection.connectionState) {
              case "connected":
              case "connecting":
                break;
              case "closed":
              case "disconnected":
              case "failed":
                connMessagesSub1.unsubscribe();
                connMessagesSub2.unsubscribe();
                subscriptionToSendToWebRTC.unsubscribe();
                subscriber.complete();
                break;
              default:
                throw new Error("Unhandled state !");
            }
          });
        }).pipe(share()),
        send(message) {
          if (tabIsServer) {
            sendWhenConnectedInternal(message).catch(console.error);
          } else {
            sendWhenConnected(message).catch(console.error);
          }
        }
      };
    }
    await firstValueFrom(_connected$);
    return [
      createClientConnection2,
      _offlineServer$.asObservable()
    ];
  }

  // src/index.ts
  var configStorage = createConfigStorage({
    webProtocol: "http",
    webDomain: "localhost",
    webPort: 3366,
    wsProtocol: "ws",
    wsPort: 3377,
    offlineMode: true,
    offlineModeCharacter: "None" /* None */
  });
  var context3 = {
    configStorage,
    createRtcConnection,
    createWsClientConnection
  };
  mountApp(document.body, context3);
})();
