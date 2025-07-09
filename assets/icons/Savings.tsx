import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Savings(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.74 3.383a.478.478 0 01.478-.478h13.39a.478.478 0 01.48.478v6.695a.478.478 0 01-.48.479H7.219a.478.478 0 01-.479-.479V3.383z"
        fill="#78EB7B"
      />
      <Path
        d="M7.218 2.905a.478.478 0 00-.479.478v6.695a.478.478 0 00.479.479h2.801l7.652-7.652H7.218z"
        fill="#C9F7CA"
      />
      <Path
        d="M6.74 3.383a.478.478 0 01.478-.478h13.39a.478.478 0 01.48.478v6.695a.478.478 0 01-.48.479H7.219a.478.478 0 01-.479-.479V3.383zM16.827 2.905l4.264 3.347M17.43 10.557l3.662-3.348M6.74 7.209l3.66 3.348M6.74 6.252l4.243-3.347"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.913 8.165a1.435 1.435 0 100-2.87 1.435 1.435 0 000 2.87z"
        fill="#fff"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.13 15.356l-4.228 1.405h-.01a.962.962 0 00-1.022-1.408H12a6.303 6.303 0 00-4.304-1.913h-2.87L1 15.353v5.739L4.826 18.7c10.262 3.422 6.477 3.456 18.174-2.39a2.64 2.64 0 00-2.87-.954z"
        fill="#FFDDA1"
      />
      <Path
        d="M15.902 16.76l4.228-1.404a2.64 2.64 0 012.87.957c-11.697 5.847-7.912 5.813-18.174 2.391L1 21.096"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.609 17.266h5.26a.971.971 0 100-1.913H12a6.303 6.303 0 00-4.304-1.913h-2.87L1 15.353"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
