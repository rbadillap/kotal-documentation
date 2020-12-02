---
title: Private IBFT2 Network
---

Using Kotal, you can create ibft2 networks.

:::caution
Go-Ethereum and Parity (OpenEthereum) doesn't support ibft2 consensus. Use Hyperledger Besu client instead.
:::

When creating private networks, `id`, `consensus` and `genesis` config are required. Here's an example of a single miner besu node ibft2 network.

Here's an example of 5 nodes ibft2 network, 3 of them are validators.

```yaml
# ibft2.yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: ibft2-network
spec:
  # highlight-next-line
  consensus: ibft2
  id: 55555
  # genesis block
  genesis:
    chainId: 55555
    # highlight-start
    ibft2:
      validators:
        - "0x427e2c7cecd72bc4cdd4f7ebb8bb6e49789c8044"
        - "0xd2c21213027cbf4d46c16b55fa98e5252b048706"
        - "0x8e1f6c7c76a1d7f74eda342d330ca9749f31cc2b"
    # highlight-end
    accounts:
      - address: "0x48c5F25a884116d58A6287B72C9b069F936C9489"
        balance: "0x152d02c7e14af6800000"
  # nodes
  nodes:
    - name: node-1
      bootnode: true
      # highlight-next-line
      nodekey: "0x608e9b6f67c65e47531e08e8e501386dfae63a540fa3c48802c8aad854510b4e"
      rpc: true
      rpcAPI:
        - ibft
    - name: node-2
      # highlight-next-line
      nodekey: "0xb4c6097d5db1fabb037f71e21229d59a0161e0f8d407d787f3ba92f25bd39eaf"
    - name: node-3
      # highlight-next-line
      nodekey: "0xcb9db0b0927a3095eb2dcd82666c6a602e03379e09ac115260091cb68ca5b075"
    - name: node-4
    - name: node-5
```

In the example network above, we created an ibft2 network as indicated by `consensus: ibft2`. The most important setting in ibft2 network genesis is `validators`, we set the accounts `0xd2...06`, `0x42...44` and `0x8e...2b` as the initial block validators. We set the network id and chain id to `55555`, and funded the account `0x48c5F25a884116d58A6287B72C9b069F936C9489` with 100,000 eth :moneybag:

:::info **How node becomes a validator** :pencil2:
Hyperledger besu nodes that use one of the validators accounts' private key as nodekey becomes a validator node.
:::

:::caution **ibft2 network with no validators** :fire:
ibft2 network will be dysfunctional and blocks will not be generated if
* There's no `validators` in the `gensis.ibft2` setting
* No Validator account private key is used by any node
:::

:::note **pre-funded accounts are important in ibft2 networks**
Block validators are not rewarded by eth in ibft2 networks, so the only source of eth in a private ibft2 network is genesis block funded accounts.
:::

Note that we've left most of the genesis block config parameters like `coinbase`, `nonce`, `difficulty` ... etc. 

Kotal will default all these missing fields like setting coinbase to `0x00...00`, nonce to `0x0` and difficulty to `0x0` ... etc. So you can set only parameters that are specific to your network like `chainId` and funded `accounts` in the example above.

Deploy this network manifest and this 5 nodes ibft2 network will be deployed.

```bash
$ kubectl apply -f ibft2.yaml
```

You can fetch deployed Blockchain networks using 

```bash
$ kubectl get networks

NAME              CONSENSUS      NODES
ibft2-network       ibft2            5
```

Check `node-1` logs, and you will find that it producing blocks.

```bash
$ kubectl logs -f <node-1 pod name>
```

check `node-5` logs, and you will find that it only import blocks from its peers.

```bash
$ kubectl logs -f <node-5 pod name>
```

:::note
You can use Hyperledger Besu [ibft2 API](https://besu.hyperledger.org/en/stable/Reference/API-Methods/#ibft-20-methods) to propose, discard, and get validators at any block.
:::

HTTP RPC server was enabled on `node-1` by `rpc: true` and we enabled `ibft` API with `rpcAPI` which accepts a list of RPC APIs to enable.

Let's call node-1 rpc, but first lets forward localhost:8545 calls to node-1 pod

```bash
$ kubectl port-forward <node-1 pod name> 8545

Forwarding from 127.0.0.1:8545 -> 8545
```

In another terminal window call `ibft_getValidatorsByBlockNumber` RPC method

```bash
# request
$ curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_getValidatorsByBlockNumber","params":["latest"], "id":1}' http://127.0.0.1:8545

# response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        "0x427e2c7cecd72bc4cdd4f7ebb8bb6e49789c8044",
        "0xd2c21213027cbf4d46c16b55fa98e5252b048706",
        "0x8e1f6c7c76a1d7f74eda342d330ca9749f31cc2b"
    ]
}
```

Finally you can delete the network and all its resources by

```bash
$ kubectl delete -f ibft2.yaml
```

and kubernetes garbage collector will delete all resources created by the controller :fire: