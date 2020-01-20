export default {
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },

    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },

  spreadStyle: {
    form: {
      textAlign: 'center'
    },

    image: {
      margin: '20px auto 20px auto'
    },

    pageTitle: {
      margin: '10px auto 10px auto'
    },

    textField: {
      margin: '10px auto 10px auto'
    },

    button: {
      marginTop: 20,
      position: 'relative'
    },

    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },

    progress: {
      position: 'absolute'
    },

    invisibleSeparator: {
      border: 'none',
      margin: 4
    },

    visibleSeparator: {
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
      width: '100%'
    },

    paper: {
      padding: 20
    },

    profile: {
      '& .image-wrapper': {
        position: 'relative',
        textAlign: 'center',

        '& button': {
          left: '70%',
          position: 'absolute',
          top: '80%'
        }
      },

      '& .profile-image': {
        borderRadius: '50%',
        height: 200,
        maxWidth: '100%',
        objectFit: 'cover',
        width: 200
      },

      '& .profile-details': {
        textAlign: 'center',

        '& span, svg': {
          verticalAlign: 'middle'
        },

        '& a': {
          color: '#00bcd4'
        }
      },

      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },

      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },

    buttons: {
      textAlign: 'center',

      '& a': {
        margin: '20px 10px'
      }
    }
  }
}
