const mongoose = require('mongoose');
const faker = require("@faker-js/faker").faker;

const MONGO = "mongodb+srv://saritayadav45522_db_user:ZUwoumcWzobkAP0C@cluster0.5ldsq1d.mongodb.net/recordstore?appName=Cluster0";

mongoose.connect(MONGO)
  .then(() => console.log("✅ Mongo connected"))
  .catch(err => console.error(err));

const recordSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  price: Number,
  year: Number,
  description: String,
  coverUrl: String,
  tags: [String]
});

const Record = mongoose.model("Record", recordSchema);

function generateRecords(count = 100) {
  const genres = ["House", "Techno", "Ambient", "Bass", "Electronic", "Minimal"];
  const records = [];

  for (let i = 0; i < count; i++) {
    records.push({
      title: faker.music.songName(),
      artist: faker.music.artist(),
      genre: genres[Math.floor(Math.random() * genres.length)],
      price: faker.commerce.price({ min: 10, max: 50 }),
      year: faker.date.past().getFullYear(),
      description: faker.commerce.productDescription(),
      coverUrl: `https://picsum.photos/seed/${Math.random()}/500/500`,
      tags: [faker.word.noun(), faker.word.noun()]
    })
  }
  return records;
}

async function seed() {
  await Record.deleteMany({});
  await Record.insertMany(generateRecords(100));
  console.log("🌱 100 records added successfully");
  process.exit();
}

seed();
