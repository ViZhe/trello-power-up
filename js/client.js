const SettingsCallback = t => (
  t.modal({
    url: './board-bar.html',
    height: 400,
  })
    .then(() => (
      t.closePopup()
    ))
)

const boardButtonCallback = t => (
  t.popup({
    title: 'Tools',
    items: [{
      text: 'Settings',
      callback: SettingsCallback,
    }],
  })
)

const getBadges = t => (
  t.card('name')
    .get('name')
    .then((cardName) => {
      console.log(`We just loaded the card name for fun: ${cardName}`)

      return [{
        title: 'Project',
        text: 'Static',
        color: null,
        callback: context => (
          context.popup({
            title: 'Select project',
            url: './popup/select-project.html',
            height: 184,
          })
        ),
      }]
    })
)


window.TrelloPowerUp.initialize({
  'board-buttons': () => (
    [{
      text: 'Tools',
      callback: boardButtonCallback,
    }]
  ),
  'show-settings': t => (
    t.popup({
      title: 'Custom Fields Settings',
      url: './settings.html',
      height: 184,
    })
  ),
  'card-badges': t => (
    getBadges(t)
  ),
  'card-detail-badges': t => (
    getBadges(t)
  ),
})
