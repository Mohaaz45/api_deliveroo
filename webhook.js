const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const commandes = []; // Stockage en mémoire des commandes

// ✅ Route webhook : reçoit les commandes de Deliveroo
app.post('/webhook/orders', (req, res) => {
  const payload = req.body;

  console.log('🆕 Nouvelle commande reçue :', JSON.stringify(payload, null, 2));

  if (payload?.body?.order) {
    commandes.push(payload.body.order);
  }

  res.status(200).send('OK');
});

// ✅ Route web : affiche les commandes dans une page HTML
app.get('/', (req, res) => {
  let html = `
    <html>
    <head>
      <title>Commandes Deliveroo</title>
      <meta charset="utf-8" />
      <style>
        body { font-family: sans-serif; padding: 20px; }
        li { margin-bottom: 10px; }
        hr { margin: 10px 0; }
      </style>
    </head>
    <body>
      <h1>📦 Commandes Deliveroo</h1>
      ${commandes.length === 0 ? "<p>Aucune commande reçue</p>" : ""}
      <ul>
        ${commandes.map((cmd, i) => `
          <li>
            <strong>#${cmd.display_id}</strong> – ${cmd.customer?.first_name ?? "Client inconnu"}<br>
            Statut : <strong>${cmd.status}</strong> | Total : <strong>${(cmd.total_price.fractional / 100).toFixed(2)} €</strong>
            <ul>
              ${cmd.items.map(item => `
                <li>
                  ${item.quantity} x ${item.name}
                  ${item.modifiers.length > 0 ? `
                    <ul>
                      ${item.modifiers.map(mod => `<li>→ ${mod.name}</li>`).join("")}
                    </ul>` : ""}
                </li>
              `).join("")}
            </ul>
          </li>
          <hr>
        `).join("")}
      </ul>
    </body>
    </html>
  `;
  res.send(html);
});

// ✅ Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
