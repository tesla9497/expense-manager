import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Delete(props: any) {
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
        d="M4.667 7h18.666L21.49 23.59a2.334 2.334 0 01-2.32 2.077H8.83a2.333 2.333 0 01-2.32-2.077L4.667 7zM8.57 3.671a2.333 2.333 0 012.11-1.338h6.64a2.333 2.333 0 012.112 1.338L21 7H7L8.57 3.67zM2.333 7h23.334M11.667 12.833v5.834M16.333 12.833v5.834"
        stroke={props.color || "#EC5564"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
