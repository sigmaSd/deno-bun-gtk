// GType fundamental types
export const G_TYPE_INVALID = 0 << 2;
export const G_TYPE_NONE = 1 << 2;
export const G_TYPE_INTERFACE = 2 << 2;
export const G_TYPE_CHAR = 3 << 2;
export const G_TYPE_UCHAR = 4 << 2;
export const G_TYPE_BOOLEAN = 5 << 2;
export const G_TYPE_INT = 6 << 2;
export const G_TYPE_UINT = 7 << 2;
export const G_TYPE_LONG = 8 << 2;
export const G_TYPE_ULONG = 9 << 2;
export const G_TYPE_INT64 = 10 << 2;
export const G_TYPE_UINT64 = 11 << 2;
export const G_TYPE_ENUM = 12 << 2;
export const G_TYPE_FLAGS = 13 << 2;
export const G_TYPE_FLOAT = 14 << 2;
export const G_TYPE_DOUBLE = 15 << 2;
export const G_TYPE_STRING = 16 << 2;
export const G_TYPE_POINTER = 17 << 2;
export const G_TYPE_BOXED = 18 << 2;
export const G_TYPE_PARAM = 19 << 2;
export const G_TYPE_OBJECT = 20 << 2;
export const G_TYPE_VARIANT = 21 << 2;

// GTK Orientation enum
export const GTK_ORIENTATION_HORIZONTAL = 0;
export const GTK_ORIENTATION_VERTICAL = 1;

// Adwaita color scheme enum
export const ADW_COLOR_SCHEME_DEFAULT = 0;
export const ADW_COLOR_SCHEME_FORCE_LIGHT = 1;
export const ADW_COLOR_SCHEME_FORCE_DARK = 2;

// GTK Align enum
export const GTK_ALIGN_FILL = 0;
export const GTK_ALIGN_START = 1;
export const GTK_ALIGN_END = 2;
export const GTK_ALIGN_CENTER = 3;
export const GTK_ALIGN_BASELINE = 4;

// GTK SelectionMode enum
export const GTK_SELECTION_NONE = 0;
export const GTK_SELECTION_SINGLE = 1;
export const GTK_SELECTION_BROWSE = 2;
export const GTK_SELECTION_MULTIPLE = 3;

export const GTK_APPLICATION_INHIBIT_LOGOUT = 1;
export const GTK_APPLICATION_INHIBIT_SWITCH = 2;
export const GTK_APPLICATION_INHIBIT_SUSPEND = 4;
export const GTK_APPLICATION_INHIBIT_IDLE = 8;

// Response appearance constants
export const ADW_RESPONSE_DEFAULT = 0;
export const ADW_RESPONSE_SUGGESTED = 1;
export const ADW_RESPONSE_DESTRUCTIVE = 2;

// Export constants objects
export const Orientation = {
  HORIZONTAL: GTK_ORIENTATION_HORIZONTAL,
  VERTICAL: GTK_ORIENTATION_VERTICAL,
};

export const Align = {
  FILL: GTK_ALIGN_FILL,
  START: GTK_ALIGN_START,
  END: GTK_ALIGN_END,
  CENTER: GTK_ALIGN_CENTER,
  BASELINE: GTK_ALIGN_BASELINE,
};

export const SelectionMode = {
  NONE: GTK_SELECTION_NONE,
  SINGLE: GTK_SELECTION_SINGLE,
  BROWSE: GTK_SELECTION_BROWSE,
  MULTIPLE: GTK_SELECTION_MULTIPLE,
};
