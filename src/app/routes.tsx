import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { App } from './App'
import { routingProducts } from './products-page/routing-products'

const TestPage = lazy(() =>
  import('./test-page/test-page.component').then((module) => ({
    default: module.TestPage
  }))
)

const pages = ['products', 'test', 'toto']

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App pages={pages} />,
    children: [
      {
        index: true,
        element: <Navigate to="products" replace />
      },
      {
        path: 'products',
        children: routingProducts
      },
      {
        path: 'test',
        element: <Suspense children={<TestPage />} />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
