---
title: Network
---

Kotal extended Kubernetes with `Network` custom resource in the `ethereum.kotal.io/v1alpha1` group version.

Network controller creates [Node](node) resources from the network `.spec.nodes`.

```yaml {1-2}
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: sample-network
spec:
  join: rinkeby
  nodes:
    - name: node-1
      rpc: true
```

## Network Spec

| Syntax      | Type |  Description | Default |
| ----------- |------| ----------- | ----- |
| [id](#id)      | number | Network id used for p2p communcations between network nodes| |
| [join](#join)   | string | Public network name to join, like `mainnet`, `rinkeby`, and `goerli` | |
| [consensus](#consensus) | string | Network consensus algorithm name, like `poa`, `pow`, and `ibft2`| |
| [highlyAvailable](#highly-available) | boolean | Ethereum nodes will be scheduled on different kubernetes nodes | `false` |
| [topologyKey](#topology-key) | string | kubernetes node label key used to distribute ethereum nodes | `topology.kubernetes.io/zone` |
| [genesis](#genesis)   | object | Genesis block configuration | |
| [nodes](#nodes) | array | Array of node objects | |

here's an example of a `Network` in `ethereum.kotal.io/v1alpha1` group:

```yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: rinkeby
  nodes:
    - name: node-1
      client: geth
```

## id

`id` is the network id used for p2p communications between network nodes in private networks.

`id` is required in private networks.

`id` can't be provided while joining a public network.

`id` can't be updated (immutable).

## join

`join` is the public network name to join, like `rinkeby`.

`join` can't be provided in private networks.

`join` can't be updated (immutable).

## consensus

`consensus` is the network consensus algorithm name, like `ibft2`.

`consensus` is required in private networks.

`consensus` possible values are `poa`, `pow` or `ibft2`.

`consensus` can't be updated (immutable).

## highly available

`highlyAvailable` controls if Ethereum nodes will be scheduled on different Kubernetes nodes.

## topology key

`topologyKey` is Kubernetes node label key used to distribute ethereum nodes pods on different kubernetes nodes.

## genesis

`genesis` is the genesis block configuration.

`genesis` block is required in private networks.

`genesis` can't be updated (immutable).

For extensive details, check [genesis](genesis) reference.

## nodes

`nodes` is the Network nodes.

`nodes` is required, at least one node must be specified.

:::info
nodes in the network `.spec.nodes` are named nodes, require a `name` value.
:::

:::warning
Network `id`, `join`, `consensus`, `genesis`, `highlyAvailable`, `topologyKey` will override node values, so don't specify these values in the `.spec.nodes` because they won't take effect.
:::

For extensive details, check [node](node) reference.