# Herdeira da Nobreza

Versão independente do site preparada para GitHub e Vercel com Next.js.

## Desenvolvimento local

Requisitos: Node.js 22 e npm.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validação

```bash
npm run build
npm run lint
```

## Publicação pelo GitHub e Vercel

1. Crie um repositório vazio no GitHub.
2. Envie esta pasta para a branch `main`.
3. Na Vercel, escolha **Add New > Project** e importe o repositório.
4. Confirme o preset **Next.js**. Não defina diretório de saída manualmente.
5. Cadastre `NEXT_PUBLIC_SITE_URL` com a URL final do site, incluindo `https://`.
6. Faça o deploy.

A Vercel utilizará `npm install` e `npm run build` automaticamente.

## Domínio personalizado

Depois do primeiro deploy, abra **Project > Settings > Domains** na Vercel e adicione o domínio. Atualize também `NEXT_PUBLIC_SITE_URL` para o endereço definitivo.

## Observação

Esta pasta não contém a configuração de hospedagem nem a autenticação do ChatGPT Sites. A publicação na Vercel é independente e pública por padrão.
