kit.wallet()
  .addCoinsSentEventListener((wallet, tx, prevBalance, newBalance) -> logger.info("new balance: " + newBalance.toFriendlyString()));
