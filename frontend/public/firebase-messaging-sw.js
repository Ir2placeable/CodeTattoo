importScripts('https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js');

const config = {
    apiKey: "AIzaSyCezbubk5kfKa5OKsDAsWGMMqkzlAfFv9Y",
    authDomain: "codetattoo-39f94.firebaseapp.com",
    projectId: "codetattoo-39f94",
    storageBucket: "codetattoo-39f94.appspot.com",
    messagingSenderId: "698131441461",
    appId: "1:698131441461:web:6a76e1f7b44c215e2dce7c",
    measurementId: "G-4E418REKD8"
}

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    console.log(payload)
    console.log(payload.data.topic)
    
    // Customize notification here
    const notificationTitle = 'CodeTattoo';

    const notificationOptions = {
        body: payload.data.topic,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
