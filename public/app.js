const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const controllers = {

  '/': () => render(`
  <style>
    /* The animation code */
    @keyframes hero01 {
        0%   {left:60%; top:10%;}
        25%  {left:0%; top:10%;}
        50%  {left:20%; top:10%;}
        75%  {left:20%; top:10%;}
        100% {left:60%; top:10%;}
    }

    /* The animation code */
    @keyframes hero02 {
        0%   {right:60%; top:10%;}
        25%  {right:0%; top:10%;}
        50%  {right:20%; top:10%;}
        75%  {right:20%; top:10%;}
        100% {right:60%; top:10%;}
    }

    .hero01{
        position: absolute;
        height: 600px;
        top: -10%;
        right: -30%;
        animation-name: hero01;
        animation-duration: 6s;
    }

    .hero02{
        position: absolute;
        height: 600px;
        top: -10%;
        right: -70%;
        animation-name: hero02;
        animation-duration: 6s;
    }
    
  </style>
  <div class="container text-center">
  <img src="/images/wild_super_heros_fond.jpg" style="height:600px">
  <img class="hero01" src="/images/hero01.png">
  <img class="hero02" src="/images/hero04.png">
  <a href="/pierre-papier-ciseau" button type="button" class="btn btn-primary btn-lg mt-4 ">Start the game !</button></a>
</div>`),

  '/pierre-papier-ciseau': () => {
   // rendu de la page playgame
   render(
    `<div class="container-fluid">
        <div class="row justify-content-around">
            <div class="col-2 divleft" style="background-color: lightgray">
              <img src="http://via.placeholder.com/300x300" alt="#" class="img-fluid">
            </div>
            <div class="col-5 text-center" style="background-color: lightgray">
                <div id="resultat"></div>
                <button type="button" class="btn btn-primary btn-lg">Pierre</button>
                <button type="button" class="btn btn-primary btn-lg">Papier</button>
                <button type="button" class="btn btn-primary btn-lg">Ciseau</button>
            </div>
            <div class="col-2 divright" style="background-color: lightgray">
              <img src="http://via.placeholder.com/300x300" alt="#" class="img-fluid">
            </div>
        </div>
      </div>`
  )
  const buttons = document.querySelectorAll("button")

  for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", choix = () =>{
      const joueur = buttons[i].innerHTML
      const robot = buttons[Math.floor(Math.random() * buttons.length)].innerHTML
      let resultat = ""

      if(joueur === robot){
        resultat = "Egalité"
      } else if((joueur === "Pierre" && robot === "Ciseau") || (joueur === "Papier" && robot === "Pierre") || (joueur === "Ciseau" && robot === "Papier")) {
        resultat = "Gagné"
      }else{
        resultat = "Perdu"
      }
      //console.log(`${resultat}`)
      document.getElementById("resultat").innerHTML = `
    Joueur: ${joueur}</br>
    Robot: ${robot}</br>
    ${resultat}
    `
    })
  }
  },

  '*': () => render('<h1>Not Found</h1>')
}


// gére l'execution du routing coté client
const routing = () => {
  const routes = [
    '/',
    '/pierre-papier-ciseau',
    '*'
  ]
  routes.forEach(
    path => page(path, controllers[path])
  )
  page()
}

//appel cette fonction pour gérer les routes
routing()
