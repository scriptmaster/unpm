# unpm
Univeral-modules package manager, alternative to npm

Only need node and this file. UMD alternative to: npm, yarn, pnpm

## No more 400MB to 10GB node_modules

+ node_modules is no more the heaviest object in the universe.
+ Everything from 2MB to 99MB (max)
+ Universal-modules package manager maintains lightweight node_modules folder.
+ Thanks to the umd formats published by npm packages

## How packages are resolved?

Packages are resolved from https://unpkg.com/

```
`https://unpkg.com/${name}@${versionOrLatest}/${umdOrDist}/${nameOrIndex}${productionMin}.${jsOrMjsOrCjs}`
```

Backwards compatibility with .cjs files
