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
    fetch(locations).then(res => 
        res.json()
    )
    .then(obj => buildLocation(obj.data))
}

document.addEventListener("DOMContentLoaded", function(){
    getLocations()  
    
joinBtn.type = "button"
joinBtn.value = "Join Luxe"
joinBtn.className ="logIn"
sumBox()
main.after(joinBtn)
sort()
joinBtn.addEventListener("click",function(){
    let div = document.querySelector("div.locations")
    div.remove()
    logSign()
})
})
function sumBox(){
   let sumBox = document.createElement("div")
   sumBox.className = "sumBox"
       sumBox.innerHTML += `<div id="locAdd">
                            </div>
                           
                            <p>+</p>
                            <br>
                            <div id="shipAdd"></div>
                            =
                            <div id="tripAdd"></div>
                            `       
   main.appendChild(sumBox)
}

function sort(){
    let sortBtn = document.querySelector(".sort")

    sortBtn.addEventListener("click",(e) => {
    
        fetch(locations).then(res=> res.json()).then(obj => {
           
            obj.data.sort(function(a, b) {
                var nameA = a.attributes.name.toUpperCase(); // ignore upper and 
                var nameB = b.attributes.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              

                return 0;
              });
              console.log(obj.data)        })


})
}
// builds form holding cards of locations that can be chosen from
let loc = null
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
    let inputs = form.querySelectorAll('input[name="location"]')
    inputs.forEach(input=>{
        input.addEventListener("change",(e)=>{
            e.preventDefault()
             loc = new Location (e.target.id,e.target.value,e.target.dataset.price)
            
            loc.addLoc( )
        })
    })

    form.addEventListener("submit",function(e){
        e.preventDefault()     
        inputs.forEach(i => {
            if(i.checked == true){
                choice1 = new Location(i.id,i.value,i.dataset["price"])
            }
        })
        div.remove()
        
        getShips()
    })
    div.appendChild(form)
    main.appendChild(div)
    }
    let locationObj = null
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
        var a= { price: null}
    for(const ship of obj){
        if(a.price > ship.attributes.price || a.price === null){
            a = ship.attributes
        }
   
         form.innerHTML += htmlShip(ship.attributes)
        }
    let shipInputs = form.querySelectorAll('input[name="ship"]') 
    shipInputs.forEach(input =>{
        input.addEventListener("change",(e)=>{
            if(e.target.checked){
                let shi = new Ship(e.target.id,e.target.value,e.target.dataset.price)
                shi.addShip()
            }
        })
    })
  
    let minBtn = document.createElement("button")
    minBtn.innerText = "Best Value Ship"
    main.appendChild(minBtn)
    minBtn.addEventListener("click",()=>{ 
        let shipInput
        let clipper
        document.querySelectorAll("input").forEach(int => {
            if(a.name === int.value){
                shipInput = int
                clipper = new Ship(shipInput.id,shipInput.value,shipInput.dataset["price"])
            }
        })
        clipper.addShip()
        shipInput.checked = true

    })
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
              choice2  = new Ship(i.id,i.value,i.dataset["price"])
                div.remove()
                nameForm()
            }})
            let sb = document.querySelector(".sumBox")
            sb.remove()
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
            <input name=password" type="password">
            <br>`
             return check
            
        }
    }
    function nameForm(){
      
        price = (parseInt(choice1.price))+(parseInt(choice2.price))
        divHead.innerHTML=`<h2>Final Form<h2>
                            <br><h4>Input Name,Check Price<h4>`
        let form = document.createElement("form")
        main.appendChild(form)
            form.innerHTML = `
                                <form action="trips" method="post">
                                ${ checkCurrentUser()}
                                <label for="price">Price of Trip:</label>
                                <h2 name="price">location:${choice1.price} + ship:
                                 ${choice2.price}= $ ${price}</h2>
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
    let object = null
    let user = null
    function postTrip(user){
        
        currentUser = user
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
              },
              body: JSON.stringify({
                  "user_id": user.id,
                  "price": price,
                  "ship_id": choice2.id,
                  "location_id":choice1.id    
              })
        }
        fetch('http://localhost:3000/trips',config).then(res => res.json())
        .then(obj =>  {
            currentTrip = new Trip (obj.data.attributes.id, obj.data.attributes.user, obj.data.attributes.ship,obj.data.attributes.location, obj.data.attributes.price)
            htmlTrip(currentTrip)}
        )
    }
    let currentTrip = null

    function htmlTrip(obj){
 
        
        let userObj = obj.user
        let ship = obj.ship
        let location = obj.location
        divHead.innerHTML = `<h1>Thank you, have fun</h1>`
       let  html = `<div name="purchase">
            <h2> Have fun ${userObj.name} at ${location.name} </h2>
            <br>
            <h3> Remember the name of your ship is ${ship.name}<h3>
            <h3>Cost: $${obj.price}</h3>
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

    
class User{constructor(id,name,username,password){
    this.id = id
    this.name = name
    this.username = username
    this.password = password
}}

class Ship { 
    constructor(id,name,price){
        this.id = id
        this.price = price
        this.name = name
    }
    addShip(){
        let shipAdd = document.querySelector("#shipAdd")
        shipAdd.innerText = this.price
         let tripPrice = parseInt(loc.price) + parseInt(this.price)
         let tripAdd = document.querySelector("#tripAdd")
         tripAdd.innerText = tripPrice
    }
}
class Location {
    constructor(id,name,price){
        this.id = id
        this.name = name
        this.price = price
    }
    addLoc(){  
        let locAdd = document.querySelector("#locAdd")
        locAdd.innerText =  this.price
    
    
    }
}
class Trip{
    constructor(id,user,ship,location,price){
        this.id = id
        this.user = user
        this.ship = ship
        this.price = price
        this.location = location
    }
   
}

