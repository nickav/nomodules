# nomodules

#### _Simplify your project dependencies!_

Dependency hell got you down? Well, say hello to `nomodules`! With `nomodules`
you can easily remove all of your project dependencies with a single command. Rad!

## Install

Install [yarn][yarn-install]. Then simply run:

```
yarn add nomodules
```

Sample output:
```
yarn add v1.21.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ nomodules@0.1.0
info All dependencies
└─ nomodules@0.1.0
✨  Done in 0.73s.
```

Now, all of your project dependencies will be removed (except, of course, the
`nomodules` dependency). But don't worry, it hardly does anything at all and you
certainly can't require anything from it!

Never worry again about the crazy amount of complexity you've added to a project
that you don't quite understand how any of it actually works. If you see another
project is using `nomodules` then you can feel confident that all the code
written was handmade, and done by someone who actually knows what the heck is
going on with everything.


[yarn-install]: https://yarnpkg.com/lang/en/docs/install/
