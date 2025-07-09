import { FontSize, FontSizeType } from "./fontSize";
import { FontWeight, FontWeightType } from "./fontWeight";

export const FontFamily = "Raleway";

type FontStyleType = {
  fontSize: FontSizeType[keyof FontSizeType];
  fontWeight: FontWeightType[keyof FontWeightType];
};

export type TypographySizeType = {
  large: FontStyleType;
  large_promenent?: FontStyleType;
  medium: FontStyleType;
  medium_promenent?: FontStyleType;
  small: FontStyleType;
  small_promenent?: FontStyleType;
};

export type TypographyType = {
  display: TypographySizeType;
  headline: TypographySizeType;
  title: TypographySizeType;
  body: TypographySizeType;
  label: TypographySizeType;
};

export const Typography: TypographyType = {
  display: {
    large: {
      fontSize: FontSize[57],
      fontWeight: FontWeight.bold,
    },
    medium: {
      fontSize: FontSize[45],
      fontWeight: FontWeight.bold,
    },
    small: {
      fontSize: FontSize[36],
      fontWeight: FontWeight.bold,
    },
  },
  headline: {
    large: {
      fontSize: FontSize[32],
      fontWeight: FontWeight.semiBold,
    },
    medium: {
      fontSize: FontSize[28],
      fontWeight: FontWeight.semiBold,
    },
    small: {
      fontSize: FontSize[24],
      fontWeight: FontWeight.semiBold,
    },
  },
  title: {
    large: {
      fontSize: FontSize[22],
      fontWeight: FontWeight.semiBold,
    },
    medium: {
      fontSize: FontSize[16],
      fontWeight: FontWeight.bold,
    },
    small: {
      fontSize: FontSize[14],
      fontWeight: FontWeight.bold,
    },
  },
  body: {
    large: {
      fontSize: FontSize[16],
      fontWeight: FontWeight.medium,
    },
    medium: {
      fontSize: FontSize[14],
      fontWeight: FontWeight.medium,
    },
    small: {
      fontSize: FontSize[12],
      fontWeight: FontWeight.medium,
    },
  },
  label: {
    large: {
      fontSize: FontSize[14],
      fontWeight: FontWeight.regular,
    },
    large_promenent: {
      fontSize: FontSize[14],
      fontWeight: FontWeight.semiBold,
    },
    medium: {
      fontSize: FontSize[12],
      fontWeight: FontWeight.regular,
    },
    medium_promenent: {
      fontSize: FontSize[12],
      fontWeight: FontWeight.semiBold,
    },
    small: {
      fontSize: FontSize[11],
      fontWeight: FontWeight.regular,
    },
  },
};
