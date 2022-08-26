// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCezbubk5kfKa5OKsDAsWGMMqkzlAfFv9Y",
    authDomain: "codetattoo-39f94.firebaseapp.com",
    projectId: "codetattoo-39f94",
    storageBucket: "codetattoo-39f94.appspot.com",
    messagingSenderId: "698131441461",
    appId: "1:698131441461:web:6a76e1f7b44c215e2dce7c",
    measurementId: "G-4E418REKD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = getMessaging(app);

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );

    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: payload,
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});