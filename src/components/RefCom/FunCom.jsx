import React, { forwardRef, useImperativeHandle, useState } from "react";

const FunCom = (props, ref) => {

  const [data, setData] = useState('FunCom')

  useImperativeHandle(ref, () => ({
    handleFunClick: () => {
      console.log('设置FunCom');
      setData('设置FunCom')
    }
  }))

  return (
    <div>{data}</div>
  )
}

export default forwardRef(FunCom)
