import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginSignupPopup({ open, setOpen }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, redirect or show a success message
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleToggleDialog = () => {
    setOpen(!open); // Close the dialog
  };

  const handleLoginClick = async () => {
    // Call the login function when "Login" is clicked
    await handleLogin();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleToggleDialog}>
        <DialogTitle>Login / Sign Up</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Username" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Update email state on change */}
          <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />  {/* Update password state on change */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleDialog}>Cancel</Button>
          <Button onClick={handleLoginClick} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginSignupPopup;
