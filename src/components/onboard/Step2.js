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
const Step2 = (props) => {
  const name= useRef();
  const mail=useRef();
  // const [formValue, setFormValue] = useState('');
  const ctx = useContext(UserContext)
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
  // const { values, handleChange } = props;
  
  // const handleMail = (e)=>{
  //   e.preventDefault();
  //   const val=e.target.value;
  //   setFormValue(val);
  // }

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