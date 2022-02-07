import firebase from "firebase";
import { auth, googleAuthProvider } from "../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function AddLinks() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <>
      <Button onClick={addLinks}>Add a Link</Button>
      <br />
    </>
  );
}
