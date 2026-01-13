const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Porta dinâmica (Render usa variável de ambiente)
const PORT = process.env.PORT || 3000;

// Array para armazenar os webhooks recebidos
let webhookHistory = [];

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: 'Serviço de Webhook está rodando!',
    endpoints: {
      'POST /webhook': 'Receber webhooks',
      'GET /webhook/history': 'Ver histórico de webhooks',
      'GET /webhook/history/:id': 'Ver webhook específico',
      'DELETE /webhook/history': 'Limpar histórico'
    }
  });
});

// Endpoint para receber webhooks
app.post('/webhook', (req, res) => {
  const timestamp = new Date().toISOString();
  const webhookData = {
    id: webhookHistory.length + 1,
    timestamp: timestamp,
    headers: req.headers,
    body: req.body,
    query: req.query
  };

  webhookHistory.push(webhookData);

  console.log('📩 Webhook recebido:', {
    id: webhookData.id,
    timestamp: timestamp,
    data: req.body
  });

  res.status(200).json({
    success: true,
    message: 'Webhook recebido com sucesso!',
    id: webhookData.id,
    timestamp: timestamp
  });
});

// Ver histórico de webhooks
app.get('/webhook/history', (req, res) => {
  res.json({
    total: webhookHistory.length,
    webhooks: webhookHistory
  });
});

// Ver webhook específico
app.get('/webhook/history/:id', (req, res) => {
  const webhook = webhookHistory.find(w => w.id === parseInt(req.params.id));
  
  if (webhook) {
    res.json(webhook);
  } else {
    res.status(404).json({ error: 'Webhook não encontrado' });
  }
});

// Limpar histórico
app.delete('/webhook/history', (req, res) => {
  webhookHistory = [];
  res.json({ message: 'Histórico limpo com sucesso!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});