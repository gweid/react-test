import React, { useRef } from "react"
import FunCom from "./FunCom"
import RefCache from "./RefCache"

const RefCom = () => {
  const funComRef = useRef(null)

  const handleClick = () => {
    if (funComRef.current) {
      funComRef.current.handleFunClick()
    }
  }

  return (
    <>
      <div>
        <FunCom ref={funComRef} />
        <button onClick={handleClick}>Ref点击</button>
      </div>
      <div>
        <RefCache />
      </div>
    </>
  )
}

export default RefCom