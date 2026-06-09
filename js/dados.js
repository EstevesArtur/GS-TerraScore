/* ==========================================================================
   TerraScore - Dados Canônicos do Sistema

   Este arquivo define toda a base oficial de dados utilizada no projeto.

   Responsabilidades:
   - Define a ordem oficial dos fatores ambientais.
   - Define os pesos utilizados no cálculo do ICAU (0 a 100).
   - Armazena metadados de cada fator (descrição, fonte e cor).
   - Contém a base de bairros com seus valores ambientais.
   - Define intervenções urbanas e seus impactos.
   - Define personas do sistema e seus focos de análise.

   Regras do sistema:
   - ICAU varia de 0 a 100 (MAIOR = MELHOR).
   - Valores abaixo de 30 indicam situação crítica.
   - Os pesos dos fatores somam 1.00 obrigatoriamente.
   - Este arquivo serve como base única de verdade (single source of truth).
   ========================================================================== */

// Ordem oficial dos 7 fatores
const FATORES = ['LST', 'NDVI', 'NO2', 'PM25', 'DENS_CONST', 'RUIDO', 'DENS_POP']

// Pesos (somam 1.00)
const PESOS = {
  LST: 0.18, NDVI: 0.15, NO2: 0.16, PM25: 0.16,
  DENS_CONST: 0.12, RUIDO: 0.13, DENS_POP: 0.10
}

// Metadados de cada fator
const FATOR_INFO = {
  LST:        { label: 'Temperatura (LST)',            curto: 'LST',     cor: '#E4572E', fonte: 'Landsat-9',        desc: 'Temperatura de superficie. Valor alto = menos ilha de calor.' },
  NDVI:       { label: 'Cobertura vegetal (NDVI)',     curto: 'NDVI',    cor: '#4E9F3D', fonte: 'Sentinel-2',       desc: 'Indice de vegetacao. Valor alto = mais area verde.' },
  NO2:        { label: 'Poluicao do ar (NO₂)',         curto: 'NO₂',     cor: '#7B4B94', fonte: 'Sentinel-5P',      desc: 'Dioxido de nitrogenio. Valor alto = ar mais limpo.' },
  PM25:       { label: 'Material particulado (PM2.5)', curto: 'PM2.5',   cor: '#A87C4F', fonte: 'CETESB / CAMS',    desc: 'Particulas finas. Valor alto = menos poluicao.' },
  DENS_CONST: { label: 'Densidade construída',         curto: 'D.Const', cor: '#5A6B7B', fonte: 'VIIRS / WorldPop', desc: 'Ocupacao do solo. Valor alto = ocupacao equilibrada.' },
  RUIDO:      { label: 'Ruido urbano',                 curto: 'Ruido',   cor: '#C2417F', fonte: 'Sensores + OSM',   desc: 'Carga sonora. Valor alto = ambiente mais silencioso.' },
  DENS_POP:   { label: 'Densidade populacional',       curto: 'D.Pop',   cor: '#2E8B8B', fonte: 'IBGE / WorldPop',  desc: 'Adensamento humano. Valor alto = densidade saudavel.' }
}

// 7 bairros canônicos
const BAIRROS = [
  { id: 'republica', nome: 'Republica', cidade: 'Sao Paulo', uf: 'SP', pos: { x: 16, y: 30 }, fatores: { LST: 22, NDVI: 18, NO2: 20, PM25: 28, DENS_CONST: 12, RUIDO: 18, DENS_POP: 24 } },
  { id: 'pinheiros', nome: 'Pinheiros', cidade: 'Sao Paulo', uf: 'SP', pos: { x: 15, y: 55 }, fatores: { LST: 36, NDVI: 40, NO2: 34, PM25: 40, DENS_CONST: 30, RUIDO: 32, DENS_POP: 38 } },
  { id: 'marsilac', nome: 'Marsilac', cidade: 'Sao Paulo', uf: 'SP', pos: { x: 30, y: 77 }, fatores: { LST: 70, NDVI: 82, NO2: 75, PM25: 72, DENS_CONST: 80, RUIDO: 78, DENS_POP: 85 } },
  { id: 'cidade-tiradentes', nome: 'Cidade Tiradentes', cidade: 'Sao Paulo', uf: 'SP', pos: { x: 39, y: 19 }, fatores: { LST: 30, NDVI: 35, NO2: 45, PM25: 42, DENS_CONST: 40, RUIDO: 42, DENS_POP: 28 } },
  { id: 'centro-scs', nome: 'Centro', cidade: 'Sao Caetano do Sul', uf: 'SP', pos: { x: 68, y: 35 }, fatores: { LST: 40, NDVI: 42, NO2: 38, PM25: 40, DENS_CONST: 32, RUIDO: 34, DENS_POP: 36 } },
  { id: 'santa-paula', nome: 'Santa Paula', cidade: 'Sao Caetano do Sul', uf: 'SP', pos: { x: 84, y: 52 }, fatores: { LST: 50, NDVI: 55, NO2: 48, PM25: 50, DENS_CONST: 45, RUIDO: 50, DENS_POP: 48 } },
  { id: 'ceramica', nome: 'Ceramica', cidade: 'Sao Caetano do Sul', uf: 'SP', pos: { x: 74, y: 70 }, fatores: { LST: 42, NDVI: 48, NO2: 30, PM25: 34, DENS_CONST: 38, RUIDO: 36, DENS_POP: 42 } }
]

// Intervenções urbanas
const INTERVENCOES = {
  ARBORIZACAO: { label: 'Arborização', desc: 'Plantio de árvores em vias e praças.', ganhos: { NDVI: 22, LST: 12 } },
  FILTRAGEM_AR: { label: 'Filtragem do ar', desc: 'Barreiras vegetais e filtragem de poluentes.', ganhos: { NO2: 18, PM25: 15 } },
  SOMBREAMENTO: { label: 'Sombreamento', desc: 'Estruturas de sombra e conforto térmico.', ganhos: { LST: 15 } },
  REQUALIFICACAO_PRACA: { label: 'Requalificação de praça', desc: 'Revitalização de espaço público.', ganhos: { RUIDO: 15, DENS_CONST: 8 } }
}

// Personas do sistema
const PERSONA_KEYS = ['GOVERNO', 'CONSTRUTORA', 'SAUDE', 'EMPRESA']
const PERSONAS = {
  GOVERNO: { label: 'Governo / Prefeitura', enfase: ['LST', 'NDVI', 'NO2', 'PM25', 'DENS_CONST', 'RUIDO', 'DENS_POP'], foco: 'Planejamento urbano baseado em dados ambientais.', acao: 'Priorizar áreas críticas com arborização e políticas públicas.' },
  CONSTRUTORA: { label: 'Construtora / Incorporadora', enfase: ['LST', 'RUIDO', 'DENS_CONST'], foco: 'Escolha de áreas para construção sustentável.', acao: 'Projetar edificações adaptadas ao microclima urbano.' },
  SAUDE: { label: 'Saúde', enfase: ['NO2', 'PM25', 'NDVI'], foco: 'Impactos ambientais na saúde pública.', acao: 'Recomendar áreas com melhor qualidade do ar.' },
  EMPRESA: { label: 'Empresa', enfase: ['RUIDO', 'NO2'], foco: 'Localização e bem-estar corporativo.', acao: 'Otimizar escritórios para conforto ambiental.' }
}

// Helper
function getBairro(id) {
  for (let i = 0; i < BAIRROS.length; i++) {
    if (BAIRROS[i].id === id) return BAIRROS[i]
  }
  return null
}