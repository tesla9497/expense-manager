import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Save(props: any) {
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
        d="M8.167 24.5h11.666a4.667 4.667 0 004.667-4.667V8.65c0-.31-.123-.606-.342-.825l-3.983-3.983a1.167 1.167 0 00-.825-.342H8.167A4.667 4.667 0 003.5 8.167v11.666A4.667 4.667 0 008.167 24.5z"
        stroke={props.color || "#000"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 3.5h7V7a1.167 1.167 0 01-1.167 1.167h-4.666A1.167 1.167 0 0110.5 7V3.5zM19.833 24.5v-8.167a1.166 1.166 0 00-1.166-1.166H9.333a1.167 1.167 0 00-1.166 1.166V24.5M12.833 19.833h2.334"
        stroke={props.color || "#000"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
