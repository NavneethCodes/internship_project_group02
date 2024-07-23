import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



function Edit() {
  return (
    <div>
        <Stack spacing={2} direction="column" alignItems="flex-start">
            <TextField id="outlined-basic" label="First Name"   InputProps={{ sx: { backgroundColor: 'white' }}} />
            <TextField id="outlined-basic" label="Last Name"   InputProps={{ sx: { backgroundColor: 'white' }}} />
            <TextField id="outlined-basic" label="Username" InputProps={{ sx: { backgroundColor: 'white' }}} />
            <TextField id="outlined-basic" label="Gender(Optional)" InputProps={{ sx: { backgroundColor: 'white' }}} />
            <TextField id="outlined-basic" label="DOB(Optional)" InputProps={{ sx: { backgroundColor: 'white' }}} />
            <TextField id="outlined-basic" label="Email" InputProps={{ sx: { backgroundColor: 'white' }}} />
            <TextField id="outlined-basic" label="Contact" InputProps={{ sx: { backgroundColor: 'white' }}} />
            <TextField id="outlined-basic" label="Password" InputProps={{ sx: { backgroundColor: 'white' }}} />


        </Stack><br/>
        <Stack spacing={2} direction="row">
            <Button variant="contained">Submit</Button>
        </Stack>
    </div>
  );
}

export default Profile;
