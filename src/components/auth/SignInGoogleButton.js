import firebase from 'firebase';
import { auth, googleAuthProvider } from '../../../lib/firebase';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

// Sign in with Google button
export function SignInGoogleButton() {
	const router = useRouter();
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider).then((result) => {
			router.push('/onboard');
		});
	};

	return (
		<>
			<Button onClick={signInWithGoogle}>Sign in with Google</Button>
			<br/>
		</>
	);
}
