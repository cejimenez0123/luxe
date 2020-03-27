let username = null

let signUpDiv = document.createElement("h2")
let currentUser = null
let logInDiv = document.createElement("h2")
function logSign(){
    
    main.appendChild(logInDiv)
    main.appendChild(signUpDiv)
    
signUpDiv.innerText = `Sign Up`
logInDiv.innerText = `Log In`
htmlLog()
htmlSign()
}

function htmlSign(){
    signUpDiv.innerText = `Sign Up`
    let div = document.createElement("div")
    div.ClassName = "signUp"
    let form = document.createElement("form")
    div.appendChild(form)
    form.setAttribute("method","post")
    form.innerHTML = ` 
                <label for="name">Name:</label>
                <input type="text" name="name">
                <Label for="username">Username:</label>
                <input type="text" name="username">
                <label for="password">Password:</label>
                <input type="password" name="password">
                <input type="submit" value="Sign Up">
                `
    signUpDiv.appendChild(div)
    form.addEventListener("submit",function(e){
        debugger
        nameInput = e.target.querySelectorAll('input')[0].value
        username = e.target.querySelectorAll('input')[1].value
        password = e.target.querySelectorAll('input')[2].value
        createUser()
    })

}


function htmlLog(){
   
    
    let div = document.createElement("div")
    div.className = "LogIn"
    
    let form = document.createElement("form")
    div.appendChild(form)
    form.setAttribute("method","post")
    form.innerHTML = ` 
                <Label for="username">Username:</label>
                <input type="text" name="username">
                <label for="password">Password:</label>
                <input type="password" name="password">
                <input type="submit" value="Log In">
                `
    logInDiv.appendChild(div) 
    form.addEventListener("submit",function(e){
        e.preventDefault()
        let username = e.target.querySelectorAll('input')[0].value
        let password = e.target.querySelectorAll('input')[1].value
        fetchSession(username,password)
    })
}
function fetchSession(username,password){
  
    config ={method: 'POST', 
    headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
       
        "username": username,
        "password":password  
    })

    }

  let bob = fetch("http://localhost:3000/sessions",config).then(res => res.json()).then(obj => {
        return renderUser(obj)}).catch(error =>{
            alert(error)
        })
        
}


function checkCurrentUser(){
    if(currentUser ){
        return `<p>Your trip is ready ${currentUser.name}`
    }else{
        return  `<label for="name">Name:</label>
        <input type="text" name="name">
        <br>
        <label for="username">Username:</label>
        <input name="username" type="text">
        <br>
        <label for="password">Password:</label>
        <input name=password" type="password">
        <br>`
    }
} 
let userObj = null
function createUser(){
   let  config = {method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    },
    body: JSON.stringify({
        "name": nameInput,
        "username": username,
        "password": password
    })
    };
   fetch(users,config).then(res => res.json()).then(obj =>{

    user = new User(obj.data.attributes.id,obj.data.attributes.name,obj.data.attributes.username,obj.data.attributes.password)
    postTrip(user) });
    
}
function renderUser(obj){
    joinBtn.remove()
    main.innerHTML = ``

    divHead.innerHTML = `<h1>Home Page</h1>` 
     currentUser = obj.data.attributes
    let homeDiv = document.createElement("div")
    trips = userTrips(user)
    homeDiv.innerHTML = `<h2>Welcome ${currentUser.name}</h2>
                        <p> Find some Outer Planets to visit, and 
                        book a trip with Luxe below</p>
                        ${userTrips()}
                        <br>
                        <input type="button" value="Book a Trip" name="book">
                        `
    homeDiv.addEventListener("click",function(e){
        e.preventDefault()
        homeDiv.remove()
        getLocations()
    })
    homeDiv.className="Homepage"
    main.appendChild(homeDiv)
}
function fetchUserTrips(){

}
function userTrips(){
    debugger
    let ul = document.createElement("ul")
    if(currentUser.trips){
        currentUser.trips.forEach(trip => {
            
            ul.innerHTML += `<ls>${trip.location.name} with the ${trip.ship.name}</ls>`
           
            return ul
        })
    }else{
        return `<p>Book a trip<p>`
    }
}
