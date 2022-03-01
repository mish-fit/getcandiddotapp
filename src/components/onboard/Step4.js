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
	useToast,
} from '@chakra-ui/react';
import Header from './Header';
import { firestore } from 'lib/firebase';
import { useState, useContext, useRef, useEffect } from 'react';
import UserDataProvider, { UserContext } from 'lib/UserDataProvider';
import '@fontsource/poppins';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { authapi } from "lib/api";
import axios from 'axios';

const brands = [
	{ value: 'amazon', label: 'Amazon' },
	{ value: 'flipkart', label: 'Flipkart' },
	{ value: 'ajio', label: 'Ajio' },
	{ value: 'myntra', label: 'Myntra' },
];

const Step4 = (props) => {
	const router = useRouter();
	const toast=  useToast();
	const [userDataContext, user] = useContext(UserContext);
	const affiliateCode = useRef();
	const affiliateBrand = useRef();
	const [brandArray, setBrandArray] = useState(brands);
	const [selectedItems, setSelectedItems] = useState([]);
	const [showInput, setShowInput] = useState(false);
	const [affiliates, setAffiliates]= useState({});
	const [codes_array, set_code_array]=useState([]);
	
	useEffect(()=>{
		console.log('AC', codes_array);
		console.log('Step4', userDataContext.userData);
	},[codes_array, userDataContext.userData])

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
		affiliates[selectedItems[selectedItems.length - 1].value] = affiliateCode.current.value;
		setAffiliates(affiliates);
		const new_codes_array = codes_array;
		new_codes_array.push({
			'id':'',
		 	'u_id':userDataContext.userSignInInfo.user.uid,
			'u_name':userDataContext.userData.name,
			'br_id':'',
			'br_name': selectedItems[selectedItems.length - 1].value,
			'aff_link': '',
			'aff_code': affiliateCode.current.value,
			'others':{}
		})
		set_code_array(new_codes_array);
		// console.log(codes_array);
		// console.log(affiliates);
		setShowInput(false);
	};

	const next = async (e) => {
		e.preventDefault();
		userDataContext.setAffiliateCodes(codes_array);
		console.log(userDataContext.userData);

		const batch = firestore.batch();
		const usernameDoc = firestore.doc(`usernames/${userDataContext.userData.username}`);
		batch.set(usernameDoc, { uid: userDataContext.userSignInInfo.user.uid });
		
		const userDoc = firestore.doc(
			`users/${userDataContext.userSignInInfo.user.uid}`
		);
		batch.set(userDoc, {
			username: userDataContext.userData.username,
			name: userDataContext.userData.name,
			mail: userDataContext.userData.mail,
			phone: userDataContext.userData.phone,
			about: userDataContext.userData.about,
			affiliateCodes: affiliates,
		});
		await batch.commit();
		
		const u_data =	{
			"u_id": userDataContext.userSignInInfo.user.uid,
			"u_name": userDataContext.userData.name,
			"u_profile_image": userDataContext.userData.profile_image,
			"u_cover_image": "",
			"u_uuid": userDataContext.userData.username,
			"u_email": userDataContext.userData.mail,
			"u_phone": userDataContext.userData.phone,
			"u_about": userDataContext.userData.about,
			"u_gender": "",
			"u_dob": "",
			"expo_token": "",
			"device_token": "",
			"u_language": "en",
			"aff_ids":affiliates,
			"others": {
				"twitter": "",
				"instagram": ""
			}
		}
	
	// API Call 1: User Data
	axios(
		{
			method: "post",
			url: `${authapi}user/add`,
			data:  u_data ,
			options: origin,
		},
		{ timeout: 5000 }
	)
		.then((res) => {
			console.log("Success", res.data);
			toast({
				title: "New User Added",
				description: "",
				status: "success",
				duration: 1000,
				isClosable: true,
			});
		})

		// API Call 2: Aff Codes
		if(codes_array!==null){
		axios(
			{
				method: "post",
				url: `${authapi}affcodes`,
				data:  {codes_array: JSON.stringify(codes_array)} ,
				options: origin,
			},
			{ timeout: 5000 }
		)
			.then((res) => {
				console.log("Success", res.data);
				// toast({
				// 	title: "Aff codes added",
				// 	description: "",
				// 	status: "success",
				// 	duration: 1000,
				// 	isClosable: true,
				// });
			})
		.catch((e) => console.log(e));
		}

		// API Call 3: Links
		const links = {
			"id": "",
			"u_id": userDataContext.userSignInInfo.user.uid,
			"type": "Links",
			"u_buckets": "['My Links']"
		} 
		axios(
			{
				method: "post",
				url: `${authapi}links`,
				data:  {links: JSON.stringify(links)} ,
				options: origin,
			},
			{ timeout: 5000 }
		)
			.then((res) => {
				console.log("Success: Links Added", res.data);
				// toast({
				// 	title: "Aff codes added",
				// 	description: "",
				// 	status: "success",
				// 	duration: 1000,
				// 	isClosable: true,
				// });
			})
		.catch((e) => console.log(e));


		// API Call 4: Recos
		const recos = {
			"id": "",
			"u_id": userDataContext.userSignInInfo.user.uid,
			"type": "Recos",
			"u_buckets": "['My Recos']"
		} 
		axios(
			{
				method: "post",
				url: `${authapi}recos`,
				data:  {recos: JSON.stringify(recos)} ,
				options: origin,
			},
			{ timeout: 5000 }
		)
			.then((res) => {
				console.log("Success: Recos Added", res.data);
				// toast({
				// 	title: "Aff codes added",
				// 	description: "",
				// 	status: "success",
				// 	duration: 1000,
				// 	isClosable: true,
				// });
			})
		.catch((e) => console.log(e));

		router.push('/dashboard');
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
						<Flex flexDirection={'column'}>
						{Object.keys(affiliates).map((item, id) => (
							<Heading value={item} key={id} size='md' mb='10px'>
								{item+ ' ' +affiliates[item]}
								<br></br>
							</Heading>
						))}
						</Flex>
						<Flex justifyContent={'space-between'}>
								<Button
									// bg={'#D7354A'}
									// _hover={{ bg: '#C23043' }}
									// borderRadius={10}
									// color='white'
									fontSize={'lg'}
									width={120}
									height={50}
									mr={{base:'40px', md:'0'}}
									onClick={next}
								>
									Skip
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
