export function filterTransactionforCategory(obj, categoryId, type, date) {
    const filteredTransactions = {};
    const startDate = new Date(date.startDate)
    const endDate = new Date(date.endDate)

    for (const key in obj) {
        const transaction = obj[key];
        const transactionDate = new Date(transaction.date)

        if (transaction.transactionType === type && transaction.category === categoryId && transactionDate >= startDate && transactionDate <= endDate) {
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
