import { Textarea } from '@headlessui/react'
import { CheckCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { useSignTypedData } from '@starknet-react/core'
import { useState } from 'react'

const testData = {
  domain: {
    name: 'SSO Credentials',
    version: '1',
    chainId: '0x534e5f5345504f4c4941',
  },
  types: {
    StarkNetDomain: [
      { name: 'name', type: 'felt' },
      { name: 'version', type: 'felt' },
      { name: 'chainId', type: 'felt' },
    ],
    Credentials: [
      { name: 'email', type: 'felt' },
      { name: 'name', type: 'felt' },
      { name: 'pin', type: 'felt' },
    ],
  },
  primaryType: 'Credentials',
  message: {
    email: '',
    name: '',
    pin: '',
  },
}

export function SignMessage({ userData }) {
  const [message, setMessage] = useState('');
  const { data, isSuccess, isPending, signTypedData, isError } =
    useSignTypedData(testData);

  return (
    <>
      <PencilSquareIcon className="h-14 w-14 mx-auto text-slate-50" />
      <div className="text-md font-light text-slate-50 mt-12 px-8">
        Digital signatures allow you to attest to using your private account
        credentials. <br />
        <br />
        Message receivers can verify the data both on-chain and off.
      </div>
      <div className="grid gap-6 my-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            value={userData.name}
            id="first_name"
            className="bg-slate-500 border border-slate-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readOnly
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="text"
            value={userData.email}
            id="last_name"
            className="bg-slate-500 border border-slate-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readOnly
          />
        </div>
        <div>
          <label
            htmlFor="pin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pin
          </label>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            id="pin"
            className="bg-slate-500 border border-slate-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => {
            testData.message = {
              email: userData.email,
              name: userData.name,
              flare: message,
            }
            signTypedData(testData)
            console.log('SUCCESS: ', isSuccess)
          }}
          className="rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-100"
        >
          Sign
        </button>
        {isPending && <p>Waiting for wallet...</p>}
        {isSuccess && (
          <div className="mt-10">
            <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
              Success: r({data[0].slice(0, 5)}) s(
              {data[1].slice(0, 5)})
            </span>
          </div>
        )}
      </div>
    </>
  )
}
