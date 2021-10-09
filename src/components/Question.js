import { ChevronDownIcon } from "@heroicons/react/solid";

function Question({ text }) {
  return (
    <div className="border rounded-md py-[18px] px-3.5 cursor-pointer ">
      <div className="flex items-center justify-between space-x-4 sm:space-x-20 lg:space-x-10">
        <p className="text-[13px] sm:text-sm font-medium whitespace-nowrap">
          {text}
        </p>
        <ChevronDownIcon className="h-[18px] bg-gray-600 rounded-full" />
      </div>
    </div>
  );
}

export default Question;
