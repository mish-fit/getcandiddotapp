import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { Flex, Text, Input,Button, Container,Stack, Center, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import "@fontsource/poppins";
import { useRouter } from 'next/router';
import Header from 'components/onboard/Header';
import { AiFillGoogleCircle } from "react-icons/ai";
// Sign in with Phone button
export function SignInOptions() {
	const router = useRouter();
	const [mynumber, setNumber] = useState('+91');
	const [otp, setOtp] = useState('');
	const [show, setShow] = useState(false);
	const [googleShow, setGoogleShow]=useState(true);
	const [final, setFinal] = useState('');

	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider).then((result) => {
			router.push('/onboard');
		});
	};

	// useEffect(()=>{
	// 	setNumber
	// })
	// Validate OTP
	const ValidatePhoneOTP = () => {
		if (otp === null || final === null) return;
		final
			.confirm(otp)
			.then((result) => {
				router.push('/onboard');
			})
			.catch((err) => {
				alert('Wrong code');
			});
	};

	const signInWithPhone = async () => {
		if (mynumber === '' || mynumber.length < 10) return;
		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
		let newnumber = '+91' + mynumber;
		auth
			.signInWithPhoneNumber(newnumber, verify)
			.then((result) => {
				setFinal(result);
				alert('OTP Sent');
				setShow(true);
				setGoogleShow(false);
			})
			.catch((err) => {
				alert(err);
				window.location.reload();
			});
	};

	const setHandler=()=>{
		setShow(!show);
		setGoogleShow(!googleShow);
	}

	return (

		<Container
			fontFamily={'Poppins'}
			maxW={'container.md'}
			p={0}
			align='center'
		>
		<Header />
		<Flex
			display={{ md: 'flex' }}
		><Stack
		align={{ base: "center", md: "stretch" }}
		textAlign={{ base: "center", md: "left" }}
		mt={{ base: 4, md: 0 }}
		ml={{ md: 6 }}
	>
		<Flex flexDirection={'column'}>
			<Flex style={{ display: !show ? 'block' : 'none' } }>
			<Text >Verify your phone number to sign in or <br/>create a new Candid Account.</Text>
				{/* <Input
					value={mynumber}
					bg='white'
					marginTop='10px'
					focusBorderColor='#D7354A'
					height={50}
					fontSize={18}
					width={250}					
					onChange={(e) => {
						setNumber(e.target.value);
					}}
				/> */}
				<InputGroup 
				marginTop='20px'>
					<InputLeftAddon children='+91'
					height={50}
					fontSize={18}
 				/>
					<Input type='tel'
					// value={mynumber}
					bg='white'
					focusBorderColor='#E78692'
					height={50}
					fontSize={18}
					width={190}
					onChange={(e) => {
						setNumber(e.target.value);
					}}/>
				</InputGroup>
				<Flex id='recaptcha-container'></Flex>
				<Button 
				bg={'#D7354A'}
				_hover={{ bg: '#C23043' }}
				borderRadius={10}
				color='white'
				width={250}				
				height={50}
				fontSize={18}
				marginTop='10px'
				marginBottom='10px'
				onClick={signInWithPhone}>Verify</Button>
			</Flex>
			<Flex style={{ display: show ? 'block' : 'none' }}>
				<Input
					type='text'
					bg='white'					
					focusBorderColor='#E78692'
					_hover={ {borderColor:'#E78592'}}
					borderColor='#E78592'
					height={50}
					width={200}
					fontSize={18}
					placeholder={'Enter your OTP'}
					marginBottom='10px'
					onChange={(e) => {
						setOtp(e.target.value);
					}}
					width={200}
				></Input>
				
				<Button 
				display='block'
				bg={'#D7354A'}
				_hover={{ bg: '#C23043' }}
				borderRadius={10}
				color='white'
				width={200}				
				height={50}
				fontSize={18}
				marginTop='10px'
				marginBottom='10px'
				onClick={ValidatePhoneOTP}>Confirm</Button>
				<Button
				bg={'#D7354A'}
				_hover={{ bg: '#C23043' }}
				borderRadius={10}
				color='white'
				width={200}				
				height={50}
				fontSize={18}
				marginTop='10px'
				marginBottom='10px'
				onClick={setHandler}>Go Back</Button>
			</Flex>
			<Flex style={{display:googleShow?'block':'none'}}>
			<Text marginTop='10px' marginLeft='25px' fontWeight={'bold'}> See other ways to Sign In </Text>
			<Button
				color='white'
				borderRadius={10}
				width={250}				
				height={50}
				fontSize={18}
				bg={'#1A8BF7'}
				_hover={{ bg: '#1A7BF7'}}
				onClick={signInWithGoogle}>
				{/* <AiFillGoogleCircle size={20} />  */}
				Continue with Google</Button>
			</Flex>
		</Flex>
		</Stack>
</Flex></Container>
	);
}
