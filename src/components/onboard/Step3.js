import {
	Input,
	Heading,
	Box,
	Stack,
	Container,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Progress,
	Button,
} from '@chakra-ui/react';
import Header from './Header';
import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from 'lib/UserDataProvider';
import Image from 'next/image'
import '@fontsource/poppins';
import axios from "axios";
import { UploadImageToS3WithNativeSdk } from "lib/aws";

const Step3 = (props) => {
	const [userDataContext, user] = useContext(UserContext);

  const [image, setImage] = useState({ preview: "", raw: "" });
  const [imageName, setImageName] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
	// const [photo, setPhoto]=useState(null);

	useEffect(()=>{
		console.log(image);
		if(image.preview!==''){
			setImageSelected(true);
		}
	},[image])
	// console.log(userDataContext.userData);
	// console.log(userDataContext.userSignInInfo);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
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
    formData.append("image", image.raw);
    UploadImageToS3WithNativeSdk(image.raw, imageName);
  };

	const next = (e) => {
		e.preventDefault();
		// console.log(image.preview+image.raw+"jj"+imageName+"jj"+imageSelected);
		if (userDataContext.userData.name === '') {
			userDataContext.setName(userDataContext.userSignInInfo.user.displayName);
			userDataContext.setMail(userDataContext.userSignInInfo.user.email);
		}
		props.nextStep();
	};

	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	return (
		<>
			<Container
				fontFamily={'Poppins'}
				maxW={'container.md'}
				p={0}
				align='center'
			>
				<Header value={75} />
				<Flex display={{ md: 'flex' }}>
					<Stack
						align={{ base: 'center', md: 'stretch' }}
						textAlign={{ base: 'left', md: 'left' }}
						margin={6}
					>
						<FormControl>
						<Heading size={'lg'} 
								textAlign={{base:'center', md:'left'}}>Add a profile photo</Heading>
								<FormLabel
									size={'md'}
									margin='8px'
									marginLeft='0px'
									paddingBottom='1rem'
									textAlign={{base:'center', md:'left'}}
								>
									Your photo appears on your profile and in places where people might interact with you.
								</FormLabel>
							<Flex width={'lg'} height='100px' bg='grey.100' marginBottom='20px'>
              	<Button as="Input" type='file' width={{base:'md',md:'lg'}} height='100px' fontSize={15} text='Click to upload' onChange={handleChange}></Button>
							</Flex>
							{/* <Input type='file' bg='white' onChange={handleChange}/> */}
							<Flex style={{ display: imageSelected ? 'block' : 'none' }} marginLeft='2px' marginBottom='10px'>
								<img src={image.preview} width="240" height="240" alt="profile picture" />
							</Flex>

							{/* <Button
								bg={'#D7354A'}
								_hover={{ bg: '#C23043' }}
								borderRadius={10}
								color='white'
								width={250}
								height={50}
								fontSize={18}
								marginTop='8px'
								marginBottom='8px'
								type='submit'
							>
								Upload
							</Button> */}
							<Flex justifyContent={'space-between'}>
							<Button
								bg={'#D7354A'}
								_hover={{ bg: '#C23043' }}
								borderRadius={10}
								fontSize={'lg'}
								color='white'
								width={120}
								height={50}
								onClick={back}
							>
								Back
							</Button>
							<Button
								bg={'#D7354A'}
								_hover={{ bg: '#C23043' }}
								borderRadius={10}
								color='white'
								fontSize={'lg'}
								width={120}
								height={50}
								mr={{base:'0', md:'190'}}
								onClick={next}
							>
								Next
							</Button>
							</Flex>
						</FormControl>
					</Stack>
				</Flex>
			</Container>
		</>
	);
};
export default Step3;
