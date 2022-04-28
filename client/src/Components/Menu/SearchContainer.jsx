import { useState } from "react";
import styled from "styled-components/macro";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fakeStroke,
  inputStyling,
} from "../../styling/sharedstyles";
import { forwardGeocode } from "../Map/helpers";
import { useMap } from "react-map-gl";

const SearchContainer = ({ show, searchResults, setSearchResults }) => {
  // const [clickedResult, setClickedResult] = useState(null);
  const { map } = useMap();

  // EXTREMELY half baked. This was pretty low on the priority list.

  const handleSearch = async (ev) => {
    try {
      const results = await forwardGeocode(ev.target.search.value);
      const { features } = results;
      setSearchResults(features);
      console.log(features);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResultClick = (ev, result) => {
    // setClickedResult(result);
    setSearchResults(null);
    // probably stupid way of targeting the input
    ev.nativeEvent.path[3].search.value = result.place_name;
    // make viewport fly to result
    // display "add a pin here? marker"

    const { center } = result;
    // console.log(center);
    map.flyTo({ center: center, zoom: 10 });
  };

  if (show)
    return (
      <SearchWrapper
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSearch(ev);
        }}
        id="searchForm"
      >
        {searchResults && (
          <>
            <ResultsContainer>
              <ColorOverlay />
              <ul>
                {searchResults.map((result) => {
                  return (
                    <li
                      id={result.id}
                      key={result.id}
                      onClick={(ev) => {
                        handleResultClick(ev, result);
                      }}
                    >
                      {result.place_name}
                    </li>
                  );
                })}
              </ul>
            </ResultsContainer>
          </>
        )}
        <SearchBar>
          <Input
            id="search"
            type="text"
            key="search"
            placeholder="search"
            autoComplete="off"
          />
          <input type="submit" hidden />
        </SearchBar>
      </SearchWrapper>
    );
};

export default SearchContainer;

const ColorOverlay = styled.div`
  top: 1%;
  left: 1%;
  position: absolute;
  border-radius: inherit;
  width: 98%;
  height: 98%;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
`;

const ResultsContainer = styled.div`
  ${inputStyling}
  border: none;
  position: absolute;
  flex-direction: column-reverse;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  background-color: unset;
  backdrop-filter: blur(2px);
  bottom: 60px;

  ul {
    all: unset;
    list-style: none;
    gap: 5px;
    height: fit-content;
    li {
      transition: all 0.1s ease;
      padding: 5px 5px;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 600;
      text-shadow: ${(props) => props.theme.colors.superDarkGrey} 1px 1px 0px;
      font-size: 20px;
      color: ${(props) => props.theme.colors.lightGrey};
      width: 100%;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.colors.lightGrey};
        font-weight: 800;
        background-color: ${(props) => props.theme.colors.darkestBlue};
        text-decoration: underline;
        text-decoration-color: ${(props) => props.theme.colors.pink};
        ${fakeStroke}
      }
    }
  }
`;

const SearchWrapper = styled.form`
  position: absolute;
  ${centeredFlexColumn}
  gap: 5px;
  width: 100%;
  bottom: 60px;
  height: 100%;
  pointer-events: none;
`;

const SearchBar = styled.div`
  width: 90%;
  ${centeredFlexRow};
  background-color: grey;
  padding: 5px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
`;

const Input = styled.input`
  ${inputStyling};
  border-radius: 50px;
  text-align: center;
  height: 40px;
  font-size: 18px;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 30px rgba(68, 187, 164, 0.2);
  }
`;
