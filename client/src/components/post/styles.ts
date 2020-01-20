export const postStyles: object = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },

  image: {
    minWidth: 200
  },

  content: {
    objectFit: 'cover',
    padding: 25
  }
}

export const deleteStyles: object = {
  deleteButton: {
    left: '90%',
    position: 'absolute',
    top: '10%'
  }
}

export const createStyles = (theme: any) => ({
  ...theme.spreadStyle,
  submitButton: {
    float: 'right',
    marginTop: 10,
    position: 'relative'
  },

  progressSpinner: {
    position: 'absolute'
  },

  closeButton: {
    left: '91%',
    position: 'absolute',
    top: '6%'
  }
})
