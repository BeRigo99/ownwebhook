# Webhook Service

Serviço de webhook simples usando Node.js e Express.

## Endpoints

- `GET /` - Informações do serviço
- `POST /webhook` - Receber webhooks
- `GET /webhook/history` - Ver histórico
- `GET /webhook/history/:id` - Ver webhook específico
- `DELETE /webhook/history` - Limpar histórico

## Como usar

### Enviar webhook
```bash
POST https://seu-servico.onrender.com/webhook
Content-Type: application/json

{
  "event": "teste",
  "data": { "id": 123 }
}