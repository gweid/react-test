import React, { useState, useEffect } from 'react';

const HookComponent = (id) => {
    const [params, setParams] = useState({})

    useEffect(() => {
        setParams({id: '001', name: 'mark'})
    }, []) // 指定了一个空数组作为这个副作用的dependencies，所以这个副作用只会在组件首次渲染时被执行一次

    return (
        <div>
            <div>params name: {params.name}</div>
        </div>
    );
}

export default HookComponent