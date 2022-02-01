import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBL9L1-5vFc80lqmq-BYr9FeQGdb2wK30s',
	authDomain: 'next-fb-a40b1.firebaseapp.com',
	projectId: 'next-fb-a40b1',
	storageBucket: 'next-fb-a40b1.appspot.com',
	messagingSenderId: '257746265203',
	appId: '1:257746265203:web:9044c10ded32f6bd1b7606',
	measurementId: 'G-HPKDN95PE9',
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
	const usersRef = firestore.collection('users');
	const query = usersRef.where('username', '==', username).limit(1);
	const userDoc = (await query.get()).docs[0];
	return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
	const data = doc.data();
	return {
		...data,
		// Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
		createdAt: data?.createdAt.toMillis() || 0,
		updatedAt: data?.updatedAt.toMillis() || 0,
	};
}
