import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function Currency(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1537_7562)">
        <Path
          d="M23 12a3.821 3.821 0 00-2.424-3.552 3.816 3.816 0 00-5.024-5.025 3.814 3.814 0 00-7.105 0 3.816 3.816 0 00-5.023 5.025 3.815 3.815 0 000 7.104 3.815 3.815 0 005.023 5.025 3.816 3.816 0 007.105 0 3.816 3.816 0 005.024-5.025A3.82 3.82 0 0023 11.999z"
          fill="#FFEF5E"
        />
        <Path
          d="M20.576 8.448a3.815 3.815 0 00-5.024-5.025 3.815 3.815 0 00-7.105 0 3.816 3.816 0 00-5.023 5.025 3.801 3.801 0 00-1.268 6.273 9.846 9.846 0 0119.687 0 3.801 3.801 0 00-1.267-6.273z"
          fill="#FFF9BF"
        />
        <Path
          d="M23 12a3.821 3.821 0 00-2.424-3.552 3.816 3.816 0 00-5.024-5.025 3.814 3.814 0 00-7.105 0 3.816 3.816 0 00-5.023 5.025 3.815 3.815 0 000 7.104 3.815 3.815 0 005.023 5.025 3.816 3.816 0 007.105 0 3.816 3.816 0 005.024-5.025A3.82 3.82 0 0023 11.999zM12.478 12v5.739"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.825 7.217L12.479 12 9.13 7.217M10.086 12.478h4.783M10.086 14.39h4.783"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1537_7562">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
