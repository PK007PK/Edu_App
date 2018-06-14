// Zmienne globalne wyboru unitów

/*
let unitSelected = sessionStorage.lekcja;
let elements = elementsMag[unitSelected][0];
*/

unitSelected = sessionStorage.lekcja;

function unitDataTake() {
	unitSelected = document.getElementById('unitSelect').value;
    sessionStorage.lekcja = unitSelected;
	elements = elementsMag[unitSelected][0];
    window.open('lekcja.html', 'self');
   
}


//Funkcja tworząca menu dostępnych unitów---------------------


function unitSelect () {
	
	let docFragment = document.createDocumentFragment();
	
	for (let i = 0; i < elementsMag.length; i++ ) {
		
        let optionElement = document.createElement('option'); 
			optionElement.setAttribute('value', i);
            optionElement.setAttribute('id', 'menuId'+i);
	    if (i == unitSelected) optionElement.setAttribute('selected', 'selected'); 
		let optionText = document.createTextNode(elementsMag[i][1][0].nazwaZbioru);
		optionElement.appendChild(optionText);
		docFragment.appendChild(optionElement);
	}
	
	document.getElementById('unitSelect').appendChild(docFragment);
	document.getElementById('unitSelect').setAttribute('onchange', 'unitDataTake()');
	
}

unitSelect ();