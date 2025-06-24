import Sprite from "./sprite.js";
class Personagem extends Sprite{
    constructor(ctx, imagem, altura_canvas, x, y, largura, altura, velocidade, inicialX, inicialY){
        super(ctx, imagem);
        this.altura_canvas = altura_canvas;
        this.largura_imagem = this.imagem.width;
        this.altura_imagem = this.imagem.height
        this.numero_spriteX = 1;
        this.numero_spriteY = 3;
        this.recorte_lagura = this.largura_imagem/4;
        this.recorte_altura = this.altura_imagem/4;
        this.recorteX = this.recorte_lagura * this.numero_spriteX;
        this.recorteY = this.recorte_altura* this.numero_spriteY;
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.velocidade = velocidade;
        this.inicialX = inicialX;
        this.inicialY = inicialY;
        this.direcaoX = 1;
        this.direcaoY = 1;
        this.esquerda = false;
        this.direita = false;
        this.pulando = false;
        this.animacao = null;
        this.estado = null;
    }
    desenhar(){
        this.ctx.drawImage(this.imagem, this.recorteX, this.recorteY, this.recorte_lagura, this.recorte_altura,this.x, this.y, this.recorte_lagura/2, this.recorte_altura/2);
    }
    gerenciar(){
        if(this.esquerda){
            this.x -= this.direcaoX * this.velocidade;
        }
        if(this.direita){
            this.x += this.direcaoX * this.velocidade;
        }
        if(this.pulando){
            this.pular();
        }
    }
    pular = () => {
            this.y -= this.direcaoY * this.velocidade;
            if(this.pulando == true){
                this.animacao = requestAnimationFrame(this.pular);
            }
            if(this.y <= 10){
                this.direcaoY = -1;
            } else if(this.y == this.inicialY){
                this.direcaoY = 0;
                this.pulando = false;
            }
    }
    voltar_pular = () => {
        this.direcaoY = 1;
    }
    
}

export default Personagem;