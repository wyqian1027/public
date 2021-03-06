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

function fitness(password, individual){
  var scores  = 0;
  for (var i=0; i<password.length; i++){
    if (password[i] === individual[i]){
        scores += 1;
    }
  }
  return scores;
}

    
function crossover(p1, p2){
  var ch = "";
  for (var i=0; i<p1.length; i++){
      if (Math.random()>0.5){
          ch += p1[i];
      } else {
          ch += p2[i];
      }
  }
  return ch;
}


//Getters
var pwdType = document.querySelectorAll(".pwd-type")
function getPwdType() {
    for (var i=0; i<2; i++){
        if (pwdType[i].checked == true){
            return pwdType[i].value;
        }
    }
}

var userPwd = document.querySelector("#pwd");
var maxGenInput = document.querySelector("#max-gen");
var popSizeInput = document.querySelector("#pop-size");
var muteRateInput = document.querySelector("#mutation-rate");



//Setters
var msg = document.querySelector("#msgBoard");
var msg2 = document.querySelector("#msgBoard2");

function showMsg(pwd, numGen, numMutation, numChildren, totalTime, found=true){
    if (found){
        msg.innerHTML = `<span style="color: purple;font-weight: bold;">The Password is found: </span>&nbsp;&nbsp; <span style="font-weight: bold; color:green">${pwd}</span><br> 
                        Found at Generation: &nbsp;<span style="font-weight: bold; color: red">${numGen-1}</span> &nbsp;&nbsp; 
                        Total Mutations: &nbsp;<span style="font-weight: bold; color: red">${numMutation}</span>&nbsp;&nbsp; 
                        Total Children: &nbsp;<span style="font-weight: bold; color: red">${numChildren}</span><br>
                        Elapsed Time: &nbsp;<span style="font-weight: bold; color: red">${totalTime/1000}</span> &nbsp;seconds.`;
    } else {
        msg.innerHTML = `<span style="color: purple;font-weight: bold;">The Password is NOT found...  Try again!</span><br> 
                        Total Mutations: &nbsp;<span style="font-weight: bold; color: red">${numMutation}</span>&nbsp;&nbsp; 
                        Total Children: &nbsp;<span style="font-weight: bold; color: red">${numChildren}</span><br>
                        Elapsed Time: &nbsp;<span style="font-weight: bold; color: red">${totalTime/1000}</span> &nbsp;seconds.`;
    }
}
function updateMsg(content){
    msg.innerHTML = content;
}


//THE CORRECT WAY OF DOING SETINTERVALS!!!!!!
function displayEachGen(fittest, maxGens, password){
    var i = 0;
    var curIntervalID = setInterval(function() { 	
      intervalIDs.push(curIntervalID);    //add to a list of IntervalIDs
    	if (i < (fittest.length)) {
      	  msg2.innerHTML = `Replaying Geneation ${i+1} fittest: ${pwdComparer(fittest[i], password)}`;
      } else {
          clearInterval(curIntervalID);   //clear currentID
      }
    	i++
    }, 2500/maxGens)
}
function pwdComparer(word, password){
   var out = ``;
   for (var i=0; i<password.length; i++){
     if (word[i] == password[i]){
       out += `<span style="color:green; font-weight:bold">${word[i]}</span>`;
     } else {
       out += `<span style="color:grey; font-weight:bold">${word[i]}</span>`;
     }
   }
   return out;
}

// var simulating = false;
var intervalIDs = [];
// var simulateBtn = document.querySelector("#simulate");
// simulateBtn.addEventListener("click", function(el){
//   simulating = true;
// })

function cleanBoards(){
    msg.innerHTML ="";
    msg2.innerHTML = "";
    for(var i = 0; i < intervalIDs.length; i++){
      clearInterval(intervalIDs[i]);   //clear all intervalIDs
    }
}

//MAIN FUNCTION
function passwordSolver(){
    
    // clear
    cleanBoards();

    //default
    var maxGens=maxGenInput.value;
    var popSize=popSizeInput.value; 
    var mutationRate=muteRateInput.value/100.0;
    // console.log(maxGens, popSize, mutationRate)
    var topRate = 0.22;
    var luckyRate = 0.03;
    var childrenNum = 8;
    var possible = (getPwdType() == "Lowercase" ? "abcdefghijklmnopqrstuvwxyz" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
    
    var pwd = document.querySelector("#pwd").value;
    var numGen = 1;
    var numChildren = 0;
    var numMutation = 0;
    var found = false;
    var pop;
    var fittest = [];
    

    function getRandomPwd(password, possible) {
      var text = "";
      var length = password.length;
    
      for (var i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    } 
    
    function getInitPop(password, popSize, possible){
      var pop = [];
      for (var i=0; i<popSize; i++){
          pop.push(getRandomPwd(password, possible));
      }
      return pop;
    }

    function getSortedPop(password, pop){
      return pop.sort(function(i1, i2){
          return fitness(password, i2)-fitness(password, i1);
      });
    }
    
    function getBreeders(password, curPop, topRate, luckyRate){
      var nextPop = [];
      var popSize = curPop.length;
      var sortedPop = getSortedPop(password, curPop);
      for (var i=0; i<Math.floor(popSize*topRate); i++){
        nextPop.push(sortedPop.shift());
      }
      for (var i=0; i<Math.floor(popSize*luckyRate); i++){
        nextPop.push(sortedPop[(Math.floor(Math.random() * sortedPop.length))]);
      }
      return shuffle(nextPop);
    }
    

    
    function getChildren(breeders, mutationRate, childrenNum, possible){
        var children = [];
        for (var i=1; i<breeders.length; i+=2){
            for (var j=0; j<childrenNum; j++){
                children.push(mutation(crossover(breeders[i-1], breeders[i]), mutationRate, possible)); 
                numChildren++;
            }
        }
        return shuffle(children);
    }
    
    function getNextPop(password, curPop, topRate, luckyRate, childrenNum, mutationRate, possible){
        return getChildren(getBreeders(password, curPop, topRate, luckyRate), mutationRate, childrenNum, possible);    
    }
    
    
    function mutation(ch, mutationRate, possible){
      var ch2 = "";
      for (var i=0; i<ch.length; i++){
          if (Math.random()<mutationRate){
              ch2 += possible.charAt(Math.floor(Math.random() * possible.length));
              numMutation++;
            //   return ch2;
          } else {
              ch2 += ch[i];
          }
      }
      return ch2;
    }    
    

    var start = new Date().getTime();
    // console.log("starting Genetic Solver...");
    // console.log("All possibles: "+possible);
    console.log("\n");
    while (found == false && numGen <= maxGens) {

        if (numGen == 1){
          pop = getInitPop(pwd, popSize, possible);
        }
        // console.log("\tChecking "+numGen+" Generation...");
        pop = getNextPop(pwd, pop, topRate, luckyRate, childrenNum, mutationRate, possible);
        var sortedPop = getSortedPop(pwd, pop);
        fittest.push(sortedPop[0]);
        if (sortedPop[0] == pwd){
            var totalTime = (new Date().getTime() - start);
            // console.log("\t\tFound your password! It is "+sortedPop[0]+".\n\t\tDone!\n");
            // console.log("Number of Mutation = " + numMutation);
            // console.log("Number of Children = " + numChildren);
            // console.log("Total Elapsed Time = " + totalTime + " miliseconds.");
            found = true;
        }
        numGen++;
        mutationRate -= mutationRate/maxGens;
    }
    
    var totalTime = (new Date().getTime() - start);
    // simulating = false;
    showMsg(sortedPop[0], numGen, numMutation, numChildren, totalTime, found);
    displayEachGen(fittest, maxGens, pwd);
    return false;
}


// passwordSolver();
updateMsg("Waiting for User Password...");