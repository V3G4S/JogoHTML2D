const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 1

document.addEventListener('keydown', (e) => {
    if(e.code == 'Space' && personagem.pulo == false) {
        console.log("Press the Space Bar")
        personagem.velocidadeY = 15
        personagem.pulo = true
    }
})

const personagem = {
    x: 100,
    y:canvas.height - 50,
    height: 50,
    width: 50,
    pulo: false,
    velocidadeY: 0
}

function desenharPersonagem(){
    ctx.fillStyle = 'blue'
    ctx.fillRect(personagem.x,personagem.y,personagem.height,personagem.width);
}

function pularpersonagem(){
    if(!personagem.pulo) return
        
    personagem.y -= personagem.velocidadeY
    personagem.velocidadeY -= gravidade
    if(personagem.y < canvas.height - 50) return;
    
    personagem.velocidadeY = 0
    personagem.pulo = false
    personagem.y = canvas.height-50
}

function atualizarPersonagem(){
    if(personagem.pulo == true){
        personagem.y -= personagem.velocidadeY;
        personagem.velocidadeY -= gravidade
        if(personagem.y >= canvas.height-50){
            personagem.velocidadeY = 0
            personagem.pulo = false
            personagem.y = canvas.height-50
        }
    }
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);{

    }

    desenharPersonagem();
    atualizarPersonagem()
    requestAnimationFrame(loop)
}

loop()