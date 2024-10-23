import { abi } from '@/components/kudos/abi'
import { useCredentialHash } from '@/hooks/useCredentialHash'
import { GiftIcon } from '@heroicons/react/24/outline'
import {
  useAccount,
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from '@starknet-react/core'
import { useEffect, useState } from 'react'
import { shortString } from 'starknet'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_KUDOS_ADDRESS

const sendGiveKudosInitialState = {
  description: '',
  email: '',
  amount: 0,
}

const splitU256 = (value) => {
  const bigIntValue = BigInt(value)
  const BigInt128 = BigInt(2) ** BigInt(128)
  return {
    low: (bigIntValue % BigInt128).toString(),
    high: (bigIntValue / BigInt128).toString(),
  }
}

const useKudosReadData = (args, functionName) => {
  const { data: kudosData } = useReadContract({
    abi,
    functionName: functionName,
    address: CONTRACT_ADDRESS,
    args: args,
    refetchInterval: 10000,
  })

  return kudosData
}

export function GiveKudos({ userData, markStepComplete }) {
  const { address: accountAddress } = useAccount()
  const [kudosGiven, setKudosGiven] = useState(0)
  const [kudosReceived, setKudosReceived] = useState(0)
  const [kudosBalance, setKudosBalance] = useState(0)
  const [sendGiveKudosState, setSendGiveKudosState] = useState(
    sendGiveKudosInitialState,
  )

  const senderCredentialsHash = useCredentialHash(userData.name, userData.email)
  const receiverCredentialsHash = useCredentialHash(
    sendGiveKudosState.email,
  )

  const descriptionAsHex = shortString.encodeShortString(
    sendGiveKudosState.description,
  )
  const amountU256 = splitU256(sendGiveKudosState.amount)

  const givenKudosData = useKudosReadData([accountAddress], 'get_total_given')
  const hasGivenKudos = givenKudosData > 0
  const receivedKudosData = useKudosReadData(
    [accountAddress],
    'get_total_received',
  )
  const kudosBalanceData = useKudosReadData([accountAddress], 'balance_of')
  const receiverWalletData = useKudosReadData(
    [receiverCredentialsHash],
    'get_credential_address',
  )

  const receiverWalletDataHexValue = `0x${BigInt(receiverWalletData || '').toString(16)}`
  const receiverHasValidAddress = receiverWalletDataHexValue != '0x0'

  const giveKudosCalls = [
    {
      contractAddress: CONTRACT_ADDRESS,
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

  const { data, isSuccess, status } = useTransactionReceipt({
    hash: giveKudosData?.transaction_hash,
    watch: true,
  })

  const handleClick = async (Event) => {
    Event.preventDefault()
    sendGiveKudos()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSendGiveKudosState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (givenKudosData) {
      setKudosGiven(givenKudosData)
    }
    if (hasGivenKudos) {
      markStepComplete(2)
    }
    if (receivedKudosData) {
      setKudosReceived(receivedKudosData)
    }
    if (kudosBalanceData) {
      setKudosBalance(kudosBalanceData)
    }
  }, [
    givenKudosData,
    receivedKudosData,
    kudosBalanceData,
    hasGivenKudos,
    markStepComplete,
  ])

  return (
    <>
      <GiftIcon
        className={`h-14 w-14 mx-auto text-${hasGivenKudos ? 'emerald-600' : 'slate-50'}`}
      />
      <div className="text-md font-light text-slate-50 mt-12 px-8">
        <br />
        Message receivers can verify the data both on-chain and off.
      </div>
      <div className="p-4 border border-slate-600 rounded-lg bg-slate-500 shadow my-6">
        <h2 className="font-semibold">
          Kudos Balance:{' '}
          <span className="text-green-500">{`${kudosBalance}`}</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border border-slate-600 rounded-lg bg-slate-500 shadow">
          <h2 className="font-semibold">
            Kudos Received:{' '}
            <span className="text-green-500">{`${kudosReceived}`}</span>
          </h2>
        </div>
        <div className="p-4 border border-slate-600 rounded-lg bg-slate-500  shadow">
          <h2 className="font-semibold">
            Kudos Given:{' '}
            <span className="text-green-500">{`${kudosGiven}`}</span>
          </h2>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center">Send Kudos</h1>
      <div className="grid gap-6 my-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={sendGiveKudosState.email}
            placeHolder={'eli@starkware.co'}
            id="Email"
            maxLength={31}
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
            name="amount"
            value={sendGiveKudosState.amount}
            onChange={handleChange}
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
            onChange={handleChange}
            name="description"
            value={sendGiveKudosState.description}
            type="text"
            id="pin"
            maxLength={31}
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
            !receiverHasValidAddress ||
            sendGiveKudosState.amount == 0 ||
            sendGiveKudosState.description.length === 0
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
