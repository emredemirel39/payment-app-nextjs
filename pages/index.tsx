import React, { useEffect, useState } from 'react';

import { IPaymentForm } from '../types';
import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';




const Home: NextPage = () => {

  const initialState: IPaymentForm = {
    cardNumber: '',
    cvv: '',
    amount: '',
    year: '',
    month: ''
  }

  const now = new Date;
  const currentYear = now.getFullYear();

  const allNumsBetweenTwoNums = (num1: number, num2: number): number [] => {

    const arr = [];
    for (let i = num1; i <= num2; i++) {
      arr.push(i)
    }
    return arr;
  };

  // dynamically updating year options of expiration date of credit card
  const exptYearVariants = allNumsBetweenTwoNums(currentYear, (currentYear + 8));
  const allMonths = allNumsBetweenTwoNums(1, 12);
  const allMonthsFormatted = allMonths.map(month => ('0' + month).slice(-2));

  const [ form, setForm ] = useState<IPaymentForm>(initialState);
  const [ isValid, setIsValid ] = useState<boolean> (false);

  const handleValidation = (): void => {
    
    const currentMonth = now.getMonth() + 1;
    const cardNumberRegex = /^[0-9]{16}$/;
    const cvvRegex =  /^[0-9]{3}$/;
    const amountRegex =  /^[0-9]/;

    switch (true) {

      // if year of expiration day is current year, we cannot select months before current month
      case Number(form.year) === currentYear && Number(form.month) < currentMonth :
        setIsValid(false)
        break;

        case form.month.length === 0 || form.year.length === 0 :
          setIsValid(false);
          break;
      
        // if cardNumber input not matched cardnumber regex, so if it is null
      case form.cardNumber.match(cardNumberRegex) === null :
        setIsValid(false)
        break;
        
      // if cvv input not matched cvv regex, so if it is null
      case form.cvv.match(cvvRegex) === null :
        setIsValid(false)
        break; 

      // if amount input not matched amount regex, so if it is null
      case form.amount.match(amountRegex) === null :
        setIsValid(false)
        break; 
    
      default:
        setIsValid(true)
        break;
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const testvali = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(isValid)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CardNumber: form.cardNumber,
        Cvv: form.cvv,
        Amount: form.amount,
        ExptDate: `${form.month}/${form.year}`
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    handleValidation();
    // checking validation every time when form state is updating
  }, [form])

  return (
    <div className={styles.homeWrapper} >
      <CssBaseline />
      <Container className={styles.container} maxWidth="lg">

        <form onSubmit={e => handleSubmit(e)} className={styles.form}>
          <TextField 
            onChange={(e) => handleChange(e)} 
            name='cardNumber' 
            inputProps={{ maxLength: 16 }} 
            fullWidth 
            className={styles.cardNumberInput} 
            id="outlined-basic" 
            label="Card Number" 
            size='small' 
            variant="outlined" 
          />
          <div className={styles.dateAndCvvBox}>

            <label className={styles.label} >Month</label>
            <select onChange={(e) => handleChange(e)} className={styles.select} defaultValue='--' name="month">
              <option disabled>--</option>
              {
                allMonthsFormatted.map((month, i) => <option className={styles.option} key={i} value={month} >{month}</option>)
              }
            </select>

            <label className={styles.label} >Year</label>
            <select onChange={(e) => handleChange(e)} className={styles.select} defaultValue='--' name="year">
              <option disabled>--</option>
              {
                exptYearVariants.map((year, i) => <option className={styles.option} key={i} value={year} >{year}</option>)
              }
            </select>

          </div>
          <TextField 
            onChange={(e) => handleChange(e)} 
            name='cvv' 
            inputProps={{ maxLength: 3 }} 
            className={styles.cvvInput} 
            id="outlined-basic" 
            label="Cvv" 
            size='small' 
            variant="outlined"
          />

          <FormControl  fullWidth size='small' >
            <InputLabel className='amount' htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              name='amount'
              onChange={(e) => handleChange(e)}
            />
            </FormControl>

          <div className={styles.buttonBox}>
            <button disabled={isValid ? false : true } >Submit</button>
          </div>

          </form>

          <div>
            <div className={styles.cardWrapper} >
              <div className={styles.cardChipWrapper}>
                <div className={styles.cardChip} ></div>
              </div>
              <p className={styles.creditCardNumber} >
                {
                  form.cardNumber ? form.cardNumber : '****************'     
                }
              </p>
              <div className={styles.cardBottomWrapper}>
                <p className={styles.cardFullName} >Name Surname</p>
                <p className={styles.cardExptDate}>
                    {
                      `${form.month ? form.month : '--'} / ${form.year ? form.year : '----'}`
                    }
                </p>              
              </div>
            </div>
          </div>
    </Container>
  </div >
  )
}

export default Home
