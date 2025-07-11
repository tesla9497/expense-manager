import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Mark(props: any) {
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
        d="M17.307 13.902v3.867a.482.482 0 01-.143.345l-4.825 4.747a.483.483 0 01-.675 0l-4.825-4.747a.482.482 0 01-.144-.345v-3.867a.483.483 0 01.821-.345l4.318 4.246a.24.24 0 00.337 0l4.317-4.246a.483.483 0 01.82.345z"
        fill="#FFF9BF"
      />
      <Path
        d="M17.307 6.069V8.63a.482.482 0 01-.143.345l-4.825 4.747a.483.483 0 01-.675 0L6.839 8.975a.482.482 0 01-.144-.345V6.07a.482.482 0 01.82-.341l4.317 4.246a.242.242 0 00.338 0l4.316-4.246a.482.482 0 01.821.34z"
        fill="#FFF9BF"
      />
      <Path
        d="M12.169 17.805a.238.238 0 01-.169.07V23c.127 0 .248-.05.339-.138l4.824-4.747a.482.482 0 00.144-.345v-3.868a.482.482 0 00-.82-.345l-4.318 4.248zM12.17 9.974a.241.241 0 01-.17.069v3.82c.127 0 .248-.05.339-.14l4.824-4.747a.482.482 0 00.144-.345V6.07a.483.483 0 00-.821-.341L12.17 9.974z"
        fill="#FFEF5E"
      />
      <Path
        d="M17.307 13.902v3.867a.482.482 0 01-.143.345l-4.825 4.747a.483.483 0 01-.675 0l-4.825-4.747a.482.482 0 01-.144-.345v-3.867a.483.483 0 01.821-.345l4.318 4.246a.24.24 0 00.337 0l4.317-4.246a.483.483 0 01.82.345z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.307 6.069V8.63a.482.482 0 01-.143.345l-4.825 4.747a.483.483 0 01-.675 0L6.839 8.975a.482.482 0 01-.144-.345V6.07a.482.482 0 01.82-.341l4.317 4.246a.242.242 0 00.338 0l4.316-4.246a.482.482 0 01.821.34z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.307 1l-4.968 4.892a.483.483 0 01-.676 0L6.693 1"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
