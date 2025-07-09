import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function TransferNew(props: any) {
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
        d="M24.5 7h-21m21 0l-4.667 4.667M24.5 7l-4.667-4.667M3.5 21h21m-21 0l4.667 4.667M3.5 21l4.667-4.667"
        stroke={props.color || "#4566B5"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
