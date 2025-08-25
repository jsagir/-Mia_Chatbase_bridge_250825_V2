 1 +  # 🤝 Proto Persona ↔ Mia (Chatbase) Integration
         2 +
         3 +  Hey Nolan — Jonathan here.
         4 +
         5 +  This repo contains the **custom API bridge** that connects **Proto Persona** directly to **Mia
     (Chatbase)**. It fixes the auth issues you saw and provides a **drop-in endpoint** that is fully Proto-compatible.
           + (Chatbase)**. It fixes the auth issues you saw and provides a **drop-in endpoint** that is fully
           + Proto-compatible.
         6 +
         7 +  ---
         8 +
         9 +  ## 🌐 Production Endpoint
        10 +
        11 +  Use this URL for Proto Persona integration:
        12 +
        13 +  ```
        14 +  https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2
        15 +  ```
        16 +
        17 +  ---
        18 +
        19 +  ## 📋 Request / Response Format
        20 +
        21 +  ### Request (Proto → Mia)
        22 +
        23 +  ```json
        24 +  {
        25 +    "conversation": [
        26 +      {
        27 +        "role": "user",
        28 +        "content": "Hello from Proto Persona!"
        29 +      }
        30 +    ]
        31 +  }
        32 +  ```
        33 +
        34 +  ### Response (Mia → Proto)
        35 +
        36 +  ```json
        37 +  {
        38 +    "response": "Hi, I'm Mia! How can I help?",
        39 +    "version": "v2-no-hmac",
        40 +    "timestamp": "2025-08-25T12:17:15.034Z"
        41 +  }
        42 +  ```
        43 +
        44 +  ---
        45 +
        46 +  ## 🧪 Testing
        47 +
        48 +  You can test immediately with:
        49 +
        50 +  ```bash
        51 +  curl -X POST https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2 \
        52 +    -H "Content-Type: application/json" \
        53 +    -d '{"conversation": [{"role": "user", "content": "Hello, Proto Persona is working!"}]}'
        54 +  ```
        55 +
        56 +  ✅ Should return a greeting from Mia.
        57 +
        58 +  ---
        59 +
        60 +  ## 💬 Multi-Turn Conversation Example
        61 +
        62 +  ```json
        63 +  {
        64 +    "conversation": [
        65 +      {"role": "user", "content": "My name is Nolan"},
        66 +      {"role": "assistant", "content": "Nice to meet you, Nolan!"},
        67 +      {"role": "user", "content": "What is my name?"}
        68 +    ]
        69 +  }
        70 +  ```
        71 +
        72 +  ✅ Mia will remember: `"Your name is Nolan!"`
        73 +
        74 +  ---
        75 +
        76 +  ## 🔍 Debug Endpoints
        77 +
        78 +  Check API status:
        79 +  ```bash
        80 +  curl https://mia-chatbase-bridge-250825-v2.vercel.app/api/debug
        81 +  ```
        82 +
        83 +  Health check:
        84 +  ```bash
        85 +  curl https://mia-chatbase-bridge-250825-v2.vercel.app/api/test
        86 +  ```
        87 +
        88 +  ---
        89 +
        90 +  ## 🔌 Integration Code Examples
        91 +
        92 +  ### JavaScript
        93 +  ```javascript
        94 +  const MIA_API = 'https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2';
        95 +
        96 +  async function askMia(message) {
        97 +    const response = await fetch(MIA_API, {
        98 +      method: 'POST',
        99 +      headers: {'Content-Type': 'application/json'},
       100 +      body: JSON.stringify({
       101 +        conversation: [{role: 'user', content: message}]
       102 +      })
       103 +    });
       104 +    return (await response.json()).response;
       105 +  }
       106 +
       107 +  // Usage
       108 +  askMia('Hello from Proto!').then(console.log);
       109 +  ```
       110 +
       111 +  ### Python
       112 +  ```python
       113 +  import requests
       114 +
       115 +  MIA_API = 'https://mia-chatbase-bridge-250825-v2.vercel.app/api/chat-v2'
       116 +
       117 +  def ask_mia(message):
       118 +      response = requests.post(MIA_API, json={
       119 +          'conversation': [{'role': 'user', 'content': message}]
       120 +      })
       121 +      return response.json()['response']
       122 +
       123 +  # Usage
       124 +  print(ask_mia('Hello from Proto!'))
       125 +  ```
       126 +
       127 +  ---
       128 +
       129 +  ## 📌 Summary
       130 +
       131 +  * **Problem**: Proto starter code caused `"user_id", "user_hash"` Chatbase auth errors
       132 +  * **Fix**: Built proxy API that strips fields + handles auth internally
       133 +  * **Deployment**: GitHub → Vercel with env vars (already done ✅)
       134 +  * **Testing**: Use provided `curl` scripts above
       135 +  * **Status**: ✅ Live, stable, and production-ready
       136 +
       137 +  ---
       138 +
       139 +  ## 📞 Contact
       140 +
       141 +  **GitHub**: https://github.com/jsagir/-Mia_Chatbase_bridge_250825_V2
       142 +  **Issues**: Create an issue if you encounter any problems
       143 +  **Email**: jsagir@gmail.com
       144 +
       145 +  ---
       146 +
       147 +  👉 **Nolan only needs to point Proto Persona to the endpoint above — nothing else.**
       148 +
       149 +  ---
       150 +
       151    *Built with ❤️ for Proto Persona by Jonathan Sagir*
       152   \ No newline at end of file
