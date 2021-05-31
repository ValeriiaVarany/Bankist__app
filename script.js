const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
  const accounts = [account1, account2, account3, account4];
  
  // Elements
  const labelWelcome = document.querySelector('.welcome');
  const labelDate = document.querySelector('.date');
  const labelBalance = document.querySelector('.balance__value');
  const labelSumIn = document.querySelector('.summary__value--in');
  const labelSumOut = document.querySelector('.summary__value--out');
  const labelSumInterest = document.querySelector('.summary__value--interest');
  const labelTimer = document.querySelector('.timer');
  
  const containerApp = document.querySelector('.app');
  const containerMovements = document.querySelector('.movements');
  
  const btnLogin = document.querySelector('.login__btn');
  const btnTransfer = document.querySelector('.form__btn--transfer');
  const btnLoan = document.querySelector('.form__btn--loan');
  const btnClose = document.querySelector('.form__btn--close');
  const btnSort = document.querySelector('.btn--sort');
  
  const inputLoginUsername = document.querySelector('.login__input--user');
  const inputLoginPin = document.querySelector('.login__input--pin');
  const inputTransferTo = document.querySelector('.form__input--to');
  const inputTransferAmount = document.querySelector('.form__input--amount');
  const inputLoanAmount = document.querySelector('.form__input--loan-amount');
  const inputCloseUsername = document.querySelector('.form__input--user');
  const inputClosePin = document.querySelector('.form__input--pin');
  
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // LECTURES
  
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


const createUsernames = function (accs){
    accs.forEach(function(acc){
    acc.userName = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');

    });
};

createUsernames(accounts);

let calcDisplayBalance = function (acc){
    acc.balance = acc.movements.reduce((acc,mov)=> acc + mov,0);
    labelBalance.textContent = `${acc.balance}€`
    
};

calcDisplaySummary = function (acc) {
    let incomes = acc.movements
    .filter(mov => mov > 0 )
    .reduce((acc,mov) => acc + mov, 0);
    labelSumIn.textContent=`${incomes}€`;

    let out = acc.movements
    .filter(mov => mov < 0 )
    .reduce((acc,mov) => acc + mov, 0);
    labelSumOut.textContent=`${Math.abs(out)}€`;
    
    let interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate ) / 100)
    .filter((int,i,arr)=> int >=1)
    .reduce((acc,int)=> acc+int,0);
    labelSumInterest.textContent = `${interest}€`;
};  

const updateUI = function (acc) {
    displayMovements(acc.movements);
    calcDisplayBalance(acc);
    calcDisplaySummary(acc)    
}

let currentAccount;


let displayMovements = function (movements, sort = false){
  //containerMovements.innerHTML = '';

  let movs = sort ? movements.slice().sort((a,b)=> a - b ):movements;

  movs.forEach(function (mov, i) {
        const type = mov > 0 ? `deposit` : `withdrawal`;
        const html=`
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1}${type}</div>
        
        <div class="movements__value">${mov}</div>
      </div>`;
       containerMovements.insertAdjacentHTML
       ('afterbegin', html);
    });
    
    };

btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    currentAccount = accounts.find(
        acc => acc.userName === inputLoginUsername.value
    );
if (currentAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `Welcom back, ${
        currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

  btnTransfer.addEventListener('click',function (e) {
      e.preventDefault();
      const amount= Number (inputTransferAmount.value);
      const receiverAcc = accounts.find(
          acc=>acc.userName === inputTransferTo.value
      );
     
      if (amount > 0 && 
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.userName !== currentAccount.userName){
            currentAccount.movements.push(-amount);
            receiverAcc.movements.push(amount);
        
      updateUI(currentAccount);
        }  
        inputTransferTo.value = inputTransferAmount.value = '';    
  });

btnClose.addEventListener('click',function (e) {
    e.preventDefault();

    if (
        Number(inputClosePin.value) === currentAccount.pin &&
        inputCloseUsername.value === currentAccount.userName
    ){
        const index = accounts.findIndex(
            acc => acc.userName === currentAccount.userName
        )
       accounts.splice(index, 1);
       containerApp.style.opacity = 0;
       console.log(accounts)
    }
    inputClosePin.value = inputCloseUsername.value = '';
})

let sorted = false;

btnSort.addEventListener('click',function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted= !sorted;
})


let  h = Array.from({length:100},( _ , i) => Math.round(Math.random() * 100 + 1));

labelBalance.addEventListener('click', function (){
const mowert = Array.from(
  document.querySelectorAll()
);
})


    
  

