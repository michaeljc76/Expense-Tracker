const TRANSACTIONS = [
	{
		id: 1,
		name: 'salary',
		amount: 35000,
		date: new Date(),
		type: 'earned'
	},
	{
		id: 1,
		name: 'tv',
		amount: 500,
		date: new Date(),
		type: 'expense'
	},
	{
		id: 1,
		name: 'new car',
		amount: 5000,
		date: new Date(),
		type: 'expense'
	},
];

const LIST = document.getElementById('list');
const STATUS = document.getElementById('status')

function renderList(){
	LIST.innerHTML = '';

	if (TRANSACTIONS.length === 0){
		STATUS.textContent = "No Transactions.";
		return;
	}

	TRANSACTIONS.forEach((transaction) =>{
		const li = document.createElement('li');
		li.innerHTML = transaction.name + ' ' + transaction.date + ' ' + transaction.amount;
		list.appendChild(li);
	})
}

renderList();