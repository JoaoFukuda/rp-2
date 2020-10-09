import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import MaterialList from './pages/MaterialList'
import TeacherForm from './pages/TeacherForm'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' component={Home} exact />
      <Route path='/materiais' component={MaterialList} />
      <Route path='/cadastrar' component={TeacherForm} />
    </BrowserRouter>
  )
}
