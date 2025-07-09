import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Investment(props: any) {
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
        d="M12.272 12.478a5.739 5.739 0 100-11.477 5.739 5.739 0 000 11.477z"
        fill="#FFEF5E"
      />
      <Path
        d="M12.273 1a5.74 5.74 0 00-3.996 9.857l8.114-8.115A5.721 5.721 0 0012.273 1z"
        fill="#FFF9BF"
      />
      <Path
        d="M16.633 13.834c-1.069.713-1.62 2.014 0 3.107.888 2.22 2.54 1.627 3.517.593a6.12 6.12 0 00.765-5.477c-1.56 1.179-2.951.889-4.282 1.777zM4.963 17.7c.795.867 2.05 1.182 2.81-.436 1.882-1.115 1.11-2.524.042-3.263a5.598 5.598 0 00-5.06.078c1.284 1.245 1.218 2.543 2.208 3.622z"
        fill="#78EB7B"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.272 12.478a5.739 5.739 0 100-11.477 5.739 5.739 0 000 11.477zM12.273 12.478V23M12.273 23s2.39-5.26 6.217-7.652M12.272 22.044s-.956-3.348-5.739-6.218"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.708 3.87h-1.945a1.284 1.284 0 00-.478 2.474l1.974.79a1.284 1.284 0 01-.478 2.475h-1.943M12.273 10.565V9.61M12.273 3.87v-.957"
        stroke="#191919"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
