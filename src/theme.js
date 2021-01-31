import { createMuiTheme } from '@material-ui/core';

const base = {
    typography: {   
        h6: {
          lineHeight: '24px',
        },
      },
};

var theme = createMuiTheme(base);

theme = {
    ...theme,
  
    overrides: {
        MuiOutlinedInput:{
            input:{
                padding:12,
                width:'100%'
            }
        },
        MuiButton:{
            containedPrimary: {
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#000',
                },
            },
        },
        MuiAlert:{
            standardSuccess: {
                color: 'rgb(83 111 82)',
                backgroundColor: 'rgb(171 247 171)',
                fontSize: '25px'
            },
            icon:{
                display:'none'
            }
        },
        MuiSelect:{
            select:{
                padding:10
            },
            icon:{
                fontSize:30,
                top:5
            }
        },
        MuiPaginationItem:{
            textPrimary:{
                '&$selected': {
                    backgroundColor: '#000'
                }
            }
        }
    },
  };
  
  export default theme;
