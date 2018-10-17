
const t = TrelloPowerUp.iframe()

const cards = document.querySelectorAll('.js-selectStoryPoints')

t.render(async () => {
  t.sizeTo('#content')

  const storyPoints = await t.get('card', 'shared', 'storyPoints')

  cards.forEach((item) => {
    if (Number(item.dataset.num) === storyPoints) {
      item.classList.add('cardColor_selected')
      return
    }

    item.classList.add('cardColor_interactive')

    item.addEventListener('click', async (e) => {
      await t.set('card', 'shared', 'storyPoints', Number(e.target.dataset.num))

      t.closePopup()
    })
  })
})

document.querySelector('.js-removeStoryPoints').addEventListener('click', async () => {
  await t.remove('card', 'shared', 'storyPoints')

  t.closePopup()
})
