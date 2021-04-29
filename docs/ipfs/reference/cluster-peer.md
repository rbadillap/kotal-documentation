---
title: ClusterPeer
---

```yaml
apiVersion: ipfs.kotal.io/v1alpha1
kind: ClusterPeer
metadata:
  Name: my-cluster-peer
spec:
  # your cluster peer spec goes here
```

`ClusterPeer` resource spec parameters are summrized in the following table:

| Syntax                                           | Type   | Description                                             | Default                    |
| ------------------------------------------------ | ------ | ------------------------------------------------------- | -------------------------- |
| [id](#id)                                        | string | Cluster peer ID                                         |                            |
| [privatekeySecretName](#privatekeysecretname)    | string | Name of the k8s secret holding cluster peer privatekey  | `*` if consensus is `crdt` |
| [trustedPeers](#trustedpeers)                    | array  | Peer IDs that can manage the pinset in `crdt` consensus |                            |
| [bootstrapPeers](#bootstrappeers)                | array  | Peers to connect to on startup                          |                            |
| [consensus](#consensus)                          | string | Cluster consensus algorithm                             | `crdt`                     |
| [peerEndpoint](#peerendpoint) required           | string | ipfs peer http API endpoint                             |                            |
| [clusterSecretName](#clustersecretname) required | string | Name of the k8s secret holding cluster secret           |                            |
| [resources](#resources)                          | object | Compute and storage resources                           |                            |

## id

`id` is cluster peer id derived from private key.

`id` is required if `privatekeySecretName` is provided.

`id` can be generated using [ipfs-key](https://github.com/whyrusleeping/ipfs-key) tool.

```bash
$ ipfs-key -type ed25519 | base64

Generating a 2048 bit ed25519 key...
Success!
# highlight-next-line
ID for generated key: 12D3KooWT2bqgwZPxHthAGBV9Ut8ZLraz1LARtB7vG3mF26Mtof1
CAESQLepaunFGa/PI0oNS3plrbVSInqab/X/U1laEDe2V2cL/7kbF9H6x3xBiwpbVnYT/jDA8EhAznXALlbwzEsuKaw=
```

## privatekeySecretName

`privatekeySecretName` is the name of the k8s secret holding **base64** cluster peer privatekey in a key called `key`.

`privatekeySecretName` is required if `id` is provided.

`privatekeySecretName` can be generated using [ipfs-key](https://github.com/whyrusleeping/ipfs-key) tool.

```bash
$ ipfs-key -type ed25519 | base64

Generating a 2048 bit ed25519 key...
Success!
ID for generated key: 12D3KooWT2bqgwZPxHthAGBV9Ut8ZLraz1LARtB7vG3mF26Mtof1
# highlight-next-line
CAESQLepaunFGa/PI0oNS3plrbVSInqab/X/U1laEDe2V2cL/7kbF9H6x3xBiwpbVnYT/jDA8EhAznXALlbwzEsuKaw=
```

## trustedPeers

`trustedPeers` is a list of peer IDs that can manage the cluster pinset in `crdt` consensus clusters.

`trustedPeers` is ignored in `raft` consensus clusters.

`trustedPeers` default value is `*` which is trust all peers.

## bootstrapPeers

`bootstrapPeers` is a list of peers to connect to on startup.

:::caution
`bootstrapPeers` will be trusted peers in `crdt` clusters.
:::

## consensus

`consensus` is the cluster consensus algorithm.

## peerEndpoint

`peerEndpoint` id ipfs peer http API endpoint.

`peerEndpoint` is required for the cluster peer to function correctly.

## clusterSecretName

`clusterSecretName` is the k8s secret name holding **32-bit hex-encoded** _(without 0x)_ cluster secret in a key called `secret`.

`clusterSecretName` can be generated using openssl tool:

```bash
$ CLUSTER_SECRET=$(openssl rand -hex 32)
$ kubectl create secret generic cluster-secret --from-literal=secret=$(CLUSTER_SECRET)
```

## resources

`resources` allocates compute and storage resources to the peer.

`resources` object has the following fields:

| Syntax      | Type   | Description                                 | Defalt |
| ----------- | ------ | ------------------------------------------- | ------ |
| cpu         | string | number of cpu cores this peer requires      | `1`    |
| cpuLimit    | string | number of cpu cores this peer is limited to | `2`    |
| memory      | string | memory this peer requires                   | `2Gi`  |
| memoryLimit | string | memory this peer is limited to              | `4Gi`  |
| storage     | string | disk space this peer requires               | `10Gi` |

Memory and storage requests and limits must use the pattern `^[1-9][0-9]*[KMGTPE]i$` for example `1500Mi`, `30Gi`, and `1Ti`.

cpu requests and limits must use the pattern `^[1-9][0-9]*m?$` for example `1000m` (which is equal to `1` core), `1500m` which is 1.5 core, `2` cores, and `4` cores.

`cpuLimit` can't be less than `cpu`.

`memoryLimit` can't be less than or equal to `memory`.
