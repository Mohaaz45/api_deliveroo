const axios = require('axios');

// Renseigne ici tes infos
const CLIENT_ID = 'sklu1b4ag2uqsn1dpvpqr7s56';
const CLIENT_SECRET = '19nc8sj6uk1h2g9akfsl6633p61km3hqq2huq72psr9j76ropgiq';

// Connexion à l'api Deliveroo
const getAccessToken = async () => {
    try {
      const response = await axios.post('https://auth-sandbox.developers.deliveroo.com/oauth2/token', new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      });
  
      const accessToken = response.data.access_token;
      console.log('✅ Access Token :', accessToken);
      return accessToken;
    } catch (error) {
      console.error('❌ Erreur lors de l\'authentification', error.message);
      if (error.response) {
        console.log('🛑 Réponse API:', error.response.data);
      }
    }
  };
  
  getAccessToken();
