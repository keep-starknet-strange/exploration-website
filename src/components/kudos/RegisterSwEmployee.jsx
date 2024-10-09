import { CheckCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { useContract, useSendTransaction, useTransactionReceipt, useAccount, useNonceForAddress, useConnect } from '@starknet-react/core'
import { useState } from 'react'
import { abi } from '@/components/kudos/abi'

const contractAddress = "0x49db95ecf5245921f420dfe01536c8f1266198d4d46cc28f592f51afed0159e"

export function RegisterSwEmployee({ userData }) {
  const { connect, connectors } = useConnect();
  const connectWallet = async (connector) => {
    connect({ connector });
  };
  const { account } = useAccount();
  // account 
  // Pedersen Hash: {name: 'Zachary Williams', email: 'zachary@starkware.co', salt: 42}
  const credentialHash = '0x6864e89d7554273f7df66ba8c594d15e2ef7d5b2e77a7716394a3eea4afc4c8'
  const handleClick = async (Event) => {
      Event.preventDefault()
      console.log("user registered with hash ", credentialHash)
      writeAsync() 
    }
    const { contract } = useContract({
        abi: abi,
        address: contractAddress,
      });

    const calls = [
      {
        contractAddress: contractAddress,
        entrypoint: "register_sw_employee",
        calldata: [credentialHash],
      }
    ];
    const {send: writeAsync, data: writeData, isPending, error: writeError} = useSendTransaction({calls})
    const {data, status: transactionStatus, isLoading, isSuccess, isError, receiptError} = useTransactionReceipt({ hash: writeData?.transaction_hash, watch: true })
    console.log("contract addr:", contractAddress)
    console.log("Transaction Receipt:");
    console.log("account:", account)
    console.log("write data:", writeData)
    console.log("write error:", writeError)
    console.log("Data:", data);
    console.log("Status:", transactionStatus);
    console.log("Is Loading:", isLoading);
    console.log("Is Success:", isSuccess);
    console.log("Is Error:", isError);
    console.log("Error:", receiptError);
    console.log("tran isPending:", isPending)

  return (
    <>
      <PencilSquareIcon className="h-14 w-14 mx-auto text-slate-50" />
      <div className="text-md font-light text-slate-50 mt-12 px-8">
        Register your account to mint your kudos tokens <br />
        <br />
        Message receivers can verify the data both on-chain and off.
      </div>
      <div className="grid gap-6 my-6 md:grid-cols-2">
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleClick}
          className="rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-100"
        >
          Mint
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
