import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 如果通过类的方式去定义组件，那么组件必须继承于 React.Component 这个类
// 必须定义一个 render 方法，render 里面返回一个 jsx
class ClassComponent extends Component {
    constructor(props) {
        super(props); // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
        this.state = { date: new Date() };
    }
    render() {
        return (
            <div>
                <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
                <div>{this.state.date.toLocaleTimeString()}</div>
            </div>
        );
    }

    handleLog(arg1, arg2) {
        console.log(this.state.date, arg1, arg2);
    }
}

ClassComponent.propTypes = {
    title: PropTypes.string
};

ClassComponent.defaultProps = {
    title: 'XXX Component'
};
 
export default ClassComponent;