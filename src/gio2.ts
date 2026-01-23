import { gio, glib } from "./ffi/gtk.ts";
import { cstr, readCStr } from "./utils.ts";
import { GObject } from "./gobject2.ts";

// GApplicationFlags
export const G_APPLICATION_FLAGS_NONE = 0;
export const G_APPLICATION_IS_SERVICE = 1 << 0;
export const G_APPLICATION_IS_LAUNCHER = 1 << 1;
export const G_APPLICATION_HANDLES_OPEN = 1 << 2;
export const G_APPLICATION_HANDLES_COMMAND_LINE = 1 << 3;
export const G_APPLICATION_SEND_ENVIRONMENT = 1 << 4;
export const G_APPLICATION_NON_UNIQUE = 1 << 5;
export const G_APPLICATION_CAN_OVERRIDE_APP_ID = 1 << 6;
export const G_APPLICATION_ALLOW_REPLACEMENT = 1 << 7;
export const G_APPLICATION_REPLACE = 1 << 8;

export const ApplicationFlags = {
  NONE: G_APPLICATION_FLAGS_NONE,
  IS_SERVICE: G_APPLICATION_IS_SERVICE,
  IS_LAUNCHER: G_APPLICATION_IS_LAUNCHER,
  HANDLES_OPEN: G_APPLICATION_HANDLES_OPEN,
  HANDLES_COMMAND_LINE: G_APPLICATION_HANDLES_COMMAND_LINE,
  SEND_ENVIRONMENT: G_APPLICATION_SEND_ENVIRONMENT,
  NON_UNIQUE: G_APPLICATION_NON_UNIQUE,
  CAN_OVERRIDE_APP_ID: G_APPLICATION_CAN_OVERRIDE_APP_ID,
  ALLOW_REPLACEMENT: G_APPLICATION_ALLOW_REPLACEMENT,
  REPLACE: G_APPLICATION_REPLACE,
};

// GMenu extends GMenuModel extends GObject
export class Menu extends GObject {
  constructor() {
    const ptr = gio.symbols.g_menu_new();
    super(ptr);
  }

  append(label: string, detailedAction: string): void {
    const labelCStr = cstr(label);
    const actionCStr = cstr(detailedAction);
    gio.symbols.g_menu_append(this.ptr, labelCStr, actionCStr);
  }
}

// GSimpleAction extends GObject
export class SimpleAction extends GObject {
  constructor(name: string) {
    const nameCStr = cstr(name);
    const ptr = gio.symbols.g_simple_action_new(nameCStr, null);
    super(ptr);
  }
}

export class ListStore extends GObject {
  constructor(type: number | bigint) {
    const ptr = gio.symbols.g_list_store_new(BigInt(type));
    super(ptr);
  }
  append(item: GObject): void {
    gio.symbols.g_list_store_append(this.ptr, item.ptr);
  }
}

export class File extends GObject {
  constructor(ptr?: Deno.PointerValue) {
    super(ptr ?? null!); // Allow wrapping existing pointer
  }

  static newForPath(path: string): File {
    const ptr = gio.symbols.g_file_new_for_path(cstr(path));
    return new File(ptr);
  }

  static getType(): bigint {
    return BigInt(gio.symbols.g_file_get_type());
  }

  getPath(): string | null {
    const ptr = gio.symbols.g_file_get_path(this.ptr);
    return ptr ? readCStr(ptr) : null;
  }

  loadContents(): [boolean, Uint8Array] {
    const contents = new BigUint64Array(1);
    const length = new BigUint64Array(1);
    const etag_out = new BigUint64Array(1);

    const success = gio.symbols.g_file_load_contents(
      this.ptr,
      null,
      Deno.UnsafePointer.of(contents),
      Deno.UnsafePointer.of(length),
      Deno.UnsafePointer.of(etag_out),
    );

    if (success) {
      const len = Number(length[0]);
      const ptr = Deno.UnsafePointer.create(contents[0]);
      if (ptr) {
        const view = new Deno.UnsafePointerView(ptr);
        const arr = new Uint8Array(len);
        view.copyInto(arr);
        glib.symbols.g_free(ptr);
        return [true, arr];
      }
    }
    return [false, new Uint8Array(0)];
  }
}

export class AsyncResult extends GObject {}
