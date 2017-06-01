cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-apiai.Q",
        "file": "plugins/cordova-plugin-apiai/www/lib/q.js",
        "pluginId": "cordova-plugin-apiai",
        "runs": true
    },
    {
        "id": "cordova-plugin-apiai.ApiAIPlugin",
        "file": "plugins/cordova-plugin-apiai/www/ApiAIPlugin.js",
        "pluginId": "cordova-plugin-apiai",
        "clobbers": [
            "window.ApiAIPlugin"
        ]
    },
    {
        "id": "cordova-plugin-apiai.ApiAIPromises",
        "file": "plugins/cordova-plugin-apiai/www/ApiAIPromises.js",
        "pluginId": "cordova-plugin-apiai",
        "clobbers": [
            "window.ApiAIPromises"
        ]
    },
    {
        "id": "cordova-plugin-camera-preview.CameraPreview",
        "file": "plugins/cordova-plugin-camera-preview/www/CameraPreview.js",
        "pluginId": "cordova-plugin-camera-preview",
        "clobbers": [
            "CameraPreview"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-fullscreen.AndroidFullScreen",
        "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
        "pluginId": "cordova-plugin-fullscreen",
        "clobbers": [
            "AndroidFullScreen"
        ]
    },
    {
        "id": "cordova-plugin-nativeaudio.nativeaudio",
        "file": "plugins/cordova-plugin-nativeaudio/www/nativeaudio.js",
        "pluginId": "cordova-plugin-nativeaudio",
        "clobbers": [
            "window.plugins.NativeAudio"
        ]
    },
    {
        "id": "cordova-plugin-speechrecognition.SpeechRecognition",
        "file": "plugins/cordova-plugin-speechrecognition/www/speechRecognition.js",
        "pluginId": "cordova-plugin-speechrecognition",
        "merges": [
            "window.plugins.speechRecognition"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-tts.tts",
        "file": "plugins/cordova-plugin-tts/www/tts.js",
        "pluginId": "cordova-plugin-tts",
        "clobbers": [
            "TTS"
        ]
    },
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-apiai": "1.7.4",
    "cordova-plugin-camera-preview": "0.9.0",
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-fullscreen": "1.1.0",
    "cordova-plugin-nativeaudio": "3.0.9",
    "cordova-plugin-speechrecognition": "1.1.2",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-statusbar": "2.2.3",
    "cordova-plugin-tts": "0.2.3",
    "cordova-plugin-vibration": "2.1.5",
    "cordova-plugin-whitelist": "1.3.2",
    "ionic-plugin-keyboard": "2.2.1"
};
// BOTTOM OF METADATA
});