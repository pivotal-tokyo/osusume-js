import React from 'react'
import { Link } from 'react-router'
import RestaurantListItem from '../restaurant_list/RestaurantListItem'

export default class MyPage extends React.Component {
  constructor(props) {
    super(props)

    this.myLikesClicked = this.myLikesClicked.bind(this)
    this.myPostsClicked = this.myPostsClicked.bind(this)
    this.state = {showMyLiked: false}
  }

  componentDidMount() {
    if (this.props.myRestaurants.length == 0) {
      this.props.fetchRestaurants()
    }
  }

  myLikesClicked() {
    this.setState({showMyLiked: true})
  }

  myPostsClicked() {
    this.setState({showMyLiked: false})
  }

  render() {
    let restaurants = this.props.myRestaurants
    if (this.state.showMyLiked) {
      restaurants = this.props.myLikedRestaurants
    }
    let restaurantItems = restaurants.map((restaurant) => {
      return (<RestaurantListItem key={restaurant.id} restaurant={restaurant} />)
    })
    let toggleButton = <button className='my-likes' onClick={this.myLikesClicked}>my likes</button>
    if (this.state.showMyLiked) {
      toggleButton = <button className='my-posts' onClick={this.myPostsClicked}>my posts</button>
    }
    return (
      <div>
        <Link to="/"><button>restaurants</button></Link>
        <h1>my page</h1>
        <div>
          <span>{this.props.currentUser.name}</span>
          <button className='logout' onClick={this.props.logout}>logout</button>
        </div>
        {toggleButton}
        {restaurantItems}
      </div>
    )
  }
}
