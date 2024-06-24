import { DeviceEventEmitter, EmitterSubscription } from "react-native";
import { EventAction, KeyEventProps } from "./types";

class KeyEvent {
  /**
   * Subscription for the key down event.
   * @type {EmitterSubscription|null}
   */
  listenerKeyDown: EmitterSubscription | null = null;

  /**
   * Subscription for the key up event.
   * @type {EmitterSubscription|null}
   */
  listenerKeyUp: EmitterSubscription | null = null;

  /**
   * Adds a listener for the key down event.
   * @param {function} callback - The callback function to be called when the key down event occurs.
   * @returns {void}
   */
  onKeyDownListener(callback: (event: KeyEventProps) => void): void {
    this.removeKeyDownListener();
    this.listenerKeyDown = DeviceEventEmitter.addListener("onKeyDown", callback);
  }

  /**
   * Removes the key down event listener.
   * @returns {void}
   */
  removeKeyDownListener(): void {
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove();
      this.listenerKeyDown = null;
    }
  }

  /**
   * Adds a listener for the key up event.
   * @param {function} callback - The callback function to be called when the key up event occurs.
   * @returns {void}
   */
  onKeyUpListener(callback: (event: KeyEventProps) => void): void {
    this.removeKeyUpListener();
    this.listenerKeyUp = DeviceEventEmitter.addListener("onKeyUp", callback);
  }

  /**
   * Removes the key up event listener.
   * @returns {void}
   */
  removeKeyUpListener(): void {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
      this.listenerKeyUp = null;
    }
  }

  /**
   * Adds a listener for the key event.
   * @param {EventAction} eventAction - If the key is pressed or released.
   * @param {function} callback - The callback function to be called when the key event occurs.
   * @returns {void}
   */
  addListener(eventAction: EventAction, callback: (event: KeyEventProps) => void): void {
    if (eventAction === EventAction.ACTION_DOWN) {
      this.onKeyDownListener(callback);
    } else {
      this.onKeyUpListener(callback);
    }
  }

  /**
   * Removes the key event listener.
   * @param {EventAction} eventAction - If the key is pressed or released.
   * @returns {void}
   */
  removeListener(eventAction: EventAction): void {
    if (eventAction === EventAction.ACTION_DOWN) {
      this.removeKeyDownListener();
    } else {
      this.removeKeyUpListener();
    }
  }
}

/**
 * Singleton instance of the KeyEvent class, used for managing keyboard event listeners.
 * @type {KeyEvent}
 */
export const KeyEventListener: KeyEvent = new KeyEvent();
