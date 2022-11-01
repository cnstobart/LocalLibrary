function getTotalBooksCount(books) {
  return books.length; 
}; 

function getTotalAccountsCount(accounts) {
  return accounts.length; 
}; 

function getBooksBorrowedCount(books) {
  var totalBorrowed = 0;
  books.forEach((book) => {
    book.borrows.find((borrow) => {!borrow.returned ? totalBorrowed++ : null });
   });
   console.log(totalBorrowed); 
   return totalBorrowed; 
  }
  
  function getMostCommonGenres(books) {
   const genres = getAllGenres(books);
   const countList =[]; 
   genres.forEach((genre) => {
    const countGenres = books.filter(book => book.genre === genre);
    countList.push(countGenres.length); 

   });

   return makeSortedTopFiveNameCountArray(genres, countList); 
}

function getMostPopularBooks(books) {
  const countList = []; 
  const bookList = []; 
  const bookIdList = []; 
  books.forEach((book) => {
    if(!bookIdList.includes(book.id)){
      bookIdList.push(book.id);
      bookList.push(book.title);
      countList.push(book.borrows.length);
    };
  }); 
  return makeSortedTopFiveNameCountArray(bookList, countList);
}

function getMostPopularAuthors(books, authors) {
  const countList = []; 
  const authorList = []; 
  const authorIdList = []; 
  authors.forEach((author) => {
    if(!authorIdList.includes(author.id)){
      authorIdList.push(author.id);
      authorList.push(`${author.name.first} ${author.name.last}`);

      const authorBooks = books.filter(book => book.authorId === author.id);
      const authorBooksBorrows = authorBooks.map(book => book.borrows.length);

      countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });
  return makeSortedTopFiveNameCountArray (authorList, countList); 
}

function getAllGenres(books) {
  const allGenres = []; 
  books.forEach((book) => {
    if(!allGenres.includes(book.genre)) allGenres.push(book.genre);
  });
  return allGenres; 
}

function makeNameAndCountArray (nameList, countList){
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name:desc, count: countList[index]});
    return acc; 
  }, []);
  return result; 
}

function orderByCount (nameCount){
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}

function topFive (list){
  for (let i = 0; i < list.length; i++){
    if (list.length > 5){
      list.pop();
    }
  }
  return list; 
}

function makeSortedTopFiveNameCountArray (nameList, countList) {
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result); 
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
