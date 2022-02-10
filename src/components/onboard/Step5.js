import {
	Input,
	Heading,
	Container,Box,Stack,Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
	Select,
} from '@chakra-ui/react';
import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../lib/UserDataProvider';

const Step5 = (props) => {
	const ctx = useContext(UserContext);
	const [selectedAffiliates, setSelectedAffiliates] = useState([]);
	const [brandArray, setBrandArray] = useState([
		'Amazon',
		'Flipkart',
		'Ajio',
		'Myntra',
	]);
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

	const handleAffiliates = (e) => {
		e.preventDefault();
		console.log(selectedAffiliates);
		console.log(brandArray);
		let newSelectedAffiliates = [...selectedAffiliates];
		newSelectedAffiliates.push(
			affiliateBrand.current.value + ' ' + affiliateCode.current.value
		);
		setSelectedAffiliates(newSelectedAffiliates);
		let newBrandArray = brandArray.filter(
			(brand) => brand !== affiliateBrand.current.value
		);
		setBrandArray(newBrandArray);
	};
	return (
		<>
	<Container maxW={'container.lg'} h={'100vh'} p={0} pt='10' align='center'>
	<Box
	p={10}
	display={{ md: "flex" }}
	maxWidth='32rem'
	borderWidth={1}
	margin={4}
	><Stack
		align={{ base: "center", md: "stretch" }}
		textAlign={{ base: "center", md: "left" }}
		mt={{ base: 4, md: 0 }}
		ml={{ md: 6 }}
		>
			<form onSubmit={next}>
				<Heading>Affiliate codes</Heading>
				<Flex>
				<Box w='150px' >
				<Select placeholder='Affiliates' ref={affiliateBrand}>
					{brandArray.map((item, id) => (
						<option value={item} key={id}>
							{item}
						</option>
					))}
				</Select>
				</Box>
				<Box w='150px'>
				<Input type='text'  ref={affiliateCode} />
				</Box>
				<Button
				borderRadius={50}
				color='white'
					bg={'#ff5151'}
					_hover={{ bg: '#D7354A' }}
					onClick={handleAffiliates}
				>
					Add
				</Button>
				</Flex>

			<br />
				<Button 
				borderRadius={50}
				color='white' bg={'#ff5151'} marginRight='5px' _hover={{ bg: '#D7354A' }} onClick={back}>
				Back
			</Button>
			<Button 
				borderRadius={50}
				color='white' bg={'#ff5151'} _hover={{ bg: '#D7354A' }} onClick={next}>
				Next
			</Button>
			</form>
			
			</Stack>
		</Box>
		</Container>
		</>
	);
};
export default Step5;
