import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function Deleted(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1537_7560)">
        <Path
          d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"
          fill="#FFEF5E"
        />
        <Path
          d="M12 4.826a11.8 11.8 0 0110.994 7.517c0-.114.006-.228.006-.343a11 11 0 10-21.994.343A11.8 11.8 0 0112 4.826z"
          fill="#FFF9BF"
        />
        <Path
          d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zM7.696 18.696a4.304 4.304 0 118.609 0"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.74 10.326a.24.24 0 010-.478M6.74 10.326a.24.24 0 000-.478M17.262 10.326a.24.24 0 010-.478M17.262 10.326a.24.24 0 000-.478"
          stroke="#191919"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1537_7560">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
