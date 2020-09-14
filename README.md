# React

### 1、基础

#### 1-1、创建一个 React 项目并启动

1. 创建：npx create-react-app my-app
2. 启动：npm run start
3. 暴露配置项：npm run eject

#### 1-2、入口 src/index.js

```js
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

```js
// jsx 代码
class Test extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1 className="title">Hello,React</h1>
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
    return React.createElement('div', null, React.createElement('h1', { className: 'title' }, 'Hello,React'))
  }
}
ReactDOM.render(<Test />, document.getElementById('root'))
```

> React.createElement 会构建一个 JavaScript 对象来描述 HTML 结构的信息，包括标签名、属性、还有子元素等。这样的代码就是合法的 JavaScript 代码了

**jsx 到页面的流程：**

![jsx 到页面流程](/imgs/img1.jpg)

#### 2-1、基本使用，插值用 {}

> jsx 的类不能使用 class，而要使用 className，因为 jsx 是 js 上运行的，不能使用 js 的关键字

```js
const name = 'word'
const jsx = <div>hello, {name}!</div>

ReactDOM.render(jsx, document.getElementById('root'))
```

#### 2-2、函数的使用

```js
const params = {
  first: 'mark',
  last: 'pretter',
}

function formatName(args) {
  return `${args.first} ${args.last}`
}

const jsx = (
  <div>
    <div>{formatName(params)}</div>
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'))
```

#### 2-3、jsx 对象

```js
const good = <div>goods</div>
const jsx = <div>{good}</div>

ReactDOM.render(jsx, document.getElementById('root'))
```

#### 2-4、条件语句

1. 使用三元表达式或者 &&

   ```js
   const show = true
   const loginBtn = '登陆'

   const jsx = (
     <div>
       <div>{show ? loginBtn : '注册'}</div>
       <div>{show && loginBtn}</div>
     </div>
   )

   ReactDOM.render(jsx, document.getElementById('root'))
   ```

2. 使用 if...else（适合逻辑非常多）

   ```js
   import React, { Component } from 'react'

   class Login extends Component {
     render() {
       if (this.props.login) {
         return <div>已登录</div>
       } else {
         return <div>未登录</div>
       }
     }
   }

   export default Login
   ```

3. 模拟 Vue 的 v-show（主要就是 display 属性 block 和 none 切换）

   ```js
   import React, { Component } from 'react'

   class Login extends Component {
     constructor(props) {
       super(props)
       this.state = {
         isShow: true,
       }
     }

     isShowClick() {
       this.setState({
         isShow: !this.state.isShow,
       })
     }

     render() {
       return (
         <div style={{ marginTop: '20px' }}>
           <button onClick={() => this.isShowClick()}>v-show</button>
           <h4 style={{ display: this.state.isShow ? 'block' : 'none' }}>模拟Vue的v-show</h4>
         </div>
       )
     }
   }

   export default Login
   ```

#### 2-5、数组

1. 数组直接使用 jsx，记得要唯一 key

   ```js
   const eles = [<div key="1">数组1</div>, <div key="2">数组2</div>]

   const jsx = <div>{eles}</div>

   ReactDOM.render(jsx, document.getElementById('root'))
   ```

2. 使用 map

   ```js
   const arr = ['arr1', 'arr2', 'arr3']

   const jsx = (
     <div>
       <ul>
         {arr.map((item) => {
           return <li key={item}>{item}</li>
         })}
       </ul>
     </div>
   )

   ReactDOM.render(jsx, document.getElementById('root'))
   ```

> map 和 forEach 区别：forEach 没有返回值

#### 2-6、属性使用

```js
import logo from './logo.svg'

const jsx = (
  <div>
    <img src={logo} className="logo" style={{ width: '100px', height: '100px' }} />
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'))
```

动态添加 class，就像操作 js 字符串一样

```js
class ClassComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
    }
  }

  render() {
    return (
      <div>
        <div className={`first two ${this.state.active ? 'active' : ''}`}>动态绑定class</div>
      </div>
    )
  }
}
```

> 使用 className 是为了避免与 class 组件里面的 class 冲突  
> style 使用 {} 插值， 里面那层的 {} 代表的是一个对象

#### 2-7、模块化

```js
import style from './index.module.css'

const jsx = (
  <div>
    <img
      src={logo}
      // className="logo"
      className={style.logo}
      // style={{width: '100px', height: '100px'}}
    />
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'))
```

> css 模块化可以避免组件之间类名冲突

### 3、组件

#### 3-1、类组件（class component）

```js
import React, { Component } from 'react'

class ClassComponent extends Component {
  constructor(props) {
    super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
    this.state = { date: new Date() }
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.state.date.toLocaleTimeString()}</div>
      </div>
    )
  }
}

export default ClassComponent
```

1. 如果通过类的方式去定义组件，那么组件必须继承于 React.Component 这个类
2. 必须定义一个 render 方法，render 里面返回一个 jsx

#### 3-2、函数式组件（function component）

函数组件中，你无法使用 State，也无法使用组件的生命周期方法，这就决定了函数组件都是展示性组件（Presentational Components），接收 Props，渲染 DOM，而不关注其他逻辑

> React16.8 引入了 hooks，函数组件也可以有状态

```js
import React from 'react'

const FunComponent = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>这是一个函数组件</p>
    </div>
  )
}

export default FunComponent
```

1. 函数组件必须返回 jsx 对象

> 声明了组件，直接导入，然后使用；不需要像 Vue 一样还要去注册

### 4、props

#### 4-1、props 校验

```js
// 单类型校验
[组件名].propTypes = {
  [键名]: PropTypes.[类型]
}

// 组合类型校验（其中一个类型；注意与 oneOf 的区别）
[组件名].propTypes = {
  [键名]: PropTypes.oneOfType([PropTypes.[类型], ...])
}

// 其中一个值
[组件名].propTypes = {
  [键名]: PropTypes.oneOf(['male', 'female'])
}

// 必须要传过来的
[组件名].propTypes = {
  [键名]: PropTypes.[类型].isRequired
}
```

> 常见的类型：array、bool、func、number、object、string

例子：

```js
class ClassComponent extends Component {
  constructor(props) {
    super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
    this.state = { date: new Date() }
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.state.date.toLocaleTimeString()}</div>
      </div>
    )
  }
}

ClassComponent.propTypes = {
  title: PropTypes.string,
}
```

#### 4-2、props 默认值

```js
;[组件名].defaultProps = {
  [键名]: [默认值],
}
```

例子：

```js
class ClassComponent extends Component {
  constructor(props) {
    super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
    this.state = { date: new Date() }
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.state.date.toLocaleTimeString()}</div>
      </div>
    )
  }
}

ClassComponent.defaultProps = {
  title: 'XXX Component',
}
```

### 5、事件绑定

1. 直接在 jsx 渲染的标签对象上进行绑定，需要写成驼峰式；onclick ==> onClick
2. 事件处理函数内部如果需要访问 this，需要通过 bind 进行绑定，或者使用箭头函数
3. 传参：1、通过 bind(this, arg1, arg2, ...) 2、通过包一层箭头函数 onClick={() => {this.handleLog(arg1,arg2)}}

**为什么获取不到 this 问题：**

```js
const obj = {
    name: 'jack',
    fn: function() {
        console.log(this)
    }
}

obj.fn() // 此时的 this 指向 obj

const fn = obj.fn
fn() // 此时的 this 指向 undefind

// 在 react 的事件中同理

<div onClick={this.xxx}></div>
```

#### 5-1、绑定事件

1. 需要通过 bind 进行绑定

   ```js
   class ClassComponent extends Component {
     constructor(props) {
       super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可   访问
       this.state = { date: new Date() }
     }

     handleLog() {
       console.log(this.state.date)
     }

     render() {
       return (
         <div>
           <h1 onClick={this.handleLog.bind(this)}>{this.props.title}</h1>
           <div>{this.state.date.toLocaleTimeString()}</div>
         </div>
       )
     }
   }
   ```

   但是上面那种在 jsx 中绑定可能存在多次绑定 this，例如多个点击事件都需要使用**同一个事件处理函数**，这样会造成一定的性能损耗

   改版：在 class 类执行 constructor 构造器的时候绑定，这样只需要绑定一次，因为构造器只会执行一次

   ```js
   class ClassComponent extends Component {
     constructor(props) {
       super(props)
       this.state = { date: new Date() }

       this.handleLog = this.handleLog.bind(this)
     }

     handleLog() {
       console.log(this.state.date)
     }

     render() {
       return (
         <div>
           <h1 onClick={this.handleLog}>{this.props.title}</h1>
           <div>{this.state.date.toLocaleTimeString()}</div>
         </div>
       )
     }
   }
   ```

2. 通过包一层箭头函数（如果需要传参数，推荐这种，既能传参，又能获取事件对象）

   ```js
   class ClassComponent extends Component {
     constructor(props) {
       super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可   访问
       this.state = { date: new Date() }
     }

     handleLog() {
       console.log(this.state.date)
     }

     render() {
       return (
         <div>
           {/* 这里面为 this.handleLog() 区别于 bind 的 this.handleLog */}
           <h1
             onClick={() => {
               this.handleLog()
             }}
           >
             {this.props.title}
           </h1>
           <div>{this.state.date.toLocaleTimeString()}</div>
         </div>
       )
     }
   }
   ```

3. 方法名为箭头函数（不需要传参数，推荐这种）

   ```js
   class ClassComponent extends Component {
     constructor(props) {
       super(props)
       this.state = { date: new Date() }
     }

     handleLog = () => {
       console.log(this.state.date)
     }

     render() {
       return (
         <div>
           <button onClick={this.handleLog}>方法名为箭头函数绑定事件</button>
         </div>
       )
     }
   }
   ```

   > 因为箭头函数永远不会绑定 this，所以箭头函数内部没有 this；但是会去外层去找 this

#### 5-2、传参

1. 通过 bind(this, arg1, arg2, ...)

   ```js
   class ClassComponent extends Component {
     constructor(props) {
       super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
       this.state = { date: new Date() }
     }

     handleLog(arg1, arg2) {
       console.log(this.state.date, arg1, arg2)
     }

     render() {
       return (
         <div>
           <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
           <div>{this.state.date.toLocaleTimeString()}</div>
         </div>
       )
     }
   }
   ```

   > 注意，此时通过构造器 constructor 绑定 this 传参不能用，因为在 constructor 绑定 this，使用
   > this.xxx(arg1) 会直接执行

2. 通过包一层箭头函数（推荐，既能传参，又能获取事件对象）

   ```js
   class ClassComponent extends Component {
     constructor(props) {
       super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
       this.state = { date: new Date() }
     }

     handleLog(arg1, arg2) {
       console.log(this.state.date, arg1, arg2)
     }

     render() {
       return (
         <div>
           <h1 onClick={(e) => this.handleLog(e, 'arg1', 'arg2')}>{this.props.title}</h1>
           <div>{this.state.date.toLocaleTimeString()}</div>
         </div>
       )
     }
   }
   ```

### 6、state

1. state 是当前组件的自定义属性，通过在 constructor() 中初始化 state
2. 不能直接修改 state，而是需要通过 setState() 去修改，直接修改如：this.state.xxx = 'xxx' 不会重新渲染
3. setState 是会更改组件的，会造成组件的重新渲染，如果短时间有很多 setState 去操作 state，那么就会造成组件不断地更行，影响性能；setState 的异步更新主要就是一个合并批量更新的操作，减少组件的更新次数，达到优化性能的目的
4. state 的更新会被合并，当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state

#### 6-1、初始化一个 state

```js
class ClassComponent extends Component {
  constructor(props) {
    // 初始化一个 state
    this.state = {
      date: new Date(),
      count: 1,
    }
  }
}
```

#### 6-2、通过 setState() 修改 state

> 注意：setState 只有在合成事件和生命周期函数中是异步的，在原生事件和 setTimeout 中都是同步的；异步其实是为了批量更新

**1、setState(partialState, callback)**

1. partialState: object | function(stete, props)

   - 用于产生与当前 state 合并的子集

2. callback: function
   - state 更新后被调用

**2、setState 第一个参数是对象时：**

```js
class ClassComponent extends Component {
  constructor(props) {
    this.state = {
      date: new Date(),
      count: 1,
    }
  }

  handleLog(arg1, arg2) {
    this.setState({
      count: 2,
    })
    console.log(this.state) // 第一次点击的结果 count 还是 1，因为 setState 是异步的
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
      </div>
    )
  }
}
```

**3、setState 第一个参数是函数时：**

```js
class ClassComponent extends Component {
  constructor(props) {
    this.state = {
      date: new Date(),
      count: 1,
    }
  }

  handleLog(arg1, arg2) {
    this.setState((state, props) => {
      return { count: state.count + 1 }
    })
    console.log(this.state) // 第一次点击的结果 count 还是 1，因为 setState 是异步的
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
      </div>
    )
  }
}
```

**4、setState 第二个参数是回调函数，因为 setState 设置 state 是一个异步操作，所以设置完 state 后的操作可以放在回调中执行，在回调中也能获取到更新后的 state**

```js
class ClassComponent extends Component {
  constructor(props) {
    this.state = {
      date: new Date(),
      count: 1,
    }
  }

  handleLog(arg1, arg2) {
    this.setState(
      (state, props) => {
        return { count: state.count + 1 }
      },
      () => {
        console.log('state的值已经变更')
      }
    )
    console.log(this.state) // 第一次点击的结果 count 还是 1，因为 setState 是异步的
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
      </div>
    )
  }
}
```

**5、setState 在原生事件和 setTimeout 中都是同步的**

1. 在 setTimeout 中

   ```js
   class ClassComponent extends Component {
     constructor(props) {
       this.state = {
         date: new Date(),
         count: 1,
       }
     }

     handleLog(arg1, arg2) {
       setTimeout(() => {
         this.setState((state, props) => {
           return { count: state.count + 1 }
         })

         console.log(this.state)
       }, 0)
     }

     render() {
       return (
         <div>
           <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
         </div>
       )
     }
   }
   ```

2. 在原生事件中是同步的

   ```js
   class ClassComponent extends Component {
     constructor(props) {
       super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
       this.state = {
         date: new Date(),
         count: 1,
       }
     }

     handleLog = (arg1, arg2) => {
       this.setState((state, props) => {
         return { count: state.count + 1 }
       })
       console.log(this.state) // 第一次点击的结果 count 还是 1，因为 setState 是异步的
     }

     componentDidMount() {
       // setState 在原生事件是同步的
       document.querySelector('.class-component-event').addEventListener('click', this.handleLog, false)
     }

     render() {
       return (
         <div>
           <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
           <h3 className="class-component-event">setState 在原生事件中是同步的</h3>
           <div>{this.state.date.toLocaleTimeString()}</div>
         </div>
       )
     }
   }
   ```

### 7、生命周期

#### 7-1、react16.3 之前的生命周期

![react16.3 之前的生命周期](/imgs/img3.jpg)

![react16.3 之前的生命周期](/imgs/img4.png)

**1、组件初始化阶段（Initialization）**

```js
import React, { Component } from 'react'

class Xxxx extends Component {
  constructor(props) {
    super(props)
    this.state = { name: 'mark' }
  }
}
```

类继承于 React.Component，所以才有 render()，生命周期等方法可以使用，这也说明为什么函数组件不能使用这些方法的原因。但 react hook 出来后，函数也支持

super(props) 用来调用基类的构造方法 constructor(), 也将父组件的 props 注入给子组件，供子组件读取 (组件
中 props 属性只读不可写，state 可写) 。 而 constructor() 用来做一些组件的初始化工作，比如定义 this.state 的初始内容

**2、组件挂载阶段（Mounting）**

挂载阶段主要是 componentWillMount、render、componentDidMount 这三个生命周期

- componentWillMount：在组件挂载到 DOM 前调用，且只会被调用一次，在这里面调用 this.setState 不会引起组件的重新渲染，也可以把写在这里面的内容改写到 constructor() 中，所以在项目中很少这么使用。

- render：根据组件的 props 和 state（无论两者是重传递或重赋值，无论值是否有变化，都可以引起组件重新 render） ，内部 return 一个 React 元素（描述组件，即 UI），该元素不负责组件的实际渲染工作，之后由 React 自身根据此元素去渲染出页面 DOM。render 是纯函数 （Pure function：函数的返回结果只依赖于它的参数；函数执行过程里面没有副作用），不能在 render()里面执行 this.setState 等操作，会有改变组件状态的副作用。

- componentDidMount：组件挂载到 DOM 后调用，且只会被调用一次

**3、组件更新阶段（Update）**

更新阶段主要是 state 和 props 的更新。props 更新在 shouldComponentUpdate(nextProps,nextState) 之前比 state 多了 componentWillReceiveProps(nextProps)，其他的一样

- componentWillReceiveProps(nextProps)：此方法只调用于 props 引起的组件更新过程中，参数 nextProps 是父组件传给当前组件的新 props。但父组件 render 方法的调用不能保证重传给当前组件的 props 是有变化的，所以在此方法中根据 nextProps 和 this.props 来查明重传的 props 是否改变，以及如果改变了要执行啥，比如根据新的 props 调用 this.setState 触发当前组件的重新 render

- shouldComponentUpdate(nextProps,nextState)：此方法通过比较 nextProps，nextState 及当前组件的 this.props，this.state，返回 true 时当前组件将继续执行更新过程，返回 false 则当前组件更新停止，以此可用来减少组件的不必要渲染，优化组件性能

- componentWillUpdate(nextProps, nextState)：此方法在调用 render 方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用

- render：render 只是重新调用

- componentDidUpdate(prevProps, prevState)：此方法在组件更新后被调用，可以操作组件更新的 DOM，prevProps 和 prevState 这两个参数指的是组件更新前的 props 和 state

react 组件的更新机制：setState 引起的 state 更新，或父组件重新 render 引起的 props 更新，更新后的 state 和 props 相比较之前的结果，无论是否有变化，都将引起子组件的重新 render。造成组件更新有两类（三种）情况

1. 父组件重新 render 父组件重新 render 引起子组件重新 render 的情况有两种

   ```js
   直接使用，每当父组件重新 render 导致的重传 props，子组件都将直接跟着重新渲染，无论 props 是否有变化。可通
   过 shouldComponentUpdate 方法控制优化

   class Child extends Component {
      // 应该使用这个方法，否则无论 props 是否有变化都将会导致组件跟着重新渲染
      shouldComponentUpdate(nextProps){
          if(nextProps.someThings === this.props.someThings){
              return false
          }
      }
      render() {
          return <div>{this.props.someThings}</div>
      }
   }
   ```

2. 在 componentWillReceiveProps 方法中，将 props 转换成自己的 state

   ```js
   class Child extends Component {
      constructor(props) {
          super(props);
          this.state = {
              someThings: props.someThings
          };
      }
      componentWillReceiveProps(nextProps) {
          // 父组件重传 props 时就会调用这个方法
          this.setState({someThings: nextProps.   someThings});
      }
      render() {
          return <>{this.state.someThings}</   div>
      }
   }

   根据官网的描述: 在 componentWillReceiveProps    方法中，将 props 转换成自己的 state
   是因为 componentWillReceiveProps 中判断 props    是否变化了，若变化了，this.setState 将引起    state 变化，从而引起render，此时就没必要再做第二   次因重传 props 来引起 render了，不然就重复做一样   的渲染了
   ```

3. 组件本身调用 setState，无论 state 有没有变化。可以通过 shouldComponentUpdate 方法控制优化

   ```js
   class Child extends Component {
     // 应该使用这个方法，否则无论 props 是否有变化都将会导致组件跟着重新渲染
     shouldComponentUpdate(nextProps, nextState) {
       if (nextState.someThings === this.state.someThings) {
         return false
       }
     }
     render() {
       return <div>{this.props.someThings}</div>
     }
   }
   ```

**4、组件卸载阶段（Unmount）**

- componentWillUnmount：此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清除 componentDidMount 中手动创建的 DOM 元素等，以避免引起内存泄漏。此阶段不能调用 setState，因为组件永远不会重新渲染

#### 7-2、react16.4 之后的生命周期

![react16.4 之后的生命周期](/imgs/img2.jpg)

原来（React v16.3 前）的生命周期在 React v16.4 推出的 Fiber 之后就不合适了，因为如果要开启 async rendering， 在 render 函数之前的所有函数，都有可能被执行多次

在 render 前执行的生命周期有:

- componentWillMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate

如果开发者开了 async rendering，而且又在以上这些 render 前执行的生命周期方法做 AJAX 请求的话，那 AJAX 将被无谓地多次调用。。。明显不是我们期望的结果。而且在 componentWillMount 里发起 AJAX，不管多快得到结果也赶不上首次 render，而且 componentWillMount 在服务器端渲染也会被调用到（当然，也许这是预期的结果），这样的 IO 操作放在 componentDidMount 里更合适

禁止不能用比劝导开发者不要这样用的效果更好，所以除了 shouldComponentUpdate，其他在 render 函数之前的所有函数（componentWillMount，componentWillReceiveProps，componentWillUpdate）都可以被 getDerivedStateFromProps 替代

也就是用一个静态函数 getDerivedStateFromProps 来取代被不建议使用的几个生命周期函数，就是强制开发者在 render 之前只做无副作用的操作，而且能做的操作局限在，根据 props 和 state 决定新的 state

> v17 之后可能会废弃的三个生命周期，目前使用的时候加上 UNSAFE\_；后续这三个会用 getDerivedStateFromProps 替代
>
> - componentWillMount
> - componentWillReceiveProps
> - componentWillUpdate

#### 7-3、新引入的两个生命周期

- static getDerivedStateFromProps
- getSnapshotBeforeUpdate

**1、getDerivedStateFromProps**

```js
static getDerivedStateFromProps(props, state)
```

> static getDerivedStateFromProps(props, state) 在组件初始化和更新时的 render 方法之前调用，父组件传入的 newProps 和当前组件的 prevState 进行比较，判断时候需要更新 state，返回值对象用作更新 state，如果不需要则返回 null。不管什么原因，都会在每次 render 之前触发这个方法。与 componentWillReceiveProps 形成对比，componentWillReceiveProps 仅仅在父组件重新渲染时触发，而在调用 setState 时不触发

```js
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      childDown: 1,
      num: 0,
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.isDown === state.childDown) {
      return {
        num: state.childDown,
      }
    }
    return null
  }
  render() {
    return <div>22</div>
  }
}
```

**2、getSnapshotBeforeUpdate**

```js
getSnapshotBeforeUpdate(prevProps, prevState)
```

> getSnapshotBeforeUpdate() 被调用于 render 之后，在 componentDidUpdate 之前。适用场景是可以读取但无法使用 DOM 的时候。它使组件可以在更改之前从 DOM 捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给 componentDidUpdate() (基本用处不大)

```js
class ScrollingList extends Component {
  constructor(props) {
    super(props)
    this.listRef = React.createRef()
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    //我们是否要添加新的 items 到列表?
    // 捕捉滚动位置，以便我们可以稍后调整滚动.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current
      return list.scrollHeight - list.scrollTop
    }
    return null
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //如果我们有snapshot值, 我们已经添加了 新的items.
    // 调整滚动以至于这些新的items 不会将旧items推出视图。
    // (这边的snapshot是 getSnapshotBeforeUpdate方法的返回值)
    if (snapshot !== null) {
      const list = this.listRef.current
      list.scrollTop = list.scrollHeight - snapshot
    }
  }
  render() {
    return <div ref={this.listRef}>{/* ...contents... */}</div>
  }
}
```

### 8、React 中的 Dom 操作

通过 ref 获取 Dom，然后通过 this.refs.xxx 操作

```js
class ClassComponent extends Component {
  constructor(props) {
    super(props) // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
    this.state = {
      date: new Date(),
      count: 1,
    }
  }

  componentDidMount() {
    // 操作 Dom
    this.refs.textIpt.focus()
  }

  render() {
    return (
      <div>
        <input ref="textIpt" />
      </div>
    )
  }
}
```

> 不要在 render 或者 render 之前访问 refs

### React Hook

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性（生命周期等）。Hook 不可以在 class 组件中使用。

#### -1、useState

这就是一个 hook，可以在 function 组件定义 State。

在 React Hook 没出来之前，Function Component 也叫做 Functional Stateless Component（FSC），这是因为 Function Component 每次执行的时候都会生成新的函数作用域所以同一个组件的不同渲染（render）之间是不能够共用状态的，因此开发者一旦需要在组件中引入状态就需要将原来的 Function Component 改成 Class Component，这使得开发者的体验十分不好。useState 就是用来解决这个问题的，它允许 Function Component 将自己的状态持久化到 React 运行时（runtime）的某个地方（memory cell），这样在组件每次重新渲染的时候都可以从这个地方拿到该状态，而且当该状态被更新的时候，组件也会重渲染。

```js
import React, { useState } from 'react'

function HookComponent() {
  // count 是一个 state，setCount 是用来设置 count 值的
  // 这里最好使用 const 来做声明关键字，防止我们意外直接修改 state 而没有通过 set 方法去设置。
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>点击了 {count} 下</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  )
}

export default HookComponent
```

使用 hook 的 setCount 和 React 自带的 setState 区别：setState 是合并 state，而 setCount 是替换值，毕竟 setCount 只为一个 state 服务

这个设置 state 初始值，和调用方法修改 state 并不难

当然如果有多个 state，那么你只需调用多次 useState 即可

> useState 的 setState 是全量替代，而 this.setState 是将当前设置的 state 浅归并（shallowly merge）到旧 state 的操作。所以在使用 useState 的 setState 时，应该避免将没有关系的状态放在一起管理

#### -2、useEffect

useEffect 这个 Hook 使你的 function 组件具有生命周期的能力！可以看做是 componentDidMount，componentDidUpdate，componentWillUnmount 这三个生命周期函数的组合。通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为“effect”），并且在执行 DOM 更新之后调用它

**useEffect(effect, dependencies)**

- effect: function  
  要执行的副作用函数，它可以是任意的用户自定义函数，用户可以在这个函数里面操作一些浏览器的 API 或者和外部环境进行交互（例如：请求），这个函数会在**每次组件渲染完成之后**被调用

- dependencies?: [prop, ...]
  只有在 dependencies 数组里面的元素的值发生变化时才会执行 effect 副作用函数，优化性能，避免死循环

```js
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const UserDetail = ({ userId }) => {
  const [userDetail, setUserDetail] = useState({})

  useEffect(() => {
    fetch(`https://myapi/users/${userId}`)
      .then((response) => response.json())
      .then((user) => setUserDetail(userDetail))
  })

  return (
    <div>
      <div>User Name: {userDetail.name}</div>
    </div>
  )
}
```

上面定义的获取用户详情信息的副作用会在 UserDetail 组件每次完成渲染后执行，所以当该组件第一次挂载的时候就会向服务器发起获取用户详情信息的请求然后更新 userDetail 的值，这里的第一次挂载我们可以类比成 Class Component 的 componentDidMount。可是如果试着运行一下上面的代码的话，你会发现代码进入了死循环：组件会不断向服务端发起请求。出现这个死循环的原因是 useEffect 里面调用了 setUserDetail，这个函数会更新 userDetail 的值，从而使组件重渲染，而重渲染后 useEffect 的 effect 继续被执行，进而组件再次重渲染。。。为了避免重复的副作用执行，useEffect 允许我们通过第二个参数 dependencies 来限制该副作用什么时候被执行：指明了 dependencies 的副作用，只有在 dependencies 数组里面的元素的值发生变化时才会被执行，因此如果要避免上面的代码进入死循环我们就要将 userId 指定为我们定义的副作用的 dependencies

如果指定一个空数组作为这个副作用的 dependencies，那么这个副作用只会在组件首次渲染的时候被执行一次

```js
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const UserDetail = ({ userId }) => {
  const [userDetail, setUserDetail] = useState({})

  useEffect(() => {
    fetch(`https://myapi/users/${userId}`)
      .then((response) => response.json())
      .then((user) => setUserDetail(userDetail))
  }, [userId])

  return (
    <div>
      <div>User Name: ${userDetail.name}</div>
    </div>
  )
}
```

除了发起服务端的请求外，往往还需要在 useEffect 里面调用浏览器的 API，例如使用 addEventListener 来添加浏览器事件的监听函数等。我们一旦使用了 addEventListener 就必须在合适的时候调用 removeEventListener 来移除对事件的监听，否则会有性能问题，useEffect 允许我们在副作用函数里面返回一个 cleanup 函数，这个函数会在组件重新渲染之前被执行，我们可以在这个返回的函数里面移除对事件的监听（即移除副作用）

```js
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const WindowScrollListener = () => {
  useEffect(() => {
    const handleWindowScroll = () => console.log('yean, window is scrolling!')
    window.addEventListener('scroll', handleWindowScroll)

    return () => {
      window.removeEventListener(handleWindowScroll)
    }
  }, [])

  return <div>I can listen to the window scroll event!</div>
}
```

上面的代码中我们会在 WindowScrollListener 组件首次渲染完成后注册一个监听页面滚动事件的函数，并在组件下一次渲染前移除该监听函数。由于我们指定了一个空数组作为这个副作用的 dependencies，所以这个副作用只会在组件首次渲染时被执行一次，而它的 cleanup 函数只会在组件 unmount 时才被执行，这就避免了频繁注册页面监听函数从而影响页面的性能

**useEffect 比较常见的三种场景**

1. 替代 componentDidMount，使用 useEffect，第二个参数传入空数组

   ```js
   function Example() {
     const [dataSource, setdataSource] = useState([]);

     useEffect(() => {
       const dataSource = await getSceneList();
       setDataSource(dataSource);
     }, []);

     return <div></div>;
   }
   ```

2. 替代 componentDidUpdate，使用 useEffect，第二个参数为更新依赖

   ```js
   function Example() {
     const [query, setQuery] = useState({});
     const [dataSource, setDataSource] =    useState([]);

     useEffect(() => {
       const dataSource = await getSceneList();
       setDataSource(setDataSource);
     }, [query]);

     return <div></div>;
   }
   ```

3. 替代 componentWillUnmount 方案，使用 useEffect，第一个参数返回函数会在组件卸载前执行，第二个参数为空数组

   ```js
   function Example() {
     useEffect(() => {
       const listener = (e) => {
         console.log(e)
       }
       document.addEventListener('onClick', listener, false)

       return () => {
         document.removeEventListener('onClick', listener, false)
       }
     }, [])

     return <div></div>
   }
   ```

#### -3、useRef

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变

- 获取子组件或者 dom 节点
- 渲染周期之间共享数据的存储（不常用）

```js
const HookComponent = (id) => {
  const iptRef = useRef()

  useEffect(() => {
    iptRef.current.focus()
  }, []) // 指定了一个空数组作为这个副作用的 dependencies，所以这个副作用只会在组件首次渲染时被执行一次

  return (
    <div>
      <input ref={iptRef} type="text" />
    </div>
  )
}
```

> 注意：更新 ref 对象不会触发组件重渲染；即 useRef 返回的 ref object 被重新赋值的时候不会引起组件的重渲染

#### -3、useCallback
