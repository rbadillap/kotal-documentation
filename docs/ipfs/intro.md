---
title: Introduction
---

Kotal extended Kubernetes with `Swarm` custom resource in the `ipfs.kotal.io/v1alpha1` group version which can be used to create IPFS swarm of nodes simply be deploying a swarm description manifest.

Kotal swarm controller is watching for any new swarm or updating existing swarms to do its magic.
Here's an example of IPFS swarm of 1 node:

```yaml
apiVersion: ipfs.kotal.io/v1alpha1
kind: Swarm
metadata:
  name: sample-swarm
spec:
  nodes:
    - name: node-1
      id: "12D3KooWN16bUqeedKUQHXtHJjUT1oEyFBr6YnKQ7B4LSTAnbTye"
      privateKey: "CAESQMbyIcsxBsn8kIk9sbL2NdVwSBf/Uj9BOA5KbXnrgmNHtQwF4rgzxd2XXpmdhIBxnlghaYVNBLzcRj2f6PCKnD0="
      profiles:
        - server
        - flatfs
```