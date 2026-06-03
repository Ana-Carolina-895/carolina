# Carolina Alves — Sistema de Vitrine

## Estrutura de arquivos

```
loja/
├── index.html          → página principal (já existia)
├── vitrine.html        → vitrine pública de produtos
├── admin.html          → painel administrativo
├── firebase-config.js  → lê as keys de env.js
├── env.js              → suas keys (NÃO subir pro git)
├── env.example.js      → template para copiar
└── .gitignore          → ignora env.js automaticamente
```

---

## Setup Firebase (passo a passo)

### 1. Criar projeto no Firebase
- Acesse https://console.firebase.google.com
- "Adicionar projeto" → dê um nome → criar

### 2. Ativar Authentication
- Menu lateral → Authentication → Get Started
- Aba "Sign-in method" → ativar **Email/Senha**
- Aba "Users" → "Add user" → cadastre o email e senha da Carolina

### 3. Ativar Firestore
- Menu lateral → Firestore Database → Create database
- Escolha **Production mode**
- Selecione a região (recomendado: `southamerica-east1`)

### 4. Ativar Storage
- Menu lateral → Storage → Get Started
- Production mode → mesma região

### 5. Regras de segurança (copie exatamente)

**Firestore** (Rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Vitrine lê produtos visíveis
    match /products/{id} {
      allow read: if resource.data.hidden == false;
      allow write: if request.auth != null;
    }
    // Categorias: leitura pública, escrita só autenticado
    match /categories/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Storage** (Rules):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Leitura pública para imagens e downloads
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /downloads/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 6. Pegar as keys
- Menu lateral → Configurações do projeto (⚙️) → Geral
- Role até "Seus apps" → clique em `</>` (Web)
- Registre o app → copie o objeto `firebaseConfig`

### 7. Criar env.js
Copie `env.example.js` → renomeie para `env.js` → preencha com seus valores:

```js
window.__ENV = {
  FIREBASE_API_KEY: "AIza...",
  FIREBASE_AUTH_DOMAIN: "seu-projeto.firebaseapp.com",
  FIREBASE_PROJECT_ID: "seu-projeto",
  FIREBASE_STORAGE_BUCKET: "seu-projeto.appspot.com",
  FIREBASE_MESSAGING_SENDER_ID: "000000000",
  FIREBASE_APP_ID: "1:000:web:abc123"
};
```

---

## Uso

| Arquivo | Função |
|---|---|
| `admin.html` | Login + cadastrar/editar/ocultar produtos e categorias |
| `vitrine.html` | Vitrine pública com filtro por categoria |

## Link vitrine no index.html

No `index.html` existente, o card "Recomendações" aponta para `#`.  
Troque para:
```html
<a href="vitrine.html" class="card">
```

---

## Obs. de segurança
- `env.js` está no `.gitignore` — nunca suba para repositório público
- As regras do Firestore/Storage impedem escrita sem autenticação
- Apenas a conta cadastrada no Firebase Auth consegue fazer login no admin
