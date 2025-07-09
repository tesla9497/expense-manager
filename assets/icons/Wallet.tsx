import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function Wallet(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1537_7501)">
        <Path
          d="M17.26 8.938v11.478a2.181 2.181 0 01-2.793 2.21L3.793 20.11A3.81 3.81 0 011 16.59V4.156c0-.726.277-1.423.775-1.951v-.01l12.702 3.176a3.879 3.879 0 012.783 3.567z"
          fill="#FFDDA1"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M23 4.156v10.521a2.88 2.88 0 01-2.869 2.87h-2.87V8.937a3.879 3.879 0 00-2.783-3.567L1.776 2.195a2.852 2.852 0 012.095-.909h16.26a2.87 2.87 0 012.87 2.87z"
          fill="#FFBC44"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.608 4.156h9.565"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.956 15.633a1.913 1.913 0 100-3.826 1.913 1.913 0 000 3.826z"
          fill="#FFEF5E"
        />
        <Path
          d="M12.956 13.348a1.913 1.913 0 011.75 1.141 1.912 1.912 0 10-3.5 0 1.913 1.913 0 011.75-1.14z"
          fill="#FFF9BF"
        />
        <Path
          d="M12.956 15.633a1.913 1.913 0 100-3.826 1.913 1.913 0 000 3.826zM17.26 8.938h1.914"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1537_7501">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
