# react 的一些面试点

面试题汇总：

- https://www.yuque.com/cuggz/interview/pgw8v4
- https://q.shanyue.tech/fe/react
- https://juejin.cn/post/7348651815759282226



### react 的理解和特点

- 用于构建用户界面的 JS 库
- 声明式编程（表达逻辑而不定义步骤，即关注你要做什么而不是怎么做）
- 组件化开发，组件间组合、嵌套构成整体页面
- 使用虚拟 DOM 高效操作 DOM
- 遵循高阶组件到低阶组件的单向数据流
- JSX 语法
- 状态管理
- Hook



### JSX 是什么，有什么用，优缺点

JSX 是一种语法糖，允许开发者在 JavaScript 代码中直接编写类似 HTML 的标记。它最终会被编译成普通的 JavaScript 代码

**优点**

- 简单直观
  - JSX 的语法与 HTML 类似，开发者可以轻松理解和编写 UI 结构
  - 可以在 JSX 中直接嵌入 JavaScript 表达式，实现动态内容渲染
- 提高效率
  - 组件化
  - 虚拟 DOM
  - 跨浏览器兼容
- 生态系统
  - 丰富的工具链
  - 社区支持
- 维护性
  - 声明式编程
  - ts 类型友好

**缺点**

- 有一定的上手成本
- 需要经过编译
- 有一定的性能问题



### useState 初始化传递函数有什么用

useState 初始化其实可以传入值，也可以传入函数。当传入函数时，它只会在初始化时调用一次，用于惰性初始化

也就是：只有在组件首次渲染时，useState 才会执行传入的初始化函数，更新时使用执行过的值，而不会在每次组件重新渲染时都执行函数。这样可以提高性能，避免不必要的计算。



### state 和 props 的区别

**相同**

- 触发重新渲染：两者变化时都会触发组件重新渲染（除非通过 `shouldComponentUpdate` 或 `React.memo` 优化）

- 影响 UI 输出：组件的渲染结果（`render()` 或返回值）依赖于它们的值。

- 可用于传递数据：父组件可以通过 `props` 向子组件传递数据，子组件也可以通过 `state` 管理自身数据



**区别：**

|    **特性**    |           **State（状态）**            |                 **Props（属性）**                 |
| :------------: | :------------------------------------: | :-----------------------------------------------: |
|  **数据来源**  |              组件内部管理              |              父组件传递（或默认值）               |
|   **可变性**   | 组件内部通过 `setState` 或 Hooks 修改  |      **不可变**（父组件重新传递时才会更新）       |
|  **作用范围**  |       组件私有，外部无法直接访问       |         父组件向子组件传递数据或回调函数          |
|  **使用场景**  | 存储组件内部状态（如表单输入、计数器） |     配置子组件行为或传递数据（如标题、回调）      |
| **初始化方式** |   `useState` 或类组件的 `this.state`   | 通过组件标签属性传递（如 `<Child name="Alice" />` |



### super() 和 super(props) 有什么区别



### 附录：React 100 道面试题

1. 简述React有什么特点？

2. 简述虚拟DOM的概念和机制 ？

3. React 类组件和函数组件之间的区别是什么？

4. 简述React 中 refs 的作用 ？

5. 简述React store的概念 ？

6. 请介绍React中的key有什么作用？

7. 简述类组件和函数式组件的区别 ？

8. 请列举React和vue.js的相似性和差异性 ？

9. React中什么是受控组件和非控组件？

10. Redux 中间件是怎么拿到store 和 action? 然后怎么处理?

11. React Hook 的使用限制有哪些？

12. React Hooks在平时开发中需要注意的问题和原因 ？

13. React的严格模式如何使用，有什么用处？

14. State 是怎么注入到组件的，从 reducer 到组件经历了什么样的过程 ？

15. React state和props区别是什么 ?

16. 简述什么是React 高阶组件？

17. 请简述useCallback 和 useMemo 的使用场景 ？

18. 解释React组件的生命周期方法 ？

19. 解释React中的合成事件是什么？

20. useEffect()的清除机制是什么？在什么时候执行？

21. useState()的 state 是否可以直接修改？是否可以引起组件渲染？

22. 完整的简述React 的 diff 过程 ？

23. 请简述react-router 和 react-router-dom 的有什么区别？

24. 在 React中元素（ element）和组件（ component）有什么区别？

25. 约束性组件（ controlled component）与非约束性组件（ uncontrolled component）有什么区别？

26. React shouldComponentUpdate有什么用？为什么它很重要？

27. 如何用 React构建（ build）生产模式？

28. createElement和 cloneElement有什么区别？

29. React setState方法的第二个参数有什么用？使用它的目的是什么？

30. 请说岀 React从 ES5编程规范到 ES6 编程规范过程中的几点改变?

31. 简述React中D算法的原理是什么？

32. 请简述React生命周期调用方法的顺序 ？

33. 简述 React组件开发中关于作用域的常见问题 ？

34. Redux中使用 Action要注意哪些问题？

35. 简述如何使用4.0版本的 React Router？

36. 解释React Reducer的作用？

37. 请用源码解释React setState 调用的原理 ？

38. 简述shouldComponentUpdate 作用？为什么它很重要？

39. React中如何避免不必要的render？

40. 简述React- Router有几种形式？

41. 解释为什么调用 setState 而不是直接改变 state？

42. 解释 React 中 render() 的目的和作用 ？

43. React如何获取组件对应的DOM元素？

44. 请说明React中getDefaultProps 的作用 ？

45. 请简述React组件的构造函数的作用？

46. 简述React Hooks在平时开发中需要注意的问题和原因 ？

47. 在React中组件的this.state和setState有什么区别？

48. 如何配置 React-Router 实现路由切换？

49. 简述React中hooks是如何模拟组件的生命周期的？

50. 简述什么是React中的错误边界？

51. 叙述React如何使用Redux（使用流程） ?

52. 简述reducer是纯函数吗？说明其原因

53. 执行两次setState的时候会render几次？会不会立即触发？

54. React 什么是 Reselect 以及它是如何工作的 ？

55. 在React中如何防范XSS攻击？

56. 简述点(…)在 React 的作用 ？

57. 如何避免React 组件的重新渲染？

58. 请简述当调用setState时，React render 是如何工作的？

59. 解释如何避免在React重新绑定实例？

60. Component, Element, Instance 之间有什么区别和联系？

61. 简述React.createClass和extends Component的区别有哪些？

62. 简述对React中Fragment的理解，它的使用场景是什么？

63. 简述React的插槽(Portals)的理解？

64. 简述对React-Intl 的理解，它的工作原理？

65. React 并发模式是如何执行的？

66. 简述super()和super(props)有什么区别？

67. 简述React中组件间过渡动画如何实现？

68. 简述如何Redux 中的异步请求 ？

69. React.forwardRef是什么？它有什么作用？

70. React中constructor和getInitialState的区别?

71. 简述原生事件和React事件的区别 ？

72. React ⾼阶组件、Render props、hooks 有什么区别，为什么要 不断迭代 ？

73. 哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么 ？

74. 简述为什么React并不推荐优先考虑使⽤Context？

75. 简述React中的setState和replaceState的区别是什么 ？

76. 简述React中的props为什么是只读的 ？

77. 在React中组件的props改变时更新组件的有哪些方法 ？

78. React 16.X 中 props 改变后在哪个生命周期中处理 ？

79. React 性能优化在哪个生命周期？它优化的原理是什么？

80. 简述state 和 props 触发更新的生命周期分别有什么区别？

81. 简述非嵌套关系组件的通信方式 ？

82. 简述React-Router的实现原理是什么 ？

83. 简述React-Router怎么设置重定向？

84. 简述React-Router 4怎样在路由变化时重新渲染同⼀个组件 ？

85. 简述React-Router的路由有⼏种模式 ？

86. 简述Redux 怎么实现属性传递，介绍下原理 ？

87. Redux 中间件是什么？接受几个参数？柯里化函数两端的参数具体是什么 ？

88. Redux 请求中间件如何处理并发 ？

89. 简述Redux 和 Vuex 有什么区别，它们的共同思想 ？

90. 简述Redux 中间件是怎么拿到store 和 action? 然后怎么处理 ？

91. 简述为什么 useState 要使用数组而不是对象 ？

92. 简述React Hooks 解决了哪些问题 ？

93. 简述 React Hook 的使用限制有哪些 ？

94. 简述React diff 算法的原理是什么 ？

95. 简述 React key 是干嘛用的 为什么要加？key 主要是解决哪⼀类问题的？

96. 简述React 与 Vue 的 diff 算法有何不同 ？

97. 简述 react 最新版本解决了什么问题，增加了哪些东⻄ ？

98. 简述在React中怎么使⽤async/await ？

99. 简述React.Children.map和js的map有什么区别 ？

100. 简述React 中的高阶组件运用了什么设计模式 ？
