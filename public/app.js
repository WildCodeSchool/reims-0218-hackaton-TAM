const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const controllers = {

  '/': () => render("<h2>Acceuil</h2>"),

  '/pierre-papier-ciseau': () => {
   // rendu de la page playgame
   fetch('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(resp => {
      return resp.json()
      })
      .then(all => {
      const p1 = all[393]
      const p2 = all[Math.floor(Math.random() * (0, 500))]
      
    
   render(
    `<div class="container-fluid">
        <div class="row justify-content-around">
            <div class="col-2" style="background-color: lightgray">
              <img src="${p1.images.lg}" alt="#" class="img-fluid">
              <h2>Pv:<input type="button" class="" id="statP1" height="5"/></h2>
            </div>
            <div class="col-5 text-center" style="background-color: lightgray">
                
                <div id="resultat"></div>
                <button type="button" class="btn btn-primary btn-lg">Pierre</button>
                <button type="button" class="btn btn-primary btn-lg">Papier</button>
                <button type="button" class="btn btn-primary btn-lg">Ciseau</button>
            </div>
            <div class="col-2" style="background-color: lightgray">
              <img src="${p2.images.lg}" alt="#" class="img-fluid">
              <h2>Pv:<input type="button" class="" id="statP2" height="5"/></h2>
            </div>
        </div>
      </div>`
  )
  const buttons = document.querySelectorAll("button")
      let p1_pv = 100
      const p1_pvMax = 100
      let p2_pv = 100
      const p2_pvMax = 100
  for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", choix = () =>{
      const choix_p1 = buttons[i].innerHTML
      const choix_p2 = buttons[Math.floor(Math.random() * buttons.length)].innerHTML
      const statP1 = document.getElementById("statP1")
      const statP2 = document.getElementById("statP2")
      let resultat = ""
    if ((p1_pv > 0) && (p2_pv > 0)){
      if(choix_p1 === choix_p2){
        p1_pv-= p2.powerstats.strength/2
        p2_pv-= (p1.powerstats.strength/2)* 10
        resultat = "Egalité"
      } else if((choix_p1 === "Pierre" && choix_p2 === "Ciseau") || (choix_p1 === "Papier" && choix_p2 === "Pierre") || (choix_p1 === "Ciseau" && choix_p2 === "Papier")) {
        p2_pv-= p1.powerstats.strength * 10
        resultat = "Gagné"
      }else{
        p1_pv-= p2.powerstats.strength/4
        resultat = "Perdu"
      }
      statP1.innerHTML = statP1.value = p1_pv;
      statP2.innerHTML = statP2.value = p2_pv;
      document.getElementById("resultat").innerHTML = `
    Joueur: ${choix_p1}
    Robot: ${choix_p2}
    ${resultat}
    `
    }else{
      document.getElementById("resultat").innerHTML = "FINNNNNNNNNNNNNNNNNN !!!!!!!!!!!!!!!"
    }
    })
  }})
  },

  '/rpg': () => {
    fetch('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(resp => {
      return resp.json()
      })
      .then(all => {
      const choix_p1 = all[393]
      const ennemi = all[525]
      
    })
  },

  '*': () => render('<h1>Not Found</h1>')
}


// gére l'execution du routing coté client
const routing = () => {
  const routes = [
    '/',
    '/pierre-papier-ciseau',
    '/rpg',
    '*'
  ]
  routes.forEach(
    path => page(path, controllers[path])
  )
  page()
}

//appel cette fonction pour gérer les routes
routing()