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
            console.log('pulou');
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
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
    }
}

const personagem = new Personagem(100, canvas.height - 50, 50, 50);

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar(ctx, 'red');
        personagem.atualizarPersonagem();
        requestAnimationFrame(loop);
    }
}

loop();