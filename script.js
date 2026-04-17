const canvas = document.getElementById("fire");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 200;

let flames = [];

class Flame {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * -3 - 2;
        this.opacity = 1;
    }

    update() {
        this.y += this.speedY;
        this.size *= 0.96;
        this.opacity -= 0.02;
    }

    draw() {
        ctx.save();

        ctx.globalAlpha = this.opacity;

        let gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );

        gradient.addColorStop(0, "rgba(138, 43, 226, 0.9)");
        gradient.addColorStop(0.5, "rgba(75, 0, 130, 0.6)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();

        // formato de chama (tipo gota)
        ctx.moveTo(this.x, this.y);
        ctx.quadraticCurveTo(
            this.x + this.size / 2,
            this.y - this.size,
            this.x,
            this.y - this.size * 1.5
        );
        ctx.quadraticCurveTo(
            this.x - this.size / 2,
            this.y - this.size,
            this.x,
            this.y
        );

        ctx.fill();
        ctx.restore();
    }
}

function createFlames() {
    for (let i = 0; i < 3; i++) {
        flames.push(new Flame());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createFlames();

    flames.forEach((f, index) => {
        f.update();
        f.draw();

        if (f.opacity <= 0) {
            flames.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();