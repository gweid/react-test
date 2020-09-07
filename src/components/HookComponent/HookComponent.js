import React, { useState } from 'react';

function HookComponent() {
    // count 是一个 state，setCount 是用来设置 count 值的
    const [count, setCount] = useState(0);

    return (
        <div>
          <p>点击了 {count} 下</p>
          <button onClick={() => setCount(count + 1)}>
            点击
          </button>
        </div>
    );
}

export default HookComponent