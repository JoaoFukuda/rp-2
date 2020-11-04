import {
  Container,
  Paper,
  Table,
  TableRow,
  TableCell,
  makeStyles,
  Theme,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '@rp-2/axios'

import PageHeader from '../components/PageHeader'
import SearchForm from '../components/SearchForm'

type MaterialListState = {
  query: string
}

export default function MaterialList() {
  const { state } = useLocation<MaterialListState>()
  const [materials, setMaterials] = useState<Material[]>([])
  const query = state?.query

  useEffect(() => {
    requestMaterials(query || '').then(setMaterials)
  }, [query])

  const { container, head, cell, searchContainer } = useStyles()

  return (
    <>
      <PageHeader title={`Encontramos ${materials.length} materiais para: "${query}"`} />
      <Container className={container} component={Paper}>
        <Table>
          <tbody>
            <TableRow className={head}>
              <TableCell className={cell}>Título</TableCell>
              <TableCell className={cell}>Professor</TableCell>
            </TableRow>
            {materials.map(({ name, material }) => (
              <TableRow key={material}>
                <TableCell className={cell}>{material}</TableCell>
                <TableCell className={cell}>{name}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
      <Container component={Paper} className={searchContainer}>
        <SearchForm />
      </Container>
    </>
  )
}

type Material = {
  material: string
  name: string
  userId: string
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
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '1rem',
    marginTop: '2rem',
    marginBottom: '2rem',
    border: '1px solid',
    borderColor: theme.palette.primary.dark,
  },
}))
