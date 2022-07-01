import React from 'react';
import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';



const Home: NextPage = () => {


  return (
    <div className={styles.homeWrapper} >
      <CssBaseline />
      <Container className={styles.container} maxWidth="lg">

          <form className={styles.form}>
            <TextField inputProps={{ maxLength: 16 }} fullWidth className={styles.cardNumberInput} id="outlined-basic" label="Card Number" size='small' variant="outlined" />
            <div className={styles.dateAndCvvBox}>

              <FormControl  sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Month</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  
                  label="Age"
                  onChange={() => console.log(12)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Year</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  
                  label="Age"
                  onChange={() => console.log(12)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <TextField inputProps={{ maxLength: 3 }} className={styles.cvvInput} id="outlined-basic" label="Cvv" size='small' variant="outlined" />

            </div>

            <FormControl fullWidth size='small' >
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>

          <div className={styles.buttonBox}>
            <button disabled={false} >Submit</button>
          </div>

          </form>

          <div>
            <div className={styles.cardWrapper} >
              <div className={styles.cardChipWrapper}>
                <div className={styles.cardChip} ></div>
              </div>
              <input type="text" className={styles.creditCardNumber} />
              <div className={styles.cardBottomWrapper}>
                <p className={styles.cardFullName} >Name Surname</p>
                <input type="text" className={styles.cardExptDate} />              
              </div>
            </div>
            
          </div>

    </Container>
  </div >
  )
}

export default Home
