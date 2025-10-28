import { id as nanoid } from "../../../utils/nanoid";

export default {
  // biome-ignore lint/suspicious/useAwait: its fine
  async fetch(): Promise<Response> {
    const id = nanoid();
    const message = `Haiii - patpat2! ${id}`;
    // throw new Error("Error with bad stack trace");
    console.log(message);
    return new Response(message);
  },
};
