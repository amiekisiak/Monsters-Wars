window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'white'; //defined outside of any class or method, this code will run just once
    ctx.lineWidth = 3;  //changing canvas state should be done as little as possible
    ctx.strokeStyle = 'white';

    class Player {
        constructor(game) {
            this.game = game;
            this.collisionX = this.game.width * 0.5;
            this.collisionY = this.game.height * 0.5;
            this.collisionRadius = 30;

        }
        draw(context) {
            context.beginPath()
            context.arc(this.collisonX, this.collisionY, this.collisionRadius, 100, 100, 50, 0, Math.PI * 2);
            context.save(); //wrapping it so not every object is semi-transparent, it is a snapshot of the current canvas state
            context.globalAlpha = 0.5; // because it is wrapped between save and restore affects on this speacific action
            context.fill();
            context.restore(); // restoring to the previous point
            context.stroke(); // this won't be affected by reduced opacity
        }
        update() {
            this.collisionX = this.game.mouse.x;
            this.collisionY = this.game.mouse.y;
        }

    }


    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.palyer = new Player(this);
            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false

            }

            //event listeners


            canvas.addEventListener('mousedown', (e) => {
                this.mouse.x = e.offesetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = true;


            });
            canvas.addEventListener('mouseup', (e) => {
                this.mouse.x = e.offesetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = false;
            });
            canvas.addEventListener('mousemove', (e) => {
                this.mouse.x = e.offesetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = false;
            });

        }

        render(context) {
            this.player.draw(context);
            this.player.update();
        }
    }

    const game = new Game(canvas);
    game.render(ctx);
    console.log(game);


    function animate() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);


    }
    animate();

});


