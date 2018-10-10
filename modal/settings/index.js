/* global TrelloPowerUp */

const t = TrelloPowerUp.iframe()

t.render(() => {
  console.log('ready render')
  t.getAll()
    .then((data) => {
      console.log(JSON.stringify(data, null, 2))
    })

  const projectSelector = document.getElementById('projectList')
  t.get('organization', 'shared', 'PROJECTS')
    .then((projectList) => {
      projectList.each((item) => {
        projectSelector.insertAdjacentHTML('afterend', `<option value="${item}">${item}</option>`)
      })
    })
})


document.getElementById('projectInputSave').addEventListener('click', () => {
  const projectInput = document.getElementById('projectInput')
  t.set('organization', 'shared', 'PROJECTS', projectInput.value)
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
