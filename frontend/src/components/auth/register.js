import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import registerStyles from './register.module.css';
import { submitRegister } from '../../services/auth'
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
function Register() {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
    roles: ['admin']
  })
  const [open, setOpen] = useState(false)
  const [wrongData, setWrongData] = useState({
    status: true,
    infoText: ''
  })
  const handleForm = e => {
    const tempData = { ...registerData }
    tempData[e.target.id] = e.target.value
    setRegisterData(tempData)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const register = () => {
    submitRegister({ registerData, setRegisterData, setWrongData, setOpen, navigate, setLoading })
  }
  return (
    <div className={registerStyles.container}>
      <Stack spacing={2} className={registerStyles.card} justifyContent="center" alignItems="center">
        <Typography variant="h4" component="h2" fontWeight={600}>
          Crea tu cuenta
        </Typography>
        <img src='https://cdn-icons-png.flaticon.com/512/1040/1040254.png' alt='logo' height={100} />
        <TextField id="userName" autoComplete="off" onChange={e => handleForm(e)} value={registerData.userName} label="Usuario" variant="outlined" />
        <TextField id="email" autoComplete="off" onChange={e => handleForm(e)} value={registerData.email} label="Email" variant="outlined" />
        <TextField id="password" type="password" onChange={e => handleForm(e)} value={registerData.password} label="Contraseña" variant="outlined" />
        {loading ?
        <LoadingButton loading variant="contained" className='btn'>
          Registrarse
        </LoadingButton>:
        <Button variant="contained" className='btn' onClick={() => { register() }}>Registrarse</Button>}
        <Button variant="text" color='error' href='/'>Cancelar</Button>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity={wrongData.status ? "error" : "success"} sx={{ width: '100%' }}>
            {wrongData.infoText}
          </Alert>

        </Snackbar>
      </Stack>
    </div>
  )
}

export default Register