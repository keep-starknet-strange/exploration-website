use kudos::credential_registry::component::{
    CredentialRegistryComponent, CredentialRegistryComponent::InternalImpl
};
use kudos::credential_registry::interface::{
    ICredentialRegistry, ICredentialRegistryDispatcher, ICredentialRegistryDispatcherTrait
};
use snforge_std::{declare, ContractClassTrait};
use starknet::ContractAddress;

pub(crate) fn setup_kudos(
    kudis_address: ContractAddress
) -> (ICredentialRegistryDispatcher, ContractAddress) {
    let kudos = declare("Kudos").unwrap();
    let (contract_address, _) = kudos.deploy(@array![kudis_address.into()]).unwrap();
    (ICredentialRegistryDispatcher { contract_address }, contract_address)
}
