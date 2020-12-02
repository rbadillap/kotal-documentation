---
title: Introduction
---

Kotal extended Kubernetes with `Node` and `Network` custom resource in the `ethereum.kotal.io/v1alpha1` group version.


## Node 
`Node` is a single Ethereum node joining a public or private network.

Example of Go Ethereum (Geth) `Node` joining Ethereum main network:

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

## Network

`Network` is a set of Ethereum nodes sharing same network config like genesis block and connecting to each other and joining public or private network.

Network controller will create [nodes](#node) from the nodes in the network `.spec.nodes` array, you can verify this by getting nodes after network creation.

```bash
$ kubectl get networks.ethereum.kotal.io
$ kubectl get nodes.ethereum.kotal.io
```

Kotal supports joining Ethereum public networks like [mainnet](examples/mainnet), [ropsten](examples/ropsten), [rinkeby](examples/rinkeby), [goerli](examples/goerli) and creating private consortium networks using different consensus algorithms like [proof of work](examples/pow), [proof of authority](examples/poa) and [IBFT2](examples/ibft2).

Example of multi-client Ethereum `Network` of 2 nodes running geth and besu clients respectively joining rinkeby testnet:

```yaml {1-2}
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: rinkeby
  nodes:
    - name: node-1
      client: geth
      bootnode: true
      nodekey: "0x0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: besu

```

## Multi-client Support
Kotal supports the following Ethereum 1 clients:
* [Hyperledger Besu](https://besu.hyperledger.org)
* [Go-Ethereum (Geth)](https://geth.ethereum.org)
* [Parity (OpenEthereum)](https://www.parity.io/ethereum/).

```yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: rinkeby
  nodes:
    - name: node-1
      # highlight-next-line
      client: besu
      bootnode: true
      nodekey: "0x0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      # highlight-next-line
      client: geth
    - name: node-2
      # highlight-next-line
      client: parity
```
A single network deployed by kotal can run both hyperledger Besu and Go-ethereum as long as the network underlying consensus algorithm is supported by both clients. Both Hyperledger Besu, Go-Ethereum (Geth) and Parity (OpenEthereum) supports PoA and PoW public and private networks.