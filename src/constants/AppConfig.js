/**
 * App Config File
 */
const AppConfig = {
   appLogo: require('Assets/img/pdu-logo.png'),          // App Logo
   brandName: 'PDU',                                    // Brand Name
   navCollapsed: false,                                      // Sidebar collapse
   darkMode: false,                                          // Dark Mode
   boxLayout: false,                                         // Box Layout
   rtlLayout: false,                                         // RTL Layout
   miniSidebar: false,                                       // Mini Sidebar
   enableSidebarBackgroundImage: false,                      // Enable Sidebar Background Image
   sidebarImage: require('Assets/img/sidebar-1.jpg'),     // Select sidebar image
   isDarkSidenav: false,                                   // Set true to dark sidebar
   enableThemeOptions: false,       
   enableUserTour: process.env.NODE_ENV === 'production' ? false : false,  // Enable / Disable User Tour
   copyRightText: 'PDU ERP © 2020 All Rights Reserved.',      // Copy Right Text
   // light theme colors
   themeColors: {
      'primary': '#5D92F4',
      'secondary': '#677080',
      'success': '#00D014',
      'danger': '#FF3739',
      'warning': '#FFB70F',
      'info': '#00D0BD',
      'dark': '#464D69',
      'default': '#FAFAFA',
      'greyLighten': '#A5A7B2',
      'grey': '#677080',
      'white': '#FFFFFF',
      'purple': '#896BD6',
      'yellow': '#D46B08'
   },
   // dark theme colors
   darkThemeColors: {
      darkBgColor: '#424242'
   }
}

export default AppConfig;
