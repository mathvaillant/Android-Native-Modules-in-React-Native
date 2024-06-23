package com.nativemodulesreactnativev0.keyevent

import android.view.KeyEvent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule


@ReactModule(name = KeyEventModule.NAME)
class KeyEventModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return NAME
    }

    private fun onKeyDownEvent(keyEvent: KeyEvent) {
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onKeyDown", mapEventParams(keyEvent))
    }

    private fun onKeyUpEvent(keyEvent: KeyEvent) {
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onKeyUp", mapEventParams(keyEvent))
    }

    fun dispatchKeyEvent(keyEvent: KeyEvent) {
        if (keyEvent.action == KeyEvent.ACTION_DOWN) {
            onKeyDownEvent(keyEvent)
        } else if (keyEvent.action == KeyEvent.ACTION_UP) {
            onKeyUpEvent(keyEvent)
        }
    }

    private fun mapEventParams(keyEvent: KeyEvent): WritableMap {
        val params: WritableMap = WritableNativeMap()
        val keyCode = keyEvent.keyCode
        val action = keyEvent.action
        val keyCharacter = keyEvent.unicodeChar.toChar()
        val actionName: String = actionToString(action)
        val keyName = KeyEvent.keyCodeToString(keyCode)

        params.putInt("keyCode", keyCode)
        params.putString("actionName", actionName)
        params.putString("keyCharacter", keyCharacter.toString())
        params.putString("keyName", keyName)

        return params
    }

    companion object {
        const val NAME = "KeyEventModule"
        var instance: KeyEventModule? = null
            private set

        fun initModuleInstance(reactContext: ReactApplicationContext): KeyEventModule? {
            instance = KeyEventModule(reactContext)
            return instance
        }

        fun actionToString(action: Int): String {
            return when (action) {
                KeyEvent.ACTION_DOWN -> "ACTION_DOWN"
                KeyEvent.ACTION_UP -> "ACTION_UP"
                else -> action.toString()
            }
        }
    }
}

