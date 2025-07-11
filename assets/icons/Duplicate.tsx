import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Duplicate(props) {
  return (
    <Svg
      data-name="Layer 1"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M27.2 8.22h-3.42v-2.8A3.42 3.42 0 0020.36 2H5.42A3.42 3.42 0 002 5.42v14.94a3.43 3.43 0 003.42 3.42h2.8v3.42A2.81 2.81 0 0011 30h16.2a2.81 2.81 0 002.8-2.8V11a2.81 2.81 0 00-2.8-2.78zM5.42 21.91a1.55 1.55 0 01-1.55-1.55V5.42a1.54 1.54 0 011.55-1.55h14.94a1.55 1.55 0 011.55 1.55v2.8H11A2.81 2.81 0 008.22 11v10.91zm22.71 5.29a.93.93 0 01-.93.93H11a.93.93 0 01-.93-.93V11a.93.93 0 01.93-.93h16.2a.93.93 0 01.93.93z"
        fill={props.color || "#000"}
      />
    </Svg>
  );
}
