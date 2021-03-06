import React from 'react'

export default function MapComponent(props) {
  let baseUrl = "https://www.google.com/maps/embed/v1/place"
  let location = "?q=place_id:" + props.place_id
  let zoom = "&zoom=17"
  let key = "&key=" + process.env.GOOGLE_PLACES_KEY

  return (
    <div>
      <iframe src={baseUrl + location + zoom + key} className="map-component"></iframe>
    </div>
  )
}
