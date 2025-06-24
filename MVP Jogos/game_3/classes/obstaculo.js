import Sprite from "./sprite.js";

class Obstáculo extends Sprite{
    constructor(ctx, imagem, x, y, largura, altura, largura_canvas, altura_canvas, velocidade){
        super(ctx, imagem)
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.largura_canvas = largura_canvas;
        this.altura_canvas = altura_canvas;
        this.velocidade = velocidade;
    }
    desenhar = () => {
        this.ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
    andar = () => {
        this.x -= 1 * this.velocidade;
    }
    animacao = () => {
        if(this.x <=0 - this.largura){
            this.x = this.largura_canvas;
        }
        this.andar()
        this.desenhar();
    }
}

export default Obstáculo;