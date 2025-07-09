import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Crown(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.348 18.695L2.39 8.01s1.001 4.947 4.827 4.947 4.782-6.696 4.782-6.696.957 6.696 4.783 6.696c3.826 0 4.827-4.872 4.827-4.872l-1.958 10.61H4.348z"
        fill="#FFEF5E"
      />
      <Path
        d="M12 6.261s-.957 6.696-4.783 6.696c-3.826 0-4.827-4.947-4.827-4.947l1.958 10.685h7.651V6.261z"
        fill="#FFF9BF"
      />
      <Path
        d="M12 6.261a1.913 1.913 0 10.001-3.826 1.913 1.913 0 000 3.826z"
        fill="#FF808C"
      />
      <Path
        d="M10.647 5.7a1.913 1.913 0 012.705-2.704L10.647 5.7z"
        fill="#FFBFC5"
      />
      <Path
        d="M2.435 8.014a1.435 1.435 0 100-2.869 1.435 1.435 0 000 2.87zM21.566 8.095a1.435 1.435 0 100-2.87 1.435 1.435 0 000 2.87z"
        fill="#FF808C"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.349 21.565h15.303M4.348 18.695L2.39 8.01s1.001 4.947 4.827 4.947 4.782-6.696 4.782-6.696.957 6.696 4.783 6.696c3.826 0 4.827-4.872 4.827-4.872l-1.958 10.61H4.348z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 6.261a1.913 1.913 0 10.001-3.826 1.913 1.913 0 000 3.826z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
