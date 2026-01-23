/**
 * GTK Modular Import Test
 *
 * This test verifies that we can import components from their specific modules
 * instead of the main entry point.
 */

import { cstr } from "../src/low/utils.ts";
import { Button, Label, Orientation } from "../src/high/gtk4.ts";
import { AdwWindow } from "../src/high/adw.ts";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

Deno.test("Utils module: cstr returns Uint8Array", () => {
  const testStr = "Hello World";
  const buffer = cstr(testStr);
  assert(buffer instanceof Uint8Array, "buffer is Uint8Array");
});

Deno.test("Enums: Constants are correct", () => {
  assert(
    Orientation.VERTICAL === 1,
    "Orientation.VERTICAL from gtk4.ts is correct",
  );
  assert(
    Orientation.HORIZONTAL === 0,
    "Orientation.HORIZONTAL from gtk4.ts is correct",
  );
});

Deno.test("GTK Widgets module: creation and usage", () => {
  const label = new Label("Test Label");
  assert(label !== null, "Label created from src/gtk.ts");
  assert(label.getText() === "Test Label", "Label text correct");

  const button = new Button("Test Button");
  assert(button !== null, "Button created from src/gtk.ts");
});

Deno.test("Adwaita Widgets module: creation", () => {
  // We can create an AdwWindow (even without an app for this simple test)
  const win = new AdwWindow();
  assert(win !== null, "AdwWindow created from src/adw.ts");
});
