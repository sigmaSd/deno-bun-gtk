import { glib2 } from "./ffi/glib2.ts";

// ============================================================================
// GLib Enums and Constants
// ============================================================================

// GLib Priority levels (for timeouts, idle handlers, etc.)
export const Priority = {
  HIGH: -100,
  DEFAULT: 0,
  HIGH_IDLE: 100,
  DEFAULT_IDLE: 200,
  LOW: 300,
} as const;

// Unix signal numbers
export const UnixSignal = {
  SIGINT: 2,
  SIGTERM: 15,
} as const;

// ============================================================================
// GLib Classes
// ============================================================================

// GLib MainLoop
export class MainLoop {
  private ptr: Deno.PointerValue;

  constructor() {
    const context = glib2.symbols.g_main_context_default();
    this.ptr = glib2.symbols.g_main_loop_new(context, false);
  }

  run(): void {
    glib2.symbols.g_main_loop_run(this.ptr);
  }

  quit(): void {
    glib2.symbols.g_main_loop_quit(this.ptr);
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

  return glib2.symbols.g_timeout_add(ms, cb.pointer as Deno.PointerValue, null);
}

export function removeTimeout(id: number): void {
  glib2.symbols.g_source_remove(id);
}
