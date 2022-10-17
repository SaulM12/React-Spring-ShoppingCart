import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
function Client() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Client