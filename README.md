# 🌔 NEXTJS NASA API PHOTOS

Next Project focused on connecting the NASA API with a NextJS APP to get photos of some Mars rovers (Curiosity, Opportunity and Spirit).

## Table of Contents

- [Technical decisions](#decisions)
- [Notes](#notes)
- [Installation](#installation--dev-server)
- [Prefecth data with SSG](#to-prefetching-data-with-ssg)
- [Preview](#preview)
- [API](#api)

## Technical decisions

This project is composed by:

- **Next.js** (to take advantage about SSR or SSG as needed) and 'Cause is a plus in challenge. 😄

- **Atomic Design** (focused on reusability and to compose big components by smaller ones).

- **Typescript** to enforce a code style based on types.

- **SWR** to client-side fetching and catching info.

- Some components were builded with **Compound components** design pattern to keep components structure, improve legibility and separate responsabilities.

- **HOC component** implemented just for wrapping the pages layout.

- Only **HTML5**, **CSS3**, and **TSX**, Yup, in this case It's absolutely unnecessary to implement the complexity of a preprocessor such as Sass or Less because It's a small project. 😼

- Fonts works as **Variable fonts** which is a new specification for avoid to having multiple files with different sizes, styles, and weight (A good option for performance, flexibility, and personalization).

- Rover's images were rendered with the help of a base64 version of itselves, there are an utility using **Plaiceholder**.

- **PNPM** as default package manager.

- API tested with **Jest**.

### 📝 NOTES: 
- Prefetching of rovers data with Static Site Generation and after that, the fetching continues with *SWR* from the client.
- I avoid using *Suspense API* because React recommends avoiding using it with libraries such as *Next.js* or *SWR*. [ Read more ](https://react.dev/blog/2022/03/29/react-v18#suspense-in-data-frameworks)
- React Memo and useCallback used for prevent unnecessary re-renders.


## Installation & dev server

```bash
    git clone git@github.com:devCas96/nasa-mars-photos.git && cd nasa-mars-photos
    pnpm install
    pnpm next dev
```
## To prefetching data with SSG

```bash
    pnpm build && pnpm next dev
```

## Preview

![](/public/images/preview-home-desktop.png)

-------------------------------------
![](/public/images/preview-rover-mobile.png)

## API

Swagger documentation: [ Swagger ](https://app.swaggerhub.com/apis/SEBASCAS96/api/1.0.0)
