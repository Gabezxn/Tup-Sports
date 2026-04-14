# TupaSports

Projeto escolar de uma loja online de artigos esportivos usando `Next.js`, `Node.js`, `CSS` e integração futura com `Neon`.

## O que ja esta pronto

- Estrutura inicial do site em `Next.js`
- Home page com seções de vitrine, categorias e diferenciais
- Pagina `/produtos` consumindo a API interna do projeto
- Componentes separados para facilitar manutenção
- Rota de API em `src/app/api/produtos/route.js`
- Rota de verificacao em `src/app/api/health/route.js`
- Camada de banco em `src/lib/db.js` e `src/lib/products.js`
- Arquivo `.env.example` preparado para conexão com banco

## Atenção importante sobre o banco

Você comentou que pretende usar `Neon` e também disse que conhece o básico de `MySQL`.

O Neon usa `PostgreSQL`, não `MySQL`.

Isso não impede seu projeto. Na prática:

- A ideia de tabela, coluna, chave primária e consulta continua parecida
- O que muda mais é a sintaxe em alguns detalhes
- Para este projeto escolar, faz sentido continuar com `Neon + PostgreSQL`, porque combina muito bem com `Vercel`

## Como rodar no Windsurf

1. Abra a pasta do projeto no Windsurf
2. Abra o terminal
3. Rode `npm install`
4. Rode `npm run dev`
5. Abra `http://localhost:3000`

Teste extra de backend:

- Abra `http://localhost:3000/api/produtos`
- Você verá um JSON com produtos de exemplo
- Isso já é uma primeira parte do backend no Next.js

Teste extra de frontend + backend:

- Abra `http://localhost:3000/produtos`
- Essa pagina busca os dados da API e monta a vitrine no navegador
- Quando o Neon estiver configurado, ela passara a mostrar os produtos reais

Teste extra de deploy:

- Abra `http://localhost:3000/api/health`
- Essa rota serve para verificar rapidamente se a aplicacao esta online

## Próximas etapas recomendadas

### Etapa 1 - Finalizar o visual

- Trocar textos fictícios pelos textos finais
- Ajustar cores, logo e nome visual da loja
- Adicionar mais produtos de exemplo

### Etapa 2 - Criar banco no Neon

1. Criar conta no Neon
2. Criar um projeto gratuito
3. Copiar a string de conexão
4. Colocar no arquivo `.env.local`:

```env
DATABASE_URL="sua_string_do_neon"
```

Depois disso, o projeto tenta usar o banco automaticamente.
Se a variavel nao existir, ele continua usando produtos de exemplo.

### Etapa 3 - Criar tabela de produtos

Voce pode usar o arquivo [database/schema.sql](C:/Users/gaybe/Documents/New%20project/database/schema.sql) no editor SQL do Neon.

Exemplo de tabela:

```sql
CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  preco NUMERIC(10,2) NOT NULL,
  imagem TEXT,
  descricao TEXT,
  destaque BOOLEAN DEFAULT false
);
```

Exemplo de inserts:

```sql
INSERT INTO produtos (nome, categoria, preco, imagem, descricao, destaque)
VALUES
  ('Chuteira Velocity Pro', 'Futebol', 249.90, 'Chuteira', 'Modelo leve para jogos e treinos.', true),
  ('Camisa Dry Move', 'Corrida', 89.90, 'Camisa esportiva', 'Tecido respiravel e confortavel.', false),
  ('Bola Arena Max', 'Futebol', 119.90, 'Bola oficial', 'Bola resistente para quadra e campo.', true);
```

### Etapa 4 - Conectar o site ao banco

Depois podemos fazer juntos:

- Criar outras tabelas, como usuarios ou pedidos
- Adicionar formulario para cadastrar produtos
- Criar pagina administrativa simples

### Etapa 5 - Publicar na Vercel

1. Subir projeto no GitHub
2. Importar repositório na Vercel
3. Adicionar variável `DATABASE_URL`
4. Fazer deploy

Guia detalhado:

- Veja [docs/deploy-vercel.md](C:/Users/gaybe/Documents/New%20project/docs/deploy-vercel.md)

## Sugestão de escopo para escola

Para não ficar grande demais, recomendo este escopo:

- Página inicial
- Lista de produtos
- Categorias
- Destaques da loja
- Banco com tabela de produtos
- Deploy online na Vercel

Se quiser, no próximo passo eu posso fazer uma destas três coisas:

1. criar a página de produtos completa
2. conectar o projeto ao Neon
3. montar o passo a passo de GitHub + Vercel para publicar
