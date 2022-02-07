import {
	Input,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
  } from '@chakra-ui/react'
  
  const Step5 = (props) => {
	const next = (e) => {
	  e.preventDefault();
	  props.nextStep();
	};
  
	const back = (e) => {
	  e.preventDefault();
	  props.prevStep();
	};
    const { values, handleChange } = props;
  
      return(
        <>
        <FormControl>
        <Heading>Enter User details</Heading>
            <FormLabel >Affliate codes</FormLabel>
            <Input value={values.phone} type='phone' w='200px' onChange={handleChange('phone')} />
            <br/><br/>
          <Button onClick={back}>Back</Button>
          <Button onClick={next}>Next</Button>
        </FormControl>
        </>
      )
  }
  export default Step5;