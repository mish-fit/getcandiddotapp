import {
	Input,
	Text,
	Heading,
	Box,Stack, Container,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
} from '@chakra-ui/react';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../lib/UserDataProvider';
const Step2 = (props) => {
	// const name= useRef();
	// const mail=useRef();
	const [state, setState] = useState({
		name: '',
		mail: '',
	});
	const [isGmail, setIsGmail] = useState(false);
	const [info, setInfo] = useState(false);
	const ctx = useContext(UserContext);
	// console.log('Step2', ctx.userData);

	useEffect(() => {
		if (ctx.userSignInInfo.user.mail !== null) {
			setInfo(true);
		}
	}, [ctx.userSignInInfo.user.mail]);

	const SignInWithGoogle = () => {
		auth.currentUser
			.linkWithPopup(googleAuthProvider)
			.then((result) => {
				// var credential = result.credential;
				// var u = result.user;
				// ctx.setMail(result.user.email);
				setState({
					...state,
					mail: result.user.email,
				});
				console.log('hh', mail);
				console.log('jj', result.user.mail);
				// ctx.setMail((result.user.email));
				setIsGmail(false);
				setInfo(true);
				console.log(result.user);
			})
			.catch((error) => {});
	};

	const next = (e) => {
		e.preventDefault();
		if (ctx.userData.mail === null) {
			ctx.setMail(ctx.userSignInInfo.user.email);
		}
		if (ctx.userData.mail !== null) {
			ctx.setMail(state.mail);
		}
		ctx.setName(state.name);
		// ctx.setMail(state.mail);
		props.nextStep();
	};

	const onChange = (e) => {
		// console.log(state.name, state.mail);
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
		console.log(e.target.value);
		const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/;
		if (regex.test(e.target.value)) {
			setIsGmail(true);
		}
		if (!regex.test(e.target.value)) {
			setIsGmail(false);
		}
	};

	const onChangeName = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
		console.log(e.target.value);
	};
	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	return (
		<>
	<Container maxW={'container.lg'} h={'100vh'} p={0} pt='10' align='center'>
	<Box
	p={10}
	display={{ md: "flex" }}
	maxWidth='26rem'
	borderWidth={1}
	margin={4}
	><Stack
		align={{ base: "center", md: "stretch" }}
		textAlign={{ base: "center", md: "left" }}
		mt={{ base: 4, md: 0 }}
		ml={{ md: 6 }}
		>
		<Box>
			<form onSubmit={next}>
				<Heading size={'lg'} >Enter User Details</Heading>
				<FormLabel>Full Name</FormLabel>
				<Input
					name='name'
					defaultValue={ctx.userSignInInfo.user.displayName}
					type='text'
					w='200px'
					onChange={onChangeName}
				/>
				<FormLabel style={{ display: !info ? 'block' : 'none' }}>
					E-Mail
				</FormLabel>
				<Input
					style={{ display: !info ? 'block' : 'none' }}
					name='mail'
					type='email'
					w='200px'
					onChange={onChange}
				/>
				<br />
				<Text style={{ display: info ? 'block' : 'none' }} marginBottom='10px'>
					Your email is taken from gmail.
				</Text>
				<Button
					bg={'#ff5151'}
					borderRadius={50}
					_hover={{ bg: '#D7354A' }}
					onClick={SignInWithGoogle}
					style={{ display: isGmail ? 'block' : 'none' }}
				>
					{' '}
					Link Google Account
				</Button>

			<Button bg={'#ff5151'} 
					borderRadius={50} marginRight='10px' color='white' _hover={{ bg: '#D7354A' }} onClick={back}>
				Back
			</Button>
				<Button bg={'#ff5151'} color='white' _hover={{ bg: '#D7354A' }} 
					borderRadius={50} type='submit'>
					Next
				</Button>
			</form>
			</Box>
			</Stack>
		</Box>
		</Container>
		</>
	);
};

export default Step2;
