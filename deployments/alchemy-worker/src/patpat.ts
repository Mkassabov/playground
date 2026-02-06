import { id as nanoid } from "../../../utils/nanoid";

// work here is OUTSIDE the request scope
const outsideScope = nanoid();

export default {
  async fetch(): Promise<Response> {
    // work here is INSIDE the request scope
    const insideScope = nanoid();
    return new Response({ outsideScope, insideScope });
  },
};
