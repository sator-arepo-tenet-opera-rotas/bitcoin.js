// createWallet() 
void createWallet() throws IOException {
    Wallet wallet = Wallet.createDeterministic(params, Script.ScriptType.P2PKH);
    File walletFile = new File("baeldung.dat");
    wallet.saveToFile(walletFile);
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
