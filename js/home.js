/* Pagina inicial: renderiza o radar de exemplo (Republica). */
document.addEventListener('DOMContentLoaded', function () {
  const alvo = document.getElementById('radar-exemplo')
  if (!alvo) return
  const b = getBairro('republica')
  const score = calcularIcau(b.fatores)
  alvo.innerHTML = svgRadar(b.fatores, corPorScore(score))
  const legenda = document.getElementById('exemplo-score')
  if (legenda) {
    legenda.textContent = 'ICAU ' + score.toFixed(1) + ' / 100 \u00b7 ' + classificarFaixa(score)
    legenda.style.color = corPorScore(score)
  }
})
