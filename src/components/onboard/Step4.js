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
const Step4 = (props) => {
  const ctx = useContext(UserContext);
	console.log(ctx.userData);
  const next = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  
	const back = (e) => {
	  e.preventDefault();
	  props.prevStep();
	};

	return (
		<>
		<FormControl>
			<Heading>Select Image</Heading>
			<Input
				type='file'
				w='200px' 
		/>
			<br/>
			<Button type='submit'>
				Upload
			</Button>          

			<br/><br/>
			<Button onClick={back}>Back</Button>
			<Button onClick={next}>Next</Button>
		</FormControl>
		</>
	);
};
export default Step4;
