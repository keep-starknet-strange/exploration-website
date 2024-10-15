export const abi = [
  {
    type: 'interface',
    name: 'Kudos',
    items: [
      {
        type: 'function',
        name: 'give_kudos',
        state_mutability: 'external',
        inputs: [
          {
            name: 'amount',
            type: 'core::integer::u256',
          },
          {
            name: 'sender_credentials',
            type: 'core::felt252',
          },
          {
            name: 'receiver_credentials',
            type: 'core::felt252',
          },
          {
            name: 'description',
            type: 'core::felt252',
          },
        ],
        outputs: [],
      },
      {
        type: 'function',
        name: 'register_sw_employee',
        state_mutability: 'external',
        inputs: [
          {
            name: 'credential_hash',
            type: 'core::felt252',
          },
        ],
      },
      {
        type: 'function',
        name: 'get_total_given',
        state_mutability: 'view',
        inputs: [
          {
            name: 'address',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u256',
          },
        ],
      },
      {
        type: 'function',
        name: 'get_total_received',
        state_mutability: 'view',
        inputs: [
          {
            name: 'address',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u256',
          },
        ],
      },
      {
        type: 'function',
        name: 'balance_of',
        state_mutability: 'view',
        inputs: [
          {
            name: 'address',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u256',
          },
        ],
      },
      {
        type: 'function',
        name: 'is_registered',
        state_mutability: 'view',
        inputs: [
          {
            name: 'address',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'bool',
          },
        ],
      },
      {
        type: 'function',
        name: 'get_credential_address',
        state_mutability: 'view',
        inputs: [
          {
            name: 'hash',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
      },
    ],
  },
]
