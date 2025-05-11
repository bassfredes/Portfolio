import { google } from 'googleapis';
import readline from 'readline';

// Para ejecutar este script usa: npx tsx scripts/get-gmail-refresh-token.ts
// Si no detecta las keys > export $(grep -v '^#' .env.local | xargs) && npx tsx scripts/get-gmail-refresh-token.ts
// O bien cambia la extensión a .mjs y ejecuta con node --loader tsx

const CLIENT_ID = process.env.GMAIL_CLIENT_ID!;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET!;
const REDIRECT_URI = "http://localhost:3000";

console.log('CLIENT_ID:', CLIENT_ID);
console.log('CLIENT_SECRET:', CLIENT_SECRET);
console.log('REDIRECT_URI:', REDIRECT_URI);

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ['https://mail.google.com/'];

async function main() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
  console.log('Visita esta URL y autoriza la app:', authUrl);

  // Espera el código de autorización por consola
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Pega el código de autorización aquí: ', async (code: string) => {
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      console.log('REFRESH TOKEN:', tokens.refresh_token);
    } catch (err) {
      console.error('Error al obtener el token', err);
    } finally {
      rl.close();
    }
  });
}

main();
