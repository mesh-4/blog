import React, { useState } from 'react'
import { auth } from 'firebase/app'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, TextField } from '@material-ui/core'

export function Login() {
  const navigate = useNavigate()
  const [loginForm, setForm] = useState({ email: '', password: '' })

  const handleLoginFieldChange = e => {
    const { name, value } = e.currentTarget
    setForm({ ...loginForm, [name]: value })
  }

  const handleLogin = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password)
      toast.success('💁🏻 Login success')
      navigate('/')
    } catch (err) {
      if (err) toast.error('😭 Invaild login')
    }
  }

  return (
    <Grid className="h-screen" container alignItems="center">
      <Grid item xs={1} md={3} lg={4} />
      <Grid item xs={10} md={6} lg={4}>
        <p className="w-full text-xl text-center mb-6">Welcome</p>

        <div className="mb-4">
          <TextField
            type="text"
            fullWidth
            size="small"
            name="email"
            label="Email"
            variant="outlined"
            aria-label="email"
            placeholder="Email"
            onChange={handleLoginFieldChange}
            inputProps={{
              'data-testid': 'email-input',
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            type="password"
            fullWidth
            size="small"
            name="password"
            label="Password"
            variant="outlined"
            aria-label="password"
            placeholder="Password"
            onChange={handleLoginFieldChange}
            inputProps={{
              'data-testid': 'password-input',
            }}
          />
        </div>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => handleLogin(loginForm.email, loginForm.password)}
          data-testid="login-btn"
        >
          Login
        </Button>
      </Grid>
      <Grid item xs={1} md={3} lg={4} />
    </Grid>
  )
}
