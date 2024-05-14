"use client";

import { useState } from "react";
import FocusTrap from "@/components/FocusTrap";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold">Nested Example</h1>
      <button
        className="bg-cyan-600 text-white p-2 rounded"
        onClick={() => setOpen(true)}
      >
        Open
      </button>
      {open && (
        <FocusTrap>
          <div className="flex flex-col gap-2 bg-gray-300 rounded p-3">
            <input placeholder="test1" className="border p-2" />
            <input placeholder="test2" className="border p-2" />
            <div className="flex gap-2">
              <button
                className="bg-cyan-600 text-white p-2 rounded"
                onClick={() => setOpen2(true)}
              >
                Open2
              </button>
              <button
                className="bg-cyan-600 text-white p-2 rounded"
                onClick={() => setOpen(false)}
              >
                close
              </button>
            </div>
          </div>
        </FocusTrap>
      )}
      {open2 && (
        <FocusTrap>
          <div className="flex flex-col gap-2 bg-gray-300 rounded p-3">
            <input placeholder="test1" className="border p-2" />
            <button
              className="bg-cyan-600 text-white p-2 rounded"
              onClick={() => setOpen2(false)}
            >
              close2
            </button>
          </div>
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
