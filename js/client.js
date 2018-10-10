const SettingsCallback = t => (
  t.modal({
    url: './modal/settings/index.html',
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
  t.card('all')
    .then((card) => {
      console.log(`We just loaded the card name for fun: ${card.name}`, card)

      return [{
        title: 'Project',
        text: 'Project Field',
        color: 'red',
        items: [{
          text: '#135 attempt to fix trello/api-docs#134',
        }, {
          text: '#133 Removing duplicate `status` property',
        }, {
          text: '#131 Update New Action Default',
        }, {
          alwaysVisible: true,
          text: 'Add new project',
        }],
        search: {
          count: 10,
          placeholder: 'Search pull requests',
          empty: 'No pull requests found',
        },
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
