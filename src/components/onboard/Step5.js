import { Input, Heading, FormControl,
FormLabel,
FormErrorMessage,
FormHelperText,
Button,
Select
} from '@chakra-ui/react'
import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../lib/UserDataProvider';

  const Step5 = (props) => {
  const ctx = useContext(UserContext);
  const [ selectedAffiliates, setSelectedAffiliates ] = useState([]);
  const [ brandArray, setBrandArray] = useState(['Amazon', 'Flipkart', 'Ajio', 'Myntra'])
  const affiliateBrand = useRef();
  const affiliateCode = useRef();

	const next = (e) => {
    // console.log(ctx.userData);
	  e.preventDefault();
    ctx.setAffiliateCodes(selectedAffiliates);
	  props.nextStep();
	};
  
	const back = (e) => {
	  e.preventDefault();
	  props.prevStep();
	};
  
  const handleAffiliates = (e) =>{
    e.preventDefault();
    console.log(selectedAffiliates);
    console.log(brandArray);
    let newSelectedAffiliates = [...selectedAffiliates];
    newSelectedAffiliates.push(affiliateBrand.current.value+' '+affiliateCode.current.value);
    setSelectedAffiliates(newSelectedAffiliates);
    let newBrandArray = brandArray.filter(brand => brand !== affiliateBrand.current.value)
    setBrandArray(newBrandArray);
  }
    return(
      <>
      <form onSubmit={next}>
      <Heading>Affiliate codes</Heading>
      <Select placeholder='Affiliates' w='200px' ref={affiliateBrand}>
        {brandArray.map((item, id) => <option value={item} key={id}>{item}</option>)}
      </Select>
      <Input type='text' w='200px' ref={affiliateCode}/>
      <Button onClick={handleAffiliates}>Add</Button>
      </form>
      <br/>
      <Button onClick={back}>Back</Button>
      <Button onClick={next}>Next</Button>
      </>
    )
  }
  export default Step5;