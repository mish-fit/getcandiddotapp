import { Button, Link } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserDataProvider';
import { SignInGoogleButton } from '../src/components/auth/SignInGoogleButton';
import { SignInPhoneButton } from '../src/components/auth/SignInPhoneButton';
import { SignOutButton } from '../src/components/auth/SignOutButton';
// import { Onboard } from '../src/components/auth/Onboard';
import { useRouter } from 'next/router'

export default function Auth(props) {
	const router = useRouter()

	const ctx = useContext(UserContext);
	const [ otherways, setOtherways ] = useState(true);
	// console.log("xo", ctx.userData.username);

	// useEffect((router, user, username) => {
	// 	if(user && !username){
	// 		router.push('/onboard');
	// 	}
	// 	else if(user && username) {
	// 		router.push('/admin')
	// 	}
	//   },[user, username]);
	console.log(ctx.userSignInInfo.username);
	return (
		<div>
			{ctx.userSignInInfo.username ? (
				<SignOutButton />
			) : (
				<>
					{otherways ? <SignInPhoneButton /> : <SignInGoogleButton />}
					<Button
						onClick={() => {
							setOtherways(!otherways);
						}}
					>
						See other ways to Sign In
					</Button>
				</>
			)}
		</div>
	);
}
