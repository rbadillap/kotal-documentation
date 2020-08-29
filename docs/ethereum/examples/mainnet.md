---
title: Join Mainnet
---

```yaml {7}
# mainnet.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: mainnet
  nodes:
    - name: node-1
      rpc: true
```

Using kotal you can join ethereum main network simply by deploying this network manifest.

```bash
$ kubectl apply -f mainnet.yaml
```

Kotal will create a blockchain network of a single node `name: node-1` that connects to and sync mainnet blockchain as indicated by the highlighted line `join: mainnet`. This node will start with the default client Hyperledger Besu and HTTP RPC server enabled as indicated by `rpc: true` on listening on default port 8545.

You can add another node that run Go-Ethereum to the network simply by appending another node to the `nodes:` list, but keep in mind that in multiple nodes network, the first node must be a boot node by setting `bootnode: true` and adding a `nodekey`.

```yaml {10-11,13-14}
# mainnet.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: mainnet
  nodes:
    - name: node-1
      bootnode: true
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
      rpc: true
    - name: node-2
      client: geth
```

let's update node-2 by enabling the web socket RPC server and enabling some ws APIs.

```yaml {15-19}
# mainnet.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: mainnet
  nodes:
    - name: node-1
      bootnode: true
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
      rpc: true
    - name: node-2
      client: geth
      ws: true
      wsAPI:
        - web3
        - eth
        - net
```

The web socket server was enabled by `ws: true` and we enabled we3, eth and net by `wsAPI`.

Finally you can delete the network and all its resources by

```bash
kubectl delete -f mainnet.yaml
```

and Kubernetes garbage collector will delete all resources created by the controller.