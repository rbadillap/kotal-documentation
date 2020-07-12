---
title: Join Rinkeby
---

```yaml {7}
# rinkeby.yaml
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

Using kotal you can join Rinkeby test network simply by deploying this network mainfest.

```bash
$ kubectl apply -f rinkeby.yaml
```

Kotal will create a blockchain network of a single node `name: node-1` that connects to and sync Rinkeby test network blockchain as indicated by the highlighted line `join: rinkeby`. This node will use Go-Ethereum client as indicated by `client: geth`.

You can fetch deployed Blockchain networks using 

```bash
$ kubectl get networks

NAME              JOIN      NODES
network-sample    rinkeby   1
```

Lets add 3 more nodes -It's free :smile:- 2 of them running Hyperledger Besu.

:::info
keep in mind that in multiple nodes network, thet first node must be a bootnode by setting `bootnode: true` and adding a `nodekey`.
:::

```yaml {13-18}
# rinkeby.yaml
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
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: besu
    - name: node-3
      client: geth
    - name: node-4
      client: besu
```

Get the deployed network 

```bash
$ kubectl get network network-sample

NAME              JOIN      NODES
network-sample    rinkeby   4
```

let's update node-2 by enabling HTTP RPC server and enabling only net RPC API.

```yaml {15-17}
# rinkeby.yaml
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
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: besu
      rpc: true
      rpcAPI:
        - net
    - name: node-3
      client: geth
    - name: node-4
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
  "result":"0x3"
}
```

node-2 reports that it has 3 peers: node-1, node-3 and node-4 :heart_eyes:	

Finally you can delete the network and all its resources by

```bash
kubectl delete -f rinkeby.yaml
```

and kubernetes garbage collector will delete all resources created by the controller.