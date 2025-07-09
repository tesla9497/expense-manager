import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Notification(props: any) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.841 5.837l-1.71-.004c-3.901-.01-7.288 3.16-7.315 7v4.422c0 .922-.117 1.821-.62 2.588l-.334.51c-.51.775.038 1.814.954 1.814h16.368c.916 0 1.463-1.039.954-1.813l-.334-.511c-.502-.767-.62-1.668-.62-2.59v-4.419c-.047-3.84-3.442-6.988-7.343-6.997zM17.5 22.167a3.5 3.5 0 11-7 0"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2.333a2.333 2.333 0 012.333 2.334v1.166h-4.666V4.667A2.334 2.334 0 0114 2.333z"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
