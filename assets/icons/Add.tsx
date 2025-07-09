import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Add(props: any) {
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
        d="M14 23.333V14m0 0V4.667M14 14h9.333M14 14H4.667"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
