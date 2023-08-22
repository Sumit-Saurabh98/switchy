# Switchy

## Energy Distribution Graph (EnergyDistributionGraph.jsx)

The EnergyDistributionGraph component is a React component that displays energy distribution data using a line chart. It fetches data from an external API and allows users to select specific energy sources and a date for visualization. The chart is implemented using the react-chartjs-2 library along with various Chart.js components.

### Features

⚫ Fetches energy distribution data from an API. <br/>
⚫Allows users to select energy sources (Load, Solar, Grid).<br/>
⚫Allows users to select a specific date.<br/>
⚫Displays a responsive line chart representing the energy distribution over time.<br/>
⚫Randomly generates colors for each selected energy source.<br/>
⚫Provides loading indicators while fetching data.<br/>


## Energy Uses Graph (EnergyUsesGraph.jsx)
The EnergyUsesGraph component is a React component that displays energy consumption data using a bar chart. It also fetches data from an external API and provides options to toggle between different time intervals (Day, Week, Month) for visualization. The chart is implemented using the react-chartjs-2 library along with various Chart.js components.

### Features
⚫Fetches energy consumption data from an API.<br/>
⚫Allows users to toggle between different time intervals (Day, Week, Month).<br/>
⚫Displays a responsive bar chart representing energy consumption over time.<br/>
⚫Colors bars based on energy consumption levels.<br/>
⚫Provides loading indicators while fetching data.<br/>

## Header Component (Header.jsx)
The Header component is a reusable React component that represents the application's header bar. It includes the application logo, navigation menu, user profile avatar, and a theme toggle switch. The header is implemented using the @mui/material library (previously known as Material-UI).

Features
Displays the application logo and name.
Provides a navigation menu for smaller screens.
Displays user profile avatar and settings menu.
Includes a theme toggle switch for switching between Light and Dark modes.
Theme Toggle Context (ToggleTheme.jsx)
The ToggleTheme context and ToggleThemeProvider components are used to manage the application's theme. The context provides the current theme state and a function to toggle between themes. It allows components to access and control the application's theme.

### Features
⚫Provides the current theme state (Light/Dark mode).<br/>
⚫Provides a function to toggle between themes.
