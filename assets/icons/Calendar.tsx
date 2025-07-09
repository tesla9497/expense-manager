import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Calendar(props: any) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21 4.667H7a4.667 4.667 0 00-4.667 4.666V21A4.667 4.667 0 007 25.667h14A4.667 4.667 0 0025.667 21V9.333A4.667 4.667 0 0021 4.667zM9.333 2.333V7M18.667 2.333V7M2.333 11.667h23.334"
        stroke="#000"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
