use core::array::ArrayTrait;
use kudos::nft::IKudisNFT;
use openzeppelin::token::erc721::interface::{
    IERC721MetadataDispatcher, IERC721MetadataDispatcherTrait
};
use openzeppelin::utils::serde::SerializedAppend;
use snforge_std::{declare, ContractClassTrait};
use starknet::{ContractAddress, ClassHash, testing::cheatcode, SyscallResult};

fn setup_kudos() -> ContractAddress {
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
    let (kudos_addr, _) = kudos_nft_class.deploy(@calldata).unwrap();
    kudos_addr
}

#[test]
fn test_nft_metadata() {
    let kudis_nft = IERC721MetadataDispatcher { contract_address: setup_kudos() };

    assert!(kudis_nft.name() == "Kudis", "incorrect token name");
    assert!(kudis_nft.symbol() == "KUDI", "incorrect token symbol");
}

#[test]
fn test_nft_mint() {
    let kudis_nft = IERC721MetadataDispatcher { contract_address: setup_kudos() };

    // let base_uri = "https://exploration-website.vercel.app/api/kudos/nft";
    // assert!(kudis_nft.token_uri(1) == base_uri, "incorrect token uri");
    assert!(kudis_nft.name() == "Kudis", "incorrect token name");
    assert!(kudis_nft.symbol() == "KUDI", "incorrect token symbol");
}
