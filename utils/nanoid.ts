//* nanoid became runtime specific in v5; breaking support for cloudflare workers
//* this is the same version as v5 but written to work w/ webcrypto instead of node:crypto
const POOL_SIZE_MULTIPLIER = 128;
let pool: Uint8Array;
let poolOffset: number;

function fillPool(bytes: number) {
  if (!pool || pool.length < bytes) {
    pool = new Uint8Array(bytes * POOL_SIZE_MULTIPLIER);
    crypto.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
}

export function idGenerator(alphabet: string, defaultSize: number) {
  const mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1;
  const step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length);

  return (size = defaultSize) => {
    // throw new Error("Error with good stack trace");
    let id = "";
    while (true) {
      fillPool(step);
      const bytes = pool.subarray(poolOffset - step, poolOffset);
      for (let i = 0; i < step; i++) {
        // biome-ignore lint/style/noNonNullAssertion: we iterate down from step. will always exist
        id += alphabet[bytes[i]! & mask] || "";
        if (id.length === size) {
          return id;
        }
      }
    }
  };
}

export const DEFAULT_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const DEFAULT_LENGTH = 10;
export const id = idGenerator(DEFAULT_ALPHABET, DEFAULT_LENGTH);

export const HEX_ALPHABET = "0123456789abcdef";
export const HEX_LENGTH = 16;
export const hexId = idGenerator(HEX_ALPHABET, HEX_LENGTH);
