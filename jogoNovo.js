const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
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

const personagem = new Personagem (100, canvas.height - 50, 50, 50)

class entidade {
    #gravidade
    constructor(x, y, largura, altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5;
    }
    get gravidade(){
        return this.#gravidade;
    }
    desenhar = function(ctx, cor){
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends entidade {
    constructor(x, y, largura, altura){
        super(x, y, largura, altura);
        this.velocidadeX = 0;
        this.velocidadeY = 0;
        this.pulo = false;
    }
}

class obstaculo extends entidade {
    constructor(x, y, largura, altura){
        super(x, y, largura, altura);
    }
}

function loop(){
    if(gameOver == false){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        personagem.desenhar(ctx, 'red');
        // desenharObstaculo();
        // verificaColisao();
        // atualizarPersonagem();
        // atualizarObstaculo();
        requestAnimationFrame(loop);
    }
}