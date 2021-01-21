let mongoose = require("mongoose");
let db = require("../models/index.js");

mongoose.connect("mongodb://localhost/googlebooks", {
  useNewUrlParser: true,
  useFindAndModify: false
});

//mongoose.connect(
  //process.env.MONGODB_URI || 'mongodb://localhost/googlebooks',
  //{
    //useNewUrlParser:true,
    //seUnifiedTopology: true,
    //useCreateIndex: true,
   //useFindAndModify: false
  //}
//);

let googlebooksSeed = [
  {
    authors: ["Suzanne Collins"],
    description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
    image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
    title: "The Hunger Games"
  }
];

db.Book.deleteMany({})
  .then(() => db.Book.collection.insertMany(googlebooksSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
