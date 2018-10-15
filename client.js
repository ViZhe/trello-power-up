
const colors = ['yellow', 'purple', 'blue', 'red', 'green', 'orange', 'black', 'sky', 'pink', 'lime']

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

const projectCallback = async (t) => {
  // context.closePopup()

  const projectList = await t.get('organization', 'shared', 'PROJECTS')
  Object.values(projectList).map(project => (
    project.callback = (t) => {
      t.set('card', 'shared', 'project', project)
      t.closePopup();
    }
  ))

  return t.popup({
    title: 'Select project',
    items: [
      ...Object.values(projectList),
      {
        alwaysVisible: true,
        text: '➕ Create new project',
        callback: (t) => (
          t.popup({
            title: 'Create new project',
            url: '/popup/addNewProject/index.html',
          })
        )
      },
      {
        alwaysVisible: true,
        text: '✏️ Edit project',
        callback: async (t) => {
          let projectList = await t.get('organization', 'shared', 'PROJECTS')
          Object.values(projectList).map(project => (
            project.callback = (context) => {
              context.popup({
                title: 'Edit project',
                url: '/popup/editProject/index.html',
                args: {
                  project
                },
              })
            }
          ))

          t.popup({
            title: 'Select project for edit',
            items: [
              ...Object.values(projectList),
            ],
            search: {
              count: 10,
              placeholder: 'Search projects',
              empty: 'No projects found',
            },
          })
        },
      },
    ],
    search: {
      count: 10,
      placeholder: 'Search projects',
      empty: 'No projects found',
    },
  })
}



const getBadges = async (t) => {
  const badges = [{
    title: 'Story points',
    text: 5,
    color: 'red',
    icon: 'https://image.flaticon.com/user_icons/535/535747/1539602043.svg',
  }]

  const projectList = await t.get('organization', 'shared', 'PROJECTS')
  const cardProject = await t.get('card', 'shared', 'project')

  if (!cardProject || !projectList[cardProject.text]) {
    badges.push({
      title: 'Project',
      text: 'No project',
      callback: projectCallback,
    })
  } else {
    badges.push({
      title: 'Project',
      text: projectList[cardProject.text].text,
      color: projectList[cardProject.text].color,
      callback: projectCallback,
    })
  }

  return badges
}


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
