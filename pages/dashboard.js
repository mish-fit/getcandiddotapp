import { Button } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../src/lib/UserDataProvider";
import { firebaseConfig1, firestore } from "lib/firebase";

export default function Onboard(props) {
  const ctx = useContext(UserContext);

  React.useEffect(() => {
    console.log("firestore", firestore);
    console.log("env", firebaseConfig1);
  }, []);

  return (
    <div>
      <p>hi</p>
    </div>
  );
}
