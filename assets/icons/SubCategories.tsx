import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function SubCategories(props: any) {
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
        d="M23 15.81a6.614 6.614 0 11-13.228 0 6.27 6.27 0 01.183-1.526h4.905c.56 0 .783-.397.508-.875l-2.004-3.48A6.614 6.614 0 0123 15.811z"
        fill="#FFEF5E"
      />
      <Path
        d="M14.858 14.284H9.954a6.579 6.579 0 013.409-4.355l2.004 3.48c.275.479.051.875-.509.875z"
        fill="#FFBC44"
      />
      <Path
        d="M13.363 9.93a6.578 6.578 0 00-3.409 4.354H1.63c-.56 0-.793-.396-.508-.875L7.736 1.941a.525.525 0 01.509-.366.534.534 0 01.509.366l4.61 7.988z"
        fill="#FF808C"
      />
      <Path
        d="M23 15.81a6.614 6.614 0 11-13.228 0 6.27 6.27 0 01.183-1.526h4.905c.56 0 .783-.397.508-.875l-2.004-3.48A6.614 6.614 0 0123 15.811z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.858 14.284H9.954a6.579 6.579 0 013.409-4.355l2.004 3.48c.275.479.051.875-.509.875z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.363 9.93a6.578 6.578 0 00-3.409 4.354H1.63c-.56 0-.793-.396-.508-.875L7.736 1.941a.525.525 0 01.509-.366.534.534 0 01.509.366l4.61 7.988z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
