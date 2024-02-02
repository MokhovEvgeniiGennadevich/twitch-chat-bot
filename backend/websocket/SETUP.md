# Basic setup

## Init NPM Project

```bash
npm init -y
```

## Install TypeScript Compiler

```bash
npm install --save-dev typescript
```

## Install TypesScript Types

```bash
npm install @types/node --save-dev
```

### Create `tsconfig.json` file

```bash
npx tsc --init --rootDir src --outDir dist \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

### Cold Reloading

```bash
npm install --save-dev ts-node nodemon
```

#### `nodemon.json` config

```js
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/index.ts"
}
```

## Rimraf for production builds

```bash
npm install --save-dev rimraf
```

## Scripts

```js
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"dev": "npx nodemon",
		"build": "rimraf ./dist && tsc",
		"start": "npm run build && node --env-file=.env dist/index.js"
	},
```

## Install `.gitignore`

```sh
npx gitignore node
```
