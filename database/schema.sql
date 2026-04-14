CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  imagem TEXT,
  descricao TEXT,
  destaque BOOLEAN DEFAULT false
);

INSERT INTO produtos (nome, categoria, preco, imagem, descricao, destaque)
VALUES
  ('Chuteira Velocity Pro', 'Futebol', 249.90, 'Chuteira', 'Modelo leve para jogos e treinos.', true),
  ('Camisa Dry Move', 'Corrida', 89.90, 'Camisa esportiva', 'Tecido respiravel e confortavel.', false),
  ('Bola Arena Max', 'Futebol', 119.90, 'Bola oficial', 'Bola resistente para quadra e campo.', true)
ON CONFLICT DO NOTHING;
