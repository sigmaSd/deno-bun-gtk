#!/usr/bin/env -S deno run --allow-ffi --allow-net

import {
  Application,
  ApplicationWindow,
  Box,
  Button,
  GTK_ORIENTATION_VERTICAL,
  Label,
} from "@sigmasd/gtk";
import { EventLoop } from "../src/eventloop.ts";

const APP_ID = "com.example.AsyncDemo";
const APP_FLAGS = 0;

class AsyncDemoApp {
  #app: Application;
  #eventLoop: EventLoop;
  #statusLabel?: Label;

  constructor() {
    this.#app = new Application(APP_ID, APP_FLAGS);
    this.#eventLoop = new EventLoop({ pollInterval: 16 });

    this.#app.connect("activate", () => {
      this.#buildUI();
    });
  }

  #buildUI() {
    const win = new ApplicationWindow(this.#app);
    win.setTitle("Async/Await Demo");
    win.setDefaultSize(500, 400);

    const box = new Box(GTK_ORIENTATION_VERTICAL, 12);
    box.setMarginTop(24);
    box.setMarginBottom(24);
    box.setMarginStart(24);
    box.setMarginEnd(24);

    // Title
    const title = new Label("GTK + Deno Event Loop Demo");
    title.setProperty("wrap", true);
    box.append(title);

    // Status label
    this.#statusLabel = new Label("Ready to make async calls...");
    this.#statusLabel.setProperty("wrap", true);
    this.#statusLabel.setMarginTop(12);
    this.#statusLabel.setMarginBottom(12);
    box.append(this.#statusLabel);

    // Fetch button
    const fetchButton = new Button("Fetch from API");
    fetchButton.connect("clicked", async () => {
      await this.#fetchData();
    });
    box.append(fetchButton);

    // Timeout button
    const timeoutButton = new Button("Delayed Action (3s)");
    timeoutButton.connect("clicked", async () => {
      await this.#delayedAction();
    });
    box.append(timeoutButton);

    // Multiple async operations button
    const multiButton = new Button("Multiple Async Operations");
    multiButton.connect("clicked", async () => {
      await this.#multipleOperations();
    });
    box.append(multiButton);

    // Quit button
    const quitButton = new Button("Quit");
    quitButton.connect("clicked", () => {
      this.#eventLoop.stop();
    });
    box.append(quitButton);

    // Handle window close event (Alt+F4, etc.)
    win.connect("close-request", () => {
      console.log("Window closed, stopping event loop...");
      this.#eventLoop.stop();
      return false;
    });

    win.setChild(box);
    win.setProperty("visible", true);
  }

  async #fetchData() {
    try {
      this.#updateStatus("Fetching data from API...");

      const response = await fetch(
        "https://api.github.com/repos/denoland/deno",
      );
      const data = await response.json();

      this.#updateStatus(
        `✅ Fetched: ${data.name}\n` +
          `⭐ Stars: ${data.stargazers_count}\n` +
          `🍴 Forks: ${data.forks_count}\n` +
          `📝 Description: ${data.description}`,
      );
    } catch (error) {
      this.#updateStatus(`❌ Error: ${error}`);
    }
  }

  async #delayedAction() {
    this.#updateStatus("Waiting 3 seconds...");

    // This works because EventLoop integrates with Deno's event loop
    await new Promise((resolve) => setTimeout(resolve, 3000));

    this.#updateStatus("✅ 3 seconds elapsed!");
  }

  async #multipleOperations() {
    this.#updateStatus("Running multiple async operations...");

    try {
      // Run multiple fetch operations in parallel
      const [response1, response2] = await Promise.all([
        fetch("https://api.github.com/repos/denoland/deno"),
        fetch("https://api.github.com/repos/denoland/std"),
      ]);

      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json(),
      ]);

      this.#updateStatus(
        `✅ Fetched two repos:\n\n` +
          `1. ${data1.name} (⭐ ${data1.stargazers_count})\n` +
          `2. ${data2.name} (⭐ ${data2.stargazers_count})`,
      );
    } catch (error) {
      this.#updateStatus(`❌ Error: ${error}`);
    }
  }

  #updateStatus(message: string) {
    console.log(`[STATUS] ${message}`);
    if (this.#statusLabel) {
      this.#statusLabel.setText(message);
    }
  }

  async run(): Promise<void> {
    console.log("Starting Async Demo Application");
    console.log("Using EventLoop for async/await support");

    // Use eventLoop.start() instead of app.run()
    // This allows async/await to work properly!
    await this.#eventLoop.start(this.#app);

    console.log("Application exited");
  }
}

// Main entry point
if (import.meta.main) {
  const app = new AsyncDemoApp();
  await app.run();
  Deno.exit(0);
}
