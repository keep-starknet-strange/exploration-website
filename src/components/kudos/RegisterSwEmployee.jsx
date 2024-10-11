import { abi } from '@/components/kudos/abi'
import { CheckCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  useAccount,
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from '@starknet-react/core'
import { useEffect } from 'react'

const contractAddress =
  '0x49db95ecf5245921f420dfe01536c8f1266198d4d46cc28f592f51afed0159e'

export function RegisterSwEmployee({ userData, markStepComplete }) {
  // account 0x026E4c92498D782aDdD4eaed96a32c7330cc91cDE89EA07F9fD434dbC3b87106
  // Pedersen Hash: {name: 'Zachary Williams', email: 'zachary@starkware.co', salt: 42}
  // const credentialHash = '0x6864e89d7554273f7df66ba8c594d15e2ef7d5b2e77a7716394a3eea4afc4c8'

  // account salt1 0x00f1A9DD0B62459C1E6148783a6F05fB706CDF84ADe0662d8F4dD64EB27b2B35
  // Pedersen Hash: {name: 'Zachary Williams', email: 'zachary@starkware.co', salt: 1}'
  // credentialHash = 532931342016754
  // account 5329313420167544
  //  const credentialHash = '5329313420167544'

  // account 6
  // {name: 'Zachary Williams', email: 'zachary@starkware.co', salt: 2}
  // const credentialHash = "0x5946aae24e5ce625970214fb7a40775c02984b34dfa295fe48ec04790d16d7f";

  // account 7
  // {name: 'Zachary Williams', email: 'zachary@starkware.co', salt: 4}
  // const credentialHash = '0x785d2141461844d9f9fc248ce1b55fa7fdb2a029deb68343475078876dc76ac'

  // account 8
  // const credentialHash = '0x7ca73ccbb690306bcd5c6d113d772e205c5f8c29ed521976f0d2cd367de7a6e'

  //acount 9 
  // const credentialHash = '0x8c23961dbd729f72fec88e5dfea1cf9b5149c2689104498698e564f5dd8f99'

  // account 10
 const credentialHash = '0x1e7949ff32d60f61d5f08879a65974a17fcb9e85e4e13f1a8d2fe7ae11c0453'

  const { account } = useAccount();
  const {
    data: registeredWalletData,
    status: registeredWalletStatus,
    error: registeredWalletError,
  } = useReadContract({
    abi: abi,
    functionName: 'get_credential_address',
    address: contractAddress,
    args: [credentialHash],
  });

  const {
    data: isRegisteredData,
    status: isRegisteredStatus,
    error: isRegisteredError,
  } = useReadContract({
    abi: abi,
    functionName: 'is_registered',
    address: contractAddress,
    args: [account?.address],
  });

  const walletIsRegistered = isRegisteredData == 1
  const registeredWalletDataHexValue = `0x${BigInt(registeredWalletData || '').toString(16)}`
  const credentialIsRegistered = registeredWalletDataHexValue != "0x0"
  const correctWallet =
    registeredWalletDataHexValue == account?.address
      ? true
      : false;

  const registerEmployeeCalls = [
    {
      contractAddress: contractAddress,
      entrypoint: 'register_sw_employee',
      calldata: [credentialHash],
    },
  ];

  const {
    send: sendRegisterSwEmployeeTransaction,
    data: writeData,
    isPending,
    error: writeError,
    status: sendTransactionStatus,
  } = useSendTransaction({ calls: registerEmployeeCalls });

  const handleClick = async (Event) => {
    Event.preventDefault()
    sendRegisterSwEmployeeTransaction()
  };

  const { data, isSuccess } = useTransactionReceipt({
    hash: writeData?.transaction_hash,
    watch: true,
  });

  useEffect(() => {
    if (isSuccess || correctWallet) {
      markStepComplete(1);
    }
  }, [isSuccess, correctWallet, markStepComplete]);

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
        {walletIsRegistered && !credentialIsRegistered &&
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
