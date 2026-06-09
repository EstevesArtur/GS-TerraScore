/* Simulador: aplica ganhos de uma intervencao e mostra o delta de ICAU. */
document.addEventListener('DOMContentLoaded', function () {
  const selBairro = document.getElementById('sel-bairro')
  const elBotoes = document.getElementById('intervencao-botoes')
  const elDesc = document.getElementById('intervencao-desc')
  const elAntes = document.getElementById('res-antes')
  const elDepois = document.getElementById('res-depois')
  const elDelta = document.getElementById('res-delta')
  const elFatores = document.getElementById('res-fatores')
  if (!selBairro || !elBotoes) return

  let tipo = 'ARBORIZACAO'

  // popular bairros
  let opts = ''
  for (let i = 0; i < BAIRROS.length; i++) {
    opts += '<option value="' + BAIRROS[i].id + '">' + BAIRROS[i].nome + ' \u00b7 ' + BAIRROS[i].cidade + '</option>'
  }
  selBairro.innerHTML = opts

  // botoes de intervencao
  const tipos = Object.keys(INTERVENCOES)
  let bhtml = ''
  for (let i = 0; i < tipos.length; i++) {
    bhtml += '<button type="button" class="opcao" data-tipo="' + tipos[i] + '">' + INTERVENCOES[tipos[i]].label + '</button>'
  }
  elBotoes.innerHTML = bhtml
  const botoes = elBotoes.querySelectorAll('.opcao')
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', function () { tipo = this.getAttribute('data-tipo'); atualizar() })
  }

  function atualizar() {
    const b = getBairro(selBairro.value)
    const r = simularIntervencao(b.fatores, tipo)
    // marcar botao ativo
    for (let i = 0; i < botoes.length; i++) {
      botoes[i].classList.toggle('opcao-ativa', botoes[i].getAttribute('data-tipo') === tipo)
    }
    elDesc.textContent = INTERVENCOES[tipo].desc
    elAntes.innerHTML = htmlScoreBadge(r.antes, 'lg') + '<p class="muted">' + classificarFaixa(r.antes) + '</p>'
    elDepois.innerHTML = htmlScoreBadge(r.depois, 'lg')
    elDelta.textContent = '+' + r.delta + ' pontos \u00b7 ' + classificarFaixa(r.depois)
    elFatores.innerHTML = htmlFatorBars(r.novos, null)
  }

  selBairro.addEventListener('change', atualizar)
  selBairro.value = 'republica'
  atualizar()
})
/* Implementa o simulador de intervenções urbanas, calculando impactos e exibindo comparações antes e depois. */
