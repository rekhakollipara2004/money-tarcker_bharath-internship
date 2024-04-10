let expenses = [];
let totalAmount = 0;
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const info = infoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('Please enter valid information');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    expenses.push({ category, amount, info, date });

    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }

    totalAmountCell.textContent = totalAmount;

    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = category;
    amountCell.textContent = amount;
    infoCell.textContent = info;
    dateCell.textContent = date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const index = expenses.findIndex(expense => expense.category === category && expense.amount === amount && expense.info === info && expense.date === date);
        if (index !== -1) {
            const deletedExpense = expenses.splice(index, 1)[0];
            if (deletedExpense.category === 'Income') {
                totalAmount -= deletedExpense.amount;
            } else if (deletedExpense.category === 'Expense') {
                totalAmount += deletedExpense.amount;
            }
            totalAmountCell.textContent = totalAmount;
            expenseTableBody.removeChild(newRow);
        }
    });

    deleteCell.appendChild(deleteBtn);
});

for (const expense of expenses) {
    if (expense.category === 'Income') {
        totalAmount += expense.amount;
    } else if (expense.category === 'Expense') {
        totalAmount -= expense.amount;
    }

    totalAmountCell.textContent = totalAmount;

    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            const deletedExpense = expenses.splice(index, 1)[0];
            if (deletedExpense.category === 'Income') {
                totalAmount -= deletedExpense.amount;
            } else if (deletedExpense.category === 'Expense') {
                totalAmount += deletedExpense.amount;
            }
            totalAmountCell.textContent = totalAmount;
            expenseTableBody.removeChild(newRow);
        }
    });

    deleteCell.appendChild(deleteBtn);
}
