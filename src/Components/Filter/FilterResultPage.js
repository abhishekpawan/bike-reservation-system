import React,{useState} from "react";
import { useParams } from "react-router-dom";
import FilterMenus from "./FilterMenus";

import FilteredBikes from "./FilteredBikes";

const FilterResults = () => {
  const { searchValue,avgRatingValue } = useParams();

  return (
    <React.Fragment>
        <FilterMenus/>
        <FilteredBikes searchValue={searchValue} avgRatingValue={avgRatingValue}/>
    </React.Fragment>
  );
};

export default FilterResults;
