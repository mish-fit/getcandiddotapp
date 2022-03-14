import { nonauthapi } from 'lib/api';
import { firebaseAdmin } from 'lib/firebaseadmin';
import { UserContext } from 'lib/UserDataProvider';
import Head from "next/head";
import { useRouter } from 'next/router';
import nookies from "nookies";
import { useContext, useState } from 'react';
import Step1 from '../src/components/onboard/Step1';
import Step2 from '../src/components/onboard/Step2';
import Step3 from '../src/components/onboard/Step3';

export default function Onboard(props) {

	const router = useRouter()
	const [ userDataContext, user ] = useContext(UserContext);
	const [step, setStep] = useState(1);
	// auth.signOut();
	// useEffect(()=>{
	// 	console.log('userdata',userDataContext.userSignInInfo.user.uid );
	// 	axios
  //     .get(`${nonauthapi}user`, { params: { u_id: userDataContext.userSignInInfo.user.uid } }, { timeout: 5000 })
  //     .then((res) => {
	// 			if(res.data[0].u_name){
	// 				router.push('/dashboard');
	// 			}
	// 		})
  //     .catch((error) => {
  //       console.log(error);
  //     });
	// })

	const nextStep = () => setStep(step + 1);
	// const prevStep = () => setStep(step - 1);
	
	const switchStep = () => {
		switch (step) {
			case 1:
				return <Step1 nextStep={nextStep} />
			case 2:
				return <Step2 nextStep={nextStep} />
			case 3:
				return <Step3 nextStep={nextStep} />;
			// case 4:
			// 	return <Step4 />;
			default:
				return null;
		}
	};

	return <>
	
	<Head>
        <title>Onboard | CNDD</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
	{switchStep()}
	</>;
}

export async function getServerSideProps(context) {

	const cookie = nookies.get(context).token;
	// console.log('c',cookie)
	let uid = ''
	if(cookie){
		const token = await firebaseAdmin.auth().verifyIdToken(cookie)
		.then((res)=>{
			uid = res.uid;
			// console.log('res', res)
		}).catch((err)=>{
			// console.log(err)
		});
		// console.log('token', token)
		// console.log('onboard', uid)
		if(uid!==''){
			const res = await fetch(`${nonauthapi}user?u_id=${uid}`)
			const data = await res.json()
			// console.log('data',data)
			if (data.length!==0 && data[0].u_uuid!=='') {
				// console.log(data)
				return {
					redirect: {
						destination: '/dashboard',
						permanent: false,
					},
				}
			}
		}
	}
	if(!cookie){
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		}
	}
	return{
		props: {},
	}
}
