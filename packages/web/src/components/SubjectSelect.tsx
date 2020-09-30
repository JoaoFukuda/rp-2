import { FormControl, InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core'
import React from 'react'

type SubjectSelectProps = {
  subject: string,
  onChange: SelectProps['onChange']
}

export default function SubjectSelect({ subject, onChange }: SubjectSelectProps) {
  return (
    <FormControl variant='outlined' margin='normal'>
      <InputLabel>Matéria</InputLabel>
      <Select
        name='subject'
        label='Matéria'
        value={subject}
        onChange={onChange}
      >
        <MenuItem value='Artes'>Artes</MenuItem>
        <MenuItem value='História'>História</MenuItem>
        <MenuItem value='Matemática'>Matemática</MenuItem>
        <MenuItem value='Cubo Mágico'>Cubo Mágico</MenuItem>
      </Select>
    </FormControl>
  )
}
