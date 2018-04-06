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
              <h2>Pv: <span id="statP1"></span></h2>
            </div>
            <div class="col-5 text-center" style="background-color: lightgray">
                
                <div id="resultat" style="font-size: 30px"></div>
                <button type="button" class="btn btn-primary btn-lg mt-5 mr-3">Pierre</button>
                <button type="button" class="btn btn-primary btn-lg mt-5 mr-3">Papier</button>
                <button type="button" class="btn btn-primary btn-lg mt-5 mr-3">Ciseau</button>
                <div id="gagnant" class="mt-5" style="font-size: 40px"></div>
            </div>
            <div class="col-2" style="background-color: lightgray">
              <img src="${p2.images.lg}" alt="#" class="img-fluid">
              <h2>Pv: <span id="statP2"></span></h2>
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
        p2_pv-= p1.powerstats.strength * 2
        resultat = "Gagné"
      }else{
        p1_pv-= p2.powerstats.strength/4
        resultat = "Perdu"
      }
      statP1.innerHTML = statP1.value = p1_pv;
      statP2.innerHTML = statP2.value = p2_pv;
      document.getElementById("resultat").innerHTML = `
      ${p1.name}: ${choix_p1} VS
      ${p2.name}: ${choix_p2}
    
    `
    }else{
      const modal = `<!-- Large modal -->
      <button type="button" class="btn btn-primary .d-none" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>
      
      <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            ...
          </div>
        </div>
      </div>`
      if(statP1.value > statP2.value) {
        document.getElementById("gagnant").innerHTML = `<strong>Partie terminée</strong> <br>
         Le joueur ${p1.name} a gagné`
      } else {
        document.getElementById("gagnant").innerHTML = `<strong>Partie terminée</strong> <br>
        Le joueur ${p2.name} a gagné`
      }
    }
    })
  }})
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