import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// 如果通过类的方式去定义组件，那么组件必须继承于 React.Component 这个类
// 必须定义一个 render 方法，render 里面返回一个 jsx
class ClassComponent extends Component {
    constructor(props) {
        super(props); // 也可以不写这个，因为 props 是继承 React.Component 来的，只需要 this.props 即可访问
        this.state = { 
            date: new Date(),
            count: 1,
            active: false,
            isShow: true,
            nums: [1, 50 ,40, 20, 60, 100, 55, 24, 33, 66],
            times: 0,
        };

        this.btnClick = this.btnClick.bind(this);
    };

    handleLog = (arg1, arg2) => {
        // this.setState({
        //     count: 2
        // })

        // 在 setTimeout 中是同步的
        this.setState((state, props) => {
            return { count:state.count + 1 }
        })
        console.log(this.state); // 第一次点击的结果 count 还是 1，因为 setState 是异步的
    };

    btnClick() {
        console.log(this.state);
    };

    btnClick2(e, name) {
       console.log(e);
       console.log(name);
       console.log(this.state); 
    };

    btnClick3 = (e) => {
        console.log(e);
        console.log(this); // 箭头函数可以拿到兄弟元素同层的 this
        // console.log(this.state);
    };

    isShowClick() {
        this.setState({
            isShow: !this.state.isShow
        })
    };

    componentDidMount() {
        // setState 在原生事件是同步的
        document.querySelector(".class-component-event").addEventListener('click', this.handleLog, false);

        // 操作 Dom
        this.refs.textIpt.focus();
    }

    handleSetStateMerge = () => {
        // 结果 times 是 1
        // this.setState({
        //     times: this.state.times + 1
        // });
        // this.setState({
        //     times: this.state.times + 1
        // });
        // this.setState({
        //     times: this.state.times + 1
        // });

        // 结果 times 是 3
        this.setState((state, props) => {
            return { times: state.times + 1 }
        });
        this.setState((state, props) => {
            return { times: state.times + 1 }
        });
        this.setState((state, props) => {
            return { times: state.times + 1 }
        });
    }

    render() {
        return (
            <div>
                <h1 onClick={this.handleLog.bind(this, 'arg1', 'arg2')}>{this.props.title}</h1>
                <h3 className="class-component-event">setState 在原生事件中是同步的</h3>
                <div>{this.state.date.toLocaleTimeString()}</div>
                <input ref="textIpt"/>
                <div className={`first two ${this.state.active ? 'active' : ''}`}>动态绑定class</div>
                <button onClick={this.btnClick}>在构造器绑定this</button>
                {/* 既能传参，又能传事件对象 e */}
                <button onClick={e => this.btnClick2(e, 'jack')}>包一层箭头函数</button>
                <button onClick={this.btnClick3}>方法名为箭头函数绑定事件</button>
                <div style={{marginTop: '20px'}}>
                    <button onClick={() => this.isShowClick()}>v-show</button>
                    <h4 style={{display: this.state.isShow ? 'block' : 'none'}}>模拟Vue的v-show</h4>
                </div>
                <h4>列表过滤</h4>
                {/* 循环语句配合 filter 做筛选 */}
                <ul>
                    {
                        this.state.nums.filter(item => item >= 50).map(item => <li key={item}>{item}</li>)
                    }
                </ul>
                <h4>列表截取</h4>
                {/* 循环语句配合 slice 做列表截取 */}
                <ul>
                    {
                        this.state.nums.slice(0, 4).map(item => <li key={item}>{item}</li>)
                    }
                </ul>
                <div className={classnames('classone, classtwo', this.state.active ? 'active' : '')}>classnames 库</div>
                <div onClick={this.handleSetStateMerge}>setState合并</div>
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