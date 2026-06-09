/* ==========================================================================
   TerraScore - Dashboard por Persona

   Este módulo controla a visualização do mesmo bairro sob diferentes
   perspectivas de personas (Governo, Construtora, Saúde, Empresa).

   Funcionalidades:
   - Seleção de bairro via dropdown.
   - Navegação por abas de personas.
   - Recalculo dinâmico do ICAU por bairro.
   - Foco em diferentes fatores conforme a persona ativa.
   - Exibição de recomendações específicas por perfil.
   - Atualização dinâmica da interface sem recarregar a página.

   Conceito:
   Cada persona interpreta os mesmos dados ambientais de forma diferente,
   destacando fatores mais relevantes para seu objetivo.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  const selBairro = document.getElementById('sel-bairro')
  const elAbas = document.getElementById('persona-abas')
  const elInfo = document.getElementById('persona-info')
  const elRec = document.getElementById('persona-rec')

  if (!selBairro || !elAbas) return

  let persona = 'GOVERNO'

  // Popula select de bairros
  let opts = ''
  for (let i = 0; i < BAIRROS.length; i++) {
    opts += '<option value="' + BAIRROS[i].id + '">' +
      BAIRROS[i].nome + ' · ' + BAIRROS[i].cidade +
      '</option>'
  }
  selBairro.innerHTML = opts

  // Cria abas de personas
  let ahtml = ''
  for (let i = 0; i < PERSONA_KEYS.length; i++) {
    const key = PERSONA_KEYS[i]
    ahtml += '<button type="button" class="aba" data-persona="' + key + '">' +
      PERSONAS[key].label +
      '</button>'
  }

  elAbas.innerHTML = ahtml

  const abas = elAbas.querySelectorAll('.aba')

  for (let i = 0; i < abas.length; i++) {
    abas[i].addEventListener('click', function () {
      persona = this.getAttribute('data-persona')
      atualizar()
    })
  }

  function atualizar() {
    const b = getBairro(selBairro.value)
    const score = calcularIcau(b.fatores)
    const p = PERSONAS[persona]

    for (let i = 0; i < abas.length; i++) {
      abas[i].classList.toggle(
        'aba-ativa',
        abas[i].getAttribute('data-persona') === persona
      )
    }

    elInfo.innerHTML =
      '<p class="eyebrow">' + b.nome + ' · ' + b.cidade + '</p>' +
      htmlScoreBadge(score, 'lg') +
      '<p class="muted">' + classificarFaixa(score) + '</p>' +
      '<hr class="sep"/>' +
      '<h3>Fatores que importam para ' + p.label + '</h3>' +
      htmlFatorBars(b.fatores, null, p.enfase)

    elRec.innerHTML =
      '<h3>' + p.label + '</h3>' +
      '<p class="muted">' + p.foco + '</p>' +
      '<hr class="sep"/>' +
      '<p class="eyebrow">Recomendação</p>' +
      '<p>' + p.acao + '</p>' +
      '<p class="mt"><a class="btn btn-ghost" href="simulador.html">Testar uma intervenção</a></p>'
  }

  selBairro.value = 'pinheiros'
  atualizar()
})