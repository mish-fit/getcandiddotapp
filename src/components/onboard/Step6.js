import {
	Input,
  Text,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
  } from '@chakra-ui/react'
import { useContext } from 'react';
import { UserContext } from '../../lib/UserDataProvider';
const Step6 = (props) => {
  const ctx=useContext(UserContext);
  console.log(ctx.userData);
	const back = (e) => {
	  e.preventDefault();
	  props.prevStep();
	};
    const submitHandler = (e) => {
        e.preventDefault();
      };
  
      return(
        <>
        <FormControl>
        <Heading>Submit User details</Heading>
          <br/>
          <Text>{ctx.userData.name}</Text>
          <Text>{ctx.userData.username}</Text>
          <Text>{ctx.userData.mail}</Text>
          <Text>{ctx.userData.phone}</Text>
          <Text>{ctx.userData.affiliateCodes}</Text>
          <Button onClick={back}>Back</Button>
          <Button onClick={submitHandler}>Submit</Button>
        </FormControl>
        </>
      )
  }
  export default Step6;