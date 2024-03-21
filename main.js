const bowling = {
    "players": [
        
    ],
    "setScores": function(){
        if(this.players[0].scores.length < 10){
            this.players.forEach( (giocatore)=>{
                    let tiro = Math.round( Math.random()*(10-0)+0)
                    if(tiro == 10){
                        let img = document.createElement("img")
                        img.setAttribute("src", "")
                        img.classList.add("img-strike")
                        document.body.appendChild(img)
                        setTimeout(() => {
                            img.remove()
                        }, 5000);
                    }

                    giocatore.scores.push( tiro )
                    giocatore.finalScore = giocatore.scores.reduce( (acc,num)=>acc+ num, 0 )
            })
        }
    },
    "setWinner": function(){
        let winner = this.players[0];
        this.players.forEach( (giocatore)=>{
            if(giocatore.finalScore > winner.finalScore){
                winner = giocatore;
            }
        } )

    },
    "setWinner2": function(){
        this.players.sort( (a, b)=> b.finalScore - a.finalScore )

    },
    "setNewPlayer": function(nome){
        this.players.push(  {"name": nome, "scores": [], "finalScore": 0 }  )
    },
    "createTable": function(){
        playersWrapper.innerHTML = "";

        this.players.forEach( (giocatore, i)=>{
            let tr = document.createElement("tr")
            tr.innerHTML = `
                            <th scope="row">${i+1}</th>
                            <td>${giocatore.name}</td>
                            <td>${giocatore.scores[0] ? giocatore.scores[0] : 0}</td>
                            <td>${giocatore.scores[1] ? giocatore.scores[1] : 0}</td>
                            <td>${giocatore.scores[2] ? giocatore.scores[2] : 0}</td>
                            <td>${giocatore.scores[3] ? giocatore.scores[3] : 0}</td>
                            <td>${giocatore.scores[4] ? giocatore.scores[4] : 0}</td>
                            <td>${giocatore.scores[5] ? giocatore.scores[5] : 0}</td>
                            <td>${giocatore.scores[6] ? giocatore.scores[6] : 0}</td>
                            <td>${giocatore.scores[7] ? giocatore.scores[7] : 0}</td>
                            <td>${giocatore.scores[8] ? giocatore.scores[8] : 0}</td>
                            <td>${giocatore.scores[9] ? giocatore.scores[9] : 0}</td>
                            <td>${giocatore.finalScore}</td>
                        `
            playersWrapper.appendChild(tr)
        } )
    },
    "setModalResults": function(){

        modalWinner.innerHTML = `Il vincitore è ${this.players[0].name}`

        this.players.forEach((giocatore, i)=>{
            let p = document.createElement("p");
            p.innerHTML = `<p>#${i+1} - ${giocatore.name} Punteggio Finale: ${giocatore.finalScore}</p>`
            modalBody.appendChild(p);
        })
    },
    "resetGame": function(){
        this.players = [];
    }
}

let playersWrapper = document.querySelector("#playersWrapper")
bowling.createTable()





// Bottoni


// Btn inizia partita

let btnStart = document.querySelector("#btnStart");

btnStart.addEventListener("click", ()=>{
    btnStart.classList.add("d-none")
    playRound.classList.remove("d-none")
    btnNewPlayer.classList.add("d-none")
})



// Btn gioca turno

let playRound = document.querySelector("#playRound")

playRound.addEventListener("click", ()=>{
    bowling.setScores();
    bowling.createTable();
    if(bowling.players[0].scores.length == 10){
        btnResults.classList.remove("d-none")
    }



    console.log(bowling.players)
})

// Btn nuovo giocatore

let inputNewPlayer = document.querySelector("#inputNewPlayer")
let btnNewPlayer = document.querySelector("#btnNewPlayer")
// console.log(btnNewPlayer)
btnNewPlayer.addEventListener( "click", ()=>{
    bowling.setNewPlayer(inputNewPlayer.value)
    bowling.createTable();
    inputNewPlayer.value = ""
})


//Classifica
let modalWinner = document.querySelector("#modalWinner")
let modalBody = document.querySelector("#modalBody")
let btnResults = document.querySelector("#btnResults")


btnResults.addEventListener("click", ()=>{
    modalWinner.innerHTML = ""
    modalBody.innerHTML = ""
    bowling.setWinner2();
    bowling.setModalResults();
})


// Riavvia Partita
let btnResetGame = document.querySelector("#btnResetGame")

btnResetGame.addEventListener("click", ()=>{
    bowling.resetGame();
    bowling.createTable();
    btnNewPlayer.classList.remove("d-none");
    btnStart.classList.remove("d-none");
    playRound.classList.add("d-none");
    btnResults.classList.add("d-none");

})