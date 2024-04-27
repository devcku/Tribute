import { initializeApp } from "firebase/app";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyCm61UfojvCKndekw1YwuAiGS3RqwgA5Ys",
	authDomain: "quizzer-1cdc7.firebaseapp.com",
	projectId: "quizzer-1cdc7",
	storageBucket: "quizzer-1cdc7.appspot.com",
	messagingSenderId: "356757176892",
	appId: "1:356757176892:web:4a305cb5362111e98c3939",
	measurementId: "G-PB68TZ2NPT",
};

initializeApp(firebaseConfig);

const db = getFirestore();
export const tributesRef = collection(db, "tributes");
export const tributesQuery = query(tributesRef, orderBy("createdAt", "asc"));
