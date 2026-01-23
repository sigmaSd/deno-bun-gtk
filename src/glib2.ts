import { glib } from "./ffi/gtk.ts";

// GPriority constants
export const G_PRIORITY_DEFAULT = 0;
export const G_PRIORITY_HIGH = -100;
export const G_PRIORITY_HIGH_IDLE = 100;
export const G_PRIORITY_DEFAULT_IDLE = 200;
export const G_PRIORITY_LOW = 300;

export const Priority = {
  DEFAULT: G_PRIORITY_DEFAULT,
  HIGH: G_PRIORITY_HIGH,
  HIGH_IDLE: G_PRIORITY_HIGH_IDLE,
  DEFAULT_IDLE: G_PRIORITY_DEFAULT_IDLE,
  LOW: G_PRIORITY_LOW,
};

// Unix Signals
export const SIGINT = 2;
export const SIGTERM = 15;

export const UnixSignal = {
  SIGINT: SIGINT,
  SIGTERM: SIGTERM,
};

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
