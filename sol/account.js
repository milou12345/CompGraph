// Version 1: pure objects

const account = {
  number: 1234,
  euros: 0,
  deposit(euros) {
    console.log(euros + ' Euros payed to the bank');
    this.euros += euros;
  },

  withdraw(euros) {
    console.log(euros + ' Euros withdrawn from the bank');
    this.euros -= euros;
  },
  print () {
    console.log('Account ' + this.number + ' contains ' + this.euros + ' Euros');
  }
};


account.deposit(300);
account.withdraw(200);
account.print();
















// Version 2: with constructor and prototype Methods


function Account(number) {
  "use strict";
  this.number = number;
  this.euros = 0.0;
}
Account.prototype.deposit = function(euros){
  console.log(euros + ' Euros payed to the bank');
  this.euros += euros;
};
Account.prototype.withdraw = function(euros){
  console.log(euros + ' Euros withdrawn from the bank');
  this.euros -= euros;
};
Account.prototype.print = function(){
    console.log('Account ' + this.number + ' contains ' + this.euros + ' Euros');
};

const acc = new Account(1234);
acc.deposit(300);
acc.withdraw(200);
acc.print();
