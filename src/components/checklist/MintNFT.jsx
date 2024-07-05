import { CheckCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'

export function MintNFT() {
  return (
    <>
      <PhotoIcon className="h-14 w-14 mx-auto text-slate-50" />
      <div className="text-md font-light text-slate-50 mt-4 p-8">
        Non-fungible Tokens allow you to own digital information on the
        blockchain based on your wallet information.
        <br />
        <br />
        NFTs have many advantages:
        <div className="grid grid-cols-10 gap-y-3 mt-4 justify-items-start">
          <div className="col-start-5">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          </div>
          <div className="col-start-6">Provenance</div>
          <div className="col-start-5">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          </div>
          <div className="col-start-6">Authenticity</div>
          <div className="col-start-5">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          </div>
          <div className="col-start-6">Accessibility</div>
          <div className="col-start-5">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          </div>
          <div className="col-start-6">Fractional Ownership</div>
        </div>
      </div>
      <button
        type="button"
        className="rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-100"
      >
        Mint
      </button>
    </>
  )
}
