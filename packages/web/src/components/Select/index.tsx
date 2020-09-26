import React, { SelectHTMLAttributes } from 'react'

import './styles.css'

type SelectProps = {
  name: string
  label: string
  options: { value: string; label: string }[]
} & SelectHTMLAttributes<HTMLSelectElement>

export default function Select({ label, name, options, ...rest }: SelectProps) {
  return (
    <div className='select-block'>
      <label htmlFor={name}>{label}</label>
      <select value='' id={name} {...rest}>
        <option value='' disabled hidden>
          Selecione uma opção
        </option>

        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
