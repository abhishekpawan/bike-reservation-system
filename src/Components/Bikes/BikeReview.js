import React from 'react'

const BikeReview = (props) => {
  return (
    <React.Fragment>
        <div className='row'>
            <div className='col-6'>{props.bikeReview.name}</div>
            <div className='col-6'>{props.bikeReview.avgRating}</div>
        </div>
        <div className='row'>
            <div className='col-12'>
                {props.bikeReview.review}
            </div>
        </div>
    </React.Fragment>
  )
}

export default BikeReview