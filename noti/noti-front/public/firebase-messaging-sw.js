importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// front Config
// 해당 정보는 FCM으로 부터 발급
// FCM 공식 문서 참조
const config = {
    apiKey: "AIzaSyCezbubk5kfKa5OKsDAsWGMMqkzlAfFv9Y",
    authDomain: "codetattoo-39f94.firebaseapp.com",
    projectId: "codetattoo-39f94",
    storageBucket: "codetattoo-39f94.appspot.com",
    messagingSenderId: "698131441461",
    appId: "1:698131441461:web:6a76e1f7b44c215e2dce7c",
    measurementId: "G-4E418REKD8"
}

// 해당 웹 서버가 FCM기능을 이용할 수 있도록 설정
firebase.initializeApp(config);
const messaging = firebase.messaging();

// 백그라운드에서 실행 가능하도록 설정
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});