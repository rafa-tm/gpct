
<div align="center">
<img src="public/icon-128.png" alt="logo"/>
<h1> Chrome Extension GPCT with<br/>React + Vite + TypeScript</h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)
![GitHub action badge](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/actions/workflows/build-zip.yml/badge.svg)
<img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/Jonghakseo/chrome-extension-boilerplate-react-viteFactions&count_bg=%23#222222&title_bg=%23#454545&title=😀&edge_flat=true" alt="hits"/>

</div>

## Indice README

- [Tecnologias](#tecnologias)
- [Entregas](#entregas)

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

## Entregas <a name="entregas"></a>

<details><summary>Primeira entrega ✅ (03/11/2023)</summary>
</details>

<details><summary>Segunda entrega ✅ (10/11/2023)</summary>

- ✅ Ao iniciar uma reunião no Google Meeting, a extensão iria carregar automaticamente o roteiro (no modo visualização), para que o usuário possa ir lendo, abrindo/fechando partes, marcando os checkboxes. Não apresentar interface antes de iniciar a reunião.

- ✅ Caso não seja uma sidebar, ele poderá arrastar o elemento para qualquer lugar na tela (pra tirar da frente da imagem das pessoas por exemplo), e a posição (%) deverá ficar salva no localstorage, para voltar no mesmo lugar na próxima reunião. 

- ✅ Deve haver uma forma de "minimizar" a extensão, que irá deixar apenas um ícone visível para ao clicar voltar a exibir o conteúdo aberto.

- ✅ Ao abrir a extensão, ter algum tipo de apresentação explicando como usar, com um botão pra fechar e um checkbox "Não apresentar mais essa introdução", que ao marcado, salvará no localstorage para não exibir mais.

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

## Terceira entrega ⚠️ (29/11/2023)


Nesta versão poderemos criar uma conta, e o roteiro ficará salvo em uma collection (nesta versão apenas um roteiro).

- ✅ Abrir sem exigir autenticação e deixar usar como já funciona. Ter um botão "Criar conta" que irá levar para a interface de autenticação com firebase. Escolha um método de authenticação que achar melhor, pode ser email ou telefone.

- ✅ Quando o usuário é criado no firebase, ele terá um uid, que é uma string única que o identifica, é o id dele.

- ✅ Assim que o usuário criar a conta, criar um registro no firestore em users\{uid} e salvar ali createdAt com a data de hoje.

- ✅ Ao carregar a interface, se o usuário estiver autenticado, apresentar um circulo com a primeira letra do email dele, (como se fosse um avatar), pra indicar que está logado.

- ✅ Ao clicar no avatar exibir um menu popup com apenas uma opção por agora "Sair".

- ✅ Ao autenticar, caso tenha um modelo no localstorage, copiar ele para o firebase em uma collection em users\{uid}\scripts\, onde scripts será uma coleection de scripts que o usuário pode ter.

- ✅ Nesta versão, não precisamos ainda implementar toda a lógica de criar novos modelos, ver os existentes e tal, porque irá adicionar muita complexidade.

- ✅ Ao estar autenticado, o front deve escutar users\{uid}\scripts\ e obter o único registro que estará lá, para apresentar, editar, etc. Sempre que for salvar, salvar no firebase.

- ⚠️ O firebase tem um recurso de cache offline, que recomendo usar, assim ao abrir a interface já conseguirá obter instantaneamente o dado do cache do firebase.

Obs: Este ultimo eu deixei para a proxima entrega, pois como iremos tratar de criação de novos modelos, edição, etc, creio que vai fazer mais sentido implementa-lo juntamente a essas alterações.

### Detalhes e especificações do Firebase

No firebase temos a seguinte estrutura:

- users\ {uid} \ {user}

Com user sendo um objeto com os seguintes campos:

- createdAt: data de criação do usuário
- email: email do usuário
- id: id do usuário
- scripts: collection de scripts do usuário

E dentro de scripts, temos:

- id: id do script
- title: titulo do script
- code: código do script (Em markdown)
- created_at: data de criação do script
- updated_at: data da ultima atualização do script
- shared: booleano indicando se o script é compartilhado ou não

Alguns destes campos são já pensando na proxima entrega. Por exemplo, o campo shared, que indica se o script é compartilhado ou não. Nas proximas entregas, iremos implementar a possibilidade de compartilhar um script com outros usuários, e este campo poderá ser usado para isso.

E o campo updated_at, que indica a data da ultima atualização do script, será usado para exibição quando houver mais de um script, para saber qual foi o ultimo atualizado.

Já title achei interessante ter, pois assim o usuário poderá dar um nome para o script, e não apenas ter o código. Assim quando tiver mais de um script, poderá identificar qual é qual.