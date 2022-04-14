import {
	Button,	Flex, FormLabel, Heading, Image, Input, Text, Textarea, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { Layout } from 'components/onboard/Layout';
import { authapi, nonauthapi, s3url } from 'lib/api';
import { UploadImageToS3WithNativeSdk } from 'lib/aws';
import { firebaseAdmin } from 'lib/firebaseadmin';
import { UserContext } from 'lib/UserDataProvider';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useContext, useEffect, useState, useMemo } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import editStyles from 'styles/edit';
import { firestore } from 'lib/firebase';
import debounce from 'lodash.debounce';
const EditProfile = ({ u_data }) => {
	// console.log(u_data);
	const [state, setState] = useState({
		u_id: '',
		username: '',
		name: '',
		about: '',
	});
	const router = useRouter();
	const toast = useToast();
	const [userDataContext, user] = useContext(UserContext);
	const [image, setImage] = useState({ preview: '', raw: '' });
	const [imageSelected, setImageSelected] = useState(false);

	// const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	let hiddenInput = null;
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
		checkUsername(state.username);
	}, [checkUsername, state.username]);

	useEffect((e) => {
		if (u_data[0]) {
			setState({
				...state,
				u_id: u_data[0].u_id,
				username: u_data[0].u_uuid,
				name: u_data[0].u_name,
				about: u_data[0].u_about,
			});
			setImage({
				preview: u_data[0].u_profile_image,
			});
		}
		if (image.preview !== '') {
			setImageSelected(true);
		}
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		// console.log(e.target.files[0]);
		if (e.target.files.length) {
			setImageSelected(true);
			setImage({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
			handleUpdate({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
		}
	};

	const handleUpdate = (image) => {
		// console.log(image);
		const formData = new FormData();
		formData.append('image', image.raw);
		UploadImageToS3WithNativeSdk(image.raw, u_data[0].u_id);
	};

	const onCancelImage = () => {
		setImageSelected(false);
		setImage({ preview: '', raw: '' });
	};

	const save = (e) => {
		e.preventDefault();

		let new_profile_image = '';
		if (imageSelected) {
			new_profile_image = s3url + u_data[0].u_id + '.png';
		}

		const u_update = {
			u_id: u_data[0].u_id,
			u_name: u_data[0].name === state.name ? u_data[0].u_name : state.name,
			u_about: u_data[0].u_about === state.about ? u_data[0].u_about : state.about,
			u_profile_image: u_data[0].u_profile_image === image.preview ? u_data[0].u_profile_image : new_profile_image,
		};
		// console.log(u_update);

		// API Call: Update User Data
		axios(
			{
				method: 'post',
				url: `${authapi}user/update`,
				data: u_update,
				options: origin,
			},
			{ timeout: 5000 }
		).then((res) => {
			console.log('Success', res.data);
			toast({
				title: 'Profile Updated Successfully',
				description: '',
				status: 'success',
				duration: 1000,
				isClosable: true,
			});
		});
		router.push('/dashboard');
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
		router.push('/dashboard');
	};


	const onChangeUsername = (e) => {
		// Force form value typed in form to match correct format
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		// Only set form value if length is < 3 OR it passes regex
		if (val.length < 3) {
			const newState = {...state};
			newState.username=val;
			setState(newState);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			const newState1 = {...state};
			newState1.username=val;
			setState(newState1);
			setLoading(true);
			setIsValid(false);
		}
	};


	const updateUsername = (e) => {
		e.preventDefault();
		console.log(state.username);
	//updating usernames collection
	firestore.collection("usernames").doc(u_data[0].u_uuid)
  .get()
  .then(function(doc) {
    if (doc.exists) {
			let data = doc.data();
			firestore.collection("usernames").doc(state.username).set(data)
			.then(function(){
				firestore.collection("usernames").doc(u_data[0].u_uuid).delete();
			});
    }
		else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error while updating usernames collection:", error);
  });

	//updating users collection
	firestore.collection("users").doc(u_data[0].u_id).update({
		username:state.username
	})
	// .then(function(){
	// 	toast({
	// 		title: 'Username Updated Successfully',
	// 		description: '',
	// 		status: 'success',
	// 		duration: 1000,
	// 		isClosable: true,
	// 	});
	// })
	.catch(function(error) {
    console.log("Error while updating users collection:", error);
  });

	const u_username = {
		u_id: u_data[0].u_id,
		u_uuid: state.username,
	};
	console.log(u_username);

	// API Call: Update User Data
	axios(
		{
			method: 'post',
			url: `${authapi}user/update`,
			data: u_username,
			options: origin,
		},
		{ timeout: 5000 }
	).then((res) => {
		console.log('Success', res.data);
		toast({
			title: 'Username Updated Successfully',
			description: '',
			status: 'success',
			duration: 1000,
			isClosable: true,
		});
	});

}

	return (
		<Layout>
			<Head>
				<title>Edit Profile</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<Flex w='100%'>
				<form onSubmit={save}>
					<Flex flexDirection={'column'} margin={6}>
						<Heading size={'lg'} textAlign={{ base: 'center', md: 'left' }}>
							Edit Profile
						</Heading>
						<FormLabel
							size={'md'}
							margin='8px'
							marginLeft='0px'
							paddingBottom='1rem'
							textAlign={{ base: 'center', md: 'left' }}
						>
							Edit your details below and click on save.
						</FormLabel>
						<FormLabel fontSize={'lg'}>Full Name</FormLabel>
						<Input
							name='name'
							bg='white'
							defaultValue={u_data[0].u_name}
							focusBorderColor='#E78692'
							_hover={{ borderColor: '#E78592' }}
							borderColor='#E78592'
							height={50}
							width={'md'}
							fontSize={'lg'}
							marginBottom='24px'
							type='text'
							onChange={onChangeName}
							placeholder='Your name'
						/>
						<FormLabel fontSize={'lg'}>About</FormLabel>
						<Textarea
							name='about'
							type='text'
							bg='white'
							focusBorderColor='#E78692'
							_hover={{ borderColor: '#E78592' }}
							borderColor='#E78592'
							fontSize={'lg'}
							width={'md'}
							height={100}
							marginBottom='24px'
							defaultValue={u_data[0].u_about}
							onChange={onChangeAbout}
							placeholder='Tell us about you'
						/>
						<FormLabel fontSize={'lg'}>Profile Image</FormLabel>
						<Flex sx={editStyles.leftContainer}>
							<Flex sx={editStyles.imageContainer}>
								{image.preview ? (
									<Flex
										sx={{
											position: 'relative',
											flex: 1,
										}}
									>
										<Flex onClick={() => hiddenInput.click()} sx={{ flex: 1 }}>
											<Image
												src={image.preview}
												alt='dummy'
												sx={{
													width: '100%',
													height: '100%',
													borderRadius: '100%',
												}}
											/>
										</Flex>
										<Flex
											sx={{
												position: 'absolute',
												top: '-5%',
												right: '-5%',
												zIndex: 101,
												cursor: 'pointer',
											}}
											onClick={onCancelImage}
										>
											<IoCloseCircle size={20} color='gray' />
										</Flex>
									</Flex>
								) : (
									<Flex
										sx={{
											justifyContent: 'center',
											alignItems: 'center',
											textAlign: 'center',
											flex: 1,
										}}
										onClick={() => hiddenInput.click()}
									>
										<Text sx={{ fontSize: '15px' }}>
											Upload Profile Picture
										</Text>
									</Flex>
								)}
								<input
									accept="image/png, image/jpeg, image/jpg"
									type='file'
									hidden
									onChange={handleChange}
									ref={(el) => (hiddenInput = el)}
								/>
							</Flex>
						</Flex>

						<Flex justifyContent={'space-between'}>
							<Button fontSize={'lg'} width={120} height={50} onClick={back}>
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
								type='submit'
							>
								Save
							</Button>
						</Flex>
						<FormLabel fontWeight ={"bold"} fontSize={'lg'} mt={"32px"}>Change Your Username Below</FormLabel>
						<Input
							name='username'
							bg='white'
							value={state.username}
							// defaultValue={u_data[0].u_uuid}
							focusBorderColor='#E78692'
							_hover={{ borderColor: '#E78592' }}
							borderColor='#E78592'
							height={50}
							width={'md'}
							fontSize={'lg'}
							mt='4px'
							mb='2px'
							onChange={onChangeUsername}
						/>

						<UsernameMessage
								username={state.username}
								isValid={isValid}
								loading={loading}
							/>
						<Button onClick={updateUsername} disabled={!isValid} mt='8px' h='50px'>Update Username</Button>
					</Flex>
				</form>
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
					That username is taken. Try another username!
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


export async function getServerSideProps(context) {
	const cookie = nookies.get(context).token;
	// console.log('c',cookie)
	let uid = '';
	let u_data = '';
	if (cookie) {
		const token = await firebaseAdmin
			.auth()
			.verifyIdToken(cookie)
			.then((res) => {
				uid = res.uid;
				// console.log('res', res)
			})
			.catch((err) => {
				// console.log(err)
			});
		if (uid !== '') {
			const res = await fetch(`${nonauthapi}user?u_id=${uid}`);
			const data = await res.json();
			u_data = data;
		}
	}
	if (!cookie) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}
	return {
		props: { u_data },
	};
}

export default EditProfile;
