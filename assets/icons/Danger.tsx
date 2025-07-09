import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Danger(props: any) {
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
        d="M2.913 1.957A.957.957 0 013.87 1h16.26a.956.956 0 01.957.957v5.991A17.008 17.008 0 0112 23 17.006 17.006 0 012.913 7.948V1.957z"
        fill="#FF808C"
      />
      <Path
        d="M12 1H3.87a.957.957 0 00-.957.957v5.991A17.007 17.007 0 0012 23V1z"
        fill="#FFBFC5"
      />
      <Path
        d="M2.913 1.957A.957.957 0 013.87 1h16.26a.956.956 0 01.957.957v5.991A17.008 17.008 0 0112 23 17.006 17.006 0 012.913 7.948V1.957zM8.174 6.259l7.652 7.652M15.826 6.259L8.174 13.91"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
