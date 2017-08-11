import { Injectable } from '@angular/core';

const emptynbDboard ={
  d4:0,
  d6:0,
  d8:0,
  d10:0,
  d12:0,
  d20:0,
};

@Injectable()
export class NbDboardService{

  //nbDboard c'est une propriété : type object
  nbDboard:object =Object.assign({}, emptynbDboard);

  /**propriétés relier à l'animation des dés, animationD permet l'affichage du
  score total après l'animation.
 tempsAnimation détermine le temps de l'animation;
*/
  animationD = true;
  tempsAnimation = 2000;

  //propriété qui change au click 'rollDices' pour desactiver le bouton;
//A FAIRE UNE VARIALE POUR CHAQUE BOUTON!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  rollbuttonState =false;
  reRollbuttonState = false;
  resetbuttonState = false;
  addDicebuttonState = false;
  removeDicebuttonState =false;

  //methode qui change l'etat du boutton roll :
  changeRollButtonState(){
      this.rollbuttonState = true;
  }
  //methode qui change l'etat des bouttosn add and remove dice :
  changeAddRemoveButtonState(){
    this.addDicebuttonState = true;
    this.removeDicebuttonState = true;
  }




/**déclarer une nouvelle propriété, tableau vide, qui stocke les résultats
  dataResult = [{
      type :
      result:
      selected : true/false --> valeur checkbox
      spinning : true/false --> true le dés est animé/ pas d'animation
    }]
*/
  dataResult =[
  ];

  score;


  //getnbDboardData c'est une methode qui return nbDboard
  getnbDboardData(){
    return this.nbDboard;
  }
  getdataResult(){
    return this.dataResult;
  }
  /**
  On renvoie un entier aléatoire entre une valeur min (incluse)
  et une valeur max (incluse).
  Attention : si on utilisait Math.round(), on aurait une distribution
  non uniforme !
  on détermine le max de la function random en fct du type;
  */
  getRandomIntInclusive(diceType) {
    let max;
    if (diceType == "d4"){max=4};
    if (diceType == "d6"){max=6};
    if (diceType == "d8"){max=8};
    if (diceType == "d10"){max=10};
    if (diceType == "d12"){max=12};
    if (diceType == "d20"){max=20};
    return Math.floor(Math.random() * (max - 1 +1)) + 1;
  };

  //on obtient un nombre aléatoire selon le type de dé :diceType

  /**
  Selon le nb de lancer:nblancer (boucle for) puis
  on met ensuite les résultats dans un objet generique
  {
    type: diceType,
    result: random(avec la function getRandomIntInclusive)
    selected : true/false quand on selectionne les dés pour les relancer dans
              reRoll()
    spinning :true/false relier au temps d'animation propriété: tempsAnimation,
              permet d'afficher le resultat de chaque dés apres que l'animation
              soit terminer.
  }
    */
  generatedice(diceType,nbLancer){
    let result=[];
    for(let i = 0; i < nbLancer ;i++){
    result.push({
        type : diceType,
        result : this.getRandomIntInclusive(diceType),
        selected : false,
        spinning :true,
      })
    }
    return result;
  };

  /** On fait la somme des résultats obtenus pour chaque chaque dés pour le
  score total   */
  reduceTable(dataResult){
    let somme = dataResult.reduce(function(a, b) {
      return a + b.result
      }, 0
    );
    console.log("score total :",somme)
    /** sort le résultat */
    this.score=somme;
  }


  /** afficher le résultat apres l'animation determinée par la propriété
  tempsAnimation. change pour chaque objet résultat la valeur de spinning dans
  le tableau dataResult de true  à false.
  l'animation est gérer par la class diceSpin qui est retirer quand la valeur
  de spinning passe à false.
  affiche le score total (dans html) en changeant la valeur du animationD à false
  change la valeur du bouton relancer les dés reRollbuttonState
  */
    afficherResult(param){
      setTimeout(()=>
      {
        this.dataResult.forEach(
          result => {
            result.spinning  = false;
          }
        )
        this.animationD = false;

        this.resetbuttonState =false;
      }, this.tempsAnimation);
    }


  /**methode qui donne une resultat aléatoire selon le type de dés et le nombre
   de dé (valeurs dans nbDboard) et retourne un tableau dataResult qui contient
   tous les résultats pour chacun des dés lancés
  */
  rollDices(){

    //on change l'état du boutton add et remove dice au click
    this.changeAddRemoveButtonState();
    this.rollbuttonState = false;
    this.resetbuttonState = true;
    /**  On vide le tableau de resultat, pour avoir de nouvelle valeur sans les anciens lancer
     à revoir vu qu'on va garder parfois certain dés... peut etre methode filter.
     */
    this.dataResult = [];
    //parcourir l'object nbDboard avc "for in"
    for(let diceType in this.nbDboard){
      /**
      variable temporaire temporary type: objet {type:diceType,result:random}
      que l'on va inserer dans dataResult
      */
      let temporary = this.generatedice(diceType,this.nbDboard[diceType]);
      //console.log("temporary",temporary)

      /** La méthode map() crée un nouveau tableau composé des images des
      éléments du tableau courant par une fonction donnée en argument.
      map fait des itérations; permet de passer des fct en parametre
      et de transformer ton object
       */
      temporary.map (obj=>{
        /**autre facon sans l'utilisation de =>
            let toto=this
            tempory.map ( function(obj,toto){
                toto.dataResult.push(obj)
              })
            .push() ajoute au dataResult le tableau temporary
        */
        //console.log("obj",obj)
          this.dataResult.push(obj);
        });
      //console.log('on parcourt l object',`this.nbDboard.${diceType}=${this.nbDboard[diceType]}`);
      };
      console.log('dataResult: ',this.dataResult)
      /** On fait la somme des résultats obtenus pour chaque chaque dés */
      this.reduceTable(this.dataResult)
      //change la valeur de spinning et de animationD
      this.afficherResult(this.dataResult);
    }


  /**methode qui parcourt le tableau dataResult et change la valeur de la
  propriété selected à true pour relancer les dés.
  change la valeur de reRollbuttonState à true si au moins un dé résultat est
   selectionné
   */
  selectDice(diceResultData){
    //console.log("var type :",type)

    if (diceResultData.selected == false){
      diceResultData.selected = true;
      this.reRollbuttonState =true;
    }else{
      diceResultData.selected = false;
      this.reRollbuttonState =false;
    }
  }

  /** methode qui permet de relancer les dés selectionnés
  dé selectionné --> dans dataResult [{ seteted = true}]
  valeur selected changé par la methode selectDice()
   */
   reRoll(){
     this.dataResult.forEach(
       result => {if( result.selected == true ){
         //on reset la valeur de l'animation
         result.spinning = true;
         this.animationD = true;
         console.log("relancer tableau :",result)
         this.afficherResult(result);
         result.result = this.getRandomIntInclusive(result.type)
         console.log("current selected :", result)
       }}
     )
   }
   /** on remet à la valeur d'origine toutes les variables */
   dataReset(){
     this.nbDboard = Object.assign({}, emptynbDboard);
     console.log(this.nbDboard)
     this.dataResult =[];
     this.rollbuttonState = false;
     this.reRollbuttonState = false;
     this.resetbuttonState = false;
     this.addDicebuttonState =false;
     this.removeDicebuttonState =false;
     this.score =0;
     this.animationD =true;
   }







//derniere parenthese
}
