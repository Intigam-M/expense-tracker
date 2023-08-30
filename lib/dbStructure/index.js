// Umumi database strukturunu yaradiriq
export const generalData = {
    transactionType: [
        {
            id: 1,
            name: "Income"
        },
        {
            id: 2,
            name: "Expense"
        },
        {
            id: 3,
            name: "Transfer"
        }
    ],
    currency: [
        {
            id: 1,
            name: "AZN"
        },
        {
            id: 2,
            name: "USD"
        }
    ],
    accountType: [
        {
            id: 1,
            name: "Regular"
        },
        {
            id: 2,
            name: "Debt"
        },
        {
            id: 3,
            name: "Savings"
        }
    ],
}

// User qeyd olduqda ona aid olan database strukturunu yaradiriq
export const userData = {
    expenseCategory: [
        {
            id: 1,
            name: "test ucun",
            icon: "test",
            subCategory: [
                {
                    id: 1,
                    name: "test ucun",
                    icon: "test",
                }
            ]
        }

    ],
    incomeCategory: [
        {
            id: 1,
            name: "Salary",
            icon: "test",
        }
    ],
    account: [
        {
            id: 1,
            name: "hello world fdf",
            type: 1,
            balance: 100,
            creditLimit: 0,
            currency: 1,
            balanceImpact: true,
            icon: "test",
            description: "hello world"
        }
    ],
    transaction: [
        {
            id: 1,
            date: "2021-09-15",
            transactionType: 2,
            category: 5,
            account: 1,
            amount: 100,
            currency: 1,
            note: "hello world"
        },
    ]
}