export function filterTransactionforCategory(obj, categoryId, type, date) {
    const filteredTransactions = {};
  
    for (const key in obj) {
      const transaction = obj[key];
  
      if (transaction.transactionType === type && transaction.category === categoryId && 
        new Date(transaction.date).getMonth() === date.month && 
        new Date(transaction.date).getFullYear() === date.year) {
        filteredTransactions[key] = transaction;
      }
    }
  
    return filteredTransactions;
  }


  export function totalCategoryAmount(filteredObj) {
    let totalAmount = 0;
  
    for (const key in filteredObj) {
      const transaction = filteredObj[key];
      totalAmount += parseFloat(transaction.amount); 
    }
  
    return totalAmount;
  }
  