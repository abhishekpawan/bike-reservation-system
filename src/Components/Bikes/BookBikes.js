import React,{useContext, useState} from 'react'
import { bikeData } from '../../App'
import FilterMenus from '../Filter/FilterMenus'
import Pagination from '../Pagination/Pagination'
import BikeList from './BikeList'

const BookBikes = () => {


  return (
    <React.Fragment>
        <FilterMenus/>
        <BikeList/>
        <Pagination />
    </React.Fragment>
  )
}

export default BookBikes