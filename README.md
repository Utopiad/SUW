# SUW
A React-Native application using NFC to avoid using supermarkets consumer tickets

Requirements :
- as we're doing Native development, we need tools to enable our phones to host the app directly during development.
For this, we need to first [download and set ADB and Fastboot] (http://www.teamandroid.com/2016/10/22/how-to-install-adb-fastboot-mac-osx/)  

Then you'll need to [set up your own phone] in order to enable the developer mode.(https://facebook.github.io/react-native/docs/running-on-device.html)

Finally, when you'll build the project on your Android phone, you'll need to [create a file](https://stackoverflow.com/a/32640154/4578919) to allow the system to find the SDK.
As this file is located in your personal files, it's ignored by Git.
