import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#000'
        }
    },
    typography: {
        fontFamily: [
            'Quicksand', 'sans-serif'
        ].join(','),
    }
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        //minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'center',
    }
}));

export default function Home() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="static" color='secondary'>
                    <Toolbar className={classes.toolbar} variant='dense'>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Block.one Assessment
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className='container-fluid'>
                    <App />
                </div>
            </div>
        </ThemeProvider>
    );
}

ReactDOM.render(<Home />, document.getElementById('root'));

