import { id as nanoid } from "../../../utils/nanoid";

import mod from "./simple.wasm";

// Define imports available to Wasm instance.
const importObject = {
  imports: {
    imported_func: (arg: number) => {
      console.log(`Hello from JavaScript: ${arg}`);
    },
  },
};

// Create instance of WebAssembly Module `mod`, supplying
// the expected imports in `importObject`. This should be
// done at the top level of the script to avoid instantiation on every request.
const instance = await WebAssembly.instantiate(mod, importObject);

export default {
  async fetch(): Promise<Response> {
    const reqid = nanoid();
    const retval = instance.exports.exported_func(42);
    return new Response(JSON.stringify({ id:reqid, "value": retval  }));
  },
};
