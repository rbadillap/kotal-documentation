---
title: Join Ropsten
---

Ropsten is a Proof of Work public Ethereum multi-client test network typically used by developers to test their decentralized applications.

```yaml {7}
# ropsten.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: ropsten
  nodes:
    - name: node-1
      client: geth
```

Using kotal you can join Ropsten test network simply by deploying this network mainfest.

```bash
$ kubectl apply -f ropsten.yaml
```

Kotal will create a blockchain network of a single node `name: node-1` that connects to and sync Ropsten test network blockchain as indicated by the highlighted line `join: ropsten`. This node will use Go-Ethereum client as indicated by `client: geth`.

You can fetch deployed Blockchain networks using 

```bash
$ kubectl get networks

NAME              JOIN      NODES
network-sample    ropsten   1
```

Lets add 1 more Hyperledger besu node, and enable GraphQL server on port 9999.

:::info
keep in mind that in multiple nodes network, thet first node must be a bootnode by setting `bootnode: true` and adding a `nodekey`.
:::

```yaml {13-16}
# ropsten.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: ropsten
  nodes:
    - name: node-1
      client: geth
      bootnode: true
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: besu
      graphql: true
      graphqlPort: 9999
```

Get the deployed network 

```bash
$ kubectl get network network-sample

NAME              JOIN      NODES
network-sample    ropsten   2
```

GraphQL server was enabled by `graphql: true` and listening port was changed by `graphqlPort: 9999`.

Let's call node-2 GraphQL API, but first lets forward localhost:9999 calls to node-2 pod

```bash
$ kubectl port-forward <node-2 pod name> 9999

Forwarding from 127.0.0.1:9999 -> 9999
```

In another terminal query syncing status

```bash
# request
curl -X POST --data '{ "query": "{syncing{startingBlock currentBlock highestBlock}}"}' http://localhost:9999/graphql

# response
{
  "syncing":{
    "startingBlock": 20,
    "currentBlock": 40,
    "highestBlock": 60,
  }
}
```

Finally you can delete the network and all its resources by

```bash
kubectl delete -f ropsten.yaml
```

and kubernetes garbage collector will delete all resources created by the controller.