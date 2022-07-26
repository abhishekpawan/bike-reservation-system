import React,{useContext, useState} from 'react'
import { bikeData } from '../../App'
import FilterMenus from '../Filter/FilterMenus'
import Pagination from '../Pagination/Pagination'
import BikeList from './BikeList'

const BookBikes = () => {
  const {totalPageOfBikeList,currentPageOfBikeList,setCurrentPageOfBikeList} = useContext(bikeData)
  const paginate = (pageNumber) => setCurrentPageOfBikeList(pageNumber)


  return (
    <React.Fragment>
        <FilterMenus/>
        <BikeList/>
        <Pagination totalPage={totalPageOfBikeList} currentPage={currentPageOfBikeList} paginate={paginate}/>
    </React.Fragment>
  )
}

export default BookBikes