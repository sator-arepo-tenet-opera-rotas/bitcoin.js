void createWallet() throws IOException {
    Wallet wallet = Wallet.createDeterministic(params, Script.ScriptType.P2PKH);
    File walletFile = new File("baeldung.dat");
    wallet.saveToFile(walletFile);
}
