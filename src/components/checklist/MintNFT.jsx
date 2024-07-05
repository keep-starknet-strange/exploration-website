import { Container } from '@/components/Container'
import { PhotoIcon } from '@heroicons/react/24/outline'

export function MintNFT() {
  return (
    <>
      <PhotoIcon className="h-14 w-14 mx-auto text-slate-50" />
      <div className="text-md font-light text-slate-50 mt-8 p-8">
        Non-fungible Tokens allow you to own digital information on the
        blockchain based on your account information.
      </div>
      <button className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-1 text-lg font-medium text-white ring-1 ring-inset ring-gray-800">
        <svg
          className="h-1.5 w-1.5 fill-indigo-400"
          viewBox="0 0 6 6"
          aria-hidden="true"
        >
          <circle cx={3} cy={3} r={3} />
        </svg>
        mint
      </button>
    </>
  )
}
