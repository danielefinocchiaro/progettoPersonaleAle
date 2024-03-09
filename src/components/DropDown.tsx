import { ReactNode, useState } from "react";

export default function DropDown(props: {
  header: ReactNode;
  children: ReactNode;
}) {
  const [click, setClick] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => {
            setClick(!click);
          }}
        >
          {props.header}
        </button>
      </div>
      {click && (
        <div className="absolute  z-10 mt-2 w-[13.5rem] origin-top-right rounded-sm bg-[#282828] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <button>
            <div className="py-1">{props.children}</div>
          </button>
        </div>
      )}
    </div>
  );
}
