
<div align="center">
<img src="public/icon-128.png" alt="logo"/>
<h1> Chrome Extension Boilerplate with<br/>React + Vite + TypeScript</h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)
![GitHub action badge](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/actions/workflows/build-zip.yml/badge.svg)
<img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/Jonghakseo/chrome-extension-boilerplate-react-viteFactions&count_bg=%23#222222&title_bg=%23#454545&title=😀&edge_flat=true" alt="hits"/>

</div>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Installation](#installation)
    - [Procedures](#procedures)
      - [Chrome](#chrome) 
      - [Firefox](#firefox) 
- [Screenshots](#screenshots)
    - [NewTab](#newtab)
    - [Popup](#popup)
- [Examples](#examples)
- [Documents](#documents)

## Tecnologias presentes<a name="tecnologias"></a>

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/)
- [Twind](https://twind.dev/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/getting-started.html#automatic-recommended)
- [Commitlint](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- HRR(Hot Rebuild & Refresh/Reload)

## Entregas <a name="installation"></a>

<details><summary>Primeira entrega ✅ (03/11/2023)</summary>
</details>

<details><summary>Segunda entrega ❇️ (10/11/2023)</summary>

- ✅ Ao iniciar uma reunião no Google Meeting, a extensão iria carregar automaticamente o roteiro (no modo visualização), para que o usuário possa ir lendo, abrindo/fechando partes, marcando os checkboxes. Não apresentar interface antes de iniciar a reunião.

- ✅ Caso não seja uma sidebar, ele poderá arrastar o elemento para qualquer lugar na tela (pra tirar da frente da imagem das pessoas por exemplo), e a posição (%) deverá ficar salva no localstorage, para voltar no mesmo lugar na próxima reunião. 

- ✅ Deve haver uma forma de "minimizar" a extensão, que irá deixar apenas um ícone visível para ao clicar voltar a exibir o conteúdo aberto.

- Ao abrir a extensão, ter algum tipo de apresentação explicando como usar, com um botão pra fechar e um checkbox "Não apresentar mais essa introdução", que ao marcado, salvará no localstorage para não exibir mais.

- ✅ Ter um botão "?" ou algo do tipo em algum lugar, que abre novamente a janela da introdução.

- ✅ Quando for um checkbox, mesmo que renderize um li, não exibir o bullet. Ou seja, se for `- [ ] Perguntar algo` deverá apresentar sem a "bolinha" na esquerda, já vir direto o checkbox.

- ✅ A extensão deve ter um ícone na banjeida de extensões.

- ✅ Para ter um accordeon, a pessoa deve escrever exatamente como abaixo (`grupo` com `titulo`):

```
<grupo titulo="Sem equipe de TI">
Realmente, ter uma equipe própria dá muito trabalho. Você está certo em não ter um time próprio.

## Perguntas
[ ] Já pensaram em contratar uma empresa pra isso?
</grupo>
```

</details>