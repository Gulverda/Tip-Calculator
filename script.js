const bill = document.querySelector(".card__bill-input");
const selectTip = document.querySelectorAll(".select-tip__percentage");
const custom = document.querySelector(".custom-tip-input");
const numberOfPeople = document.querySelector(".number-of-people__value");
const tipInput = document.querySelector(".card2__tip-amount-value");
const totalInput = document.querySelector(".card2__total-value");
const reset = document.querySelector(".reset-btn");

reset.addEventListener("click", () => {
  bill.value = custom.value = numberOfPeople.value = "0";
  tipInput.innerHTML = totalInput.innerHTML = "$0";

  selectTip[2].classList.add("active");
  selectTip.forEach((tipBtn) => tipBtn.classList.remove("active"));
});

selectTip.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    selectTip.forEach((tipBtn) => tipBtn.classList.remove("active"));

    if (e.target.classList.contains("custom-tip-input"))
      e.target.parentElement.classList.add("active");
    else
      e.target.classList.add("active");

    calculateTip();
  });
});

const calculateTip = () => {
  const billValue = parseFloat(bill.value);
  const numberPeople = parseFloat(numberOfPeople.value);
  const customTipActive = document.querySelector(".select-tip-custom.active");
  const selectTipValue = parseInt(
    document.querySelector(".select-tip__percentage.active").dataset.percentage
  );
  const customTipValue = parseFloat(custom.value) || 0;
  const tipValue = customTipActive ? customTipValue : selectTipValue;
  
  const totalAmount = ((tipValue / 100) * billValue).toFixed(2);
  const tipAmount = (totalAmount / numberPeople).toFixed(2);
  const actualTotalAmount = ((billValue + parseFloat(totalAmount)) / numberPeople).toFixed(2);

  tipInput.innerHTML = `$${tipAmount}`;
  totalInput.innerHTML = `$${actualTotalAmount || "0"}`;
};

numberOfPeople.addEventListener("input", () => {
  if (numberOfPeople.value === "0")
    document.querySelector(".hidden").classList.remove("hidden");
  else
    document.querySelector(".hidden").classList.add("hidden");

  calculateTip();
});

custom.addEventListener("input", calculateTip);
