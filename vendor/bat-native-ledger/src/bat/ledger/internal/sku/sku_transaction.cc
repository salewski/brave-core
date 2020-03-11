/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "bat/ledger/global_constants.h"
#include "bat/ledger/internal/ledger_impl.h"
#include "bat/ledger/internal/sku/sku_transaction.h"

using std::placeholders::_1;
using std::placeholders::_2;

namespace {

ledger::SKUTransactionType GetTransactionTypeFromWalletType(
    const std::string& wallet_type) {
  if (wallet_type == ledger::kWalletUphold) {
    return ledger::SKUTransactionType::UPHOLD;
  }

  if (wallet_type == ledger::kWalletAnonymous ||
      wallet_type == ledger::kWalletUnBlinded) {
    return ledger::SKUTransactionType::ANONYMOUS_CARD;
  }

  NOTREACHED();
  return ledger::SKUTransactionType::ANONYMOUS_CARD;
}

}  // namespace

namespace braveledger_sku {

SKUTransaction::SKUTransaction(bat_ledger::LedgerImpl* ledger) :
    ledger_(ledger) {
  DCHECK(ledger_);
}

SKUTransaction::~SKUTransaction() = default;

void SKUTransaction::Create(
    ledger::SKUOrderPtr order,
    const std::string& destination,
    const ledger::ExternalWallet& wallet,
    ledger::ResultCallback callback) {
  if (!order) {
    BLOG(ledger_, ledger::LogLevel::LOG_ERROR) << "Order is null";
    callback(ledger::Result::LEDGER_ERROR);
    return;
  }

  auto transaction = ledger::SKUTransaction::New();
  transaction->transaction_id = ledger_->GenerateGUID();
  transaction->order_id = order->order_id;
  transaction->type = GetTransactionTypeFromWalletType(wallet.type);
  transaction->amount = order->total_amount;
  transaction->status = ledger::SKUTransactionStatus::CREATED;

  auto save_callback = std::bind(&SKUTransaction::OnTransactionSaved,
      this,
      _1,
      *transaction,
      destination,
      wallet,
      callback);

  ledger_->SaveSKUTransaction(transaction->Clone(), save_callback);
}

void SKUTransaction::OnTransactionSaved(
    const ledger::Result result,
    const ledger::SKUTransaction& transaction,
    const std::string& destination,
    const ledger::ExternalWallet& wallet,
    ledger::ResultCallback callback) {
  if (result != ledger::Result::LEDGER_OK) {
    BLOG(ledger_, ledger::LogLevel::LOG_ERROR)
        << "Transaction was not saved";
    callback(ledger::Result::LEDGER_ERROR);
    return;
  }

  auto transfer_callback = std::bind(&SKUTransaction::OnTransfer,
      this,
      _1,
      _2,
      transaction,
      callback);

  ledger_->TransferFunds(
      transaction.amount,
      destination,
      ledger::ExternalWallet::New(wallet),
      transfer_callback);
}

void SKUTransaction::OnTransfer(
    const ledger::Result result,
    const std::string& external_transaction_id,
    const ledger::SKUTransaction& transaction,
    ledger::ResultCallback callback) {
  if (result != ledger::Result::LEDGER_OK) {
    BLOG(ledger_, ledger::LogLevel::LOG_ERROR)
        << "Transaction for order failed " << transaction.order_id;
    callback(ledger::Result::LEDGER_ERROR);
    return;
  }

  auto save_callback = std::bind(&SKUTransaction::OnSaveSKUExternalTransaction,
      this,
      _1,
      transaction.order_id,
      callback);

  ledger_->SaveSKUExternalTransaction(
      transaction.transaction_id,
      external_transaction_id,
      save_callback);
}

void SKUTransaction::OnSaveSKUExternalTransaction(
    const ledger::Result result,
    const std::string& order_id,
    ledger::ResultCallback callback) {
  if (result != ledger::Result::LEDGER_OK) {
    BLOG(ledger_, ledger::LogLevel::LOG_ERROR)
        << "External transaction was not saved";
    callback(ledger::Result::LEDGER_ERROR);
    return;
  }

  ledger_->UpdateSKUOrderStatus(
      order_id,
      ledger::SKUOrderStatus::PAID,
      callback);
}

}  // namespace braveledger_sku
