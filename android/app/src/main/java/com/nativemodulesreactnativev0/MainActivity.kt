package com.nativemodulesreactnativev0

import android.view.KeyEvent
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.nativemodulesreactnativev0.keyevent.KeyEventModule

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "NativeModulesReactNativeV0"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)


  override fun onKeyDown(keyCode: Int, keyEvent: KeyEvent): Boolean {
    KeyEventModule.instance?.dispatchKeyEvent(keyEvent)
    super.onKeyDown(keyCode, keyEvent)
    return true // Stop propagation
  }

  override fun onKeyUp(keyCode: Int, keyEvent: KeyEvent): Boolean {
    KeyEventModule.instance?.dispatchKeyEvent(keyEvent)
    super.onKeyUp(keyCode, keyEvent)
    return true // Stop propagation
  }
}
