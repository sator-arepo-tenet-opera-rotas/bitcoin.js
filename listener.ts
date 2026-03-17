kit.wallet()
  .addCoinsReceivedEventListener((wallet, tx, prevBalance, newBalance) -> {
      logger.info("Received tx for " + tx.getValueSentToMe(wallet));
      logger.info("New balance: " + newBalance.toFriendlyString());
  });
