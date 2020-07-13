---
title: Create private PoW Network
---

Using Kotal, you can create private cross-client Proof of Work networks.

:::caution
Go-Ethereum doesn't support fixed difficulty Proof of Work networks. Use only Hyperledger Besu if you want PoW with fixed difficulty.
:::

When creating private networks, `id`, `consensus` and `genesis` config are required. Here's an example of a single miner besu node PoW network.

```yaml {7-14,18-19}
# pow.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: pow-network
spec:
  consensus: pow
  id: 9999
  # Genesis block
  genesis:
    chainId: 9999
    accounts:
      - address: "0x48c5F25a884116d58A6287B72C9b069F936C9489"
        balance: "0x152d02c7e14af6800000"
  # nodes
  nodes:
    - name: node-1
      miner: true
      coinbase: "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c"
```

Note that we've left most of the genesis block config parameters like `coinbase`, `nonce`, `difficulty` ... etc. 

Kotal will default all these missing fields like setting coinbase to `0x00...00`, nonce to `0x0` and difficulty to `0x0` ... etc. So you can set only parameters that are specific to your network like `chainId` and prefunded `accounts` in the example above. For more information on defaulting, check the [Defaulting](../defaulting) guide.

In the example network above, we created a proof of work network as indicated by `consensus: pow`, we set the network id to 9999 as indicated by `id: 9999`, we also set genesis chain id to 9999 as indicated by `chainId: 9999` and prefunding the account `0x48c5F25a884116d58A6287B72C9b069F936C9489` with 100,000 eth :moneybag:

Deploy this network mainfest and this single node miner will be deployed.

```bash
$ kubectl apply -f mainnet.yaml
```

You can fetch deployed Blockchain networks using 

```bash
$ kubectl get networks

NAME              CONSENSUS      NODES
pow-network       pow            1
```

Let's update our pow network by adding another Go-Ethereum node.

:::info
keep in mind that in multiple nodes network, thet first node must be a bootnode by setting `bootnode: true` and adding a `nodekey`.
:::

```yaml {20-24}
# pow.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: pow-network
spec:
  consensus: pow
  id: 9999
  # Genesis block
  genesis:
    chainId: 9999
    accounts:
      - address: "0x48c5F25a884116d58A6287B72C9b069F936C9489"
        balance: "0x152d02c7e14af6800000"
  # nodes
  nodes:
    - name: node-1
      miner: true
      coinbase: "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c"
      bootnode: true
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: geth
```

Now we have a 2 node PoW network, the first node `node-1` is mining.

Finally you can delete the network and all its resources by

```bash
$ kubectl delete -f pow.yaml
```

and kubernetes garbage collector will delete all resources created by the controller :fire: