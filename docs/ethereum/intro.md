---
title: Introduction
---

Kotal extended Kubernetes with `Network` custom resource in the `ethereum.kotal.io/v1alpha1` group version.
Kotal network controller is watching for any new network deployments or updating an existing network to do its magic.
Here's an example of Ethereum network of 1 node joining rinkeby testnet:

```yaml {1-2}
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: rinkeby
  nodes:
    - name: node-1
      rpc: true
```

Kotal supports joining Ethereum public networks like [mainnet](examples/mainnet), [ropsten](examples/ropsten), [rinkeby](examples/rinkeby), [goerli](examples/goerli) and creating private consortium networks using different consensus algorithms like [proof of work](examples/pow), [proof of authority](examples/poa) and [IBFT2](examples/ibft2).

## Multi-client Support
Kotal supports the following Ethereum 1 clients:
* [Hyperledger Besu](https://besu.hyperledger.org)
* [Go-Ethereum (Geth)](https://geth.ethereum.org)
* [Parity (OpenEthereum)](https://www.parity.io/ethereum/).

```yaml {9,11,13}
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: rinkeby
  nodes:
    - name: node-1
      client: besu
    - name: node-2
      client: geth
    - name: node-2
      client: parity
```
A single network deployed by kotal can run both hyperledger Besu and Go-ethereum as long as the network underlying consensus algorithm is supported by both clients. Both Hyperledger Besu, Go-Ethereum (Geth) and Parity (OpenEthereum) supports PoA and PoW public and private networks.