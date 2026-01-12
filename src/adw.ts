import { adwaita, gobject } from "./libs.ts";
import { cstr, readCStr } from "./utils.ts";
import { Application, ListBoxRow, Widget, Window } from "./gtk.ts";
import { createGObject } from "./gobject.ts";

// Initialize Adwaita
export function initAdwaita(): void {
  adwaita.symbols.adw_init();
}

// LibAdwaita Window extends GtkWindow
export class AdwWindow extends Window {
  constructor(ptr?: Deno.PointerValue) {
    const actualPtr = ptr ?? adwaita.symbols.adw_window_new();
    super(actualPtr);
  }

  setContent(content: Widget): void {
    adwaita.symbols.adw_window_set_content(this.ptr, content.ptr);
  }
}

// LibAdwaita ApplicationWindow extends AdwWindow
export class AdwApplicationWindow extends AdwWindow {
  constructor(app: Application) {
    const ptr = adwaita.symbols.adw_application_window_new(app.ptr);
    super(ptr);
  }

  override setContent(content: Widget): void {
    adwaita.symbols.adw_application_window_set_content(this.ptr, content.ptr);
  }
}

// AdwHeaderBar extends GtkWidget
export class HeaderBar extends Widget {
  constructor() {
    const ptr = adwaita.symbols.adw_header_bar_new();
    super(ptr);
  }

  packStart(child: Widget): void {
    adwaita.symbols.adw_header_bar_pack_start(this.ptr, child.ptr);
  }

  packEnd(child: Widget): void {
    adwaita.symbols.adw_header_bar_pack_end(this.ptr, child.ptr);
  }

  setTitleWidget(widget: Widget): void {
    adwaita.symbols.adw_header_bar_set_title_widget(this.ptr, widget.ptr);
  }
}

// AdwAboutDialog extends AdwDialog extends GtkWidget
// Note: AdwDialog is not GtkWindow in GTK4, it's a separate widget
export class AboutDialog extends Widget {
  constructor() {
    const ptr = adwaita.symbols.adw_about_dialog_new();
    super(ptr);
  }

  setApplicationName(name: string): void {
    const nameCStr = cstr(name);
    adwaita.symbols.adw_about_dialog_set_application_name(this.ptr, nameCStr);
  }

  setVersion(version: string): void {
    const versionCStr = cstr(version);
    adwaita.symbols.adw_about_dialog_set_version(this.ptr, versionCStr);
  }

  setDeveloperName(name: string): void {
    const nameCStr = cstr(name);
    adwaita.symbols.adw_about_dialog_set_developer_name(this.ptr, nameCStr);
  }

  setComments(comments: string): void {
    const commentsCStr = cstr(comments);
    adwaita.symbols.adw_about_dialog_set_comments(this.ptr, commentsCStr);
  }

  setTransientFor(parent: Widget): void {
    this.setProperty("transient-for", parent.ptr);
  }

  setModal(modal: boolean): void {
    this.setProperty("modal", modal);
  }

  show(): void {
    this.setProperty("visible", true);
  }
}

// AdwToolbarView extends GtkWidget
export class ToolbarView extends Widget {
  constructor() {
    const ptr = adwaita.symbols.adw_toolbar_view_new();
    super(ptr);
  }

  setContent(content: Widget): void {
    adwaita.symbols.adw_toolbar_view_set_content(this.ptr, content.ptr);
  }

  addTopBar(topBar: Widget): void {
    adwaita.symbols.adw_toolbar_view_add_top_bar(this.ptr, topBar.ptr);
  }

  addBottomBar(bottomBar: Widget): void {
    adwaita.symbols.adw_toolbar_view_add_bottom_bar(this.ptr, bottomBar.ptr);
  }
}

// AdwPreferencesGroup extends GtkWidget
export class PreferencesGroup extends Widget {
  constructor() {
    const ptr = adwaita.symbols.adw_preferences_group_new();
    super(ptr);
  }

  add(widget: Widget | ActionRow | ComboRow): void {
    adwaita.symbols.adw_preferences_group_add(this.ptr, widget.ptr);
  }
}

// AdwPreferencesPage extends GtkWidget
export class PreferencesPage extends Widget {
  constructor() {
    const ptr = adwaita.symbols.adw_preferences_page_new();
    super(ptr);
  }

  add(group: PreferencesGroup): void {
    adwaita.symbols.adw_preferences_page_add(this.ptr, group.ptr);
  }
}

// AdwPreferencesWindow extends AdwWindow extends GtkWindow
// Since we don't have AdwWindow class, extend Window directly
export class PreferencesWindow extends Window {
  constructor() {
    const ptr = adwaita.symbols.adw_preferences_window_new();
    super(ptr);
  }

  add(page: PreferencesPage): void {
    adwaita.symbols.adw_preferences_window_add(this.ptr, page.ptr);
  }
}

// AdwActionRow extends AdwPreferencesRow extends GtkListBoxRow extends GtkWidget
export class ActionRow extends ListBoxRow {
  constructor(ptr?: Deno.PointerValue) {
    const actualPtr = ptr ?? createGObject("AdwActionRow");
    if (!actualPtr) throw new Error("Failed to create ActionRow");
    super(actualPtr);
  }
}

// AdwComboRow extends AdwActionRow extends AdwPreferencesRow extends GtkListBoxRow extends GtkWidget
export class ComboRow extends ActionRow {
  constructor() {
    const ptr = createGObject("AdwComboRow");
    if (!ptr) throw new Error("Failed to create ComboRow");
    super(ptr);
  }
}

// AdwMessageDialog extends GtkWindow extends GtkWidget
// Adwaita MessageDialog
export class MessageDialog extends Window {
  constructor(parent: Window | null, heading: string, body?: string) {
    const headingCStr = cstr(heading);
    const bodyCStr = body ? cstr(body) : null;
    const ptr = adwaita.symbols.adw_message_dialog_new(
      parent ? parent.ptr : null,
      headingCStr,
      bodyCStr,
    );
    super(ptr);
  }

  addResponse(id: string, label: string): void {
    const idCStr = cstr(id);
    const labelCStr = cstr(label);
    adwaita.symbols.adw_message_dialog_add_response(
      this.ptr,
      idCStr,
      labelCStr,
    );
  }

  setResponseAppearance(response: string, appearance: number): void {
    const responseCStr = cstr(response);
    adwaita.symbols.adw_message_dialog_set_response_appearance(
      this.ptr,
      responseCStr,
      appearance,
    );
  }

  setDefaultResponse(response: string): void {
    const responseCStr = cstr(response);
    adwaita.symbols.adw_message_dialog_set_default_response(
      this.ptr,
      responseCStr,
    );
  }

  setCloseResponse(response: string): void {
    const responseCStr = cstr(response);
    adwaita.symbols.adw_message_dialog_set_close_response(
      this.ptr,
      responseCStr,
    );
  }

  onResponse(callback: (response: string) => void): void {
    // The "response" signal on AdwMessageDialog passes the response ID as a string parameter
    const cb = new Deno.UnsafeCallback(
      {
        parameters: ["pointer", "pointer", "pointer"],
        result: "void",
      } as const,
      (
        _self: Deno.PointerValue,
        responseIdPtr: Deno.PointerValue,
        _userData: Deno.PointerValue,
      ) => {
        const responseId = readCStr(responseIdPtr);
        callback(responseId);
      },
    );

    const signalCStr = cstr("response");
    gobject.symbols.g_signal_connect_data(
      this.ptr,
      signalCStr,
      cb.pointer,
      null,
      null,
      0,
    );
  }
}

// StyleManager wrapper for Adwaita theme control
export class StyleManager {
  ptr: Deno.PointerValue;

  private constructor(ptr: Deno.PointerValue) {
    this.ptr = ptr;
  }

  static getDefault(): StyleManager {
    const ptr = adwaita.symbols.adw_style_manager_get_default();
    return new StyleManager(ptr);
  }

  setColorScheme(scheme: number): void {
    adwaita.symbols.adw_style_manager_set_color_scheme(this.ptr, scheme);
  }

  getColorScheme(): number {
    return adwaita.symbols.adw_style_manager_get_color_scheme(
      this.ptr,
    ) as number;
  }
}
