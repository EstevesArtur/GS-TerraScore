/* Contato: validacao real do formulario (campos vazios, e-mail, mensagens). */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-contato')
  if (!form) return
  const sucesso = document.getElementById('form-sucesso')

  function mostrarErro(campo, msg) {
    const input = document.getElementById(campo)
    const erro = document.getElementById('erro-' + campo)
    if (input) input.classList.add('invalido')
    if (erro) erro.textContent = msg
  }
  function limparErro(campo) {
    const input = document.getElementById(campo)
    const erro = document.getElementById('erro-' + campo)
    if (input) input.classList.remove('invalido')
    if (erro) erro.textContent = ''
  }

  // limpa erro ao digitar
  const campos = ['nome', 'email', 'mensagem']
  for (let i = 0; i < campos.length; i++) {
    const el = document.getElementById(campos[i])
    if (el) el.addEventListener('input', function () { limparErro(campos[i]); if (sucesso) sucesso.textContent = '' })
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault()
    let ok = true
    const nome = document.getElementById('nome').value.trim()
    const email = document.getElementById('email').value.trim()
    const mensagem = document.getElementById('mensagem').value.trim()

    if (!nome) { mostrarErro('nome', 'Informe seu nome.'); ok = false } else { limparErro('nome') }

    if (!email) { mostrarErro('email', 'Informe seu e-mail.'); ok = false }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { mostrarErro('email', 'E-mail invalido.'); ok = false }
    else { limparErro('email') }

    if (!mensagem) { mostrarErro('mensagem', 'Escreva sua mensagem.'); ok = false }
    else if (mensagem.length < 10) { mostrarErro('mensagem', 'Mensagem muito curta (minimo 10 caracteres).'); ok = false }
    else { limparErro('mensagem') }

    if (ok) {
      form.reset()
      if (sucesso) sucesso.textContent = 'Mensagem validada e enviada com sucesso. Obrigado pelo contato!'
    }
  })
})
