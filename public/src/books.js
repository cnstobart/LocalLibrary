function findAuthorById(authors, id) {
  let findAuthor = {}; 
  for (let i = 0; i< authors.length; i++){
    if( authors[i].id === id)
    findAuthor = authors[i]; 
  }
  return findAuthor; 
}

function findBookById(books, id) {
  let findBook = {}; 
  for (let j = 0; j < books.length; j++){
    if (books[j].id === id)
    findBook = books[j]; 
  }
  return findBook; 
}

/*

*/

function partitionBooksByBorrowedStatus(books) {
  const returned = [books.filter(book => book.borrows.every(borrow =>(borrow.returned)))]; 
  const checkedOut = [books.filter(book => book.borrows.some(borrow =>(!borrow.returned)))]; 

  let allBooks = [
    ...checkedOut, 
    ...returned, 
  ];  
  console.log(allBooks); 
  return allBooks; 
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows; 
  const result = []; 

  borrows.forEach(borrow => {
    if (result.length >= 10) return; 
    const borrower = accounts.find(account => account.id === borrow.id);
    const borrowerFormatted = {
      ...borrow,
      ...borrower,
    };
    result.push(borrowerFormatted);
  });
console.log(result);
return result;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
