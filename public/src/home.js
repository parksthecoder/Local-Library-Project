// import findAuthorById function from books.js using require
const{findAuthorById} = require('./books');

// reduce/accumulate the total count of ALL the books
function getTotalBooksCount(books) {
  const totalBooks = books.reduce((total) => total += 1, 0)
  return totalBooks
}

// reduce/accumulate the total count of ALL the accounts
function getTotalAccountsCount(accounts) {
  const totalAccounts = accounts.reduce((total) => total += 1, 0)
  return totalAccounts
}

//using two for loops and setting an accumulater variable to add up how many books are borrowed and !returned
function getBooksBorrowedCount(books) {
  // console.log(books);
  let counter = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      // console.log(books[i].borrows[j])
      if (books[i].borrows[j].returned === false) {
        counter++
      }
    }
  }
  return counter 
}



// helper function --> create an object with name input and count input
function createObject(name, count) {
  return {
    name: name,
    count: count
  }
};

// helper function --> delete extra objects over a num input
function deleteExtraObjects(arr, num) {
  while(arr.length > num) {
    arr.pop();
  }
}


//get the most common genres then sort only the top 5 in descending order
function getMostCommonGenres(books) {
  // setting an empty array for genres
  const genres = [];

  books.forEach((book) => {
    const genreName = book.genre;
    
    // if the genre has already been added as an object
    let found = false;
    genres.forEach((genre) => {
      if(genre.name === genreName) {
        genre.count++;
        found = true;
        return;
      }
    });

    // create the genre, if it doesn't already exist
    if(!found) {
      genres.push(createObject(genreName, 1));
    }
  });

  // sorts genre by count in descending order
  genres.sort((genreA, genreB) => (genreA.count > genreB.count ? -1 : 1));

  // delete extra genres (max 5)
  deleteExtraObjects(genres, 5);

  return genres;
}




// Top 5
function getMostPopularBooks(books) {
  // note: popularity is measured by times a book has been borrowed
  const popularBooks = [];

  books.forEach((book) => {
    popularBooks.push(createObject(book.title, book.borrows.length));
  });

  popularBooks.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  deleteExtraObjects(popularBooks, 5);

  return popularBooks;
}




function getMostPopularAuthors(books, authors) {
  // note: popularity is measured by times an author's book has been borrowed
  const popularAuthors = [];

  books.forEach((book) => {
    let authorName = findAuthorById(authors, book.authorId).name;
    const numBorrows = book.borrows.length;

    // if the author has already been added as an object
    let found = false;
    popularAuthors.forEach((author) => {
      if(author.name === authorName) {
        author.count += numBorrows;
        found = true;
        return;
      }
    });

    if(!found) {
      popularAuthors.push(
        createObject(authorName.first + " " + authorName.last, numBorrows));
    }
  });

  popularAuthors.sort((authorA, authorB) => 
    (authorA.count > authorB.count ? -1 : 1));
  deleteExtraObjects(popularAuthors, 5);

  return popularAuthors;
}




module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
