import React, { lazy } from "react";

const AysncComponent = (Component, api) => {
  const AysncComponentPromise = () => new Promise(async (resolve) => {
    const data = await api()

    resolve({
      default: (props) => <Component data={data} {...props} />
    })
  })

  return lazy(AysncComponentPromise)
}

export default AysncComponent
