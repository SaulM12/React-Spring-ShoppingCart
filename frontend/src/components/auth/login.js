import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loginStyles from './login.module.css';
import { LoadingButton } from '@mui/lab';
import { submitLogin } from '../../services/auth'
function Login() {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({ userName: "", password: "" })
  const [wrongCredentials, setWrongCredentials] = useState({ wrongData: false, infoText: '' })
  const [open, setOpen] = useState(false)
  const handleForm = e => {
    const tempData = { ...loginData }
    tempData[e.target.id] = e.target.value
    setLoginData(tempData)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  return (
    <div className={loginStyles.container}>
      <Stack spacing={2} className={loginStyles.card} justifyContent="center" alignItems="center">
        <Typography variant="h4" component="h2" fontWeight={600}>
          Bienvenido
        </Typography>
        <img src='https://cdn-icons-png.flaticon.com/512/1040/1040254.png' alt='logo' height={100} />
        <TextField autoComplete="off" id="userName" label="Usuario" variant="outlined" onChange={e => handleForm(e)} value={loginData.userName} />
        <TextField type='password' id="password" label="Contraseña" variant="outlined" onChange={e => handleForm(e)} value={loginData.password} />
        
        {loading?
        <LoadingButton loading variant="contained" className='btn'>
          Iniciar Sesión
        </LoadingButton>
        :<Button variant="contained" type='submit' className='btn' onClick={() => {
          submitLogin({ loginData, setWrongCredentials, navigate, setOpen, setLoading })
        }}
        >Iniciar Sesión</Button>
        }
        <Button variant="text" color='success' href='/register'>Crear cuenta</Button>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {wrongCredentials.infoText}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
}

export default Login