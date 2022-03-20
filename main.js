function createGrid(tableSize){
	let i = 0;
	let j = 0;

	let div_row = document.createElement('div');
	div_row.classList.add('row');
	document.querySelector('.container').append(div_row);
	while (i < tableSize){
		let p = document.createElement('p');
		p.innerText = '0';
		p.classList.add('pCol', 'pCol' + i);
		div_row.append(p);
		i++;
	}

	i = 0;

	while (i < tableSize){
		let p = document.createElement('p');
		p.innerText = '0';
		p.classList.add('pRow', 'pRow' + i);
		let div_row = document.createElement('div');
		div_row.classList.add('row');
		document.querySelector('.container').append(div_row);
		div_row.append(p);
		while (j < tableSize){
			let div_col = document.createElement('div');
			div_col.classList.add('case', 'col' + j, 'row' + i);
			div_row.appendChild(div_col);
			j++;
		}
		j = 0;
		p = document.createElement('p');
		p.innerText = '0';
		p.classList.add('pRow', 'pRow' + i);
		div_row.insertAdjacentElement('beforeend', p);
		i++;
	}

	i = 0;

	div_row = document.createElement('div');
	div_row.classList.add('row');
	document.querySelector('.container').append(div_row);
	while (i < tableSize){
		let p = document.createElement('p');
		p.innerText = '0';
		p.classList.add('pCol', 'pCol' + i);
		div_row.append(p);
		i++;
	}
}

function placeBombs(){
	let cases = document.querySelectorAll('.case');
	let i = 0;

	while (i < cases.length){
		rng = Math.random();
		if(rng < 0.3){
			cases[i].classList.add('bomb');
		}
		i++;
	}
}

function checkLines(tableSize){
	let i = 0;
	let j = 0;
	let nbrBmb = 0;

	while (i < tableSize){
		let cases = document.querySelectorAll('.row' + i);
		while (j < tableSize){
			if (cases[j].classList.contains('bomb')){
				nbrBmb++;
			}
			j++;
		}
		let p = document.querySelectorAll('.pRow' + i);
		p.forEach(element => element.innerText = nbrBmb);
		nbrBmb = 0;
		j = 0;
		i++;
	}
}

function checkColumns(tableSize){
	let i = 0;
	let j = 0;
	let nbrBmb = 0;

	while (i < tableSize){
		let cases = document.querySelectorAll('.col' + i);
		while (j < tableSize){
			if (cases[j].classList.contains('bomb')){
				nbrBmb++;
			}
			j++;
		}
		let p = document.querySelectorAll('.pCol' + i);
		p.forEach(element => element.innerText = nbrBmb);
		nbrBmb = 0;
		j = 0;
		i++;
	}
}

function gameOver(){
	for(let element of document.querySelectorAll('.case')){
		if(element.classList.contains('bomb')){
			element.classList.add('bombFound');
		}
		else element.classList.add('notBombFound');
	}
}

function play(){
	let clicks = 0;
	let nbrBmbs = document.querySelectorAll('.bomb').length;
	let nbrCases = document.querySelectorAll('.case').length;
	document.querySelector('.btn').addEventListener('click', function(){
		window.location.reload();
	});
	document.querySelectorAll('.case').forEach(element => element.addEventListener('click', function(){
		if(element.classList.contains('bomb')){
			window.alert('Perdu!');
			gameOver();
		}
		else{
			element.classList.add('notBombFound');
			clicks++;
			if(clicks == nbrCases - nbrBmbs){
				window.alert('Bien joué!');
				gameOver();
			}
		}
	}));
}

function callFunctions(){
	let tableSize = window.prompt('Entrez un chiffre entre 0 et 15 pour déterminer la résolution du tableau (valeur par défaut : 5)', 5);
	if (tableSize <= 0 || tableSize > 15 || tableSize == null){
		callFunctions();
	}
	createGrid(tableSize);
	placeBombs(tableSize);
	checkLines(tableSize);
	checkColumns(tableSize);
	play();
}

callFunctions();