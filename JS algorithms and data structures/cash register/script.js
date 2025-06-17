
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currencyMap = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

const cashElement = document.getElementById('cash');
const cidElement = document.getElementById('cash-in-drawer');
const purchaseBtn = document.getElementById('purchase-btn');
const messageSpan = document.getElementById('message');
const changeDue = document.getElementById('change-due');


let status = 'placeholderStatus';

const alerting = (status, change = []) => {
  switch(status) {
    case 'Status: INSUFFICIENT_FUNDS':
      alert("Customer does not have enough money to purchase the item");
      changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
      break;

    case "Status: CLOSED":
    case 'Status: OPEN':
      changeDue.innerText = `${status} ${change.map(([unit,amount])=>`${unit}: $${amount}`).join(" ")}`;
      break;

    case 'Status: NO_CHANGE_NEEDED':
      changeDue.innerText ='No change due - customer paid with exact cash';
      break;
  }
};

const logic = () => {
  const price = Number(document.getElementById("price").value);

  const cash = Number(cashElement.value);
  if (cash < price) {return 'Status: INSUFFICIENT_FUNDS'};


  let changeNeeded = cash - price;
  if (changeNeeded === 0) {return 'Status: NO_CHANGE_NEEDED'}

  const cidCopy = [...cid].reverse();;

  let change = [];
  let remaining = changeNeeded;


  for (let [unit,amount] of cidCopy) {
    let unitVal = currencyMap[unit];
    let amountUsed = 0;

    while (unitVal <= remaining && amount>= unitVal)
      {
        remaining = Math.round((remaining - unitVal) * 100) / 100;
        amount = Math.round((amount - unitVal) * 100) / 100;
        amountUsed = Math.round((amountUsed + unitVal) * 100) / 100;
      }
    
    if (amountUsed>0) {
      change.push([unit, amountUsed]);
      }
  };

  // Subtract used cash from cid
change.forEach(([unit, usedAmount]) => {
  const index = cid.findIndex(([name]) => name === unit);
  if (index !== -1) {
    cid[index][1] = Math.round((cid[index][1] - usedAmount) * 100) / 100;
  }
});
renderDrawer();

  if (remaining > 0) {return 'Status: INSUFFICIENT_FUNDS'};

  if (remaining === 0) {
  const totalChange = change.reduce((sum, [, amt]) => sum + amt, 0);
  const drawerTotal = cid.reduce((sum, [, amt]) => sum + amt, 0);

  if (totalChange === drawerTotal) {
    return { status: "Status: CLOSED", change };
  } else {
    return { status: "Status: OPEN", change };
  }
}
}

purchaseBtn.addEventListener("click",() => {
  const result = logic();
  if (typeof result === 'string') {
    alerting(result);
  } else {
    console.log(result);
    alerting(result.status, result.change);
  }
  }
);

const drawerList = document.getElementById('drawer-list');

function renderDrawer() {
  drawerList.innerHTML = "";
  cid.forEach(([unit, amount]) => {
    const li = document.createElement("li");
    li.textContent = `${unit}: $${amount.toFixed(2)}`;
    drawerList.appendChild(li);
  });
}

renderDrawer();
// Initial rendering of the drawer