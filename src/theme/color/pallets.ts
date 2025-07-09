type ColorShades =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

type ColorPallet = {
  [key in ColorShades]: string;
};

type ColorType = "1" | "2" | "3" | "4" | "5";

type ColorTypePallet = {
  [key in ColorType]: string;
};

export type PalletType = {
  darkGreen: ColorPallet;
  lightGreen: ColorPallet;
  grey: ColorPallet;
  tonalRed: ColorPallet;
  tonalWhite: ColorPallet;
  success: ColorPallet;
  warning: ColorPallet;
  info: ColorPallet;
  error: ColorPallet;
  account: ColorTypePallet;
};

// Define the actual color pallet
export const Pallets: PalletType = {
  darkGreen: {
    50: "#e9eaea",
    100: "#bbbfbe",
    200: "#9b9f9e",
    300: "#6d7472",
    400: "#515956",
    500: "#252f2c",
    600: "#222b28",
    700: "#1a211f",
    800: "#141a18",
    900: "#101412",
  },
  lightGreen: {
    50: "#edefee",
    100: "#c6ccca",
    200: "#aab3b0",
    300: "#83908c",
    400: "#6b7b76",
    500: "#465a54",
    600: "#40524c",
    700: "#32403c",
    800: "#27322e",
    900: "#1d2623",
  },
  grey: {
    50: "#fdfdfd",
    100: "#f9f9f7",
    200: "#f6f6f4",
    300: "#f2f2ee",
    400: "#efefeb",
    500: "#ebebe6",
    600: "#d6d6d1",
    700: "#a7a7a3",
    800: "#81817f",
    900: "#636361",
  },
  tonalRed: {
    50: "#fff3f2",
    100: "#ffdad8",
    200: "#ffc8c5",
    300: "#ffafaa",
    400: "#ffa099",
    500: "#ff8880",
    600: "#e87c74",
    700: "#b5615b",
    800: "#8c4b46",
    900: "#6b3936",
  },
  tonalWhite: {
    50: "#fffffe",
    100: "#fdfdfd",
    200: "#fdfdfc",
    300: "#fcfcfb",
    400: "#fbfbfa",
    500: "#fafaf9",
    600: "#e4e4e3",
    700: "#b2b2b1",
    800: "#8a8a89",
    900: "#696969",
  },
  success: {
    50: "#f0f9ee",
    100: "#cfeecb",
    200: "#b8e5b2",
    300: "#97d98e",
    400: "#83d279",
    500: "#64c757",
    600: "#5bb54f",
    700: "#478d3e",
    800: "#376d30",
    900: "#2a5425",
  },
  warning: {
    50: "#fff5ed",
    100: "#fee1c6",
    200: "#fdd2aa",
    300: "#fcbe83",
    400: "#fcb16b",
    500: "#fb9e46",
    600: "#e49040",
    700: "#b27032",
    800: "#8a5727",
    900: "#69421d",
  },
  info: {
    50: "#eff4ff",
    100: "#ceddff",
    200: "#b6ccff",
    300: "#95b5ff",
    400: "#81a6ff",
    500: "#6190ff",
    600: "#5883e8",
    700: "#4566b5",
    800: "#354f8c",
    900: "#293c6b",
  },
  error: {
    50: "#fdeef0",
    100: "#f9cacf",
    200: "#f6b1b8",
    300: "#f28d97",
    400: "#f07783",
    500: "#ec5564",
    600: "#d74d5b",
    700: "#a83c47",
    800: "#822f37",
    900: "#63242a",
  },
  account: {
    1: "#52A9C7",
    2: "#81AD51",
    3: "#F3A964",
    4: "#AB886D",
    5: "#EAC948",
  },
};
