import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Right(props: any) {
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
        d="M9.333 4.667L18.667 14l-9.334 9.333"
        stroke={props.color || "#252F2C"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
