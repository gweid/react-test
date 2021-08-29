import React from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'

import style from './index.module.css'

export default function About(props) {
  return (
    <div>
      <NavLink exact activeClassName={style['navlink-active']} to="/about">理念</NavLink>
      <NavLink exact activeClassName={style['navlink-active']} to="/about/culture">文化</NavLink>

      {renderRoutes(props.route.routes)}
    </div>
  )
}
