import {
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/react'

import { useState, useContext, useRef } from 'react';
import { UserContext } from '../../lib/UserDataProvider';
const Step2 = (props) => {
  const name= useRef();
  const mail=useRef();
  const ctx = useContext(UserContext)
	console.log('Step2', ctx.userData);
  const next = (e) => {
    e.preventDefault();
    ctx.setName(name.current.value);
    ctx.setMail(mail.current.value);
    props.nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

    return(
      <>
				<form onSubmit={next}>
        <Heading>Enter User Details</Heading>
          <FormLabel>Full Name</FormLabel>
          <Input name='name' type='text' w='200px' ref={name}/>
          <FormLabel >E-Mail</FormLabel>
          <Input name='mail' type='email' w='200px' ref={mail} />
          <br/><br/>
          <Button type='submit'>Next</Button>
        </form>
        <Button onClick={back}>Back</Button>
        </>
    )
}
export default Step2;