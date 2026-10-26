let d = document.getElementById('dibujo');
let lienzo = d.getContext('2d');

lienzo.strokeStyle = "blue";
lienzo.beginPath();
lienzo.moveTo(250, 0);
lienzo.lineTo(250,500);
lienzo.moveTo(0, 250);
lienzo.lineTo(500,250);
lienzo.stroke();

lienzo.strokeStyle = "red";
lienzo.beginPath();
lienzo.moveTo(150, 250);
lienzo.lineTo(350, 250);
lienzo.lineTo(250, 100);
lienzo.lineTo(150, 250);
lienzo.stroke();


let d2 = document.getElementById('dibujo2');
let lienzo2 = d2.getContext('2d');

lienzo2.strokeStyle = "blue";
lienzo2.beginPath();
lienzo2.moveTo(250, 0);
lienzo2.lineTo(250,500);
lienzo2.moveTo(0, 250);
lienzo2.lineTo(500,250);
lienzo2.stroke();

lienzo2.strokeStyle = "red";
lienzo2.beginPath();
lienzo2.moveTo(100, 250);
lienzo2.lineTo(400, 250);
lienzo2.lineTo(400, 100);
lienzo2.lineTo(100, 100);
lienzo2.lineTo(100, 250);
lienzo2.stroke();


let d3 = document.getElementById('dibujo3');
let lienzo3 = d3.getContext('2d');

lienzo3.strokeStyle = "blue";
lienzo3.beginPath();
lienzo3.moveTo(250, 0);
lienzo3.lineTo(250,500);
lienzo3.moveTo(0, 250);
lienzo3.lineTo(500,250);
lienzo3.stroke();

lienzo3.strokeStyle = "red";
lienzo3.beginPath();
lienzo3.moveTo(100, 250);
lienzo3.lineTo(400, 250);
lienzo3.lineTo(350, 100);
lienzo3.lineTo(150, 100);
lienzo3.lineTo(100, 250);
lienzo3.stroke();

let d4 = document.getElementById('dibujo4');
let lienzo4 = d4.getContext('2d');

lienzo4.strokeStyle = "blue";
lienzo4.beginPath();
lienzo4.moveTo(250, 0);
lienzo4.lineTo(250,500);
lienzo4.moveTo(0, 250);
lienzo4.lineTo(500,250);
lienzo4.stroke();

lienzo4.strokeStyle = "red";
lienzo4.beginPath();
lienzo4.moveTo(150, 350);
lienzo4.lineTo(350, 350);
lienzo4.lineTo(400, 250);
lienzo4.lineTo(350, 150);
lienzo4.lineTo(150, 150);
lienzo4.lineTo(100, 250);
lienzo4.lineTo(150, 350);
lienzo4.stroke();