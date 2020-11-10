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
  Button,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '@rp-2/axios'
import PageHeader from '../components/PageHeader'
import { Material } from '../types'

export default function UserMaterialList() {
  const [materials, setMaterials] = useState<Material[]>([])
  const history = useHistory()

  const deleteMaterial = async (id: number) => {
    await api.delete(`materials/${id}`)
    const filteredMaterials = materials.filter(material => material.id !== id)
    setMaterials(filteredMaterials)
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if (!userId) return

    api.get(`materials/${userId}`).then(response => {
      setMaterials(response.data)
    })
  }, [])

  const { container, head, cell, cellData, icon, leftIcon, addButtonContainer, iconsCellData } = useStyles()

  return (
    <>
      <PageHeader title={'Arquivos cadastrados'} />
      <Container className={container} component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={head}>
              <TableCell className={cell}>Título</TableCell>
              <TableCell className={cell}>Autor</TableCell>
              <TableCell className={cell}>Categoria</TableCell>
              <TableCell className={cell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map(({ title, author, subject, id }) => (
              <TableRow key={id}>
                <TableCell className={cellData}>{title}</TableCell>
                <TableCell className={cellData}>{author}</TableCell>
                <TableCell className={cellData}>{subject}</TableCell>
                <TableCell className={iconsCellData} >
                  <EditIcon
                    className={leftIcon}
                    onClick={() => history.push('/cadastrar-materiais', { materialId: id })}
                  />
                  <DeleteIcon
                    className={icon}
                    onClick={() => deleteMaterial(id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <Container className={addButtonContainer}>
        <Button
          color='secondary'
          variant='contained'
          size='large'
          onClick={() => history.push('/cadastrar-materiais')}
        >
          Adicionar
        </Button>
      </Container>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => {
  const baseIcon = {
    height: '2.4rem',
    width: '2.4rem',
    color: theme.palette.common.white,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  }

  return {
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
    iconsCellData: {
      fontSize: '1.2rem',
      textAlign: 'right',
    },
    icon: {
      ...baseIcon,
    },
    leftIcon: {
      ...baseIcon,
      marginRight: '1rem',
    },
    addButtonContainer: {
      textAlign: 'right',
      padding: '2rem',
    },
  }
})
