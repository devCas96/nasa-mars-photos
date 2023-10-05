# nasa-mars-photos

Next Project focused on connecting the NASA API with a NextJS APP to get photos of some Mars rovers (Curiosity, Opportunity and Spirit).

## Tabla de Contenidos

- [Technical decisions](#decisions)
- [Installation](#installation)
- [API](#api)

## Technical decisions

This project is composed by:

- **NextJs** (to take advantage about SSR or SSG as needed) and 'Cause is a plus in challenge. 😄

- **Atomic Design** (focused on reusability and to compose big components by smaller ones).

- **Typescript** to enforce a code style based on types.

- Only **HTML5**, **CSS3**, and **TSX**, Yup, in this case It's absolutely unnecessary to implement the complexity of a preprocessor such as Sass or Less because It's a small project. 😼

- Fonts works as **Variable fonts** which is a new specification for avoid to having multiple files with different sizes, styles, and weight (A good option for performance, flexibility, and personalization).

- **PNPM** as default package manager

## Installation & dev server

```bash
    git clone git@github.com:devCas96/nasa-mars-photos.git && cd nasa-mars-photos
    pnpm install
    pnpm next dev
```

## API
