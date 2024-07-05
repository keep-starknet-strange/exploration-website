import { Textarea } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useSignTypedData } from '@starknet-react/core'
import { useState } from 'react'

const testData = {
  domain: {
    name: 'Signature Example',
    version: '1',
    chainId: '0x534e5f5345504f4c4941',
  },
  types: {
    StarkNetDomain: [
      { name: 'name', type: 'felt' },
      { name: 'version', type: 'felt' },
      { name: 'chainId', type: 'felt' },
    ],
    Example: [{ name: 'contents', type: 'felt' }],
  },
  primaryType: 'Example',
  message: {
    contents: '',
  },
}

export function SignMessage() {
  const [message, setMessage] = useState('')
  const { data, signTypedData } = useSignTypedData(testData)

  return (
    <>
      <PencilSquareIcon className="h-14 w-14 mx-auto text-slate-50" />
      <div className="text-md font-light text-slate-50 mb-8 p-8">
        Digital signatures allow you to attest to data with your private account
        credentials. Others can verify your attestation using public credentials
        meaning no secrets are leaked.
      </div>
      <Textarea
        name="description"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="bg-slate-800 rounded-xl w-2/3 outline-slate-700 text-slate-400 px-3 py-1"
      ></Textarea>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => {
            testData.message.contents = message
            signTypedData(testData)
          }}
          className="rounded-md bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        >
          Sign
        </button>
        {data && (
          <div className="mt-10">
            <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
              Success: r({data[0].slice(0, 5)}) s({data[1].slice(0, 5)})
            </span>
          </div>
        )}
      </div>
    </>
  )
}
