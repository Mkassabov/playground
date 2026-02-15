import { id as nanoid } from "../../../utils/nanoid";


export default {
  async fetch(): Promise<Response> {
    const reqid = nanoid();
    return new Response(JSON.stringify({ id:reqid, "test": "panda"  }));
  },
};
