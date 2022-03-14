import {
	Button,
	Flex,
	FormLabel,
	Heading,
	Input,
	Text,
	Textarea,
} from '@chakra-ui/react';
import '@fontsource/poppins';
import { auth, googleAuthProvider } from 'lib/firebase';
import { UserContext } from 'lib/UserDataProvider';
import { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Layout } from './Layout';

const Step2 = (props) => {
	// const name= useRef();
	// const mail=useRef();
	const [state, setState] = useState({
		name: '',
		mail: '',
		about: '',
	});
	const [showLink, setShowLink] = useState(false);
	const [mailInput, setMailInput] = useState(true);
	const [info, setInfo] = useState(false);

	const [userDataContext, user] = useContext(UserContext);

	useEffect(() => {
		// console.log('Step2', userDataContext.userData);
	}, [userDataContext.userData]);

	useEffect(() => {
		if (userDataContext.userData.phone === '+91') {
			setMailInput(false);
		}

		setShowLink(false);
		setInfo(false);
	}, [userDataContext]);

	const SignInWithGoogle = () => {
		auth.currentUser
			.linkWithPopup(googleAuthProvider)
			.then((result) => {
				// var credential = result.credential;
				// var u = result.user;
				// userDataContext.setMail(result.user.email);
				setMailInput(false);
				setShowLink(false);
				setInfo(true);
				setState({
					...state,
					mail: result.user.email,
				});
				// console.log('reached');
				// console.log('hh', mail);
				// console.log('jj', result.user.email);
				// userDataContext.setMail((result.user.email));
				setMailInput(false);
				setInfo(true);
				// console.log(result.user);
			})
			.catch((error) => {});
	};

	const next = (e) => {
		e.preventDefault();
		if (userDataContext.userData.mail === null) {
			userDataContext.setMail(userDataContext.userSignInInfo.user.email);
			// userDataContext.setName(userDataContext.userSignInInfo.user.displayName);
		}
		if (userDataContext.userData.mail !== null) {
			userDataContext.setMail(state.mail);
		}

		userDataContext.setName(state.name);
		userDataContext.setAbout(state.about);
		// console.log('Next', userDataContext.userData);
		props.nextStep();
	};

	const onChangeMail = (e) => {
		// console.log(state.name, state.mail);
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
		// console.log(e.target.value);
		const regex = /^[a-z0-9](\.?[a-z0-9]){3,}@gmail\.com$/;
		if (regex.test(e.target.value)) {
			setShowLink(true);
		}
		if (!regex.test(e.target.value)) {
			setShowLink(false);
		}
	};

	const onChangeName = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
		// console.log(e.target.value);
	};

	const onChangeAbout = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
		// console.log(e.target.value);
	};

	const back = (e) => {
		e.preventDefault();
		props.nextStep();
	};

	return (
		<>
			<Layout value={50}>
				<Flex flexDirection={'column'} w='100%'>
					<Flex flexDirection={'column'} margin={6}>
						<Heading size={'lg'} textAlign={{ base: 'center', md: 'left' }}>
							Tell Us About You
						</Heading>
						<FormLabel
							size={'md'}
							margin='8px'
							marginLeft='0px'
							paddingBottom='1rem'
							textAlign={{ base: 'center', md: 'left' }}
						>
							Using your real name will help people confirm that they are
							interacting with you.
						</FormLabel>
						<form onSubmit={next}>
							<Flex flexDirection={'column'}>
								<FormLabel fontSize={'lg'}>Full Name</FormLabel>
								<Input
									required
									name='name'
									display='inline'
									type='text'
									// bg='white'
									// focusBorderColor='#E78692'
									// _hover={{ borderColor: '#E78592' }}
									// borderColor='#E78592'
									// height= {50}
									// width={'full'}
									// fontSize={'lg'}
									placeholder='Your name'
									defaultValue={userDataContext.userSignInInfo.user.displayName}
									onChange={onChangeName}
									marginBottom='24px'
								/>
								<FormLabel fontSize={'lg'}>About</FormLabel>
								<Textarea
									name='about'
									type='text'
									bg='white'
									display='inline'
									focusBorderColor='#E78692'
									_hover={{ borderColor: '#E78592' }}
									borderColor='black'
									fontSize={'lg'}
									width={'full'}
									height={100}
									placeholder='Tell us about you'
									marginBottom='24px'
									onChange={onChangeAbout}
								/>
								<Flex style={{ display: mailInput ? 'block' : 'none' }}>
									<FormLabel fontSize={'lg'}>E-Mail</FormLabel>
									<Input
										// required
										name='mail'
										type='email'
										// bg='white'
										// focusBorderColor='#E78692'
										// _hover={{ borderColor: '#E78592' }}
										// borderColor='#E78592'
										// height={50}
										// width={'full'}
										// fontSize={'lg'}
										marginBottom='24px'
										placeholder='Email address'
										onChange={onChangeMail}
									/>
								</Flex>
								<Text
									style={{ display: info ? 'block' : 'none' }}
									marginBottom='20px'
								>
									Your email is taken from gmail.
								</Text>
								<Flex style={{ display: showLink ? 'block' : 'none' }}>
									<Button
										variant={'primary'}
										border='1px'
										bg='white'
										color='black'
										_hover={{ bg: 'gray.50' }}
										_active={{ bg: 'gray.50' }}
										marginBottom='24px'
										onClick={SignInWithGoogle}
									>
										<Flex mr='8px'>
											<FcGoogle size={25} />
										</Flex>
										Link with Google Account
									</Button>
								</Flex>
							</Flex>
							{/* <Button
									style={{ display: showLink ? 'block' : 'none' }}
									color='white'
									borderRadius={10}
									width={'md'}
									height={50}
									fontSize={'lg'}
									marginBottom='20px'
									bg={'#1A8BF7'}
									_hover={{ bg: '#1A7BF7' }}
									onClick={SignInWithGoogle}
								>
									Link Google Account
								</Button> */}
							<Flex justifyContent={'space-between'}>
								<Button
									// bg={'white'}
									// _hover={{ bg: 'white' }}
									// borderRadius={10}
									// color='white'
									// textDecoration={'underline'}
									fontSize={'lg'}
									width={120}
									height={50}
									onClick={back}
								>
									Skip
								</Button>
								<Button
									variant={'primary'}
									width={120}
									// bg={'#D7354A'}
									// _hover={{ bg: '#C23043' }}
									// color='white'
									// borderRadius={10}
									// fontSize={'lg'}
									// width={120}
									// height={50}
									// mr={{base:'0', md:'200'}}
									type='submit'
								>
									Next
								</Button>
							</Flex>
						</form>
					</Flex>
				</Flex>
			</Layout>
		</>
	);
};

export default Step2;
