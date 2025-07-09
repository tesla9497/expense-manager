import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Success(props: any) {
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
        d="M16.312 6.97c.529 0 .958.429.958.958v11.498c0 .53-.429.959-.958.959H4.814a.958.958 0 01-.959-.959V7.928c0-.53.43-.958.959-.958h11.498z"
        fill="#78EB7B"
      />
      <Path
        d="M22.061 1.699L10.084 16.551 5.293 11.76"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.186 11.282v10.06c0 .53-.429.959-.958.959H2.898a.958.958 0 01-.959-.958V6.012c0-.53.429-.958.958-.958h11.02"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
