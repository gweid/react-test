# react 相关的优化



## 渲染控制

从调度更新任务到调和 fiber，再到浏览器渲染真实 DOM，每一个环节都是渲染的一部分，至于对于每个环节的性能优化，React 在底层已经处理了大部分优化细节，包括设立任务优先级、异步调度、diff算法、时间分片都是 React 为了提高性能，提升用户体验采取的手段。开发者只需要告诉 React 哪些组件需要更新，哪些组件不需要更新。React 提供了 PureComponent，shouldComponentUpdated，memo 等优化手段。



优秀文章

- https://juejin.cn/post/7269232113793974283



### render 阶段作用

**render的作用**是根据一次更新中产生的新状态值，通过 React.createElement ，替换成新的状态，得到新的 React element 对象，新的 element 对象上，保存了最新状态值。 createElement 会产生一个全新的props。

> 注意：render 阶段没有真实渲染了 DOM，真实 DOM 是在 commit 阶段挂载的



### react 控制 render 的几种方式

React 对 render 的控制，究其本质，主要有以下两种方式：

- 第一种就是从父组件直接隔断子组件的渲染，经典的就是 memo，缓存 element 对象。
- 第二种：组件从自身来控制是否 render ，比如：PureComponent ，shouldComponentUpdate。



#### 第一种：缓存 React.element 对象

对 React.element 对象的缓存。这是一种父对子的渲染控制方案，父组件 render ，子组件有没有必要跟着父组件一起 render ，如果没有必要，则就需要阻断更新流

如下代码：

```jsx
// ------------------------- 父组件
const RenderFather = () => {
  const [num, setNum] = useState(1)
  const [title, setTitle] = useState('title')

  const handleAdd = () => {
    setNum(num + 1)
  }

  const handleChange = () => {
    setTitle('title变了')
  }

  console.log('父组件渲染');

  return (
    <div>
      <RenderSon title={title} />
      <p>num: {num}</p>
      <button onClick={handleAdd}>加一</button>
      <button onClick={handleChange}>修改title</button>
    </div>
  )
}




// ------------------------- 子组件
const RenderSon = (props) => {
  console.log('子组件渲染了');

  return (
    <div>
      <p>RenderSon</p>
      <p>{props.title}</p>
    </div>
  )
}
```

父组件每次点击，num 值加一，但是对于子组件，只有 title 的值才是有用的，但是此时，num 变化也造成了子组件重新渲染

此时，就可以使用缓存 element 来避免 children 没有必要的更新。此时可以使用 useMemo

父组件修改如下：

```jsx
const RenderFather = () => {
  const [num, setNum] = useState(1)
  const [title, setTitle] = useState('title')

  const handleAdd = () => {
    setNum(num + 1)
  }

  const handleChange = () => {
    setTitle('title变了')
  }

  console.log('父组件渲染');

  return (
    <div>
      <h1>------------------------------------------------------------------</h1>
      
      // 变更这里，将子组件放在 useMemo 中
      { useMemo(() => <RenderSon title={title} />, [title]) }
      <RenderSon title={title} />
      <p>num: {num}</p>
      <button onClick={handleAdd}>加一</button>
      <button onClick={handleChange}>修改title</button>
    </div>
  )
}
```



##### 缓存 element 的原理

每次执行 render 本质上 createElement 会产生一个新的 props，这个 props 将作为对应 fiber 的 `pendingProps` ，在此 fiber 更新调和阶段，React 会对比 fiber 上老 oldProps 和新的 newProp （ pendingProps ）是否相等，如果相等函数组件就会放弃子组件的调和更新，从而子组件不会重新渲染；如果上述把 element 对象缓存起来，上面 props 也就和 fiber 上 oldProps 指向相同的内存空间，也就是相等，从而跳过了本次更新。



##### useMemo 使用

```jsx
const cacheSomething = useMemo(create,deps)
```

- `create`：第一个参数为一个函数，函数的返回值作为缓存值，如上 demo 中把 Children 对应的 element 对象，缓存起来。
- `deps`： 第二个参数为一个数组，存放当前 useMemo 的依赖项，在函数组件下一次执行的时候，会对比 deps 依赖项里面的状态，是否有改变，如果有改变重新执行 create ，得到新的缓存值。
- `cacheSomething`：返回值，执行 create 的返回值。如果 deps 中有依赖项改变，返回的重新执行 create 产生的值，否则取上一次缓存值。



##### useMemo 基本原理

useMemo 会记录上一次执行 create 的返回值，并把它绑定在函数组件对应的 fiber 对象上，只要组件不销毁，缓存值就一直存在，但是 deps 中如果有一项改变，就会重新执行 create ，返回值作为新的值记录到 fiber 对象上。



##### useMemo应用场景

- 可以缓存 element 对象，从而达到按条件渲染组件，优化性能的作用。
- 如果组件中不期望每次 render 都重新计算一些值,可以利用 useMemo 把它缓存起来。
- 可以把函数和属性缓存起来，作为 PureComponent 的绑定方法，或者配合其他Hooks一起使用。



#### 利用 PureComponent

当类组件继承 PureComponent ，那么会 **浅比较 state 和 props 是否相等** 来判断是否重新 render。



```jsx
// -------------------------- 父组件
class RenderFather extends Component {
  constructor() {
    super()

    this.state = {
      num: 1,
      title: 'title'
    }
  }

  handleAdd = () => {
    this.setState({
      num: this.state.num + 1
    })
  }

  handleChange = () => {
    this.setState({
      title: 'title变了'
    })
  }

  render() {
    const { title, num } = this.state
    return (
      <div>
        <button onClick={this.handleAdd}>加一</button>
        <button onClick={this.handleChange}>修改title</button>
        <RenderSon title={title} />
      </div>
    )
  }
}


// -------------------------- 子组件
class RenderSon extends PureComponent {
  constructor() {
    super()

    this.state = {
      name: 'son',
      attr: {
        sex: 1
      }
    }
  }

  handleAttr = () => {
    const { attr } = this.state
    attr.sex = 2
    this.setState({ attr })
  }

  render() {
    console.log('子组件重新渲染了')

    return (
      <div>
        <button onClick={() => this.setState({ name: 'son' })}>state相同</button>
        <button onClick={() => this.setState({ name: 'sonsub' })}>state不同</button>
        <button onClick={this.handleAttr}>引用数据类型</button>
      </div>
    )
  }
}
```

- 对于 props ，PureComponent 会浅比较 props 是否发生改变，再决定是否渲染组件

- 对于 state ，如上也会浅比较处理，当 ‘ state 相同情况’ 时，组件不会渲染。

- 浅比较只会比较基础数据类型，对于引用类型，单纯的改变 obj 下属性是不会促使组件更新的，因为浅比较两次 obj 还是指向同一个内存空间，想要解决这个问题，重新创建了一个 obj ，浅比较会不相等，组件就会更新。

  ```jsx
  // 这样，就会重新 render
  handleAttr = () => {
    const { attr } = this.state
    attr.sex = 2
    this.setState({ attr: { ...attr } })
  }
  ```



##### PureComponent 浅比较原理

当选择基于 PureComponent 继承的组件。原型链上会有 isPureReactComponent 属性。

> react/src/ReactBaseClasses.js

```jsx
/* pureComponentPrototype 纯组件构造函数的 prototype 对象，绑定isPureReactComponent 属性。 */
pureComponentPrototype.isPureReactComponent = true;
```



`isPureReactComponent` 这个属性在更新组件 `updateClassInstance` 方法中使用的，`updateClassInstance`在更新组件的时候被调用，在这个函数内部，有一个专门负责检查是否更新的函数 `checkShouldComponentUpdate` 。

> react/react-reconciler/ReactFiberClassComponent.js

```jsx
function checkShouldComponentUpdate(){
     if (typeof instance.shouldComponentUpdate === 'function') {
         return instance.shouldComponentUpdate(newProps,newState,nextContext)  /* shouldComponentUpdate 逻辑 */
     } 
    if (ctor.prototype && ctor.prototype.isPureReactComponent) {
        return  !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    }
}
```

- isPureReactComponent 就是判断当前组件是不是纯组件的，如果是 PureComponent 会浅比较 props 和 state 是否相等。
- 还有一点值得注意的就是 shouldComponentUpdate 的权重，会大于 PureComponent。



shallowEqual 的比较过程：

> shared/shallowEqual.js

```jsx
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}


function shallowEqual(objA: mixed, objB: mixed): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
```

- 第一步：首先会直接比较新老 props 或者新老 state 是否相等。如果相等那么不更新组件。
- 第二步：判断新老 state 或者 props ，有不是对象或者为 null 的，那么直接返回 false ，更新组件。
- 第三步：通过 Object.keys 将新老 props 或者新老 state 的属性名 key 变成数组，判断数组的长度是否相等，如果不相等，证明有属性增加或者减少，那么更新组件。
- 第四步：遍历老 props 或者老 state ，判断对应的新 props 或新 state ，有没有与之对应并且相等的（这个相等是浅比较），如果有一个不对应或者不相等，那么直接返回 false ，更新组件。 到此为止，浅比较流程结束， PureComponent 就是这么做渲染节流优化的。



##### PureComponent 注意事项

PureComponent 可以让组件自发的做一层性能上的调优，但是，父组件给是 PureComponent 的子组件绑定事件要格外小心，避免两种情况发生：



**第一种情况：**

避免使用箭头函数。不要给是 PureComponent 子组件绑定箭头函数，因为父组件每一次 render ，如果是箭头函数绑定的话，都会重新生成一个新的箭头函数， PureComponent 对比新老 props 时候，因为是新的函数，所以会判断不想等，而让组件直接渲染，PureComponent 作用终会失效。

```jsx
// --------------------- 子组件
class RenderSon extends React.PureComponent{}


// --------------------- 父组件
class RenderFather extends Component {

  render() {
    return (
      // 绑定了箭头函数
      <RenderSon callback={() => {}}/>
    )
  }
}
```



**第二种情况：**

PureComponent 的父组件是函数组件的情况，绑定函数要用 useCallback 或者 useMemo 处理。在用 class + function 组件开发项目的时候，如果父组件是函数，子组件是 PureComponent ，那么绑定函数要小心，因为函数组件每一次执行，会声明一个新的函数， PureComponent 对比同样会失效

```jsx
// --------------------- 子组件
class RenderSon extends React.PureComponent{}


// --------------------- 父组件
const RenderFather = () => {
  
  const callback = () => {}

  return (
    // 绑定了箭头函数
    <RenderSon callback={callback}/>
  )
}
```



要解决这个问题，可以使用 useCallback 对函数进行缓存，useCallback 初衷就是为了解决这种情况的：

```jsx
// --------------------- 子组件
class RenderSon extends React.PureComponent{}


// --------------------- 父组件
const RenderFather = () => {

  const callback = useCallback(() => {}, [])

  return (
    // 绑定了箭头函数
    <RenderSon callback={callback}/>
  )
}
```



#### 利用 shouldComponentUpdate

有的时候，把控制渲染，性能调优交给 React 组件本身处理显然是靠不住的，React 需要提供给使用者一种更灵活配置的自定义渲染方案，使用者可以自己决定是否更新当前组件，shouldComponentUpdate 就能达到这种效果。

```jsx
shouldComponentUpdate(newProp, newState, newContext): boolean
```

shouldComponentUpdate 可以根据传入的新的 props 和 state ，或者 newContext 与原来的进行对比，从而确定是否更新组件，返回 true 表示要更新，返回 false 表示不更新



但是有一种情况就是如果子组件的 props 是引用数据类型，比如 object ，还是不能直观比较是否相等。`immutable.js` 可以解决此问题，immutable.js 不可变的状态，对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。鉴于这个功能，所以可以把需要对比的 props 或者 state 数据变成 Immutable 对象，通过对比 Immutable 是否相等，来证明状态是否改变，从而确定是否更新组件。



#### 利用函数组件的 memo

```jsx
memo(Component, compare)
```

memo 接受两个参数

- 第一个参数 Component 原始组件本身

- 第二个参数 compare 是一个函数，可以根据一次更新中 props 是否相同决定原始组件是否重新渲染。

  > 提示：一般情况下不要试图组件通过第二个参数直接返回 true 来阻断渲染。这样可能会造成很多麻烦。



memo 可作为一种容器化的控制渲染方案，可以对比 props 变化，来决定是否渲染组件

> 注意，memo 是只对比 prop，不对比 state。PureComponent 会对比 state 和 prop



memo的几个特点是：

- React.memo: 第二个参数 返回 true 组件不渲染 ， 返回 false 组件重新渲染。和 shouldComponentUpdate 相反，shouldComponentUpdate : 返回 true 组件渲染 ， 返回 false 组件不渲染。
- memo 当二个参数 compare 不存在时，会用**浅比较原则**处理 props ，相当于仅比较 props 版本的 pureComponent 。
- memo 同样**适合类组件和函数组件**。



被 memo 包裹的组件，element 会被打成 `REACT_MEMO_TYPE` 类型的 element 标签，在 element 变成 fiber 的时候， fiber 会被标记成 MemoComponent 的类型。

> react/src/ReactMemo.js

```jsx
function memo(type,compare){
  const elementType = {
    $$typeof: REACT_MEMO_TYPE, 
    type,  // 我们的组件
    compare: compare === undefined ? null : compare,  //第二个参数，一个函数用于判断prop，控制更新方向。
  };
  return elementType
}
```

> react-reconciler/src/ReactFiber.js

```jsx
switch (key) {
  case REACT_MEMO_TYPE:
    fiberTag = MemoComponent;
}
```



接着看下 MemoComponent React 内部是如何处理的。React 对 MemoComponent 类型的 fiber 有单独的更新处理逻辑 updateMemoComponent

> react-reconciler/src/ReactFiberBeginWork.js

```jsx
function updateMemoComponent(){
    if (updateExpirationTime < renderExpirationTime) {
         let compare = Component.compare;
         compare = compare !== null ? compare : shallowEqual //如果 memo 有第二个参数，则用二个参数判定，没有则浅比较props是否相等。
        if (compare(prevProps, nextProps) && current.ref === workInProgress.ref) {
            return bailoutOnAlreadyFinishedWork(current,workInProgress,renderExpirationTime); //已经完成工作停止向下调和节点。
        }
    }
    // 返回将要更新组件,memo包装的组件对应的fiber，继续向下调和更新。
}
```

memo 主要逻辑是

- 通过 memo 第二个参数，判断是否执行更新，如果没有那么第二个参数，那么以浅比较 props 为 diff 规则。如果相等，当前 fiber 完成工作，停止向下调和节点，所以被包裹的组件即将不更新。
- memo 可以理解为包了一层的高阶组件，它的阻断更新机制，是通过控制下一级 children ，也就是 memo 包装的组件，是否继续调和渲染，来达到目的的。



#### 打破渲染限制

- **forceUpdate**：类组件更新如果调用的是 forceUpdate 而不是 setState ，会跳过 PureComponent 的浅比较和 shouldComponentUpdate 自定义比较。其原理是组件中调用 forceUpdate 时候，全局会开启一个 hasForceUpdate 的开关。当组件更新的时候，检查这个开关是否打开，如果打开，就直接跳过 shouldUpdate 。
- **context穿透**：上述的几种方式，都不能本质上阻断 context 改变而带来的渲染穿透，所以在使用 Context 时要格外小心，既然选择了消费 context ，就要承担 context 改变带来的更新作用。



#### 渲染控制流程图

![](./imgs/img36.png)



### 对于 render 的思考



#### 有没有必要在乎组件不必要渲染

在正常情况下，无须过分在乎 React 没有必要的渲染，要理解执行 render 不等于真正的浏览器渲染视图，render 阶段执行是在 js 当中，js 中运行代码远快于浏览器的 Rendering 和 Painting 的，更何况 React 还提供了 diff 算法等手段，去复用真实 DOM 。



#### 什么时候需要注意渲染节流

对于以下情况，需要考虑私用渲染节流：

- 第一种：数据可视化的模块组件（展示了大量的数据），这种一次更新，可能伴随大量的 diff ，数据量越大也就越浪费性能，所以对于数据展示模块组件，有必要采取 memo，shouldComponentUpdate 等方案控制自身组件渲染。
- 第二种：含有大量表单的页面，React 一般会采用受控组件的模式去管理表单数据层，表单数据层完全托管于 props 或是 state ，而用户操作表单往往是频繁的，需要频繁改变数据层，所以很有可能让整个页面组件高频率 render 。
- 第三种：越是靠近 app root 根组件越值得注意，根组件渲染会波及到整个组件树重新 render ，子组件 render ，一是浪费性能，二是可能执行 useEffect ，componentWillReceiveProps 等钩子，造成意想不到的情况发生。



#### 实际开发细节

- 开发过程中对于大量数据展示的模块，开发者有必要用 shouldComponentUpdate ，PureComponent来优化性能。
- 对于表单控件，最好办法单独抽离组件，独自管理自己的数据层，这样可以让 state 改变，波及的范围更小。
- 如果需要更精致化渲染，可以配合 immutable.js 。
- 组件颗粒化，配合 memo 等 api ，可以制定私有化的渲染空间。




## 渲染调优






## 海量数据






## 其它细节





