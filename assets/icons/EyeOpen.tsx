import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function EyeOpen(props: any) {
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
        d="M24.8 12.789c.553.723.553 1.7 0 2.422-1.742 2.274-5.921 6.956-10.8 6.956-4.879 0-9.058-4.682-10.8-6.956a1.974 1.974 0 010-2.422C4.942 10.515 9.121 5.833 14 5.833c4.879 0 9.058 4.682 10.8 6.956z"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 17.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
        stroke="#252F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
