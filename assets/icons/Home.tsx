import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Home(props: any) {
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
        d="M24.5 22.167V14.31a4.667 4.667 0 00-1.453-3.383l-7.44-7.066a2.334 2.334 0 00-3.213 0l-7.442 7.066A4.668 4.668 0 003.5 14.311v7.856A2.333 2.333 0 005.833 24.5h16.334a2.334 2.334 0 002.333-2.333z"
        stroke={props.color || "#252F2C"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 17.5a2.333 2.333 0 012.333-2.333h2.334A2.333 2.333 0 0117.5 17.5v7h-7v-7z"
        stroke={props.color || "#252F2C"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
