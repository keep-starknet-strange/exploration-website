use kudos::interface::{IKudosDispatcher, IKudosDispatcherTrait};
use kudos::nft::interface::{
    IKudisNFT, IKudisNFTMinterDispatcher, IKudisNFTMinterDispatcherTrait, IKudisNFTDispatcher,
    IKudisNFTDispatcherTrait
};
use kudos::tests::common::{setup_account, setup_kudos, setup_kudos_w_user, setup_kudis};
use snforge_std::{declare, ContractClassTrait, start_cheat_caller_address};

#[test]
fn test_kudis_nft_mint() {
    let kudis_address = setup_kudis();
    let kudis_nft = IKudisNFTDispatcher { contract_address: kudis_address };

    let (kudos_address, account_address) = setup_kudos_w_user(kudis_address);
    kudis_nft.set_kudos_address(kudos_address);

    start_cheat_caller_address(kudos_address, account_address);
    IKudosDispatcher { contract_address: kudos_address }.mint();
    assert!(kudis_nft.get_total() == 1, "Should be 1 nft");
}
