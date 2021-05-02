---
title: Introduction
---

IPFS is a distributed system for storing and accessing files, websites, applications, and data.

Kotal extended Kubernetes with `Swarm`, `Peer` and `ClusterPeer` custom resources in `ipfs.kotal.io/v1alpha1` group version which can be used to deploy IPFS peers, swarms, and clusters simply by describing them, and kotal will take care of all the complexities like configuration management, resources management, service discovery ... etc.

## Peer

`Peer` is an ipfs peer running `go-ipfs` client and connecting to the public ipfs swarm or a private swarm secured by swarm key. Here's an example of a very basic ipfs peer connecting to the public ipfs swarm.

```yaml
# highlight-start
apiVersion: ipfs.kotal.io/v1alpha1
kind: Peer
# highlight-end
metadata:
  Name: simple-peer
spec: {}
```

For all the fields associated with the `Peer` API resource:

```bash
# describe all the fields associated with Peer API resource
$ kubectl explain peers
$ kubectl explain peers.spec
```

Full ipfs peer reference is documented [here](reference/peer).

## ClusterPeer

`ClusterPeer` is an ipfs cluster peer running `ipfs-cluster-service` client, connecting to ipfs peer and optional bootstrap cluster peer(s). `ClusterPeer`s provide data orchestration across a swarm of IPFS daemons by allocating, replicating and tracking a global pinset distributed among multiple peers. Here's an example of cluster peer connecting to ipfs peer.

```yaml
# highlight-start
apiVersion: ipfs.kotal.io/v1alpha1
kind: ClusterPeer
# highlight-end
metadata:
  Name: simple-peer
spec:
  peerEndpoint: /dns4/ifps-peer/tcp/5001
```

For all the fields associated with the `ClusterPeer` API resource:

```bash
# describe all the fields associated with ClusterPeer API resource
$ kubectl explain clusterpeers
$ kubectl explain clusterpeers.spec
```

Full ipfs cluster peer reference is documented [here](reference/cluster-peer).

## Swarm

:::caution Deprecation Notice
`Swarm` resource and controller will be removed in future versions. IPFS swarms can be created using `Peer` resource.
:::

```yaml
apiVersion: ipfs.kotal.io/v1alpha1
kind: Peer
metadata:
  name: sample-peer
spec:
  routing: dhtclient
```
