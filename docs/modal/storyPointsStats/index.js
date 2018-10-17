
/* global Chart */

const t = TrelloPowerUp.iframe()
const {Promise, util: {colors}} = TrelloPowerUp

t.render(async () => {
  const pieConfig = {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Story Points',
        backgroundColor: colors.getHexString('orange', 500),
        data: [],
      }],
      labels: [],
    },
    options: {
      responsive: true,
      legend: false,
    },
  }

  const lists = await t.lists('all')
  await Promise.all(lists.map(async (list, index) => {
    let storyPoints = 0

    await Promise.all(list.cards.map(async (card) => {
      const num = await t.get(card.id, 'shared', 'storyPoints')
      storyPoints += num || 0
    }))

    pieConfig.data.datasets[0].data[index] = storyPoints
    pieConfig.data.labels[index] = list.name
  }))

  const ctx = document.querySelector('.js-pieChart').getContext('2d')
  // eslint-disable-next-line no-unused-vars
  const chart = new Chart(ctx, pieConfig)

  t.sizeTo('#content')
})
