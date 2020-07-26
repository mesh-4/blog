import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { navigate } from '@reach/router'
import { makeStyles } from '@material-ui/styles'
import { Grid, Button, TextField, Typography } from '@material-ui/core'

import { auth } from '@/components/FirebaseProvider'

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(2),
  },
  base: {
    height: '100vh',
  },
}))

export function Login() {
  const classes = useStyles()
  const [loginForm, setForm] = useState({ email: '', password: '' })

  const handleLoginFieldChange = e => {
    const { name, value } = e.currentTarget
    setForm({ ...loginForm, [name]: value })
  }

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        loginForm.email,
        loginForm.password
      )
      toast.success('🎉 Login success')
      navigate('/')
    } catch (err) {
      if (err) toast.error('😭 Invaild login')
    }
  }

  return (
    <Grid className={classes.base} container alignItems="center">
      <Grid item xs={1} md={3} lg={4} />
      <Grid item xs={10} md={6} lg={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome
        </Typography>

        <div className={classes.field}>
          <TextField
            type="text"
            fullWidth
            size="small"
            name="email"
            label="Email"
            variant="outlined"
            placeholder="Email"
            onChange={handleLoginFieldChange}
          />
        </div>
        <div className={classes.field}>
          <TextField
            type="password"
            fullWidth
            size="small"
            name="password"
            label="Password"
            variant="outlined"
            placeholder="Password"
            onChange={handleLoginFieldChange}
          />
        </div>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Grid>
      <Grid item xs={1} md={3} lg={4} />
    </Grid>
  )
}
