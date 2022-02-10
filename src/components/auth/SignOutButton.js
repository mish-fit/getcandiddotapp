import { auth } from '../../lib/firebase';
// import { Button } from '@chakra-ui/react';
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack
} from "@chakra-ui/react";
// Sign out button
export function SignOutButton() {
	return (
	<Button 
  borderRadius={50}
  color='white'
	bg={'#ff5151'}
	_hover={{ bg: '#D7354A'}}
				onClick={() => auth.signOut()}>Sign Out</Button>
	)
}
