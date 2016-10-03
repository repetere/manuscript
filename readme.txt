prerequsities
- globals
 - rnpm
 - react-web
- link vector icons
 - rnpm link react-native-vector-icons

to run:$ nvm exec 5 react-web start

 Unable to resolve module some-module from /Users/username/projectname/AwesomeProject/index.js: Invalid directory /Users/node_modules/some-module
Currently, the workarounds seem to be,

Delete the node_modules folder - rm -rf node_modules && npm install
Reset packager cache - rm -fr $TMPDIR/react-* or node_modules/react-native/packager/packager.sh --reset-cache
Clear watchman watches - watchman watch-del-all
Recreate the project from scratch