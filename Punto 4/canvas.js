let d = document.getElementById('dibujo');
let lienzo = d.getContext('2d');

let ancho = d.width;
let alto = d.height;

let archivos = {
    fondo: "fondo.jpeg",
    mapache: "mapache.png",
    piso: "piso.png",
    nube: "nube.png",
    cono: "cono.png",
    policia: "policia.png"
};

let nombres = Object.keys(archivos);
let imagenes = {};
let cargadas = 0;

for (let i = 0; i < nombres.length; i++) {
    CargarImagen(nombres[i]);
}

function CargarImagen(nombre) {
    let img = new Image();
    img.onload = function () {
        cargadas++;
        if (cargadas == nombres.length) {
            Iniciar();
        }
    };
    img.src = "img/" + archivos[nombre];
    imagenes[nombre] = img;
}

let altoPiso = 42;
let pisoX = 0;
let velEscenario = 1280 / 3;
let parado = false;

let anchoMapache = 84;
let altoMapache = 112;
let mapachePosX = 42;
let sueloY = 22;
let mapachePosY = sueloY;
let velY = 0;
let impulso = 900;
let gravedad = 2500;
let saltando = false;

let fotograma = 0;
let tiempoFotograma = 0;
let duracionFotograma = 0.125;

let margenArriba = 38;
let margenAbajo = 15;
let margenIzq = 20;
let margenDer = 30;


// nubes

let nubes = [];
let anchoNube = 92;
let altoNube = 26;
let velNube = 0.5;
let minNubeY = 100;
let maxNubeY = 230;
let tiempoHastaNube = 0.5;
let tiempoNubeMin = 0.7;
let tiempoNubeMax = 2.7;


// obstaculos

// rx, ry, rAncho y rAlto son el recorte dentro del png, porque las dos
// imagenes vienen de 500x500 con mucho espacio vacio alrededor
let tiposObstaculo = [
    { imagen: "cono",    rx: 76, ry: 80,  rAncho: 347, rAlto: 378, ancho: 55,  alto: 60 },
    { imagen: "policia", rx: 60, ry: 154, rAncho: 380, rAlto: 203, ancho: 109, alto: 58 }
];

let obstaculos = [];
let obstaculoY = 16;
let tiempoHastaObstaculo = 2;
let tiempoObstaculoMin = 0.7;
let tiempoObstaculoMax = 1.8;



// bucle -------------------

let tiempo = new Date();
let deltaTime = 0;

function Iniciar() {
    lienzo.imageSmoothingEnabled = false; // los sprites son pixel art
    document.addEventListener("keydown", Tecla);
    tiempo = new Date();
    Bucle();
}

function Bucle() {
    deltaTime = (new Date() - tiempo) / 1000;
    if (deltaTime > 0.1) {
        deltaTime = 0.1; // si se cambia de pestaña no se teletransporta todo
    }
    tiempo = new Date();
    Actualizar();
    Dibujar();
    requestAnimationFrame(Bucle);
}

function Tecla(ev) {
    if (ev.keyCode == 32) {
        ev.preventDefault(); // para que la barra no mueva la pagina
        Saltar();
    }
}


// logica
function Actualizar() {
    if (parado) return;

    AnimarMapache();
    MoverMapache();
    MoverPiso();
    DecidirCrearObstaculos();
    DecidirCrearNubes();
    MoverObstaculos();
    MoverNubes();
    DetectarColision();

    velY -= gravedad * deltaTime;
}

function Saltar() {
    if (parado) return;
    if (mapachePosY === sueloY) {
        saltando = true;
        velY = impulso;
    }
}

function MoverMapache() {
    mapachePosY += velY * deltaTime;
    if (mapachePosY < sueloY) {
        mapachePosY = sueloY;
        velY = 0;
        saltando = false;
    }
}

function AnimarMapache() {
    if (saltando) return;
    tiempoFotograma += deltaTime;
    if (tiempoFotograma >= duracionFotograma) {
        tiempoFotograma -= duracionFotograma;
        fotograma = (fotograma + 1) % 2;
    }
}

function MoverPiso() {
    pisoX += Desplazamiento();
}

function Desplazamiento() {
    return velEscenario * deltaTime;
}

function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;
    if (tiempoHastaObstaculo <= 0) {
        CrearObstaculo();
    }
}

function CrearObstaculo() {
    let tipo = tiposObstaculo[Math.floor(Math.random() * tiposObstaculo.length)];
    obstaculos.push({ x: ancho, tipo: tipo });
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin);
}

function MoverObstaculos() {
    for (let i = obstaculos.length - 1; i >= 0; i--) {
        obstaculos[i].x -= Desplazamiento();
        if (obstaculos[i].x < -obstaculos[i].tipo.ancho) {
            obstaculos.splice(i, 1);
        }
    }
}

function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime;
    if (tiempoHastaNube <= 0) {
        CrearNube();
    }
}

function CrearNube() {
    nubes.push({ x: ancho, y: minNubeY + Math.random() * (maxNubeY - minNubeY) });
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin);
}

function MoverNubes() {
    for (let i = nubes.length - 1; i >= 0; i--) {
        nubes[i].x -= Desplazamiento() * velNube;
        if (nubes[i].x < -anchoNube) {
            nubes.splice(i, 1);
        }
    }
}

function CajaMapache() {
    return {
        x: mapachePosX + margenIzq,
        y: mapachePosY + margenAbajo,
        ancho: anchoMapache - margenIzq - margenDer,
        alto: altoMapache - margenArriba - margenAbajo
    };
}

function DetectarColision() {
    let caja = CajaMapache();
    for (let i = 0; i < obstaculos.length; i++) {
        let o = obstaculos[i];
        if (o.x > caja.x + caja.ancho) break; // van en orden, los de atras tampoco chocan
        let cajaObstaculo = { x: o.x, y: obstaculoY, ancho: o.tipo.ancho, alto: o.tipo.alto };
        if (Colisionan(caja, cajaObstaculo)) {
            parado = true;
        }
    }
}

function Colisionan(a, b) {
    return a.x < b.x + b.ancho &&
           a.x + a.ancho > b.x &&
           a.y < b.y + b.alto &&
           a.y + a.alto > b.y;
}

// ------------------- dibujo -------------------

function Dibujar() {
    DibujarFondo();
    DibujarNubes();
    DibujarPiso();
    DibujarObstaculos();
    DibujarMapache();
    if (parado) {
        DibujarGameOver();
    }
}

function DibujarFondo() {
    lienzo.drawImage(imagenes["fondo"], 0, 0, ancho, alto);
}

function DibujarPiso() {
    let x = -(pisoX % ancho);
    lienzo.drawImage(imagenes["piso"], x, alto - altoPiso, ancho, altoPiso);
    lienzo.drawImage(imagenes["piso"], x + ancho, alto - altoPiso, ancho, altoPiso);
}

function DibujarNubes() {
    for (let i = 0; i < nubes.length; i++) {
        lienzo.drawImage(imagenes["nube"], nubes[i].x, alto - nubes[i].y - altoNube, anchoNube, altoNube);
    }
}

function DibujarObstaculos() {
    for (let i = 0; i < obstaculos.length; i++) {
        let o = obstaculos[i];
        lienzo.drawImage(imagenes[o.tipo.imagen],
            o.tipo.rx, o.tipo.ry, o.tipo.rAncho, o.tipo.rAlto,
            o.x, alto - obstaculoY - o.tipo.alto, o.tipo.ancho, o.tipo.alto);
    }
}

function DibujarMapache() {
    let actual = fotograma;
    if (saltando) actual = 2;
    if (parado) actual = 3;

    let anchoHoja = imagenes["mapache"].width / 4;
    let altoHoja = imagenes["mapache"].height;

    lienzo.drawImage(imagenes["mapache"],
        actual * anchoHoja, 0, anchoHoja, altoHoja,
        mapachePosX, alto - mapachePosY - altoMapache, anchoMapache, altoMapache);
}

function DibujarGameOver() {
    lienzo.fillStyle = "#7e928b";
    lienzo.font = "bold 30px Verdana";
    lienzo.textAlign = "center";
    lienzo.fillText("GAME OVER", ancho / 2, alto / 2);
}
