package com.nativemodulesreactnativev0.brightness

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class BrightnessModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BrightnessModule"
    }

    @ReactMethod
    fun setBrightnessLevel(brightnessLevel: Float) {
        val activity = currentActivity ?: return
        activity.runOnUiThread {
            val layoutParams = activity.window.attributes
            layoutParams.screenBrightness = brightnessLevel
            activity.window.setAttributes(layoutParams)
        }
    }

    @ReactMethod
    fun getBrightnessLevel(promise: Promise) {
        val lp = currentActivity!!.window.attributes
        promise.resolve(lp.screenBrightness)
    }
}