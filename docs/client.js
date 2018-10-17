
// const colors = [
//   'yellow', 'purple', 'blue', 'red', 'green',
//   'orange', 'black', 'sky', 'pink', 'lime'
// ]

// BOARD-BUTTONS - START
const storyPointsStats = t => (
  t.modal({
    title: 'Story Points Stats',
    accentColor: '#8E45AD',
    url: '/trello-power-up/modal/storyPointsStats/index.html',
    height: 400,
  })
)

const boardButtonCallback = t => (
  t.popup({
    title: 'Tools',
    items: [{
      text: 'Story Points Stats',
      callback: storyPointsStats,
    }],
  })
)
// BOARD-BUTTONS - END

// CARD-BADGES - START
const getColorByNum = (num) => {
  if (num <= 3) {
    return 'green'
  }
  if (num <= 13) {
    return 'yellow'
  }
  if (num <= 34) {
    return 'orange'
  }

  return 'red'
}

const storyPointsCallback = async t => (
  t.popup({
    title: 'Set Story Points',
    url: '/trello-power-up/popup/setStoryPoints/index.html',
  })
)

const getBadgeStoryPoints = async (t) => {
  const badgeStoryPoints = {
    title: 'Story points',
    text: 'Unestimated',
    icon: '/trello-power-up/media/story-points.svg',
    color: 'red',
    callback: storyPointsCallback,
  }

  const cardStoryPoints = await t.get('card', 'shared', 'storyPoints')
  if (cardStoryPoints) {
    badgeStoryPoints.text = cardStoryPoints
    badgeStoryPoints.color = getColorByNum(cardStoryPoints)
  }

  return badgeStoryPoints
}

const getBadges = async (t) => {
  const badgeStoryPoints = await getBadgeStoryPoints(t)

  return [
    badgeStoryPoints,
  ]
}
// CARD-BADGES - END

window.TrelloPowerUp.initialize({
  'board-buttons': () => (
    [{
      text: 'Tools',
      callback: boardButtonCallback,
    }]
  ),
  'card-badges': t => (
    getBadges(t)
  ),
  'card-detail-badges': t => (
    getBadges(t)
  ),
})
