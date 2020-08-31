import React from 'react'; // 负责逻辑控制，数据--> VDOM
import ReactDOM from 'react-dom'; // React Dom 渲染实际 Dom，VDOM-->DOM
import style from './index.module.css';
import logo from './logo.svg';

const name = 'world';
const params = {
  first: 'mark',
  last: 'pretter'
};

function formatName(args) {
  return `${args.first} ${args.last}`;
}

const good = <div>goods</div>;

const show = true;
const loginBtn = '登陆';

const arr = ['arr1', 'arr2', 'arr3'];
const eles = [
  <div key='1'>数组1</div>,
  <div key='2'>数组2</div>
];

const jsx = (
  <div>
    <div>hello, {name}!</div>
    <div>{formatName(params)}</div>
    {good}
    <div>{show ? loginBtn : '注册'}</div>
    <div>{show && loginBtn}</div>
    {eles}
    <ul>
      {arr.map(item => {
        return (
          <li key={item}>{item}</li>
        )
      })}
    </ul>
    <img 
      src={logo}
      // className="logo"
      className={style.logo}
      // style={{width: '100px', height: '100px'}}
    />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));