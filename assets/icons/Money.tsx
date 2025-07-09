import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Money(props: any) {
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
        d="M20 20.5H4c-1.1 0-2-.9-2-2V8.05c0-.65.3-1.25.85-1.65L12 0l9.15 6.4c.55.35.85 1 .85 1.65V18.5c0 1.1-.9 2-2 2z"
        fill="#78909C"
      />
      <Path d="M7 .5h10V16H7V.5z" fill="#AED581" />
      <Path d="M6.5 0v16.5h11V0h-11zm10 15.5h-9V1h9v14.5z" fill="#558B2F" />
      <Path
        d="M17 1.5c0 .85-.15 1.5-1 1.5s-1.5-.65-1.5-1.5.65-1 1.5-1 1 .15 1 1zm-9-1c.85 0 1.5.15 1.5 1S8.85 3 8 3s-1-.65-1-1.5.15-1 1-1zM12 5a1 1 0 100-2 1 1 0 000 2zM12 13a3 3 0 100-6 3 3 0 000 6z"
        fill="#558B2F"
      />
      <Path
        d="M20 20.5H4c-1.1 0-2-.9-2-2v-10L12 15l10-6.5v10c0 1.1-.9 2-2 2z"
        fill="#CFD8DC"
      />
    </Svg>
  );
}
