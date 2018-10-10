/* global TrelloPowerUp */

const t = TrelloPowerUp.iframe()
const projectSelector = document.getElementById('projectList')

t.render(() => {
  t.get('organization', 'shared', 'PROJECTS')
    .then((projectList) => {
      projectList.each((item) => {
        projectSelector.insertAdjacentHTML('afterend', `<option value="${item}">${item}</option>`)
      })
    })
  t.get('card', 'shared', 'project')
    .then((savedProject) => {
      if (savedProject && /[a-z]+/.test(savedProject)) {
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
))
