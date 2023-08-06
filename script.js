const TRANSACTIONS = JSON.parse(localStorage.getItem('TRANSACTIONS')) || [];

const options = {style: 'currency', currency: 'USD', signDisplay: 'always'};
const form = document.getElementById("transactionForm");
const formatter = new Intl.NumberFormat('en-US', options);
const balance = document.getElementById("balance");
const earned = document.getElementById("earned");
const expended = document.getElementById("expended");

form.addEventListener('submit', addTransaction);

const LIST = document.getElementById('list');
const STATUS = document.getElementById('status');

function updateh3(){
	const incomeTotal = TRANSACTIONS.filter(trx => trx.type === 'earned')
	.reduce((total, trx) => total + trx.amount, 0);
	const expenseTotal = TRANSACTIONS.filter(trx => trx.type === 'expense')
	.reduce((total, trx) => total + trx.amount, 0);
	const total = (incomeTotal + expenseTotal);

	earned.textContent = formatter.format(incomeTotal);
	expended.textContent = formatter.format(expenseTotal);
	balance.textContent = (total >= 0) ? formatter.format(total).substring(1) : formatter.format(total);
}

function renderList(){
	LIST.innerHTML = '';

	if (TRANSACTIONS.length === 0){
		STATUS.textContent = "No Transactions.";
		return;
	}
	else{
		STATUS.textContent = "";
	}

	TRANSACTIONS.forEach(({id, name, date, amount, type}) =>{
		const li = document.createElement('li');

		li.innerHTML = `
		<div class="namedate">
			<h2>${name}</h2>
			<p>${new Date(date).toLocaleDateString()}</p>
		</div>
		<div class="amount ${type}">
			<span>${formatter.format(amount)}</span>
		</div>
		<div class="action">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction(${id})">
	  		<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</div>
		`;

		list.appendChild(li);
	})
}

renderList();
updateh3();
sortTransactions();

function deleteTransaction(id){
	const index = TRANSACTIONS.findIndex(transaction => transaction.id === id);
	TRANSACTIONS.splice(index, 1);
	renderList();
	updateh3();
	sortTransactions();
}

function addTransaction(trx){
	trx.preventDefault();

	const formData = new FormData(this);

	TRANSACTIONS.push({
		id: TRANSACTIONS.length + 1,
		name: formData.get('name'),
		amount: formData.get("type") ? parseFloat(formData.get('amount')) : -parseFloat(formData.get('amount')),
		date: new Date(formData.get('date')),
		type: formData.get("type") ? "earned" : "expense",
	});

	this.reset();
	renderList();
	updateh3();
	sortTransactions();
}

function sortTransactions(){
	TRANSACTIONS.sort((a, b) => new Date(b.date) - new Date(a.date));

	localStorage.setItem("TRANSACTIONS", JSON.stringify(TRANSACTIONS));
}