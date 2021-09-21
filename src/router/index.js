import Index from '../pages/index'
import About from '../pages/about'
import Culture from '../pages/about/components/culture'
import Idea from '../pages/about/components/idea'
import TestPage from '../pages/testPage'
import testHooks from '../pages/testHooks'
import NoMatch from '../pages/noMatch'
import Detail from '../pages/detail'

const routes = [
  {
    path: '/',
    exact: true,
    component: Index
  },
  {
    path: '/about',
    component: About,
    routes: [
      {
        path: '/about',
        exact: true,
        component: Idea
      },
      {
        path: '/about/culture',
        exact: true,
        component: Culture
      },
      {
        component: NoMatch
      }
    ]
  },
  {
    path: '/testPage',
    component: TestPage
  },
  {
    path: '/hooks',
    component: testHooks
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    component: NoMatch
  }
]

export default routes
