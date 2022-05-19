import { firebaseAdmin } from "lib/firebaseadmin";
import Head from "next/head";
import { useRouter } from 'next/router';
import nookies from "nookies";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setName, setUsername, setMail, setPhone, setAbout, setProfileImage, setAffiliateCodes } from "store/actions/authActions";
import { SignInOptions } from '../src/components/auth/SignInOptions';
export default function Auth(props) {
	const router = useRouter()
	const [ show, setShow ] = useState(true);
	const dispatch = useDispatch();
	const authCtx= useSelector(state => state.auth);
	
	useEffect(()=>{
		dispatch(setName("john"));
		dispatch(setUsername("user"));
		dispatch(setMail("akljsdf@gmail.com"));
		dispatch(setPhone("+9173"));
		dispatch(setAbout("asdfjk23"));
		dispatch(setProfileImage("asdfhj"));
		dispatch(setAffiliateCodes([1,2,3]));
	},[])
	useEffect(()=>{
		console.log('auth',authCtx);
	},[authCtx])
	
	// console.log(userDataContext);
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
			<Head>
        <title>Sign in to CNDD!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
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
			// console.log(res);
		}).catch((err)=>{
			// console.log(err);
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
