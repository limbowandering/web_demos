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
        //这个速度回头再调整
        //可能还需要重构一下, 用于游戏难度自定义
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
            //边框就不画了. 这种canvas像素的操作,碰撞检测时候也是蛮揪心的.
            //ctx.strokeStyle = '#fff';
            //ctx.stroke();
        },
        run: function(t){
            //目前只是匀速运动, 之前有看到过模拟重力的, 加速度什么的, 原来物理还是有用的
            this.x += this.vx * t;
            this.y += this.vy * t;
            //debugger;
            //y/x方向上与边框的碰撞检测
            if (this.y > canvas.height - ballRadius || this.y < ballRadius) {
                this.y = this.y < ballRadius ? ballRadius : (canvas.height - ballRadius);
                this.vy = -this.vy;
            }
            if (this.x > canvas.width - ballRadius || this.x < ballRadius) {
                this.x = this.x < ballRadius ? ballRadius : (canvas.width - ballRadius);
                this.vx = -this.vx;
            }
            //接收的参数t是时间, 每t时间更新一下位置, 重新绘制一下.
            //其实这里有问题, 往下看看requestAnimationFrame是根据显示器刷新频率来决定频率的。
            //所以这个t 不是真的t。。。只是用来更新位置用
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

                        let ax = ((b1.vx - b2.vx) * Math.pow((b1.x - b2.x), 2) +
                            (b1.vy - b2.vy) * (b1.x - b2.x) * (b1.y - b2.y)) / Math.pow(rc, 2);
                        let ay = ((b1.vy - b2.vy) * Math.pow((b1.y - b2.y), 2) +
                            (b1.vx - b2.vx) * (b1.x - b2.x) + (b1.y - b2.y)) / Math.pow(rc, 2);

                        b1.vx = (b1.vx - ax) * collarg;
                        b1.vy = (b1.vy - ay) * collarg;
                        b2.vx = (b2.vx + ax) * collarg;
                        b2.vy = (b2.vy + ay) * collarg;

                        //这里有个坑, 如果仅仅改变速度就完蛋了, 因为再来一帧还有可能继续碰撞
                        //所以需要立马把两个球分开
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