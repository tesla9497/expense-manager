import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Taxi(props: any) {
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
        d="M4.826 9.13h14.348A3.826 3.826 0 0123 12.956v4.783a.957.957 0 01-.956.956H1.957A.956.956 0 011 17.74v-4.783A3.826 3.826 0 014.826 9.13z"
        fill="#FF808C"
      />
      <Path
        d="M22.88 12a3.826 3.826 0 00-3.706-2.87H4.827A3.826 3.826 0 001.12 12h21.76z"
        fill="#FFBFC5"
      />
      <Path
        d="M2.914 13.913h2.87L5.305 12H1.122a3.838 3.838 0 00-.117.78 2.152 2.152 0 001.91 1.133zM18.696 12l-.478 1.913h2.87A2.161 2.161 0 0023 12.778a3.851 3.851 0 00-.12-.778h-4.184z"
        fill="#FFEF5E"
      />
      <Path
        d="M4.348 9.13l.69-4.14A1.913 1.913 0 016.93 3.392h10.146a1.913 1.913 0 011.886 1.599l.69 4.14H4.348z"
        fill="#66E1FF"
      />
      <Path
        d="M15.348 3.391H6.93a1.913 1.913 0 00-1.889 1.6l-.693 4.14h5.26l5.74-5.74z"
        fill="#C2F3FF"
      />
      <Path
        d="M4.826 9.13h14.348A3.826 3.826 0 0123 12.956v4.783a.957.957 0 01-.956.956H1.957A.956.956 0 011 17.74v-4.783A3.826 3.826 0 014.826 9.13zM4.348 9.13l.69-4.14A1.913 1.913 0 016.924 3.39h10.15a1.913 1.913 0 011.887 1.599l.69 4.14"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.652 9.13l1.435-1.913h1.435a.478.478 0 01.478.479v.956a.478.478 0 01-.478.478h-2.87zM4.348 9.13L2.913 7.217H1.478A.478.478 0 001 7.696v.956a.478.478 0 00.478.478h2.87z"
        fill="#FF808C"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.782 18.696v.956a.956.956 0 01-.956.957H2.913a.957.957 0 01-.957-.957v-.956h3.826zM22.044 18.696v.956a.956.956 0 01-.957.957h-1.913a.957.957 0 01-.956-.957v-.956h3.826z"
        fill="gray"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.88 12h-4.184l-.478 1.913h2.87A2.161 2.161 0 0023 12.78M1.12 12h4.184l.479 1.913h-2.87A2.153 2.153 0 011 12.78"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.218 13.913l-1.953.78a2.987 2.987 0 01-.924.177H8.175a2.42 2.42 0 01-.907-.215l-1.484-.742L5.305 12h13.391l-.478 1.913z"
        fill="gray"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.305 18.696l.956-1.913H17.74l.956 1.913H5.305z"
        fill="#B2B2B2"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.74 16.783h3.347M2.913 16.783h3.348"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
