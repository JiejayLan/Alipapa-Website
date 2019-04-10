### Getting started
I. clone repo

II. setup local and remote branch 

III. using npm or yarn to install all dependencies on your machine 

IV. setup .env.development and .env.test by heading to console of firebase
1. create .env.development and .env.test at root of project folder
2. open console of firebase
3. click Mini-eByMazon and click </> 
4. setup key-value pair inside .env.development in following format

```
    FIREBASE_API=values copy from firebase without double quotes
    FIREBASE_AUTH_DOMAIN=values copy from firebase without double quotes
    FIREBASE_DATABASE_URL=values copy from firebase without double quotes
    FIREBASE_PROJECT_ID=values copy from firebase without double quotes
    FIREBASE_STORAGE_BUCKET=values copy from firebase without double quotes
    FIREBASE_MESSAGING_SENDER_ID=values copy from firebase without double quotes
```

5. click Mini-eByMazon Test and click </>
6. setup key-value pair inside .env.test in the same format in step 4 with values for Mini-eByMazon Test


### Suggested Tools
React Developer Tools and Redux DevTools installed for Google Chrome

### How to login
For login page, you dont't need to enter any username or password, because I set up a corrrect default username(jie lan) and password("hfh") in login-page react state.

### Suggestion for development
1. "npm run deve" for development //still can't set up the reload package to reload the page automatically
2. put component and pages into different folders
3. don't connet to firebase from client side.You should add a route controller on the server folder. You can take a look at how I write the login page

