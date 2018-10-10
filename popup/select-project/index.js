/* global TrelloPowerUp */

const t = TrelloPowerUp.iframe()
const projectSelector = document.getElementById('projectList')

t.render(() => {
  t.get('organization', 'shared', 'PROJECTS')
    .then((projectList) => {
      Object.keys(projectList).forEach((item) => {
        projectSelector.innerHTML += `<option value="${item}">${item}</option>`
      })
    })
  t.get('card', 'shared', 'project')
    .then((savedProject) => {
      if (savedProject) {
        projectSelector.value = savedProject
      }
      t.sizeTo('#content')
        .done()
    })
})

document.getElementById('save').addEventListener('click', () => (
  t.set('card', 'shared', 'project', projectSelector.value)
    .then(() => {
      t.closePopup()
    })
    .get('card', 'shared', 'project')
    .then((data) => {
      console.log(data)
    })
))
