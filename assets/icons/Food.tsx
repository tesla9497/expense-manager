import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Food(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M8.513 20.13V23h6.974v-2.87" fill="#FFEF5E" />
      <Path
        d="M8.513 20.13V23h6.974v-2.87"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.878 4.826L15.487 20.13H8.512L6.122 4.826h11.756z"
        fill="#FFF9BF"
      />
      <Path
        d="M12 15.152a8.324 8.324 0 01-4.465-1.295l.98 6.277h6.975l.981-6.277A8.33 8.33 0 0112 15.153z"
        fill="#FFEF5E"
      />
      <Path
        d="M17.878 4.826L15.487 20.13H8.512L6.122 4.826h11.756z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.386 1.548l-.508 3.278H6.121l-.518-3.278a.44.44 0 01.12-.379A.484.484 0 016.1 1h11.787a.52.52 0 01.389.17.434.434 0 01.11.378z"
        fill="#C2F3FF"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 11.522a2.442 2.442 0 002.49-2.391 2.491 2.491 0 00-4.981 0 2.442 2.442 0 002.49 2.39z"
        fill="#78EB7B"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.523 23h12.953"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
