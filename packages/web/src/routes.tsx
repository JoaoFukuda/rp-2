import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import MaterialList from './pages/MaterialList'
import Register from './pages/Register'
import Login from './pages/Login'
import UserMaterialList from './pages/UserMaterialList'
import Material from './pages/Material'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MaterialForm from './pages/MaterialForm'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' component={Home} exact />
      <Route path='/materiais' component={MaterialList} />
      <Route path='/cadastrar' component={Register} />
      <Route path='/entrar' component={Login} />
      <Route path='/materiais-do-professor' component={UserMaterialList} />
      <Route path='/material' component={Material} />
      <Route path='/cadastrar-materiais' component={MaterialForm} />
      <Route path='/cadastrar' component={SignUp} />
      <Route path='/entrar' component={SignIn} />
    </BrowserRouter>
  )
}
