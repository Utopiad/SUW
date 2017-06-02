# SUW
A React-Native application using NFC to avoid using supermarkets consumer tickets

## Requirements:
As we're doing Native development, we need some tools to enable our phones to host the app directly during development.
For this, we need to :
1. [download and set ADB and Fastboot](http://www.teamandroid.com/2016/10/22/how-to-install-adb-fastboot-mac-osx/)
2. Then you'll need to [set up your own phone](https://facebook.github.io/react-native/docs/running-on-device.html) in order to enable the **developer** mode.

3. Finally, when you'll build the project on your Android phone, you'll need to [create a file](https://stackoverflow.com/a/32640154/4578919) in the **Android** folder to allow the system to find the SDK.
Please note that this file refers to one of your files, so it's ignored by Git.
