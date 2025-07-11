import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Gift(props: any) {
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
        d="M17.26 11.043H6.74a.956.956 0 00-.957.957v.957a.957.957 0 00.957.956h.478l.415 5.807a.956.956 0 00.956.888h6.828a.957.957 0 00.956-.888l.41-5.807h.478a.956.956 0 00.956-.957V12a.956.956 0 00-.956-.957z"
        fill="#78EB7B"
      />
      <Path d="M13.435 11.043h-2.87v9.565h2.87v-9.565z" fill="#FF808C" />
      <Path
        d="M10.566 13.913H6.74a.956.956 0 01-.957-.957V12a.956.956 0 01.957-.957h10.52a.957.957 0 01.957.957v.957a.956.956 0 01-.956.956h-3.826"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.435 13.913h3.347l-.415 5.807a.956.956 0 01-.956.888H8.586a.956.956 0 01-.956-.888l-.412-5.807h3.347M10.565 11.043v9.565M13.435 20.608v-9.565M8.652 9.789c.574.577 3.348 1.255 3.348 1.255s-.678-2.774-1.255-3.348a1.48 1.48 0 10-2.093 2.093zM15.348 9.789c-.574.577-3.348 1.255-3.348 1.255s.678-2.774 1.255-3.348a1.48 1.48 0 012.093 2.093zM12 4.827V3.392M18.763 7.628l1.014-1.014M21.565 13.913H23M5.237 7.628L4.222 6.614M2.435 13.913H1"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
