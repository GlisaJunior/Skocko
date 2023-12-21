const symbols = ['skocko', 'srce', 'pik', 'karo', 'tref', 'zvezda']
var combination = []
var attemptCnt = 0
var attempt = []

function init() {
    // <div id="symbols"></div>
    var symbolsDiv = document.getElementById('symbols')
    /*
    for (var i = 0; i < symbols.length; i++)
        symbols[i]
    */
    for (let symbol of symbols) {
        // <img src="img/skocko.jpg">
        var symbolImg = document.createElement('img')
        symbolImg.src = 'img/' + symbol + '.jpg'
        symbolImg.onclick = function() {
            chooseSymbol(symbol)
        }
        // <div id="symbols"><img src="img/skocko.jpg"></div> 
        symbolsDiv.appendChild(symbolImg)
    }
}

function newGame() {
    // <div id="attempts"></div>
    var attemptsDiv = document.getElementById('attempts')
    attemptsDiv.innerHTML = ''
    // <div id="symbols"></div>
    var symbolsDiv = document.getElementById('symbols')
    // [<img src="skocko.jpg">, <img src="srce.jpg", ...]
    var symbolImgs = symbolsDiv.getElementsByTagName('img')
    for (var symbolImg of symbolImgs) {
        // <img src="skocko.jpg" class="clickable">
        symbolImg.className = 'clickable'
    }
    // napraviti slucajnu kombinaciju od 4 znaka
    for (var i = 0; i < 4; i++) {
        // Math.random() -> [0, 1)
        // Math.random() * 6 -> [0, 6)
        // Math.floor(Math.random() * 6) -> {0, 1, 2, 3, 4, 5}
        randomIndex = Math.floor(Math.random() * 6)
        combination[i] = symbols[randomIndex]
    }
    console.log('Kombinacija: ' + combination)
    
    attemptCnt = 0
    newAttempt()
}

function newAttempt() {
    attemptCnt++
    // <div id="attempts"></div>
    var attemptsDiv = document.getElementById('attempts')
    // <br>
    var br = document.createElement('br')
    // <div id="attempts"><br></div>
    attemptsDiv.appendChild(br)
    for (var i = 0; i < 4; i++) {
        // <img>
        var attemptImg = document.createElement('img')
        // <img id="field10">
        attemptImg.id = 'field' + attemptCnt + i
        // <div id="attempts"><br><img>...</div>
        attemptsDiv.appendChild(attemptImg)
    }
    // []
    attempt = []
}

function chooseSymbol(symbol) {
    // <img id="field10">
    var id = 'field' + attemptCnt + attempt.length
    var attemptImg = document.getElementById(id)
    // <img id="field10" src="img/skocko.jpg">
    attemptImg.src = 'img/' + symbol + '.jpg'
    // ['skocko', ...]
    attempt.push(symbol)
    
    if (attempt.length == 4) {
        console.log('Pokusaj: ' + attempt)
        let red = 0
        let wrongFromAttempt = []
        let wrongFromCombination = []
        for (let i = 0; i < 4; i++) {
            if (attempt[i] == combination[i]) {
                red++
            } else {
                wrongFromAttempt.push(attempt[i])
                wrongFromCombination.push(combination[i])
            }
        }
        let yellow = 0
        for (let symbol of wrongFromCombination) {
            let index = wrongFromAttempt.indexOf(symbol)
            if (index != -1) {
                yellow++
                wrongFromAttempt.splice(index, 1)
            }
        }
        document.getElementById('mesto').innerHTML = red//('Crveni: ' + red)
        document.getElementById('nemesto').innerHTML = yellow//console.log('Zuti: ' + yellow)

        if (red == 4) {
            alert('Cestitamo!')
        } else {
            newAttempt()
        }
    }
}
