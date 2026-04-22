# Upvotes RN

Aplicativo mobile em React Native para autenticação de usuários, publicação de mensagens e votação em feed (like/love).

## Visão Geral

O projeto consome a API pública da Segware Book para:

- Realizar login e cadastro de usuário
- Listar mensagens no feed
- Criar nova mensagem
- Reagir a mensagens com voto de like/love

## Stack

- React Native 0.64.2
- React 17
- React Navigation (stack)
- Axios
- React Hook Form
- Styled Components
- React Native Elements
- Jest + Testing Library

## Funcionalidades

- Tela de login
- Tela de cadastro
- Feed de mensagens
- Tela para nova mensagem
- Votação em mensagens (like/love)

## Estrutura do Projeto

```text
src/
  hooks/
    useGet.js
    usePost.js
  pages/
    main/
    message/
    signIn/
    signUp/
  services/
    api.js
  routes.js
```

## Pré-requisitos

Antes de começar, tenha instalado:

- Node.js LTS
- npm ou Yarn
- Ambiente React Native CLI configurado
- Android Studio (para Android)
- Xcode + CocoaPods (para iOS, em macOS)

Guia oficial: https://reactnative.dev/docs/environment-setup

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz do projeto:

```env
API_BASE_URL=https://segware-book-api.segware.io/api/
```

3. (Apenas iOS) instale os pods:

```bash
cd ios && pod install && cd ..
```

## Executando o Projeto

Inicie o Metro bundler:

```bash
npm run start
```

Em outro terminal, execute:

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

## Scripts Disponíveis

- `npm run start`: inicia o Metro bundler
- `npm run android`: compila e abre no Android
- `npm run ios`: compila e abre no iOS
- `npm run test`: executa os testes
- `npm run lint`: executa o ESLint

## Testes

Para rodar os testes:

```bash
npm run test
```

Os testes estão em:

- `__tests__/pages/Main.spec.js`
- `__tests__/pages/Message.spec.js`
- `__tests__/pages/SignIn.spec.js`
- `__tests__/pages/SignUp.spec.js`

## Configuração da API

A URL base da API é lida da variável de ambiente `API_BASE_URL`.

Arquivos relacionados:

- `src/services/api.js`
- `.env`
- `babel.config.js`

Exemplo de `.env`:

```env
API_BASE_URL=https://segware-book-api.segware.io/api/
```

Se necessário, altere o valor de `API_BASE_URL` e reinicie o Metro bundler.

## Observações

- O projeto utiliza `ToastAndroid` para feedback de erro em algumas telas. Em iOS, esse comportamento deve ser adaptado para um componente multiplataforma.
- O token de autenticação é atribuído no header global do Axios após login bem-sucedido.
- O arquivo `.env` deve ficar fora de versionamento quando contiver dados sensíveis.

## Licença

Projeto para fins de estudo/desenvolvimento.
