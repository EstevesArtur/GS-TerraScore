# TerraScore — Front-End Design Engineering

> **Da órbita ao bairro — o score ambiental que orienta cidades, governos e empresas.**

TerraScore é uma plataforma de **Inteligência de Carga Ambiental Urbana** que cruza
dados orbitais públicos (Sentinel-2, Sentinel-5P, Landsat-9) com dados terrestres
para gerar o **ICAU — Índice de Carga Ambiental Urbana**, de **0 a 100 por bairro**,
decomposto em **7 fatores**. Quanto maior o ICAU, mais saudável o ambiente
(abaixo de 30 = faixa crítica).

> O TerraScore analisa o **ambiente urbano** — **não** realiza diagnóstico
> psicológico ou clínico individual de pessoas.

Projeto da **Global Solution 2026/1 — FIAP** (tema *Space Connect / Economia
Espacial*), disciplina **Front-End Design Engineering**. ODS **11**, **13**, **9**.

---

## 🛰️ Funcionalidades

Páginas obrigatórias: **index** (Início), **integrantes**, **sobre**, **faq**,
**contato** (formulário com validação real). Páginas da solução:

- **Mapa ICAU** (`pages/mapa.html`) — mapa estilizado em SVG interativo; clique no bairro
  abre o painel com score, faixa, fator dominante e a decomposição dos 7 fatores.
- **Comparativo** (`pages/comparativo.html`) — dois radar charts (SVG) lado a lado.
- **Simulador de Intervenção** (`pages/simulador.html`) — aplica ganhos por tipo de
  intervenção e mostra o delta estimado de ICAU.
- **Dashboard por Persona** (`pages/dashboard.html`) — Governo, Construtora, Saúde e
  Empresa, cada um com a leitura e a recomendação que importam.

---

## 🧰 Tecnologias utilizadas

- **HTML5** semântico (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** com variáveis e `@media` queries (responsividade), **sem CSS inline**
- **JavaScript puro (vanilla)** — toda a interatividade, sem frameworks nem
  bibliotecas externas
- **SVG inline** gerado por JavaScript para o mapa e os gráficos (radar)

> Nenhum framework e nenhuma biblioteca externa são utilizados (sem React, sem
> Bootstrap, sem jQuery, etc.).

---

## 📁 Estrutura de pastas

```
GS-TerraScore/
├── index.html            → página inicial (raiz = ponto de entrada do site)
├── pages/
│   ├── integrantes.html  → equipe (nome, RM, turma, foto, GitHub, LinkedIn)
│   ├── sobre.html        → descrição do projeto
│   ├── faq.html          → perguntas frequentes (acordeon)
│   ├── contato.html      → formulário com validação
│   ├── mapa.html         → solução: mapa ICAU interativo
│   ├── comparativo.html  → solução: comparativo de bairros
│   ├── simulador.html    → solução: simulador de intervenção
│   └── dashboard.html    → solução: dashboard por persona
├── css/
│   └── style.css         → estilos (tokens, componentes, responsividade)
├── js/
│   ├── dados.js          → dados canônicos (bairros, fatores, pesos, personas)
│   ├── icau.js           → cálculo do ICAU
│   ├── render.js         → helpers de SVG/HTML (radar, mapa, barras)
│   ├── main.js           → menu hambúrguer e navegação
│   ├── home.js / mapa.js / comparativo.js / simulador.js / dashboard.js
│   ├── faq.js            → acordeon
│   └── contato.js        → validação do formulário
├── assets/
│   ├── favicon.svg
│   └── integrantes/      → fotos (.svg placeholder → trocar pela foto real)
├── README.md
└── integrantes.txt
```

> `index.html` permanece na raiz por ser o ponto de entrada do site (abre no
> duplo clique e é o que o GitHub Pages publica). As demais páginas ficam
> organizadas em `pages/`, referenciando `../css`, `../js` e `../assets`.

---

## ▶️ Como rodar

O site é HTML/CSS/JS puro. Para abrir:

- **Mais simples:** dê duplo clique em `index.html` (abre direto no navegador).
- **Recomendado** (evita qualquer bloqueio de caminho): rode um servidor local na
  pasta do projeto e acesse o endereço indicado:

```bash
# com Python instalado
python -m http.server 8080
# depois abra http://localhost:8080
```

---

## 👥 Autores e créditos — turma 1TDSPX-2026 (1º ano · ADS · Fevereiro · FIAP)

| Nome | RM | Papel | GitHub | LinkedIn |
|---|---|---|---|---|
| **Artur Esteves** | RM569450 | Representante | [EstevesArtur](https://github.com/EstevesArtur) | [perfil](https://www.linkedin.com/in/artur-esteves-31bb4130a/) |
| Diego Barbosa | RM568829 | — | [DiegoRodri1](https://github.com/DiegoRodri1) | [perfil](https://www.linkedin.com/in/diego-barbosa-rodrigues-a60677321) |
| João Fontenele | RM570783 | — | [joaofontenele06](https://github.com/joaofontenele06) | [perfil](https://www.linkedin.com/in/jo%C3%A3o-fontenele-65b1913a8/) |
| Vinicius Pacheco | RM571109 | — | [viniciuspr27](https://github.com/viniciuspr27) | [perfil](https://www.linkedin.com/in/vinicius-pacheco-ruiz-66026033b/) |
| Yan Almeida | RM568814 | — | [YanAlmeidaC](https://github.com/YanAlmeidaC) | [perfil](https://br.linkedin.com/in/yan-de-almeida-cardoso-2210372ba) |

---

## 🖼️ Imagens e ícones

- **`assets/favicon.svg`** — ícone do site (marca do TerraScore: órbita estilizada
  em laranja sobre fundo escuro), exibido na aba do navegador.
- **`assets/integrantes/`** — fotos dos cinco integrantes (`artur.jpg`,
  `diego.jpg`, `joao.jpg`, `vinicius.jpg`, `yan.jpg`), recortadas em 400×400 e
  exibidas como avatares circulares na página de integrantes.
- **Gráficos e mapa em SVG** — o radar chart (decomposição dos 7 fatores) e o
  mapa ICAU são desenhados em **SVG inline gerado por JavaScript** (`js/render.js`),
  sem imagens externas nem bibliotecas, garantindo nitidez em qualquer resolução.
- **Ícones de escala** — as cores das faixas do ICAU (crítica, ruim, moderada, boa)
  e dos sete fatores são definidas por tokens de cor no `css/style.css`.

---

## 🔗 Repositório

GitHub: **https://github.com/EstevesArtur/GS-TerraScore**

## ✉️ Contato

Use a página **Contato** do site ou abra uma issue no repositório acima.