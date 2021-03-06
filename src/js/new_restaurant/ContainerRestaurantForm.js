import * as actions from '../actions/Actions'
import * as restaurantActions from '../actions/RestaurantActions'
import {connect} from 'react-redux'
import RestaurantForm from './RestaurantForm'
import S3FileUploader from '../S3FileUploader'
import {hashHistory} from "react-router"
import uuid from 'node-uuid'

export const mapStateToProps = (state) => {
  return {
    priceRanges: state.priceRanges,
    cuisineTypes: state.cuisineTypes,
    fileUploader: new S3FileUploader(uuid),
    hashHistory: hashHistory
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchPriceRanges: () => {
      dispatch(actions.fetchPriceRanges())
    },
    fetchCuisineTypes: () => {
      dispatch(actions.fetchCuisineTypes())
    },
    addNewRestaurant: (restaurant, file, fileUploader) => {
      dispatch(restaurantActions.addNewRestaurant(restaurant, file, fileUploader))
    }
  }
}

const ContainerRestaurantForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantForm)

export default ContainerRestaurantForm
