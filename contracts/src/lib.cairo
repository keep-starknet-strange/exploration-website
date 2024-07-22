pub mod interface;
pub mod kudos;

mod credential_registry {
    pub mod component;
    pub mod interface;
}

mod nft {
    pub mod dimensions_store;
    pub mod interface;
    pub mod kudis;
}

mod tests {
    #[cfg(test)]
    pub(crate) mod common;
    #[cfg(test)]
    pub(crate) mod test_credential_registry;
    #[cfg(test)]
    pub(crate) mod test_kudis;
    #[cfg(test)]
    pub(crate) mod test_kudos;
    mod mocks {
        pub(crate) mod account_mock;
        pub(crate) mod credential_registry_mock;
    }

    mod utils {
        pub(crate) mod constants;
    }
}
