 const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Simple API to accept contact form data and save to contacts.json
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ ok: false, error: "Missing fields" });
  }

  const contactsFile = path.join(__dirname, 'contacts.json');
  let contacts = [];

  if (fs.existsSync(contactsFile)) {
    try {
      contacts = JSON.parse(fs.readFileSync(contactsFile));
    } catch (e) {
      contacts = [];
    }
  }

  contacts.push({ 
    name, 
    email, 
    message, 
    date: new Date().toISOString() 
  });

  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));

  console.log("New contact:", name, email);
  return res.json({ ok: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
