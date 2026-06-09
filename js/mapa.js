/* Mapa ICAU: mapa SVG interativo + painel com a decomposicao dos 7 fatores. */
document.addEventListener('DOMContentLoaded', function () {
  const elMapa = document.getElementById('mapa-root')
  const elPainel = document.getElementById('painel-bairro')
  const elLegenda = document.getElementById('mapa-legenda')
  if (!elMapa || !elPainel) return

  let selecionado = BAIRROS[0].id
  if (elLegenda) elLegenda.innerHTML = htmlLegenda()

  function desenharMapa() {
    elMapa.innerHTML = svgMapa(selecionado)
    const grupos = elMapa.querySelectorAll('.mapa-bairro')
    for (let i = 0; i < grupos.length; i++) {
      const g = grupos[i]
      g.addEventListener('click', function () { selecionar(this.getAttribute('data-id')) })
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selecionar(this.getAttribute('data-id')) }
      })
    }
  }

  function selecionar(id) {
    selecionado = id
    desenharMapa()
    desenharPainel()
  }

  function desenharPainel() {
    const b = getBairro(selecionado)
    const score = calcularIcau(b.fatores)
    const dom = fatorDominante(b.fatores)
    elPainel.innerHTML =
      '<p class="eyebrow">' + b.nome + ' \u00b7 ' + b.cidade + '</p>' +
      htmlScoreBadge(score, 'lg') +
      '<p class="muted">Fator dominante (prioridade de intervencao): <strong>' + FATOR_INFO[dom].label + '</strong>.</p>' +
      '<hr class="sep"/>' +
      '<h3>Decomposicao dos 7 fatores</h3>' +
      htmlFatorBars(b.fatores, dom) +
      '<p class="mt"><a class="btn btn-ghost" href="simulador.html">Simular intervencao</a></p>'
  }

  desenharMapa()
  desenharPainel()
})
/* Controla o mapa interativo, permitindo selecionar bairros e visualizar seus indicadores e resultados ICAU. */
