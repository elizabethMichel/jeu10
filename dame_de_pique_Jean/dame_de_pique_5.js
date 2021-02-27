//par Jean Laprés-Chartrand et Camillou
//Dame de pique 
//brouillon
//plusieurs fonction de se programme sont largement inspirer de cours de ift 1015 a udem
var carte = ["2C","2D","2H","2S",
             "3C","3D","3H","3S",
             "4C","4D","4H","4S",
             "5C","5D","5H","5S",
             "6C","6D","6H","6S",
             "7C","7D","7H","7S",
             "8C","8D","8H","8S",
             "9C","9D","9H","9S",
             "10C","10D","10H","10S",
             "JC","JD","JH","JS",
             "QC","QD","QH","QS",
             "KC","KD","KH","KS",
			 "AC","AD","AH","AS"];
var paquetPasBrasser = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,
                        37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
var jeu1 = [];
var jeu2 = [];
var jeu3 = [];
var jeu4 = [];
var carteJouableJeu1 = [];
var jeuDistribuer = {player1:jeu1,player2:jeu2,player3:jeu3,player4:jeu4};
var point1 = {pointTable1:0,pointmain1:0};
var point2 = {pointTable2:0,pointmain2:0};
var point3 = {pointTable3:0,pointmain3:0};
var point4 = {pointTable4:0,pointmain4:0};
var pointJoueur = {player1:point1,player2:point2,player3:point3,player4:point4};
var brasseur = function(matrice){
    var matriceBrasser = [];
    for (var i = 0; i < 52; i++){
        var ancienneMatrice = matrice;
        var carte = Math.floor(Math.random()*(52-i));
        var nouvelleMatrice = ancienneMatrice.slice(0,carte);
        if(matrice.length !=0){
            matriceBrasser.push(matrice[carte]);
            matrice = nouvelleMatrice.concat(matrice.slice(carte+1));
        }
    }
    return matriceBrasser;
};
var createurfisuelcarteUnique = function(numeroCarte,joueur){
    var ligne = "";
    var debut = "<td id=";
    var milieu = "><img src=";
    var fin = "></td>";
    ligne+=debut;
    ligne+=""+joueur+" ";//le id 
    ligne+= milieu;
    ligne+="cards/"+carte[numeroCarte]+".svg";
    ligne+=fin;
    return ligne;
};
var createurfisuelCarte = function (paquet){
    var ligne = "";
    var debut = "<td id=";
    var milieu = "><img src=";
    var fin = "></td>";
    for(var j = 0;j<jeu1.length;j++){
        ligne+=debut;
        ligne+=""+j+" ";//le id 
        ligne+="onclick=\"clique("+j+");\"";
        ligne+= milieu;
        ligne+="cards/"+carte[jeu1[j]]+".svg";
        ligne+=fin;
    }
    return ligne;
};
var plasseurcroissant = function (matrice){
    for(var i = 0; i<matrice.length-1;i++){
        for (var j = i+1;j<matrice.length;j++){
            if(matrice[j]<matrice[i]){
                var trol = matrice[i];
                matrice[i]=matrice[j];
                matrice[j]=trol;
            }
        }
    }
    return matrice;
};
var plasseurDeJeu = function(paquet){
    var pique = [];
    var trefle = [];
    var coeur = [];
    var carreau = [];
    for (var k = 0; k<13; k++){
        if (paquet[0] % 4 == 0){
            trefle.push(paquet.shift());
        }
        else if (paquet[0] % 4 == 1){
            carreau.push(paquet.shift());
        }
        else if (paquet[0] % 4 == 2){
            coeur.push(paquet.shift());
        }
        else if (paquet[0] % 4 == 3){
            pique.push(paquet.shift());
        }
    }
    pique = plasseurcroissant(pique);
    trefle = plasseurcroissant(trefle);
    coeur = plasseurcroissant(coeur);
    carreau = plasseurcroissant(carreau);
    jeu = trefle.concat(carreau).concat(pique).concat(coeur);
    return jeu;
};
var matrice = brasseur(paquetPasBrasser);
jeu1 = matrice.slice(0,13);
jeu2 = matrice.slice(13,26);
jeu3 = matrice.slice(26,39);
jeu4 = matrice.slice(39,52);
jeu1 = plasseurDeJeu(jeu1);
var joueur3 = '<td id="joueur3"><img src="cards/empty.svg"></td>';//la carte que la personne d'en face viens de jouer
var joueur2 = '<td id="joueur2"><img src="cards/empty.svg"></td>';//la carte que la personne a gauche viens de jouer
var joueur4 = '<td id="joueu4"><img src="cards/empty.svg"></td>';//la carte que la personne a droite viens de jouer
var joueur1 = '<td id="joueur1"><img src="cards/empty.svg"></td>';//la carte que le joueur viens de jouer
var carteCacher = '<td style="visibility:hidden;"><img src="cards/empty.svg"></td>';
var tour = "";
var trouveurtour = function(){
		if(jeu1.indexOf(0)!=-1){
			tour="joueur1";
		}
		else if(jeu2.indexOf(0)!=-1){
			tour="joueur2";
			AI(2);
		}
		else if(jeu3.indexOf(0)!=-1){
			tour="joueur3";
			AI(3);
		}
		else if(jeu4.indexOf(0)!=-1){
			tour="joueur4";
			AI(4);
		}
};
var jouabilitee = function (jeu){
	var possiblementJouable = [];
	if (carteSurLaTable.length != 0 ){
		var sorte = carteSurLaTable[0]%4;
		for(var t = 0; t<jeu.length; t++){
			if(jeu[t]%4 == sorte){
				possiblementJouable.push(jeu[t]);
			}
		}
		if(possiblementJouable.length==0){
			return jeu;
		}
		else if(possiblementJouable.length != 0){
			return possiblementJouable;
		}
	}
	else if (carteSurLaTable.length == 0 ){
		if(jeu1.indexOf(0)!=-1){
			return [0];
		}
		else if(pointJoueur.player1.pointTable1+pointJoueur.player2.pointTable2+pointJoueur.player3.pointTable3+pointJoueur.player4.pointTable4!=0 && pointJoueur.player1.pointTable1+pointJoueur.player2.pointTable2+pointJoueur.player3.pointTable3+pointJoueur.player4.pointTable4!=13){
			return jeu;
		}
		else if(pointJoueur.player1.pointTable1+pointJoueur.player2.pointTable2+pointJoueur.player3.pointTable3+pointJoueur.player4.pointTable4==0 && pointJoueur.player1.pointTable1+pointJoueur.player2.pointTable2+pointJoueur.player3.pointTable3+pointJoueur.player4.pointTable4!=13){
			for(var p = 0; p<jeu.length; p++){
				if(jeu[p]%4!=2){
					possiblementJouable.push(jeu[p]);
				}
			}
			if(possiblementJouable.length==0){
				return jeu;
			}
			else if(possiblementJouable!=0){
				return possiblementJouable;
			}
		}
	}
};
var carteJouerDepuisLeDebutDeLaMain = [];
var carteSurLaTable = [];
var clique = function(id){
    var carteJouable=[];
	if (tour=="joueur1" && carteSurLaTable.length<4){
		carteJouable = jouabilitee(jeu1);
		carteJouableJeu1=carteJouable;
		init();
	}
	if(carteJouable.indexOf(jeu1[id])!=-1){
			carteSurLaTable.push(jeu1[id]);
			joueur1 = createurfisuelcarteUnique(jeu1[id],"joueur1");
			carteJouerDepuisLeDebutDeLaMain.push(jeu1[id]);
			jeu1 = retireurCarte(jeu1,jeu1[id]);
			if (carteSurLaTable.length == 4){
				ajouteurPoint(1);
			}
			else{
				tour = "joueur2";
				AI(2);
				init();
			};
			
	}
};
var effasseurJeu = function(){
	joueur1='<td id="joueur1"><img src="cards/empty.svg"></td>';
	joueur2='<td id="joueur2"><img src="cards/empty.svg"></td>';
	joueur3='<td id="joueur3"><img src="cards/empty.svg"></td>';
	joueur4='<td id="joueur4"><img src="cards/empty.svg"></td>';
	init();
};
var ajouteurPoint = function(joueur){//joueur est le dernier joueur a avoir jouer
	var sorte = carteSurLaTable[0]%4;
	var carteGagnante = 0;
	var joueurGagnant=0;
	for (var y = 0; y<4 ; y++){
		if(carteSurLaTable[y]%4==sorte){
			if(carteGagnante<carteSurLaTable[y]){
				carteGagnante = carteSurLaTable[y];
			}
		}
	}
	var carteQuiAGagner = carteSurLaTable.indexOf(carteGagnante);
	if(joueur==4){
		if(carteQuiAGagner==0){
			joueurGagnant=1;
		}
		if(carteQuiAGagner==1){
			joueurGagnant=2;
		}
		if(carteQuiAGagner==2){
			joueurGagnant=3;
		}
		if(carteQuiAGagner==3){
			joueurGagnant=4;
		}
	}
	if(joueur==1){
		if(carteQuiAGagner==0){
			joueurGagnant=2;
		}
		if(carteQuiAGagner==1){
			joueurGagnant=3;
		}
		if(carteQuiAGagner==2){
			joueurGagnant=4;
		}
		if(carteQuiAGagner==3){
			joueurGagnant=1;
		}
	}
	if(joueur==2){
		if(carteQuiAGagner==0){
			joueurGagnant=3;
		}
		if(carteQuiAGagner==1){
			joueurGagnant=4;
		}
		if(carteQuiAGagner==2){
			joueurGagnant=1;
		}
		if(carteQuiAGagner==3){
			joueurGagnant=2;
		}
	}
	if(joueur==3){
		if(carteQuiAGagner==0){
			joueurGagnant=4;
		}
		if(carteQuiAGagner==1){
			joueurGagnant=1;
		}
		if(carteQuiAGagner==2){
			joueurGagnant=2;
		}
		if(carteQuiAGagner==3){
			joueurGagnant=3;
		}
	}
	tour = "joueur"+joueurGagnant;
	var pointAAjouter = 0;
	for(var u=0; u<4; u++){
		if(carteSurLaTable[u]%4==2){
			pointAAjouter+=1;
		}
		else if (carteSurLaTable[u]==43){
			pointAAjouter+=13;
		}
	}
	if(joueurGagnant==1){
		pointJoueur.player1.pointTable1+=pointAAjouter;
	}
	if(joueurGagnant==2){
		pointJoueur.player2.pointTable2+=pointAAjouter;
	}
	if(joueurGagnant==3){
		pointJoueur.player3.pointTable3+=pointAAjouter;
	}
	if(joueurGagnant==4){
		pointJoueur.player4.pointTable4+=pointAAjouter;
	}
	init();
};
var carteJouableVert = function (){
	var carteJouable = [];
	carteJouable=jouabilitee(jeu1);
    for(var f=0;f<carteJouable.length;f++){
        document.getElementById(jeu1.indexOf(jouabilitee(jeu1)[f])).style.backgroundColor = "lime";
    }
	
};
var init = function (){
    document.getElementById("b").innerHTML = '\
<table>\
<tr>'+carteCacher+carteCacher+carteCacher+carteCacher+carteCacher+carteCacher+'<td><img src="cards/back.svg"></td>\
</tr>\
<tr>'+carteCacher+carteCacher+carteCacher+carteCacher+carteCacher+carteCacher+joueur3+
    '</tr>\
<tr><td id="gauche"><img src="cards/back.svg"></td>'+carteCacher+carteCacher+joueur2+carteCacher+carteCacher+carteCacher+carteCacher+carteCacher+joueur4+carteCacher+carteCacher+'<td id="droite"><img src="cards/back.svg"></td>\
</tr>\
<tr>'+carteCacher+carteCacher+carteCacher+carteCacher+carteCacher+carteCacher+joueur1+
    '</tr>\
<tr>'+createurfisuelCarte(jeu1)+
    '</tr>\
</table>\
<button onclick="debarasser();">debarasser</button> <br></br> </tr>\
<button onclick="carteJouableVert();">carte jouable</button> <br></br> </tr>\
<br><tr>'+"tour: "+tour+'</tr>\
<br><tr>'+"point du joueur 1: "+pointJoueur.player1.pointTable1+"; jeu1 = "+jeu1+"; jeu1.length = "+jeu1.length+'</tr>\
<br><tr>'+"point du joueur 2: "+pointJoueur.player2.pointTable2+"; jeu2 = "+jeu2+"; jeu2.length = "+jeu2.length+'</tr>\
<br><tr>'+"point du joueur 3: "+pointJoueur.player3.pointTable3+"; jeu3 = "+jeu3+"; jeu3.length = "+jeu3.length+'</tr>\
<br><tr>'+"point du joueur 4: "+pointJoueur.player4.pointTable4+"; jeu4 = "+jeu4+"; jeu4.length = "+jeu4.length+'</tr>\
<br><tr>'+"carteJouerDepuisLeDebutDeLaMain: "+carteJouerDepuisLeDebutDeLaMain+'</tr>\
<br><tr>'+"carteSurLaTable: "+carteSurLaTable+'</tr>';
carteJouableVert();
};


var debarasser = function(){
	if (carteSurLaTable.length==4){
		carteSurLaTable = [];
		effasseurJeu();
		if(tour=="joueur2"){
			AI(2);
		}
		if(tour=="joueur3"){
			AI(3);
		}
		if(tour=="joueur4"){
			AI(4);
		}
	}
};


var retireurCarte = function (jeu,carteJouer){
	var cartePrecedante = jeu.slice(0,jeu.indexOf(carteJouer));
	if(jeu.indexOf(carteJouer)==jeu.length){
		jeu = cartePrecedante;
	}
	else{
		jeu = cartePrecedante.concat(jeu.slice(jeu.indexOf(carteJouer)+1));
	}
	return jeu;
};

//la partie suivante est destiner a l'AI
var AI = function (joueuri){
    var carteJouable=[];
    if(joueuri==2){
		var jeui = jeu2;
	}
	if(joueuri==3){
		var jeui = jeu3;
	}
	if(joueuri==4){
		var jeui = jeu4;
	}
	if(carteSurLaTable.length==0){
        if(jeui.indexOf(0)!=-1){
            carteJouable = [0];
        }
        else{
            carteJouable = jeui;
        }
    }
    else {
        carteJouable = jouabilitee(jeui);
    }
    var carteJouerAI = decisionAI(carteJouable);
    carteSurLaTable.push(carteJouerAI);
	
	jeui = retireurCarte(jeui,carteJouerAI);
	if(joueuri==2){
		jeu2=jeui;
	}
	if(joueuri==3){
		jeu3=jeui;
	}
	if(joueuri==4){
		jeu4=jeui;
	}
	
	if(joueuri==2){
		joueur2 = createurfisuelcarteUnique(carteJouerAI,tour);
	}
	if(joueuri==3){
		joueur3 = createurfisuelcarteUnique(carteJouerAI,tour);
	}
	if(joueuri==4){
		joueur4 = createurfisuelcarteUnique(carteJouerAI,tour);
	}
    carteJouerDepuisLeDebutDeLaMain.push(carteJouerAI);
    if (carteSurLaTable.length == 4){
        ajouteurPoint(joueuri);
    }
    else if(carteSurLaTable.length < 4){
		if(joueuri==2){
			tour = "joueur3";
			AI(3);
		}
		if(joueuri==3){
			tour = "joueur4";
			AI(4);
		}
		if(joueuri==4){
			tour = "joueur1";
			init();
			carteJouableVert();
		}
    };
};




var decisionAI = function(carteJouable){
	return carteJouable[Math.floor(Math.random()*carteJouable.length)];
};


trouveurtour();
