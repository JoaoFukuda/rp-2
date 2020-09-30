import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import React from 'react'

export type Teacher = {
  avatar: string
  bio: string
  material: string
  name: string
  phone: string
  subject: string
  userId: string
}

type TeacherItemProps = {
  teacher: Teacher
}

export default function TeacherItem({ teacher }: TeacherItemProps) {
  const { avatar, bio, material, name, phone, subject } = teacher
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar variant='circle' src={avatar} alt='Avatar' className={classes.avatar} />}
        title={<Typography variant='h5'>{name}</Typography>}
        subheader={<Typography variant='h6'>{subject}</Typography>}
      />

      <CardContent className={classes.content}>
        <Typography>
          {bio}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <Typography>
          Material:
          <br />
          <strong>{material}</strong>
        </Typography>
        <Button
          rel='noopener noreferrer'
          target='_blank'
          href={`https://wa.me/${phone}`}
          color='secondary'
          variant='contained'
          size='large'
        >
          <Icon className={classes.icon} color='action'>chat</Icon>
          Entrar em contato
        </Button>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    justifyContent: 'space-between',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  avatar: {
    height: '4rem',
    width: '4rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    marginLeft: '8rem',
    marginRight: '8rem',
    marginTop: '4rem',
    border: '1px solid',
    borderRadius: '1rem',
    borderColor: theme.palette.primary.dark,
    width: '50rem',
  },
  content: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  icon: {
    marginRight: '1rem',
  },
}))
