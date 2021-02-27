// Pour les images
var carte = ["5C","5D","5H","5S",
             "6C","6D","6H","6S",
             "7C","7D","7H","7S",
             "8C","8D","8H","8S",
             "9C","9D","9H","9S",
             "10C","10D","10H","10S",
             "JC","JD","JH","JS",
             "QC","QD","QH","QS",
             "KC","KD","KH","KS",
			 "AC","AD","AH","AS"];

// Distribuer les cartes

// 40 cartes
var paquet =  Array.from({length:40},(v,k)=>k+1);

// Melanger les cartes
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Fonction de distribution des cartes au debut du jeu 
function distribuerCartes(){
	paquet = shuffle(paquet);

	var jeu1 = (paquet.slice(0,9)).sort();
	var jeu2 = (paquet.slice(10,19)).sort();
	var jeu3 = (paquet.slice(20,29)).sort();
	var jeu4 = (paquet.slice(30,39)).sort();
	afficherCartes(jeu1,jeu2,jeu3,jeu4);
	return 0;
}

// Afficher cartes en donnant les cartes en jeu
function afficherCartes(jeu1,jeu2,jeu3,jeu4){

	return 0;
}




// Mises
function mises(){
	var mise = document.getElementById('email').value;
	return 0;
}


// Jeu : Jouer cartes, determiner qui remporte, compter les points

// Updater l'affichage des cartes et jouer la carte au centre
function playCard(){
	return 0;
}

// Calculer qui remporte la main (+modifier les points de l'equipe)
function gagnant(main){
	gagnant = 0; // quel joueur gagne
	return gagnant;
}

// AI : JEAN