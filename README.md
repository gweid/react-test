# React

### 1、基础

#### 1-1、创建一个 React 项目并启动

1. 创建：npx create-react-app my-app
2. 启动：npm run start
3. 暴露配置项：npm run eject

#### 1-2、入口 src/index.js

```javascript
import React from 'react' // 负责逻辑控制，数据--> VDOM；使用了 jsx 就必须要引入 React
import ReactDOM from 'react-dom' // React Dom 渲染实际 Dom，VDOM-->DOM
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// React 使用 jsx 来描述 ui，
// jsx ==> React.createElement(...)
// ReactDOM.render 生成真实的 Dom
ReactDOM.render(
  <React.StrictMode>
    <App /> {/* 这个是虚拟 Dom，这种是 jsx 写法*/}
  </React.StrictMode>,
  document.getElementById('root') // 将真实的 Dom 插入到根节点（root）下面
)

serviceWorker.unregister() // pwa 相关
```

> babel-loader 将 jsx 编译为相应 js 对象，React.createElement 再将这个 js 对象构造成虚拟 Dom

### 2、jsx 语法

jsx 是 js 语法的扩展，表面上像 HTML，本质上还是通过 babel 转换为 js 去执行

> jsx 主要就是通过 React.createElement 在 React 内部构建虚拟 Dom，最终渲染出页面

```
// jsx 代码
class Test extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1 className='title'>Hello,React</h1>
      </div>
    )
  }
}
ReactDOM.render(<Test />, document.getElementById('root'))

// 经过编译后会变成
class Test extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          { className: 'title' },
          'Hello,React'
        )
      )
    )
  }
}
ReactDOM.render(<Test />, document.getElementById('root'))
```

> React.createElement会构建一个JavaScript对象来描述HTML结构的信息，包括标签名、属性、还有子元素等。这样的代码就是合法的JavaScript代码了

**jsx 到页面的流程：**

![jsx 到页面流程](/imgs/img1.jpg)

#### 2-1、基本使用，插值用 {}

```
const name = 'word';
const jsx = <div>hello, {name}!</div>;

ReactDOM.render(jsx, document.getElementById('root'));
```

#### 2-2、函数的使用

```
const params = {
  first: 'mark',
  last: 'pretter'
};

function formatName(args) {
  return `${args.first} ${args.last}`;
}

const jsx = (
  <div>
    <div>{formatName(params)}</div>
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

#### 2-3、jsx 对象

```
const good = <div>goods</div>;
const jsx = (
  <div>
    {good}
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

#### 2-4、条件语句

```
const show = true;
const loginBtn = '登陆';

const jsx = (
  <div>
    <div>{show ? loginBtn : '注册'}</div>
    <div>{show && loginBtn}</div>
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

#### 2-5、数组

1. 数组直接使用 jsx，记得要唯一 key

```
const eles = [
  <div key='1'>数组1</div>,
  <div key='2'>数组2</div>
];

const jsx = (
  <div>
    {eles}
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

2. 使用 map

```
const arr = ['arr1', 'arr2', 'arr3'];

const jsx = (
  <div>
    <ul>
      {arr.map(item => {
        return (
          <li key={item}>{item}</li>
        )
      })}
    </ul>
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

> map 和 forEach 区别：forEach 没有返回值

#### 2-6、属性使用

```
import logo from './logo.svg';

const jsx = (
  <div>
    <img src={logo} className="logo" style={{width: '100px', height: '100px'}}/>
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

> 使用 className 是为了避免与 class 组件里面的 class 冲突  
> style 使用 {} 插值， 里面那层的 {} 代表的是一个对象

#### 2-7、模块化

```
import style from './index.module.css';

const jsx = (
  <div>
    <img 
      src={logo}
      // className="logo"
      className={style.logo}
      // style={{width: '100px', height: '100px'}}
    />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

> css 模块化可以避免组件之间类名冲突

### 3、组件

#### 3-1、类组件（class component）

```
import React, { Component } from 'react';

class ClassComponent extends Component {
    constructor(props) {
        super(props); // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
        this.state = { date: new Date() };
    }
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>{this.state.date.toLocaleTimeString()}</div>
            </div>
        );
    }
}
 
export default ClassComponent;
```

1. 如果通过类的方式去定义组件，那么组件必须继承于 React.Component 这个类
2. 必须定义一个 render 方法，render 里面返回一个 jsx

#### 3-2、函数式组件（function component）

函数组件通常无状态，仅关注内容展示，返回渲染结果即可。

> React16.8 引入了 hooks，函数组件也可以有状态

```
import React from 'react';

const FunComponent = props => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>这是一个函数组件</p>
        </div>
    );
}

export default FunComponent
```

1. 函数组件必须返回 jsx 对象

> 声明了组件，直接导入，然后使用；不需要像 Vue 一样还要去注册
