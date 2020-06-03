export const environment = {
  production: true,
  currentLanguajes:['es','it'],
  defaultLanguajes:"es"
};

export const SERVER_URL = 'https://api.hablacon.me';

export const firebaseConfig = {
  apiKey: "AIzaSyASAZhZW-4NZSrV99xw9SkEOKNj6ntuQo8",
  authDomain: "hablaconme.firebaseapp.com",
  databaseURL: "https://hablaconme.firebaseio.com",
  projectId: "hablaconme",
  storageBucket: "hablaconme.appspot.com",
  messagingSenderId: "695142026098",
  appId: "1:695142026098:web:fbc84f07b1ea1b9ecc6beb",
  measurementId: "G-3TFRH31DEH"
};

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:8100/primera-sesion',
  // This must be true.
  handleCodeInApp: true,
};
