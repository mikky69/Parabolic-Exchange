import Link from "next/link"

export default function ResetSuccess() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="bg-white rounded-xl p-8 shadow-lg w-full relative">
          <div className="absolute inset-x-0 bottom-0 h-4 bg-purple-200 rounded-b-xl"></div>

          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-800 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12L10 17L20 7"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-black text-xl font-bold">Successful!</h2>
          </div>
        </div>

        <Link href="/auth/login" className="block w-full mt-8">
          <button className="w-full bg-purple-900 text-white py-3 rounded-full font-medium">Continue</button>
        </Link>
      </div>
    </main>
  )
}

