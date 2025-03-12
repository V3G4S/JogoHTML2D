class veiculo {
    constructor(tipo, marca, cor, velocidade, passageiros){
        this.tipo = tipo;
        this.marca = marca;
        this.cor = cor;
        this.capacidade = passageiros;
        this.velocidade = velocidade;
    }
    acelerar = function(){
        this.velocidade += 10;
    }
    freiar = function(){
        if(this.velocidade > 0){
            this.velocidade -= 5;
        }else{
            console.log("Carro parado")
        }
    }
}

class aviao extends veiculo {
    #mach
    constructor(tipo, marca, cor, velocidade, passageiros, companhia){
        super(tipo, marca, cor, velocidade, passageiros)
        this.companhia = companhia
        this.#mach = 0
    }
    acelerar = function(){
        this.#mach += 0.1
        console.log("Acelerando em " + this.velocidade + "machs")
    }
    freiar = function(){
        this.#mach -= 0.1
        console.log("Freiando em " + this.velocidade + "machs")
    }
    getVelocidad = function(){
        return this.#mach
    }
}

class barco extends veiculo {
    #nos
    constructor(tipo, marca, cor, velocidade, passageiros, capacidadeCarga){
    super(tipo, marca, cor, velocidade, passageiros)
    this.capacidadeCarga = capacidadeCarga
    this.#nos = 0
    }
    acelerar = function(){
        this.#nos += 0.5
        console.log("Acelerando em " + this.velocidade + "nós")
    }
    freiar = function(){
        this.#nos -= 0.1
        console.log("Freiando em " + this.velocidade + "nós")
    }
}

const carro = new veiculo (
    "carro",
    "camaro",
    "amarelo",
    5,
    0
)

const moto = new veiculo (
    'moto',
    'moto_aleatória',
    'preto',
    0,
    2
)

const airplane = new aviao (
    'aviao',
    'boeing 777',
    'azul',
    0,
    0,
    'Delta Air Lines'
)

const navio = new barco (
    'barco',
    'titanic',
    'vermelho',
    0,
    0,
    1000000
)

carro.acelerar()
carro.acelerar()
carro.freiar()
moto.acelerar()

console.log(carro)
console.log(moto)
console.log(airplane)
console.log(navio)