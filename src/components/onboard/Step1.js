import { Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';
import '@fontsource/poppins';
import debounce from 'lodash.debounce';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { firestore } from '../../lib/firebase';
import { UserContext } from '../../lib/UserDataProvider';
import { Layout } from './Layout';

const Step1 = (props) => {
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const [userDataContext, user] = useContext(UserContext);

	// useEffect(()=>{
	// console.log('Step1', userDataContext.userData);
	// 	const fetchData = async ()=>{
	// 		const ref = firestore.doc(`users/${userDataContext.userSignInInfo.user.uid}`);
	// 		console.log(ref.get());
	// 	}
	// },[])

	const checkUsername = useMemo(
		() =>
			debounce(async (username) => {
				if (username.length >= 3) {
					const ref = firestore.doc(`usernames/${username}`);
					const { exists } = await ref.get();
					// console.log('Firestore read executed!');
					setIsValid(!exists);
					setLoading(false);
				}
			}, 500),
		[]
	);

	useEffect(() => {
		checkUsername(formValue);
	}, [checkUsername, formValue]);

	const next = async (e) => {
		e.preventDefault();
		userDataContext.setUsername(formValue);

		// console.log(userDataContext.userData);
		const userDoc = firestore.doc(
			`users/${userDataContext.userSignInInfo.user.uid}`
		);
		// const usernameDoc = firestore.doc(`usernames/${formValue}`);
		const batch = firestore.batch();

		// console.log(userDataContext.userData.username);
		// console.log(userDataContext.userSignInInfo.user.email);
		// console.log(userDataContext.userSignInInfo);
		// console.log(userDataContext.userSignInInfo.user.phoneNumber);

		// sending data to firebase when user logged in with phone
		if (userDataContext.userSignInInfo.user.email == null) {
			batch.set(userDoc, {
		// 		username: formValue,
				phone: userDataContext.userSignInInfo.user.phoneNumber,
			});
			// batch.set(usernameDoc, { uid: userDataContext.userSignInInfo.user.uid });
			await batch.commit();
		}
		// sending data to firebase when user logged in with mail
		else {
			batch.set(userDoc, {
				// username: formValue,
				mail: userDataContext.userSignInInfo.user.email,
				// profile_image: userDataContext.userSignInInfo.user.photoURL,
				name: userDataContext.userSignInInfo.user.displayName,
			});
			// batch.set(usernameDoc, { uid: userDataContext.userSignInInfo.user.uid });
			await batch.commit();
		}

		if (userDataContext.userSignInInfo.user.email === null) {
			userDataContext.setPhone(userDataContext.userSignInInfo.user.phoneNumber);
		} else {
		// 	userDataContext.setName(userDataContext.userSignInInfo.user.displayName);
			userDataContext.setMail(userDataContext.userSignInInfo.user.email);
		}
		props.nextStep();
	};

	const onChange = (e) => {
		// Force form value typed in form to match correct format
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		// Only set form value if length is < 3 OR it passes regex
		if (val.length < 3) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	return (
		
		<Layout value={25}>
					<Flex flexDirection={'column'} w='100%'>
					<Flex  flexDirection={"column"} margin={6}>
						<Heading size={'lg'} textAlign={{base:'center', md:'left'}}>Choose a Username</Heading>
						<FormLabel
							size={'md'}
							margin='8px'
							marginLeft='0px'
							paddingBottom='1rem'
							textAlign={{base:'center', md:'left'}}
						>
							This will become your personal Candid URL. You can change this
							later in Settings.
						</FormLabel>
						<form onSubmit={next}>
							<Flex flexDirection={'row'} alignItems={'center'}>
								<Input
									name='username'
									// bg='white'
									// focusBorderColor='#E78692'
									// _hover={{ borderColor: '#E78592' }}
									// borderColor='#E78592'
									width={'md'}
									// height={50}
									// fontSize={'lg'}
									display='inline'
									placeholder='Username...'
									value={formValue}
									onChange={onChange}
								/>
								&nbsp;
								<AiOutlineCheckCircle
									color='#D7354A'
									size={30}
									style={{ display: isValid ? 'inline' : 'none' }}
								/>
							</Flex>
							<UsernameMessage
								username={formValue}
								isValid={isValid}
								loading={loading}
							/>
							<Flex>
							<Button
								variant={'primary'}
								width={'md'}
								_hover={{ bg: '#C23043' }}
								// bg={'#D7354A'}
								// borderRadius={10}
								// color='white'
								// fontSize={'lg'}
								// width={'md'}
								// height={50}
								// marginTop={'10px'}
								type='submit'
								disabled={!isValid}
							>
								Next
							</Button>
							</Flex>
						</form>
					</Flex>
					</Flex>
				</Layout>
	);
};
function UsernameMessage({ username, isValid, loading }) {
	if (loading) {
		return <FormLabel >Checking...</FormLabel>;
	} else if (isValid) {
		return (
			<FormLabel >
				{username} is available!
			</FormLabel>
		);
	} 
	else if (username)
	{
		if(username.length<3){
			return (
				<FormLabel>Username must be 3 or more letters.</FormLabel>
			)
		}
		else if(!isValid){
			return (
				<FormLabel >
					That username is taken!
				</FormLabel>
			);
		}
	} else {
		return (
			<FormLabel fontSize={15}>
				Usernames can only contain letters and numbers.
			</FormLabel>
		);
	}
}

export default Step1;
