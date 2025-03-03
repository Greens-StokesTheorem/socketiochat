const fs = require("fs");
const data = fs.readFileSync('./config.json');

const books =
{
    title: "Alli goes to school",
    genre: "Fiction",
    type: "Children",
    pages: 56
};

const jsonData = JSON.stringify(books, null, 2);

// fs.writeFile("config.json", jsonData, 'utf8', (err) => {
//     if (err) {
//         console.error('Error writing to file', err);
//     } else {
//         console.log('Data written to file');
//     }
// });



console.log(JSON.parse(data));