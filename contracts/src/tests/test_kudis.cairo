use core::array::ArrayTrait;
use kudos::nft::interface::{IKudisNFT, IKudisNFTDispatcher, IKudisNFTDispatcherTrait};
use kudos::tests::common::setup_kudos;
use kudos::tests::utils::constants::{KUDOS, KUDIS, RECEIVER};
use openzeppelin::token::erc721::interface::{
    IERC721MetadataDispatcher, IERC721MetadataDispatcherTrait
};
use openzeppelin::utils::serde::SerializedAppend;
use snforge_std::{declare, ContractClassTrait, start_cheat_caller_address};
use starknet::{ContractAddress, ClassHash, testing::cheatcode, SyscallResult};

fn setup_kudis() -> ContractAddress {
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

#[test]
fn test_nft_metadata() {
    let kudis_nft = IERC721MetadataDispatcher { contract_address: setup_kudis() };

    assert!(kudis_nft.name() == "Kudis", "incorrect token name");
    assert!(kudis_nft.symbol() == "KUDI", "incorrect token symbol");
}

#[test]
#[should_panic(expected: ('Kudos contract addr unset',))]
fn test_nft_mint_no_kudos_address() {
    let kudis_nft = IKudisNFTDispatcher { contract_address: setup_kudis() };

    kudis_nft.mint(RECEIVER());
}

#[test]
#[should_panic(expected: ('Caller not Kudos contract',))]
fn test_nft_mint_kudos_address_not_caller() {
    let kudis_nft = IKudisNFTDispatcher { contract_address: setup_kudis() };

    kudis_nft.set_kudos_address(KUDOS());
    kudis_nft.mint(RECEIVER());
}

#[test]
#[should_panic(expected: ('Must be registered to mint',))]
fn test_nft_mint_unregistered() {
    let kudis_address = setup_kudis();
    let kudis_nft = IKudisNFTDispatcher { contract_address: kudis_address };

    let (_, kudos_address) = setup_kudos(kudis_address);
    kudis_nft.set_kudos_address(kudos_address);

    start_cheat_caller_address(kudis_address, kudos_address);
    kudis_nft.mint(RECEIVER());
}
