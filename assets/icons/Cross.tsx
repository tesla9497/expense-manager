import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Cross(props: any) {
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
        d="M23.333 23.333L4.667 4.667m18.666 0L4.667 23.333"
        stroke="#000"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
