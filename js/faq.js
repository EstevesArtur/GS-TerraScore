/* FAQ: acordeon (abre/fecha respostas). */
document.addEventListener('DOMContentLoaded', function () {
  const botoes = document.querySelectorAll('.faq-botao')
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', function () {
      const item = this.parentElement
      const aberto = item.classList.toggle('aberto')
      this.setAttribute('aria-expanded', aberto ? 'true' : 'false')
      const sinal = this.querySelector('.faq-sinal')
      if (sinal) sinal.textContent = aberto ? '\u2013' : '+'
    })
  }
})
