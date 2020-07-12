const quantAdjust = function(event) {
    event.preventDefault();

    let priceValue = parseFloat(document.getElementById('priceValue').value);
    let quantity = parseInt(document.getElementById('quantity').value);
    let priceHidden = parseFloat(document.getElementById('priceHidden').value);

	if(event.target.id == "plus") let mod = 1;
	else if(event.target.id == "minus") let mod = -1;
	else return;

	let newValue = (quantity + mod < 1) ? 1 : quantity + mod;

	priceValue = priceHidden * newValue;

    document.getElementById('quantity').value = quantity;
    document.getElementById('priceValue').value = priceValue.toFixed(2);
    document.getElementById('total').innerHTML = quantity;
}

if(document.getElementById('plus')) document.getElementById('plus').addEventListener('click', quantAdjust);
if(document.getElementById('minus')) document.getElementById('minus').addEventListener('click', quantAdjust);
