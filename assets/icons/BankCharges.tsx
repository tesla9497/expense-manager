import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function BankCharges(props: any) {
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
        d="M2.096 8.82a.45.45 0 00.019.739c.08.055.177.084.275.083h19.226a.478.478 0 00.453-.309.447.447 0 00-.158-.511l-9.587-7.223a.497.497 0 00-.59 0L2.097 8.82z"
        fill="#E3E3E3"
      />
      <Path
        d="M12 6.04a20.133 20.133 0 018.574 1.776L12.321 1.6a.496.496 0 00-.589 0L3.45 7.807A20.152 20.152 0 0112 6.04z"
        fill="#fff"
      />
      <Path d="M23 20.661H1v1.837h22V20.66z" fill="gray" />
      <Path
        d="M1.956 18.825H6.74M1 22.498h22M1 20.661h22M1.956 11.479H6.74M9.609 18.825h4.783M9.609 11.479h4.783"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.782 11.479v7.346h-2.87v-7.346h2.87zM13.434 11.479v7.346h-2.87v-7.346h2.87z"
        fill="#E3E3E3"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.26 18.825h4.783M17.26 11.479h4.783"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.087 11.479v7.346h-2.87v-7.346h2.87z"
        fill="#E3E3E3"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.096 8.82a.45.45 0 00.019.739c.08.055.177.084.275.083h19.226a.478.478 0 00.453-.309.447.447 0 00-.158-.511l-9.587-7.223a.497.497 0 00-.59 0L2.097 8.82z"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
