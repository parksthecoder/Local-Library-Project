const {findAccountById} = require('./accounts');

// find the author that matches id input
// loop over the id key in each author in array of objects --> authors and find matching id input
function findAuthorById(authors, id) {
  let findAuthor = authors.find((author) => author.id === id)
  return findAuthor
}

// find the book that matches id input
// loop over the id key out of each book in array of objects --> books and find matching id input
function findBookById(books, id) {
  let findBook = books.find((book) => book.id === id)
  return findBook
}

// filter out an array of books that are available and filter out an array of books that are currently borrowed
// loop over the first index item [0] in borrows key in each book in array of objects --> books and filter if books are available or borrowed with the returned key
function partitionBooksByBorrowedStatus(books) {
  // console.log("books ==>", books, "<==")
    
  // set variable to filter out availible books
    const available = books.filter((book) => book.borrows[0].returned);
    // console.log("available books ===>", available, "<==")
  // set variable to filter out borrowed books
    const borrowed = books.filter((book) => !book.borrows[0].returned);
    // console.log("borrowed books ===>", borrowed, "<==")
    return [borrowed, available];
  }

// map out an array of borrowers for a matching book input 
// loop over and map out each borrow in in array of objects -->borrows for book input and return borrow.id and borrow.returned followed by account info
  function getBorrowersForBook(book, accounts) {
    const allBorrowers = book.borrows.map((borrow) => {
      // using the findAccountById function created in accounts.js find account of each borrow in the book
      const account = findAccountById(accounts, borrow.id);
      return {
        id: borrow.id, 
        returned: borrow.returned, 
        ...account
      };
    });
  
    while(allBorrowers.length > 10) {
      allBorrowers.pop();
    }
  
    return allBorrowers;
  }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
