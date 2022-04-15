import { useState } from "react";
import { useMap } from "react-map-gl";
import styled from "styled-components";
import {
  centeredFlexColumn,
  centeredFlexRow,
  inputStyling,
} from "../../styling/sharedstyles";
import { forwardGeocode } from "../Home/Map/helpers";

const SearchContainer = ({ show }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [clickedResult, setClickedResult] = useState(null);
  // const {id: } = useMap();

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
    setClickedResult(result);
    setSearchResults(null);
    // probably stupid way of targeting the input
    ev.nativeEvent.path[3].search.value = result.place_name;
    // make viewport fly to result
    // display "add a pin here? marker"

    // const { center } = result;
    // console.log(center);
    // mainMap.flyTo({ center: [0, 0], zoom: 9 });
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
          <ResultsContainer>
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
        )}
        <SearchBar>
          <Input id="search" type="text" key="search" placeholder="search" />
          <input type="submit" hidden />
        </SearchBar>
      </SearchWrapper>
    );
};

export default SearchContainer;

const ResultsContainer = styled.div`
  ${inputStyling}
  position: absolute;
  flex-direction: column-reverse;
  width: 95%;
  height: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: unset;
  background-color: var(--color-medium-grey);
  bottom: 60px;
  ul {
    all: unset;
    list-style: none;
    font-size: 14px;
    height: fit-content;
    gap: 2px;

    li {
      font-weight: 300;
      color: black;
      text-overflow: ellipsis;
      &:hover {
        cursor: pointer;
        background-color: var(--color-teal);
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
  border: 1px solid var(--color-super-dark-grey);
`;

const Input = styled.input`
  ${inputStyling};
  border-radius: 50px;
  text-align: center;
  height: 40px;
  border: 1px solid var(--color-super-dark-grey);
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 30px rgba(68, 187, 164, 0.2);
  }
`;
