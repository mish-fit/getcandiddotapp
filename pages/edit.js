import {
	Input,
	Heading,
	Text,
	Button,
	Flex,
	Image,
	Textarea,
	FormLabel,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { auth, firestore } from 'lib/firebase';
import { UserContext } from 'lib/UserDataProvider';
import { Layout } from 'components/onboard/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UploadImageToS3WithNativeSdk } from 'lib/aws';
import { authapi, nonauthapi, s3url } from 'lib/api';
import { IoCloseCircle } from 'react-icons/io5';
import { firebaseAdmin } from 'lib/firebaseadmin';
import nookies from 'nookies';
import Head from 'next/head';
const EditProfile = ({ u_data }) => {
	const [state, setState] = useState({
		name: '',
		about: '',
	});
	const router = useRouter();
	const toast = useToast();
	const [userDataContext, user] = useContext(UserContext);
	const [image, setImage] = useState({ preview: '', raw: '' });
	const [imageSelected, setImageSelected] = useState(false);
	let hiddenInput = null;

	useEffect((e) => {
		if (u_data[0]) {
			setState({
				...state,
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
		console.log(u_update);

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
				title: 'Profile Updated',
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
						<Flex sx={style.leftContainer}>
							<Flex sx={style.imageContainer}>
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
					</Flex>
				</form>
			</Flex>
		</Layout>
	);
};

const style = {
	imageContainer: {
		width: '100%',
		height: '100%',
		borderRadius: '100%',
		borderColor: '#C23043',
		_hover: { bg: 'gray.50' },
		borderWidth: 1,
		position: 'relative',
		cursor: 'pointer',
	},
	leftContainer: {
		margin: '20px',
		justifyContent: 'center',
		alignItems: 'center',
		width: '250px',
		height: '250px',
		mx: '18%',
	},
};

export default EditProfile;

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