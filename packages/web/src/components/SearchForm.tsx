/* eslint-disable react/no-unescaped-entities */
import { Typography, TextField, Button, makeStyles, FormControl } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function SearchForm() {
  const history = useHistory()

  const [title, setTitle] = useState('')

  useEffect(() => {
    SpeechRecognition.startListening({ language: 'pt-BR', continuous: true })
  }, [])

  const commands = [
    {
      command: 'pesquisar (sobre) (a ) (o ) *',
      callback: (matchTitle: string) => history.push('/materiais', { query: matchTitle }),
    },
    {
      command: 'voltar',
      callback: () => history.goBack(),
    },
  ]

  useSpeechRecognition({ commands })

  const { input, button, head } = useStyles()

  const onSearch = (e: any) => {
    e.preventDefault()
    history.push('/materiais', { query: title })
  }

  return (
    <>
      <Typography variant='h3' className={head}>
        Fale "Pesquisar sobre" seguido do título do material que deseja encontrar
      </Typography>
      <FormControl onSubmit={onSearch}>
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
          type='submit'
          color='secondary'
          onClick={onSearch}
          variant='contained'
        >
          Pesquisar
        </Button>
      </FormControl>
    </>
  )
}

const useStyles = makeStyles(() => ({
  head: {
    textAlign: 'center',
  },
  input: {
    marginTop: '2rem',
    marginBottem: '1rem',
    width: '30rem',
  },
  button: {
    width: '30rem',
    height: '3rem',
    fontSize: '1.4rem',
    marginBottom: '2rem',
  },
}))
