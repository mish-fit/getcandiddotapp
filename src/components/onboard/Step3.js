import {
	Input,
	Heading,
	Box,
	Stack,
	Text,
	Container,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Progress,
	Image,
	Button,
} from '@chakra-ui/react';
import Header from './Header';
import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from 'lib/UserDataProvider';
import '@fontsource/poppins';
import axios from "axios";
import { UploadImageToS3WithNativeSdk } from "lib/aws";
import { authapi, s3url } from "lib/api";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
const Step3 = (props) => {
	const [userDataContext, user] = useContext(UserContext);
  const [image, setImage] = useState({ preview: "", raw: "" });
  // const [imageName, setImageName] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
	// const [photo, setPhoto]=useState(null);
	let hiddenInput = null;
	useEffect(()=>{

		console.log('Step3', userDataContext.userData);
		// console.log(userDataContext.userSignInInfo.user.uid);
		if(image.preview!==''){
			setImageSelected(true);
		}
	},[image, userDataContext.userData])
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
    UploadImageToS3WithNativeSdk(image.raw, userDataContext.userSignInInfo.user.uid);
  };

	const onCancelImage = () => {
    setImageSelected(false);
    setImage({ preview: "", raw: "" });
  };

	const next = (e) => {
		e.preventDefault();
		// console.log(image.preview+image.raw+"jj"+imageName+"jj"+imageSelected);
		userDataContext.setProfileImage(s3url+userDataContext.userData.username+".png");
		if (userDataContext.userData.name === '') {
			userDataContext.setName(userDataContext.userSignInInfo.user.displayName);
			userDataContext.setMail(userDataContext.userSignInInfo.user.email);
		}
		props.nextStep();
	};

	const back = (e) => {
		e.preventDefault();
		props.nextStep();
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
							{/* <Flex width={'lg'} height='100px' bg='grey.100' marginBottom='20px'>
              	<Button as="Input" type='file' width={{base:'md',md:'lg'}} height='100px' fontSize={15} text='Click to upload' onChange={handleChange}></Button>
							</Flex> */}

							<Flex sx={style.leftContainer}>
							<Flex 
							sx={style.imageContainer}>
                    {image.preview ? (
                      <Flex
                        sx={{
                          position: "relative",
                          flex: 1,
                        }}
                      >
                        <Flex
                          onClick={() => hiddenInput.click()}
                          sx={{ flex: 1 }}
                        >
                          <Image
                            src={image.preview}
                            alt="dummy"
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "100%",
                            }}
                          />
                        </Flex>
                        <Flex
                          sx={{
                            position: "absolute",
                            top: "-5%",
                            right: "-5%",
                            zIndex: 101,
                            cursor: "pointer",
                          }}
                          onClick={onCancelImage}
                        >
                          <IoCloseCircle size={20} color="gray" />
                        </Flex>
                      </Flex>
                    ) : (
                      <Flex
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          flex: 1,
                        }}
                        onClick={() => hiddenInput.click()}
                      >
                        <Text sx={{ fontSize: "15px" }}>Upload Profile Picture</Text>
                      </Flex>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={handleChange}
                      ref={(el) => (hiddenInput = el)}
                    />
                  </Flex>
							</Flex>
							{/* <Input type='file' bg='white' onChange={handleChange}/> */}
							{/* <Flex style={{ display: imageSelected ? 'block' : 'none' }} marginLeft='2px' marginBottom='10px'>
								<Image src={image.preview} width="240" height="240" alt="profile picture" />
							</Flex> */}

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
								// bg={'#D7354A'}
								// _hover={{ bg: '#C23043' }}
								// borderRadius={10}
								// color='white'
								fontSize={'lg'}
									width={120}
									height={50}
									onClick={back}
							>
								Skip
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

const style = {
  imageContainer: {
		width: "100%",
		height: "100%",
    borderRadius: "100%",
		borderColor: '#C23043',
		_hover:{bg:'gray.50'},
    borderWidth: 1,
    position: "relative",
    cursor: "pointer",
  },
	leftContainer: {
		margin:"20px",
		justifyContent: "center",
		alignItems: "center",
    width: "250px",
    height: "250px",
    mx: "18%",
  },
};



export default Step3;
