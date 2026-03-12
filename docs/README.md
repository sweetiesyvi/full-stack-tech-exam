>Starting with a given codebase (provided as a GitHub repository), 
>configure and develop a full stack infrastructure and app. 

## Requirements 
> for the sake of time, you may can approach these steps in the order you choose. 

### 1️⃣ access the codebase
- using the [stater code base repository]()
- bring the code into your own repository via `fork` `import` or `copy/paste`

### 2️⃣ configure your repository
- set up a GitHub Pages deployment pointing to `docs/`
- ? point readme to docs/ in ``
- 
### 3️⃣ modify the codebase
- take the steps to get the `Node.js` app working (suggest locally)
- an endpoint to serve front end html via a `public/` directory
- `public` is organized with no internal `scripts` or `styles` (use directories)
- an `input` to submit a user name
- a `dom` element to receive a response from the server
- upgrade the front end with `html` & `styles` to guide a user what is going on
- for the server `app.mjs` ensure the correct packages are installed, imported, & available
- environmental variables with a provided `mongodb` connection string (and a secret code, see code comment)
- endpoints (middlewares)
	- input an emoji for a given username (no front end required, see code comments)
	- serve a static `html` from `public/` (`get to slash`)
	- receive user input & return a response
- include in the `README` links to your production server `http://static.external.gcp.ip`

### 4️⃣ set up a `dev` server
- create a `dev` branch & a dev server
- include the link in your `README`

### 5️⃣ set up a `gcp` `compute engine` `vm instance`
- config = firewall `http` & `https`, `static external ip` & requisite `ssh` public keys (including the `student-key.pub`)
- `ssh` into the the vm `instance` 
- update the `OS` & install the needed packages
- initialize your repository (`git clone` in proper directory)
- set up your `nginx` `reverse-proxy`
- (test your app using a `node` cmd)
- run your app with a production-grade process manager 
###  6️⃣ set up `ci/cd` on the `main` branch
- ensure use of `Git Hub action` `env` `secrets` & `variables`
- test `ci/cd` with an `issue` & `pull request` 
	- ensure the two are linked
	- label both with a `milestone` = `full stack tech exam`
	- assign both to yourself 
- include described links on your `readme` to 
	- the `issue` `pull request` & successful `action`
- 
