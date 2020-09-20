import React from 'react'; // 负责逻辑控制，数据--> VDOM
import ReactDOM from 'react-dom'; // React Dom 渲染实际 Dom，VDOM-->DOM
import style from './index.module.css';
import logo from './logo.svg';
import ClassComponent from './components/ClassComponent/ClassComponent.js';
import FunComponent from './components/FunComponent/FunComponent.js';
import Login from './components/Login/Login.js';
import LifeCyclePage from './components/LifeCyclePage/LifeCyclePage.js';
import HookComponent from './components/HookComponent/HookComponent.js';
import Parent from './components/ParentChild/Parent';

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
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
