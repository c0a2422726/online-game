const socket = io();

let x = 100;
let y = 100;

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowUp") y-=10;
    if(e.key==="ArrowDown") y+=10;
    if(e.key==="ArrowLeft") x-=10;
    if(e.key==="ArrowRight") x+=10;

    socket.emit("move",{x,y});
});

socket.on("players",(players)=>{

    document.getElementById("game").innerHTML="";

    for(const id in players){

        const p=document.createElement("div");
        p.className="player";

        p.style.left=players[id].x+"px";
        p.style.top=players[id].y+"px";

        document.getElementById("game").appendChild(p);

    }

});