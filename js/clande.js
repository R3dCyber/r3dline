document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.altKey && e.code === 'KeyC') {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  document.body.classList.add('clandestino');
  const mensaje = document.createElement('div');
  mensaje.textContent = '🕶️ Modo Clandestino Activado';
  mensaje.className = 'egg-message';
  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 4000);
}
