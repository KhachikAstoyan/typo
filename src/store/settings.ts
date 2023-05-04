import { create } from "zustand";
import { produce } from "immer";

export type TestMode = "time" | "words";
export type CarretMode = "line" | "background" | "underline";

type State = {
  testMode: TestMode;
  wordCount: number;
  time: number;
  // carretMode: CarretMode;
  themeId: number;
};

type UpdateActionType = Partial<{
  [key in keyof State]: State[keyof State];
}>;

type Actions = {
  updateSettings: (action: UpdateActionType) => void;
};

const initialState: State = {
  testMode: "words",
  wordCount: 20,
  time: 30,
  // carretMode: "line",
  themeId: 0,
};

export const useSettings = create<State & Actions>((set) => ({
  ...initialState,
  updateSettings: (action) =>
    set(produce((draft) => Object.assign(draft, action))),
}));
