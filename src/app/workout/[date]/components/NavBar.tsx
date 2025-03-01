import { useRouter } from "next/navigation";

type NavBarProps = {
  formattedDate: string;
};

export function NavBar({ formattedDate }: NavBarProps) {
  const router = useRouter();
  
  return (
    <nav className="sticky top-0 bg-gray-800 border-b border-gray-700 z-10 shadow-md">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-gray-300 hover:text-blue-400 transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
          <div className="text-center flex-1 mx-4">
            <p className="text-sm text-gray-400 mt-0.5">{formattedDate}</p>
          </div>
          <div className="w-20"></div>
        </div>
      </div>
    </nav>
  );
}