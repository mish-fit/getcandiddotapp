import { Button, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../src/lib/UserDataProvider';
import { SignInOptions } from '../src/components/auth/SignInOptions';
import { SignOutButton } from '../src/components/auth/SignOutButton';
import { useRouter } from 'next/router'

export default function Auth(props) {
	const router = useRouter()

	useEffect(()=>{
		// if(ctx.userSignInInfo.user && !ctx.userSignInInfo.username){
		// 	router.push('/onboard');
		// }
		if(ctx.userSignInInfo.username){
			router.push('/dashboard');
		}
	})
	const ctx = useContext(UserContext);
	const [ show, setShow ] = useState(true);
	// console.log("auth", ctx.userData.username);
	return (
		<div>
			{ctx.userSignInInfo.user ? (
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
