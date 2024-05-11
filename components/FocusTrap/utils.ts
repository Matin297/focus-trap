import { OrderedTabbableNode } from "./types";

function getNodeTabIndex(node: HTMLElement) {
  const tabIndexAttr = node.getAttribute("tabindex");
  const parsedTabIndexAttr = parseInt(tabIndexAttr || "");

  if (!Number.isNaN(parsedTabIndexAttr)) {
    return parsedTabIndexAttr;
  }

  // ** Special case **
  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  //
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  // yet they are still part of the regular tab order;
  if (
    (node.isContentEditable ||
      node.tagName === "AUDIO" ||
      node.tagName === "VIDEO" ||
      node.tagName === "DETAILS") &&
    tabIndexAttr === null
  ) {
    return 0;
  }

  return node.tabIndex;
}

function isTabbableNodeFocusable(node: HTMLElement) {
  if (
    (node instanceof HTMLInputElement ||
      node instanceof HTMLButtonElement ||
      node instanceof HTMLSelectElement ||
      node instanceof HTMLTextAreaElement) &&
    node.disabled
  ) {
    return false;
  }

  if (node instanceof HTMLInputElement && node.type === "hidden") {
    return false;
  }

  return true;
}

// Inspired by https://github.com/focus-trap/tabbable
const TABBABLE_SELECTOR = [
  "input",
  "select",
  "textarea",
  "a[href]",
  "button",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
].join(",");

export function getTabbables(rootNode: HTMLElement) {
  const regularTabbableNodes: HTMLElement[] = [];
  const orderedTabbableNodes: OrderedTabbableNode[] = [];

  rootNode
    .querySelectorAll<HTMLElement>(TABBABLE_SELECTOR)
    .forEach((node, i) => {
      const tabIndex = getNodeTabIndex(node);

      if (tabIndex === -1 || !isTabbableNodeFocusable(node)) {
        return;
      }

      if (tabIndex === 0) {
        regularTabbableNodes.push(node);
      } else {
        orderedTabbableNodes.push({
          node: node,
          tabIndex,
          documentIndex: i,
        });
      }
    });

  return orderedTabbableNodes
    .sort((a, b) => {
      if (a.tabIndex === b.tabIndex) {
        return a.documentIndex - b.documentIndex;
      }
      return a.tabIndex - b.tabIndex;
    })
    .map((tabNode) => tabNode.node)
    .concat(regularTabbableNodes);
}
