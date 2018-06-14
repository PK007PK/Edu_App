


// Zmienne globalne wyboru unitów


let unitSelected = elementsMag.length - 1;
let elements = elementsMag[unitSelected][0];


unitSelect ();


// Zmienna globalna do przekazania parametru pomiędzy poland i sprawdzeniem polang


let randomElementNr; // Przechowuje numer obiektu wylosowanego z tablicy elements. 


// zmienne globalne do sprawdzianu


let ile;
let ilePol;
let ileEng;
let choosenToTest = new Array();
let points = 0;
document.getElementById('points').innerHTML = "Punkty: " + points;


//Funkcja pobierająca dane do unitu --------------------------


function unitDataTake() {
	unitSelected = document.getElementById('unitSelect').value;
	elements = elementsMag[unitSelected][0];
	resetMenu();
}


//Funkcja tworząca menu dostępnych unitów---------------------


function unitSelect () {
	
	let docFragment = document.createDocumentFragment();
	let loopMax = elementsMag.length;
	for (let i = 0; i < loopMax; i++ ) {
		
		let optionElement = document.createElement('option'); 
			optionElement.setAttribute('value', i);

		if (i === loopMax - 1) {
			optionElement.setAttribute('selected', 'selected');
						
		}
		
		let optionText = document.createTextNode(elementsMag[i][1][0].nazwaZbioru);
		
		optionElement.appendChild(optionText);
		docFragment.appendChild(optionElement);
	}
	
	document.getElementById('unitSelect').appendChild(docFragment);
	document.getElementById('unitSelect').setAttribute('onchange', 'unitDataTake()');
	
}


//Przypisanie funkcji do menu---------------------------------


document.getElementById('menu_nauka').addEventListener('click', nauka);
document.getElementById('menu_polang1').addEventListener('click', function () {polang(1)});
document.getElementById('menu_polang2').addEventListener('click', function () {polang(2)});
document.getElementById('menu_sprawdzian').addEventListener('click', sprawdzian);
document.getElementById('logo').addEventListener('click', resetMenu);


//Reset menu -------------------------------------------------


function resetMenu() {
	document.querySelector('div.learn').innerHTML = '';
	document.querySelector('div.test').innerHTML = '';
	
	let list = document.getElementById('div_karta');
	
	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
     }
	
	document.querySelector('div.karta').style.display = 'none';
}


// Funkcja odtwarzania dźwięku ---------------------------------


function sayIt(query) {
  var q = new SpeechSynthesisUtterance(query);
  q.lang = 'en-GB';
  q.rate = 1.2;
  speechSynthesis.speak(q);
}

	
//Losowanie liczby z określonego przedziału ------------------

	
function losowanie(from_arg,to_arg) { 
    
	return Math.floor(Math.random() * to_arg) + from_arg;
		
}

	
//Sprawdzenie tłumaczenia ------------------------------------


function sprawdzenie(sprawdzenie_arg) {
	
	let usersInput;
	
	usersInput = document.getElementById('input_karta').value.toLowerCase();
	
	if (sprawdzenie_arg === 1) {

		if (usersInput === elements[randomElementNr].name ) { 
			document.querySelectorAll('button.karta')[0].style.display = 'block';
			document.querySelectorAll('button.karta')[0].innerHTML = 'Dobrze! Jeszcze raz?';
			document.getElementById('div_karta').style.backgroundColor = '#C8E9C3';
		} else { 
			document.querySelectorAll('button.karta')[0].style.display = 'block';
			document.querySelectorAll('button.karta')[0].innerHTML = 'Źle! Jeszcze raz?';
			document.getElementById('div_karta').style.backgroundColor = '#E55E71';
		}
		

		sayIt(elements[randomElementNr].name);
		document.getElementById('p_karta').innerHTML += ' = ' + ' ' + elements[randomElementNr].name;
	} 
		
	if (sprawdzenie_arg === 2) {	
				
		if (usersInput === elements[randomElementNr].nazwa ) { 
			document.querySelectorAll("button.karta")[0].style.display = 'block';
			document.querySelectorAll("button.karta")[0].innerHTML = 'Dobrze! Jeszcze raz?';
			document.getElementById('div_karta').style.backgroundColor = '#C8E9C3';
		} else { 
			document.querySelectorAll("button.karta")[0].style.display = 'block';
			document.querySelectorAll("button.karta")[0].innerHTML = 'Źle! Jeszcze raz?';
			document.getElementById('div_karta').style.backgroundColor = '#E55E71';
		}
		
		sayIt(elements[randomElementNr].name);
		document.getElementById('p_karta').innerHTML += ' = ' + ' ' + elements[randomElementNr].nazwa;
		document.getElementById('img_karta').setAttribute('src', elements[randomElementNr].image);
		
	}
	
}


//Funkcja tłumaczenia z polskiego na angielski i z angielskiego na polski---------------
	

function polang(polang_arg) {

	resetMenu();
	
	document.getElementById('div_karta').removeAttribute('onclick');
	document.getElementById('div_karta').style.backgroundColor = '#D3CEF3';
		
	document.querySelector('div.karta').style.display = 'block';
	//document.querySelector('div.karta_body').style.display = 'block';
	
	randomElementNr = losowanie(0, elements.length);
	
	let divElement = document.createElement('div'); 	
		divElement.setAttribute('class', 'card-body');
		divElement.setAttribute('id', 'div_karta_body');
	
	document.getElementById('div_karta').appendChild(divElement);	
	
	let docFragment = document.createDocumentFragment();
	
	let h1Element = document.createElement('h6'); 	
		h1Element.setAttribute('class', 'karta card-title');
		h1Element.setAttribute('id', 'h1_karta');
			
		if (polang_arg === 1) {var trescH1 = document.createTextNode('Napisz po angielsku:');}
		if (polang_arg === 2) {var trescH1 = document.createTextNode('Napisz po polsku:');}
			
		h1Element.appendChild(trescH1);							
		docFragment.appendChild(h1Element);
	
	let pElement = document.createElement('p');
		pElement.setAttribute('class', 'karta');
		pElement.setAttribute('id', 'p_karta');
	
		if (polang_arg === 1) {var trescP1 = document.createTextNode( elements[randomElementNr].nazwa );}
		if (polang_arg === 2) {var trescP1 = document.createTextNode( elements[randomElementNr].name );}

		pElement.appendChild(trescP1);							
		docFragment.appendChild(pElement);														 
																 
	let inpElement = document.createElement('input');
		inpElement.setAttribute('class', 'karta');
		inpElement.setAttribute('id', 'input_karta');											inpElement.setAttribute('type', 'text');	
		inpElement.setAttribute('autocomplete', 'off');
		inpElement.setAttribute('placeholder', 'tu wpisz tłumaczenie');
		inpElement.autofocus = 'true';
	
		if (polang_arg === 1) { inpElement.setAttribute('onchange', 'sprawdzenie('+ 1 +')'); }
		if (polang_arg === 2) { inpElement.setAttribute('onchange', 'sprawdzenie('+ 2 +')'); }
	
		docFragment.appendChild(inpElement);

	let buttonElement = document.createElement('button');											buttonElement.setAttribute('display', 'none'); 
		buttonElement.setAttribute('class', 'karta'); 
		buttonElement.setAttribute('id', 'input_karta'); 
		if (polang_arg === 1) { buttonElement.setAttribute('onclick', 'polang('+ 1 +')');}
		if (polang_arg === 2) { buttonElement.setAttribute('onclick', 'polang('+ 2 +')');}
	
		docFragment.appendChild(buttonElement);
	
	document.getElementById('div_karta_body').appendChild(docFragment);					   
	
	let imgElement = document.createElement('img');	
		imgElement.setAttribute('class', 'karta card-img-bottom'); 
		imgElement.setAttribute('id', 'img_karta'); 
		if (polang_arg === 1) { imgElement.setAttribute('src', elements[randomElementNr].image); }
		if (polang_arg === 2) { imgElement.setAttribute('src', 'images/question.svg'); }
		
	document.getElementById('div_karta').appendChild(imgElement);
}


//Sprawdzenie tłumaczenia wyrazu do funkcji nauki ----------------
	

function checkInput (checkInput_arg) {
			
	var p_element = elements[checkInput_arg].name;
	sayIt(p_element);
	
	document.getElementById('pElement' + checkInput_arg ).innerHTML = p_element;
	document.getElementById('pElement' + checkInput_arg ).style.fontSize = '20px';
	
	setTimeout(function(){ 
		
		pel = elements[checkInput_arg].nazwa;
		
		document.getElementById('pElement' + checkInput_arg ).innerHTML = pel;
		document.getElementById('pElement' + checkInput_arg ).style.fontSize = '15px';
	}, 2000);
}


//Wypisanie wszystkich kafelków ze słówkami do nauki ---------


function nauka() {
	
	resetMenu();
	
	let loopMax = elements.length;
	
	for (var i=0; i < loopMax; i++) {
				
		var divElement = document.createElement('div'); 	
			divElement.setAttribute('id', 'divnr' + i);
			divElement.setAttribute('class', 'card nauka');
								
		var pElement = document.createElement('p');
			pElement.setAttribute('class', 'pl');
			pElement.setAttribute('id', 'pElement' + i);
		
		var tresc = document.createTextNode(elements[i].nazwa);		
		
		pElement.appendChild(tresc);							
		divElement.appendChild(pElement);						
				
		var imgElement = document.createElement('img');	
		    imgElement.setAttribute('src', elements[i].image);	
			imgElement.setAttribute('class', 'learn');
		
		divElement.appendChild(imgElement);
				
		divElement.setAttribute('onclick', 'checkInput('+ i +')');
	
		document.getElementById('learn_div').appendChild(divElement);
					
	}
	
}


//Funkcja pomocnicza do funkcji sprawdzianu. Odblokowanie przycisku "Sprawdź" po podstawieniu wszystkich pól sprawdzianu -------


function hasValue () {
	
	let valueCount = 0;
	for (let i=0; i < choosenToTest.length; i++) {
		
		if (document.getElementById('inp_test_nr'+i).value) { valueCount++; }
			
	}
		
	if (valueCount === choosenToTest.length) {
			document.getElementById('check_test_button').removeAttribute('disabled');
			document.getElementById('check_test_button').setAttribute('class', 'test enabled');
	} else { document.getElementById('check_test_button').disabled = 'true';
		     document.getElementById('check_test_button').setAttribute('class', 'test disabled');
	}
	
}


//Sprawdzian -------------------------------------------------


function sprawdzian() {
	
	resetMenu();
	ile = 6; // Ile słów ma zostać wylosowanych do testu
	ilePol = 3; //Ile słówek w teście ma być po Polsku 
	ileEng = ile - ilePol;
	
	//Robimy reset zbioru do testów --------------------------
		
	choosenToTest = [];
			
	//Tworzymy zbiór do testów--------------------------------
	
	let los;
	
	for (let i=0; i < ile; i++) { 
  		
		los = elements[losowanie(0, elements.length)];
		czyJest = false;
		
		
		for (let j=0; j<choosenToTest.length; j++) {
				if (choosenToTest[j].name === los.name) {czyJest=true; }
		}
		
		if (czyJest === true) { i--; } else { choosenToTest[i] = los; }
	}
 		
	//Tworzymy okienka zbioru do testów, wewnątrz pętli mamy rozbicie na pl i eng 
	
	let docFragment = document.createDocumentFragment();
	
	let loopMax = choosenToTest.length;
	for (let i=0; i<loopMax; i++) {
		
		// Tu tworzę h1 przed określonymi kafelkami 
		
		if (i===0 || i===ilePol) {
		
			let h1Element = document.createElement('h5'); 	
				h1Element.setAttribute('class', 'test');
				h1Element.setAttribute('id', 'h1_test' + i );
			
			if (i===0) 	{var trescH1 = document.createTextNode('Przetłumacz na język angielski:');}
			if (i===ilePol) {var trescH1 = document.createTextNode('Przetłumacz na język polski:');}
			
			h1Element.appendChild(trescH1);							
			docFragment.appendChild(h1Element);
		}
		 
		// Tu tworzę treść, p, divy, inputy i img
		
		let divElement = document.createElement('div'); 	
			divElement.setAttribute('class', 'test');
			divElement.setAttribute('id', 'div_test_nr' + i);
					
		let pElement = document.createElement('p');
			pElement.setAttribute('class', 'test');
			pElement.setAttribute('id', 'p_test_Element' + i);
		
		if (i<ilePol) { var tresc = document.createTextNode(choosenToTest[i].nazwa);} else {var tresc = document.createTextNode(choosenToTest[i].name);}		
						
		let imgElement = document.createElement('img');	
				imgElement.setAttribute('class', 'test');
				imgElement.setAttribute('id', 'img_test_Element' + i);

		if (i<ilePol) {
			imgElement.setAttribute('src', choosenToTest[i].image);
			} else {imgElement.setAttribute('src', 'images/question.svg');}

		let inpElement = document.createElement('input');
			inpElement.setAttribute('class', 'test');
			inpElement.setAttribute('value', '');
			inpElement.setAttribute('id', 'inp_test_nr' + i);
			inpElement.setAttribute('autocomplete', 'off');
			inpElement.setAttribute('placeholder', 'tu wpisz tłumaczenie');
			inpElement.setAttribute('onchange', 'hasValue()');
		
		// Podłączam utworzone kafelki i ich zawartość pod diva
		
		pElement.appendChild(tresc);							
		divElement.appendChild(pElement);	
		divElement.appendChild(imgElement);
		divElement.appendChild(inpElement);
		

		
		docFragment.appendChild(divElement);	
	}
	
	document.getElementById('test_div').appendChild(docFragment);
	
	// Tworzę kafelek z buttonem i pole do komentarza tekstowego
	
	h1Element = document.createElement('h5'); 	
	h1Element.setAttribute('class', 'test');
	h1Element.setAttribute('id', 'h1_test');
			
	trescH1 = document.createTextNode('Po wpisaniu wszystkich odpowiedzi kliknij przycisk "Sprawdź":');
					
	h1Element.appendChild(trescH1);							
	document.getElementById('test_div').appendChild(h1Element);
		
	let divElement = document.createElement('div'); 	
		divElement.setAttribute('class', 'test');
		divElement.setAttribute('id', 'check_test_div');
		
	let buttonElement = document.createElement('button');
		buttonElement.setAttribute('class', 'test disabled');
		buttonElement.setAttribute('id', 'check_test_button');
		buttonElement.setAttribute('onclick', 'testCheck()');
		buttonElement.setAttribute('background', 'testCheck()');
		buttonElement.disabled = 'true';
		
	buttonElement.appendChild(document.createTextNode('Sprawdź'));
	
	divElement.appendChild(buttonElement);	
	
	document.getElementById('test_div').appendChild(divElement);
}


//Sprawdzenie sprawdzianu ------------------------------------


function testCheck() {
	
	let pointsAtStart = points;		
	let test_comment ='Początkowa ilość punktów: ' + points +"<br><br>";
	
	let loopMax = choosenToTest.length;
	for (let i=0; i<loopMax; i++) {
								
		let usersInput;
		usersInput = document.getElementById('inp_test_nr'+i).value.toLowerCase();
				
		if (i<ilePol) {
		
			if (usersInput === choosenToTest[i].name ) { 
				
				document.getElementById('div_test_nr'+i).style.backgroundColor = "#95BCA7"
				points++;
				test_comment += 'Wyraz ' + choosenToTest[i].name + ' został dobrze przetłumaczony. Brawo! Otrzymujesz 1 punkt!';
				
			} else {
				
				document.getElementById('div_test_nr'+i).style.backgroundColor = "#E55E71" 
				points--;
				test_comment += 'Wyraz ' + choosenToTest[i].name + ' został źle przetłumaczony. Poćwicz jeszcze. Tracisz 1 punkt!';
			}
				document.getElementById('p_test_Element' + i).innerHTML += ' = ' + choosenToTest[i].name;
			
			} else {
			
			if (usersInput === choosenToTest[i].nazwa ) { 
				document.getElementById('div_test_nr'+i).style.backgroundColor = "#95BCA7"
				points++;
				test_comment += 'Wyraz ' + choosenToTest[i].name + ' został dobrze przetłumaczony. Brawo! Otrzymujesz 1 punkt!';
				

			} else {
				document.getElementById('div_test_nr'+i).style.backgroundColor = "#E55E71"
				points--;
				test_comment += 'Wyraz ' + choosenToTest[i].name + ' został źle przetłumaczony. Poćwicz jeszcze. Tracisz 1 punkt!';
				
			}			
			
			document.getElementById('p_test_Element' + i).innerHTML += ' = ' + choosenToTest[i].nazwa;
			document.getElementById('img_test_Element' + i).setAttribute('src', choosenToTest[i].image);
		}
		
		test_comment += "<br>";
		
	} 
	
	let pointsChange = points - pointsAtStart;
	test_comment += "<br>" + "W wyniku tego testu ilość punktów zmieniła się o : " + pointsChange;
	test_comment += "<br>" + "Końcowa ilość punktów: " + points;
	
	document.getElementById('points').innerHTML = "Punkty: " + points;
	document.getElementById('h1_test').innerHTML = "Rozwiązanie:";
	document.getElementById('check_test_div').style.display = "none";
	
	var divElement = document.createElement('div'); 	
		divElement.setAttribute('id', 'div_test_comment');
	
	var pElement = document.createElement('p');
		pElement.setAttribute('class', 'summary');
		pElement.setAttribute('id', 'p_summary');
		
	var tresc = document.createTextNode("");		
		
		pElement.appendChild(tresc);							
		divElement.appendChild(pElement);					
	
	document.getElementById('test_div').appendChild(pElement);
	document.getElementById("p_summary").innerHTML = test_comment;
}
	
	