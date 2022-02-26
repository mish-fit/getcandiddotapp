import { Button, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { SignInOptions } from '../src/components/auth/SignInOptions';
import { UserContext } from 'lib/UserDataProvider';
import { useRouter } from 'next/router'
import { auth } from 'lib/firebase';

export default function Auth(props) {
	const router = useRouter()
	const [ userDataContext, user ] = useContext(UserContext);
	const [ show, setShow ] = useState(true);
	// auth.signOut();
	useEffect(()=>{
		if(userDataContext.userSignInInfo.user && !userDataContext.userData.username){
			router.push('/onboard');
		}
		console.log(user);
		console.log(userDataContext);
	})
	return (
		<div>
				<SignInOptions />
			{/* {ctx.userSignInInfo.user ? !ctx.userSignInInfo.username ?  : <SignOutButton /> : <SignInOptions />} */}

		</div>
	);
}
