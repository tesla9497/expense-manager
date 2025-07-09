import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Edit(props: any) {
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
        d="M19.22 6.31l2.47 2.47m-.881-4.646l-6.682 6.681c-.345.345-.58.784-.677 1.262l-.617 3.09 3.09-.619c.478-.095.917-.33 1.262-.675l6.681-6.682a2.163 2.163 0 10-3.057-3.057z"
        stroke="#4566B5"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.167 17.5V21a2.333 2.333 0 01-2.334 2.333H7A2.333 2.333 0 014.667 21V8.167A2.333 2.333 0 017 5.833h3.5"
        stroke="#4566B5"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
