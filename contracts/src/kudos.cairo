#[starknet::contract]
pub mod Kudos {
    use core::num::traits::zero::Zero;
    use kudos::credential_registry::component::CredentialRegistryComponent;
    use kudos::credential_registry::interface::ICredentialRegistry;
    use kudos::interface::IKudos;
    use kudos::nft::interface::{IKudisNFTMinterDispatcher, IKudisNFTMinterDispatcherTrait};
    use starknet::ContractAddress;

    component!(
        path: CredentialRegistryComponent,
        storage: credential_registry,
        event: CredentialRegistryEvent
    );

    #[abi(embed_v0)]
    impl CredentialRegistryImpl =
        CredentialRegistryComponent::CredentialRegistryImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        credential_registry: CredentialRegistryComponent::Storage,
        kudis_address: ContractAddress
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        CredentialRegistryEvent: CredentialRegistryComponent::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, kudis_address: ContractAddress) {
        assert(kudis_address.is_non_zero(), 'must have a kudis nft address');

        self.kudis_address.write(kudis_address);
    }

    #[abi(embed_v0)]
    impl Kudos of IKudos<ContractState> {
        fn mint(ref self: ContractState) {
            let kudis_nft_address = self.kudis_address.read();
            let caller = starknet::get_caller_address();

            // NFT contract checks that user is registered
            IKudisNFTMinterDispatcher { contract_address: kudis_nft_address }.mint(caller);
        }
    }
}
