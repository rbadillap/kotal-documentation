---
title: Beacon Node
---

> The Beacon Chain is the coordination mechanism of the new network, responsible for creating new blocks, making sure those new blocks are valid, and rewarding validators with ETH for keeping the network secure.
> [Source](https://consensys.net/blog/blockchain-explained/the-ethereum-2-0-beacon-chain-is-here-now-what/)

```yaml
# beacon.yaml
apiVersion: ethereum2.kotal.io/v1alpha1
# highlight-next-line
kind: BeaconNode
metadata:
  name: prysm-beacon-node
# highlight-start
spec:
  join: pyrmont
  client: teku
  rest: true
  restPort: 8888
  eth1Endpoints:
    - http://10.96.181.63:8545
# highlight-end
```

In the example above, we're deploying a beacon node that uses ConsenSys Teku Ethereum 2.0 client `client: teku`, and syncing the pyrmont network beacon chain `join: pyrmont`. We also enable REST API server `rest: true` at port 8888 `restPort: 8888`. We're connecting to Ethereum 1 endpoint `eth1Endpoints: ...`.

Deploy the above beacon node manifest, and kotal will kick in and do everything for you:

```sh
$ kubectl apply -f beacon.yaml

beaconnode.ethereum2.kotal.io/teku-beacon-node created
```

Confirm that the beacon node has been created by:

```sh
$ kubectl get beaconnodes

NAME               AGE
teku-beacon-node   1m
```

Get the pods created for the beacon node:

```sh
$ kubectl get pods

NAME                 READY   STATUS    RESTARTS   AGE
teku-beacon-node-0   1/1     Running   0          1m
```

Get the service created for the beacon node:

```
$ kubectl get services

NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
teku-beacon-node   ClusterIP   10.96.197.218   <none>        9000/UDP,9000/TCP,8888/TCP   7s
```

Forward the localhost:8888 calls to the beacon node

```sh
$ kubectl port-forward teku-beacon-node-0 8888

Forwarding from 127.0.0.1:8888 -> 8888
```

Send REST API call to get chain genesis details:

```sh
curl localhost:8888/eth/v1/beacon/genesis
```

You'll get result similar to the following:

```json
{
  "data": {
    "genesis_time": "1606824023",
    "genesis_validators_root": "0x4b363db94e286120d76eb905340fdd4e54bfe9f06bf33ff6cf5ad27f511bfe95",
    "genesis_fork_version": "0x00000000"
  }
}
```

Finally delete the beacon node and kubernetes will delete all resources created for the beacon node like pods, services ... etc:

```sh
$ kubectl delete beaconnode teku-beacon-node

beaconnode.ethereum2.kotal.io "teku-beacon-node" deleted
```

:fire:
