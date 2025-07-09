import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Transfer(props: any) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M27 17c0 6-4.39 10-9.806 10C12.792 27 9.24 24.665 8 21M7 17c0-6 4.39-10 9.806-10C21.209 7 24.76 9.335 26 13"
        stroke="#000"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 22l-4-1-1 4M22 12l4 1 1-4"
        stroke="#000"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
