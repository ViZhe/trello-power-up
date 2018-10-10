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
        callback: (context) => {
          context.get('card', 'shared', 'project')
            .then((data) => {
              console.log(1, data)
            })


          t.get('organization', 'shared', 'PROJECTS')
            .then((projectsList) => {
              context.popup({
                title: 'Select project',
                items: [
                  ...projectsList,
                  {
                    alwaysVisible: true,
                    text: 'Add new project',
                  },
                ],
                search: {
                  count: 10,
                  placeholder: 'Search pull requests',
                  empty: 'No pull requests found',
                },
              })
            })
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
