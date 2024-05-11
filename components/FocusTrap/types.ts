import { ReactElement } from "react";

export interface OrderedTabbableNode {
  node: HTMLElement;
  tabIndex: number;
  documentIndex: number;
}

export interface FocusTrapProps {
  children: ReactElement;
}
