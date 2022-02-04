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
import { UserContext } from '../../../lib/UserDataProvider';
const Step3 = (props) => {
  const name = useRef();
  const phone = useRef();
  const ctx = useContext(UserContext)
  const next = (e) => {
    e.preventDefault();
    ctx.setName(name.current.value);
    ctx.setPhone(phone.current.value);
  }

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
          <FormLabel >Phone Number</FormLabel>
          <Input name='phone' type='text' w='200px' ref={phone} />
          <br/><br/>
          <Button type='submit'>Next</Button>
        </form>
        <Button onClick={back}>Back</Button>
      </>
    )
}
export default Step3;