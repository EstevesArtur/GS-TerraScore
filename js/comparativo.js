/*
  Módulo responsável pela comparação de dois bairros.

  Funcionalidades:
  - Popula os selects com os bairros disponíveis.
  - Permite selecionar dois bairros para comparação.
  - Calcula o ICAU de cada bairro com base em seus fatores.
  - Exibe a pontuação de cada bairro.
  - Gera um veredito indicando qual bairro possui melhor ICAU e a diferença entre eles.
*/

document.addEventListener('DOMContentLoaded', function () {
  const selA = document.getElementById('sel-a')
  const selB = document.getElementById('sel-b')
  const radarA = document.getElementById('radar-a')
  const radarB = document.getElementById('radar-b')
  const badgeA = document.getElementById('badge-a')
  const badgeB = document.getElementById('badge-b')
  const veredito = document.getElementById('veredito')
  if (!selA || !selB) return

  // Popular os selects com os bairros cadastrados
  let opts = ''
  for (let i = 0; i < BAIRROS.length; i++) {
    opts += '<option value="' + BAIRROS[i].id + '">' + BAIRROS[i].nome + ' · ' + BAIRROS[i].cidade + '</option>'
  }

  selA.innerHTML = opts
  selB.innerHTML = opts
  selA.value = 'republica'
  selB.value = 'marsilac'

  function atualizar() {
    const bA = getBairro(selA.value)
    const bB = getBairro(selB.value)

    const sA = calcularIcau(bA.fatores)
    const sB = calcularIcau(bB.fatores)

    radarA.innerHTML = svgRadar(bA.fatores, corPorScore(sA))
    radarB.innerHTML = svgRadar(bB.fatores, corPorScore(sB))

    badgeA.innerHTML = htmlScoreBadge(sA, 'md')
    badgeB.innerHTML = htmlScoreBadge(sB, 'md')

    if (sA === sB) {
      veredito.innerHTML = 'Os dois bairros têm o mesmo ICAU.'
    } else {
      const vencedor = sA > sB ? bA : bB
      const dif = Math.abs(Math.round((sA - sB) * 10) / 10)
      const cor = corPorScore(calcularIcau(vencedor.fatores))

      veredito.innerHTML =
        '<strong style="color:' + cor + '">' +
        vencedor.nome +
        '</strong> tem o melhor ICAU, com vantagem de <strong>' +
        dif +
        '</strong> pontos.'
    }
  }

  selA.addEventListener('change', atualizar)
  selB.addEventListener('change', atualizar)

  atualizar()
})