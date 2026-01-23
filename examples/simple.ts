#!/usr/bin/env -S deno run --allow-ffi

import {
  Application,
  ApplicationFlags,
  ApplicationWindow,
  Box,
  Button,
  Label,
  Orientation,
} from "@sigmasd/gtk/gtk4";

const APP_ID = "com.example.SimpleDemo";
const APP_FLAGS = ApplicationFlags.NONE;

class SimpleApp {
  #app: Application;
  #win?: ApplicationWindow;

  constructor() {
    this.#app = new Application(APP_ID, APP_FLAGS);

    this.#app.onActivate(() => {
      if (!this.#win) {
        this.#win = new ApplicationWindow(this.#app);
        this.#win.setTitle("Simple GTK Demo");
        this.#win.setDefaultSize(400, 300);

        // Create a vertical box container
        const box = new Box(Orientation.VERTICAL, 12);
        box.setMarginTop(24);
        box.setMarginBottom(24);
        box.setMarginStart(24);
        box.setMarginEnd(24);

        // Create a label
        const label = new Label("Hello, GTK with Deno! 👋");
        box.append(label);

        // Create a button
        const button = new Button("Click Me!");
        button.onClick(() => {
          label.setText("Button was clicked! 🎉");
          console.log("Button clicked!");
        });
        box.append(button);

        // Create a quit button
        const quitButton = new Button("Quit");
        quitButton.onClick(() => {
          this.#app.quit();
        });
        box.append(quitButton);

        this.#win.setChild(box);
        this.#win.present();
      }
    });
  }

  run(): number {
    return this.#app.run([]);
  }
}

// Main entry point
if (import.meta.main) {
  const app = new SimpleApp();
  const exitCode = app.run();
  Deno.exit(exitCode);
}
