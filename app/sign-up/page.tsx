'use client'
import { Box, Stack, TextField, Button } from '@mui/material'
import React, { useState } from 'react'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handeleClose = () => {
    setName('')
    setEmail('')
    setPassword('')
    setError('')
  }
  async function handleSubmit () {
    const user = {
      name: name,
      email: email,
      password: password
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(` error: ${data.error || data[0].message}`)
      }
      handeleClose()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }
  return (
    <Stack component='form' flexDirection='column' width='70%'>
      <Box>{error}</Box>
      <label htmlFor='name'>Name</label>
      <TextField
        type='text'
        id='name'
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
      />
      <label htmlFor='email'>Email</label>
      <TextField
        type='email'
        id='email'
        value={email}
        onChange={e => {
          setEmail(e.target.value)
        }}
      />
      <label htmlFor='password'> Password</label>
      <TextField
        type='password '
        id='password'
        value={password}
        onChange={e => {
          setPassword(e.target.value)
        }}
      />
      <Button
        onClick={() => {
          handleSubmit()
          console.log(name, password, email)
        }}
      >
        sign up
      </Button>
    </Stack>
  )
}

export default SignUp
