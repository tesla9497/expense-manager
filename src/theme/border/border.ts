export type BorderType = {
  size: {
    xs: number;
    s: number;
    m: number;
    l: number;
  };
  radius: {
    x0: number;
    x1: number;
    x2: number;
    x3: number;
    x4: number;
    x5: number;
    x6: number;
    x7: number;
    x8: number;
    x9: number;
    x10: number;
  };
};

export const Border: BorderType = {
  size: {
    xs: 0.5,
    s: 1,
    m: 1.5,
    l: 2,
  },
  radius: {
    x0: 0,
    x1: 2,
    x2: 4,
    x3: 8,
    x4: 12,
    x5: 16,
    x6: 20,
    x7: 28,
    x8: 36,
    x9: 44,
    x10: 999,
  },
};
