---
title: Genesis Block
---

Genesis block configuration `genesis` is required in private networks.

| Syntax      | Type |  Description | Default |
| ----------- |------| ----------- | ------ |
| [chainId](#chainid)   | number | used in transaction signature to prevent transactions reply [eip155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md) | |
| [coinbase](#coinbase) | string | benefeciary (ethereum address) of mining reward | `address(0`)|
| [difficulty](#difficulty)| string | difficulty (hexadecimal number) of the genesis block | `0x1` |
| [mixHash](#mixhash)| string | hash (hexadecimal) combined with nonce to prove effort spent to create block | `0x00..00` |
| [gasLimit](#gaslimit)| string | total gas limit (hexadecimal number) for all transactions in a block | `0x47b760` |
| [nonce](#nonce)| string | random hexadecimal number used in block computation | `0x0` |
| [timestamp](#timestamp)| string | genesis block creation date (hexadecimal) | `0x0` |
| [accounts](#accounts)      | Array | array of accounts to prefund and store code | |
| [forks](#forks)|  object | supported forks and corresponding block number| |
| [ethash](#ethash)| object | Proof of Work consensus configuration | |
| [clique](#clique)| object | Proof of Authority consensus configuration | |
| [ibft2](#ibft2)| object | IBFT2 consensus configuration | |

## chainId

`chainId` is the chain id value used in transaction signature to prevent transactions reply [eip155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md)

`chainId` is required.

`chainId` can't reuse existing public network chain id to avoid transaction replay.

| Network      | Chain id |
| ----------- |------|
| mainnet | 1 |
| ropsten | 3 |
| rinkeby | 4 |
| goerli | 5 |
| kotti | 6 |
| ethereum classic | 61 |
| Mordor | 63 |
| development | 2018 |

## coinbase

`coinbase` is the benefeciary (ethereum address) of mining reward.

`coinbase` is optional.

## difficulty

`difficulty` is the difficulty of the genesis block.

`difficulty` is optional.

## mixHash

`mixHash` is combined with nonce to prove effort spent to create block.

`mixHash` is optional.

## gasLimit

`gasLimit` is the total gas limit for all transactions in a block.

`gasLimit` is optional.

## nonce

`nonce` is random number used in block computation.

`nonce` is optional.

## timestamp

`timestamp` is block creation date.

`timestamp` is optional.

## forks

`forks` is an object, where key is fork name and value is the block number at which to activate this fork.

`forks` is optional.

if `forks` is missing, all forks will be activated at block 0 (genesis block) except DAO.

Later forks like `muirglacier` can't be activated before earlier forks like `homestead`. They must be ordered as in the following table:

| Syntax      | Type |  Description |
| ----------- |------| ----------- |
| homestead | number | [Homestead](https://blog.ethereum.org/2016/02/29/homestead-release/) fork activation block number |
| dao | number | [DAO](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-779.md) fork activation block number |
| eip150 | number | [eip150](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-150.md) fork activation block number |
| eip150Hash | string | [eip150](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-150.md) block hash (hexadecimal string), used for fast sync |
| eip155 | number | [eip155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md) fork activation block number |
| eip158 | number | [eip158](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-158.md) fork activation block number |
| byzantium | number | [Byzantium](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/) fork activation block number |
| constantinople | number | [Constantipole](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/) fork activation block number |
| petersburg | number | [Petersburg](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/) fork activation block number |
| istanbul | number | [Istanbul](https://eips.ethereum.org/EIPS/eip-1679) fork activation block number |
| muirglacier | number | [Muir Glacier](https://eips.ethereum.org/EIPS/eip-2387) fork activation block number |

## accounts

`accounts` is array of accounts to prefund or store code.

`accounts` is optional.

`accounts` is recommended for networks where signers or validators are not rewarded with eth.

a single account has no defaults.

| Syntax      | Type |  Description |
| ----------- |------| ----------- |
| address | string | ethereum address |
| balance | string | account balance in hexadecimal |
| code | string | bytecode in hexadecimal |
| storage | map | key is the storage location in hexadecimal, value in hexadecimal is the storage value |

## ethash

`ethash` is Proof of Work consensus engine configuration.

`ethash` is optional.

`ethash` can be set only in proof of work private networks.

`ethash.fixedDifficulty` has no default value.

| Syntax      | Type |  Description | Default |
| ----------- |------| ----------- | ---- |
| fixedDifficulty | number | fixed difficulty used in block computation | |

## clique

`clique` is Proof of Authority clique consensus engine configuration.

`clique` is optional.

`clique` can be set only in proof of authority clieque private networks.

At least one signer in `clique.signers` is required.

| Syntax      | Type |  Description | Default |
| ----------- |------| ----------- | ---|
| blockPeriod | number | block time in seconds | 15 |
| epochLength | number | number of blocks after which to reset all votes | 1000 |
| signers | Array | array of ethereum addresses |

## ibft2

`ibft2` is IBFT2 engine configuration.

`ibft2` is optional.

`ibft2` can be set only in IBFT2 private networks.

At least one validator in `ibft2.validators` is required.

| Syntax      | Type |  Description | Default |
| ----------- | ---- | ------------ | ------- |
| blockPeriod | number | block time in seconds | 15 |
| epochLength | number | number of blocks after which to reset all votes | 1000 |
| validators | array | array of ethereum addresses |
| requestTimeout | number | timeout for each consensus round in seconds | 10 |
| messageQueueLimit | number | message queue limit | 1000 |
| duplicateMessageLimit | number | duplicate messages limit | 100 |
| futureMessagesLimit | number | future messages buffer limit | 1000 |
| futureMessagesMaxDistance | number | maximum height from current chain height for buffering future messages | 10 |
