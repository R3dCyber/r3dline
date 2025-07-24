// Partículas flotantes (estilo estrellas verdes)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speedY: Math.random() * 0.5 + 0.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'lime';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.speedY;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Consola y comandos
const output = document.getElementById('console-output');
const input = document.getElementById('console-input');

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const comando = input.value.trim().toLowerCase();
    procesarComando(comando);
    input.value = '';
  }
});

function escribir(texto) {
  output.innerHTML += `> ${texto}\n`;
  output.scrollTop = output.scrollHeight;
}

let juegoActivo = false;
let historiaActiva = false;
let etapaHistoria = 0;
let numeroSecreto = 0;

function procesarComando(cmd) {
  if (historiaActiva) {
    procesarHistoria(cmd);
    return;
  }

  switch(cmd) {
    case 'help':
      escribir("Comandos disponibles:\n- hack\n- clear\n- juego\n- historia\n- volver");
      break;

    case 'hack':
      escribir("📡 Rastreo iniciado... filtrando IPs sospechosas... 🌐");
      break;

    case 'clear':
      output.innerHTML = '';
      break;

    case 'volver':
      location.href = 'index.html';
      break;

    case 'juego':
      juegoActivo = true;
      numeroSecreto = Math.floor(Math.random() * 5) + 1;
      escribir("🎮 Adivina el número entre 1 y 5:");
      break;

    case 'historia':
      historiaActiva = true;
      etapaHistoria = 1;
      escribir("🌌 Iniciando aventura...\nHas entrado en un nodo abandonado del ciberespacio.\n¿Explorar [sistema] o [salir]?");
      break;

    default:
      if (juegoActivo) {
        let intento = parseInt(cmd);
        if (intento === numeroSecreto) {
          escribir("✅ ¡Correcto! Has vencido al sistema.");
        } else {
          escribir("❌ Fallaste. Usa 'juego' para intentar otra vez.");
        }
        juegoActivo = false;
      } else {
        escribir(`Comando no reconocido: ${cmd}`);
      }
  }
}

// Aventura de texto interactiva
function procesarHistoria(cmd) {
  switch(etapaHistoria) {
    case 1:
      if (cmd === 'sistema') {
        etapaHistoria = 2;
        escribir("📂 Accediendo al sistema...\nEncontraste un archivo cifrado: 'r3dprotocol.bin'.\n¿[abrir] o [borrar]?");
      } else if (cmd === 'salir') {
        escribir("🔒 Saliste del nodo. Fin de la aventura.");
        historiaActiva = false;
      } else {
        escribir("❓ Comando inválido. Escribe [sistema] o [salir].");
      }
      break;

    case 2:
      if (cmd === 'abrir') {
        etapaHistoria = 3;
        escribir("🔓 Archivo descifrado...\nContenido: 'La verdad está en el código.'\n¿Descender al núcleo [sí] o [no]?");
      } else if (cmd === 'borrar') {
        escribir("🗑️ Archivo eliminado. El sistema queda en silencio... Fin de la historia.");
        historiaActiva = false;
      } else {
        escribir("❓ Comando inválido. Escribe [abrir] o [borrar].");
      }
      break;

    case 3:
      if (cmd === 'si') {
        escribir("🌐 Has llegado al Núcleo...\n🎉 ¡Felicidades, desbloqueaste el nivel oculto! 🚀");
        historiaActiva = false;
      } else if (cmd === 'no') {
        escribir("🔒 Cerraste el acceso al núcleo. Quizás no era el momento.");
        historiaActiva = false;
      } else {
        escribir("❓ Comando inválido. Escribe [si] o [no].");
      }
      break;
  }
}
