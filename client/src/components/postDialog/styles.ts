export const dialogStyles = (theme: any) => ({
  ...theme.spreadStyle,
  profileImage: {
    borderRadius: '50%',
    height: 200,
    maxWidth: 200,
    objectFit: 'cover'
  },

  dialogContent: {
    padding: 20
  },

  closeButton: {
    left: '90%',
    position: 'absolute'
  },

  expandButton: {
    left: '90%',
    position: 'absolute'
  },

  spinnerDiv: {
    marginBottom: 50,
    marginTop: 50,
    textAlign: 'center'
  },

  title: {
    paddingTop: 20
  }
})

export const commentStyles = (theme: any) => ({
  ...theme.spreadStyle,
  container: {
    marginLeft: 40
  },

  commentImage: {
    borderRadius: '50%',
    height: 100,
    maxWidth: '100%',
    objectFit: 'cover'
  },

  commentData: {
    marginLeft: 20
  }
})
