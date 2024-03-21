// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============

window.addEventListener("load", () => {
    let buttons = document.querySelectorAll("button");
    let numbers = document.querySelectorAll(".number");
    let key_operator = document.querySelectorAll(".key--operator")
    let AC = document.getElementById("AC");
    let dot = document.getElementById("dot");

    let ecran = document.querySelector(".calculator__display");

    let memory = [];
    let nb_en_cours = "";
    let sgn_nb_en_cours = 1;
    let equal_pressed = 0;
    let multiply_pressed = 0;
    let divide_pressed = 0;
    

    // Afficher sur l'écran noir
    for (let button of buttons){
        button.addEventListener("click",(event) => {
            const button = event.target;
            if(ecran.textContent == "0" || (equal_pressed==1 && button.className=="number")){
                ecran.textContent = button.textContent;
            }
            else{
                ecran.textContent += button.textContent;
            }
            equal_pressed = 0;
        });
    }


    // Effacer quand on appuie sur AC, afficher 0
    AC.addEventListener("click",(evenement) => {
        const bouton = evenement.target;
        ecran.textContent = "0";
        memory = [];
        nb_en_cours = "";
        sgn_nb_en_cours = 1;
        equal_pressed = 0;
        multiply_pressed = 0;
        divide_pressed = 0;
    });


    // Stocker en mémoire
    for (let nb of numbers){
        nb.addEventListener("click",(event) => {
            //const nombre = event.target;
            nb_en_cours += nb.textContent;
        })
    }
    dot.addEventListener("click",(event) => {
        nb_en_cours += dot.textContent;
    })


    // Opérations
    for(let operateur of key_operator){
        operateur.addEventListener("click",(event)=>{
            n = sgn_nb_en_cours * parseFloat(nb_en_cours);
            memory.push(n);
            nb_en_cours = "";
            sgn_nb_en_cours = 1;
            
            if(multiply_pressed == 1){
                n = memory.pop();
                memory[memory.length - 1] *= n;
                multiply_pressed = 0;
            }

            if(divide_pressed == 1){
                n = memory.pop();
                memory[memory.length - 1] /= n;
                divide_pressed = 0;
            }
            
        })
    }
    
    const minus = document.getElementById("moins");
    minus.addEventListener("click",(event) => {
        sgn_nb_en_cours = -1;
    })
    
    const multiply = document.getElementById("x");
    multiply.addEventListener("click",(event) => {
        multiply_pressed = 1;
    })

    const divide = document.getElementById("/");
    divide.addEventListener("click",(event) => {
        divide_pressed = 1;
    })
    


    // Egal et afficher un résultat
    let egal = document.querySelector(".key--equal");
    egal.addEventListener("click",(evenement) => {
        n = sgn_nb_en_cours * parseFloat(nb_en_cours);
        memory.push(n);

        if(multiply_pressed == 1){
            n = memory.pop()
            memory[memory.length - 1] *= n;
            multiply_pressed = 0
        }

        else if(divide_pressed == 1){
            n = memory.pop();
            memory[memory.length - 1] /= n;
            divide_pressed = 0;
        }
        
        for(let i=1 ; i<memory.length ; i++){
            memory[0] += memory[i];
        }
        ecran.textContent = memory[0].toString();
        
        sgn_nb_en_cours = 1;
        nb_en_cours = memory[0].toString();
        memory = [];
        equal_pressed = 1;
    })

    
    // Aide : affichage dans la console
    for (let bouton of buttons){
        bouton.addEventListener("click",(event) => {
            const bouton = event.target;
            console.log(bouton.textContent);
            console.log(memory);
            console.log(nb_en_cours);
            console.log("x : ", multiply_pressed)
        });
    }
    
})






