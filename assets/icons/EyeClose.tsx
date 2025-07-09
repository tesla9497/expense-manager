import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function EyeClose(props: any) {
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
        d="M8.018 19.984c-2.152-1.529-3.855-3.517-4.818-4.772a1.975 1.975 0 010-2.423C4.942 10.515 9.121 5.833 14 5.833c2.189 0 4.235.942 5.985 2.187"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.485 11.535a3.499 3.499 0 00-5.995 2.468 3.5 3.5 0 001.045 2.48M4.667 23.333L23.333 4.667M11.667 21.821a8.31 8.31 0 002.333.346c4.879 0 9.058-4.682 10.8-6.956a1.976 1.976 0 00-.001-2.424 26.734 26.734 0 00-1.967-2.287"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
