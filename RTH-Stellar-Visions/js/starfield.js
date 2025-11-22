const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let scrollOffset = 0;

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random()*width;
        this.y = Math.random()*height;
        this.size = Math.random()*2;
        this.opacity = Math.random();
        this.opacityChange = Math.random()*0.02;
        this.depth = Math.random();
    }
    update() { this.opacity += this.opacityChange; if(this.opacity>1||this.opacity<0) this.opacityChange*=-1; }
    draw() {
        const yOffset = scrollOffset*this.depth*0.3;
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y+yOffset, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

class ShootingStar {
    constructor() { this.reset(); }
    reset() { this.x=Math.random()*width; this.y=Math.random()*height/2; this.len=Math.random()*200+100; this.speed=Math.random()*10+6; this.angle=Math.PI/4; this.opacity=1; }
    update() { this.x+=Math.cos(this.angle)*this.speed; this.y+=Math.sin(this.angle)*this.speed; this.opacity-=0.01; if(this.opacity<=0) this.reset(); }
    draw() {
        const yOffset = scrollOffset*0.2;
        ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x,this.y+yOffset);
        ctx.lineTo(this.x-Math.cos(this.angle)*this.len,this.y-Math.sin(this.angle)*this.len+yOffset);
        ctx.stroke();
    }
}

for(let i=0;i<300;i++) stars.push(new Star());
for(let i=0;i<3;i++) shootingStars.push(new ShootingStar());

function animate() {
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0,0,width,height);
    stars.forEach(s=>{s.update(); s.draw();});
    shootingStars.forEach(s=>{s.update(); s.draw();});
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('scroll', ()=>{scrollOffset=window.scrollY;});
window.addEventListener('resize', ()=>{width=canvas.width=window.innerWidth;height=canvas.height=window.innerHeight;});

