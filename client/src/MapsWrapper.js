import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Loader } from "@googlemaps/js-api-loader";

import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import HomeScreen from "./HomeScreen";

// const loader = new Loader({
//   apiKey: "AIzaSyBIOXr1dI4-5WeLFk-a8ZlAf2zrniDOqWw",
//   version: "weekly",
//   libraries: ["places"],
// });

const MapsWrapper = () => {
  // const Map: FC<{}> = () => {};
  // const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (ref.current && !map) {
  //     setMap(new window.google.maps.Map(ref.current, {}));
  //   }
  // }, [ref, map]);

  // const [map, setMap] = useState<google.maps.Map>();

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return null; // <Spinner />;
      case Status.FAILURE:
        return null; // <ErrorComponent />;
      // case Status.SUCCESS:
      //   return <HomeScreen />;
    }
  };

  return (
    <>
      <Wrapper
        apiKey={"AIzaSyBIOXr1dI4-5WeLFk-a8ZlAf2zrniDOqWw"}
        render={render}
      >
        <HomeScreen />
      </Wrapper>
    </>
  );
};

export default MapsWrapper;
