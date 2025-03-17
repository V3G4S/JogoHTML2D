const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let gameOver = false;

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && !personagem.pulando) {
        personagem.saltar();
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
    desenhar(ctx, cor) {
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    #pulando
    #velocidadey

    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#pulando = false;
        this.#velocidadey = 0;
    }

    saltar() {
        if (!this.#pulando) {
            this.#velocidadey = 15;
            this.#pulando = true;
        }
    }

    get pulando() {
        return this.#pulando;
    }

    atualizarPersonagem() {
        if (this.#pulando) {
            this.#velocidadey -= this.gravidade;
            this.y -= this.#velocidadey;

            if (this.y >= canvas.height - this.altura) {
                this.#velocidadey = 0;
                this.#pulando = false;
                this.y = canvas.height - this.altura;
            }
        }
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, velocidadeX) {
        super(x, y, largura, altura);
        this.velocidadeX = velocidadeX;
    }

    atualizarObstaculo() {
        this.x -= this.velocidadeX;
        if (this.x <= -this.largura) {
            this.x = canvas.width;
            this.velocidadeX += 0.1;
            let novaAltura = (Math.random() * 50) + 100;
            this.altura = novaAltura;
            this.y = canvas.height - this.altura;
        }
    }

    desenhar(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

function verificaColisao(personagem, obstaculo) {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true;
    }
}

const obstaculo = new Obstaculo(canvas.width, canvas.height - 100, 50, 100, 5);
const personagem = new Personagem(150, canvas.height - 50, 50, 50)

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar(ctx, 'red');
        personagem.atualizarPersonagem();
        obstaculo.atualizarObstaculo();
        obstaculo.desenhar(ctx);
        verificaColisao(personagem, obstaculo);
        requestAnimationFrame(loop);
    }
}

loop();