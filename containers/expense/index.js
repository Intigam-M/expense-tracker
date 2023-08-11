import Expense from "@/components/expensePage"


function ExpenseContainer() {
    return (
        <div className='w-4/12 mx-auto grid grid-cols-4 gap-3 '>
            <Expense />
            <Expense />
            <Expense />
            <Expense />
        </div>
    )
}

export default ExpenseContainer