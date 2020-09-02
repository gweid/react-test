import React, { Component } from 'react';
import PropTypes from 'prop-types';

// V17 可能会废弃的三个⽣命周期函数⽤ getDerivedStateFromProps 替代，⽬前使⽤的话加上 UNSAFE_：
//     componentWillMount
//     componentWillReceiveProps
//     componentWillUpdate

// 引⼊两个新的⽣命周期函数：
//     static getDerivedStateFromProps
//     getSnapshotBeforeUpdate

class Child extends Component {
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    UNSAFE_componentWillReceiveProps(nextProps) {
        // 不推荐，将会被废弃
        // componentWillReceiveProps 会在已挂载的组件接收新的 props 之前被调用
        console.log('Child componentWillReceiveProps');
    }
    componentWillUnmount() {
        // 组件卸载之前
        console.log('Child componentWillUnmount');
    }
    render() { 
        return (
            <div style={{ border: "solid 1px black", margin: "10px", padding: "10px" }}>
                我是子组件
                <div>child count：{this.props.count}</div>
            </div>
        );
    }
}

class LifeCyclePage extends Component {
    static defaultProps = {
        title: 'test lifeCycle'
    }
    static propTypes = {
        title: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        console.log('constructor：', this.state.count);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // getDerivedStateFromProps 在 render 之前调用
        // 无论是初始化还是后续更新都会被调用
        // 应该返回一个对象来更新 state，如果返回 null，则不更新任何内容
        const { count } = prevState;
        console.log('getDerivedStateFromProps：', count);
        return count < 5 ? null : { count: 0 }; 
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // 在 render 之后 componentDidUpdate 之前执行
        // 此生命周期返回的任何值都将作为参数传递给 componentDidUpdate()
        const { count } = prevState;
        console.log('getSnapshotBeforeUpdate：', count, this.state.count);
        return null
    }
    // UNSAFE_componentWillMount() {
    //     // 不推荐使用，即将废弃
    //     const { count } = this.state;
    //     console.log('componentWillMount：', count);
    // }
    componentDidMount() {
        const { count } = this.state;
        console.log('componentDidMount：', count);
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { count } = nextState;
        console.log('shouldComponentUpdate：', count, this.state.count);
        return count !== 3;
    }
    componentDidUpdate(prevProps, prevState) {
        const { count } = prevState;
        console.log('componentDidUpdate：', count, this.state.count);
    }
    setCount = () => {
        this.setState({
            count: this.state.count + 1
        });
    }
    render() { 
        const { count } =  this.state;
        console.log('render：', count);
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>计数器：{this.state.count}</p>
                <button onClick={this.setCount}>计数器</button>
                <Child count={count}></Child>
            </div>
        );
    }
}
 
export default LifeCyclePage;