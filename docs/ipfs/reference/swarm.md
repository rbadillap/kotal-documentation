---
title: Swarm
---

Kotal extended Kubernetes with `Swarm` custom resource in the `ipfs.kotal.io/v1alpha1` group version.

Swarm is a kubernetes object that has a similar structure to resources you're familiar with like pod and deployment.

```yaml
apiVersion: ipfs.kotal.io/v1alpha1
kind: Swarm
metadata: # swarm name, namespance, labels ...
spec: # swarm spec
```

## Swarm Spec

| Syntax      | Type |  Description | Default |
| ----------- |------| ----------- | ----- |
| [nodes](#nodes) | array | Array of node objects | |

## nodes

`nodes` is the Swarm nodes.

`nodes` is required, at least one node must be specified.

For extensive details, check [node](node) reference.
