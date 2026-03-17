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
