import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Income(props: any) {
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
        d="M21 21L7 7M9.333 21H21V9.333"
        stroke={props.color || "#5BB54F"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
