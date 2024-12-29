# Pixel Sort — CC

![Pixel Sort CC Preview](https://res.cloudinary.com/tobiii/image/upload/v1735442994/pictures/dbog0riwuffvg0kekzpr.png)

A simple tool that allows you to create dynamic pixel sorting effects based on an image. Built with vanilla js, P5.js and Tweakpane.

## Features

- Interactive canvas with P5.js for image manipulation
- Image upload via file input or drag & drop
- Customizable pixel sorting effects:
  - Adjustable pixel position and speed
  - Image scaling and visibility toggle
- Export options:
  - Save as PNG
  - Save as animated GIF

## Tech Stack

- TypeScript
- P5.js for creative coding
- Tweakpane for GUI controls
- Vite for development and building

## Project Structure

- `src/main.ts` - Main entry point with P5.js sketch and controls setup
- `src/style.css` - Global styles and layout
- `src/lib/` - Utility functions and helpers
- `index.html` - Base HTML template
- `public/` - Static assets and images

## Local Development

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the development server
4. Open `http://localhost:5173` in your browser to view the project
5. Run `npm run build` to build for production
6. Run `npm run preview` to preview the production build in `http://localhost:4173`

## Usage

1. Load an image by either:
   - Clicking the "Pick an image" button
   - Dragging and dropping an image onto the canvas
2. Use the Tweakpane controls to adjust:
   - Pixel sorting position and speed
   - Image scale and visibility
   - Text overlay properties
3. Export your creation as a PNG or animated GIF



## Credits

This project was heavily inspired by [The Killing of a Sacred Deer](https://www.marvinschwaibold.com/projects/killing-of-a-sacred-deer/) Digital Campaign Poster Graphics by [Marvin Schwaibold](https://www.marvinschwaibold.com/) and [Watson DG](https://watson.la/).