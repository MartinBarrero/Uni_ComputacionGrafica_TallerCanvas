let d = document.getElementById('dibujo');
let lienzo = d.getContext('2d');

/*
lienzo.strokeStyle = "blue";
lienzo.beginPath();
lienzo.moveTo(250, 0);
lienzo.lineTo(250,500);
lienzo.moveTo(0, 250);
lienzo.lineTo(500,250);
lienzo.stroke();
*/

/*
lienzo.strokeStyle = "red";
lienzo.beginPath();
lienzo.moveTo(0, 300);
lienzo.lineTo(500,300);
lienzo.stroke();
*/

lienzo.strokeStyle = "red";
lienzo.beginPath();
lienzo.moveTo(0, 350);
lienzo.lineTo(500,350);
lienzo.stroke();

lienzo.strokeStyle = "black";
lienzo.beginPath();
lienzo.moveTo(250, 350);
lienzo.lineTo(490,300);
lienzo.lineTo(490,200);
lienzo.lineTo(250,250);
lienzo.lineTo(250,350);
lienzo.lineTo(5,300);
lienzo.lineTo(5,200);
lienzo.lineTo(250,250);
lienzo.lineTo(5,200);
lienzo.lineTo(250,150);
lienzo.lineTo(490,200);
lienzo.stroke();

lienzo.strokeStyle = "black";
lienzo.beginPath();
lienzo.moveTo(250, 170);
lienzo.lineTo(90, 200);
lienzo.lineTo(250, 230);
lienzo.lineTo(410, 200);
lienzo.lineTo(250, 170);
lienzo.lineTo(250, 230);
lienzo.stroke();