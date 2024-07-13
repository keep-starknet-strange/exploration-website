use starknet::storage_access::StorePacking;

pub const HEIGHT: u32 = 16;
const TWO_POW_16: u256 = 0x10000;
const MASK_16: u256 = 0xFFFF;

#[derive(Drop, Serde)]
pub struct Dimensions {
    pub inner: Array<u16>
}

pub impl DimensionsStorePacking of StorePacking<Dimensions, u256> {
    fn pack(value: Dimensions) -> u256 {
        let mut result: u256 = 0;
        let mut i: u32 = 0;
        while i < HEIGHT {
            result += (*value.inner.at(i)).into() * (TWO_POW_16 * i.into());
            i += 1;
        };
        result
    }
    fn unpack(value: u256) -> Dimensions {
        let mut result = ArrayTrait::<u16>::new();
        let mut i: u32 = 0;
        while i < HEIGHT {
            let hold = (value / (TWO_POW_16 * i.into())) & MASK_16;
            result.append(hold.try_into().unwrap());
            i += 1;
        };
        Dimensions { inner: result }
    }
}
