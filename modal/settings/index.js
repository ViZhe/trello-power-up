/* global TrelloPowerUp */

const t = TrelloPowerUp.iframe()


t.render(() => {
  console.log('ready render')
})


document.getElementById('projectInputSave').addEventListener('click', () => {
  const projectInput = document.getElementById('projectInput')
  t.set('organization', 'shared', 'PROJECTS', projectInput.value)
    .then(() => {
      t.closePopup()
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
