import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";

export function CustomCategories(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1537_7548)">
        <Mask
          id="a"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <Path d="M0 0h24v24H0V0z" fill="#fff" />
        </Mask>
        <G mask="url(#a)">
          <Path
            d="M17.298 14.817l5.394 2.344a.512.512 0 010 .939l-10.486 4.562a.51.51 0 01-.41 0l-10.488-4.56a.512.512 0 010-.939l5.394-2.346"
            fill="#FFEF5E"
          />
          <Path
            d="M17.298 9.187l5.394 2.344a.512.512 0 010 .939l-10.486 4.562a.513.513 0 01-.41 0l-10.488-4.56a.512.512 0 010-.939l5.394-2.346"
            fill="#66E1FF"
          />
          <Path
            d="M12.206 11.397a.518.518 0 01-.41 0L1.309 6.837a.512.512 0 010-.936l10.487-4.563a.511.511 0 01.41 0L22.691 5.9a.512.512 0 010 .939l-10.486 4.557z"
            fill="#FF808C"
          />
          <Path
            d="M17.298 14.817l5.394 2.344a.512.512 0 010 .939l-10.486 4.562a.51.51 0 01-.41 0l-10.488-4.56a.512.512 0 010-.939l5.394-2.346"
            stroke="#191919"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M17.298 9.187l5.394 2.344a.512.512 0 010 .939l-10.486 4.562a.513.513 0 01-.41 0l-10.488-4.56a.512.512 0 010-.939l5.394-2.346"
            stroke="#191919"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12.206 11.397a.518.518 0 01-.41 0L1.309 6.837a.512.512 0 010-.936l10.487-4.563a.511.511 0 01.41 0L22.691 5.9a.512.512 0 010 .939l-10.486 4.557z"
            stroke="#191919"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_1537_7548">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
