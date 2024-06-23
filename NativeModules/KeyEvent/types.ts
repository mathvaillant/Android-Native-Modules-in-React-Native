export type KeyEventProps = {
  keyName: string;
  keyCode: number;
  actionName: EventAction;
  keyCharacter: string;
};

export enum EventAction {
  ACTION_DOWN = 0,
  ACTION_UP = 1,
}
