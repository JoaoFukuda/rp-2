import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm.tsx'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' component={TeacherList} />
      <Route path='/cadastrar-materiais' component={TeacherForm} />
    </BrowserRouter>
  )
}
