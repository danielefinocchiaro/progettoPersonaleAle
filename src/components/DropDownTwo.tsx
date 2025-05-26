import { ReactNode, useState } from "react";

export default function DropDownTwo(props: {
  header: ReactNode;
  children: ReactNode;
}) {
  const [click, setClick] = useState(false);
  return (
    <div className="relative inline-block text-center">
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
        <div className="absolute z-20 mt-2 w-44 origin-top-left rounded-sm bg-[#282828] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <button>
            <div className="py-1">{props.children}</div>
          </button>
        </div>
      )}
    </div>
  );
}
