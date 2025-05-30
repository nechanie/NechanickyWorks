﻿# NechanickyWorks

A professional portfolio web application showcasing a collection of projects with interactive demos and live data experiences.

## Overview

The portfolio is a React-based front end built using [Vite](https://vitejs.dev/) for fast development and build processes. The user interface is crafted with [Material UI (MUI)](https://mui.com/) for theming, base components, and advanced data display components such as tables and graphs. The application integrates interactive demos that employ WebSockets for near realtime data transactions, providing live sessions with the backend.

The dynamic functionality—such as WebSocket and REST API communications—is powered by an external Python-based backend hosted separately.

## Features

- **Interactive Demos:** Each demo utilizes websockets to establish a live session with the Python backend, enabling near real-time data transactions. Users can view live graphs, progress bars, and other dynamic data visualizations.
- **Modern UI and Theming:** Implements Material UI (MUI) for core UI components, theming, and data displays. Additional MUI Lab components are used for advanced UI elements.
- **Project Integration:** Every project is refactored for integration into the app, creating a cohesive and educational exploration of your work.
- **Secure Deployment:** Sensitive information, such as API endpoints and backend server addresses, is securely compiled into the runtime environment using GitHub secrets.
- **Continuous Deployment:** GitHub Actions automatically build and deploy the application to an Azure Web App upon pushes to the master (and development) branch.
- **Environment Configuration:** Environment-specific variables are managed as `VITE_` prefixed variables (accessed via `import.meta.env.VITE_`) to maintain secure and dynamic runtime configurations.


## Project Structure

.\
├── public&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Public source files\
├── src&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# React front end source files\
├── .gitattributes\
├── .gitignore\
├── LICENSE.txt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# MIT License\
├── NechanickyWorks.sln&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Visual Studio solution file\
└── README.md\

- **External Python Backend:**  
  The interactive demos rely on an external Python-based backend that provides REST APIs and WebSocket services for live data communication.

## Setup & Deployment

### Local Development

#### Front End (React)
1. **Installation:**  
   Navigate to the root directory and install dependencies:
   
   ```bash
   npm install

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_API_ENDPOINT_HOST=your_api_endpoint_host  # Points to the backend server with required APIs

4. **Development Server:**
   Start the development server by running:
   
   ```bash
   npm run dev
   ```
   
   The app will run on the default Vite development server port.

### Continuous Deployment

**GitHub Actions:**
   The repository is configured with GitHub Actions workflows (see `.github/workflows`) that trigger on pushes to the master branch. These workflows perform the following steps:
   - Set up the .NET environment and build the application.
   - Publish the build output.
   - Deploy the application to Azure Web App.
   Environment variables such as `VITE_GOOGLE_MAPS_API_KEY` and `VITE_API_ENDPOINT_HOST` are securely passed via GitHub Secrets.

## Roadmap & Future Improvements

- **Project Integration:** Ongoing efforts to refactor and integrate more projects as interactive demos into the portfolio.

- **UI Enhancements:** Continued refinements to the user interface to better accommodate each project’s unique features.

- **Performance Optimization:** Improved page construction, component rendering, and testing frameworks to enhance overall performance and user experience.

- **Credits & Attribution:** Development of a dedicated method to include credits and attributions for projects that were produced in collaboration with others.

## License

This project is licensed under the MIT License (see LICENSE.txt).

## Credits

Project Design & Implementation:
   All interactive demos and portfolio pages are designed and implemented solely by myself.

Collaborations:
   When applicable, proper credit and attribution will be provided for projects originally produced with a team.

## Contact

For any questions, comments, or contributions, please feel free to open an issue or contact me directly.

