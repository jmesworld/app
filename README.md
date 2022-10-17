
### JMES Start Guide

  1. Clone this repo
  2. Install dependencies via 'yarn install or npm install'
  3. Launch app via 'yarn start or npm start' and choose the environment you wish to run the application in
  4. Open additional terminal and run 'npm run server' to launch mock server hosted at 'localhost:3000'
  5. Register username with the randomly created mnemonic 
      - be sure to save this mnemonic as it will be used to login
      - Your credentials will be saved in local storage and you will auto login upon page load
  6. Once logged in you are greeted with your profile view and then able to navigate between pages

### Current Tasks:
## 🧱 Production
  1. Mock internal and API communications - done 
      - RECOMMENDED: add additional error handling and validations
  2. Implement QR code generation and scanning page - pending
  3. Refactorization - pending
      - CONTINUED: abstractions and layout improvements
### Suggested
## 💻 UI/UX
  1. Implement prevent default react component behaviour
## 🌐 Deployment & Config
  1. Implement concurrent server and application deployment
## License

[MIT](https://choosealicense.com/licenses/mit/)