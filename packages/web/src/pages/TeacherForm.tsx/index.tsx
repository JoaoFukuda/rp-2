import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import api from '@rp-2/axios'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'

export default function TeacherForm() {
  const history = useHistory()

  const [avatar, setAvatar] = useState('')
  const [bio, setBio] = useState('')
  const [material, setMaterial] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault()

    api.post('classes', {
      avatar,
      bio,
      material,
      name,
      phone,
      subject,
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      history.push('/')
    }).catch(() => alert('Erro no cadastro!'))
  }

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você quer cadastrar seu material de aula.'
        description='O primeiro passo é preencher esse formulário de inscrição'
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name='name'
              label='Nome completo'
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChange={({ target }) => setAvatar(target.value)}
            />
            <Input
              name='phone'
              label='Celular'
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />
            <Textarea
              name='bio'
              label='Biografia'
              value={bio}
              onChange={({ target }) => setBio(target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name='subject'
              label='Matéria'
              value={subject}
              onChange={({ target }) => setSubject(target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'História', label: 'História' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Cubo Mágico', label: 'Cubo Mágico' },
              ]}
            />
            <Input
              name='material'
              label='Material de aula'
              value={material}
              onChange={({ target }) => setMaterial(target.value)}
            />
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt='Aviso Importante' />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type='submit'>Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}
