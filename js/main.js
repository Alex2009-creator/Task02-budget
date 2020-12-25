'use strict';
let start = document.getElementById('start'),
        budgetValue = document.getElementsByClassName('budget-value')[0],
        dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
        levelValue = document.getElementsByClassName('level-value')[0],
        expensesValue = document.getElementsByClassName('expenses-value')[0],
        optionalValue = document.getElementsByClassName('optionalexpenses-value')[0],
        incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingslValue = document.getElementsByClassName('yearsavings-value')[0],
        expensesItem = document.getElementsByClassName('expenses-item'),
        expensesBtn = document.getElementsByTagName('button')[0],
        optionalBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpenses = document.querySelectorAll('.optionalexpenses-item'),   
        inputChoose = document.querySelector('.choose-income'),
        checkSavings = document.querySelector('#savings'),
        chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

// Ввод месячного бюджета и даты
let money;

start.addEventListener('click', function(){
    money = +prompt("Ваш бюджет на месяц?",'');
    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Введите бюджет на месяц?",'');        
    }
    appData.budget = money;
    budgetValue.textContent = appData.budget.toFixed();

    expensesBtn.disabled =false;
    expensesBtn.style.background = "#ffbd75";
    expensesBtn.style.cursor = "pointer";

    let time = prompt("Введите дату в формате YYYY-MM-DD");
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.disabled =true;
expensesBtn.style.background = "#ebe7e7";
expensesBtn.style.cursor = "default";

// Обязательные статьи расходов, их суммы
expensesBtn.addEventListener ('click', function(){  
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value;
        while ((typeof(a) != 'string') || (a == null) || (a == '')){
            a = prompt('Введите корректную статью расходов:','');
            expensesItem[i].value = a;
        }
        let b = +expensesItem[++i].value;
        while ((typeof(b) == isNaN) || (b == null) || (b == '') ) {
            b = +prompt('Введите корректную сумму расходов:','');
            expensesItem[i].value = b;
            appData.expenses[a] = b;     
        }
        sum = sum + b;         
    };
    expensesValue.textContent = sum;
});

// Необязательные расходы
optionalBtn.addEventListener('click',function(){
    optionalValue.textContent = '';
    let optional;
    for (let i = 0; i < optionalExpenses.length; i++){
        optional = optionalExpenses[i].value;

        if ((optional == null) || (optional == '')) {
            optionalExpenses[i].value = ' '
        } else{
            appData.optionalExp[i] = optional;
            optionalValue.textContent += optionalExpenses[i].value + ' ';
        }
    } 
});

// Дополнительные доходы
inputChoose.addEventListener('input',function(){
    let items = inputChoose.value;

    if ((typeof(items) != 'string') || (typeof(items) == null) || (items == '')) {
        incomeValue.textContent = '';
    } else {
        incomeValue.textContent = items;
        appData.income = items.split(", ");
    }    
});

// Включение флага "Сбережения"
checkSavings.addEventListener('click',function(){
 if(appData.savings == true){
     appData.savings = false
 } else{
     appData.savings = true
 }
});

// Ввод суммы сбережений, проценты. Расчет за месяц, год
chooseSum.addEventListener('input',function(){
    if(appData.savings == true){
        let sum = +chooseSum.value;
        let percent = +choosePercent.value;
        appData.monthSavings = (sum + sum*percent/100/12).toFixed();
        appData.yearSavings = sum + sum*percent/100;
        monthSavingsValue.textContent = appData.monthSavings;
        yearSavingslValue.textContent = appData.yearSavings
    }
});

// Расчет бюджета на один день. Определение уровня дохода
countBtn.addEventListener('click', function(){
    if(appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget/30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
        if(appData.savings == true) {
            if(appData.moneyPerDay <= 200) {
                levelValue.textContent = 'Минимальный доход';
            } else if((appData.moneyPerDay >200) && (appData.moneyPerDay <=500)) {
                levelValue.textContent = 'Средний доход';
            } else if(appData.moneyPerDay > 500) {
                levelValue.textContent = 'Высокий доход';
            }
        } else {
            dayBudgetValue.textContent = 'Техническая ошибка';
        }
    }

});

let appData = {
    budget: money,
    timeData: Date,
    expenses: {},
    optionalExp: {},
    income: [],    
    savings: false,
    monthSavings: "0",
    yearSavings: "0"
};