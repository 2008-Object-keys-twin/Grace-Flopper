import React from 'react'
import {connect} from 'react-redux'
import dummyData from './dummyData'

class AllItems extends React.Component {
  render() {
    return (
      <>
        <ul>{dummyData.map(item => <li key={item.id}>{item.name}</li>)}</ul>
      </>
    )
  }
}

export default AllItems
