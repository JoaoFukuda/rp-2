import React, { useState, useEffect } from 'react'
import api from '@rp-2/axios'
import { Container, makeStyles } from '@material-ui/core'

import PageHeader from '../components/PageHeader'
import TeacherItem, { Teacher } from '../components/TeacherItem'
import SubjectSelect from '../components/SubjectSelect'

export default function TeacherList() {
  const [subject, setSubject] = useState('')
  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
    requestTeachers(subject).then(teachers => setTeachers(teachers))
  }, [subject])

  const classes = useStyles()

  return (
    <>
      <PageHeader
        title='Estes são os professores disponíveis.'
        description='Você pode filtrar professores por matéria!'>
        <SubjectSelect subject={subject} onChange={({ target }) => setSubject(target.value as string)} />
      </PageHeader>

      <Container className={classes.teachers}>
        {teachers.map((teacher, index) => (
          <TeacherItem key={index} teacher={teacher} />
        ))}
      </Container>
    </>
  )
}

const requestTeachers = async (subject: string): Promise<Teacher[]> => {
  try {
    const { data } = await api.get('classes', { params: { subject } })
    return data
  } catch (error) {
    alert(error.message || 'Nenhum professor foi encontrado')
    return []
  }
}

const useStyles = makeStyles({
  teachers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})
