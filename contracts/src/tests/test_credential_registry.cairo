use core::array::ArrayTrait;
use core::clone::Clone;
use kudos::credential_registry::component::CredentialRegistryComponent::HasComponent;
use kudos::credential_registry::component::CredentialRegistryComponent::InternalImpl;
use kudos::credential_registry::interface::{
    ICredentialRegistry, ICredentialRegistryDispatcher, ICredentialRegistryDispatcherTrait
};
use kudos::credential_registry::{CredentialRegistryComponent};
use kudos::mocks::credential_registry_mock::CredentialRegistryMock;
use kudos::tests::utils::constants::{
    BAD_SIGNATURE, CALLER, GOOD_SIGNATURE, GOOD_SIGNATURE_W_PIN, PUBLIC_KEY
};
use openzeppelin::account::interface::{AccountABIDispatcherTrait, AccountABIDispatcher};
use snforge_std::{
    declare, ContractClassTrait, spy_events, EventSpyTrait, EventSpyAssertionsTrait, Event,
    start_cheat_caller_address
};
use starknet::ContractAddress;

type ComponentState =
    CredentialRegistryComponent::ComponentState<CredentialRegistryMock::ContractState>;

fn COMPONENT_STATE() -> ComponentState {
    CredentialRegistryComponent::component_state_for_testing()
}

fn CONTRACT_STATE() -> CredentialRegistryMock::ContractState {
    CredentialRegistryMock::contract_state_for_testing()
}

fn setup_account() -> ContractAddress {
    let account_mock = declare("AccountMock").unwrap();
    let (contract_address, _) = account_mock.deploy(@array![PUBLIC_KEY]).unwrap();
    contract_address
}

fn setup_component_w_account() -> (ComponentState, ContractAddress) {
    let mut state = COMPONENT_STATE();
    (state, setup_account())
}

fn setup_w_account() -> (ICredentialRegistryDispatcher, ContractAddress) {
    let credential_registry_mock = declare("CredentialRegistryMock").unwrap();
    let (contract_address, _) = credential_registry_mock.deploy(@array![]).unwrap();
    (ICredentialRegistryDispatcher { contract_address }, contract_address)
}

#[test]
fn test_register_good_credentials() {
    let account_address = setup_account();
    let (mut credential_registry, credential_registry_address) = setup_component_w_account();

    let (msg_hash, sig) = GOOD_SIGNATURE();
    let (msg_hash_w_pin, sig_w_pin) = GOOD_SIGNATURE_W_PIN();

    let mut spy = spy_events();

    start_cheat_caller_address(credential_registry_address, account_address);
    credential_registry.register_credentials(msg_hash, sig, msg_hash_w_pin, sig_w_pin);

    spy
        .assert_emitted(
            @array![
                (
                    credential_registry_address,
                    Event {
                        keys: array![account_address.into()], data: array![msg_hash, msg_hash_w_pin]
                    }
                )
            ]
        );
}

#[test]
fn test_register_good_credentials_internal() {
    let (mut state, account_address) = setup_component_w_account();

    let (msg_hash, sig) = GOOD_SIGNATURE();
    state._register_credentials(msg_hash, account_address, sig);
    assert!(state.get_credential(account_address) == msg_hash, "incorrect credential");
    assert!(state.get_credential_address(msg_hash) == account_address, "incorrect address");
}

#[test]
fn test_register_good_credentials_w_pin_internal() {
    let (mut state, account_address) = setup_component_w_account();

    let (msg_hash, sig) = GOOD_SIGNATURE_W_PIN();
    state._register_credential_w_pin(msg_hash, account_address, sig);
    assert!(
        state.get_credential_w_pin(account_address) == msg_hash, "incorrect credential with pin"
    );
    assert!(
        state.get_credential_address_w_pin(msg_hash) == account_address, "incorrect addr with pin"
    );
}

#[test]
#[should_panic(expected: ('Invalid signature provided',))]
fn test_register_bad_credentials() {
    let (mut state, account_address) = setup_component_w_account();

    let (msg_hash, sig) = BAD_SIGNATURE();
    state._register_credentials(msg_hash, account_address, sig);
}

#[test]
#[should_panic(expected: ('Invalid signature provided',))]
fn test_register_bad_credentials_w_pin() {
    let (mut state, account_address) = setup_component_w_account();

    let (msg_hash, sig) = BAD_SIGNATURE();
    state._register_credential_w_pin(msg_hash, account_address, sig);
}

#[test]
#[should_panic(expected: ('User prev registered cred',))]
fn test_register_duplicate_credentials() {
    let (mut state, account_address) = setup_component_w_account();

    let (msg_hash, sig) = GOOD_SIGNATURE();
    state._register_credentials(msg_hash, account_address, sig.clone());
    state._register_credentials(msg_hash, account_address, sig);
}

#[test]
#[should_panic(expected: ('User prev registered cred_w_pin',))]
fn test_register_duplicate_credentials_w_pin() {
    let (mut state, account_address) = setup_component_w_account();

    let (msg_hash, sig) = GOOD_SIGNATURE_W_PIN();
    state._register_credential_w_pin(msg_hash, account_address, sig.clone());
    state._register_credential_w_pin(msg_hash, account_address, sig);
}
