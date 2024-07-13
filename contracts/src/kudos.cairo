#[starknet::contract]
pub mod Kudos {
    use kudos::credential_registry::CredentialRegistryComponent;
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
        self.kudis_address.write(kudis_address);
    }
}
