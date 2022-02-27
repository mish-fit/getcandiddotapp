import { useEffect, useState } from 'react';
import firebase from 'firebase';
import Link from 'next/link';
import { auth, googleAuthProvider } from 'lib/firebase';
import {
	Flex,
	Text,
	Input,
	Button,
	Container,
	Heading,
	Stack,
	Center,
	InputGroup,
	InputLeftAddon,
	useToast,
} from '@chakra-ui/react';
import '@fontsource/poppins';
import { useRouter } from 'next/router';
import Header from 'components/onboard/Header';
import { FcGoogle } from 'react-icons/fc';
// Sign in with Phone button
export function SignInOptions() {
	const router = useRouter();
	const [mynumber, setNumber] = useState('+91');
	const [otp, setOtp] = useState('');
	const [show, setShow] = useState(false);
	const [googleShow, setGoogleShow] = useState(true);
	const [final, setFinal] = useState('');
	const toast=  useToast();

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
				// alert('Wrong code');
				toast({
					title: "Wrong Code",
					description: "",
					status: "error",
					duration: 1000,
					isClosable: true,
				});
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
				toast({
					title: "OTP Sent",
					description: "",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
				setShow(true);
				setGoogleShow(false);
			})
			.catch((err) => {
				alert(err);
				window.location.reload();
			});
	};

	const setHandler = () => {
		setShow(!show);
		setGoogleShow(!googleShow);
	};

	return (
		<Container
			fontFamily={'Poppins'}
			maxW={'container.md'}
			p={0}
			align='center'
		>
			<Header />
			<Flex display={{ md: 'flex' }}>
				<Stack
					align={{ base: 'center', md: 'stretch' }}
					textAlign={{ base: 'left', md: 'left' }}
					margin={6}
				>
					<Flex flexDirection={'column'}>
						<Flex style={{ display: !show ? 'block' : 'none' }}>
							
						<Heading size={'lg'} paddingBottom='8px' textAlign={{base:'center', md:'left'}}>Sign In</Heading>
							{/* <Input
					value={mynumber}
					bg='white'
					marginTop='8px'
					focusBorderColor='#D7354A'
					height={50}
					fontSize={18}
					width={250}					
					onChange={(e) => {
						setNumber(e.target.value);
					}}
				/> */}
							<InputGroup marginTop='16px'>
								<InputLeftAddon children='+91' height={50} fontSize={18} />
								<Input
									type='tel'
									// value={mynumber}
									bg='white'
									focusBorderColor='#E78692'
									height={50}
									fontSize={'lg'}
									width={'sm'}
									onChange={(e) => {
										setNumber(e.target.value);
									}}
								/>
							</InputGroup>
							<Flex id='recaptcha-container'></Flex>
							<Button
								bg={'#D7354A'}
								_hover={{ bg: '#C23043' }}
								borderRadius={25}
								color='white'
								height={50}
								width={'md'}
								fontSize={'lg'}
								marginTop='16px'
								marginBottom='24px'
								onClick={signInWithPhone}
							>
								Verify
							</Button>
						</Flex>

						<Flex style={{ display: show ? 'block' : 'none' }}>

						<Heading size={'lg'} textAlign={{base:'center', md:'left'}} mb={'16px'}>Verify OTP</Heading>
							<Input
								type='text'
								bg='white'
								textAlign={'center'}
								focusBorderColor='#E78692'
								_hover={{ borderColor: '#E78592' }}
								borderColor='#E78592'
								width={'md'}
								height={50}
								fontSize={18}
								placeholder={'Enter your OTP'}
								marginBottom='16px'
								onChange={(e) => {
									setOtp(e.target.value);
								}}
							/>
						
						<Flex justifyContent={'space-between'}>
							<Button
								// bg={'#D7354A'}
								// _hover={{ bg: '#C23043' }}
								// borderRadius={10}
								// color='white'
								width={120}
								height={50}
								fontSize={18}
								marginTop='8px'
								marginBottom='8px'
								onClick={setHandler}
							>
								Back
							</Button>
							<Button
								display='block'
								bg={'#D7354A'}
								_hover={{ bg: '#C23043' }}
								borderRadius={10}
								color='white'
								width={120}
								height={50}
								fontSize={18}
								marginTop='8px'
								marginBottom='8px'
								onClick={ValidatePhoneOTP}
							>
								Confirm
							</Button>
						</Flex>
						</Flex>
						<Flex style={{ display: googleShow ? 'block' : 'none' }}>
					<Flex style={{flexDirection: 'row', alignItems: 'center'}} my='8px'>
						<Flex style={{flex: 1, height: 1, backgroundColor: 'black'}} />
						<Flex>
							<Text style={{width: 50, textAlign: 'center'}}>Or</Text>
						</Flex>
						<Flex style={{flex: 1, height: 1, backgroundColor: 'black'}} />
					</Flex>
							<Flex>
								<Flex >
									<Button
										borderRadius={25}
										width={'md'}
										height={50}
										fontSize={18}
										border='2px'
										// fontWeight='black'
										bg={'white'}
										_hover={{ bg: 'gray.50' }}
										onClick={signInWithGoogle}
									>
									<Flex mr='8px' >
									<FcGoogle size={25} /> </Flex>
											Continue with Google
									</Button>
								</Flex>
							</Flex>
							<Flex mx='60px' mt='16px'>
							<Text >
									By signing up, you are agreeing to our <br/>
									<Link href="/tnc" passHref>
										<Text display={'inline'} textColor={'#D7354A'} cursor={'pointer'}> Terms and Conditions </Text>
									</Link>
									and 
									<Link href="/pp" passHref>
										<Text display={'inline'} textColor={'#D7354A'} cursor={'pointer'}> Privacy Policy </Text>
									</Link>
								</Text>
								</Flex>
						</Flex>
					</Flex>
				</Stack>
			</Flex>
		</Container>
	);
}
