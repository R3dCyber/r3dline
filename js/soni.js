document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.altKey && e.code === 'KeyC') {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  document.body.classList.add('clandestino');

  // Mostrar mensaje
  const mensaje = document.createElement('div');
  mensaje.textContent = '🕶️ Modo Clandestino Activado';
  mensaje.className = 'egg-message';
  document.body.appendChild(mensaje);

  // Reproducir sonido
  const audio = new Audio('access.mp3'); // Debes tener este archivo en tu carpeta
  audio.play();

  // Animación hexadecimal
  const hexContainer = document.createElement('div');
  hexContainer.className = 'hex-stream';
  for (let i = 0; i < 50; i++) {
    const hexChar = document.createElement('span');
    hexChar.textContent = Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase();
    hexContainer.appendChild(hexChar);
  }
  document.body.appendChild(hexContainer);

  setTimeout(() => {
    mensaje.remove();
    hexContainer.remove();
    document.body.classList.remove('clandestino');
  }, 6000);
}
