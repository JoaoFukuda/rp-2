import {
  Container,
  Paper,
  Table,
  TableRow,
  TableCell,
  makeStyles,
  TableHead,
  TableBody,
  Theme,
  Button
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import api from '@rp-2/axios'

import '../styles/userMaterialList.css'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import PageHeader from '../components/PageHeader'

type MaterialListState = {
  query: string
}

type Material = {
  id: number,
  title: string,
  author: string,
  user: string,
}

export default function UserMaterialList() {
  const { state } = useLocation<MaterialListState>()
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      title: 'Análise Corporal',
      author: 'Johannesburg',
      user: 'Alexandre',
    },
  ])
  const history = useHistory()

  useEffect(() => {
    SpeechRecognition.startListening({ language: 'pt-BR', continuous: true })
  }, [])

  // useEffect(() => {
  //   requestMaterials(state?.query || '').then(setMaterials)
  // }, [state])

  const commands = [
    {
      command: 'voltar',
      callback: () => history.push('/'),
    },
  ]

  useSpeechRecognition({ commands })

  function handleDelete(id:number) {
    const filteredMaterials = materials.filter(material => material.id !== id)
    setMaterials(filteredMaterials)
  }

  const { container, head, cell, cellData } = useStyles()

  return (
    <>
      <PageHeader title={'Arquivos cadastrados'} />
      <Container className={container} component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={head}>
              <TableCell className={cell}>Título</TableCell>
              <TableCell className={cell}>Autor</TableCell>
              <TableCell className={cell}>Professor</TableCell>
              <TableCell className={cell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map(({ title, author, user, id }) => (
              <TableRow key={id}>
                <TableCell className={cellData}>{title}</TableCell>
                <TableCell className={cellData}>{author}</TableCell>
                <TableCell className={cellData}>{user}</TableCell>
                <TableCell className={cellData}>
                  <EditIcon className='listIcons leftIcon' onClick={() => history.push('/material', { id })} />
                  <DeleteIcon className='listIcons' onClick={() => handleDelete(id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <Container className='btnContainer'>
        <Button
          color='secondary'
          variant='contained'
          size='large'
          onClick={() => history.push('/material')}
        >
          Adicionar novo
        </Button>
      </Container>
    </>
  )
}


const requestMaterials = async (subject: string): Promise<Material[]> => {
  try {
    const { data } = await api.get('classes', { params: { subject } })
    return data
  } catch (error) {
    alert(error.message || 'Nenhum professor foi encontrado')
    return []
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: '3.5rem',
    padding: 0,
    border: '1px solid',
    borderColor: theme.palette.primary.dark,
  },
  head: {
    backgroundColor: theme.palette.secondary.main,
  },
  cell: {
    fontSize: '2rem',
  },
  cellData: {
    fontSize: '1.2rem',
  },
}))
