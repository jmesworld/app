
# JMES Mobile App 

## Instructions

1. Install dependencies

   ```bash
   $ yarn
   ```

2. Get latest version of Jmes

   ```bash
    $ yarn add jmes (may have to run 'npm install jmes' if yarn add doesnt work)
    ```

3. CD into node_modules/jmes - Install and Build library with
 
   ```bash
    $ yarn && yarn build
    ```

4. CD back into app directory and launch app via

   ```bash
    $ yarn start
    ``` 

   - Note: if you are using a Node.js version > 17.0.0 you need to add `npx cross-env NODE_OPTIONS=--openssl-legacy-provider` before `expo-start` in package.json as there is a breaking dependency between expo-cli & Node.js.
   
5. In your console, choose the platform you wish to launch the application [web|android|ios]

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Note

1) An error after installing dependencies is normal due to the postinstall script and does not mean dependencies were not installed.
