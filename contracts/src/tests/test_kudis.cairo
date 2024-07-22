use kudos::interface::{IKudosDispatcher, IKudosDispatcherTrait};
use kudos::nft::interface::{
    IKudisNFT, IKudisNFTMinterDispatcher, IKudisNFTMinterDispatcherTrait, IKudisNFTDispatcher,
    IKudisNFTDispatcherTrait
};
use kudos::nft::kudis::{KudisNFT, KudisNFT::InternalImpl};
use kudos::tests::common::{setup_kudos, setup_kudis};
use kudos::tests::utils::constants::{KUDOS, RECEIVER};
use openzeppelin::token::erc721::interface::{
    IERC721MetadataDispatcher, IERC721MetadataDispatcherTrait
};
use snforge_std::cheatcodes::events::EventSpyTrait;
use snforge_std::{
    declare, ContractClassTrait, start_cheat_caller_address, spy_events, EventSpyAssertionsTrait
};
use starknet::{ContractAddress, ClassHash, testing::cheatcode, SyscallResult, get_contract_address};

fn CONTRACT_STATE() -> KudisNFT::ContractState {
    KudisNFT::contract_state_for_testing()
}

#[test]
fn test_nft_metadata() {
    let kudis_nft = IERC721MetadataDispatcher { contract_address: setup_kudis() };

    assert!(kudis_nft.name() == "Kudis", "incorrect token name");
    assert!(kudis_nft.symbol() == "KUDI", "incorrect token symbol");
}

#[test]
fn test_nft_mint() {
    let mut kudis_state = CONTRACT_STATE();

    kudis_state._mint(RECEIVER());

    assert!(kudis_state.get_total() == 1, "Should be one nft");

    let testy = kudis_state.get_data(1);
    println!("DATA: {:?}", testy.inner);
}

#[test]
#[should_panic(expected: ('Kudos contract addr unset',))]
fn test_nft_mint_no_kudos_address() {
    let kudis_nft = IKudisNFTMinterDispatcher { contract_address: setup_kudis() };

    kudis_nft.mint(RECEIVER());
}

#[test]
#[should_panic(expected: ('Caller not Kudos contract',))]
fn test_nft_mint_kudos_address_not_caller() {
    let kudis_nft = IKudisNFTDispatcher { contract_address: setup_kudis() };
    kudis_nft.set_kudos_address(KUDOS());
    IKudisNFTMinterDispatcher { contract_address: kudis_nft.contract_address }.mint(RECEIVER());
}

#[test]
#[should_panic(expected: ('Must be registered to mint',))]
fn test_nft_mint_unregistered() {
    let kudis_address = setup_kudis();
    let kudis_nft = IKudisNFTDispatcher { contract_address: kudis_address };

    let (_, kudos_address) = setup_kudos(kudis_address);
    kudis_nft.set_kudos_address(kudos_address);

    start_cheat_caller_address(kudis_address, kudos_address);
    IKudisNFTMinterDispatcher { contract_address: kudis_nft.contract_address }.mint(RECEIVER());
}
