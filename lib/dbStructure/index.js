// Umumi database strukturunu yaradiriq
export const generalData = {
    actionType: [
        {
            id: 1,
            title: "Income"
        },
        {
            id: 2,
            title: "Expense"
        },
        {
            id: 3,
            title: "Transfer"
        }
    ]
}

// User qeyd olduqda ona aid olan database strukturunu yaradiriq
export const userData = {
    expense: [
        {
            id: 1,
            title: "test ucun"
        },
        {
            id: 2,
            title: "hello world fdf"
        },
    ],
    income: [
        {
            id: 1,
            title: "Salary"
        }
    ],
    debitCard: [
        {
            id: 1,
            title: "hello world fdf"
        }
    ],
    wallet: [
        {
            id: 1,
            title: "hello world fdf"
        }
    ],
    cashbox: [
        {
            id: 1,
            date: "2021-09-15",
            type: "income",
            category: 5,
            account: "wallet",
            amount: 100,
            note: "hello world"
        },
    ]
}