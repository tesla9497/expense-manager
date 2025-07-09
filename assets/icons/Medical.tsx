import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function Medical(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1537_7540)">
        <Path
          d="M20.13 8.423v13.62a.956.956 0 01-.956.957H4.826a.956.956 0 01-.956-.956V8.423L12 1l8.13 7.423z"
          fill="#FFBFC5"
        />
        <Path
          d="M12 1L3.87 8.423v3.826L12 4.826l8.13 7.423V8.423L12 1z"
          fill="#FF808C"
        />
        <Path
          d="M20.13 8.423v13.62a.956.956 0 01-.956.957H4.826a.956.956 0 01-.956-.956V8.423L12 1l8.13 7.423z"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.305 12.956a.478.478 0 00-.479-.478h-2.391v-2.391a.479.479 0 00-.478-.478h-1.913a.478.478 0 00-.479.478v2.391h-2.39a.479.479 0 00-.48.478v1.914a.478.478 0 00.48.478h2.39v2.391a.479.479 0 00.479.478h1.913a.478.478 0 00.478-.478v-2.391h2.391a.479.479 0 00.479-.479v-1.913z"
          fill="#fff"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M23 11.043l-2.87-2.62M3.87 8.423L1 11.043"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1537_7540">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
