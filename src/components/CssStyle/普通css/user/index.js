import React, { PureComponent } from 'react'
import CarIndex from '../car'

import './index.css'

export default class UserIndex extends PureComponent {
  render() {
    return (
      <div>
        <h1 className="title">user</h1>
        <CarIndex />
      </div>
    )
  }
}
