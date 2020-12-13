const get = async (URI) => {
  const response = await fetch(URI)
  const data = await response.json()
  return data
}

const post = async (URI, body) => {
  const response = await fetch(URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await response.json()
  return data
}

const $ = (queryString) => {
  return document.querySelector(queryString)
}

const generateCardHtml = ({ picture, name, height, weight, strength, agility, fighting_skill, intelligence, power, technology }, classList) => (
  `
         <div class="flip-card-inner">
           <div class="flip-card-front">
           </div>
           <div class="flip-card-back">
           <img src="${picture}"class="card-img-top" alt="...">
             <div class="card-title">
             <div class="title-name">${name}</div>
             <div class="title-height">${"Height: " + height}</div>
             <div class="title-weight">${"Weight: " + weight}</div>
             </div>
             <div class="card-stats">
             <div class="card-stat">STR: ${strength}</div>
             <div class="card-stat">AG: ${agility}</div>
             <div class="card-stat">FGT: ${fighting_skill}</div>
             <div class="card-stat">ITL: ${intelligence}</div>
             <div class="card-stat">PWR: ${power}</div>
             <div class="card-stat">TEC: ${technology}</div>
             </div>
           </div>
         </div>
`
)



