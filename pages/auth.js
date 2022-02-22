import { Button, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'lib/UserDataProvider';
import { SignInOptions } from '../src/components/auth/SignInOptions';
import { SignOutButton } from '../src/components/auth/SignOutButton';
import { useRouter } from 'next/router'

export default function Auth(props) {
	const router = useRouter()
	const [ userDataContext, user ] = useContext(UserContext);
	const [ show, setShow ] = useState(true);
	
	useEffect(()=>{
		// if(ctx.userSignInInfo.user && !ctx.userSignInInfo.username){
		// 	router.push('/onboard');
		// }
		console.log(user);
		console.log(userDataContext);
		if(userDataContext.userSignInInfo.username){
			router.push('/dashboard');
		}
	})
	return (
		<div>
			{userDataContext.userSignInInfo.user ? (
				<SignOutButton />
			) : (
				<>
				<SignInOptions />
				</>
			)}
			{/* {ctx.userSignInInfo.user ? !ctx.userSignInInfo.username ?  : <SignOutButton /> : <SignInOptions />} */}

		</div>
	);
}
