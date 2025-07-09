import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Cash(props: any) {
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
        d="M1 18.217V9.61h16.26L23 5.782v8.61l-5.74 3.825H1z"
        fill="#78EB7B"
      />
      <Path
        d="M1 9.609l5.74-3.827H23L17.26 9.61H1z"
        fill="#C9F7CA"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23 8.652l-5.74 3.826h-4.782M23 11.522l-5.74 3.826h-4.782M23 14.391l-5.74 3.827h-4.782"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.478 18.217H5.782V9.61a.957.957 0 01.383-.766l4.4-3.06h6.696l-4.4 3.06a.956.956 0 00-.383.766v8.608z"
        fill="#E3E3E3"
      />
      <Path
        d="M12.86 8.843l4.4-3.06h-6.695l-4.4 3.06a.957.957 0 00-.383.766h6.696a.955.955 0 01.383-.766z"
        fill="#fff"
      />
      <Path
        d="M12.478 18.217H5.782V9.61a.957.957 0 01.383-.766l4.4-3.06h6.696l-4.4 3.06a.956.956 0 00-.383.766v8.608zM5.783 12.478H1M5.783 15.348H1M5.783 18.217H1"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
