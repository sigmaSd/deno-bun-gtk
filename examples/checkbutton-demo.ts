import {
  Application,
  ApplicationFlags,
  ApplicationWindow,
  Box,
  CheckButton,
  Label,
  Orientation,
} from "@sigmasd/gtk/gtk4";

const app = new Application(
  "com.example.CheckButtonDemo",
  ApplicationFlags.NONE,
);

app.onActivate(() => {
  const win = new ApplicationWindow(app);
  win.setTitle("CheckButton Demo");
  win.setDefaultSize(300, 200);

  const box = new Box(Orientation.VERTICAL, 10);
  box.setMarginTop(20);
  box.setMarginBottom(20);
  box.setMarginStart(20);
  box.setMarginEnd(20);

  const statusLabel = new Label("Status: Inactive");

  const checkButton = new CheckButton("Enable Feature");
  checkButton.onToggled(() => {
    const isActive = checkButton.getActive();
    console.log(`CheckButton toggled: ${isActive}`);
    statusLabel.setText(`Status: ${isActive ? "Active" : "Inactive"}`);
  });

  const checkButton2 = new CheckButton("Grouped Option 1");
  const checkButton3 = new CheckButton("Grouped Option 2");
  checkButton3.setGroup(checkButton2);

  box.append(statusLabel);
  box.append(checkButton);
  box.append(checkButton2);
  box.append(checkButton3);

  win.setChild(box);
  win.present();
});

app.run([]);
