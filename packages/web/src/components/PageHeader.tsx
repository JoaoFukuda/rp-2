import React from 'react'
import { Container, makeStyles, Theme, Typography } from '@material-ui/core'

type PageHeaderProps = { title: string }

export default function PageHeader({ title }: PageHeaderProps) {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
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
}))
