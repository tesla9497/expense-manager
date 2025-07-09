import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function CreditCard(props: any) {
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
        d="M21.087 4.348H2.913A1.919 1.919 0 001 6.26v11.478a1.919 1.919 0 001.913 1.913h18.174A1.913 1.913 0 0023 17.74V6.261a1.913 1.913 0 00-1.913-1.913z"
        fill="#FFEF5E"
      />
      <Path
        d="M2.913 4.348A1.919 1.919 0 001 6.26v11.478a1.918 1.918 0 001.572 1.879l15.272-15.27H2.913z"
        fill="#FFF9BF"
      />
      <Path
        d="M23 6.26v1.914H1V6.261a1.919 1.919 0 011.913-1.913h18.174A1.913 1.913 0 0123 6.26zM23 8.174v9.565a1.913 1.913 0 01-1.913 1.913H2.913A1.919 1.919 0 011 17.74V8.174h22zM20.138 12h-2.87M11.53 12H3.877M6.747 14.87h-2.87"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
