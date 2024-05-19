# VIGILIO/EXPRESS - ASTROJS

<img src="./public/images/logo.png" width="150">
<img src="https://user-images.githubusercontent.com/709451/182802334-d9c42afe-f35d-4a7b-86ea-9985f73f20c3.png" width="150">
<img src="./public/images/astro.webp" width="150">
<br>
by Yonatan Vigilio Lavado
<br><br>

### install

1. Instalar paquetes npm

```bash
bun install
```

2. Correr cliente y servidor

```bash
bun dev
bun serve
```

3. Produccion

```bash
bun build:dev
bun build:serve
```

# GETTING STARTED

0. HOLA MUNDO

```tsx
// pages/index.astro
---
import  '../../css/index.css' //css
import '@vigilio/sweet/sweet.min.css' // others library
import Snow from './Snow' // components import

// props in astro TYPESCRIPT
interface WebLayoutProps {
  title: string;
  description: string;
}
const { title, description } = Astro.props as WebLayoutProps;
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
        <meta name="description" content={description}/>
		<title>Astro - {title}</title>
	</head>
	<body class="bg-[#2C2820]">
	    <h1>Hola mundo </h1>
	</body>
</html>
```

1. Layout

<!-- components/WebLayout.astro -->

```tsx
---
import  '../../css/index.css'
import '@vigilio/sweet/sweet.min.css'
import Snow from './Snow'


interface WebLayoutProps {
  title: string;
  description: string;
}
const { title, description } = Astro.props as WebLayoutProps;
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
        <meta name="description" content={description}/>
		<title>Astro - {title}</title>
	</head>
	<body class="bg-[#2C2820]">
        <header>this is a header</header>
		<slot/> //slot children
        <footer>this is a footer</footer>
	</body>
</html>

// usarlo
<WebLayout title="" description="">
	<h1>hola mundo</h1>
</WebLayout>
```

2. Components js in Astro
 <!-- https://docs.astro.build/es/guides/framework-components/ -->

```tsx
// client:load: Carga js  tenga tanta reactividad
<FormExample client:only/>

// client:load: Carga js que no tenga tanta reactividad
<FormExample client:load/>

// client:visible: cuando se vea el componente carga js - lazy
<FormExample client:visible/>

```

3. Router - Paginas Dinamicas - SSR
 <!-- https://docs.astro.build/es/guides/routing/ -->

```tsx
<div>
    <h1>LOGO</h1>
    <div>
        <a href="/">Inicio</a>
        <a href="/blog">Blog</a>
        <a href={`/pokemon/${4}`}>Pokemon </a> // dinamic
    </div>
</div>
```

```tsx
// <!-- pokemon/[id].astro -->
import type { GetStaticPathsResult } from "astro";
import WebLayout from '@/web/WebLayout.astro'
import {Image} from 'astro:assets'
// GETSTATICPATHS
interface PokemonsApi{
    count:number,
    results:({name:string,url:string})[]
}
interface PokemonApi{ name:string,image:string}
//!  crean paginas estaticas al build- son estaticas recomendado para webs que no cambian mucho
export async function getStaticPaths() :Promise<GetStaticPathsResult>{
	//  obtener toda las lista para leer, para crear la cantidad de paginas
   const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    const result :PokemonsApi= await response.json()

    const params :GetStaticPathsResult= await Promise.all( result.results.map(async (res)=>{
		// a cada uno de eso sacar información. para mostrar en el html
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${res.name}`)
        const result =await response.json()

        return {
            params:{
                id:res.name
            },
            props:{
                // buena practica, poner props que vas a usar para no tener muy pesado la web
                result:{
                    name:result.name,image:result.sprites.front_default
                } as PokemonApi

            }
        }
    }))
    return params ;
}
const {id}=Astro.params as {id:string}
const {result}=Astro.props as {result:PokemonApi}
---

<WebLayout title={result.name}>
    <h1>Pokemon {result.name}</h1>
	//Image , para tener img más optimizado
    <Image src={result.image} width={100} height={100} alt={result.name}>
</WebLayout>
```

<!-- SSR -->

```tsx
---
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
 const result :PokemonsApi= await response.json()
 const data = result.results
---
<div>
	{data.map((pokemon)=>(<span>{pokemon.name}</span>))}
</div>
```

4. Variables de Entorno
 <!-- https://docs.astro.build/es/guides/environment-variables/ -->

```bash
# corre en el servidor
NODE_ENV=
# corre en el cliente y  servidor
PUBLIC_URL=
```

```ts
const enviroments = {
    PUBLIC_URL: import.meta.env.PUBLIC_URL,
    NODE_ENV: import.meta.env.NODE_ENV,
};
export default enviroments;
```

5. COOKIES
   Astro js corre en el servidor. USAR JS-COOKIE no localstorage

```tsx
import cookie from "js-cookie";
// obtener
JSON.parse(cookie.get("users"));
// insertar
cookie.set("users", JSON.stringify(users.value));
```

6. MARKDOWN

```bash
bun add @astrojs/mdx
```

pages/blog.mdx

<!-- https://docs.astro.build/en/guides/markdown-content/ -->

```mdx
---
layout: ../../services/web/WebLayout.astro
title: Blog Principal
author: Himanshu
description: Find out what makes Astro awesome!
---

# Hi there!

This Markdown file creates a page at `your-domain.com/page-1/`

It probably isn't styled much, but Markdown does support:

-   **bold** and _italics._
-   lists
-   [links](https://astro.build)
-   and more!
```

7. Transition - SPA
 <!-- https://docs.astro.build/en/guides/view-transitions/ -->

 <!-- components/WebLayout.astro -->

```tsx
<head>
    <title>Astro</title>
    <ViewTransitions />
</head>
```

<!-- transiciones y animaciones -->

```tsx
<aside transition:animate="slide"></aside>
```

8. Fuentes
    <!-- public/fonts/Exo-thin.ttf -->
    <!-- css/index.css -->

```css
@font-face {
    font-family: Exo-Thin;
    src: url("/fonts/Exo-Thin.ttf");
    font-display: swap;
}
```

<!-- components/WebLayout.astro -->

```tsx
import "../../css/index.css";
```
