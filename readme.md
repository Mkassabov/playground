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
