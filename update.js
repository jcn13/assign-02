const firebase = require('firebase')

firebase.initializeApp({
	databaseURL: 'https://test-eb50e.firebaseio.com/'
})

const dbRef = firebase.database().ref('students')
const update = document.getElementById('change')

update.addEventListener('submit', (e) => {  
    e.preventDefault()       
    addEdited( input() )
})

