# Publicando a TupaSports no GitHub e na Vercel

Este guia foi pensado para um projeto escolar, com passos simples e diretos.

## Parte 1 - Subir para o GitHub

No terminal do projeto:

```bash
git add .
git commit -m "feat: base inicial da loja TupãSports"
```

Depois:

1. Crie um repositório novo no GitHub
2. Copie a URL do repositório
3. Rode estes comandos no terminal:

```bash
git branch -M main
git remote add origin SUA_URL_DO_REPOSITORIO
git push -u origin main
```

## Parte 2 - Publicar na Vercel

1. Entre em [Vercel](https://vercel.com/)
2. Clique em `Add New...`
3. Clique em `Project`
4. Importe o repositório do GitHub
5. A Vercel deve detectar `Next.js` automaticamente
6. Clique em `Deploy`

## Parte 3 - Configurar o banco Neon

Quando o primeiro deploy terminar:

1. Abra o projeto na Vercel
2. Vá em `Settings`
3. Vá em `Environment Variables`
4. Crie a variável:

```env
DATABASE_URL=sua_string_do_neon
```

5. Salve a variável
6. Faça um novo deploy clicando em `Redeploy`

## Parte 4 - Testar se ficou online

Depois do deploy, teste estas URLs:

- `/`
- `/produtos`
- `/api/produtos`
- `/api/health`

Exemplo:

```txt
https://seu-projeto.vercel.app/api/health
```

Se tudo estiver certo, essa rota deve responder um JSON com `status: "ok"`.

## Parte 5 - O que falar na apresentação

Você pode explicar assim:

- O frontend foi feito com `Next.js`, `HTML`, `CSS` e `JavaScript`
- O backend inicial foi feito com rotas de API no próprio `Next.js`
- O banco online usado foi `Neon`, que funciona com `PostgreSQL`
- O site foi publicado na `Vercel`
- A aplicação consegue mostrar produtos no site e também fornecer os dados em JSON pela API

## Checklist final

- Projeto abre localmente com `npm run dev`
- Home funcionando
- Pagina `/produtos` funcionando
- API `/api/produtos` funcionando
- Banco Neon configurado
- Variavel `DATABASE_URL` cadastrada na Vercel
- Site online para apresentar
