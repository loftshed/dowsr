import { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fakeStroke,
  inputStyling,
} from "../../styling/sharedstyles";
import { forwardGeocode } from "../Map/helpers";
import { useMap } from "react-map-gl";

import { fadeIn } from "../../styling/Animations";

const SearchContainer = ({ show, searchResults, setSearchResults }) => {
  const { map } = useMap();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

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
    setSearchResults(null);
    inputRef.current.value = result.place_name;

    const { center, place_type } = result;

    const zoomLevel =
      place_type[0] === "address" || place_type[0] === "poi" ? 15 : 10;
    map.flyTo({ center: center, zoom: zoomLevel });
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
            ref={inputRef}
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
  animation: ${fadeIn} 0.08s ease;
`;

const SearchBar = styled.div`
  width: 90%;
  ${centeredFlexRow};
  backdrop-filter: blur(10px);
  padding: 2px;
  border-radius: 20px;
`;

const Input = styled.input`
  ${inputStyling};
  border-radius: 15px;
  text-align: center;
  height: 40px;
  font-size: 18px;
  border: none;
  background-color: unset;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
  color: white;
  text-shadow: 0px 0px 15px ${(props) => props.theme.colors.superDarkGrey};
  &:focus {
    ${fakeStroke}
    outline: none;
    border: 2px solid ${(props) => props.theme.colors.mediumGrey};
    /* box-shadow: inset 0px 0px 30px rgba(68, 187, 164, 0.2),
      0px 0px 5px 5px rgba(0, 0, 0, 0.5),
      0px 0px 5px 5px rgba(68, 187, 164, 0.2); */
  }
`;
