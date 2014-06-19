/**
* Created:  2014-06-19
* Author:   Oscar Campbell
* Licence:  MIT (Expat) - http://opensource.org/licenses/mit-license.html
*
* What?: A deep copy, with optional object reference recursion awareness as
*        full-through or fallback in suspected recursion-cases.
*        Per 19 June 2014 it kicks the JSON.decode(JSON.stringify()) method
*        with added object integrity.
*
*        Is defined with AMD package formalia.
*
**/

// Generated by LiveScript 1.2.0

define([], function() {
// Yeah - I will not indent here!

var __toStr = {}.toString
  , __owns = {}.hasOwnProperty
  , isArray_slowFallback = Array.isArray || function(obj) {
        return typeof obj.unshift !== 'undefined' && __toStr.call(obj) === '[object Array]';
  }
  , chickenOutCounter
  , chickenOutThreshold
  , nop = function(){}
  , innerFn = deepCloneWithBelts_inner
  //, friendPrototypesObj = []
  //, friendPrototypesArr = []
  ;

//deepCloneNo_Belt = function(obj) {
//    if (typeof obj !== 'object')
//        return obj;
//    else
//        return deepCloneNoBelt_inner(obj);
//};

var cpo = deepClone_Safe = function(obj, refRecursionSafe) {
    refRecursionSafe == null && (refRecursionSafe = 0);

    if (typeof obj !== 'object')
        return obj;

    else if (refRecursionSafe === true)
        return createReferenceRecursionAwareInner()(obj);

    else if (refRecursionSafe === 0)
        return deepCloneNoBelt_inner(obj);

    else {
        chickenOutCounter = 0;
        chickenOutThreshold = typeof refRecursionSafe === 'number' ? refRecursionSafe : 10000;
        out = innerFn(obj);

        // Was there a bail out because of suspected reference recursion?
        if (innerFn === nop) {
            innerFn = deepCloneWithBelts_inner; // reset from bail-out function
            out = createReferenceRecursionAwareInner()(obj);
        }

        return out;
    }
};

function deepCloneNoBelt_inner(obj) {
    // Null?
    if (obj === null)
        return null;

    var ctor = obj.constructor;

    // A pure object?
    if (ctor === Object) {
        var k, v, reto = {};
        for (k in obj)
            if (__owns.call(obj, k))
                reto[k] = typeof (v = obj[k]) === 'object' ? deepCloneNoBelt_inner(v) : v;
        return reto;
    }
    // Array?
    if (ctor === Array || isArray_slowFallback(obj)) {
        var i, v, len = obj.length, reto = new Array(len);
        for (i = 0; i < len; ++i)
            reto[i] = typeof (v = obj[i]) === 'object' ? deepCloneNoBelt_inner(v) : v;
        return reto;
    }
    // Fast RegExp & Date checks first
    if (ctor === Date || ctor === RegExp)
        return obj;

    // Slower Date-check
    if (typeof obj.getYear !== 'undefined' && __toStr.call(obj)=== '[object Date]')
        return obj;

    // Slower RegExp-check
    if (typeof obj.exec !== 'undefined' && typeof obj.match !== 'undefined')
        return obj;

    if (__toStr.call(obj === '[object Object]')) {
        var k, v, reto = {};
        for (k in obj)
            if (__owns.call(obj, k))
                reto[k] = typeof (v = obj[k]) === 'object' ? deepCloneNoBelt_inner(v) : v;
        return reto;
    }
    return obj;
}

function deepCloneWithBelts_inner(obj) {
    if (++chickenOutCounter > chickenOutThreshold) {
        innerFn = nop;
        return null;
    }
    if (obj === null)
        return null;

    var ctor = obj.constructor;

    if (ctor === Object) {
        var k, v, reto = {};
        for (k in obj)
            if (__owns.call(obj, k))
                reto[k] = typeof (v = obj[k]) === 'object' ? innerFn(v) : v;
        return reto;
    }
    //var isAnArray = false;
    //if (ctor === Array) {
    //    isAnArray = true;
    //} else if (friendPrototypesArr.indexOf(ctor) != -1) {
    //    isAnArray = true;
    //} else if (isArray_slowFallback(obj)) {
    //    isAnArray = true;
    //    friendPrototypesArr.push(ctor);
    //}
    if (ctor === Array || isArray_slowFallback(obj)) {
        var i, v, len = obj.length, reto = new Array(len);
        for (i = 0; i < len; ++i) {
            reto[i] = typeof (v = obj[i]) === 'object' ? innerFn(v) : v;
        }
        return reto;
    }
    if (ctor === Date || ctor === RegExp) {
        return obj;
    }
    // Slower RegExp-check
    if (typeof obj.exec !== 'undefined' && typeof obj.match !== 'undefined')
        return obj;

    // Slower Date-check
    if (typeof obj.getYear !== 'undefined' && __toStr.call(obj)=== '[object Date]')
        return obj;

    //if (friendPrototypesObj.indexOf(ctor ) != -1 || __toStr.call(obj === '[object Object]')) {
    if (__toStr.call(obj === '[object Object]')) {
        //friendPrototypesObj.push(ctor);
        var k, v, reto = {};
        for (k in obj)
            if (__owns.call(obj, k))
                reto[k] = typeof (v = obj[k]) === 'object' ? innerFn(v) : v;
        return reto;
    }
    return obj;
}

function createReferenceRecursionAwareInner() {
    var seen = []
      , mapArr = []
      ;

    function _cpo_inner(obj){
        var i;

        // Reference recursion?
        if ((i = seen.indexOf(obj)) !== -1)
            return mapArr[i];

        // Null?
        if (obj === null)
            return null;

        var ctor = obj.constructor
          , foundAnObj = (ctor === Object);

        // Not a pure object afawn? Check for other stuff
        if (!foundAnObj) {
            // Array?
            if (ctor === Array || isArray_slowFallback(obj)) {
                var v, len = obj.length, reto = new Array(len);
                mapArr.push(reto);
                seen.push(obj);
                for (i = 0; i < len; ++i)
                    reto[i] = typeof (v = obj[i]) === 'object' ? _cpo_inner(v) : v;
                return reto;
            }
            // Fast RegExp & Date checks first
            if (ctor === Date || ctor === RegExp)
                return obj;

            // Slower RegExp-check
            if (typeof obj.exec !== 'undefined' && typeof obj.match !== 'undefined')
                return obj;

            // Slower Date-check
            if (typeof obj.getYear !== 'undefined' && __toStr.call(obj)=== '[object Date]')
                return obj;
        }
        // Lastly and most expensively, if foundAnObj is not already true,
        // we do the hideous toString check. /ORC
        if (foundAnObj || __toStr.call(obj) === '[object Object]') {
            var k, v, reto = {};
            mapArr.push(reto);
            seen.push(obj);
            for (k in obj)
                if (__owns.call(obj, k))
                    reto[k] = typeof (v = obj[k]) === 'object' ? _cpo_inner(v) : v;
            return reto;
        }
        return obj;
    };
    return _cpo_inner;
}

return cpo;

});
