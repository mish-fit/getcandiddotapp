import { Button, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { SignInOptions } from '../src/components/auth/SignInOptions';
import { UserContext } from 'lib/UserDataProvider';
import { useRouter } from 'next/router'
import { auth } from 'lib/firebase';
import { firebaseAdmin } from "lib/firebaseadmin";
import nookies from "nookies";
export default function Auth(props) {
	const router = useRouter()
	const [ userDataContext, user ] = useContext(UserContext);
	const [ show, setShow ] = useState(true);
	// auth.signOut();
	// useEffect(()=>{
	// 	if(userDataContext.userSignInInfo.user && !userDataContext.userData.username){
	// 		router.push('/onboard');
	// 	}
	// 	console.log(user);
	// 	console.log(userDataContext);
	// })
	return (
		<div>
				<SignInOptions />
			{/* {ctx.userSignInInfo.user ? !ctx.userSignInInfo.username ?  : <SignOutButton /> : <SignInOptions />} */}

		</div>
	);
}


export async function getServerSideProps(context) {

	const cookie = await nookies.get(context).token;
	let uid = ''
	if(cookie){
		const token = await firebaseAdmin.auth().verifyIdToken(cookie)
		.then((res)=>{
			uid=res.uid;
			console.log(res);
		}).catch((err)=>{
			console.log(err);
		})
		// console.log(token.uid)
		if(uid!==''){
			// if(token.uid!==null || token.uid!==''){
				return {
					redirect: {
						destination: "/onboard", 
						permanent: false,
					},
				}
			// }
		}
	}
	if(!cookie){}
	return{
		props: {},
	}
}
