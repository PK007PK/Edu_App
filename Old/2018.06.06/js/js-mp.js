// JavaScript Document

sessionStorage.lekcja = 0;

//------------------------*englishMainPage------------------
// Wyświetla na stronie głównej kafelki na podstawie zawartości bazy

function englishMainPage() 
{
	let docFragment = document.createDocumentFragment();
				
	let divElement = document.createElement('div'); 	//1
		divElement.setAttribute('class', 'row my-2')
		
	for (let i=0; i < elementsMag.length; i++) 
    {
		
		if (!(i % 3)) 
        {

			divElement = document.createElement('div'); 	//1
			divElement.setAttribute('class', 'row my-3')
		}

		let div2Element = document.createElement('div'); //2 
			div2Element.setAttribute('class', 'col-xs-12 col-md-6 col-lg-4');

		let div3Element = document.createElement('div'); //3 
			div3Element.setAttribute('class', 'card');	

		let imgElement = document.createElement('img'); //4
			imgElement.setAttribute('class', 'card-img-top');
			imgElement.setAttribute('src', elementsMag[i][1][0].image);
			imgElement.setAttribute('class', 'card-img-top');

		let div4Element = document.createElement('div'); //5
			div4Element.setAttribute('class', 'card-img-overlay');

		let h4Element = document.createElement('h4'); //6
			h4Element.setAttribute('class', 'card-title');

		let trescH4 = document.createTextNode(elementsMag[i][1][0].opis)
		h4Element.appendChild(trescH4);		

		let pElement = document.createElement('p');  // 7
			pElement.setAttribute('class', 'card-text');

		let trescP = document.createTextNode(elementsMag[i][1][0].polecenie)
		pElement.appendChild(trescP);	

		let aElement = document.createElement('a');  // 8 
			aElement.setAttribute('class', 'btn btn-primary');
			aElement.setAttribute('href', 'lekcja.html');
			aElement.setAttribute('id', 'link'+i);
					
		let trescA = document.createTextNode('Przejdź do lekcji');
		aElement.appendChild(trescA);	

		div4Element.appendChild(h4Element);
		div4Element.appendChild(pElement);
		div4Element.appendChild(aElement)

		div3Element.appendChild(imgElement);
		div3Element.appendChild(div4Element);

		div2Element.appendChild(div3Element);
		divElement.appendChild(div2Element);
				
		docFragment.appendChild(divElement);
	}
	
    document.getElementById('angielski').appendChild(docFragment);
}

englishMainPage();

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
    let unitSelected = document.getElementById('unitSelect').value;
    sessionStorage.lekcja = unitSelected;
    elements = elementsMag[unitSelected][0];
    window.open('lekcja.html', 'self');
}

//-------------------------*unitSelect------------------
// Funkcja na podstawie zawartości bazy tworzy pola wyboru selecta, przypisuje im też wartości. 
 
function unitSelect () 
{
	let docFragment = document.createDocumentFragment();
	for (let i = 0; i < elementsMag.length; i++ ) 
    {
		
        let optionElement = document.createElement('option'); 
			optionElement.setAttribute('value', i);
        if (i == unitSelected) optionElement.setAttribute('selected', 'selected'); 
        let optionText = document.createTextNode(elementsMag[i][1][0].nazwaZbioru);
		optionElement.appendChild(optionText);
		docFragment.appendChild(optionElement);
	}
	document.getElementById('unitSelect').appendChild(docFragment);
	document.getElementById('unitSelect').setAttribute('onchange', 'unitDataTake()');
}

unitSelect (); 