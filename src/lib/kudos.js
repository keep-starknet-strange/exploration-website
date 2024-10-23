export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_KUDOS_ADDRESS

export const transformInt = (value) => {
  const transformedIntValue = BigInt(value) * BigInt(10 ** 18)
  const transformedIntValue128 = BigInt(2) ** BigInt(128)
  return {
    low: (transformedIntValue % transformedIntValue128).toString(),
    high: (transformedIntValue / transformedIntValue128).toString(),
  }
}

export const divideBy10e18 = (value) => {
  return BigInt(value) / BigInt(10 ** 18)
}

export const walletDataHexValue = (walletAdress) => {
  return `0x${BigInt(walletAdress || '').toString(16)}`
}