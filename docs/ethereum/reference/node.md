---
title: Node
---

Kotal extended Kubernetes with `Node` custom resource in the `ethereum.kotal.io/v1alpha1` group version.

```yaml {1-2}
apiVersion: ethereum.kotal.io/v1alpha1
kind: Node
metadata:
  name: mainnet-node
spec:
  client: geth
  join: mainnet
  rpc: true
```

| Syntax                               | Type    | Description                                                           | Default                             |
| ------------------------------------ | ------- | --------------------------------------------------------------------- | ----------------------------------- |
| [id](#id)                            | number  | Network id used for p2p communcations between network nodes           |                                     |
| [join](#join)                        | string  | Public network name to join, like `mainnet`, `rinkeby`, and `goerli`  |                                     |
| [consensus](#consensus)              | string  | Network consensus algorithm name, like `poa`, `pow`, and `ibft2`      |                                     |
| [highlyAvailable](#highly-available) | boolean | Ethereum nodes will be scheduled on different kubernetes nodes        | `false`                             |
| [topologyKey](#topology-key)         | string  | kubernetes node label key used to distribute ethereum nodes           | `topology.kubernetes.io/zone`       |
| [genesis](#genesis)                  | object  | Genesis block configuration                                           |                                     |
| [bootnode](#bootnode)                | boolean | node is bootnode                                                      | `false`                             |
| [bootnodes](#bootnodes)              | array   | ethereum node URLS for p2p discovery bootstrap                        |                                     |
| [client](#client)                    | string  | ethereum client powering the node                                     | `besu`                              |
| [coinbase](#coinbase)                | string  | ethereum account to which mining rewards are paid                     |                                     |
| [corsDomains](#corsdomains)          | array   | domains from which to accept cross origin requests (browser enforced) | `*`                                 |
| [graphql](#graphql)                  | boolean | enable GraphQL server                                                 | `false`                             |
| [graphqlPort](#graphqlport)          | number  | GraphQL server listening port                                         | `8547`                              |
| [hosts](#hosts)                      | array   | hostnames to whitelist for RPC access (server enforced)               | `*`                                 |
| [import](#import)                    | object  | ethereum account to import for `geth` node                            |                                     |
| [logging](#logging)                  | string  | node logging verbosity level                                          | `info`                              |
| [miner](#miner)                      | boolean | node is mining or signing blocks ?                                    | false                               |
| [name](#name)                        | string  | node name                                                             |                                     |
| [nodekey](#nodekey)                  | string  | node private key                                                      |                                     |
| [p2pPort](#p2pport)                  | string  | node p2p port                                                         | `30303`                             |
| [resources](#resources)              | object  | node compute and storage resources to alloacte                        |                                     |
| [rpc](#rpc)                          | boolean | enable HTTP RPC server                                                | `false`                             |
| [rpcPort](#rpcport)                  | number  | HTTP RPC server listening port                                        | `8545`                              |
| [rpcAPI](#rpcapi)                    | array   | services to enable                                                    | `web3`, `eth`, and `net`            |
| [staticNodes](#staticnodes)          | array   | set of trusted ethereum nodes to maintain connection to               |                                     |
| [syncMode](#syncmode)                | string  | blockchain synchronization mode                                       | `fast` in public, `full` in private |
| [ws](#ws)                            | boolean | enable web socket server                                              | `false`                             |
| [wsPort](#wsport)                    | number  | web socket server listening port                                      | `8546`                              |
| [wsAPI](#wsapi)                      | array   | services to enable                                                    | `web3`, `eth`, and `net`            |

## id

:::note
If the node is created by a [Network](network) controller, the network `.spec.id` will be used, and node `.spec.id` will be ignored.
:::

`id` is the network id used for p2p communications between network nodes in private networks.

`id` is required in private networks.

`id` can't be provided while joining a public network.

`id` can't be updated (immutable).

## join

:::note
If the node is created by a [Network](network) controller, the network `.spec.join` will be used, and node `.spec.join` will be ignored.
:::

`join` is the public network name to join, like `rinkeby`.

`join` can't be provided in private networks.

`join` can't be updated (immutable).

## consensus

:::note
If the node is created by a [Network](network) controller, the network `.spec.consensus` will be used, and node `.spec.consensus` will be ignored.
:::

`consensus` is the network consensus algorithm name, like `ibft2`.

`consensus` is required in private networks.

`consensus` possible values are `poa`, `pow` or `ibft2`.

`consensus` can't be updated (immutable).

## highly available

:::note
If the node is created by a [Network](network) controller, the network `.spec.highlyAvailable` will be used, and node `.spec.highlyAvailable` will be ignored.
:::

`highlyAvailable` controls if Ethereum nodes will be scheduled on different Kubernetes nodes.

## topology key

:::note
If the node is created by a [Network](network) controller, the network `.spec.topologyKey` will be used, and node `.spec.topologyKey` will be ignored.
:::

`topologyKey` is Kubernetes node label key used to distribute ethereum nodes pods on different kubernetes nodes.

## genesis

:::note
If the node is created by a [Network](network) controller, the network `.spec.genesis` will be used, and node `.spec.genesis` will be ignored.
:::

`genesis` is the genesis block configuration.

`genesis` block is required in private networks.

`genesis` can't be updated (immutable).

For extensive details, check [genesis](genesis) reference.

## bootnode

`bootnode` marks the node as a boot node.

The first node in the `spec.nodes` list must be a bootnode with `bootnode: true`

Bootnodes must use node private key, check [nodekey](#nodekey).

## bootnodes

`bootnodes` is ethereum node URLs for p2p network discovery bootstrap.

:::warning
Each Ethereum clients has hardcoded bootnodes for public main and test networks. `bootnodes` will override these bootnodes.

:::

## client

`client` is the Ethereum client name powering the node.

`client` possible values are `besu`, `geth` or `parity`.

Client `geth` or `parity` can't be used if network consensus is `ibft2`.

Client `geth` or `parity` can't be used in fixed difficulty proof of work networks, where `spec.consensus` is `pow` and `spec.genesis.ethash.fixedDifficulty` is not null.

## coinbase

`coinbase` is ethereum account to which mining rewards are paid.

`coinbase` is required if the node is mining `miner: true`.

## corsDomains

`corsDomains` is a list of domains from which to accept cross-origin requests (browser enforced).

Default value `*` will be used if HTTP RPC server is enabled `rpc: true` or web socket server is enabled `ws: true` or graphQL server is enabled `graphql: true`.

## graphql

`graphql` enables the GraphQL server.

:::note

- Parity (OpenEthereum) client doesn't support GraphQL.
- Geth (Go-Ethereum) GraphQL server can be used only if RPC is enabled as of geth [v1.9.19 release](https://github.com/ethereum/go-ethereum/releases/tag/v1.9.19)
  :::

## graphqlPort

`graphqlPort` GraphQL server listening port.

The default value `8547` will be used if the graphQL server is enabled `graphql: true`.

## hosts

`hosts` is a list of host names to whitelist for RPC access (server enforced).

## import

`import` is the ethereum account to import. Only for nodes running with `geth` or `parity` clients.

During account creation, it will be encrypted with the password, and during import it will be unlocked using the same password.

:snake: Nodes that import accounts can't enable HTTP RPC server, web socket server, or GraphQL server to prevent funds drainage if exposed to the internet.

Account must be imported if the node is running with `geth` or `parity` clients wants to be a signer in proof of authority clique network.

| Syntax     | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| privatekey | string | account private key in hexadecimal |
| password   | string | encryption secret                  |

## logging

`logging` is Ethereum node logging verbosity level.

`logging` possible values are `off`, `fatal`, `error`, `warn`, `debug`, `info`, `trace` and `all`.

Different clients support different logging vrbosity levels as shown in the following table:

| Logging/Client | Hyperledger Besu   | Go Ethereum        | Parity (OpenEthereum) |
| -------------- | ------------------ | ------------------ | --------------------- |
| `off`          | :heavy_check_mark: | :heavy_check_mark: | :x:                   |
| `fatal`        | :heavy_check_mark: | :x:                | :x:                   |
| `error`        | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:    |
| `warn`         | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:    |
| `debug`        | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:    |
| `info`         | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:    |
| `trace`        | :heavy_check_mark: | :x:                | :heavy_check_mark:    |
| `all`          | :heavy_check_mark: | :heavy_check_mark: | :x:                   |

## miner

`miner` enables node mining or signing blocks.

:::note
Parity (OpenEthereum) client doesn't support PoW mining.
:::

## name

`name` is the node name.

`name` is required.

`name` can't be updated (immutable).

## nodekey

`nodekey` is the node private key.

`nodekey` is required if the node is a boot node `bootnode: true`, or if besu node with `client: besu` is a signer in proof of authority clique network or validator in ibft2 network.

## p2pPort

`p2pPort` is node p2p port for communication (TCP) and discovery (UDP).

## resources

`resources` allocates compute and storage resources to the node.

| Syntax       | Type   | Description                                 | Default                                                                                                               |
| ------------ | ------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| cpu          | string | number of cpu cores this node requires      | `2` in private, `4` in public                                                                                         |
| cpuLimit     | string | number of cpu cores this node is limited to | `3` in private, `6` in public                                                                                         |
| memory       | string | memory this node requires                   | `4Gi` in private, `8Gi` in public                                                                                     |
| memoryLimit  | string | memory this node is limited to              | `8Gi` in private, `16Gi` in public                                                                                    |
| storage      | string | disk space this node requires               | `100Gi` in private, `6Ti` in mainnet with full sync, `750Gi` in mainnet wit fast sync, `25Gi` in public test networks |
| storageClass | string | Node volume storage class                   | Cluster's default storage class will be used as defined by cluster admin or cloud provider                            |

memory and storage requests and limits must use the pattern `^[1-9][0-9]*[KMGTPE]i$` for example `1500Mi`, `30Gi`, and `1Ti`.

cpu requests and limits must use the pattern `^[1-9][0-9]*m?$` for example `1000m` (which is equal to `1`), `1500m`, `2`, and `4.`

`cpuLimit` can't be less than `cpu`.

`memoryLimit` can't be less than `memory`.

## rpc

`rpc` enables the HTTP RPC server.

## rpcPort

`rpcPort` is the HTTP RPC server listening port.

Default value `8545` will be used if the HTTP RPC server is enabled with `rpc: true`.

## rpcAPI

`rpcAPI` is a list of RPC services to enable.

Default value `["web3", "eth", "net]` will be used if HTTP RPC server is enabeld with `rpc: true`.

## staticNodes

`staticNodes` is a set of trusted ethereum nodes to maintain connection to

:::info
Static nodes are exempt from maximum peer and remote connection limits.
Ethereum clients periodically initiating a connection to any unconnected static node.
:::

## syncMode

`syncMode` is Blockchain synchronization mode.

`syncMode` possible values are `light`, `full` or `fast`.

:snake: Nodes that run with `client: besu` doesn't support `light` sync mode.

## ws

`ws` enables the web socket server.

## wsPort

`wsPort` is the web socket server listening port.

The default value `8546` is used if the web socket server is enabled with `ws: true`.

## wsAPI

`wsAPI` is a list of rpc services to enable.

the default value `["web3", "eth", "net]` will be used if the web socket server is enabeld with `ws: true`.
