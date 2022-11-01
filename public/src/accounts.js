const { findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  let foundAccount = {}; 
  for ( let j = 0; j < accounts.length; j++) {
    if (accounts[j].id === id) foundAccount = accounts[j]; 
  }
  return foundAccount;  
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountsA, accountsB) =>
          (accountsA.name.last > accountsB.name.last ? 1 : -1)
          ); 

}; 


// Return a number, that is the total amount of times an ID has checked out any book 



// iterate through the books array, find the borrows array 
// forEach? filter?
// then go through the borrows array and find where the id matches the account id given 
// 
// then add a number to our accounNumberOfBorrows 
// return that number 

function getTotalNumberOfBorrows(account, books) {
  console.log("account =", account.id);
  let total = 0; 
  books.forEach((book) => { 
    book.borrows.forEach((borrowsId) => { 
      account.id === borrowsId.id ? total++ : null
    }); 
  }); 
  return total; 
}


 /* 
first need to define the array that we are doing to add to 
we need to iterate through the books array and find where they have checked out books 
need to find where the id in the account object matches the borrows array id and is true 
add the book to the array
what about map?
then we need to go through the author list and find the author that matches the book that we have added to the array 
add the author information that matches to the array that we created 
 */
function getBooksPossessedByAccount(account, books, authors) {
const borrowedBooks = books.filter(book => book.borrows.some(borrow => (!borrow.returned && borrow.id === account.id)));
const result = []; 
borrowedBooks.forEach(book => {
  const bookAuthor = findAuthorById(authors, book.authorId);
  result.push({
    id: book.id,
    title: book.title, 
    genre: book.genre, 
    authorId: book.authorId,
    author: bookAuthor, 
    borrows: book.borrows, 
  });
});
return result; 
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
