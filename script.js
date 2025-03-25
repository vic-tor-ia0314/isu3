function showInputs() {
  const helpType = document.getElementById("help-type").value;
  const preciationType = document.getElementById("preciation-type");

  const sections = {
    budget: document.getElementById("budget-input"),
    sInterest: document.getElementById("s-interest-input"),
    cInterest: document.getElementById("c-interest-input"),
    preciation: document.getElementById("preciation-input"),
    rates: document.getElementById("rates-input"),
  };

  Object.values(sections).forEach((section) => {
    section.style.display = "none";
    section.querySelectorAll("div").forEach((input) => (input.style.display = "none"));
  });

  function showSection(section, inputs) {
    section.style.display = "block";
    inputs.forEach((inputId) => {
      document.getElementById(inputId).style.display = "block";
    });
  }

  if (helpType === "budget") {
    showSection(sections.budget, ["income-input", "expense-input", "expense-amount-input"]);
  } else if (helpType === "s-interest") {
    showSection(sections.sInterest, ["s-principal-input", "s-interest-rate-input", "s-term-amount-input"]);
  } else if (helpType === "c-interest") {
    showSection(sections.cInterest, ["c-principal-input", "c-interest-rate-input", "c-term-amount-input"]);
  } else if (helpType === "preciation") {
    showSection(sections.preciation, ["preciation-type-input", "preciation-amount-input", "type-amount-input"]);
    preciationType.addEventListener("change", function () {
      const linearInput = document.getElementById("linear-amount-input");
      const nonLinearInput = document.getElementById("non-linear-amount-input");

      if (preciationType.value === "linear") {
        linearInput.style.display = "block";
        nonLinearInput.style.display = "none";
      } else if (preciationType.value === "non-linear") {
        linearInput.style.display = "none";
        nonLinearInput.style.display = "block";
      } else {
        linearInput.style.display = "none";
        nonLinearInput.style.display = "none";
      }
    });
  } else if (helpType === "rates") {
    showSection(sections.rates, ["rate-1-numerator-input", "rate-1-denominator-input", "rate-2-numerator-input", "rate-2-denominator-input"]);
  }
}

let income = 0;
let expenses = [];

function addExpense() {
  const incomeInput = document.getElementById("income").value;
  if (incomeInput && !isNaN(incomeInput)) {
    income = parseFloat(incomeInput);
  }

  const expenseName = document.getElementById("expense").value;
  const expenseAmount = parseFloat(document.getElementById("expense-amount").value);

  if (expenseName && !isNaN(expenseAmount)) {
    expenses.push({ name: expenseName, amount: expenseAmount });

    updateExpenseList();
    calculateBalance();
    document.getElementById("expense").value = "";
    document.getElementById("expense-amount").value = "";
  } else {
    alert("Please enter a valid expense name and amount.");
  }
}

function updateExpenseList() {
  const expenseList = document.getElementById("expense-list");
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const row = `<tr><td>${expense.name}</td><td>${expense.amount}</td></tr>`;
    expenseList.innerHTML += row;
  });
}

function calculateBalance() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const balance = (!isNaN(income) ? income : 0) - totalExpenses;
    document.getElementById("balance").innerText = balance.toFixed(2);
}

function undoLastExpense() {
  if (expenses.length > 0) {
    expenses.pop(); 
    updateExpenseList();
    calculateBalance();
  } else {
    alert("No expenses to undo!");
  }
}

function clearExpenses() {
  if (expenses.length > 0) {
    expenses = []; 
    updateExpenseList();
    calculateBalance();
  } else {
    alert("No expenses to clear!");
  }
}

function calculateSimpleInterest() {
  const sprincipal = parseFloat(document.getElementById("s-principal").value);
  const srate = parseFloat(document.getElementById("s-interest-rate").value);
  const stime = parseFloat(document.getElementById("s-term-amount").value);

  if (isNaN(sprincipal) || isNaN(srate) || isNaN(stime)) {
    alert("Please enter valid numbers for all fields.");
    return;
  }

  const simpleInterest = (sprincipal * srate * stime) / 100;
  document.getElementById("simple-interest-result").innerText = simpleInterest.toFixed(2);
  
  const simpleInterestTotal = ((sprincipal * srate * stime) / 100) + sprincipal;
  document.getElementById("simple-interest-total").innerText = simpleInterestTotal.toFixed(2);
}

function calculateCompoundInterest() {
  const cprincipal = parseFloat(document.getElementById("c-principal").value);
  const crate = parseFloat(document.getElementById("c-interest-rate").value);
  const ctime = parseFloat(document.getElementById("c-term-amount").value);

  if (isNaN(cprincipal) || isNaN(crate) || isNaN(ctime)) {
    alert("Please enter valid numbers for all fields.");
    return;
  }

  const compoundInterest = (cprincipal * (1 + (crate/100))**ctime);
  document.getElementById("compound-interest-result").innerText = compoundInterest.toFixed(2);
  
  const compoundInterestTotal = (cprincipal * (1 + (crate/100))**ctime) + cprincipal;
  document.getElementById("compound-interest-total").innerText = compoundInterestTotal.toFixed(2);
}
