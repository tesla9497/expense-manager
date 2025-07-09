import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function TransactionNew(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1537_7563)">
        <Path
          d="M12.478 1H2.913A1.913 1.913 0 001 2.913v18.174A1.913 1.913 0 002.913 23h9.565a1.912 1.912 0 001.913-1.913V2.913A1.914 1.914 0 0012.478 1z"
          fill="#66E1FF"
        />
        <Path
          d="M14.391 3.958V2.913A1.914 1.914 0 0012.478 1H2.913A1.913 1.913 0 001 2.913v14.436L14.391 3.958z"
          fill="#C2F3FF"
        />
        <Path
          d="M23 7.696v9.565h-4.782a4.113 4.113 0 01-3.826-3.826h-2.87a1.913 1.913 0 110-3.826h2.87V4.348h1.31c.392.003.776.122 1.1.344l4.285 3.004H23z"
          fill="#FFDDA1"
        />
        <Path
          d="M21.086 7.696l-4.285-3.004a1.969 1.969 0 00-1.1-.344h-1.31v2.391h1.31c.392.003.776.123 1.1.345l4.285 3.003H23V7.696h-1.913z"
          fill="#FFDDA1"
        />
        <Path
          d="M1 19.174v1.913A1.913 1.913 0 002.913 23h9.565a1.913 1.913 0 001.913-1.913v-1.913H1z"
          fill="#fff"
        />
        <Path
          d="M14.39 4.348h1.311c.392 0 .775.12 1.096.346l4.29 3.002h1.912M23 17.26h-4.782a4.113 4.113 0 01-3.826-3.825h-2.87a1.913 1.913 0 010-3.826h5.26M14.391 19.174H1"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.696 21.326a.24.24 0 010-.478M7.695 21.326a.24.24 0 000-.478"
          stroke="#191919"
        />
        <Path
          d="M14.391 17.711v3.376A1.914 1.914 0 0112.478 23H2.913A1.913 1.913 0 011 21.087V2.913A1.913 1.913 0 012.913 1h9.565a1.913 1.913 0 011.913 1.913v6.696M7.695 3.87v4.304"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.26 5.783L7.697 3.87 9.13 5.783M7.695 16.304V12M9.13 14.391l-1.434 1.913-1.435-1.913"
          stroke="#191919"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1537_7563">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
