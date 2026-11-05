# Common Ground

A responsive event discovery and registration website built with HTML5, CSS3, and vanilla JavaScript.

## Run the project

Open `index.html` directly in a modern browser. There is no build step, package installation, or framework requirement. An internet connection is needed for the hosted Unsplash images and Google Fonts; the rest of the site is static.

## Requirements coverage

- **Homepage and event cards:** A hero introduces the guide; each event shows its image, name, category, date, time, venue, price, and short description.
- **Browse and discover:** Search matches event names, categories, venues, descriptions, and keywords. Category buttons can be combined with search, and an empty state offers a reset.
- **Event details and registration:** Selecting a card opens a native dialog with full event information and a registration form for name, email, and phone.
- **JavaScript validation:** Name length, email shape, and phone characters/digit count are checked. Field errors are announced and linked to their inputs; valid registration shows an in-page confirmation.
- **Registration data:** Successful demo registrations are stored in browser Local Storage under `commonGroundRegistrations`. The site does not send data to a server, so this is not production ticketing or a real reservation system.
- **Responsive and accessible UI:** CSS breakpoints adapt the layout for mobile, tablet, and desktop. Cards and dialogs support keyboard use; reduced-motion preferences and visible focus indicators are included.
- **Bonus features:** Light/dark theme preference is stored locally, and a countdown updates to the next future event.

## Project files

- `index.html` contains the semantic page structure, navigation, search/filter controls, and event/registration dialog.
- `styles.css` defines design tokens, desktop and mobile layouts, theme variants, transitions, and reduced-motion behavior.
- `script.js` owns the event catalog, card rendering, search and filtering, validation, theme preference, countdown, and browser storage.

## Customize the event list

Edit the `events` array near the top of `script.js`. Keep each `id` unique. Set `startsAt` as a local date/time in `YYYY-MM-DDTHH:mm:ss` format; the card date, detail date, and countdown are all derived from this value. Use one of the existing category keys (`culture`, `food`, `music`, or `wellbeing`) so the filter works. Update the image `alt` text whenever an image changes.

The sample events and venues are fictional. Replace them with accurate event details before presenting or publishing the project.

## Check before submission

1. Search for an event by title, venue, and a keyword; combine search with each category filter.
2. Search for a term with no matches, then use the reset control.
3. Open an event and submit empty, malformed, and valid form values. Confirm that errors are shown and a valid registration reaches the confirmation state.
4. Confirm the registration is in browser developer tools under Application/Storage > Local Storage > `commonGroundRegistrations`.
5. Toggle the theme, reload, and confirm the preference remains. Resize to mobile and tablet widths and check navigation, filters, cards, and the dialog.

## Deploy

The repository root is the publish directory; no build command is needed.

- **GitHub Pages:** Push the files to GitHub, then choose the repository's `main` branch and `/ (root)` as the Pages source in Settings > Pages.
- **Netlify:** Import the GitHub repository or deploy the project folder. Leave the build command empty and set the publish directory to `.`.
- **Vercel:** Import the repository and use the “Other” framework preset with no build command; deploy the repository root.

After deployment, test the published URL on a phone-sized viewport and complete one registration. Include both the GitHub repository URL and deployed URL in the assignment submission.
