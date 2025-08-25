 2 +  # 🤝 Proto Persona ↔ Mia (Chatbase) Integration
         3 +
         4 +  This repository contains a **custom API bridge** that connects **Proto Persona** directly to **Mia
           + (Chatbase)**.
         5 +  It resolves authentication issues (`user_id`, `user_hash`) and provides clean, production-ready
     responses.
           +
         6 +
         7 +  ---
         8 +
         9 +  ## ⚡ Quick Start
        10 +
        11 +  Integrate in **3 simple steps**:
        12 +
        13 +  ### 1. Copy the Production Endpoint
        14 +  ```
        15 +  https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2
        16 +  ```
        17 +
        18 +  ### 2. Send a Request
        19 +  ```bash
        20 +  curl -X POST https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2 \
        21 +    -H "Content-Type: application/json" \
        22 +    -d '{"conversation": [{"role": "user", "content": "Hello from Proto Persona!"}]}'
        23 +  ```
        24 +
        25 +  ### 3. Get a Response
        26 +  ```json
        27 +  {
        28 +    "response": "Hi, I'm Mia! How can I help?",
        29 +    "version": "v2-no-hmac",
        30 +    "timestamp": "2025-08-25T12:17:15.034Z"
        31 +  }
        32 +  ```
        33 +
        34 +  ✅ Done! Proto Persona is now integrated with Mia.
        35 +
        36 +  ---
        37 +
        38 +  ## 📌 Summary
        39 +
        40 +  ### Problem
        41 +  The original **Proto Persona starter code** sent extra fields (`user_id`, `user_hash`) to Chatbase.
        42 +  This caused errors:
        43 +  ```json
        44 +  {"error": "Unrecognized key(s) in object: 'user_id', 'user_hash'"}
        45 +  ```
        46 +
        47 +  ### Fix
        48 +  This bridge API:
        49 +  * Strips out `user_id` and `user_hash` automatically
        50 +  * Sends only what Chatbase expects
        51 +  * Returns clean, simplified responses
        52 +  * Supports **multi-turn conversations** with memory
        53 +
        54 +  ### Deployment
        55 +  * Hosted on **Vercel**
        56 +  * Code available on **GitHub**
        57 +  * Production endpoint:
        58 +    ```
        59 +    https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2
        60 +    ```
        61 +
        62 +  ### Testing
        63 +
        64 +  **Basic Chat Test**
        65 +  ```bash
        66 +  curl -X POST https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2 \
        67 +    -H "Content-Type: application/json" \
        68 +    -d '{"conversation": [{"role": "user", "content": "Hello"}]}'
        69 +  ```
        70 +
        71 +  ✅ Expected response:
        72 +  ```json
        73 +  {
        74 +    "response": "Hi, I'm Mia! How can I help?",
        75 +    "version": "v2-no-hmac",
        76 +    "timestamp": "2025-08-25T12:17:15.034Z"
        77 +  }
        78 +  ```
        79 +
        80 +  **Multi-Turn Conversation Test**
        81 +  ```bash
        82 +  curl -X POST https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2 \
        83 +    -H "Content-Type: application/json" \
        84 +    -d '{
        85 +      "conversation": [
        86 +        {"role": "user", "content": "My name is Alice"},
        87 +        {"role": "assistant", "content": "Nice to meet you, Alice!"},
        88 +        {"role": "user", "content": "What is my name?"}
        89 +      ]
        90 +    }'
        91 +  ```
        92 +
        93 +  ✅ Expected response:
        94 +  ```json
        95 +  {
        96 +    "response": "Your name is Alice!",
        97 +    "version": "v2-no-hmac",
        98 +    "timestamp": "2025-08-25T12:17:15.034Z"
        99 +  }
       100 +  ```
       101 +
       102 +  ### Status
       103 +  * ✅ Live
       104 +  * ✅ Stable
       105 +  * ✅ Ready for **Proto Persona integration**
       106 +
       107 +  ---
       108 +
       109 +  ## 📋 Request / Response Format
       110 +
       111 +  ### Request (Proto → Mia)
       112 +  ```json
       113 +  {
       114 +    "conversation": [
       115 +      {
       116 +        "role": "user",
       117 +        "content": "Message from Proto Persona user"
       118 +      }
       119 +    ]
       120 +  }
       121 +  ```
       122 +
       123 +  ### Response (Mia → Proto)
       124 +  ```json
       125 +  {
       126 +    "response": "Mia's response text",
       127 +    "version": "v2-no-hmac",
       128 +    "timestamp": "ISO-8601 timestamp"
       129 +  }
       130 +  ```
       131 +
       132 +  ---
       133 +
       134 +  ## 🔍 Debug Endpoints
       135 +
       136 +  Check API status:
       137 +  ```bash
       138 +  curl https://mia-chatbase-bridge-250825-v2.vercel.app/api/debug
       139 +  ```
       140 +
       141 +  Health check:
       142 +  ```bash
       143 +  curl https://mia-chatbase-bridge-250825-v2.vercel.app/api/test
       144 +  ```
       145 +
       146 +  ---
       147 +
       148 +  ## 🔌 Integration Code Examples
       149 +
       150 +  ### JavaScript
       151 +  ```javascript
       152 +  const MIA_API = 'https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2';
       153 +
       154 +  async function askMia(message) {
       155 +    const response = await fetch(MIA_API, {
       156 +      method: 'POST',
       157 +      headers: {'Content-Type': 'application/json'},
       158 +      body: JSON.stringify({
       159 +        conversation: [{role: 'user', content: message}]
       160 +      })
       161 +    });
       162 +    return (await response.json()).response;
       163 +  }
       164 +
       165 +  // Usage
       166 +  askMia('Hello from Proto!').then(console.log);
       167 +  ```
       168 +
       169 +  ### Python
       170 +  ```python
       171 +  import requests
       172 +
       173 +  MIA_API = 'https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2'
       174 +
       175 +  def ask_mia(message):
       176 +      response = requests.post(MIA_API, json={
       177 +          'conversation': [{'role': 'user', 'content': message}]
       178 +      })
       179 +      return response.json()['response']
       180 +
       181 +  # Usage
       182 +  print(ask_mia('Hello from Proto!'))
       183 +  ```
       184 +
       185 +  ---
       186 +
       187 +  ## 📞 Contact
       188 +
       189 +  **GitHub**: https://github.com/jsagir/-Mia_Chatbase_bridge_250825_V2
       190 +  **Issues**: Create an issue if you encounter any problems
       191 +  **Email**: jsagir@gmail.com
       192 +
       193 +  ---
       194 +
       195 +  *Built for Proto Persona by Jonathan Sagir*
       196   \ No newline at end of file
