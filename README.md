### FP-MAGIC-LENS

Usually when defining our functionally pure lenses for our data object, we define a `getter` and a `setter` methods explicitly.

But, What if I tell you that `fp-magic-lens` can save you this effort and generate the `setter()` for you based on the `getter` provided?



#### What are Lenses ?

Mathematical Definition - 

```js
 data Lens a b = Lens { getter :: a -> b, setter :: b -> a -> a }
 ```

A lens is a ***composable pair of pure getter and setter functions*** which focus on a particular field inside an object, and obey a set of axioms known as the [lens laws](https://en.wikibooks.org/wiki/Haskell/Lenses_and_functional_references).

Getter is a simple function that receives an object (whole) and returns a piece of it (part).

With the setter, we are looking to generate a new whole with the new part that we have passed to it.
It’s basically the get/set functions we’re used to but functionally pure!
