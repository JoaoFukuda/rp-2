import React, { useState, useEffect } from 'react'
import { Container, TextField, makeStyles, Theme, Typography, Button } from '@material-ui/core'
import { useHistory, Link } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit'

import '../styles/home.css'

export default function TeacherList() {
  const history = useHistory()

  const [value, setValue] = useState('')
  const { speak, voices } = useSpeechSynthesis()

  const voice = voices[62] || null

  const [title, setTitle] = useState('')
  const { button, container, input } = useStyles()
  const [message, setMessage] = useState('')
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    SpeechRecognition.startListening({ language: 'pt-BR', continuous: true })
  }, [])

  useEffect(() => {
    if (voice && counter === 0) {
      console.log('Executou', voice, counter)
      // speak({ text: 'Fale Pesquisar sobre. seguido pelo o título do material ou categoria que deseja encontrar, ou apenas digite no campo de texto', voice })

      setCounter(counter + 1)
    }
  }, [voice, counter])

  useEffect(() => {
    if (title) {
      history.push('/materiais', { query: title })
    }
  }, [title])

  const commands = [
    {
      command: 'pesquisar (sobre) (a ) (o ) *',
      callback: (matchTitle: string) => setTitle(matchTitle),
    },
  ]

  const { transcript, resetTranscript } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const onSearch = () => {
    history.push('/materiais', { query: title })
  }

  return (
    <Container className={container}>
      <Typography variant='h3' style={{ textAlign: 'center' }}>Fale "Pesquisar sobre" seguido pelo o título do material ou categoria que deseja encontrar ou apenas digite no campo de texto</Typography>
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
      {/* <button onClick={() => SpeechRecognition.startListening({ language: 'pt-BR', continuous: true })}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
      <p>{message}</p>
      <p>{transcript}</p>

      <p className='textoRegistro'>Deseja inserir um novo material? <Link to='/cadastrar' className='link'>Registre-se</Link></p>
      <p className='textoRegistro'>Já possui conta? <Link to='/' className='link'>Login</Link></p>
      {/* <div>
        <textarea
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <button onClick={() => speak({ text: value, voice })}>Speak</button>
      </div> */}
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
    margin: '3rem 3rem 1rem 3rem',
    width: '30rem',
  },
  button: {
    width: '30rem',
    height: '3rem',
    fontSize: '1.4rem',
  },
}))
