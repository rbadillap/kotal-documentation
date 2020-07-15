---
title: Defaulting
---

Kotal ships with [admission mutating](https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/) (defaulting) webhook component that sets the missing parametes values of the `Network` spec before persisting it during creation and update of any network resource.

Example of default parameters:

- Node sync mode is full in private network, fast in public network
- HTTP RPC port is 8545 if HTTP RPC server is enabled
- Node default discovery port is 30303
- All forks are activated at genesis block in private network
- Node client is Hyperledger Besu
- Genesis block coinbase is address zero
- Proof of Authority clique network block time is 15 seconds

## Genesis Block
Genesis block spec parameters are defaulted according to the used consensus in private networks, for full details on genesis block defaulting check [genesis block reference](reference/genesis#defaulting)

## Node
Node spec parameters are defaulted according to the used client and consensus algorithm, for full details on node defaulting check [node reference](reference/node#defaulting)