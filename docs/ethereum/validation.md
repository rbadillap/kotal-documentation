---
title: Validation
---

Kotal ships with [validating admission](https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/) webhook component that validate all network spec parameters and their relationship to each other during network creation and update.

Example of validaiton rules:

* Network consensus algorithm is immutable
* Coinbase account must be provided if node is miner
* Node can't use geth client if network consensus is ibft2
* Private network can't use existing public network chain id to prevent transaction replay
* Can't provide genesis block if joining existing network like mainnet
* Can't use go-ethereum for fixed difficulty PoW networks

## Genesis Block
Genesis block spec parameters are validated according to the used consensus in private networks, for full details on genesis block validations check [genesis block reference](reference/genesis#validation)

## Node
Node spec parameters are validation according to the used client and consensus algorithm, for full details on node validation check [node reference](reference/node#validation)