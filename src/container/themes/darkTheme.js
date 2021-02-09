/**
 * App Dark Theme
 */
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import AppConfig from '../../constants/AppConfig';

const { darkBgColor } = AppConfig.darkThemeColors;

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            "Roboto",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Arial",
            "sans-serif"
        ].join(","),
        useNextVariants: true,
        suppressDeprecationWarnings: true
    },
    palette: {
        type: 'dark',
        types: {
            dark: {
                background: {
                    paper: darkBgColor,
                    default: darkBgColor,
                    appBar: darkBgColor,
                    contentFrame: darkBgColor,
                    chip: darkBgColor,
                    avatar: darkBgColor,
                    tabs: darkBgColor
                }
            }
        },
        primary: {
            light: grey[400],
            main: grey[700],
            dark: grey[900],
            contrastText: '#fff'
        },
        secondary: {
            light: grey[700],
            main: grey[700],
            dark: grey[700],
            contrastText: '#fff'
        },
        background: {
            paper: darkBgColor,
            default: darkBgColor,
            appBar: darkBgColor,
            contentFrame: darkBgColor,
            chip: darkBgColor,
            avatar: darkBgColor,
            tabs: darkBgColor
        }
    },
    status: {
        danger: 'orange',
    },
    typography: {
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        }
    }
});

export default theme;
