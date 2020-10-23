import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import MaterialList from './pages/MaterialList'
import TeacherForm from './pages/TeacherForm'
import Register from './pages/Register'
import Login from './pages/Login'
import UserMaterialList from './pages/UserMaterialList'
import Material from './pages/Material'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' component={Home} exact />
      <Route path='/materiais' component={MaterialList} />
      <Route path='/cadastrar' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/usermaterials' component={UserMaterialList} />
      <Route path='/material' component={Material} />
    </BrowserRouter>
  )
}
