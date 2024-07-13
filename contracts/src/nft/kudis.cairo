#[starknet::contract]
mod KudisNFT {
    use kudos::nft::dimensions_store::{Dimensions, DimensionsStorePacking, HEIGHT};
    use kudos::nft::interface::IKudisNFT;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::erc721::ERC721Component::InternalTrait;
    use openzeppelin::token::erc721::interface::IERC721Metadata;
    use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use starknet::ContractAddress;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721Metadata = ERC721Component::ERC721MetadataImpl<ContractState>;
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    impl InternalImpl = ERC721Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        kudos_address: ContractAddress,
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        colors: LegacyMap<u32, u32>,
        total: u256,
        data: LegacyMap::<u256, Dimensions>
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        KudisNFTMinted: KudisNFTMinted
    }

    #[derive(Drop, starknet::Event)]
    pub struct KudisNFTMinted {
        #[key]
        pub token_id: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_colors: Span<u32>) {
        let base_uri = "https://exploration-website.vercel.app/api/kudos/nft";
        self.erc721.initializer("Kudis", "KUDI", base_uri);

        let mut i: u32 = 0;
        while i < init_colors.len() {
            self.colors.write(i, *init_colors.at(i.into()));
            i += 1;
        }
    }

    #[abi(embed_v0)]
    impl KudisNFT of IKudisNFT<ContractState> {
        fn mint(ref self: ContractState, receiver: ContractAddress) {
            assert(
                self.kudos_address.read() == starknet::get_caller_address(),
                'Only Kudos contract can mint'
            );
            let token_id = self.total.read();

            let mut inner = ArrayTrait::<u16>::new();
            let mut i: u32 = 0;
            while i < HEIGHT {
                let mut hold: u16 = 0;
                let mut j: u32 = 0;
                while j < HEIGHT {
                    if j % 2 == 0 {
                        hold += (1_u16 * (HEIGHT * j).try_into().unwrap());
                    }
                    j += 1;
                };
            };

            self.data.write(token_id, Dimensions { inner });
            self.erc721.mint(receiver, token_id);
            self.total.write(token_id + 1);
            self.emit(KudisNFTMinted { token_id });
        }

        fn set_kudos_address(ref self: ContractState, kudos_address: ContractAddress) {
            let zero_address = starknet::contract_address_const::<0>();
            assert(self.kudos_address.read() == zero_address, 'Kudos contract already set');
            self.kudos_address.write(kudos_address);
        }

        fn get_kudos_address(self: @ContractState) -> ContractAddress {
            self.kudos_address.read()
        }

        fn get_total(self: @ContractState) -> u256 {
            self.total.read()
        }

        fn get_data(self: @ContractState, token_id: u256) -> Dimensions {
            self.data.read(token_id)
        }
    }
}
