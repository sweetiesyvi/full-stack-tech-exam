import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const uri = process.env.MONGO_URI;

/*
👇🏻 no mods needed, this starts on 3000 unless (like for render) your PaaS assigns you a port. It's a little cleaner.
*/ 
const PORT = process.env.PORT || 3000;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
if (!uri) {
  console.error('MONGO_URI is missing in the .env file');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Change this to your own sample name + emoji
const yourNameAndEmoji = { name: 'sweetie', emoji: '🍭' };

//app instantiations
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'exam.html'));
});

app.post('/api/get-name', async (req, res) => {
  try {
    const { userName } = req.body;

    if (!userName) {
      return res.status(400).json({ error: 'Missing name' });
    }

    const db = client.db('cis486');
    const collection = db.collection('exam');

    const result = await collection.findOne({ name: userName.trim() });

    if (!result) {
      return res.status(404).json({ error: 'Name not found' });
    }

    return res.status(200).json({
      message: 'Name found',
      name: result.name,
      emoji: result.emoji
    });
  } catch (error) {
    console.error('Error retrieving name:', error);
    return res.status(500).json({ error: 'Failed to retrieve name' });
  }
});

/* 
👇🏻no modifications needed for this endpoint, but you do have to figure out where, when, & how to call it at least once!
*/
app.get('/api/init-emoji', async (req, res) => {
  try {
    const db = client.db('cis486');
    const collection = db.collection('exam');
    
    // Check if name already exists
    const existingEntry = await collection.findOne({ name: yourNameAndEmoji.name });

    if (existingEntry) {
      return res.json({
        message: 'Name already exists',
        data: existingEntry
      });
    }
    
    // Only insert if name doesn't exist
  const result = await collection.insertOne(yourNameAndEmoji);

    return res.json({
      message: 'name & emoji recorded',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error creating entry:', error);
    return res.status(500).json({ error: 'Failed to initialize emoji data' });
  }
});

/*
👇🏻notice the refactored app.listen:
no code mods needed but this uses the PORT variable for PaaS deployments
*/ 
//start the server. 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
app.post('/api/set-emoji', async (req, res) => {
  try {
    const { name, emoji } = req.body;

    if (!name || !emoji) {
      return res.status(400).json({ error: 'Name and emoji are required' });
    }

    const db = client.db('cis486');
    const collection = db.collection('exam');

    await collection.updateOne(
      { name: name.trim() },
      { $set: { name: name.trim(), emoji: emoji.trim() } },
      { upsert: true }
    );

    return res.status(200).json({ message: 'Emoji saved successfully' });
  } catch (error) {
    console.error('Error saving emoji:', error);
    return res.status(500).json({ error: 'Failed to save emoji' });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();