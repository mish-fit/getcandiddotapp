import firebase from 'firebase';
import { auth, googleAuthProvider } from '../../../lib/firebase';
import { Button } from '@chakra-ui/react';

// Sign in with Google button
export function SignInGoogleButton() {
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider).then((result) => {});
	};

	return (
		<>
			<Button onClick={signInWithGoogle}>Sign in with Google</Button>
		</>
	);
}
