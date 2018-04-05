const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const makeCard = item => `
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${item.image}" alt="Thumbnail [100%x225]" />
      <div class="card-body">
        <p class="card-text" style="height: 80px">${item.bio}</p>
        <a class="btn btn-primary" href="/users/${item.slug}">${item.firstName}'s profile &raquo;</a>
      </div>
    </div>
  </div>`

const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName('form-control')
  for(el of elements) {
    data[el.name] = el.value
  }
  return data
}

const controllers = {

  '/': () =>
    // rendu de la page html index
    render(
    ``)
  ,

  '/pierre-papier-ciseau': () => {
    // rendu de la page playgame
    render(
    ``
  )
    const game = document.getElementById('game')
  },

  '/superheros': superHeros => {
    fetch('https://akabab.github.io/superhero-api/api/all.json')
    .then(res => res.json())
    .then(superHeros => console.log(superHeros))
  },

  '*': () => render('<h1>Not Found</h1>')
}


const route = pathname => {

}


(() => {

  ['/', '/pierre-papier-ciseau', '/superheros', '*'].forEach(
    path => page(path, controllers[path])
  )
  page()
  // route()

})()