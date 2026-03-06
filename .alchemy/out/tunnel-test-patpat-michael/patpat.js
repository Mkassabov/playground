var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils/nanoid.ts
var POOL_SIZE_MULTIPLIER = 128;
var pool;
var poolOffset;
function fillPool(bytes) {
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
__name(fillPool, "fillPool");
function idGenerator(alphabet, defaultSize) {
  const mask = (2 << 31 - Math.clz32(alphabet.length - 1 | 1)) - 1;
  const step = Math.ceil(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id2 = "";
    while (true) {
      fillPool(step);
      const bytes = pool.subarray(poolOffset - step, poolOffset);
      for (let i = 0; i < step; i++) {
        id2 += alphabet[bytes[i] & mask] || "";
        if (id2.length === size) {
          return id2;
        }
      }
    }
  };
}
__name(idGenerator, "idGenerator");
var DEFAULT_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var DEFAULT_LENGTH = 10;
var id = idGenerator(DEFAULT_ALPHABET, DEFAULT_LENGTH);
var HEX_ALPHABET = "0123456789abcdef";
var HEX_LENGTH = 16;
var hexId = idGenerator(HEX_ALPHABET, HEX_LENGTH);

// src/patpat.ts
var patpat_default = {
  async fetch() {
    const reqid = id();
    console.log(reqid);
    return new Response(JSON.stringify({ id: reqid, test: "panda" }));
  }
};
export {
  patpat_default as default
};
//# sourceMappingURL=patpat.js.map
