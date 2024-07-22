#[starknet::interface]
pub trait IKudos<TState> {
    fn mint(ref self: TState);
}
