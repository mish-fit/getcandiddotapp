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
import { firestore } from '../../lib/firebase';
import { UserContext } from '../../lib/UserDataProvider';
const Step6 = (props) => {
  const ctx=useContext(UserContext);
  console.log(ctx.userData);
	const back = (e) => {
	  e.preventDefault();
	  props.prevStep();
	};
  const submitHandler = async(e) => {
      const userDoc = firestore.doc(`users/${ctx.userSignInInfo.user.uid}`);
      const batch = firestore.batch();
      batch.set(userDoc,{
        username: ctx.userData.username,
        displayName: ctx.userData.name,
        mail: ctx.userData.mail,
        phone: ctx.userData.phone,
        affiliateCodes: ctx.userData.affiliateCodes
      });
      await batch.commit();

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