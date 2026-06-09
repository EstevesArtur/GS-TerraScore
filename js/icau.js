/* ==========================================================================
   TerraScore - logica do ICAU (espelha o terrascore_cli.py)
     score = media ponderada dos valores normalizados (0-100, maior = melhor)
     fator dominante = indicador de MENOR valor (o pior)
     faixas: <30 CRITICA | <50 RUIM | <75 MODERADA | >=75 BOA
     intervencao = soma ganhos (teto 100); delta = depois - antes
   Depende de dados.js (FATORES, PESOS, INTERVENCOES).
   ========================================================================== */

function calcularIcau(fatores) {
  let score = 0
  for (let i = 0; i < FATORES.length; i++) {
    const chave = FATORES[i]
    score += fatores[chave] * PESOS[chave]
  }
  return Math.round(score * 10) / 10
}

function fatorDominante(fatores) {
  let menor = Infinity
  let dominante = null
  for (let i = 0; i < FATORES.length; i++) {
    const chave = FATORES[i]
    if (fatores[chave] < menor) {
      menor = fatores[chave]
      dominante = chave
    }
  }
  return dominante
}

function classificarFaixa(score) {
  if (score < 30) return 'CRITICA'
  if (score < 50) return 'RUIM'
  if (score < 75) return 'MODERADA'
  return 'BOA'
}

// Cor da escala: 0 (critico) = vermelho -> 100 (saudavel) = verde
function corPorScore(score) {
  if (score < 30) return '#C0392B'
  if (score < 50) return '#E27A2E'
  if (score < 75) return '#E8B23B'
  return '#2E8B57'
}

function simularIntervencao(fatores, tipoChave) {
  const intervencao = INTERVENCOES[tipoChave]
  const novos = Object.assign({}, fatores)
  if (intervencao) {
    for (const chave in intervencao.ganhos) {
      novos[chave] = Math.min(100, novos[chave] + intervencao.ganhos[chave])
    }
  }
  const antes = calcularIcau(fatores)
  const depois = calcularIcau(novos)
  return {
    novos: novos,
    antes: antes,
    depois: depois,
    delta: Math.round((depois - antes) * 10) / 10
  }
}
