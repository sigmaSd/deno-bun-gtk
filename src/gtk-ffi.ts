/**
 * High-level TypeScript bindings for GTK4 and libadwaita using Deno/Bun's FFI.
 *
 * This module provides idiomatic, object-oriented wrappers around GTK4, GLib, GIO,
 * GObject, and libadwaita, allowing you to build native desktop applications using
 * Deno/Bun. The library abstracts away low-level pointer manipulation and provides a
 * clean API similar to native GTK bindings in other languages.
 *
 * All dlopen calls and FFI symbol definitions are handled internally - application
 * code only works with high-level classes and doesn't need to deal with raw pointers,
 * C strings, or memory management.
 *
 * @example Basic application
 * ```typescript
 * import { Application, ApplicationWindow, Button } from "@sigmasd/gtk";
 *
 * const app = new Application("com.example.App", 0);
 *
 * app.connect("activate", () => {
 *   const win = new ApplicationWindow(app);
 *   win.setTitle("Hello World");
 *   win.setDefaultSize(400, 300);
 *
 *   const button = new Button("Click Me!");
 *   button.connect("clicked", () => {
 *     console.log("Button clicked!");
 *   });
 *
 *   win.setChild(button);
 *   win.setProperty("visible", true);
 * });
 *
 * app.run([]);
 * ```
 *
 * @example Using async/await with EventLoop
 * ```typescript
 * import { Application, Button } from "@sigmasd/gtk";
 * import { EventLoop } from "@sigmasd/gtk/eventloop";
 *
 * const app = new Application("com.example.App", 0);
 * const eventLoop = new EventLoop();
 *
 * app.connect("activate", () => {
 *   const button = new Button("Fetch Data");
 *   button.connect("clicked", async () => {
 *     const response = await fetch("https://api.github.com/repos/denoland/deno");
 *     const data = await response.json();
 *     console.log("Stars:", data.stargazers_count);
 *   });
 * });
 *
 * await eventLoop.start(app);
 * ```
 *
 * @module
 */

import "./libs.ts";

export * from "./enums.ts";

export * from "./utils.ts";

export * from "./gobject.ts";

export * from "./gio.ts";

export * from "./glib.ts";

export * from "./cairo.ts";

export * from "./gtk.ts";

export * from "./adw.ts";
