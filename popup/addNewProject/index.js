
const t = TrelloPowerUp.iframe()

t.render(() => {
  t.sizeTo('#content')
})

const cards = document.querySelectorAll('.js-selectColor')

cards.forEach((item) => {
  item.addEventListener('click', (e) => {
    cards.forEach((item) => {
      item.classList.remove('cardColor_selected')
    })
    item.classList.add('cardColor_selected')
    document.querySelector('#projectInputColor').value = e.target.dataset.color
  })
})

document.querySelector('#projectInputCreate').addEventListener('click', async () => {
  const text = document.querySelector('#projectInputText').value
  const color = document.querySelector('#projectInputColor').value
  const projectList = await t.get('organization', 'shared', 'PROJECTS')

  await t.set('organization', 'shared', 'PROJECTS', {
    [text]: {
      text,
      color,
    },
    ...projectList,
  })

  t.closePopup()
})
