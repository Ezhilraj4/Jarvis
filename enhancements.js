(() => {
  const art = document.querySelector('.hero-art');
  const orb = art?.querySelector('.orb');
  if (!art || !orb) return;
  const identity = document.createElement('div');
  identity.className = 'identity';
  identity.setAttribute('aria-hidden', 'true');
  identity.innerHTML = '<svg viewBox="0 0 240 250" role="presentation"><path class="glyph-glow" d="M74 44 H175 V160 C175 207 146 225 103 225 C72 225 48 214 33 192"/><path class="glyph-edge" d="M74 44 H175 V160 C175 207 146 225 103 225 C72 225 48 214 33 192"/><path class="glyph-inset" d="M74 44 H175 V160 C175 207 146 225 103 225 C72 225 48 214 33 192"/></svg>';
  orb.append(identity);
  for (let i = 0; i < 2; i++) {
    const trace = document.createElement('div');
    trace.className = 'trace';
    trace.setAttribute('aria-hidden', 'true');
    orb.append(trace);
  }
  const caption = document.createElement('span');
  caption.className = 'core-caption';
  caption.textContent = 'Jarvis intelligence core';
  orb.append(caption);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let frame = 0;
  art.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const rect = art.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      orb.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg');
      orb.style.setProperty('--rx', (-y * 12).toFixed(2) + 'deg');
      frame = 0;
    });
  });
  art.addEventListener('pointerleave', () => {
    orb.style.setProperty('--rx', '0deg');
    orb.style.setProperty('--ry', '0deg');
  });
})();
