// Umumi database strukturunu yaradiriq
export const generalData = {
    generalData: {
        transactionType: {
            1: {
                name: "Income"
            },
            2: {
                name: "Expense"
            },
            3: {
                name: "Transfer"
            }
        },
        currency: {
            1: {
                name: "AZN"
            },
            2: {
                name: "USD"
            }
        },
        accountType: {
            1: {
                name: "Regular"
            },
            2: {
                name: "Debt"
            },
            3: {
                name: "Savings"
            }
        }
    }
}

// User qeyd olduqda ona aid olan database strukturunu yaradiriq
export const userData = {
    expenseCategory: {
        10: {
            name: "Test",
            icon: "FaBeer",
            color: "#ff471a",
            subCategory: {
                10: {
                    name: "test ucun",
                }
            }
        }

    },
    incomeCategory: {
        10: {
            name: "Salary",
            icon: "test",
            color: "#ff471a",
        }
    },
    account: {
        10: {
            name: "hello world fdf",
            type: 1,
            balance: 100,
            creditLimit: 0,
            currency: 1,
            balanceImpact: true,
            icon: "test",
            color: "#ff471a",
            description: "hello world"
        }
    },
    transaction: {
        10: {
            date: "2021-09-15",
            transactionType: 2,
            category: 5,
            account: 1,
            amount: 100,
            currency: 1,
            note: "hello world"
        },
    }
}