import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function Sad(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1537_7516)">
        <Path
          d="M12 23c6.072 0 10.994-4.922 10.994-10.994S18.072 1.012 12 1.012 1.006 5.934 1.006 12.006 5.928 23 12 23z"
          fill="#FFEF5E"
        />
        <Path
          d="M12 4.836a11.793 11.793 0 0110.988 7.513c0-.115.006-.228.006-.343a10.995 10.995 0 10-21.982.343A11.793 11.793 0 0112 4.836z"
          fill="#FFF9BF"
        />
        <Path
          d="M12 23c6.072 0 10.994-4.922 10.994-10.994S18.072 1.012 12 1.012 1.006 5.934 1.006 12.006 5.928 23 12 23zM7.698 7.226v2.868M6.264 8.66h2.868M16.302 7.226v2.868M14.868 8.66h2.868"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.22 17.742v-.956a2.39 2.39 0 114.78 0 2.39 2.39 0 104.78 0v-.956"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1537_7516">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
