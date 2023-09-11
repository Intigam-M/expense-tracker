export function filterTransactionforExpenseCat(obj, categoryId, type) {
    const filteredTransactions = {};
  
    for (const key in obj) {
      const transaction = obj[key];
  
      if (transaction.transactionType === type && transaction.category === categoryId) {
        filteredTransactions[key] = transaction;
      }
    }
  
    return filteredTransactions;
  }


  export function totalExpenseCatAmount(filteredObj) {
    let totalAmount = 0;
  
    for (const key in filteredObj) {
      const transaction = filteredObj[key];
      totalAmount += parseFloat(transaction.amount); 
    }
  
    return totalAmount;
  }
  