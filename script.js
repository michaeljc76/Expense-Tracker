const TRANSACTIONS = [
	{
		id: 1,
		name: 'salary',
		amount: 35000,
		date: new Date(),
		type: 'earned'
	},
	{
		id: 2,
		name: 'tv',
		amount: 500,
		date: new Date(),
		type: 'expense'
	},
	{
		id: 3,
		name: 'new car',
		amount: 5000,
		date: new Date(),
		type: 'expense'
	},
];

const options = {style: 'currency', currency: 'USD', signDisplay: 'always'};
const form = document.getElementById("transactionForm");
const formatter = new Intl.NumberFormat('en-US', options);

form.addEventListener('submit', addTransaction);

const LIST = document.getElementById('list');
const STATUS = document.getElementById('status');

function renderList(){
	LIST.innerHTML = '';

	if (TRANSACTIONS.length === 0){
		STATUS.textContent = "No Transactions.";
		return;
	}

	TRANSACTIONS.forEach(({id, name, date, amount, type}) =>{
		const li = document.createElement('li');

		li.innerHTML = `
		<div class="namedate">
			<h2>${name}</h2>
			<p>${date.toLocaleDateString()}</p>
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

function deleteTransaction(id){
	const index = TRANSACTIONS.findIndex(transaction => transaction.id === id);
	TRANSACTIONS.splice(index, 1);
	renderList();
}

function addTransaction(trx){
	trx.preventDefault();

	const formData = new FormData(this);

	TRANSACTIONS.push({
		id: TRANSACTIONS.length + 1,
		name: formData.get('name'),
		amount: parseFloat(formData.get('amount')),
		date: new Date(formData.get('date'))
		//type: formData.get('type')
	});

	this.reset();
	renderList();
}