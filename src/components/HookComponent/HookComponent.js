import React, { useState, useEffect, useRef } from 'react';

const HookComponent = (id) => {
    const [params, setParams] = useState({});

    const iptRef = useRef();

    useEffect(() => {
        setParams({id: '001', name: 'mark'});

        iptRef.current.focus();
    }, []); // 指定了一个空数组作为这个副作用的dependencies，所以这个副作用只会在组件首次渲染时被执行一次

    return (
        <div>
            <div>params name: {params.name}</div>
            {/* 注意这里是 {iptRef} 这种形式 */}
            <input ref={iptRef} type="text"/>
        </div>
    );
}

export default HookComponent