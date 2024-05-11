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
