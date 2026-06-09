/* Comparativo: dois radares lado a lado controlados por dois selects. */
document.addEventListener('DOMContentLoaded', function () {
  const selA = document.getElementById('sel-a')
  const selB = document.getElementById('sel-b')
  const radarA = document.getElementById('radar-a')
  const radarB = document.getElementById('radar-b')
  const badgeA = document.getElementById('badge-a')
  const badgeB = document.getElementById('badge-b')
  const veredito = document.getElementById('veredito')
  if (!selA || !selB) return

  // popular selects
  let opts = ''
  for (let i = 0; i < BAIRROS.length; i++) {
    opts += '<option value="' + BAIRROS[i].id + '">' + BAIRROS[i].nome + ' \u00b7 ' + BAIRROS[i].cidade + '</option>'
  }
  selA.innerHTML = opts
  selB.innerHTML = opts
  selA.value = 'republica'
  selB.value = 'marsilac'

  function atualizar() {
    const bA = getBairro(selA.value), bB = getBairro(selB.value)
    const sA = calcularIcau(bA.fatores), sB = calcularIcau(bB.fatores)
    radarA.innerHTML = svgRadar(bA.fatores, corPorScore(sA))
    radarB.innerHTML = svgRadar(bB.fatores, corPorScore(sB))
    badgeA.innerHTML = htmlScoreBadge(sA, 'md')
    badgeB.innerHTML = htmlScoreBadge(sB, 'md')
    if (sA === sB) {
      veredito.innerHTML = 'Os dois bairros tem o mesmo ICAU.'
    } else {
      const vencedor = sA > sB ? bA : bB
      const dif = Math.abs(Math.round((sA - sB) * 10) / 10)
      const cor = corPorScore(calcularIcau(vencedor.fatores))
      veredito.innerHTML = '<strong style="color:' + cor + '">' + vencedor.nome + '</strong> tem o melhor ICAU, com vantagem de <strong>' + dif + '</strong> pontos.'
    }
  }

  selA.addEventListener('change', atualizar)
  selB.addEventListener('change', atualizar)
  atualizar()
})
