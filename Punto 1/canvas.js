let d = document.getElementById('dibujo');
let lienzo = d.getContext('2d');

/*
lienzo.beginPath();
lienzo.moveTo(250, 0);
lienzo.lineTo(250,500);
lienzo.moveTo(0, 250);
lienzo.lineTo(500,250);
lienzo.stroke();
*/

lienzo.strokeStyle = "green",
lienzo.beginPath();
lienzo.arc(150, 150, 150, 0, 2 * Math.PI);
lienzo.stroke();

lienzo.strokeStyle = "blue",
lienzo.beginPath();
lienzo.arc(250, 350, 150, 0, 2 * Math.PI);
lienzo.stroke();

lienzo.strokeStyle = "red",
lienzo.beginPath();
lienzo.arc(350, 150, 150, 0, 2 * Math.PI);
lienzo.stroke();