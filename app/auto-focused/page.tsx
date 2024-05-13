"use client";

import { useState, useEffect, useRef } from "react";
import FocusTrap from "@/components/FocusTrap";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (open && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <>
      <h1 className="text-3xl font-bold">Auto-Focused Example</h1>
      <button
        className="bg-cyan-600 text-white p-2 rounded"
        onClick={() => setOpen(true)}
      >
        Open
      </button>
      {open && (
        <FocusTrap>
          <form className="flex flex-col gap-2 bg-gray-300 rounded p-3">
            <input placeholder="test1" className="border p-2" />
            <input ref={inputRef} placeholder="test2" className="border p-2" />
            <button
              className="bg-cyan-600 text-white p-2 rounded"
              onClick={() => setOpen(false)}
            >
              close
            </button>
          </form>
        </FocusTrap>
      )}
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
        consequuntur doloribus suscipit et nisi aliquam culpa id officiis
        temporibus necessitatibus, repellendus minus voluptates, veniam
        obcaecati earum ea enim at accusamus?
      </p>
      <button className="bg-cyan-600 text-white p-2 rounded">Nothing!</button>
    </>
  );
}
