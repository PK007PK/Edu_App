// JavaScript Document

// Przejęcie wyboru unitów ze strony głownej 

let unitSelected;
unitSelected = sessionStorage.lekcja;
let elements = elementsMag[unitSelected][0];

// Zmienna globalna do przekazania parametru pomiędzy poland i sprawdzeniem polang

let randomElementNr; 

// zmienne globalne do sprawdzianu

let ile;
let ilePol;
let ileEng;
let choosenToTest = new Array();
let points = 0;



//-------------------------*unitDataTake------------------
// Funkcja podłączana pod górne menu, pod select. Sprawdza co się wybrało, zapisuje to w sesji, przechodzi do lekcji.  

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

//Przypisanie funkcji do menu bocznego---------------------------------

document.getElementById('menu_nauka').addEventListener('click', nauka);
document.getElementById('menu_polang1').addEventListener('click', function () {polang(2)});
document.getElementById('menu_polang2').addEventListener('click', function () {polang(1)});
document.getElementById('menu_sprawdzian').addEventListener('click', sprawdzian);
document.getElementById('menu_saper').addEventListener('click', saper);
document.getElementById('menu_memory').addEventListener('click', memory);

function przypisanieswiatelka() 
{
    
    function swiatelko (elem) 
    {
        let tab = document.querySelectorAll('.list-group-item');
	    
        for (let i=0; i < tab.length; i++ ) 
        {
            tab[i].classList.remove('active');
	    }
	
        elem.className += ' active';
    }
    
    let tab = document.querySelectorAll('.list-group-item');
	
    for (let i=0; i < tab.length; i++ ) 
    {
		tab[i].addEventListener('click', function () {swiatelko(this)});
	}
}

przypisanieswiatelka();

//document.getElementById('logo').addEventListener('click', resetMenu);


//Reset menu -------------------------------------------------


function resetMenu() 
{
	document.querySelector('div.learn').innerHTML = '';
	document.querySelector('div.test').innerHTML = '';
	document.getElementById('saper_body').style.display = 'none';
	document.getElementById('saper_haslo').innerHTML = '';
    document.getElementById('memory_body').style.display = 'none';
	
	let list = document.getElementById('div_karta');
	
	while (list.hasChildNodes()) 
    {
		list.removeChild(list.firstChild);
    }
	
	document.querySelector('div.karta').style.display = 'none';
}


// Funkcja odtwarzania dźwięku ---------------------------------


function sayIt(query) 
{
  var q = new SpeechSynthesisUtterance(query);
  q.lang = 'en-GB';
  q.rate = 0.75;
  speechSynthesis.speak(q);
}

	
//Losowanie liczby z określonego przedziału ------------------

	
function losowanie(from_arg,to_arg)
{ 
	return Math.floor(Math.random() * to_arg) + from_arg;
}
	
//Sprawdzenie tłumaczenia ------------------------------------


function sprawdzenie(sprawdzenie_arg) 
{
	
    let usersInput;
	
	usersInput = document.getElementById('input_karta').value.toLowerCase();
	
	if (sprawdzenie_arg === 1) 
    {
		if (usersInput === elements[randomElementNr].name ) 
        { 
			document.querySelectorAll('button.karta')[0].style.display = 'block';
			document.querySelectorAll('button.karta')[0].innerHTML = 'Dobrze! Jeszcze raz?';
			document.getElementById('div_karta').style.backgroundColor = '#C8E9C3';
            sayIt('very good');
		} 
        else 
        { 
			document.querySelectorAll('button.karta')[0].style.display = 'block';
			document.querySelectorAll('button.karta')[0].innerHTML = 'Źle! Jeszcze raz?';
			document.getElementById('div_karta').style.backgroundColor = '#E55E71';
            sayIt('wrong');
		}
		
		sayIt(elements[randomElementNr].name);
		document.getElementById('p_karta').innerHTML += ' = ' + ' ' + elements[randomElementNr].name;
	} 
		
	if (sprawdzenie_arg === 2) 
    {	
				
		if (usersInput === elements[randomElementNr].nazwa ) 
        { 
			document.querySelectorAll("button.karta")[0].style.display = 'block';
			document.querySelectorAll("button.karta")[0].innerHTML = 'Dobrze! Jeszcze raz?';
			document.getElementById('div_karta').style.backgroundColor = '#C8E9C3';
            sayIt('very good');
		} 
        else 
        {  
			document.querySelectorAll("button.karta")[0].style.display = 'block';
			document.querySelectorAll("button.karta")[0].innerHTML = 'Źle! Jeszcze raz?';
			document.getElementById('div_karta').style.backgroundColor = '#E55E71';
            sayIt('wrong');
		}
		
		sayIt(elements[randomElementNr].name);
		document.getElementById('p_karta').innerHTML += ' = ' + ' ' + elements[randomElementNr].nazwa;
		document.getElementById('img_karta').setAttribute('src', elements[randomElementNr].image);
		
	}
	
}

//Funkcja tłumaczenia z polskiego na angielski i z angielskiego na polski---------------

function polang(polang_arg) {

	resetMenu();
	
	//document.getElementById('div_karta').removeAttribute('onclick');
	document.getElementById('div_karta').style.backgroundColor = 'rgba(173,216,230,0.5)';
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


//Funkcja pomocnicza do funkcji sprawdzianu. Odblokowanie przycisku "Sprawdź" po podstawieniu wszystkich pól sprawdzianu ----


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
			divElement.setAttribute('class', 'test card');
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
			inpElement.setAttribute('class', 'test form-control');
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
	
	//document.getElementById('points').innerHTML = "Punkty: " + points;
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


//------------------------------------------------------------
//*Saper ------------------------------------------------------
//------------------------------------------------------------

let dlugosc;
let haslo1 = '';
let haslo = '';
let ile_skuch = 0;
let helpImage;

function losowanie(from_arg,to_arg) { 
    
	return Math.floor(Math.random() * to_arg) + from_arg;
}
	
function losowanieHasla () {
    randomElementNr = losowanie(0, elements.length);
    haslo = elements[randomElementNr].name;
    helpImage = elements[randomElementNr].image;
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce>this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

function sprawdz(nr) 
{
	let trafiona = false;
	
	for (let i=0; i<dlugosc; i++) 
	{
		if (pushbuttons[nr] == haslo.charAt(i)) 
		{
			haslo1 = haslo1.ustawZnak(i,pushbuttons[nr]);
			trafiona = true;
		}
	}
	
	if (trafiona==true) 
	{
		sayIt(pushbuttons[nr]);
		let element = 'lit'+nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		wypisz_haslo();
	}
	else
	{
		sayIt('no');
		let element = 'lit'+nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute('onclick',';')
		
		//Błąd
		
		if (ile_skuch<5) ile_skuch++;
		
		document.getElementById('saper_obrazek2').src = 'images/saper/saper' + ile_skuch + '.jpg';
				
	}
	
	//Wygrana
	if (haslo == haslo1) 
    {
		document.getElementById('saper_klawiatura').innerHTML = 'Podano prawidłowe hasło: '+haslo+ '<br/><br/><span class="reset" onclick="saper()">Jeszcze raz?</span> ';
        ile_skuch = 0;
    }
	
	//Przegrana
	
	if (ile_skuch==5) 
	{
		document.getElementById('saper_klawiatura').innerHTML = 'Przegrałeś!<br/><br/><span class="reset" onclick="saper()">Jeszcze raz?</span> ';
        ile_skuch = 0;
	}
}

function wypisz_haslo() {
	document.getElementById('saper_haslo').innerHTML = haslo1;
}

wypisz_haslo();

function saper() {
	resetMenu();
	losowanieHasla ();
    haslo1 = '';
	haslo = haslo.toLowerCase();
    dlugosc = haslo.length;
    ile_skuch = 0;
    
	//----------Tworzymy divy dla gry
	
	let body = document.getElementById('saper_body');
		body.style.display = 'block';
	
	for (let i=0; i<dlugosc; i++){
		if (haslo.charAt(i) ==" ") haslo1 = haslo1 + " "; 
		else haslo1 = haslo1 + "-";
	}
	
	function klawiatura () {
		
		let tresc_diva = "";
		for (let i=0; i<pushbuttons.length; i++) {
			let element = 'lit' + i;
            if (!(i % 8)) tresc_diva = tresc_diva + '<div class = "float-none"></div>';
			tresc_diva = tresc_diva + '<div class = "litera float-left" onclick="sprawdz('+i+')" id="'+element+'">'+ pushbuttons[i] +'</div>';
		}
		
		document.getElementById('saper_klawiatura').innerHTML = tresc_diva;	
		wypisz_haslo();
        document.getElementById('saper_obrazek2').src = 'images/saper/saper0.jpg';
        document.getElementById('saper_obrazek3').src = helpImage;
	}
	
	klawiatura ();
	
}

//-------------------------------------------------------------
//*Memo--------------------------------------------------------
//-------------------------------------------------------------


function memory ()
{
	//Zmienne --------------------------------    
    
    let choosenToPlay = new Array();
    let choosenToPlay2 = new Array();
    
    function przygotowanieplanszy () 
    {
        resetMenu();
        document.getElementById('memory_body').style.display = 'block';
    }
    
    przygotowanieplanszy ();
		
	//Reset obrazków na początek gry--------------------------
    //Ważne, jeżeli odbyła się gra po grze;
    
    for (let i = 0; i < 12; i++)
    {
        $('#memo'+i).css('background-image', 'url(images/question.svg)');
        $('#memo'+i).css('opacity', 1);
    }
    
    //Tworzymy zbiór do testów--------------------------------
	
    function losowanieelementow () 
    {
        choosenToPlay = [];
        choosenToPlay2 = [];
        
        let los;
        
        for (let i=0; i < 6; i++) 
        { 
            los = elements[losowanie(0, elements.length)];
            czyJest = false;

            for (let j=0; j<choosenToPlay.length; j++) 
            {
                if (choosenToPlay[j].name === los.name) {czyJest=true; }
            }

            if (czyJest === true) { i--; } else { choosenToPlay[i] = los; }
        }

        
        for (let i=0; i < 6; i++) 
        { 
            los = choosenToPlay[losowanie(0, choosenToPlay.length)];
            czyJest = false;

            for (let j=0; j<choosenToPlay2.length; j++) 
            {
                if (choosenToPlay2[j].name === los.name) {czyJest=true; }
            }

            if (czyJest === true) { i--; } else { choosenToPlay2[i] = los; }
        }
        
        choosenToPlay = choosenToPlay.concat(choosenToPlay2);
    }
    
    losowanieelementow ();
    
    //Wyświetlamy kafelki w losowej kolejności na stronie------
    
    function rozmieszczenie () 
    {
        
    }
    
    rozmieszczenie ();
    
    //Schowanie karty po trafieniu-----------------------------
    
    function schowanie (nr1, nr2)
    {
        $('#memo'+nr1).css('opacity', '0');
        $('#memo'+nr2).css('opacity', '0');
        lock = false;
    }
    
    function zasloniecie (nr1, nr2)
    {
        $('#memo'+nr1).css('background-image', 'url(images/question.svg)');
        $('#memo'+nr1).removeClass('active');
        $('#memo'+nr1).addClass('inactive');
        $('#memo'+nr2).css('background-image', 'url(images/question.svg)'); 
        $('#memo'+nr2).removeClass('active');
        $('#memo'+nr2).addClass('inactive');
        lock = false;
    }
    
    //Odwrócenie kafelka i sprawdzenie poprawności trafienia---    
    
    let oneVisible = false;
    let turnCounter = 0;
    let visible_nr;
    let lock = false;
    let pairsLeft = 6;
    
    function odwrocenie (ele) 
    {
        
        var opacityValue = $('#memo'+ele).css('opacity');
        if (opacityValue != 0 && lock == false)
        {
            lock = true;
            let obraz = "url(" + choosenToPlay[ele].image + ")";
            $('#memo'+ele).css('background-image', obraz);

            if(oneVisible == false)
            {
                oneVisible = true;
                visible_nr = ele;
                $('#memo'+ele).addClass('active');
                lock = false;
                console.log('nr 1: ' + choosenToPlay[visible_nr].name);
            }
            else
            {
                $('#memo'+ele).addClass('active');
                console.log('nr 2: ' + choosenToPlay[ele].name);
                if (choosenToPlay[visible_nr] == choosenToPlay[ele])
                {
                    //alert('para');
                    sayIt(choosenToPlay[ele].name);
                    setTimeout(function() { schowanie (ele, visible_nr) }, 950); 
                    pairsLeft--;
                }
                else
                {
                    //alert('pudlo');
                    setTimeout(function() { zasloniecie (ele, visible_nr) }, 950);
                }

                turnCounter++;
                $('#punkty').html('Licznik rund: ' + turnCounter);
                oneVisible = false;
            }
            
        }
        
    }
     
    
    //Przypisanie odwrocenia----------------------------------    

    function przypisanieOdwrocenia () 
    {
        
        for (let i = 0; i <= 11; i++)
            {
                document.getElementById('memo'+i).addEventListener('click', function () {odwrocenie(i)});
            }
    }
    
    przypisanieOdwrocenia ();
    
}




