/* ==========================================================================
   TerraScore - helpers de renderizacao (SVG inline + HTML), sem libs externas.
   Depende de dados.js e icau.js.
   ========================================================================== */

// ---- Radar chart (SVG, 7 eixos, escala 0-100) ----
function svgRadar(fatores, cor) {
  const CX = 130, CY = 130, R = 92
  const n = FATORES.length
  function ponto(i, valor) {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n
    const raio = (valor / 100) * R
    return { x: CX + raio * Math.cos(ang), y: CY + raio * Math.sin(ang) }
  }
  let svg = '<svg viewBox="0 0 260 260" role="img" aria-label="Radar dos 7 fatores">'
  // aneis
  const aneis = [25, 50, 75, 100]
  for (let a = 0; a < aneis.length; a++) {
    let pts = ''
    for (let i = 0; i < n; i++) { const p = ponto(i, aneis[a]); pts += p.x.toFixed(1) + ',' + p.y.toFixed(1) + ' ' }
    svg += '<polygon points="' + pts.trim() + '" fill="none" stroke="#3a332e" stroke-width="1"/>'
  }
  // eixos
  for (let i = 0; i < n; i++) { const f = ponto(i, 100); svg += '<line x1="' + CX + '" y1="' + CY + '" x2="' + f.x.toFixed(1) + '" y2="' + f.y.toFixed(1) + '" stroke="#3a332e" stroke-width="1"/>' }
  // poligono de valores
  let vpts = ''
  for (let i = 0; i < n; i++) { const p = ponto(i, fatores[FATORES[i]]); vpts += p.x.toFixed(1) + ',' + p.y.toFixed(1) + ' ' }
  svg += '<polygon points="' + vpts.trim() + '" fill="' + cor + '" fill-opacity="0.28" stroke="' + cor + '" stroke-width="2"/>'
  for (let i = 0; i < n; i++) { const p = ponto(i, fatores[FATORES[i]]); svg += '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="3" fill="' + cor + '"/>' }
  // rotulos
  for (let i = 0; i < n; i++) {
    const lab = ponto(i, 118), info = FATOR_INFO[FATORES[i]]
    svg += '<text x="' + lab.x.toFixed(1) + '" y="' + lab.y.toFixed(1) + '" fill="' + info.cor + '" font-size="11" font-family="ui-monospace, monospace" text-anchor="middle" dominant-baseline="middle">' + info.curto + '</text>'
  }
  svg += '</svg>'
  return svg
}

// ---- Barras dos fatores (HTML) ----
// chaves (opcional): subconjunto de fatores a exibir. Sem ela, exibe os 7.
function htmlFatorBars(fatores, dominante, chaves) {
  const lista = chaves || FATORES
  let html = ''
  for (let i = 0; i < lista.length; i++) {
    const chave = lista[i], info = FATOR_INFO[chave], v = fatores[chave]
    if (v === undefined || v === null || !info) continue
    const flag = (chave === dominante) ? '<span class="fator-flag">dominante</span>' : ''
    html += '<div class="fator-row">' +
      '<span class="fator-label">' + info.label + flag + '</span>' +
      '<span class="fator-track"><span class="fator-fill" style="width:' + v + '%;background:' + info.cor + '"></span></span>' +
      '<span class="fator-val">' + v + '</span>' +
      '</div>'
  }
  return html
}

// ---- Badge de score (HTML) ----
function htmlScoreBadge(score, tamanho) {
  const cor = corPorScore(score), faixa = classificarFaixa(score)
  const cls = 'score-badge ' + (tamanho || 'md')
  return '<div class="' + cls + '">' +
    '<span class="score-num" style="color:' + cor + '">' + score.toFixed(1) + '</span>' +
    '<span class="score-barra">/100</span>' +
    '<span class="pill" style="background:' + cor + '">' + faixa + '</span>' +
    '</div>'
}

// ---- Mapa estilizado (SVG). Grupos com data-id para interatividade. ----
function svgMapa(selId) {
  let svg = '<svg class="mapa-svg" viewBox="0 0 100 100" role="img" aria-label="Mapa ICAU de Sao Paulo e Sao Caetano do Sul">'
  svg += '<rect x="0" y="0" width="100" height="100" fill="#1c1916" rx="3"/>'
  svg += '<rect x="4" y="12" width="44" height="78" rx="6" fill="#241f1b" stroke="#3a332e" stroke-width="0.5"/>'
  svg += '<rect x="56" y="24" width="40" height="56" rx="6" fill="#241f1b" stroke="#3a332e" stroke-width="0.5"/>'
  svg += '<text x="26" y="9" fill="#b9a99c" font-size="3" font-family="ui-monospace, monospace" text-anchor="middle">SAO PAULO</text>'
  svg += '<text x="76" y="21" fill="#b9a99c" font-size="3" font-family="ui-monospace, monospace" text-anchor="middle">SAO CAETANO</text>'
  for (let i = 0; i < BAIRROS.length; i++) {
    const b = BAIRROS[i], score = calcularIcau(b.fatores), cor = corPorScore(score)
    const ativo = (selId === b.id)
    svg += '<g class="mapa-bairro" data-id="' + b.id + '" role="button" tabindex="0" aria-label="' + b.nome + ': ICAU ' + score.toFixed(1) + '">'
    if (ativo) svg += '<circle cx="' + b.pos.x + '" cy="' + b.pos.y + '" r="7.4" fill="none" stroke="' + cor + '" stroke-width="0.8"/>'
    svg += '<circle cx="' + b.pos.x + '" cy="' + b.pos.y + '" r="5.4" fill="' + cor + '" stroke="#141210" stroke-width="0.6"/>'
    svg += '<text x="' + b.pos.x + '" y="' + (b.pos.y + 1.1) + '" fill="#141210" font-size="3.1" font-weight="700" font-family="ui-monospace, monospace" text-anchor="middle">' + Math.round(score) + '</text>'
    svg += '<text x="' + b.pos.x + '" y="' + (b.pos.y + 9.5) + '" fill="#f3e9e1" font-size="2.7" font-family="ui-sans-serif, sans-serif" text-anchor="middle">' + b.nome + '</text>'
    svg += '</g>'
  }
  svg += '</svg>'
  return svg
}

// ---- Legenda da escala ----
function htmlLegenda() {
  return '<div class="legenda" aria-label="Legenda da escala ICAU">' +
    '<span class="legenda-titulo">ICAU 0-100 &middot; maior = melhor</span>' +
    '<div class="legenda-faixas">' +
    '<span class="legenda-item"><span class="legenda-cor" style="background:#C0392B"></span>Critica <em>&lt; 30</em></span>' +
    '<span class="legenda-item"><span class="legenda-cor" style="background:#E27A2E"></span>Ruim <em>30-50</em></span>' +
    '<span class="legenda-item"><span class="legenda-cor" style="background:#E8B23B"></span>Moderada <em>50-75</em></span>' +
    '<span class="legenda-item"><span class="legenda-cor" style="background:#2E8B57"></span>Boa <em>&ge; 75</em></span>' +
    '</div></div>'
}
/* Responsável pela geração dinâmica dos componentes visuais em HTML e SVG, como radar, mapa, barras e legendas. */