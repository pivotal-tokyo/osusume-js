import React from 'react'
import CuisineTypeSelection from './CuisineTypeSelection'
import PriceRangeSelection from './PriceRangeSelection'
import PhotoPicker from './PhotoPicker'
import SelectedRestaurant from './SelectedRestaurant'

export default class RestaurantForm extends React.Component {
  constructor(props) {
    super(props)
    this.cuisineHandleChanged = this.cuisineHandleChanged.bind(this)
    this.priceRangeHandleChanged = this.priceRangeHandleChanged.bind(this)
    this.saveRestaurant = this.saveRestaurant.bind(this)
    this.selectPhotos = this.selectPhotos.bind(this)
    this.noteChanged = this.noteChanged.bind(this)
    this.state = {
      selectedCuisine: 0,
      selectedPriceRange: 0,
      notes: '',
      selectedPhotos: []
    }
  }

  componentDidMount() {
    this.props.fetchCuisineTypes()
    this.props.fetchPriceRanges()
  }

  cuisineHandleChanged(value) {
    this.setState({selectedCuisine: value})
  }

  priceRangeHandleChanged(value) {
    this.setState({selectedPriceRange: value})
  }

  noteChanged(e) {
    this.setState({notes: e.target.value})
  }

  selectPhotos(photoFiles) {
    this.setState((previousState, currentProps) => {
      const photoFilesArray = Array.from(photoFiles)
      const allPhotos = previousState.selectedPhotos.concat(photoFilesArray)
      return {selectedPhotos: allPhotos}
    })
  }

  saveRestaurant() {
    this.props.addNewRestaurant(
      {
        name: this.props.suggestion.name,
        address: this.props.suggestion.address,
        cuisine_id: this.state.selectedCuisine,
        price_range_id: this.state.selectedPriceRange,
        notes: this.state.notes,
        place_id: this.props.suggestion.place_id,
        latitude: this.props.suggestion.latitude,
        longitude: this.props.suggestion.longitude
      },
      this.state.selectedPhotos,
      this.props.fileUploader
    )
  }

  renderRestaurantSuggestionSection() {
    if (this.props.suggestion) {
      return (<SelectedRestaurant editRestaurantClicked={this.props.findRestaurantClicked}
                                  suggestion={this.props.suggestion}/>)
    } else {
      return (
        <button className='find-restaurant' onClick={this.props.findRestaurantClicked}>
          find restaurant
        </button>
      )
    }
  }

  render() {
    return (
      <div className='stacked-form'>
        <h1>add a restaurant</h1>
        {this.renderRestaurantSuggestionSection()}
        <CuisineTypeSelection cuisineTypes={this.props.cuisineTypes}
                              changeHandler={this.cuisineHandleChanged}/>
        <PriceRangeSelection priceRanges={this.props.priceRanges}
                             changeHandler={this.priceRangeHandleChanged}/>
        <PhotoPicker selectedPhotos={this.state.selectedPhotos} selectPhotos={this.selectPhotos}/>
        <label>Notes</label>
        <textarea className="notes" onChange={this.noteChanged}></textarea>
        <button className='save-restaurant' onClick={this.saveRestaurant} disabled={this.props.suggestion == null}>save</button>
      </div>
    )
  }
}
