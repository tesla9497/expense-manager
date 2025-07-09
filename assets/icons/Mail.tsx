import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Mail(props: any) {
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
        d="M2.333 7a2.333 2.333 0 012.334-2.333h18.666A2.333 2.333 0 0125.667 7v14a2.333 2.333 0 01-2.334 2.333H4.667A2.333 2.333 0 012.333 21V7z"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.333 9.333l8.752 7.001a4.667 4.667 0 005.83 0l8.752-7"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
