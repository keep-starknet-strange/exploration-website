use starknet::ContractAddress;

use openzeppelin::token::erc721::interface::{IERC721MetadataDispatcher, IERC721MetadataDispatcherTrait};
use snforge_std::{declare, ContractClassTrait};

fn setup() -> ContractAddress {
    let kudos_nft_class = declare("Kudos").unwrap();
    let (kudos_nft_addr, _) = kudos_nft_class.deploy(@array![]).unwrap();
    kudos_nft_addr
}

#[test]
fn kudos_nft_metadata() {
    let kudos_nft = IERC721MetadataDispatcher{ contract_address: setup() };

    assert!(kudos_nft.name() == "KudosNFT", "incorrect token name");
    assert!(kudos_nft.symbol() == "KNFT", "incorrect token symbol");
}
