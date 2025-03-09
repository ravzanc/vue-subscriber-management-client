# Subscriber Management Client built with Vite + Vue 3 + TailwindCSS 4 (PoC)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Resource pages
* `/subscribers`
* `/fields`

### Demo video
Watch the demo screen recording [here](https://www.loom.com/share/6e944b45aa134e38a81dca3d7f568fb5?sid=29d031b6-a353-4dea-819a-8a5a0431d7d1)

### Further considerations
This tiny client is built for serving [Subscriber Management API](https://github.com/ravzanc/laravel-subscriber-management-api) project
#### Known edge cases that weren't handled:
* Limited interaction with data relationships
    * displaying field values without a field id and value template
    * submitting field values without a field id and value payload