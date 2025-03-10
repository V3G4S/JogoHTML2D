const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 1
let gameOver = false;

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulo == false) {
        personagem.velocidadeY = 20
        personagem.pulo = true
    }
})
document.addEventListener('click', (e) => {
    if(gameOver == true){
        location.reload();
    }
})

const personagem = {
    x: 100,
    y: canvas.height - 50,
    width: 50, // Corrigido para 'width'
    height: 50, // Corrigido para 'height'
    velocidadeY: 0,
    pulo: false,
    imagem_src: 'https://img.itch.zone/aW1nLzIyNjc3NzQucG5n/315x250%23c/Nsn5Eb.png',
};
personagem.imagem = new Image();
personagem.imagem.src = personagem.imagem_src;

function desenharPersonagem(){
    ctx.drawImage(personagem.imagem, personagem.x, personagem.y, personagem.width, personagem.height); // Corrigido para 'width' e 'height'
}

const obstaculo = {
    x: canvas.width - 100,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadeX: 10
};

function atualizarObstaculo(){
    obstaculo.x -= obstaculo.velocidadeX
    if(obstaculo.x <= -50){
        obstaculo.x = canvas.width
        obstaculo.velocidadeX += 0.1
        let novaAltura = (Math.random() * 50) + 100
        obstaculo.altura = novaAltura
        obstaculo.y = canvas.height - obstaculo.altura
    }
};

function desenharObstaculo(){
    ctx.fillStyle ='red'
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function pularPersonagem(){
    if(personagem.pulo) return
        
    personagem.y -= personagem.velocidadeY
    personagem.velocidadeY -= gravidade
    if(personagem.y < canvas.height - personagem.height) return;
    
    personagem.velocidadeY = 0
    personagem.pulo = false
    personagem.y = canvas.height-personagem.height
}

function atualizarPersonagem(){
    if(personagem.pulo == true){
        personagem.y -= personagem.velocidadeY;
        personagem.velocidadeY -= gravidade;
        if(personagem.y >= canvas.height - personagem.height){ // Quando o personagem chegar no limite inferior do canva, ele não passa
            personagem.velocidadeY = 0;
            personagem.pulo = false;
            personagem.y = canvas.height - personagem.height;
        }
    }
}

function houveColisao(){
    gameOver = true;
    personagem.velocidadeY = 0;
    obstaculo.velocidadeX = 0;
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100);
    ctx.fillStyle = 'black';
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", (canvas.width / 2) - 150, (canvas.height / 2));
}

function verificaColisao(){
    atualizarPersonagem(); // Update character position before checking collision

    if(
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.width > obstaculo.x && // Corrigido para 'width'
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.height > obstaculo.y  // Corrigido para 'height'
    ) {
        houveColisao();
    }
}

function loop(){
    if(gameOver == false){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        desenharPersonagem();
        desenharObstaculo();
        verificaColisao();
        atualizarPersonagem();
        atualizarObstaculo();
        requestAnimationFrame(loop);
    }
}

loop()