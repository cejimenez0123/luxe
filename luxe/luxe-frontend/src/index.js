let main = document.getElementsByClassName("main")[0]
let ships = 'http://localhost:3000/ships'
let locations = 'http://localhost:3000/locations'
let trips = 'http://localhost:3000/trips'
let users = 'http://localhost:3000/users'
let divHead = document.createElement("div")

let checked = null 
let choice1 = null 
let choice2 = null
let nameInput = null
let joinBtn = document.createElement("input")

divHead.setAttribute("class","header")
main.appendChild(divHead)
function getShips(){
    fetch(ships)
    .then(res => res.json())
    .then(obj => buildShip(obj.data))
}
function getLocations(){
    fetch(locations).then(res => res.json())
    .then(obj => buildLocation(obj.data))
}

document.addEventListener("DOMContentLoaded", function(){
    getLocations()  
    
joinBtn.type = "button"
joinBtn.value = "Join Luxe"
joinBtn.className ="logIn"
main.after(joinBtn)

joinBtn.addEventListener("click",function(){
    let div = document.querySelector("div.locations")
    div.remove()
    logSign()
})
})


// builds form holding cards of locations that can be chosen from

function buildLocation(obj){ 
   let div = document.createElement("div")
        div.className = "locations"
        divHead.innerHTML = `<h1>Locations to Visit</h1>` 
        main.appendChild(div) 
    let form = document.createElement("form")
    let submitBtn = document.createElement('input')
        submitBtn.setAttribute("type","submit")
        submitBtn.setAttribute("value","Set Location")
        // form.setAttribute("action","/trips")
        
        // form.setAttribute("method","post")
    for(const location of obj){
     let html  = htmlLocation(location.attributes)
        form.innerHTML += html
    }
    form.appendChild(submitBtn)
    form.addEventListener("submit",function(e){
        let inputs = e.target.querySelectorAll('input')
        e.preventDefault()
        inputs.forEach(i => {
            if(i.checked == true){
                choice1 = i    
            }
        })
        div.remove()
        getShips()
    })
    div.appendChild(form)
    main.appendChild(div)
    }
function htmlLocation(location){
        location = `
        <div class="location">
        <label for="${location.id}">${location.name}</label>
    <input type="radio" id="${location.id}" name="location" value="${location.name}"  data-price="${location.price}"> 
             <p>$ ${location.price}</p>
    </div>
    `
        return location
    }   
function buildShip(obj){
    divHead.innerHTML = `<h1>Pick your Ship</h1>`
    let div = document.createElement("div")
        div.className = "ships"
    let form = document.createElement("form")
        form.setAttribute("action","trips")
        form.setAttribute("method","post")
        div.appendChild(form)
    for(const ship of obj){
         form.innerHTML += htmlShip(ship.attributes)
        }
    let submitBtn = document.createElement("input")
    submitBtn.setAttribute("type","submit")
    submitBtn.setAttribute("value","Submit for Trip")
    form.appendChild(submitBtn)
    main.appendChild(div)
    form.addEventListener("submit",function(e){
        e.preventDefault()

        let inputs = e.target.querySelectorAll('input')
        inputs.forEach(i => {
            if ( i.checked == true){
                choice2 = i
                div.remove()
                nameForm()
            }})
    })
    }
    let price = null
    let check 
    let password = null
    function checkCurrentUser(){
        if(currentUser ){
            return `<p>Your trip is ready ${currentUser.name}`
        }else{
            check = `<label for="name">Name:</label>
            <input type="text" name="name">
            <br>
            <label for="username">Username:</label>
            <input name="username" type="text">
            <br>
            <label for="password">Password:</label>
            <input name=password" type="text">
            <br>`
             return check
            
        }
    }
    function nameForm(){
      
        price = (parseInt(choice1.dataset["price"]))+(parseInt(choice2.dataset["price"]))
        divHead.innerHTML=`<h2>Final Form<h2>
                            <br><h4>Input Name,Check Price<h4>`
        let form = document.createElement("form")
        main.appendChild(form)
            form.innerHTML = `
                                <form action="trips" method="post">
                                ${ checkCurrentUser()}
                                <label for="price">Price of Trip:</label>
                                <h2 name="price">location:${choice1.dataset["price"]} + ship:
                                 ${choice2.dataset["price"]}= $ ${price}</h2>
                                <input type="submit">
                                </form>`
        
        let submitBtn = document.createElement("input")
        form.className ="Final Form"
        

        form.addEventListener("submit",function(e) {
            e.preventDefault()
            if(currentUser){
                password = currentUser.password
                username = currentUser.username
                nameInput = currentUser.name
                postTrip(currentUser)
            }else{
           password = e.target.querySelectorAll('input')[2].value
            username = e.target.querySelectorAll('input')[1].value
            nameInput = e.target.querySelectorAll('input')[0].value
             createUser()}
            form.remove()

            
        })
        
        submitBtn.setAttribute("type","submit")
        submitBtn.setAttribute("value","Order your Trip") 
        // main.appendChild(form)
    
    }
    let user = null
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
       fetch(users,config).then(res => res.json()).then(obj =>
        {
            debugger
        currentUser = obj.data.attributes });
    }
    function postTrip(user){
debugger
let  userObj= user.data
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
              },
              body: JSON.stringify({
                  "user_id": userObj.id,
                  "price": price,
                  "ship_id": choice2.id,
                  "location_id":choice1.id    
              })
        }
        fetch('http://localhost:3000/trips',config).then(res => res.json())
        .then(obj =>  htmlTrip(obj))

    }


    function htmlTrip(obj){
        debugger
        let userObj = obj.data.attributes.user
        let ship = obj.data.attributes.ship
        let location = obj.data.attributes.location
        divHead.innerHTML = `<h1>Thank you, have fun</h1>`
        debugger
       let  html = `<div name="purchase">
            <h2> Have fun $ at ${location.name}, ${userObj.name}</h2>
            <br>
            <h3> Remember the name of your ship is ${ship.name}<h3>
            <h3>Cost: $${price}</h3>
        </div>`

        main.innerHTML += html
        joinBtn.remove()
    }

    function htmlShip(ship){
    html = `<div class="ship">
            <label for="${ship.id}">${ship.name}</label>
          <input type="radio" id="${ship.id}" name="ship" value="${ship.name}" data-price="${ship.price}"> 
          <p>$ ${ship.price}</p>
            </div>`
    return html
    }
class User{constructor(name1,username1,password1){
    this.name = name1
    this.username = username1
    this.password = password1
}}

class Ship { 
    constructor(name,price){
        this.price = price
        this.name = name
    }
}
class Location {
    constructor(name,price){
        this.name = name
        this.price = price
    }
}
class Trip{
    constructor(user,ship,location,price){
        this.user = user
        this.ship = ship
        this.price = price
        this.location = location
    }
}

