const firebase = require('firebase')

firebase.initializeApp({
	databaseURL: 'https://test-eb50e.firebaseio.com/'
})
const dbRef = firebase.database().ref('people/')

dbRef.on('value', data => console.log(data.val()))