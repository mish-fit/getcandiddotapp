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
import { AiFillGoogleCircle } from 'react-icons/ai';
import "@fontsource/poppins";
const Step2 = (props) => {
	// const name= useRef();
	// const mail=useRef();
	const [state, setState] = useState({
		name: '',
		mail: '',
	});
	const [showLink, setShowLink] = useState(false);
	const [mailInput, setMailInput] = useState(true);
	const [info, setInfo] = useState(false);
	const ctx = useContext(UserContext);
	// console.log('Step2', ctx.userData);

	useEffect(() => {
		if(ctx.userData.phone==='+91'){
			setMailInput(false);
		}
		
		setShowLink(false);
		setInfo(false);
	}, [ctx.userSignInInfo.user.mail]);

	const SignInWithGoogle = () => {
		auth.currentUser
			.linkWithPopup(googleAuthProvider)
			.then((result) => {
				// var credential = result.credential;
				// var u = result.user;
				// ctx.setMail(result.user.email);
				setMailInput(false);
				setShowLink(false);
				setInfo(true);
				setState({
					...state,
					mail: result.user.email,
				});
				console.log('reached');
				// console.log('hh', mail);
				// console.log('jj', result.user.email);
				// ctx.setMail((result.user.email));
				setMailInput(false);
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
		console.log(e.target.value);
	};
	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	return (
		<>
	<Container fontFamily={"Poppins"} maxW={'container.lg'} h={'100vh'} p={0} pt='10' align='center'>
	<Box
	p={10}
	bg='gray.50'
	display={{ md: "flex" }}
	maxWidth='26rem'
	borderWidth={2}
	margin={4}
	><Stack
		align={{ base: "center", md: "stretch" }}
		textAlign={{ base: "center", md: "left" }}
		mt={{ base: 4, md: 0 }}
		ml={{ md: 6 }}
		>
		<Box>
			<form onSubmit={next}>
				<Heading size={'lg'} marginBottom="20px" >Enter User Details</Heading>
				<FormLabel>Full Name</FormLabel>
				<Input
					name='name'
					bg='white'
					marginBottom='10px'
					focusBorderColor='#ff5151'
					defaultValue={ctx.userSignInInfo.user.displayName}
					type='text'
					w='200px'
					onChange={onChangeName}
				/>
				<Box style={{ display: mailInput ? 'block' : 'none' }}>
				<FormLabel >
					E-Mail
				</FormLabel>
				<Input
					name='mail'
					bg='white'
					focusBorderColor='#ff5151'
					type='email'
					w='200px'
					onChange={onChange}
				/>
				</Box>
				<Text style={{ display: info ? 'block' : 'none' }} marginBottom='10px'>
					Your email is taken from mailInput.
				</Text>
				
				<Button
				style={{ display: showLink ? 'block' : 'none' }}
				marginTop='10px'
				borderRadius={50}
				color='white'
				bg={'#007AFF'}
				_hover={{ bg: '#005AFF'}}
				onClick={SignInWithGoogle}> &nbsp; Link Google Account</Button>
				<br/>
			<Button bg={'#ff5151'} 
					borderRadius={50} marginRight='5px'  color='white' _hover={{ bg: '#D7354A' }} onClick={back}>
				Back
			</Button>
				<Button bg={'#ff5151'} color='white'  _hover={{ bg: '#D7354A' }} 
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
