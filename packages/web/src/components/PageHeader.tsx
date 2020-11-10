import React from 'react'
import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useHistory } from 'react-router-dom'

type PageHeaderProps = { title: string }

export default function PageHeader({ title }: PageHeaderProps) {
  const classes = useStyles()
  const history = useHistory()

  const userId = localStorage.getItem('userId')

  return (
    <Container className={classes.container}>
      {userId && (<div className={classes.exitIcon} onClick={() => {
        localStorage.clear()
        history.push('/')
      }}>
        <ExitToAppIcon id='exitIcon' />
        <Typography>Sair</Typography>
      </div>)}
      <Typography variant='h3' className={classes.text}>
        {title}
      </Typography>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    maxWidth: 'none',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '-6rem',
  },
  text: {
    marginBottom: '1rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  exitIcon: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    height: '50px',
    cursor: 'pointer',
    width: '50px',
  },
}))
