import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Gadgets(props: any) {
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
        d="M1 20.381a2.095 2.095 0 002.095 2.096h2.096V12H3.095A2.095 2.095 0 001 14.095v6.286zM23 20.381a2.096 2.096 0 01-2.095 2.096H18.81V12h2.095A2.096 2.096 0 0123 14.095v6.286z"
        fill="#FF808C"
      />
      <Path
        d="M5.19 12v2.63H3.096A2.102 2.102 0 001 16.725v-2.63A2.102 2.102 0 013.095 12h2.096zM23 14.095v2.63a2.102 2.102 0 00-2.095-2.095H18.81V12h2.095A2.101 2.101 0 0123 14.095z"
        fill="#FFBFC5"
      />
      <Path
        d="M1 20.381a2.095 2.095 0 002.095 2.096h2.096V12H3.095A2.095 2.095 0 001 14.095v6.286z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.191 12v10.477l1.355-1.355a2.53 2.53 0 00.74-1.788v-4.715a2.095 2.095 0 00-.837-1.676L5.19 12z"
        fill="gray"
      />
      <Path
        d="M23 20.381a2.096 2.096 0 01-2.095 2.096H18.81V12h2.095A2.096 2.096 0 0123 14.095v6.286z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.81 12v10.477l-1.354-1.355a2.53 2.53 0 01-.741-1.788v-4.715a2.096 2.096 0 01.838-1.676L18.81 12z"
        fill="gray"
      />
      <Path
        d="M3.095 12V10.43a8.905 8.905 0 1117.81 0V12M5.191 12v10.477l1.355-1.355a2.53 2.53 0 00.74-1.788v-4.715a2.095 2.095 0 00-.837-1.676L5.19 12zM18.81 12v10.477l-1.354-1.355a2.53 2.53 0 01-.741-1.788v-4.715a2.096 2.096 0 01.838-1.676L18.81 12z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
