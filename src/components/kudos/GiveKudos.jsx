import { abi } from '@/components/kudos/abi'
import { useCredentialHash } from '@/hooks/useCredentialHash'
import { CheckCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from '@starknet-react/core'
import { useState } from 'react'
import { shortString } from 'starknet'

const contractAddress =
  '0x49db95ecf5245921f420dfe01536c8f1266198d4d46cc28f592f51afed0159e'

const splitU256 = (value) => {
  const bigIntValue = BigInt(value)
  const BigInt128 = BigInt(2) ** BigInt(128)
  return {
    low: (bigIntValue % BigInt128).toString(),
    high: (bigIntValue / BigInt128).toString(),
  }

export function GiveKudos({ userData }) {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const senderCredentialsHash = useCredentialHash(userData.name, userData.email);
  const receiverCredentialsHash = useCredentialHash(name, email);
  
  const descriptionAsHex = shortString.encodeShortString(description);
  const amountU256 = splitU256(amount);  

  const { data: receiverWalletData } = useReadContract({
    abi: abi,
    functionName: 'get_credential_address',
    address: contractAddress,
    args: [receiverCredentialsHash],
  });

  const giveKudosCalls = [
    {
      contractAddress: contractAddress,
      entrypoint: 'give_kudos',
      calldata: [
        amountU256.low,
        amountU256.high,
        senderCredentialsHash,
        receiverCredentialsHash,
        descriptionAsHex,
      ],
    },
  ]

  const {
    send: sendGiveKudos,
    data: giveKudosData,
    isPending,
  } = useSendTransaction({ calls: giveKudosCalls })

  const receiverWalletDataHexValue = `0x${BigInt(receiverWalletData || '').toString(16)}`;
  const receiverHasValidAddress = receiverWalletDataHexValue != '0x0';

  const { data, isSuccess } = useTransactionReceipt({
    hash: giveKudosData?.transaction_hash,
    watch: true,
  });

  const handleClick = async (Event) => {
    Event.preventDefault();
    sendGiveKudos();
  };

  return (
    <>
      <PencilSquareIcon className="h-14 w-14 mx-auto text-slate-50" />
      <div className="text-md font-light text-slate-50 mt-12 px-8">
        Send some tokens to a teammate
        <br />
        <br />
        Message receivers can verify the data both on-chain and off.
      </div>
      <div className="grid gap-6 my-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="full_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            placeHolder={'Eli Ben-Sasson'}
            id="full_name"
            className="bg-slate-500 border border-slate-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
            placeHolder={'eli@starkware.co'}
            id="Email"
            className="bg-slate-500 border border-slate-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            id="amount"
            className="bg-slate-500 border border-slate-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-arrows"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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
          onClick={handleClick}
          disabled={
            !receiverHasValidAddress || amount > 0 || description.length === 0
          }
          className="rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Send Kudos
        </button>
        {isPending && <p>Waiting for wallet...</p>}
        {isSuccess && (
          <div className="mt-10">
            <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
              Success: r({data.transaction_hash.slice(0, 5)}) s(
              {data.actual_fee.amount.slice(0, 5)})
            </span>
          </div>
        )}
      </div>
    </>
  )
}
