
//
WalletAppKit kit = new WalletAppKit(params, new File("."), "baeldungkit") {
    @Override
    protected void onSetupCompleted() {
        logger.info("Wallet created and loaded successfully.");
        logger.info("Receive address: " + wallet().currentReceiveAddress());
        logger.info("Seed Phrase: " + wallet().getKeyChainSeed());
        logger.info("Balance: " + wallet().getBalance().toFriendlyString());
        logger.info("Public Key: " + wallet().findKeyFromAddress(wallet().currentReceiveAddress())
          .getPublicKeyAsHex());
        logger.info("Private Key: " + wallet().findKeyFromAddress(wallet().currentReceiveAddress())
          .getPrivateKeyAsHex());
        wallet().encrypt("password");
    }
};
kit.startAsync();
kit.awaitRunning();
kit.setAutoSave(true);;

// createWallet() 
void createWallet() throws IOException {
    Wallet wallet = Wallet.createDeterministic(params, Script.ScriptType.P2PKH);
    File walletFile = new File("baeldung.dat");
    wallet.saveToFile(walletFile);
}

void connectWalletToPeer() throws BlockStoreException, UnreadableWalletException, IOException {
    Wallet wallet = loadWallet();
    BlockStore blockStore = new MemoryBlockStore(params);
    BlockChain chain = new BlockChain(params, wallet, blockStore);
    PeerGroup peerGroup = new PeerGroup(params, chain);
    peerGroup.addPeerDiscovery(new DnsDiscovery(params));
    peerGroup.addWallet(wallet);
    peerGroup.start();
    peerGroup.downloadBlockChain();
}

//loadUsingSeed(String seedWord) throws UnreadableWalletException
Wallet loadUsingSeed(String seedWord) throws UnreadableWalletException {
    DeterministicSeed seed = new DeterministicSeed(seedWord, null, "", Utils.currentTimeSeconds());
    return Wallet.fromSeed(params, seed);
}

// Wallet loadWallet() throws IOException, UnreadableWalletException
Wallet loadWallet() throws IOException, UnreadableWalletException {
    File walletFile = new File("baeldung.dat");
    Wallet wallet = Wallet.loadFromFile(walletFile);
    logger.info("Address: " + wallet.currentReceiveAddress().toString());
    logger.info("Seed Phrase: " + wallet.getKeyChainSeed().getMnemonicString());
    logger.info("Balance: " + wallet.getBalance().toFriendlyString());
    logger.info("Public Key: " + wallet.findKeyFromAddress(wallet.currentReceiveAddress()).getPublicKeyAsHex());
    logger.info("Private Key: " + wallet.findKeyFromAddress(wallet.currentReceiveAddress()).getPrivateKeyAsHex());
    return wallet;
}
