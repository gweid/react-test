import React from 'react'; // 负责逻辑控制，数据--> VDOM
import ReactDOM from 'react-dom'; // React Dom 渲染实际 Dom，VDOM-->DOM
import { BrowserRouter } from 'react-router-dom'

import App from './app'

import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
