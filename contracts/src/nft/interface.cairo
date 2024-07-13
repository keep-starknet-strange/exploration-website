use kudos::nft::dimensions_store::{Dimensions, DimensionsStorePacking};
use starknet::ContractAddress;

#[starknet::interface]
pub trait IKudisNFT<TState> {
    fn mint(ref self: TState, receiver: ContractAddress);
    fn set_kudos_address(ref self: TState, kudos_address: ContractAddress);
    fn get_kudos_address(self: @TState) -> ContractAddress;
    fn get_total(self: @TState) -> u256;
    fn get_data(self: @TState, token_id: u256) -> Dimensions;
}
