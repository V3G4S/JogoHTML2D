const canvas = document.getElementById("jogo2D");
const ctx = canvas.getContext('2d'); // Inicializando canvas no contexto 2D (largura e altura)

function deseharPersonagem(){
    ctx.fillStyle = 'blue'
    ctx.fillRect(150, 100, 50, 50);
};

function loop() {
    deseharPersonagem()
};

loop();