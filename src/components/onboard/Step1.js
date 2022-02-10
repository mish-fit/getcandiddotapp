import {
	useEffect,
	useState,
	useCallback,
	useContext,
	useMemo,
	useRef,
} from 'react';
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
	FormControl,
	FormLabel,
} from '@chakra-ui/react';

const Step1 = (props) => {
	const ctx = useContext(UserContext);
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const next = async (e) => {
		e.preventDefault();
		ctx.setUsername(formValue);

		// console.log(ctx.userData);
		const userDoc = firestore.doc(`users/${ctx.userSignInInfo.user.uid}`);
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		const batch = firestore.batch();
		// console.log(ctx.userData.username);
		console.log(ctx.userSignInInfo.user.email);
		// console.log(ctx.userSignInInfo);
		console.log(ctx.userSignInInfo.user.phoneNumber);

		// sending data to firebase when user logged in with phone
		if (ctx.userSignInInfo.user.email == null) {
			batch.set(userDoc, {
				username: formValue,
				phone: ctx.userSignInInfo.user.phoneNumber,
			});
			batch.set(usernameDoc, { uid: ctx.userSignInInfo.user.uid });
			await batch.commit();
		}
		// sending data to firebase when user logged in with mail
		else {
			batch.set(userDoc, {
				username: formValue,
				mail: ctx.userSignInInfo.user.email,
				photoURL: ctx.userSignInInfo.user.photoURL,
				displayName: ctx.userSignInInfo.user.displayName,
			});
			batch.set(usernameDoc, { uid: ctx.userSignInInfo.user.uid });
			await batch.commit();
		}

		if (ctx.userSignInInfo.user.email === null) {
			ctx.setPhone(ctx.userSignInInfo.user.phoneNumber);
		} else {
			ctx.setName(ctx.userSignInInfo.user.name);
			ctx.setMail(ctx.userSignInInfo.user.mail);
		}
		props.nextStep();
	};

	const onChange = (e) => {
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		if (val.length > 3) {
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

	useEffect(() => {
		// console.log('choose',username.current.value);
		checkUsername(formValue);
	}, [checkUsername, formValue]);

	var checkUsername = useMemo(
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

	return (
		<>
<Container maxW={'container.lg'} h={'100vh'} p={0} pt='10' align='center'>
	<Box
	p={10}
	display={{ md: "flex" }}
	maxWidth='26rem'
	borderWidth={1}
	margin={4}
>	<Stack
		align={{ base: "center", md: "stretch" }}
		textAlign={{ base: "center", md: "left" }}
		mt={{ base: 4, md: 0 }}
		ml={{ md: 6 }}
	>
			<Box>
				<Heading
				size={'lg'} >Choose Username</Heading>
				<form onSubmit={next}>
					<Input name='username' 
				marginTop='10px' 
				marginBottom='10px' onChange={onChange} width={200} />
					<UsernameMessage
						username={formValue}
						isValid={isValid}
						loading={loading}
					/>
					<Button
				borderRadius={50}
				color='white'
						bg={'#ff5151'}
						_hover={{ bg: '#D7354A' }}
						type='submit'
						disabled={!isValid}
					>
						Choose & Next
					</Button>
				</form>
			</Box>
			</Stack>
</Box></Container>
		</>
	);
};
function UsernameMessage({ username, isValid, loading }) {
	if (loading) {
		return <Text>Checking...</Text>;
	} else if (isValid) {
		return <Text className='text-success'>{username} is available!</Text>;
	} else if (username && !isValid) {
		return <Text className='text-danger'>That username is taken!</Text>;
	} else {
		return <Text></Text>;
	}
}
export default Step1;
