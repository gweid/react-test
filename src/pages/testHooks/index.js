import React, { useState, useEffect, useRef, createContext } from 'react';
import UseContextHook from './useContextHook'
import UserReducerHook from './useReducer'
import UseCallbackHook from './useCallbackHook'
import UseMemoHook from './useMemoHook'
import UseRefHook from './useRefHook'
import UseImperativeHandleHook from './useImperativeHandleHook'
import CustomHook from './customHooks';

export const UserContext = createContext()
export const TokenContext = createContext()
export const ThemeContext = createContext()

const HookComponent = (id) => {
  const iptRef = useRef();

  const [params, setParams] = useState({});

  useEffect(() => {
    setParams({ id: '001', name: 'mark' });

    iptRef.current.focus();
  }, []); // 指定了一个空数组作为这个副作用的dependencies，所以这个副作用只会在组件首次渲染时被执行一次

  const [arr, setArr] = useState(['nba']);

  const addArr = () =>　{
    arr.push('cba');
    console.log(arr);
    setArr(arr)
  }

  useEffect(() => {
    console.log('arr变了');
  }, [arr]);

  const [userList, setUserList] = useState([
    { id: '001', name: 'jack', 'age': 18 },
    { id: '002', name: 'mark', 'age': 19 },
    { id: '003', name: 'lucy', 'age': 20 },
  ]);

  const editAge = (index) => {
    // 对于数组的操作都得这样，复制一份新数组
    const newUserList = [...userList];
    newUserList[index].age += 1;
    // set 一个新的数组，react 就会重新渲染
    setUserList(newUserList);
  };

  const [count, setCount] = useState(() => 10);

  const addCount = () => {
    // setCount(count + 10);
    // setCount(count + 10);
    // setCount(count + 10);
    setCount((prevCount) => prevCount + 10);
    setCount((prevCount) => prevCount + 10);
    setCount((prevCount) => prevCount + 10);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Hook 的使用</h1>
      <hr />
      <div>params name: {params.name}</div>
      {/* 注意这里是 {iptRef} 这种形式 */}
      <input ref={iptRef} type="text" />
      <ul>
        {arr.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
      <button onClick={ e => setArr([...arr, 'cba']) }>添加数组</button>
      <button onClick={ addArr }>添加数组</button>
      <hr/>
      <ul>
        {
          userList.map((item, index) => {
            return (
              <li key={item.id} onClick={() => editAge(index)}>
                名字：{item.name} 年龄：{item.age}
                <button>年龄+</button>
              </li>
            )
          })
        }
      </ul>
      <hr/>
      <p>函数useState：{count}</p>
      {/* <button onClick={() => setCount(count + 10)}>count+</button> */}
      <button onClick={addCount}>count+</button>

      {/* useContext 的使用 */}
      <UserContext.Provider value={{ name: 'jack', token: 'aabbcc'}}>
        <ThemeContext.Provider value={{ color: '#f5f5f5' }}>
          <UseContextHook />
        </ThemeContext.Provider>
      </UserContext.Provider>

      {/* useReducer 的使用 */}
      <UserReducerHook />

      {/* useCallback 的使用 */}
      <UseCallbackHook />

      {/* useMemo 的使用 */}
      <UseMemoHook />

      {/* useRef 的使用 */}
      <UseRefHook />

      {/* useImperativeHandle 的使用 */}
      <UseImperativeHandleHook />

      {/* 自定义 hooks */}
      <UserContext.Provider value={{name: 'jack', age: 24}}>
        <TokenContext.Provider value={{token: 'aahhhshdh'}}>
          <CustomHook />
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default HookComponent;
