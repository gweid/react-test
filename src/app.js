import React from 'react'; // 负责逻辑控制，数据--> VDOM

import { BrowserRouter, Link, NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from './router'

import style from './app.module.css'

const App = () => {
  return (
    <>
      <div className={style['router-link']}>
        {/* <Link className={style['link-item']} to="/">index</Link>
        <Link className={style['link-item']} to="/testPage">testPage</Link>
        <Link className={style['link-item']} to="/mine">mine</Link> */}

        <NavLink exact className={style['link-item']} activeStyle={{ color: 'red' }} to="/">index</NavLink>
        <NavLink className={style['link-item']} activeStyle={{ color: 'red' }} to="/about">about</NavLink>
        <NavLink exact className={style['link-item']} activeClassName={style['link-active']} to="/testPage">testPage</NavLink>
        <NavLink exact className={style['link-item']} activeClassName={style['link-active']} to="/mine">mine</NavLink>
      </div>

      {renderRoutes(routes)}
    </>
  )
}

export default withRouter(App)
