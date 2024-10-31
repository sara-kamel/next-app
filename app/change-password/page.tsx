'use client'
import React, { useState } from 'react'
import { Box, Stack, TextField, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { z } from 'zod'

const schema = z.object({
  password: z.string().min(5, 'Password should be at least 5 characters'),
  newPassword: z.string().min(5, 'New password should be at least 5 characters')
})

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowNewPassword = () => setShowNewPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  async function handleChangePassword (
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()
    const body = {
      password: password,
      newPassword: newPassword
    }
    const validation = schema.safeParse(body)
    if (!validation.success) {
      const errorMessages = validation.error.format()
      alert(
        `Validation failed: ${
          errorMessages.password?._errors[0] ||
          errorMessages.newPassword?._errors[0]
        }`
      )
      return
    }

    try {
      const response = await fetch(`/api/change-password/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(`error : ${data.error || data[0].message}`)
      }
      alert('your password changed successfully')
      setPassword('')
      setNewPassword('')
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert('An unknown error occurred')
      }
    }
  }

  return (
    <>
      <Stack
        component='form'
        flexDirection='column'
        spacing={4}
        alignItems='center'
      >
        <Box>{error}</Box>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>
            New Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={e => {
              setNewPassword(e.target.value)
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge='end'
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='New Password'
          />
        </FormControl>

        <Button
          variant='contained'
          onClick={e => {
            handleChangePassword(e)
            console.log(password, newPassword)
          }}
        >
          submit Changes
        </Button>
      </Stack>
    </>
  )
}

export default ChangePassword
