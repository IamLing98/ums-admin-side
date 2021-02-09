/**
 * App Success Theme
 */
import { createMuiTheme } from '@material-ui/core/styles';
import AppConfig from '../../constants/AppConfig';

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
        primary: {
            main: AppConfig.themeColors.success
        },
        secondary: {
            main: AppConfig.themeColors.primary
        }
    }
});

export default theme;