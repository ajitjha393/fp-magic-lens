## FP-MAGIC-LENS

Usually when defining our functionally pure lenses for our data object, we
define a `getter` and a `setter` methods explicitly.

If I show you that my getter for lens is `user => user.name` and ask you to tell
me about it's setter,

You would define it like this `(name, user) => { ...user, name }`

What if I tell you that `fp-magic-lens` can save you this effort and generate
the `setter()` for you based on the `getter` provided?

```shell
npm install fp-magic-lens
or
yarn add fp-magic-lens
```

```ts
import setter from 'fp-magic-lens'

const getNameAge = user => [user.name, user.age]

const setNameAge = setter(getNameAge)

// equivalent to
// const setNameAge = ([name, age], user) => ({ ...user, name, age })

setNameAge(['Bishwajit', 21], {})
// { name: "Bishwajit", age: 21 }
```

#### What are Lenses ?

Mathematical Definition -

```js
 data Lens a b = Lens { getter :: a -> b, setter :: b -> a -> a }
```

A lens is a **_composable pair of pure getter and setter functions_** which
focus on a particular field inside an object, and obey a set of axioms known as
the
[lens laws](https://en.wikibooks.org/wiki/Haskell/Lenses_and_functional_references).

Getter is a simple function that receives an object (whole) and returns a piece
of it (part).

With the setter, we are looking to generate a new whole with the new part that
we have passed to it.

Lenses are basically the get/set functions we’re used to but functionally pure!


## CODE PLAYGROUND 


Try it out here - [FP Magic Lens Playground](https://codesandbox.io/s/hopeful-shadow-jh60lc?file=/src/examples.ts)
