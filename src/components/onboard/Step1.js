import { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import { firestore } from '../../../lib/firebase';
import { UserContext } from '../../../lib/UserDataProvider';
import debounce from 'lodash.debounce';

import { Box, Input, Heading, Text, Button, FormControl, FormLabel } from '@chakra-ui/react';

const Step1 = (props) => {  

  const ctx = useContext(UserContext);
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	// const onSubmit = async (e) => {
  //   e.preventDefault();
  //   // ctx.dispatch({type:'USERNAME',payload:formValue})
  //   ctx.setUsername('apple')
  //   console.log(ctx.userData.username);
    
		// const userDoc = firestore.doc(`users/${user.uid}`);
		// const usernameDoc = firestore.doc(`usernames/${formValue}`);

		// const batch = firestore.batch();
		// batch.set(userDoc, {
		// 	username: formValue,
		// 	photoURL: user.photoURL,
		// 	displayName: user.displayName,
		// });
		// batch.set(usernameDoc, { uid: user.uid });
    
		// await batch.commit();
	// };

  const onSubmit = async(e)=>{
    e.preventDefault()
    ctx.setUsername(formValue);
	// console.log(ctx.userSignInInfo.user.uid);
	const userDoc = firestore.doc(`users/${ctx.userSignInInfo.user.uid}`);
	const usernameDoc = firestore.doc(`usernames/${formValue}`);

	const batch = firestore.batch();
	batch.set(userDoc, {
		username: formValue,
		photoURL: ctx.userSignInInfo.user.photoURL,
		displayName: ctx.userSignInInfo.user.displayName,
	});
	batch.set(usernameDoc, { uid: ctx.userSignInInfo.user.uid });
	await batch.commit();
	props.nextStep();
  }
	const onChange = (e) => {
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		if (val.length < 3) {
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

	// useEffect(() => {
	// 	checkUsername(formValue);
	// }, [checkUsername, formValue]);

	// const checkUsername = useMemo(
    //     ()=>
	// 	debounce(async (username) => {
	// 		if (username.length >= 3) {
	// 			const ref = firestore.doc(`usernames/${username}`);
	// 			const { exists } = await ref.get();
	// 			console.log('Firestore read executed!');
	// 			setIsValid(!exists);
	// 			setLoading(false);
	// 		}
	// 	}, 500),
	// 	[]
	// );

	// console.log(user,"step1",username);
    const next = (e) => {
        e.preventDefault();
        props.nextStep();
      };
    
    return(
        <>
        <Box>
        <Heading>Choose Username</Heading>
				<form onSubmit={onSubmit}>
					<Input
						name='username'
						value={formValue}
						onChange={onChange}
						width={200}
					/>
					<UsernameMessage
						username={formValue}
						isValid={isValid}
						loading={loading}
					/>
					<Button type='submit' disabled={isValid}>
						Choose & Next
					</Button>
        </form>
        </Box>
        <br/>
        {/* <Button onClick={next}>Next</Button> */}
        </>
    )
}
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