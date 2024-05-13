"use client";

import { useEffect, useRef, cloneElement, FocusEvent } from "react";

import { FocusTrapProps } from "./types";
import { getTabbables, getOwnerDocument } from "./utils";

export default function FocusTrap({ children }: FocusTrapProps) {
  const root = useRef<HTMLElement>(null);
  const endSentry = useRef<HTMLDivElement>(null);
  const startSentry = useRef<HTMLDivElement>(null);
  const nodeToRestore = useRef<EventTarget | null>(null);

  const lastKeydownEvent = useRef<KeyboardEvent | null>(null);

  useEffect(() => {
    const rootElement = root.current;
    const doc = getOwnerDocument(rootElement);

    if (!rootElement || !startSentry.current) {
      return;
    }

    if (!rootElement.contains(doc.activeElement)) {
      startSentry.current.focus();
    }

    return () => {
      if (nodeToRestore.current) {
        (nodeToRestore.current as HTMLElement).focus();
        nodeToRestore.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const doc = getOwnerDocument(root.current);

    function handleKeydown(event: KeyboardEvent) {
      lastKeydownEvent.current = event;
    }

    doc.addEventListener("keydown", handleKeydown);

    return () => {
      doc.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  function handleRootFocus(event: FocusEvent) {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
  }

  function handleSentryFocus(event: FocusEvent) {
    const rootElement = root.current;

    if (!rootElement) {
      return;
    }

    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }

    let tabbables: HTMLElement[] = getTabbables(rootElement);

    if (tabbables.length > 0) {
      const firstTabbable = tabbables[0];
      const lastTabbable = tabbables[tabbables.length - 1];

      const isShiftTab =
        lastKeydownEvent.current?.key === "Tab" &&
        lastKeydownEvent.current.shiftKey;

      if (isShiftTab) {
        lastTabbable.focus();
      } else {
        firstTabbable.focus();
      }
    } else {
      rootElement.focus();
    }
  }

  return (
    <>
      <div ref={startSentry} tabIndex={0} onFocus={handleSentryFocus} />
      {cloneElement(children, { ref: root, onFocus: handleRootFocus })}
      <div ref={endSentry} tabIndex={0} onFocus={handleSentryFocus} />
    </>
  );
}
