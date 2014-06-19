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

- A deep copy, with optional object reference recursion awareness as
  full-through or fallback in suspected recursion-cases.

Usage: 

cloned-obj = cpo source-obj         # no-belts version - fastest
cloned-obj = cpo source-obj, true   # be reference recursion aware
(slower) 
cloned-obj = cpo source-obj, 1000   # fast with belts, if we dive
through 1000 objs (per example), we will suspect recursion, abort and resort to the
recurse-aware function. Fast, until a recursive obj is hit, then there's
the penalty of first trying without the check..

Check out the source, for more intell.


