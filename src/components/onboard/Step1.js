import { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import { firestore } from '../../lib/firebase';
import { UserContext } from '../../lib/UserDataProvider';
import debounce from 'lodash.debounce';
import {
	Box,
	Input,
	Heading,
	Text,
	Button,
	Container,
	Stack,
	Progress,
	Flex,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import Header from './Header';
import '@fontsource/poppins';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Step1 = (props) => {
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const [userDataContext, user] = useContext(UserContext);

	const checkUsername = useMemo(
		() =>
			debounce(async (username) => {
				if (username.length >= 3) {
					const ref = firestore.doc(`usernames/${username}`);
					const { exists } = await ref.get();
					console.log('Firestore read executed!');
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
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		const batch = firestore.batch();
		// console.log(userDataContext.userData.username);
		console.log(userDataContext.userSignInInfo.user.email);
		// console.log(userDataContext.userSignInInfo);
		console.log(userDataContext.userSignInInfo.user.phoneNumber);

		// sending data to firebase when user logged in with phone
		if (userDataContext.userSignInInfo.user.email == null) {
			batch.set(userDoc, {
				username: formValue,
				phone: userDataContext.userSignInInfo.user.phoneNumber,
			});
			batch.set(usernameDoc, { uid: userDataContext.userSignInInfo.user.uid });
			await batch.commit();
		}
		// sending data to firebase when user logged in with mail
		else {
			batch.set(userDoc, {
				username: formValue,
				mail: userDataContext.userSignInInfo.user.email,
				photoURL: userDataContext.userSignInInfo.user.photoURL,
				displayName: userDataContext.userSignInInfo.user.displayName,
			});
			batch.set(usernameDoc, { uid: userDataContext.userSignInInfo.user.uid });
			await batch.commit();
		}

		if (userDataContext.userSignInInfo.user.email === null) {
			userDataContext.setPhone(userDataContext.userSignInInfo.user.phoneNumber);
		} else {
			userDataContext.setName(userDataContext.userSignInInfo.user.name);
			userDataContext.setMail(userDataContext.userSignInInfo.user.mail);
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
		<Container
			fontFamily={'Poppins'}
			maxW={'container.md'}
			p={0}
			align='center'
		>
			<Header value={25} />
			<Flex display={{ md: 'flex' }}>
				<Stack
					align={{ base: 'center', md: 'stretch' }}
					textAlign={{ base: 'center', md: 'left' }}
					mt={{ base: 4, md: 0 }}
					ml={{ md: 6 }}
				>
					<Flex flexDirection={'column'}>
						<Heading size={'lg'}>Choose a Username</Heading>
						<FormLabel
							size={'md'}
							margin='10px'
							marginLeft='0px'
							paddingBottom='1rem'
						>
							This will become your personal Candid URL. You can change this
							later in Settings.
						</FormLabel>
						<form onSubmit={next}>
							<Flex flexDirection={'row'} alignItems={'center'}>
								<Input
									name='username'
									bg='white'
									focusBorderColor='#E78692'
									_hover={{ borderColor: '#E78592' }}
									borderColor='#E78592'
									height={50}
									width={200}
									fontSize={18}
									display='inline'
									placeholder='Username...'
									value={formValue}
									onChange={onChange}
								/>{' '}
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
							<Button
								bg={'#D7354A'}
								_hover={{ bg: '#C23043' }}
								borderRadius={10}
								color='white'
								width={200}
								height={50}
								fontSize={18}
								marginTop={'10px'}
								type='submit'
								disabled={!isValid}
							>
								Next
							</Button>
						</form>
					</Flex>
				</Stack>
			</Flex>
		</Container>
	);
};
function UsernameMessage({ username, isValid, loading }) {
	if (loading) {
		return <Text fontSize={15}>Checking...</Text>;
	} else if (isValid) {
		return (
			<Text fontSize={15} className='text-success'>
				{username} is available!
			</Text>
		);
	} else if (username && !isValid) {
		return (
			<Text fontSize={15} className='text-danger'>
				That username is taken!
			</Text>
		);
	} else {
		return (
			<Text fontSize={15}>
				Usernames can contain letters, numbers, underscores, and periods.
			</Text>
		);
	}
}

export default Step1;
