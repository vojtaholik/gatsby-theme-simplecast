import config from '../lib/config';

export default {
  useCustomProperties: true,
  breakpoints: ['992px', '1200px', '1920px'],
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128, 256, 512],
  sizes: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128, 256, 512],
  fontSizes: [12, 14, 16, 18, 20, 22, 24, 32, 40, 48, 64],
  colors: {
    text: 'rgba(255, 255, 255, 0.9)',
    background: '#1A2232',
    backgroundLighten10: '#232B3B',
    backgroundLighten20: '#2C3648',
    primaryDarken: '#7A5EFF',
    primary: '#A085FF',
    primaryLighten10: '#9D82FF',
    primaryLighten50: '#B298FF',
    primaryLighten70: '#D2C8FF',
    secondary: '#85FFD0',
  },
  radii: [5, '50%'],
  fontWeights: {
    body: 300,
    heading: 500,
  },
  lineHeights: {
    body: 1.675,
    heading: 1.125,
  },
  letterSpacings: {
    heading: '1.5',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
  },
  nav: {
    logo: {
      flexDirection: 'column',
      justifyContent: 'center',
      a: { textDecoration: 'none' },
      container: {
        p: 3,
        display: ['flex', 'none'],
        visibility: ['visible', 'hidden'],
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
  },
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: config.headerImageHeight,
    color: 'text',
    h1: { fontSize: [6, 8], textShadow: '0 2px 5px rgba(0,0,0,0.2)' },
    'h1, h5': { m: 0 },
    h5: { mt: 1, fontSize: 1, opacity: 0.6 },
    '.header_content': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      // pb: [5, 8],
      px: [5, 8],
      zIndex: 1,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      button: {
        width: '100%',
        maxWidth: 7,
        height: 7,
        background: 'transparent',
        border: '1px solid',
        borderColor: 'text',
        color: 'text',
        fontSize: '10px',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        mr: 3,
        mt: 2,
        svg: {
          mt: '1px',
          ml: '2px',
        },
      },
    },
  },
  styles: {
    color: 'primary',
    root: {
      '.episodes_list': {
        backgroundColor: 'background',
        position: ['absolute', 'static'],
        zIndex: 2,
        width: '100%',
        maxWidth: [375, 300],
        px: 5,
        pt: 40,
        a: {
          textDecoration: 'none',
          color: 'text',
          fontSize: 3,
          fontWeight: 'heading',
        },
        li: {
          py: 0,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          '.summary': {
            fontSize: 2,
            lineHeight: 1.4,
            fontWeight: 300,
            opacity: 0.7,
            mt: 3,
          },
          '.active': {
            borderLeft: '3px solid',
            borderColor: 'primary',
            backgroundColor: 'backgroundLighten10',
          },
          a: {
            px: 5,
            py: 4,
            borderLeft: '3px solid',
            borderColor: 'background',
            fontSize: 4,
            width: '100%',
          },
          ':hover': {
            a: { borderColor: 'backgroundLighten10' },
            '.active': {
              borderColor: 'primary',
            },
            button: {
              opacity: 1,
              ':hover': {
                opacity: 1,
              },
            },
          },
          h4: {
            mb: 0,
          },
          button: {
            position: 'absolute',
            opacity: 0,
            ml: -3,
            backgroundColor: 'background',
            border: '1px solid',
            borderColor: 'text',
            color: 'text',
            display: 'flex',
            width: '100%',
            maxWidth: '24px',
            height: '24px',
            flexGrow: '1',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            svg: { mt: '1px', ml: '1px' },
            cursor: 'pointer',
          },
        },
      },
      '[data-reach-skip-link]': {
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        width: '1px',
        margin: '-1px',
        padding: '0',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: '999',
      },
      '[data-reach-skip-link]:focus': {
        padding: '1rem',
        position: 'fixed',
        top: '10px',
        left: '10px',
        backgroundColor: 'background',
        width: 'auto',
        height: 'auto',
        clip: 'auto',
      },
      backgroundColor: 'background',
      lineHeight: 'body',
      fontFamily: 'body',
      fontSize: [2, 3],
      color: 'text',
      bg: 'background',
      a: {
        color: 'primaryLighten50',
      },
      'a:hover': {
        color: 'primaryLighten70',
      },
      article: {
        p: [5, 8],
        pb: [2, 14],
        borderLeft: '2px solid',
        borderRight: '2px solid',
        borderColor: 'backgroundLighten10',
      },
      '.sidebar': {
        display: 'flex',
        flexDirection: 'column',
        p: [5, 8],
        pb: [13, 8],
        width: '100%',
        maxWidth: ['100%', 250],
        fontSize: '15px',
        h5: { my: 4, fontSize: 3 },
        'h5:not(:first-of-type)': { mb: 10, mt: 0 },
        '.guest': {
          fontSize: 1,
          textTransform: 'uppercase',
          opacity: 0.8,
          fontWeight: 'body',
        },

        li: {
          mb: 2,
          display: 'flex',
          a: { color: 'text' },
          svg: {
            mt: 1,
            mr: 1,
            width: '100%',
            maxWidth: 3,
            color: 'text',
            opacity: 0.5,
          },
        },
      },
      hr: {
        backgroundColor: 'backgroundLighten10',
        height: '2px',
      },
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      ':hover': {
        color: 'secondary',
        textDecoration: 'underline',
      },
    },
  },
};
