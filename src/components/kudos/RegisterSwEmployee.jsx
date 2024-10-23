import { abi } from '@/components/kudos/abi'
import { usePedersenHash } from '@/hooks/usePedersenHash'
import { CheckCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  useAccount,
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from '@starknet-react/core'
import { useEffect, useState } from 'react'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_KUDOS_ADDRESS

export function RegisterSwEmployee({ userData, markStepComplete }) {
  const credentialHash = usePedersenHash(userData.email)
  const { account } = useAccount()
  const {
    data: registeredWalletData,
    status: registeredWalletStatus,
    error: registeredWalletError,
  } = useReadContract({
    abi: abi,
    functionName: 'get_credential_address',
    address: CONTRACT_ADDRESS,
    args: [credentialHash],
  })

  const {
    data: isRegisteredData,
    status: isRegisteredStatus,
    error: isRegisteredError,
  } = useReadContract({
    abi: abi,
    functionName: 'is_registered',
    address: CONTRACT_ADDRESS,
    args: [account?.address],
  })

  const walletIsRegistered = isRegisteredData == 1
  const registeredWalletDataHexValue = `0x${BigInt(registeredWalletData || '').toString(16)}`
  const credentialIsRegistered = registeredWalletDataHexValue != '0x0'
  const correctWallet =
    registeredWalletDataHexValue == account?.address ? true : false

  const registerEmployeeCalls = [
    {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: 'register_sw_employee',
      calldata: [credentialHash],
    },
  ]

  const {
    send: sendRegisterSwEmployeeTransaction,
    data: writeData,
    isPending,
    error: writeError,
    status: sendTransactionStatus,
  } = useSendTransaction({ calls: registerEmployeeCalls })

  const handleClick = async (Event) => {
    Event.preventDefault()
    sendRegisterSwEmployeeTransaction()
  }

  const { data, isSuccess } = useTransactionReceipt({
    hash: writeData?.transaction_hash,
    watch: true,
  })

  useEffect(() => {
    if (isSuccess || correctWallet) {
      markStepComplete(1)
    }
  }, [isSuccess, correctWallet, markStepComplete])

  return (
    <>
      {credentialIsRegistered && correctWallet ? (
        <CheckCircleIcon className="h-14 w-14 mx-auto text-emerald-600" />
      ) : (
        <PencilSquareIcon className="h-14 w-14 mx-auto text-slate-50" />
      )}
      <div className="text-md font-light text-slate-50 mt-12 px-8">
        {correctWallet || isSuccess
          ? 'You registered your account to mint your Kudos tokens!'
          : 'Register your account to mint your Kudos tokens'}
        <br />
        {credentialIsRegistered &&
          !correctWallet &&
          `You used a different wallet to register. The correct wallet address is ${registeredWalletDataHexValue}`}
        {walletIsRegistered &&
          !credentialIsRegistered &&
          'This wallet is registered with another account'}
        <br />
        <br />
        Minting ERC-20 tokens on StarkNet creates new tokens for use in
        decentralized applications and transactions.
      </div>
      <div className="grid gap-6 my-6 md:grid-cols-2"></div>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleClick}
          disabled={correctWallet}
          className="rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Mint
        </button>
        {isPending && <p>Waiting for wallet...</p>}
        {correctWallet ||
          (isSuccess && (
            <div className="mt-10">
              <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                Success: r({data.transaction_hash.slice(0, 5)}) s(
                {data.actual_fee.amount.slice(0, 5)})
              </span>
            </div>
          ))}
      </div>
    </>
  )
}
