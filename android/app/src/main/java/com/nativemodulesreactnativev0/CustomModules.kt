package com.nativemodulesreactnativev0

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.nativemodulesreactnativev0.keyevent.KeyEventModule

class CustomModules : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        KeyEventModule.initModuleInstance(reactContext)?.let { modules.add(it) }
        return modules
    }
}