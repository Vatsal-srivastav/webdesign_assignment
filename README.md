# Common Ground

Common Ground is a responsive event discovery website for finding local gatherings and registering for an event. It is built with HTML5, CSS3, and vanilla JavaScript.

**Live website:** (https://webdesignassignment-alpha.vercel.app/)

## Project overview

The home page introduces the event guide and highlights the next upcoming event. Visitors can browse event cards, search by title or related details, and filter by category. Selecting a card opens an event detail dialog with its schedule, venue, price, and registration form.

The registration form collects a name, email address, and phone number. JavaScript validates the entered values and displays field-level feedback; a successful registration receives an on-page confirmation. The site also includes a persistent light/dark theme preference and a countdown to the next upcoming event.

## Technologies and accessibility

The project uses semantic HTML, responsive CSS, and browser-native JavaScript APIs. The layout adapts to mobile, tablet, and desktop screens. Event cards and dialogs are keyboard accessible, focus states are visible, form errors are associated with their inputs, and motion is reduced when the visitor's operating system requests it.

## Registration data

This is a front-end demonstration. Successful registrations are saved in the current browser's Local Storage under `commonGroundRegistrations`

## Project files

- `index.html` contains the page structure, event discovery controls, and detail/registration dialog.
- `styles.css` contains the visual styles, responsive layouts, themes, and motion preferences.
- `script.js` contains the sample event data and interactive behavior.
- `README.md` describes the project and how to run it.

The event names, venues, and details are sample content. The site can be hosted as a static website from the repository root; no build step is required.
