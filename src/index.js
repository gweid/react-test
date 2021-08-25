import React from 'react'; // 负责逻辑控制，数据--> VDOM
import ReactDOM from 'react-dom'; // React Dom 渲染实际 Dom，VDOM-->DOM

import { BrowserRouter, Link, Route } from 'react-router-dom'

import Index from './pages/index'
import TestPage from './pages/testPage'
import Mine from './pages/mine'

import style from './index.module.css'

const App = () => {
  return (
    <BrowserRouter>
      <div className={style['router-link']}>
        <Link className={style['link-item']} to="/">index</Link>
        <Link className={style['link-item']} to="/testPage">testPage</Link>
        <Link className={style['link-item']} to="/mine">mine</Link>
      </div>
      <div>
        <Route exact path="/" component={Index}/>
        <Route exact path="/testPage" component={TestPage}/>
        <Route exact path="/mine" component={Mine}/>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
