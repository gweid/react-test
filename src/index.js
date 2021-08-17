import React from 'react'; // 负责逻辑控制，数据--> VDOM
import ReactDOM from 'react-dom'; // React Dom 渲染实际 Dom，VDOM-->DOM
import style from './index.module.css';
import logo from './logo.svg';
import ClassComponent from './components/ClassComponent/ClassComponent.js';
import FunComponent from './components/FunComponent/FunComponent.js';
import Login from './components/Login/Login.js';
import LifeCyclePage from './components/LifeCyclePage/LifeCyclePage.js';
import HookComponent from './components/HookComponent/HookComponent.js';
import Parent from './components/ParentChild/Parent.js';
import ContextCom from './components/ContextCom/ContextCom.js';
import EventsCom from './components/EventsCom/EventsCom.js';
import NavBar from './components/NavBar/index.js';
import ScuCom from './components/ScuCom/index.js';
import DomCom from './components/DomCom/index.js';
import ImmutableCom from './components/ImmutableCom/index.js';
import ModelCom from './components/ModelCom/index.js';
import HOCCom from './components/HOCCom/index.js';
import HOCProp from './components/HOCCom/HOCProp.js';
import HOCContext from './components/HOCCom/HOCContext.js';
import HOCAuth from './components/HOCCom/HOCAuth.js';
import HOCLifeCycle from './components/HOCCom/HOCLifeCycle.js';
// import PortalCom from './components/PortalCom/index.js';
import FragmentCom from './components/FragmentCom/index.js';
import CSSAnimat from './components/AnimatCom/index';
import SwitchAnimat from './components/AnimatCom/SwitchAnimat';
import TestRedux from './components/ReduxCom/test1/index';
import ConnectRedux from './components/ReduxCom/test2/index';
import ReactReduxCom from './components/ReduxCom/test3/index';
import LinkStyle from './components/CssStyle/内联方式/index';
import UserIndex from './components/CssStyle/普通css/user';
import CssModule from './components/CssStyle/css-module/cssModule';
import CssInJs from './components/CssStyle/css-in-js/CssInJs';

import store from './store';
import { StoreContext } from './utils/connect'

import { Provider } from 'react-redux';

import './index.css';

const name = 'world';
const params = {
  first: 'mark',
  last: 'pretter',
};

function formatName(args) {
  return `${args.first} ${args.last}`;
}

const good = <div>goods</div>;

const show = true;
const loginBtn = '登陆';
const isLogin = true;

const arr = ['arr1', 'arr2', 'arr3'];
const eles = [<div key="1">数组1</div>, <div key="2">数组2</div>];

const jsx = (
  <div>
    <div>hello, {name}!</div>
    <div>{formatName(params)}</div>
    {good}
    <div>{show ? loginBtn : '注册'}</div>
    <div>{show && loginBtn}</div>
    <Login login={isLogin} />
    {eles}
    <ul>
      {arr.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <img
      alt="React-logo"
      src={logo}
      // className="logo"
      className={style.logo}
      // style={{width: '100px', height: '100px'}}
    />
    <ClassComponent title="Class Component" />
    <FunComponent title="Function Component" />
    <LifeCyclePage />
    <HookComponent />
    <Parent />
    <ContextCom />
    <EventsCom />
    {/* <NavBar>
      <div>左边</div>
      <div>中间</div>
      <div>右边</div>
    </NavBar> */}
    <NavBar
      leftSlot={<span>左边</span>}
      centerSlot={<span>中间</span>}
      rightSlot={<span>右边</span>}
    />
    <ScuCom />
    <DomCom />
    <ImmutableCom />
    <ModelCom />
    <HOCCom />
    <HOCProp />
    <HOCContext />
    <HOCAuth />
    <HOCLifeCycle />
    {/* <PortalCom /> */}
    <FragmentCom />
    <CSSAnimat />
    <SwitchAnimat />
    <TestRedux />

    {/* redux 的使用*/}
    {/* <ConnectRedux /> */}
    <StoreContext.Provider value={store}>
      <ConnectRedux />
    </StoreContext.Provider>
    <Provider store={store}>
      <ReactReduxCom />
    </Provider>

    {/* css 样式 */}
    <hr />
    <LinkStyle />
    <UserIndex />
    <CssModule />
    <CssInJs />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
