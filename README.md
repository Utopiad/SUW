# SUW
===
A React-Native application using Geolocation that warns you of bunch of people around you

## Requirements:
As we're doing Native development, we need some tools to enable our phones to host the app directly during development.
For this, we need to :
1. [Download and Android Studio](https://developer.android.com/studio/index.html)
2. Find the **Android API code** matched to your [version of your Android Device](https://source.android.com/source/build-numbers)
Exemple: For *Marshmallow*, it's *23*
3. Lunch Android studio
4. Click on `Configure > SDK Manager`
5. `npm install -g react-native-cli`
5. Install the right package related to your API code found above
6. [Download and set ADB and Fastboot](http://www.teamandroid.com/2016/10/22/how-to-install-adb-fastboot-mac-osx/)
Or install them with Android studio (SDK Build-tools, SDK Tools, HAXM)
7. Then you'll need to [set up your own phone](https://facebook.github.io/react-native/docs/running-on-device.html) in order to enable the **developer** mode.
8. Finally, when you'll 'npm install && react-native run-android' the project on your Android phone, you'll need to [create a file](https://stackoverflow.com/a/32640154/4578919) in the **Android** folder to allow the system to find the SDK.
*Please note that this file refers to one of your files, so it's ignored by Git.*
