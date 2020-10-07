import React, { useState } from 'react'
import { Container, TextField, makeStyles, Theme, Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function TeacherList() {
  const [title, setTitle] = useState('')
  const history = useHistory()
  const { button, container, input } = useStyles()

  const onSearch = () => {
    history.push('/materiais', { query: title })
  }

  return (
    <Container className={container}>
      <Typography variant='h3'>Fale ou digite o título do material que deseja encontrar</Typography>
      <TextField
        className={input}
        label='Digite aqui o título do material'
        margin='normal'
        onChange={({ target }) => setTitle(target.value)}
        value={title}
        variant='outlined'
      />
      <Button
        className={button}
        color='secondary'
        onClick={onSearch}
        variant='contained'
      >
        Pesquisar
      </Button>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
    maxWidth: 'none',
    height: '100vh',
  },
  input: {
    margin: '3rem',
    width: '30rem',
  },
  button: {
    width: '30rem',
    height: '3rem',
    fontSize: '1.4rem',
  },
}))
