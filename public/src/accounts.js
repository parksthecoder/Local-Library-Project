// find the account that matches id input
// loop over each id key in each account in array of objects --> accounts and FIND matching id input
function findAccountById(accounts, id) {
  let findAccount = accounts.find((account) => account.id === id)
  return findAccount
}

// sort out accounts by last name
// loop over each name.last key in each account and SORT by last name
function sortAccountsByLastName(accounts) {
  const sortAccounts = accounts.sort((accountA, accountB) => 
  accountA.name.last < accountB.name.last ? -1 : 1)
  return sortAccounts
}

// reduce/accumlate total number of borrows for matching account input
// loop over each id key in each borrows array of objects in each book in books array of objects and REDUCE/accumulate (acc++) for each borrow if SOME borrow.id matches account.id input
function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    if(book.borrows.some(borrow => borrow.id === account.id)) acc++;
    return acc;
  }, 0);
}

// 
// 
function getBooksPossessedByAccount(account, books, authors) {
  // console.log("authors ==>", authors, "<==");
  // console.log("books ==>", books, "<==");
  // console.log("account ==>", account, "<==");


  // filter borrowed book by book id to match the account id
  const borrows = books.filter((book) => book.borrows[0].id === account.id)
  // console.log("borrows ==>", borrows, "<==");


  // map the borrows array element by element
  return borrows.map((borrow) => {


    // find the author by id for each one of the borrows
    const author = authors.find((author) => author.id === borrow.authorId);

    
    // return the full details of the borrowed book
    return {
      id: borrow.id,
      title: borrow.title,
      genre: borrow.genre,
      authorId: borrow.authorId,
      author: author,
      borrows: borrow.borrows
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
