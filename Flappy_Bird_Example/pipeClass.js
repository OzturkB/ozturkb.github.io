class Pipe{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.isDead = false;
        this.drawPipe(this.x,this.y,this.w,this.h);
    }
    drawPipe(x,y,w,h){
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.fillStyle = "black";
        ctx.fillRect(this.x,this.y,this.w,this.h);
        this.drawSCNDPipe(this.x);
    }
    drawSCNDPipe(x){
        ctx.rect(this.x,this.h+space,this.w,800-(this.h+space));
        ctx.fillStyle = "black";
        ctx.fillRect(this.x,this.h+space,this.w,800-(this.h+space));
    }
    get_x(){
        return this.x;
    }
    get_y(){
        return this.y;
    }
    get_w(){
        return this.w;
    }
    get_h(){
        return this.h;
    }
    updatePipe(){
        this.x = this.x - 3;
        this.drawPipe(this.x,this.y,this.w,this.h);
        if((this.x + w) < 0 && this.isDead != true){
            this.isDead = true;
            score++;
            birds.forEach(bird => !bird.isDead ? bird.score++ : bird.score = bird.score)
        }
    }
}
