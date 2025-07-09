import { Pallets } from "./pallets";

export type BaseShades = {
  primary?: string;
  secondary?: string;
  teritory?: string;
  tonal?: string;
};

export type ButtonShades = {
  default?: string;
  hovered?: string;
  pressed?: string;
  disabled?: string;
  active?: string;
};

export type ColorShades = {
  blue: string;
  green: string;
  orange: string;
  brown: string;
  yellow: string;
};

export type ColorType = {
  base: BaseShades;
  background: {
    link: BaseShades;
    navbar: BaseShades;
    fail: BaseShades;
    success: BaseShades;
    input: BaseShades;
    transaction: BaseShades;
    account: ColorShades;
    navicon: BaseShades;
  };
  text: {
    primary: {
      default: string;
    };
    secondary: {
      default: string;
    };
    tertiary: {
      default: string;
    };
    linktext: {
      primary: string;
      disabled: string;
    };
    error: {
      primary: string;
    };
    success: {
      primary: string;
    };
    tonal: {
      default: string;
    };
  };
  stroke_border: {
    primary: string;
    secondary: string;
    teritory: string;
    tonal_red: string;
    tonal_green: string;
    tonal_blue: string;
  };
  icon: {
    primary: string;
    disabled: string;
  };
  button: {
    primary: ButtonShades;
    secondary: ButtonShades;
  };
  shadow: {
    primary: string;
    secondary: string;
  };
  calendar: {
    day: ButtonShades;
    year: ButtonShades;
    date: ButtonShades;
    background: BaseShades;
  };
  premium_card: {
    text: BaseShades;
    background: BaseShades;
  };
};

export const LightThemeColor: ColorType = {
  base: {
    primary: Pallets.tonalWhite[500],
    secondary: Pallets.lightGreen[50],
    teritory: Pallets.lightGreen[500],
    tonal: Pallets.tonalWhite[50],
  },
  background: {
    link: {
      primary: Pallets.info[500],
    },
    navbar: {
      primary: Pallets.lightGreen[50],
    },
    fail: {
      primary: Pallets.tonalRed[500],
    },
    success: {
      primary: Pallets.success[400],
      secondary: Pallets.success[700],
    },
    input: {
      primary: Pallets.tonalWhite[50],
    },
    transaction: {
      primary: Pallets.tonalWhite[50],
    },
    account: {
      blue: Pallets.account[1],
      green: Pallets.account[2],
      orange: Pallets.account[3],
      brown: Pallets.account[4],
      yellow: Pallets.account[5],
    },
    navicon: {
      primary: Pallets.tonalRed[500],
    },
  },
  text: {
    primary: {
      default: Pallets.darkGreen[500],
    },
    secondary: {
      default: Pallets.tonalWhite[50],
    },
    tertiary: {
      default: Pallets.darkGreen[200],
    },
    linktext: {
      primary: Pallets.info[700],
      disabled: Pallets.info[300],
    },
    error: {
      primary: Pallets.error[500],
    },
    success: {
      primary: Pallets.success[600],
    },
    tonal: {
      default: Pallets.grey[700],
    },
  },
  stroke_border: {
    primary: Pallets.grey[500],
    secondary: Pallets.lightGreen[500],
    teritory: Pallets.error[500],
    tonal_red: Pallets.tonalRed[600],
    tonal_green: Pallets.success[600],
    tonal_blue: Pallets.info[500],
  },
  icon: {
    primary: Pallets.lightGreen[500],
    disabled: Pallets.darkGreen[200],
  },
  button: {
    primary: {
      default: Pallets.lightGreen[500],
      hovered: Pallets.lightGreen[200],
      disabled: Pallets.lightGreen[100],
    },
    secondary: {
      default: Pallets.tonalRed[500],
      disabled: Pallets.tonalRed[200],
    },
  },
  shadow: {
    primary: Pallets.lightGreen[200],
    secondary: Pallets.tonalRed[100],
  },
  calendar: {
    day: {
      default: Pallets.lightGreen[500],
      hovered: Pallets.tonalRed[200],
      pressed: Pallets.tonalRed[500],
      disabled: Pallets.tonalRed[200],
    },
    year: {
      default: Pallets.lightGreen[500],
      hovered: Pallets.grey[100],
      pressed: Pallets.grey[100],
    },
    date: {
      default: Pallets.darkGreen[50],
      hovered: Pallets.lightGreen[200],
      pressed: Pallets.lightGreen[400],
      disabled: Pallets.darkGreen[200],
      active: Pallets.lightGreen[800],
    },
    background: {
      primary: Pallets.lightGreen[500],
    },
  },
  premium_card: {
    text: {
      primary: Pallets.tonalWhite[50],
      secondary: Pallets.warning[500],
      teritory: Pallets.grey[800],
    },
    background: {
      primary: Pallets.lightGreen[600],
      secondary: Pallets.darkGreen[600],
      teritory: Pallets.lightGreen[600],
    },
  },
};
