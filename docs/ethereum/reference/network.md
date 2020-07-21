---
title: Network
---

Kotal extended Kubernetes with `Network` custom resource in the `ethereum.kotal.io/v1alpha1` group version.

Network is a kubernetes object that has a similar structure to resources you're familiar with like pod and deployment.

```yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata: # network name, namespance, labels ...
spec: # network spec
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

`id` is the network id used for p2p communcations between network nodes in private network.

`id` is required in private networks.

`id` can't be provided while joining a public network.


## join

`join` is the public network name to join, like `rinkeby`.

`join` can't be provided in private networks.

## consensus

`consensus` is the network consensus algorithm name, like `ibft2`.

`consensus` is required in private networks.

`consensus` possible values are `pow`, `pow` or `ibft2`.

## highly available

`highlyAvailable` controls if Ethereum nodes will be scheduled on different kubernetes nodes.

## topology key

`topologyKey` is kubernetes node label key used to distribute ethereum nodes pods on different kubernetes nodes.

## genesis

`genesis` is the genesis block configuration.

`genesis` block is required in private networks.

For extensive details, check [genesis](genesis) reference.

## nodes

`nodes` is the Network nodes.

`nodes` is required, at least one node must be specified.

For extensive details, check [node](node) reference.