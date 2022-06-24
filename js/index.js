let currentMonster = 1

document.addEventListener("DOMContentLoaded", init)



function init() {
    document.getElementById("forward").addEventListener("click", displayFifty)
    document.getElementById("back").addEventListener("click", reverse)

    let nameInput = document.createElement('input')
    nameInput.type = "text"
    nameInput.placeholder = "Monster's Name"
    nameInput.name = "nameInput"
    nameInput.id = "nameInput"

    let ageInput = document.createElement('input')
    ageInput.type = "text"
    ageInput.placeholder = "Monster's Age"
    ageInput.name = "ageInput"
    ageInput.id = "ageInput"

    let bioInput = document.createElement('input')
    bioInput.type = "text"
    bioInput.placeholder = "A little about the monster"
    bioInput.name = "bioInput"
    bioInput.id = "bioInput"

    let submitter = document.createElement('button')
    submitter.innerText = "Submit Monster"
    submitter.addEventListener('click', appendMonster)

    document.getElementById('create-monster').appendChild(nameInput)
    document.getElementById('create-monster').appendChild(ageInput)
    document.getElementById('create-monster').appendChild(bioInput)
    document.getElementById('create-monster').appendChild(submitter)

    displayFifty()
}

function reverse() {
    currentMonster -= 100
    if (currentMonster < 1) {currentMonster = 1} 
    displayFifty()
}

function getData(url) {
    fetch (url)
    .then( res => res.json())
    .then (data => {
        makeAMonster(data)
    })

}

function displayFifty() {
    let container = document.getElementById('monster-container')
    while(container.firstChild) {container.firstChild.remove()}

    for (i=0;i<50;i++) {
        url = `http://localhost:3000/monsters/${currentMonster}`
        getData(url)
        currentMonster++

    }

}

function makeAMonster(data) {
    //console.log(data.id)
    let container = document.getElementById('monster-container')
    let newMonst = document.createElement('div')
    newMonst.innerHTML += `<h2>${data.name}</h2>`
    newMonst.innerHTML += `<h4>Age: ${data.age}</h4>`
    newMonst.innerHTML += `<p>Bio: ${data.description}</p>`
    container.appendChild(newMonst)
}


function appendMonster(){
    url = `http://localhost:3000/monsters/`
    postThis = {
        name: document.getElementById('nameInput').value,
        age: document.getElementById('ageInput').value,
        description: document.getElementById('bioInput').value
        }

    fetch (url, {
        method: 'POST',
        headers: {'content-type': 'application/json',
                    accept: 'application/json' },
        body: JSON.stringify(postThis)

    })

    let container = document.getElementById('monster-container')
    let newMonst = document.createElement('div')
    newMonst.innerHTML += `<h2>${document.getElementById('nameInput').value}</h2>`
    newMonst.innerHTML += `<h4>Age: ${document.getElementById('ageInput').value}</h4>`
    newMonst.innerHTML += `<p>Bio: ${document.getElementById('bioInput').value}</p>`
    container.appendChild(newMonst)

    document.getElementById('nameInput').value = ""
    document.getElementById('ageInput').value = ""
    document.getElementById('bioInput').value = ""



} 
