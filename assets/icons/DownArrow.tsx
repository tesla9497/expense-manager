import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function DownArrow(props: any) {
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
        d="M4.667 10.5L14 19.833l9.333-9.333"
        stroke="#000"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
