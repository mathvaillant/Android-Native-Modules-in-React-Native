import { NativeModules } from "react-native";

const { BrightnessModule  } = NativeModules;

class RNBrightnessModule {
  setBrightnessLevel(brightnessLevel: number) {
    return BrightnessModule.setBrightnessLevel(brightnessLevel)
  }

  async getBrightnessLevel(): Promise<number> {
    return await BrightnessModule.getBrightnessLevel()
  }
}

export const Brightness: RNBrightnessModule = new RNBrightnessModule();
