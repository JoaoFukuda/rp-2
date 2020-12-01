import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import MaterialList from './pages/MaterialList'
import UserMaterialList from './pages/UserMaterialList'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MaterialForm from './pages/MaterialForm'
import Material from './pages/Material'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' component={Home} exact />
      <Route path='/materiais-do-professor' component={UserMaterialList} />
      <Route path='/cadastrar-materiais' component={MaterialForm} />
      <Route path='/materiais' component={MaterialList} />
      <Route path='/cadastrar' component={SignUp} />
      <Route path='/entrar' component={SignIn} />
      <Route path='/material/:filename' component={Material} />
    </BrowserRouter>
  )
}
