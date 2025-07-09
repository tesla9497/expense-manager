import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function ArrowBackward(props: any) {
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
        d="M23.333 14H4.667M12.833 5.833L4.667 14l8.166 8.167"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
