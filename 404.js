document.addEventListener('DOMContentLoaded', () => {
  const letters = document.querySelectorAll('.oops-letter');
  const exclamation = document.querySelector('.oops-exclamation');

  letters.forEach((letter, i) => {
    setTimeout(() => {
      letter.classList.add('visible');
    }, 200 + i * 180);
  });

  // Exclamation point appears after the last letter
  setTimeout(() => {
    exclamation.classList.add('visible');
  }, 200 + letters.length * 180);
}); 
