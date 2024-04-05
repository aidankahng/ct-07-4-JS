// Exercise 1
/*
Banking System

Create an Account class with the properties accountNumber, currentBalance, and owner. The Account should have methods to deposit and withdraw. The 
deposit method should add that amount to the currentBalance. The withdraw method should first check if there is enough to withdraw before withdrawing

Implement child classes CheckingAccount and SavingsAccount, each inheriting from the Account class. 

The CheckingAccount will also have an overdraftLimit property. Override the withdraw method to 
first check if there is enough (+ overdraftLimit) before withdrawing.

The SavingsAccount will also have an interestRate. Add a method addInterest that will increase the currentBalance by that interest rate

*/

class Account {
    constructor(id, initial, owner){
        this.accountNumber = id;
        this.currentBalance = initial;
        this.owner = owner;
    }

    deposit(amount){
        this.currentBalance = Math.round((this.currentBalance + amount) * 100)/100
    }

    withdraw(amount){
        this.currentBalance = Math.round((this.currentBalance - amount) * 100)/100
    }
}

class CheckingAccount extends Account {
    constructor(id, initial, owner, overdraft){
        super(id, initial, owner);
        this.overdraftLimit = overdraft;
    }

    withdraw(amount){
        let potential_balance = Math.round((this.currentBalance - amount) * 100)/100
        if (potential_balance + this.overdraftLimit > 0) {
            this.currentBalance = potential_balance;
        } else {
            console.log("There was an attempt to withdaw more than allowed")
        }
    }
}

class SavingsAccount extends Account {
    constructor(id, initial, owner, interest) {
        super(id, initial, owner);
        this.interestRate = interest;
    }

    // Note that this will add interest redardless if balance is positive or negative
    // in the event that balance is negative, addInterest will create more debt
    addInterest() {
        this.currentBalance = Math.round((this.currentBalance * (1 + (this.interestRate/100))) * 100)/100
    }
}


const checkingAccount = new CheckingAccount('123456', 1000, 'John Doe', 500);

checkingAccount.deposit(500);
checkingAccount.withdraw(1400);
checkingAccount.withdraw(1200);  

const savingsAccount = new SavingsAccount('654321', 5000, 'Jane Smith', 2);

savingsAccount.deposit(1000);
savingsAccount.withdraw(7000);
savingsAccount.addInterest();




// Exercise 2 - Promises 
// Using the below getMovieInfo function, which is a Promised-base function, write an asynchronous function (.then().catch() or async/await)
// called printMovieInfo that will take in a movie title and then either displays the movie information or logs an error with a console.warn().


function getMovieInfo(movieName){
    return new Promise((resolve, reject) => {
        if (movieName.length > 5){
            let movie = {
                id: 123,
                title: movieName,
                director: 'Christopher Spielberg',
                runtime: 157,
                description: 'Good vs Evil'
            }
            resolve(movie)
        } else {
            reject(`${movieName} cannot be accessed because it is too short.`)
        }
    })
}

function printMovieInfo(movieName){
    getMovieInfo(movieName)
        .then( movie => {
            console.log(`${movieName} directed by ${movie.director}. ` 
            + `A story of ${movie.description} that runs for ${movie.runtime} minutes.`);
        })
        .catch(err => console.warn("*Warning*", err))
};

// Example 1
printMovieInfo('Indiana Jones and the Dark Knight')
// Output: Indiana Jones and the Dark Knight directed by Christopher Spielberg. A story of Good vs Evil that runs for 157 minutes.

// Example 2
printMovieInfo('ET')
// Output: *Warning* ET cannot be accessed because it it too short




// Exercise 3
// Add a Button somewhere on your index.html page with an id "backgroundChanger"
// Add a click event listener to your button that will change the background color of the body
// The background should toggle between at least 2 colors

let backgroundButton = document.createElement('button');
backgroundButton.innerHTML = 'Click to start changing colors'
backgroundButton.id = 'backgroundChanger'
console.log(backgroundButton)
backgroundButton.addEventListener('click', randomColor)

let colors = ['white', 'black', 'red', 'orange', 'green', 'blue', 'yellow', 'purple', 'brown']

function randomColor(){
    let randomChoice = colors[Math.floor(Math.random() * colors.length)]
    document.body.style.backgroundColor = randomChoice;
    backgroundButton.innerHTML = `Change background from ${randomChoice}`
}

let welcome = document.getElementById('welcome');
welcome.after(backgroundButton)