kit.wallet()
  .addCoinsSentEventListener((wallet, tx, prevBalance, newBalance) -> logger.info("new balance: " + newBalance.toFriendlyString()));

String receiveAddress = "3H7ujuRLDZaZvoMnxBAmzPM6wYoQGDeYzZ";
Coin value = Coin.valueOf(1.0);
final Coin amountToSend = value.subtract(Transaction.REFERENCE_DEFAULT_MIN_TX_FEE);
final Wallet.SendResult sendResult = kit.wallet()
  .sendCoins(kit.peerGroup(), Address.fromString(params, receiveAddress), amountToSend);
