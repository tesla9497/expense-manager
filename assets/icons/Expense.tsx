import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Expense(props: any) {
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
        d="M21 7L7 21M9.333 7H21v11.667"
        stroke={props.color || "#EC5564"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
