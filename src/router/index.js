import React from 'react'

import Index from '../pages/index'
import EventPage from '../pages/eventPage'
import Culture from '../pages/about/components/culture'
import Idea from '../pages/about/components/idea'
import TestPage from '../pages/testPage'
import testHooks from '../pages/testHooks'
import NoMatch from '../pages/noMatch'
import Detail from '../pages/detail'
import VirtualList from '../pages/virtualList'

const About = React.lazy(() => import('../pages/about'))

const routes = [
  {
    path: '/',
    exact: true,
    component: Index
  },
  {
    path: '/event',
    exact: true,
    component: EventPage
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
    path: '/virtualList',
    component: VirtualList
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
