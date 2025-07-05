All fonts used for BrightTales are directly imported via Google Fonts in src/index.css. 

- Font families: "Fredoka One", "Baloo 2", "Comic Neue", Comic Sans, cursive, sans-serif.
- For headlines/buttons: Fredoka One or Baloo 2 preferred for round, bold look.
- For body/copy: Comic Neue for gentle playfulness and maximum readability.

Pastels and vibrant accent colors are defined in tailwind.config.js.

Animating elements (characters, navigation) should use only safe, visually pleasing bounce/pulse/wiggle effects – see tailwind.config.js for actual keyframes and extend here as needed.

Any custom SVG/Lottie assets used should be <120x120px, flat, simple shapes, and mapped via the relevant React component (see AnimatedCharacter).
