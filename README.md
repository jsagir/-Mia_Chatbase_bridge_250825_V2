# 🤝 Proto Persona ↔ Mia (Chatbase) Integration

Hey Nolan — Jonathan here.

This repo contains the **custom API bridge** that connects **Proto Persona** directly to **Mia (Chatbase)**. It fixes the auth issues you saw and provides a **drop-in endpoint** that is fully Proto-compatible.

---

## 🌐 Production Endpoint

Use this URL for Proto Persona integration:

```
https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2
```

---

## 📋 Request / Response Format

### Request (Proto → Mia)

```json
{
  "conversation": [
    {
      "role": "user",
      "content": "Hello from Proto Persona!"
    }
  ]
}
```

### Response (Mia → Proto)

```json
{
  "response": "Hi, I'm Mia! How can I help?",
  "version": "v2-no-hmac",
  "timestamp": "2025-08-25T12:17:15.034Z"
}
```

---

## 🧪 Testing

You can test immediately with:

```bash
curl -X POST https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2 \
  -H "Content-Type: application/json" \
  -d '{"conversation": [{"role": "user", "content": "Hello, Proto Persona is working!"}]}'
```

✅ Should return a greeting from Mia.

---

## 💬 Multi-Turn Conversation Example

```json
{
  "conversation": [
    {"role": "user", "content": "My name is Nolan"},
    {"role": "assistant", "content": "Nice to meet you, Nolan!"},
    {"role": "user", "content": "What is my name?"}
  ]
}
```

✅ Mia will remember: `"Your name is Nolan!"`

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

## 📌 Summary

* **Problem**: Proto starter code caused `"user_id", "user_hash"` Chatbase auth errors
* **Fix**: Built proxy API that strips fields + handles auth internally
* **Deployment**: GitHub → Vercel with env vars (already done ✅)
* **Testing**: Use provided `curl` scripts above
* **Status**: ✅ Live, stable, and production-ready

---

## 📞 Contact

**GitHub**: https://github.com/jsagir/-Mia_Chatbase_bridge_250825_V2  
**Issues**: Create an issue if you encounter any problems  
**Email**: jsagir@gmail.com

---

👉 **Nolan only needs to point Proto Persona to the endpoint above — nothing else.**

---

*Built with ❤️ for Proto Persona by Jonathan Sagir*
