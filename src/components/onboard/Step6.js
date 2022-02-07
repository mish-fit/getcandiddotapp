import {
	Input,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
  } from '@chakra-ui/react'
  
  const Step6 = (props) => {
  
	const back = (e) => {
	  e.preventDefault();
	  props.prevStep();
	};
    const submitHandler = (e) => {
        e.preventDefault();
      };
    const { values, handleChange } = props;
  
      return(
        <>
        <FormControl>
        <Heading>Submit User details</Heading>
            <br/><br/>
          <Button onClick={back}>Back</Button>
          <Button onClick={submitHandler}>Submit</Button>
        </FormControl>
        </>
      )
  }
  export default Step6;