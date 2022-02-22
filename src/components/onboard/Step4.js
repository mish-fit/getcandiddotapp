import {
	Input,
	Text,
	Heading,
	Stack,
	Container,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
} from '@chakra-ui/react';
import Header from './Header';
import { useState, useContext, useRef } from 'react';
import { firestore } from 'lib/firebase';
import UserDataProvider, { UserContext } from 'lib/UserDataProvider';
import '@fontsource/poppins';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { useRouter } from 'next/router';

const brands = [
	{ value: 'amazon', label: 'Amazon' },
	{ value: 'flipkart', label: 'Flipkart' },
	{ value: 'ajio', label: 'Ajio' },
	{ value: 'myntra', label: 'Myntra' },
];

const affiliates = [];

const Step4 = (props) => {
	const router = useRouter();
	const [userDataContext, user] = useContext(UserContext);
	const affiliateCode = useRef();
	const affiliateBrand = useRef();
	const [brandArray, setBrandArray] = useState(brands);
	const [selectedItems, setSelectedItems] = useState([]);
	const [showInput, setShowInput] = useState(false);
	const handleCreateItem = (item) => {
		setBrandArray((curr) => [...curr, item]);
		setSelectedItems((curr) => [...curr, item]);
		// console.log(curr);
	};

	const handleSelectedItemsChange = (selectedItems) => {
		if (selectedItems) {
			// console.log(selectedItems);
			setSelectedItems(selectedItems);
			setShowInput(true);
		}
	};

	const handleAffiliates = (e) => {
		e.preventDefault();
		// console.log(affiliates);
		// console.log(affiliateCode.current.value);
		// console.log(selectedItems[selectedItems.length-1].value);
		affiliates.push({
			brand: selectedItems[selectedItems.length - 1].value,
			code: affiliateCode.current.value,
		});
		console.log(affiliates);
		setShowInput(false);
	};

	const next = async (e) => {
		e.preventDefault();
		userDataContext.setAffiliateCodes(affiliates);
		console.log(userDataContext.userData);
		const userDoc = firestore.doc(
			`users/${userDataContext.userSignInInfo.user.uid}`
		);
		const batch = firestore.batch();
		batch.set(userDoc, {
			username: userDataContext.userData.username,
			displayName: userDataContext.userData.name,
			mail: userDataContext.userData.mail,
			phone: userDataContext.userData.phone,
			affiliateCodes: affiliates,
		});
		await batch.commit();
		router.push('/dashboard');
	};

	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	return (
		<>
			<Container
				fontFamily={'Poppins'}
				maxW={'container.md'}
				p={0}
				align='center'
			>
				<Header value={100} />
				<Flex display={{ md: 'flex' }}>
					<Stack
						align={{ base: 'center', md: 'stretch' }}
						textAlign={{ base: 'left', md: 'left' }}
						margin={6}
					>
						<Flex flexDirection={'column'}>
						<Heading size={'lg'} 
								textAlign={{base:'center', md:'left'}}>Affliate codes</Heading>
								<FormLabel
									size={'md'}
									margin='8px'
									marginLeft='0px'
									paddingBottom='1rem'
									textAlign={{base:'center', md:'left'}}
								>
									Add your all affiliate codes from below options.
								</FormLabel>
							<Flex width={'md'} display='block'>
								<CUIAutoComplete
									placeholder='Type a brand'
									onCreateItem={handleCreateItem}
									items={brandArray}
									inputStyleProps={{
										focusBorderColor: '#E78692',
										_hover: { borderColor: '#E78692' },
										borderColor: '#E78592',
										width: 'lg',
										height: '50',
									}}
									tagStyleProps={{
										rounded: 'full',
										pt: 1,
										pb: 2,
										px: 2,
										fontSize: '15',
									}}
									toggleButtonStyleProps={{
										width: '50px',
										height: '50px',
									}}
									selectedItems={selectedItems}
									onSelectedItemsChange={(changes) => {
										// console.log(changes);
										handleSelectedItemsChange(changes.selectedItems);
									}}
								/>
							</Flex>
							<Flex
								width='md'
								style={{ display: showInput ? 'inline' : 'none' }}
							>
								<Input
									type='text'
									bg='white'
									focusBorderColor='#E78692'
									_hover={{ borderColor: '#E78592' }}
									borderColor='#E78592'
									width='md'
									height='50px'
									fontSize={'lg'}
									marginBottom='10px'
									ref={affiliateCode}
								/>
								<Button
									borderRadius={50}
									bg={'#D7354A'}
									_hover={{ bg: '#C23043' }}
									borderRadius={10}
									color='white'
									width='md'
									height='50px'
									marginBottom='10px'
									fontSize={'lg'}
									onClick={handleAffiliates}
								>
									Add
								</Button>
							</Flex>
						</Flex>
						<Flex>
						{affiliates.map((item, id) => (
							<Heading value={item} key={id} size='md' mb='10px'>
								{item.brand + ' ' + item.code}
							</Heading>
						))}
						</Flex>
						<Flex justifyContent={'space-between'}>
								<Button
									bg={'#D7354A'}
									_hover={{ bg: '#C23043' }}
									borderRadius={10}
									color='white'
									fontSize={'lg'}
									width={120}
									height={50}
									mr={{base:'40px', md:'0'}}
									onClick={back}
								>
									Back
								</Button>
							<Button
								bg={'#D7354A'}
								_hover={{ bg: '#C23043' }}
								color='white'
								borderRadius={10}
								fontSize={'lg'}
								width={120}
								height={50}
								ml={{base:'170px', md:'0'}}
								onClick={next}
							>
								Submit
							</Button>
						</Flex>
					</Stack>
				</Flex>
			</Container>
		</>
	);
};
export default Step4;
