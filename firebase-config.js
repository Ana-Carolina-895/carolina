// firebase-config.js — lê de env.js (nunca hardcode keys)
const _e = window.__ENV || {};

const firebaseConfig = {
  apiKey:            _e.FIREBASE_API_KEY,
  authDomain:        _e.FIREBASE_AUTH_DOMAIN,
  projectId:         _e.FIREBASE_PROJECT_ID,
  storageBucket:     _e.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: _e.FIREBASE_MESSAGING_SENDER_ID,
  appId:             _e.FIREBASE_APP_ID,
};

// Valida keys mínimas
const missing = Object.entries(firebaseConfig)
  .filter(([,v]) => !v || v.startsWith('AI') === false && v.includes('...'))
  .map(([k]) => k);

if (missing.length && !window.__ENV?.FIREBASE_API_KEY?.startsWith('AIza')) {
  console.warn('[firebase-config] Verifique env.js — keys ausentes ou template:', firebaseConfig);
}
