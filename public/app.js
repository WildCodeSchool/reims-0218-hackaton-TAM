const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const controllers = {

  '/': () => render('<h1>Acceuil</h1>'),

  '/pierre-papier-ciseau': () => {
   // rendu de la page playgame
   render(
    `<div class="container-fluid">
        <div class="row justify-content-around">
            <div class="col-2" style="background-color: lightgray">
              <img src="http://via.placeholder.com/300x300" alt="#" class="img-fluid">
            </div>
            <div class="col-5 text-center" style="background-color: lightgray">
                <div id="resultat"></div>
                <button type="button" class="btn btn-primary btn-lg">Pierre</button>
                <button type="button" class="btn btn-primary btn-lg">Papier</button>
                <button type="button" class="btn btn-primary btn-lg">Ciseau</button>
            </div>
            <div class="col-2" style="background-color: lightgray">
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
