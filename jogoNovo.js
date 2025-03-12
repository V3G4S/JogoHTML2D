const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let gameOver = false;

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulo == false) {
        personagem.saltar()
    }
})
document.addEventListener('click', (e) => {
    if (gameOver == true) {
        location.reload();
    }
})

class Entidade {
    #gravidade
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5;
    }
    get gravidade() {
        return this.#gravidade;
    }
    desenhar = function (ctx, cor) {
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    #pulo
    #velocidadeY
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#pulo = false;
        this.#velocidadeY = 0;
    }

    desenhar(ctx, cor) {
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
    saltar = function () {
        this.#velocidadeY = 20;
        this.#pulo = true;
    }
    get pulando() {
        return this.#pulo;
    }
    get velocidadeY() {
        return this.#velocidadeY;
    }
    atualizarPersonagem = function () {
        if (this.pulo) {
            this.y -= this.#velocidadeY;
            this.#velocidadeY -= this.gravidade;

            if (this.y >= canvas.height - this.altura) {
                this.#velocidadeY = 0;
                this.#pulo = false;
                this.y = canvas.height - this.altura;
            }
        }
    }
}


class Obstaculo extends Entidade {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
    }
}

const personagem = new Personagem(100, canvas.height - 50, 50, 50)

function loop() {
    if (gameOver == false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar(ctx, 'red');
        // desenharObstaculo();
        // verificaColisao();
        personagem.atualizarPersonagem();
        // atualizarObstaculo();
        requestAnimationFrame(loop);
    }
}

loop()