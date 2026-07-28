# Romantic Proposal Website

A polished proposal website built with HTML, CSS, and vanilla JavaScript. The design is luxury-inspired, responsive, and easy to update from a single content source.

## Project Structure

- `index.html` — main landing page and structure
- `css/style.css` — core styling, glassmorphism, typography, and layout
- `css/animations.css` — animations for reveal effects, sparkles, confetti, and motion
- `css/responsive.css` — responsive adjustments for mobile-first and desktop
- `js/main.js` — page initialization, content rendering, music control, and developer tools
- `js/animations.js` — animation helpers and celebration effects
- `js/counter.js` — relationship counter logic and live updates
- `js/proposal.js` — proposal acceptance flow and button interactions
- `data/content.js` — editable content text for every section
- `data/config.js` — colors, animation speed, music filename, test mode, and developer settings
- `assets/images/` — place `us.jpg` here for the final section image
- `assets/music/` — place your song file here and update `config.MUSIC_FILENAME`
- `assets/icons/` — use for custom icon assets if needed
- `assets/fonts/` — optional local fonts if you prefer not to use Google Fonts

## How to Edit Content

Open `data/content.js` and update the fields inside `contentData`:

- `opening.title` — hero title text
- `opening.subtitle` — hero subtitle text
- `opening.buttonText` — begin button label
- `story` — timeline chapters with `title` and `description`
- `thingsILove` — three glass card items with `title` and `description`
- `letter.paragraphs` — paragraphs displayed in the letter section
- `proposal` — proposal question, copy, and button labels
- `finalMessage.overlay` — overlay text for the final image section

## How to Change Colours

Colors and theme values are defined in `data/config.js` inside the `COLOURS` object.
You can also update CSS variables in `css/style.css` under the `:root` selector to change the palette directly.

## How to Replace the Image

Place your final section image at `assets/images/us.jpg`.
If the file name changes, update the `src` in `index.html` accordingly.

## How to Replace the Music

Add your song file to `assets/music/`.
Update `MUSIC_FILENAME` in `data/config.js` to match the new file name.
The play button will use the chosen audio source without autoplay.

## How to Enable TEST_MODE

Open `data/config.js` and set `TEST_MODE` to `true`.
When enabled, the counter will use the fake start date defined in `TEST_START_DATE`.
Set `TEST_MODE` to `false` to store and load the real start date from localStorage after clicking YES.

## Developer Tools

Press `CTRL + SHIFT + D` to reveal the hidden developer panel.
Available controls:

- Toggle Test Mode
- Reset Counter
- Skip To Proposal
- Preview Celebration
- Preview Counter

## How to Deploy to GitHub Pages

1. Commit your changes and push them to the repository.
2. In GitHub, open the repository settings.
3. Under **Pages**, choose the branch and root folder for deployment.
4. Save and wait for GitHub Pages to publish the site.

The site is static, so GitHub Pages works without any additional configuration.
