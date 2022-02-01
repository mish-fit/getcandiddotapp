import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { SignInGoogleButton } from '../src/components/auth/SignInGoogleButton';
import { SignInPhoneButton } from '../src/components/auth/SignInPhoneButton';
import { SignOutButton } from '../src/components/auth/SignOutButton';
import { UsernameForm } from '../src/components/auth/UsernameForm';

export default function Auth(props) {
	const { user, username } = useContext(UserContext);
	// console.log(user, "xo", username);

	return (
		<div>
			{user ? (
				!username ? (
					<UsernameForm />
				) : (
					<SignOutButton />
				)
			) : (
				<>
					<SignInPhoneButton />
					<SignInGoogleButton />
				</>
			)}
		</div>
	);
}
