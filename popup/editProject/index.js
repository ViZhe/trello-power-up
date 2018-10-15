
const t = TrelloPowerUp.iframe()

const project = t.arg('project')
const inputText = document.querySelector('#projectInputText')
const cards = document.querySelectorAll('.js-selectColor')

t.render(() => {
  t.sizeTo('#content')

  inputText.value = project.text
  cards.forEach((item) => {
    if (item.dataset.color === project.color) {
      item.classList.add('cardColor_selected')
    }

    item.addEventListener('click', (e) => {
      cards.forEach((item) => {
        item.classList.remove('cardColor_selected')
      })
      item.classList.add('cardColor_selected')
      document.querySelector('#projectInputColor').value = e.target.dataset.color
    })
  })
})

document.querySelector('#projectInputSave').addEventListener('click', async () => {
  const text = document.querySelector('#projectInputText').value
  const color = document.querySelector('#projectInputColor').value
  const projectList = await t.get('organization', 'shared', 'PROJECTS')

  delete projectList[project.text]

  await t.set('organization', 'shared', 'PROJECTS', {
    [text]: {
      text,
      color,
    },
    ...projectList,
  })

  t.closePopup()
})

document.querySelector('#projectInputDelete').addEventListener('click', async () => {
  const projectList = await t.get('organization', 'shared', 'PROJECTS')
  delete projectList[project.text]
  await t.set('organization', 'shared', 'PROJECTS', projectList)
  t.closePopup()
})
