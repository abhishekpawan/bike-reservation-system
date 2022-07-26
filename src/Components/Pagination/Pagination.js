import { Card } from "antd";
import React, { useContext} from "react";
import { useParams } from "react-router-dom";
import { bikeData, } from "../../App";

const Pagination = (props) => {
  const { setBikeList } = useContext(bikeData);
  const params = useParams()
  const pageNumbers = [];
  console.log();
  

  for (let i = 1; i <= parseInt(props.totalPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <React.Fragment>
      <Card>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={props.currentPage === number ? "current-page" : ""}
            >
              <button
                onClick={() =>{ 
                  props.paginate(number)
                  // if(props.currentPage !== number && params.restaurantID===undefined){
                  //   setBikeList([])}
                
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
