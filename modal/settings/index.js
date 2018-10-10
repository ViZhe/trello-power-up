/* global TrelloPowerUp */

const t = TrelloPowerUp.iframe()

console.log('ready render')
t.getAll()
  .then((data) => {
    console.log(JSON.stringify(data, null, 2))
  })

const projectSelector = document.getElementById('projectList')
t.get('organization', 'shared', 'PROJECTS')
  .then((projectList) => {
    Object.keys(projectList).forEach((item) => {
      projectSelector.innerHTML += `<li>${item}</li>`
    })
  })


document.getElementById('projectInputSave').addEventListener('click', () => {
  const projectInput = document.getElementById('projectInput')

  t.get('organization', 'shared', 'PROJECTS')
    .then((projectsList) => {
      t.set('organization', 'shared', 'PROJECTS', {
        [projectInput.value]: projectInput.value,
        ...projectsList,
      })
    })
})

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BODY') {
    t.closeOverlay().done()
  }
})

document.addEventListener('keyup', (e) => {
  if (e.keyCode === 27) {
    t.closeOverlay().done()
  }
})
