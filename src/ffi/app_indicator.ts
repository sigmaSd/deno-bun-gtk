import "@sigma/deno-compat";
import { LIB_PATHS } from "../libPaths/mod.ts";

export const app_indicator = Deno.dlopen(LIB_PATHS.app_indicator, {
  app_indicator_new: {
    parameters: ["buffer", "buffer", "i32"],
    result: "pointer",
  },
  app_indicator_set_status: {
    parameters: ["pointer", "i32"],
    result: "void",
  },
  app_indicator_set_menu: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  app_indicator_set_title: {
    parameters: ["pointer", "buffer"],
    result: "void",
  },
  app_indicator_get_id: {
    parameters: ["pointer"],
    result: "buffer",
  },
});
