class Bird{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.velocity = 0.3;
        this.score = 0;
        this.isDead = false;
        this.drawBird(this.x, this.y);
    }
    get_x(){
        return this.x;
    }
    get_y(){
        return this.y;
    }
    drawBird(x, y){
        if(!this.isDead){
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, 360);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
        }
    }
    fall(){
        this.gravity += this.velocity;
        //this.gravity = Math.min(10, this.gravity);
        this.y += this.gravity;
        //clear();
        this.drawBird(this.x, this.y);
    }
    jump(){
        this.gravity = -7;
    }
    updateBird(){
        this.fall();
        pipes.forEach(pipe => {
            if(this.y <= 0 || this.y >= 800 || ((this.x >= pipe.get_x() &&
            this.x <= pipe.get_x()+pipe.get_w() && this.y <= pipe.get_y()+pipe.get_h() &&
            this.y >= pipe.get_y()) || (this.x >= pipe.get_x() && this.x <= pipe.get_x()+pipe.get_w() &&
            this.y >= pipe.get_y()+pipe.get_h()+space && this.y <= 800))){
                this.isDead = true;
                //clearInterval(loop);
                //restart();
            }
        })
    }
}
