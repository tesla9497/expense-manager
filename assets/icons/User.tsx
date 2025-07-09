import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function User(props: any) {
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
        d="M14 25.667c6.443 0 11.667-5.224 11.667-11.667S20.443 2.333 14 2.333 2.333 7.557 2.333 14 7.557 25.667 14 25.667zM9.333 10.558v-.116M18.667 10.558v-.116"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.667 16.333c-.584 1.75-2.089 3.5-4.667 3.5s-4.083-1.75-4.667-3.5"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
