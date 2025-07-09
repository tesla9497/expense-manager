import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Expand(props: any) {
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
        d="M9.333 19.833L14 24.5l4.667-4.667M9.333 8.167L14 3.5l4.667 4.667"
        stroke="#000"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
