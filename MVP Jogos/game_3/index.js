import Obstáculo from "./classes/obstaculo.js";
import Personagem from "./classes/personagem.js";

// configurações do canvas
const canvas = {
    elemento: document.querySelector("canvas"),
    largura: document.querySelector("canvas").width = window.innerWidth,
    altura: document.querySelector("canvas").height = window.innerHeight,
    redimensionar(){
        canvas.largura = window.innerWidth;
        canvas.altura = window.innerHeight;
        desenha_jogo();
    }
}
window.addEventListener("resize", canvas.redimensionar);

// contexto do canvas
let ctx = canvas.elemento.getContext("2d");
let loop = null;

// desenhar o jogo
function desenha_personagem(){
    marcelo.gerenciar();
    marcelo.desenhar();
}
function desenha_obstaculo(){
    nyan.animacao();
}
function desenha_jogo(){
    ctx.clearRect(0, 0, canvas.largura, canvas.altura);
    desenha_personagem();
    desenha_obstaculo()
    loop = requestAnimationFrame(desenha_jogo);
    
}

// obstáculo
const imagem_obstaculo = new Image();
imagem_obstaculo.src = "img/nyan_cat_esquerda.gif";
const nyan = new Obstáculo(ctx, imagem_obstaculo, canvas.largura - 150, 400, 150, 100, canvas.largura, canvas.altura, 10);
nyan.imagem.addEventListener("load", function(){
    desenha_jogo()
})

// personagem
const imagem_personagem = new Image();
imagem_personagem.src = "./img/menino.png";
const marcelo = new Personagem(ctx, imagem_personagem, canvas.altura, 0, 400, 150, 150, 7, 0, 400);
marcelo.imagem.addEventListener("load", function(){
    marcelo.desenhar();
})
document.addEventListener("load", function(){
    marcelo.desenhar();
})

// eventos de teclado e movimentação para o personagem
function mover(){
    if(!loop){
        desenha_jogo();
    }
}
function parar(){
    marcelo.esquerda = false;
    marcelo.direita = false;
    // cancelAnimationFrame(loop);
    loop = null;
}
document.addEventListener("keydown", function(event){
    if(event.key == "ArrowLeft"){
        marcelo.esquerda = true;
    } else if (event.key == "ArrowRight"){
        marcelo.direita = true;
    } else if(event.key == "ArrowUp"){
        marcelo.pulando = true;
        marcelo.voltar_pular();
    }
    mover()
})
document.addEventListener("keyup", function(event){
    if(event.key == "ArrowLeft"){
        parar();
    } else if(event.key == "ArrowRight"){
      parar();
    }
})
