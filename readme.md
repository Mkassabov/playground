## Cloudflare Sourcemap Bug

Cloudflare seems to ignore sourcemaps in the observability dashboard (and possibly other places) if the error is thrown in the worker's entrypoint.

if you uncomment the error in the fetch handler: https://github.com/Mkassabov/playground/blob/27bb928289a9a82b71a05920a6e3c3e9a88724e9/deployments/alchemy-worker/src/patpat.ts#L8

the stack trace will be incorrect. with the stack trace in the cloudflare observability dashboard reporting as:
```
  at Object.fetch (patpat.js:51:11)
```

if you instead uncomment the error in the nanoid file: https://github.com/Mkassabov/playground/blob/27bb928289a9a82b71a05920a6e3c3e9a88724e9/utils/nanoid.ts#L24

the stack trace will be correct. with the stack trace in the cloudflare observability dashboard reporting as:
```
at utils\nanoid.ts:24:11
at Object.fetch (deployments\alchemy-worker\src\patpat.ts:6:16)
```

## Deploying the Worker

the worker can be deployed with `bunx wrangler deploy` OR with `bunx alchemy deploy`. Both deployment methods include this bug.

## Sourcemaps

If deploying with alchemy the sourcemap alchemy uploads to cloudflare will be available at `.alchemy\out\bad-stack-trace-error-worker-bug\patpat.js.map`. There is a sample `./alchemy` folder uploaded in this repo. Normally committing the `.alchemy` folder in git is not recommended but this is a bug report with no secrets so its fine.

`bunx wrangler build` will create a sourcemap at `dist\patpat.js.map` however this sourcemap will have `sources` relative to the `dist` directory NOT the file names uploaded to cloudflare. Wrangler does not save the corrected sourcemap to disk but they are corrected prior to uploading to cloudflare using `bunx wrangler deploy`

## Alchemy Version

If using alchemy it is worth noting that the version of alchemy installed is a patch package pointing to [PR#1185](https://github.com/alchemy-run/alchemy/pull/1185) which contains a fix for sourcemaps in alchemy.
