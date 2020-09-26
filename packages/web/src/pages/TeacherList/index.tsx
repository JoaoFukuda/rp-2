import React, { useState, useEffect } from 'react'
import api from '@rp-2/axios'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Select from '../../components/Select'
import './styles.css'

export default function TeacherList() {
  const [subject, setSubject] = useState('')
  const [teachers, setTeachers] = useState<Array<Teacher>>([])

  useEffect(() => {
    requestTeachers(subject).then(data => setTeachers(data))
  }, [subject])

  return (
    <div id='page-teacher-list' className='container'>
      <PageHeader title='Estes são os professores disponíveis.'>
        <form id='search-teachers'>
          <Select
            name='subject'
            label='Matéria'
            value={subject}
            onChange={({ target }) => setSubject(target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Cubo Mágico', label: 'Cubo Mágico' },
            ]}
          />
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher, index) => (
          <TeacherItem key={index} teacher={teacher} />
        ))}
      </main>
    </div>
  )
}

const requestTeachers = async (subject: string) => {
  try {
    const classes: Array<Teacher> = await api.get('classes', {
      params: {
        subject,
      },
    })
    return classes
  } catch (error) {
    alert(error.message || 'Nenhum professor foi encontrado')
    return []
  }
}
