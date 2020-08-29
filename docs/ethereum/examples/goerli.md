---
title: Join Goerli
---

Goerli is public Ethereum Proof of Authority cross-client testnet, synching Parity Ethereum, Geth, Nethermind, Hyperledger Besu (formerly Pantheon), and EthereumJS. This testnet is a community-based project, completely open-source.


```yaml {7}
# goerli.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: goerli
  nodes:
    - name: node-1
      client: geth
```

Using kotal you can join goerli test network simply by deploying this network mainfest.

```bash
$ kubectl apply -f goerli.yaml
```

Kotal will create a blockchain network of a single node `name: node-1` that connects to and sync goerli test network blockchain as indicated by the highlighted line `join: goerli`. This node will use Go-Ethereum client as indicated by `client: geth`.

You can fetch deployed Blockchain networks using 

```bash
$ kubectl get networks

NAME              JOIN      NODES
network-sample    goerli   1
```

Lets add 2 more besu nodes

:::info
keep in mind that in multiple nodes network, the first node must be a boot node by setting `bootnode: true` and adding a `nodekey`.
:::

```yaml {13-18}
# goerli.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: goerli
  nodes:
    - name: node-1
      client: geth
      bootnode: true
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: besu
    - name: node-3
      client: besu
```

Get the deployed network 

```bash
$ kubectl get network network-sample

NAME              JOIN      NODES
network-sample    goerli   3
```

let's update node-2 by enabling the HTTP RPC server and enabling only net RPC API.

```yaml {15-17}
# goerli.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: goerli
  nodes:
    - name: node-1
      client: geth
      bootnode: true
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: besu
      rpc: true
      rpcAPI:
        - net
    - name: node-3
      client: besu
```

RPC HTTP server was enabled by `rpc: true` and we enabled net API with `rpcAPI` which accepts a list of RPC APIs to enable.

Let's call node-2 rpc, but first lets forward localhost:8545 calls to node-2 pod

```bash
$ kubectl port-forward <node-2 pod name> 8545

Forwarding from 127.0.0.1:8545 -> 8545
```

In another terminal window call `net_peersCount` method

```bash
# request
$ curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' localhost:8545

# response
{
  "id":1,
  "jsonrpc":"2.0",
  "result":"0x2"
}
```

node-2 reports that it has 2 peers: node-1 and node-3 :stuck_out_tongue_winking_eye:	

Finally you can delete the network and all its resources by

```bash
kubectl delete -f goerli.yaml
```

and Kubernetes garbage collector will delete all resources created by the controller.