---
title: Introduction
---

IPFS is a distributed system for storing and accessing files, websites, applications, and data.

Kotal extended Kubernetes with `Swarm`, `Peer` and `ClusterPeer` custom resources in `ipfs.kotal.io/v1alpha1` group version which can be used to deploy IPFS peers, swarms, and clusters simply by describing them, and kotal will take care of all the complexities like configuration management, resources management, service discovery ... etc.

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
