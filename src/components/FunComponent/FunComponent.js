import React from 'react';

// 函数组件必须返回 jsx 对象
const FunComponent = props => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>这是一个函数组件</p>
        </div>
    );
}

export default FunComponent