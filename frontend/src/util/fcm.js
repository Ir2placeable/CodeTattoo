import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getCookie, setCookie } from "../config/cookie";
import { toast } from "react-toastify";
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

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
const messaging = getMessaging();

//FireBase 허가받았는지 체크
export const getFcmToken = async() => {
getToken(messaging, { vapidKey: 'BMMqiq4owTHw6_efpo8kgqV8Z3WSd-7G0aXT28qQSrxcauoS9-VgEBTmH3ovdazTjvkp8P4GsrhpUIWBDD7t2aA' })
    .then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        // console.log(currentToken.toString());
        console.log("Permission granted");
        if(!getCookie('fcm')){
            setCookie('fcm', currentToken.toString())
        }
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
})
.catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});
}

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    toast.success(payload.data.topic);
});



// getToken(messaging, { vapidKey: 'BMMqiq4owTHw6_efpo8kgqV8Z3WSd-7G0aXT28qQSrxcauoS9-VgEBTmH3ovdazTjvkp8P4GsrhpUIWBDD7t2aA' }).then((currentToken) => {
//     if (currentToken) {
//         // Send the token to your server and update the UI if necessary
//         // ...
//     } else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//         // ...
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
// });


// onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//     // ...
// });




// import firebase from "firebase";

// export async function getToken() {
//     if(firebase.messaging.isSupported() === false){
//         console.log("isSupported: ",  firebase.messaging.isSupported())
//         return null;
//     }

//     const messaging = firebase.messaging()
//     const token = await messaging.requestPermission()
//         .then(function() {
//             return messaging.getToken()
//         })
//         .then(function(token) {
//             messaging.onMessage(payload => {
//                 alert("알림: " + payload.notification.body)
//             })
//             return token;
//         })
//         .catch(function(err) {
//             console.debug('에러 : ', err);
//             return null;
//         })

//     console.log("token: ", token)
//     return token;
// }