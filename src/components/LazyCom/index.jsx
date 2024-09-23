import React, { Suspense, lazy } from "react"

const LazyTest = lazy(() => import('./test.jsx'))

const LazyCom = () => {

  return (
    <div>
      <h1>------------------------ React.lazy ------------------------</h1>
      <Suspense fallback={<div>loading...</div>}>
        <LazyTest />
      </Suspense>
    </div>
  )
}

export default LazyCom
