import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Password(props: any) {
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
        d="M22.167 11.667H5.833A2.333 2.333 0 003.5 14v9.333a2.333 2.333 0 002.333 2.334h16.334a2.333 2.333 0 002.333-2.334V14a2.333 2.333 0 00-2.333-2.333zM7 7a3.5 3.5 0 013.5-3.5h7A3.5 3.5 0 0121 7v4.667H7V7z"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
