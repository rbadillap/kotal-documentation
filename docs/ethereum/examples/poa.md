---
title: Private PoA Network
---

Using Kotal, you can create private cross-client Proof of Authority (Clique) networks.

## Single signer network

Here's an example of 2 nodes cross-client network, the first node `node-1` is a signer.

```yaml {7-8,11-18}
# poa.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: poa-network
spec:
  consensus: poa
  id: 4444
  # Genesis block
  genesis:
    chainId: 4444
    clique:
      blockPeriod: 9
      signers:
        - "0xd2c21213027cbf4d46c16b55fa98e5252b048706"
    accounts:
      - address: "0x48c5F25a884116d58A6287B72C9b069F936C9489"
        balance: "0x152d02c7e14af6800000"
  # nodes
  nodes:
    - name: node-1
      client: besu
      bootnode: true
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: geth
```

In the example network above, we created a proof of authority network as indicated by `consensus: poa`, The most important setting in proof of authority network genesis is `signers`, we set the account `0xd2c21213027cbf4d46c16b55fa98e5252b048706` as the only signer. We also set the network id and chain id to `4444` and funding the account `0x48c5F25a884116d58A6287B72C9b069F936C9489` with 100,000 eth :moneybag:

:::info **How node becomes a signer** :pencil2:
Any node can be a signer by importing a private key that corresponds to an address in the genesis `signers` list.
Hyperledger Besu must use the private key as `nodekey` to be a signer.  Go-Ethereum must `import` the address private key and enable mining by `miner` to be a signer.
:::

:::caution **network with no signers or signer nodes** :fire:
The network will be dysfunctional and blocks will not be generated if
* There's no `signers` in the `gensis.clique` setting
* No signer account is imported in any node
:::

:::note **pre-funded accounts are important in PoA networks**
Block signers are not rewarded by eth in PoA networks, so the only way source of eth in a private PoA network is genesis block funded accounts.
:::

Note that we've left most of the genesis block config parameters like `coinbase`, `nonce`, `difficulty` ... etc. Kotal will default all these missing fields like setting coinbase to `0x00...00`, nonce to `0x0` and difficulty to `0x0` ... etc. So you can set only parameters that are specific to your network like `genesis` and funded `accounts` in the example above.

Deploy this network manifest and 2 nodes will be deployed, using PoA clique consensus, the first node only is a signer, can produce and sign blocks, the second node is only syncing the blockchain and can submit and rely transactions.

```bash
$ kubectl apply -f poa.yaml
```

You can fetch deployed Blockchain networks using 

```bash
$ kubectl get networks

NAME              CONSENSUS      NODES
poa-network       poa            2
```

check node-1 logs, and you will find that it produce a new block every 9 seconds as indicated by the `blockPeriod: 9` above.

```bash
$ kubectl logs-f <node-1 pod name>
```

Let's delete the network before starting our next example.

```bash
$ kubectl delete -f poa.yaml
```

## Multiple signers network

Using kotal, you can create multiple signers cross-client network by creating a list of signers in the genesis block `clique.signers` setting.

:::note
You can use the client clique API to add more signers after the genesis block is created using
* Hyperledger Besu [Clique API](https://besu.hyperledger.org/en/stable/HowTo/Configure/Consensus-Protocols/Clique/#adding-and-removing-signers)
* Go-Ethereum [Clique API](https://geth.ethereum.org/docs/rpc/ns-clique) 
:::

In this example we're creating a PoA clique network of 2 signer nodes, the first node using hyperledger besu and using the first signer account private key as `nodekey`, the second node is using Go-Ethereum client and `import`ing the second signer private key and turn on mining.

```yaml {14-16,25,28-30}
# poa.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: poa-network
spec:
  consensus: poa
  id: 4444
  # Genesis block
  genesis:
    chainId: 4444
    clique:
      blockPeriod: 9
      signers:
        - "0xd2c21213027cbf4d46c16b55fa98e5252b048706"
        - "0x2b3430337f12Ce89EaBC7b0d865F4253c7744c0d"
    accounts:
      - address: "0x48c5F25a884116d58A6287B72C9b069F936C9489"
        balance: "0x152d02c7e14af6800000"
  # nodes
  nodes:
    - name: node-1
      client: besu
      bootnode: true
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
    - name: node-2
      client: geth
      import:
        privatekey: "0x5df5eff7ef9e4e82739b68a34c6b23608d79ee8daf3b598a01ffb0dd7aa3a2fd"
        password: "secret"
```

Deploy this network manifest and 2 nodes will be deployed, both of them are producing and signing blocks in their turn.

```bash
$ kubectl apply -f poa.yaml
```

You can fetch deployed Blockchain networks using 

```bash
$ kubectl get networks

NAME              CONSENSUS      NODES
poa-network       poa            2
```

check node-1 logs, and you will find that it produce a new block every 9 seconds as indicated by the `blockPeriod: 9` above.

```bash
$ kubectl logs-f <node-1 pod name>
```

check node-2 logs, and you will find that it produce a new block every 9 seconds.

```bash
$ kubectl logs-f <node-2 pod name>
```

Let's delete the network before starting our next example.

```bash
$ kubectl delete -f poa.yaml
```

and Kubernetes garbage collector will delete all resources created by the controller :fire:
