use kudos::credential_registry::component::{
    CredentialRegistryComponent, CredentialRegistryComponent::InternalImpl
};
use kudos::credential_registry::interface::{
    ICredentialRegistry, ICredentialRegistryDispatcher, ICredentialRegistryDispatcherTrait
};
use kudos::tests::utils::constants::PUBLIC_KEY;
use kudos::tests::utils::constants::{GOOD_SIGNATURE, GOOD_SIGNATURE_W_PIN, KUDIS};
use openzeppelin::utils::serde::SerializedAppend;
use snforge_std::{
    declare, ContractClassTrait, start_cheat_caller_address, stop_cheat_caller_address
};
use starknet::ContractAddress;

pub fn setup_kudos(
    kudis_address: ContractAddress
) -> (ICredentialRegistryDispatcher, ContractAddress) {
    let kudos = declare("Kudos").unwrap();
    let (contract_address, _) = kudos.deploy(@array![kudis_address.into()]).unwrap();
    (ICredentialRegistryDispatcher { contract_address }, contract_address)
}

pub fn setup_kudis() -> ContractAddress {
    let mut calldata = array![];
    let init_colors = array![
        0x000000,
        0xFFFFFF,
        0xFF0000,
        0x00FF00,
        0x0000FF,
        0xFFFF00,
        0xFF00FF,
        0x00FFFF,
        0x880000,
        0x008800,
        0x000088,
        0x888800
    ];
    calldata.append_serde(init_colors);

    let kudos_nft_class = declare("KudisNFT").unwrap();
    let (kudos_addr, _) = kudos_nft_class.deploy_at(@calldata, KUDIS()).unwrap();
    kudos_addr
}

pub fn setup_account() -> ContractAddress {
    let account_mock = declare("AccountMock").unwrap();
    let (contract_address, _) = account_mock.deploy(@array![PUBLIC_KEY]).unwrap();
    contract_address
}

pub fn setup_kudos_w_user(kudis_address: ContractAddress) -> (ContractAddress, ContractAddress) {
    let kudos = declare("Kudos").unwrap();
    let (contract_address, _) = kudos.deploy(@array![kudis_address.into()]).unwrap();
    let kudos_contract = ICredentialRegistryDispatcher { contract_address };

    let account_addr = setup_account();
    let (msg_hash, sig) = GOOD_SIGNATURE();
    let (msg_hash_w_pin, sig_w_pin) = GOOD_SIGNATURE_W_PIN();

    start_cheat_caller_address(contract_address, account_addr);
    kudos_contract.register_credentials(msg_hash, sig, msg_hash_w_pin, sig_w_pin);
    stop_cheat_caller_address(contract_address);

    (contract_address, account_addr)
}

#[test]
fn test_kudos_w_user() {
    let (contract_address, _) = setup_kudos_w_user(KUDIS());
    let kudos_contract = ICredentialRegistryDispatcher { contract_address };

    assert!(kudos_contract.get_total_credentials() == 1, "setup should have 1 credential");
}
