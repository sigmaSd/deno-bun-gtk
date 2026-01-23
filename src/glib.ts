import { glib } from "./ffi/gtk.ts";

// GLib MainLoop
export class MainLoop {
  private ptr: Deno.PointerValue;

  constructor() {
    const context = glib.symbols.g_main_context_default();
    this.ptr = glib.symbols.g_main_loop_new(context, false);
  }

  run(): void {
    glib.symbols.g_main_loop_run(this.ptr);
  }

  quit(): void {
    glib.symbols.g_main_loop_quit(this.ptr);
  }
}

// GLib timeout
export function timeout(ms: number, callback: () => boolean): number {
  const cb = new Deno.UnsafeCallback(
    {
      parameters: ["pointer"],
      result: "bool",
    } as Deno.UnsafeCallbackDefinition,
    () => {
      return callback();
    },
  );

  return glib.symbols.g_timeout_add(ms, cb.pointer as Deno.PointerValue, null);
}

export function removeTimeout(id: number): void {
  glib.symbols.g_source_remove(id);
}
