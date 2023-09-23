# unpm 🎉
Univeral-modules package manager, alternative to npm (yarn, pnpm, etc.)

Only need node and unpm.mjs file installed in your path.

`unpm install`

-OR-

```
unpm
```
Install specific umd version of an npm package:
```
unpm react-redux
```

# Working on a large code-base? unpm to the rescue in 2023

## Ultra-Lightweight: No more 400MB to 10GB node_modules 🤯

+ Everything from KBs to 2MB to 99MB (max).  React+ReactDOM = 200KB node_modules 🤯
+ node_modules is no more the heaviest object in the universe.
+ Universal-modules package manager maintains lightweight node_modules folder.
+ Thanks to the umd formats published by npm packages

## How packages are resolved?

Packages are resolved from https://unpkg.com/

```
`https://unpkg.com/${name}@${versionOrLatest}/${umdOrDist}/${nameOrIndex}${productionMin}.${jsOrMjsOrCjs}`
```

## Want security audits and security teams to pass your code-base?

Create and specify custom registry with import_map.json and custom cdn specification.

## Wanted to always ensure cicd builds are fast?
For CICD / staging environments, now you can push node_modules folder along with your src/ it has become so lightweight!!

No more waiting time for npm i to finish in test-runs and builds.
