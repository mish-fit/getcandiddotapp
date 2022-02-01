import { useEffect, useState, useCallback, useContext } from 'react';
import { firestore } from '../../../lib/firebase';
import { UserContext } from '../../../lib/context';
import debounce from 'lodash.debounce';

import { Box, Input, Heading, Text, Button } from '@chakra-ui/react';

// Username form
export function UsernameForm() {
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user, username } = useContext(UserContext);
	const onSubmit = async (e) => {
		e.preventDefault();

		// Create refs for both documents
		const userDoc = firestore.doc(`users/${user.uid}`);
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		// Commit both docs together as a batch write.
		const batch = firestore.batch();
		batch.set(userDoc, {
			username: formValue,
			photoURL: user.photoURL,
			displayName: user.displayName,
		});
		batch.set(usernameDoc, { uid: user.uid });

		await batch.commit();
	};

	const onChange = (e) => {
		// Force form value typed in form to match correct format
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		// Only set form value if length is < 3 OR it passes regex
		if (val.length < 3) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	useEffect(() => {
		checkUsername(formValue);
	}, [checkUsername, formValue]);

	// Hit the database for username match after each debounced change
	// useCallback is required for debounce to work
	const checkUsername = useCallback(
		debounce(async (username) => {
			if (username.length >= 3) {
				const ref = firestore.doc(`usernames/${username}`);
				const { exists } = await ref.get();
				console.log('Firestore read executed!');
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[]
	);

	return (
		!username && (
			<Box>
				<Heading>Choose Username</Heading>
				<form onSubmit={onSubmit}>
					<Input
						name='username'
						placeholder='myname'
						value={formValue}
						onChange={onChange}
						width={200}
					/>
					<UsernameMessage
						username={formValue}
						isValid={isValid}
						loading={loading}
					/>
					<Button type='submit' disabled={!isValid}>
						Choose
					</Button>

					<Heading>Debug State</Heading>
					<Box>
						Username: {formValue}
						<br />
						Loading: {loading.toString()}
						<br />
						Username Valid: {isValid.toString()}
					</Box>
				</form>
			</Box>
		)
	);
}
function UsernameMessage({ username, isValid, loading }) {
	if (loading) {
		return <Text>Checking...</Text>;
	} else if (isValid) {
		return <Text className='text-success'>{username} is available!</Text>;
	} else if (username && !isValid) {
		return <Text className='text-danger'>That username is taken!</Text>;
	} else {
		return <Text></Text>;
	}
}
