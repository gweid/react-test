import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 如果通过类的方式去定义组件，那么组件必须继承于 React.Component 这个类
// 必须定义一个 render 方法，render 里面返回一个 jsx
class ClassComponent extends Component {
    constructor(props) {
        super(props); // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
        this.state = { 
            date: new Date(),
            count: 1,
            active: true
        };
    }

    handleLog = (arg1, arg2) => {
        // this.setState({
        //     count: 2
        // })

        // 在 setTimeout 中是同步的
        this.setState((state, props) => {
            return { count:state.count + 1 }
        })
        console.log(this.state); // 第一次点击的结果 count 还是 1，因为 setState 是异步的
    }

    componentDidMount() {
        // setState 在原生事件是同步的
        document.querySelector(".class-component-event").addEventListener('click', this.handleLog, false);

        // 操作 Dom
        this.refs.textIpt.focus();
    }

    render() {
        return (
            <div>
                <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
                <h3 className="class-component-event">setState 在原生事件中是同步的</h3>
                <div>{this.state.date.toLocaleTimeString()}</div>
                <input ref="textIpt"/>
                <div className={`first two ${this.state.active ? 'active' : ''}`}>动态绑定class</div>
            </div>
        );
    }
}

ClassComponent.propTypes = {
    title: PropTypes.string
};

ClassComponent.defaultProps = {
    title: 'XXX Component'
};
 
export default ClassComponent;