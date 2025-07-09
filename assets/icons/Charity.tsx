import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function Charity(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1537_7539)">
        <Path
          d="M6.739 20.13h11.478V4.827a.957.957 0 00-.956-.956H5.782v15.304a.957.957 0 00.957.957z"
          fill="#E3E3E3"
        />
        <Path
          d="M17.96 4.184a.948.948 0 00-.7-.314H5.783v12.494l12.179-12.18z"
          fill="#fff"
        />
        <Path
          d="M6.739 20.13h11.478V4.827a.957.957 0 00-.956-.956H5.782v15.304a.957.957 0 00.957.957z"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M23 21.565l-.956-1.85v-4.367c.04-1.7-1.991-3.217-3.827-4.783v5.211l-.987-1.009a1.192 1.192 0 00-1.953.357 1.191 1.191 0 00.247 1.305l2.693 2.745v1.435c.147.855.473 1.67.957 2.391"
          fill="#FFDDA1"
        />
        <Path
          d="M23 21.565l-.956-1.85v-4.367c.04-1.7-1.991-3.217-3.827-4.783v5.211l-.987-1.009a1.192 1.192 0 00-1.953.357 1.191 1.191 0 00.247 1.305l2.693 2.745v1.435c.147.855.473 1.67.957 2.391M19.67 17.26l-1.453-1.484"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1 2.435l.957 1.85v4.367c-.04 1.7 1.99 3.217 3.826 4.783V8.224l.987 1.009A1.191 1.191 0 108.476 7.57L5.783 4.826V3.391A6.144 6.144 0 004.826 1"
          fill="#FFDDA1"
        />
        <Path
          d="M1 2.435l.957 1.85v4.367c-.04 1.7 1.99 3.217 3.826 4.783V8.224l.987 1.009A1.191 1.191 0 108.476 7.57L5.783 4.826V3.391A6.144 6.144 0 004.826 1M4.33 6.74l1.452 1.484"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1537_7539">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
