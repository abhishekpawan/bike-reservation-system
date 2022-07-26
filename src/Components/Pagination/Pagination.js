import { Card } from "antd";
import React,{useContext, useState} from 'react'
import { bikeData } from '../../App'
import { useParams } from "react-router-dom";

const Pagination = (props) => {
  const params = useParams()
  const pageNumbers = [];
  const {totalPageOfBikeList,currentPageOfBikeList,setCurrentPageOfBikeList, setBikeList} = useContext(bikeData)
  

  for (let i = 1; i <= parseInt(totalPageOfBikeList); i++) {
    pageNumbers.push(i);
  }

  return (
    <React.Fragment>
      <Card>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={currentPageOfBikeList === number ? "current-page" : ""}
            >
              <button
                onClick={() =>{ 
                  setCurrentPageOfBikeList(number)
                  if(currentPageOfBikeList !== number && params.restaurantID===undefined){
                    setBikeList([])}
                
              }}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </React.Fragment>
  );
};

export default Pagination;
