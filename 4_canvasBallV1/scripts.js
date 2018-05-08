window.onload = function() {
    let t = 200/1000;
    let count = localStorage.length;
    let items = [];
    let ballRadius = 12, balls = [];
    //越来越难
    let collarg = 1.1;
    let score = 0.0;

    //let getRandom_v = () => 10*(parseInt(Math.random() * 5 - 2) || 2);
    let getRandom_v = () => 20* ~~(Math.random() * 5 - 2);
    function getRandom(a,b){
        return parseInt(Math.random() * (b - a) + a);
    }
    let Ball = function(x,y,r,color){
        this.x = x;
        this.y = y;
        // this.oldx = x;
        // this.oldy = y;
        //这个速度回头再调整
        this.vx = getRandom_v();
        this.vy = getRandom_v();
        this.radius = r;
        this.color = color;
    };
    Ball.prototype = {
        paint: function(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius - 1, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            //ctx.strokeStyle = '#fff';
            //ctx.stroke();
        },
        run: function(t){
            // this.oldx = this.x;
            // this.oldy = this.y;
            this.x += this.vx * t;
            this.y += this.vy * t;
            //debugger;
            if (this.y > canvas.height - ballRadius || this.y < ballRadius) {
                this.y = this.y < ballRadius ? ballRadius : (canvas.height - ballRadius);
                this.vy = -this.vy;
            }
            if (this.x > canvas.width - ballRadius || this.x < ballRadius) {
                this.x = this.x < ballRadius ? ballRadius : (canvas.width - ballRadius);
                this.vx = -this.vx;
            }
            this.paint();
        },
    }

    canvas = document.getElementById('cas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = "20px Georgia";

    let myBall = new Ball(-500,-400,ballRadius,"white",0,0);
    myBall.vx = 0;
    myBall.vy = 0;
    balls.push(myBall);

    for(let i = 0; i < 40; i++){
        let ball = new Ball(getRandom(ballRadius, canvas.width - ballRadius),
            getRandom(ballRadius, canvas.height - ballRadius),
            ballRadius, "rgba(" + parseInt(Math.random() * 255)
            + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + " , 1)");

        balls.push(ball);
    }

    canvas.onmousemove = function(event){
        myBall.x = event.x;
        myBall.y = event.y;
    };




    canvas.onmousedown = function(event){
        if(event.x >= (canvas.width/2)-40 && event.x <= (canvas.width/2)+60 &&
            event.y >= (canvas.height/2)+30 && event.y <= (canvas.height/2)+65){
            location.reload();
        }
    }

    initScores();
    animate();


    function drawButton(x,y,width,height){
        ctx.fillStyle = "#d92817";
        ctx.fillRect(x,y,width,height);
    }

    function bestScore(){
        if(count === 0){
            ctx.fillStyle = '#fff';
            ctx.fillText('Best:'+'0',10,80);
        }else{
            ctx.fillStyle = '#fff';
            ctx.fillText('Best:'+items[0].toString(),10,80);
        }
    }

    function initScores(){
        for(let i = 0; i < count; i++){
            items.push(localStorage.getItem(i));
        }
        items.sort((a,b) => b - a);
    }

    function updateScores(){
        localStorage.setItem(count.toString(),score.toString());
        items.push(score);
        items.sort((a,b) => b - a);
        console.log(items[0]);
    }

    function animate(){
        score += 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.restore();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        collision();
        ctx.fillText('score:'+score.toString(),10,50);
        bestScore();
        if(balls[0].vx !== 0 || balls[0].vy !== 0){

            ctx.fillText('You died. Your score is '+score.toString(),(canvas.width/2)-100,canvas.height/2);
            drawButton((canvas.width/2)-40,(canvas.height/2)+30,100,35);
            ctx.fillStyle = '#fff';
            ctx.fillText('再来一次',(canvas.width/2)-30,(canvas.height/2)+53);
            updateScores();
            return;
        }

        balls.forEach((b) => b.run(t));

        myBall.paint();
        if ("requestAnimationFrame" in window) {
            requestAnimationFrame(animate);
        } else if ("webkitRequestAnimationFrame" in window) {
            webkitRequestAnimationFrame(animate);
        } else if ("msRequestAnimationFrame" in window) {
            msRequestAnimationFrame(animate);
        } else if ("mozRequestAnimationFrame" in window) {
            mozRequestAnimationFrame(animate);
        }
        //webkitRequestAnimationFrame(animate);
    }

    function collision(){
        for (let i = 0; i < balls.length; i++) {
            for (let j = 0; j < balls.length; j++) {
                let b1 = balls[i], b2 = balls[j];
                if (b1 !== b2) {
                    let rc = Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2));
                    //向上舍入
                    if (Math.ceil(rc) < (b1.radius + b2.radius + 2)) {
                        // console.log('' + rc + ' ' + (b1.radius + b2.radius + 2));
                        // //给与小球新的速度
                        //
                        // console.log(b1,b2);
                        // window.b1 = b1; window.b2 = b2;
                        //

                        let ax = ((b1.vx - b2.vx) * Math.pow((b1.x - b2.x), 2) +
                            (b1.vy - b2.vy) * (b1.x - b2.x) * (b1.y - b2.y)) / Math.pow(rc, 2);
                        let ay = ((b1.vy - b2.vy) * Math.pow((b1.y - b2.y), 2) +
                            (b1.vx - b2.vx) * (b1.x - b2.x) + (b1.y - b2.y)) / Math.pow(rc, 2);

                        b1.vx = (b1.vx - ax) * collarg;
                        b1.vy = (b1.vy - ay) * collarg;
                        b2.vx = (b2.vx + ax) * collarg;
                        b2.vy = (b2.vy + ay) * collarg;
                        // console.log(b1,b2);
                        // console.log('***************');

                        let clength = ((b1.radius + b2.radius + 2) - rc) / 2;
                        let cx = clength * (b1.x - b2.x) / rc;
                        let cy = clength * (b1.y - b2.y) / rc;
                        b1.x = b1.x + cx;
                        b1.y = b1.y + cy;
                        b2.x = b2.x - cx;
                        b2.y = b2.y - cy;
                    }
                }
            }
        }
    }
}