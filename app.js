firebase.initializeApp({
	databaseURL: ''
})

const db = firebase.database()
const ref = db.ref('students')
const insert = document.getElementById('add')
const update = document.getElementById('change')
let students
let keys
let id

insert.addEventListener('submit', (e) => { 	
  	e.preventDefault()  	
  	create.add( ref, input() )
})

update.addEventListener('submit', (e) => {  
    e.preventDefault()       
    addEdited( input() )
})

function input() {
	name = document.getElementById('name').value
	age = document.getElementById("age").value
  city = document.getElementById("city").value   
}

function add() {
  let doc = {
		name,
		age,
		city    		
	}      
  db.ref('students').push().set(doc)   
  document.getElementById("add").reset()    
  getDB()             
  return false
}

function getDB(){ 
	ref.once('value', data => {		
    let html
    students = data.val()
    if(students === null){    
      html = `<p>No records</p>`
      document.getElementById('history').innerHTML = html
    } else {       
      keys = Object.keys(students)    	
      show()
    }
  }).catch(function (err) {
      console.log(err)
  })  
}   

function show(){
  html = '<div class="display"><table><tr><th>Name</th><th>Age</th><th>City</th><th>Delete</th><th>Edit</th></tr>'  
  for(let i=0; i<keys.length; i++) {
    let k = keys[i]         
    html += '<tr><td>' + students[k].name + '</td><td>' + students[k].age +'</td><td>' + students[k].city 
        + '</td><td><button class="delete" id="' + k 
        + '"><span>Remove</span></button></td><td><button class="edit" id="' 
        + k + '"><span>Edit</span></button></td></tr>'
  }
  html += '</tr></table></div>'
  document.getElementById('history').innerHTML = html	 
  let buttons = document.getElementsByClassName('delete')
  for (let i=0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', remove) 
  }
  let edits = document.getElementsByClassName('edit')
  for (let i=0; i < edits.length; i++) {
      edits[i].addEventListener('click', edit) 
  }
}

function addEdited(){  
  let doc = {
    name,
    age,
    city        
  }      
  ref.child(id).update(doc)   
  document.getElementById("add").reset()    
  getDB()             
  document.getElementById('insert').classList.toggle('displayNone')
  document.getElementById('update').classList.toggle('displayNone')             
  return false
}

function remove(){
  let num = this.getAttribute('id')
  ref.child(num).remove()
  getDB() 
  return false
}

function edit(){
  id = this.getAttribute('id')
  document.getElementById('name').value = students[id].name    
  document.getElementById('age').value = students[id].age 
  document.getElementById('city').value = students[id].city     
  document.getElementById('insert').classList.toggle('displayNone')
  document.getElementById('update').classList.toggle('displayNone') 
  return false
}

getDB()