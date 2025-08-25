# 🤝 Proto Persona ↔ Mia (Chatbase) Integration

This repository contains a **custom API bridge** that connects **Proto Persona** directly to **Mia (Chatbase)**.  
It resolves authentication issues (`user_id`, `user_hash`) and provides clean, production-ready responses.  

---

## ⚡ Quick Start  

Integrate in **3 simple steps**:

### 1. Copy the Production Endpoint  
```
https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2
```

### 2. Send a Request  
```bash
curl -X POST https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2 \
  -H "Content-Type: application/json" \
  -d '{"conversation": [{"role": "user", "content": "Hello from Proto Persona!"}]}'
```

### 3. Get a Response
```json
{
  "response": "Hi, I'm Mia! How can I help?",
  "version": "v2-no-hmac",
  "timestamp": "2025-08-25T12:17:15.034Z"
}
```

✅ Done! Proto Persona is now integrated with Mia.

---

## 📌 Summary

### Problem
The original **Proto Persona starter code** sent extra fields (`user_id`, `user_hash`) to Chatbase.
This caused errors:
```json
{"error": "Unrecognized key(s) in object: 'user_id', 'user_hash'"}
```

### Fix
This bridge API:
* Strips out `user_id` and `user_hash` automatically
* Sends only what Chatbase expects
* Returns clean, simplified responses
* Supports **multi-turn conversations** with memory

### Deployment
* Hosted on **Vercel**
* Code available on **GitHub**
* Production endpoint:
  ```
  https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2
  ```

### Testing

**Basic Chat Test**
```bash
curl -X POST https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2 \
  -H "Content-Type: application/json" \
  -d '{"conversation": [{"role": "user", "content": "Hello"}]}'
```

✅ Expected response:
```json
{
  "response": "Hi, I'm Mia! How can I help?",
  "version": "v2-no-hmac",
  "timestamp": "2025-08-25T12:17:15.034Z"
}
```

**Multi-Turn Conversation Test**
```bash
curl -X POST https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "conversation": [
      {"role": "user", "content": "My name is Alice"},
      {"role": "assistant", "content": "Nice to meet you, Alice!"},
      {"role": "user", "content": "What is my name?"}
    ]
  }'
```

✅ Expected response:
```json
{
  "response": "Your name is Alice!",
  "version": "v2-no-hmac",
  "timestamp": "2025-08-25T12:17:15.034Z"
}
```

### Status
* ✅ Live
* ✅ Stable  
* ✅ Ready for **Proto Persona integration**

---

## 📋 Request / Response Format

### Request (Proto → Mia)
```json
{
  "conversation": [
    {
      "role": "user",
      "content": "Message from Proto Persona user"
    }
  ]
}
```

### Response (Mia → Proto)
```json
{
  "response": "Mia's response text",
  "version": "v2-no-hmac",
  "timestamp": "ISO-8601 timestamp"
}
```

---

## 🔍 Debug Endpoints

Check API status:
```bash
curl https://mia-chatbase-bridge-250825-v2.vercel.app/api/debug
```

Health check:
```bash
curl https://mia-chatbase-bridge-250825-v2.vercel.app/api/test
```

---

## 🔌 Integration Code Examples

### JavaScript
```javascript
const MIA_API = 'https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2';

async function askMia(message) {
  const response = await fetch(MIA_API, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      conversation: [{role: 'user', content: message}]
    })
  });
  return (await response.json()).response;
}

// Usage
askMia('Hello from Proto!').then(console.log);
```

### Python
```python
import requests

MIA_API = 'https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2'

def ask_mia(message):
    response = requests.post(MIA_API, json={
        'conversation': [{'role': 'user', 'content': message}]
    })
    return response.json()['response']

# Usage
print(ask_mia('Hello from Proto!'))
```

---

## 📞 Contact

**GitHub**: https://github.com/jsagir/-Mia_Chatbase_bridge_250825_V2  
**Issues**: Create an issue if you encounter any problems  
**Email**: jsagir@gmail.com

---

*Built for Proto Persona by Jonathan Sagir*
