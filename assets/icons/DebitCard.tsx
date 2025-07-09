import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function DebitCard(props: any) {
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
        d="M1 5.783A1.913 1.913 0 012.913 3.87h18.174A1.913 1.913 0 0123 5.783v12.435a1.913 1.913 0 01-1.913 1.913H2.913A1.913 1.913 0 011 18.218V5.783z"
        fill="#66E1FF"
      />
      <Path
        d="M2.913 3.87A1.913 1.913 0 001 5.783v12.435c0 .497.195.975.543 1.332L17.224 3.87H2.913z"
        fill="#C2F3FF"
      />
      <Path
        d="M1 5.783A1.913 1.913 0 012.913 3.87h18.174A1.913 1.913 0 0123 5.783v12.435a1.913 1.913 0 01-1.913 1.913H2.913A1.913 1.913 0 011 18.218V5.783z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.26 10.086h1.225l.346 3.443a.429.429 0 00.813.142l1.774-3.69M11.148 10.058l-.774 3.886M14.705 10.013s-1.315-.344-1.763.404c-.45.748.254 1.225.717 1.51.463.283.972.717.837 1.225-.135.508-.702 1.256-2.2.732M15.827 13.943l1.798-3.625a.418.418 0 01.79.152l.287 3.413M16.395 12.794h2.226"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
