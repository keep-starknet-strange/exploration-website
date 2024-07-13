pub mod kudos;
mod credential_registry {
    pub mod component;
    pub mod interface;

    pub use component::CredentialRegistryComponent;
    pub use interface::ICredentialRegistry;
}

mod nft {
    pub mod dimensions_store;
    pub mod interface;
    pub mod kudis;

    pub use interface::IKudisNFT;
}

mod mocks {
    pub(crate) mod account_mock;
    pub(crate) mod credential_registry_mock;
}

#[cfg(test)]
mod tests {
    pub(crate) mod test_credential_registry;
    pub(crate) mod test_kudis;
    mod utils {
        pub(crate) mod constants;
    }
}
