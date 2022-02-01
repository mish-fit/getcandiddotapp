import { auth } from '../../../lib/firebase';
import { Button } from '@chakra-ui/react';

// Sign out button
export function SignOutButton() {
	return <Button onClick={() => auth.signOut()}>Sign Out</Button>;
}
