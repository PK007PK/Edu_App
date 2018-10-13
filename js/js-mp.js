// JavaScript Document

sessionStorage.lekcja = 0;

//------------------------*englishMainPage------------------
// Wyświetla na stronie głównej kafelki na podstawie zawartości bazy

function englishMainPage() 
{
	let docFragment = document.createDocumentFragment();
	
	
	for (let i=0; i < elementsMag.length; i++) 
    {
		
		let div3Element = document.createElement('div'); //3 
			div3Element.className = 'card m-2 float-left';	

		let imgElement = document.createElement('img'); //4
			imgElement.src = elementsMag[i][1][0].image;
			imgElement.className = 'card-img-top';

		let div4Element = document.createElement('div'); //5
			div4Element.className = 'card-img-overlay';

		let h4Element = document.createElement('h4'); //6
			h4Element.className = 'card-title';

		let trescH4 = document.createTextNode(elementsMag[i][1][0].opis)
		h4Element.appendChild(trescH4);		

		let pElement = document.createElement('p');  // 7
			pElement.className = 'card-text';

		let trescP = document.createTextNode(elementsMag[i][1][0].polecenie)
		pElement.appendChild(trescP);	

		let aElement = document.createElement('a');  // 8 
			aElement.className = 'btn btn-xs-sm btn-md-lg btn-primary';
			aElement.href = 'lekcja.html';
			aElement.id = 'link'+i;
					
		let trescA = document.createTextNode('Przejdź do lekcji');
		aElement.appendChild(trescA);	

		div4Element.appendChild(h4Element);
		div4Element.appendChild(pElement);
		div4Element.appendChild(aElement)

		div3Element.appendChild(imgElement);
		div3Element.appendChild(div4Element);
		docFragment.appendChild(div3Element);

	}
	
    document.getElementById('angielski').appendChild(docFragment);
}

englishMainPage();


/*
let elementE = 
{
	initE: function(klasaE, idE) 
	{
		this.klasaE = klasaE;
		this.idE = idE;
	}
}

let elementP = Object.create(elementE);
	
	elementP.initP = function(trescP) 
		{
			this.trescP = trescP;
		};

	elementP.createP = function()
		{
			let pElement = document.createElement('p');
				pElement.className = this.klasa;

			let trescP = document.createTextNode(this.trescP);
			pElement.appendChild(trescP);
			return pElement;
		};



console.log(elementE);
console.log(elementP);

var p1 = Object.create(elementP);
	p1.initE('klasa1', 'identyfikator');
	p1.initP("ala ma kota");
	p1.createP();  // <p class="undefined">ala ma kota</p>
*/


//-------------------------*linki------------------
// Podłączenie pod buttony na stronie głównej funkcji, która sprawdza i zapisuje w który z nich kliknięto. 

function linki() 
{
	for (let i = 0; i < elementsMag.length; i++) 
    {
		let targ = document.getElementById('link'+i);
		targ.addEventListener('click', function () {
			sessionStorage.lekcja = i;			
		});
	}
}

linki();


//-------------------------*unitDataTake------------------
// Funkcja podłączana pod górne menu, pod select. Sprawdza co się wybrało, zapisuje to w sesji, przechodzi do lekcji.  

let unitSelected;
    
function unitDataTake() 
{
    unitSelected = document.getElementById('unitSelect').value;
    sessionStorage.lekcja = unitSelected;
    elements = elementsMag[unitSelected][0];
    window.open('lekcja.html', '_self');
}

//-------------------------*unitSelect------------------
// Funkcja na podstawie zawartości bazy tworzy pola wyboru selecta, przypisuje im też wartości. 
 
function unitSelect () 
{
	let docFragment = document.createDocumentFragment();
	for (let i = 0; i < elementsMag.length; i++ ) 
    {
		
        let optionElement = document.createElement('option'); 
			optionElement.value = i;
        if (i == unitSelected) optionElement.selected = 'selected'; 
        let optionText = document.createTextNode(elementsMag[i][1][0].nazwaZbioru);
		optionElement.appendChild(optionText);
		docFragment.appendChild(optionElement);
	}
	document.getElementById('unitSelect').appendChild(docFragment);
	document.getElementById('unitSelect').setAttribute('onchange', 'unitDataTake()');
}

unitSelect (); 