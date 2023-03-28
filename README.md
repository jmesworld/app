
# JMES Mobile Wallet App 

BEFORE RUNNING: 
   - If using a Node.js version > 17.0.0, your `start` command in package.json must be `npx cross-env NODE_OPTIONS=--openssl-legacy-provider expo start --dev-client`(default)
   - Or if using Node.js < 17.0.0 it must be `expo start --dev-client`
   - Otherwise the application will not run due to incompatible dependecy versions between Node and Expo (working on a fix for this)

# Requirements 
   - Node.js version > 17.0.0
   - 
## Instructions

1. After configuring the start command for your environment, install dependencies with command

   ```bash
   $ yarn or npm install
   ```

2. Then to launch the application run 

   ```bash
    $ yarn start or npm run start
    ``` 
   
3. Then, in your console, choose the the platform you wish to launch the application [web|android|ios]

4. Enjoy!
## License

[MIT](https://choosealicense.com/licenses/mit/)

