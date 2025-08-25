# 🚀 DEPLOYMENT & TESTING GUIDE FOR NOLAN
## Proto Persona Integration - Complete Setup

---

## ✅ PART 1: DEPLOY TO VERCEL (5 Minutes)

### Step 1: Access Vercel
1. Go to: https://vercel.com
2. Click **"Log In"** (if you have account) or **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest method)

### Step 2: Import the Repository
1. Click **"Add New..."** → **"Project"**
2. Look for: `-Mia_Chatbase_bridge_250825_V2`
3. Click **"Import"**

### Step 3: Configure Your Deployment
**IMPORTANT - These settings are REQUIRED:**

1. **Project Name**: Leave as is or rename to `proto-persona-chatbase`
2. **Framework Preset**: Select **"Other"**
3. **Root Directory**: Leave empty (don't change)

### Step 4: Add Environment Variables (CRITICAL!)
Click **"Environment Variables"** section and add:

**Variable 1:**
- Key: `CHATBASE_API_KEY`
- Value: `8171b8f9-aac3-4b77-8175-226cc23e4d9b`
- Click **"Add"**

**Variable 2:**
- Key: `CHATBOT_ID`  
- Value: `MNPuL5RkxOrS4SeEetwE6`
- Click **"Add"**

### Step 5: Deploy
1. Click **"Deploy"** button
2. Wait 1-2 minutes for deployment
3. You'll see "Congratulations!" when done
4. Copy your deployment URL (looks like: `https://your-app-name.vercel.app`)

---

## 🧪 PART 2: TESTING FOR PROTO PERSONA COMPLIANCE

### Test 1: Verify Deployment Status
**Purpose**: Confirm the deployment is live and configured correctly

```bash
curl https://YOUR-APP.vercel.app/api/debug
```

**Expected Response:**
```json
{
  "timestamp": "2024-12-25T...",
  "deploymentId": "dpl_xxx",
  "message": "This is the LATEST deployment without HMAC",
  "chatEndpointVersion": "v2-no-hmac",
  "environmentVariables": {
    "CHATBASE_API_KEY": "Set",
    "CHATBOT_ID": "Set"
  }
}
```

✅ **PASS CRITERIA**: Both environment variables show "Set"

---

### Test 2: Basic Chat Functionality
**Purpose**: Verify Proto Persona can send messages

**Windows Command Prompt:**
```bash
curl -X POST https://YOUR-APP.vercel.app/api/chat-v2 ^
  -H "Content-Type: application/json" ^
  -d "{\"conversation\": [{\"role\": \"user\", \"content\": \"Hello, this is a test from Proto Persona\"}]}"
```

**Mac/Linux Terminal:**
```bash
curl -X POST https://YOUR-APP.vercel.app/api/chat-v2 \
  -H "Content-Type: application/json" \
  -d '{"conversation": [{"role": "user", "content": "Hello, this is a test from Proto Persona"}]}'
```

**Expected Response:**
```json
{
  "response": "Hello! I'm here to help...",
  "version": "v2-no-hmac",
  "timestamp": "2024-12-25T..."
}
```

✅ **PASS CRITERIA**: Receives a text response without errors

---

### Test 3: Multi-Turn Conversation
**Purpose**: Test Proto Persona's conversation memory

```bash
curl -X POST https://YOUR-APP.vercel.app/api/chat-v2 ^
  -H "Content-Type: application/json" ^
  -d "{\"conversation\": [{\"role\": \"user\", \"content\": \"My name is Nolan\"}, {\"role\": \"assistant\", \"content\": \"Nice to meet you, Nolan!\"}, {\"role\": \"user\", \"content\": \"What is my name?\"}]}"
```

✅ **PASS CRITERIA**: Bot remembers context from earlier messages

---

### Test 4: Error Handling Verification
**Purpose**: Ensure no `user_id` or `user_hash` errors

```bash
curl -X POST https://YOUR-APP.vercel.app/api/chat-v2 ^
  -H "Content-Type: application/json" ^
  -d "{\"conversation\": [{\"role\": \"user\", \"content\": \"Test\", \"user_id\": \"12345\", \"extra_field\": \"test\"}]}"
```

✅ **PASS CRITERIA**: Works normally (extra fields are stripped automatically)

---

### Test 5: CORS Headers Check
**Purpose**: Verify Proto Persona frontend can connect

```bash
curl -I https://YOUR-APP.vercel.app/api/chat-v2
```

✅ **PASS CRITERIA**: Response includes:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,POST,OPTIONS`

---

## 🔧 PART 3: INTEGRATION WITH PROTO PERSONA

### JavaScript Integration Code
```javascript
// Proto Persona Integration Example
const CHATBASE_API = 'https://YOUR-APP.vercel.app/api/chat-v2';

async function sendToProtoPersona(userMessage) {
  try {
    const response = await fetch(CHATBASE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conversation: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Proto Persona Error:', error);
    return 'Error connecting to chatbot';
  }
}

// Test the integration
sendToProtoPersona('Hello from Proto Persona')
  .then(response => console.log('Bot says:', response));
```

### Python Integration Code
```python
import requests
import json

CHATBASE_API = 'https://YOUR-APP.vercel.app/api/chat-v2'

def send_to_proto_persona(user_message):
    payload = {
        'conversation': [
            {
                'role': 'user',
                'content': user_message
            }
        ]
    }
    
    response = requests.post(
        CHATBASE_API,
        headers={'Content-Type': 'application/json'},
        data=json.dumps(payload)
    )
    
    return response.json()['response']

# Test the integration
response = send_to_proto_persona('Hello from Proto Persona')
print(f'Bot says: {response}')
```

---

## 📋 TESTING CHECKLIST FOR NOLAN

### Deployment Verification
- [ ] Vercel deployment successful
- [ ] Environment variables configured
- [ ] `/api/debug` shows both variables as "Set"

### API Functionality
- [ ] `/api/chat-v2` responds to POST requests
- [ ] No `user_id` or `user_hash` errors
- [ ] Responses include chatbot text
- [ ] Multi-turn conversations work

### Integration Requirements
- [ ] CORS headers present
- [ ] JSON request/response format working
- [ ] No authentication errors
- [ ] Response time under 5 seconds

### Proto Persona Specific
- [ ] Works with conversation array format
- [ ] Strips extra fields automatically
- [ ] Maintains conversation context
- [ ] No HMAC authentication required

---

## 🚨 TROUBLESHOOTING

### Issue: "Unrecognized key(s) in object: 'user_id', 'user_hash'"
**Status**: ✅ FIXED - This deployment removes these fields

### Issue: 500 Internal Server Error
**Fix**: Check environment variables in Vercel dashboard

### Issue: CORS Blocked
**Fix**: Use `/api/chat-v2` endpoint (has enhanced CORS)

### Issue: No Response
**Fix**: Check the conversation array format is exactly:
```json
{
  "conversation": [
    {"role": "user", "content": "message"}
  ]
}
```

---

## 📊 PERFORMANCE METRICS

### Expected Performance:
- **Response Time**: 1-3 seconds average
- **Uptime**: 99.9% (Vercel SLA)
- **Rate Limits**: 100 requests/10 seconds
- **Max Message Length**: 4000 characters
- **Timeout**: 30 seconds per request

---

## ✅ FINAL VERIFICATION

### Your API Endpoints:
- **Main**: `https://YOUR-APP.vercel.app/api/chat-v2`
- **Debug**: `https://YOUR-APP.vercel.app/api/debug`
- **Legacy**: `https://YOUR-APP.vercel.app/api/chat`

### Test Command (Copy & Paste):
Replace `YOUR-APP` with your actual Vercel URL:

```bash
curl -X POST https://YOUR-APP.vercel.app/api/chat-v2 -H "Content-Type: application/json" -d "{\"conversation\": [{\"role\": \"user\", \"content\": \"Proto Persona integration test successful\"}]}"
```

---

## 📞 SUPPORT CONTACTS

### For Deployment Issues:
- Vercel Support: https://vercel.com/support
- GitHub Repository: https://github.com/jsagir/-Mia_Chatbase_bridge_250825_V2

### For Integration Help:
- API Documentation: This guide
- Test Endpoint: `/api/debug`
- Error Logs: Vercel Dashboard → Functions → Logs

---

## 🎯 SUCCESS CRITERIA FOR NOLAN

The deployment is successful when:
1. ✅ No `user_id`/`user_hash` errors
2. ✅ Chatbot responds to messages
3. ✅ Proto Persona can integrate via JavaScript/Python
4. ✅ CORS allows frontend connections
5. ✅ Response time under 5 seconds

---

**Deployment Date**: December 25, 2024
**API Version**: v2-no-hmac
**Proto Persona Compatible**: ✅ YES