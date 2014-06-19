weaponry
========

Weaponry toolbox of great utility for the Javascript Ninja.


I will be adding from my collection of tools, one by one. They're all in
need of a bit of touch up before hitting public.

First off: cpo.

## cpo ##

cpo (copy object) is a deep-cloner for objects.

- Per 19 June 2014 it marginally beats  the speed reference method
  JSON.parse(JSON.stringify()) - more importantly: with added object 
  integrity and ability to do object reference recursion cloning.

  see: http://jsperf.com/deep-cloning-of-objects/10

- A deep copy, with optional object reference recursion awareness as
  full-through or fallback in suspected recursion-cases.

Usage: 

Livescript:
```LiveScript
  cloned-obj = cpo source-obj         # no-belts version - fastest
  cloned-obj = cpo source-obj, true   # be reference recursion aware (slower) 
  cloned-obj = cpo source-obj, 1000   # fast with belts, if we dive through 1000 objs (per example), suspect recursion, abort and resort to the recurse-aware function.
```

The last one is fast, until a recursive obj is hit, in that case there's the penalty of first trying without the check.. Good to keep your app from crashing from an unexpected recursive object at a small CPU cost.

Javascript:
```JavaScript
  clonedObj = cpo(sourceObj);         // no-belts version - fastest
  clonedObj = cpo(sourceObj, true);   // be reference recursion aware (slower) 
  clonedObj = cpo(sourceObj, 1000);   // fast with belts 
```

Check out the source, for more intell.


