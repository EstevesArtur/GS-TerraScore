/* ==========================================================================
   TerraScore - comportamento comum: menu hamburguer e marcacao da pagina ativa.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  // menu hamburguer
  const botao = document.querySelector('.hamburguer')
  const nav = document.querySelector('.nav-links')
  if (botao && nav) {
    botao.addEventListener('click', function () {
      const aberto = nav.classList.toggle('aberto')
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false')
    })
    // fecha ao clicar num link (mobile)
    const links = nav.querySelectorAll('a')
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        nav.classList.remove('aberto')
        botao.setAttribute('aria-expanded', 'false')
      })
    }
  }

  // link ativo conforme arquivo atual
  let atual = window.location.pathname.split('/').pop()
  if (!atual) atual = 'index.html'
  const navLinks = document.querySelectorAll('.nav-links a')
  for (let i = 0; i < navLinks.length; i++) {
    const href = navLinks[i].getAttribute('href')
    if (href === atual) {
      navLinks[i].classList.add('ativo')
      navLinks[i].setAttribute('aria-current', 'page')
    }
  }

  // ano no rodape
  const ano = document.querySelector('.ano-atual')
  if (ano) ano.textContent = new Date().getFullYear()
})
/* Gerencia funcionalidades globais da interface, como menu responsivo, navegação ativa e atualização do rodapé. */