import { useState } from "react";
import styled from "styled-components";
import {
  centeredFlexColumn,
  centeredFlexRow,
  inputStyling,
} from "../../styling/sharedstyles";
import { forwardGeocode } from "../Home/Map/helpers";

const SearchContainer = ({ show }) => {
  const [searchResults, setSearchResults] = useState(null);
  // const { current: map } = useMap();

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

  const handleResultClick = (result) => {
    const { center } = result;
    console.log(center);
    // map.flyTo({ center: [0, 0], zoom: 9 });
  };

  return (
    <SearchWrapper>
      {searchResults && (
        <ResultsContainer>
          <ul>
            {searchResults.map((el) => {
              return (
                <li
                  key={el.id}
                  onClick={() => {
                    handleResultClick(el);
                  }}
                >
                  {el.place_name}
                </li>
              );
            })}
          </ul>
        </ResultsContainer>
      )}
      <SearchBar
        // onChange={(ev) => {
        //   ev.preventDefault();
        //   console.log(ev.target.value);
        // }}
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSearch(ev);
        }}
      >
        <Input id="search" type="text" key="search" placeholder="search" />
        <input type="submit" hidden />
      </SearchBar>
    </SearchWrapper>
  );
};

export default SearchContainer;

const ResultsContainer = styled.div`
  ${inputStyling}
  flex-direction: column-reverse;
  width: 95%;
  height: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: unset;
  background-color: var(--color-medium-grey);
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

const SearchWrapper = styled.div`
  position: absolute;
  ${centeredFlexColumn}
  gap: 5px;
  width: 100%;
  bottom: 65px;
`;

const SearchBar = styled.form`
  width: 80%;
  ${centeredFlexRow};
`;

const Input = styled.input`
  ${inputStyling};
  border-radius: 50px;
  text-align: center;
`;
