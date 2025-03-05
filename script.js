const canvas = document.getElementById("jogo2D");
const ctx = canvas.getContext('2d'); // Inicializando canvas no contexto 2D (largura e altura)
document.addEventListener('keypress', (e) => {
    if(e.code == 'Space'){
        personagem.velocidadeY = -15;
        personagem.pulando = true;
    }
})
const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadeY: 0,
    pulando: false
}

function deseharPersonagem(){
    ctx.fillStyle = 'blue'
    ctx.fillRect(personagem.x, personagem.y, personagem.altura, personagem.largura);
};

function atualizaPersonagem(){
    if(personagem.pulando == true){
        personagem.y += personagem.velocidadeY
    }
};

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela
    deseharPersonagem(); // Desenha de novo
    atualizaPersonagem();
    requestAnimationFrame(loop); // Atualiza posições
};

loop();