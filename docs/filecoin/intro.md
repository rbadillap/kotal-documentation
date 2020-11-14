---
sidebar_label: Introduction
title: Filecoin
---

Kotal extended Kubernetes with `Node` custom resource in the `filecoin.kotal.io/v1alpha1` group version which can be used to create Filecoin nodes across different filecoin networks like Mainnet or Nerpa simply be deploying a Filecoin node description manifest.

Filecoin node controller is watching for any new Filecoin node or updating existing Filecoin node to do its magic.

Here's an example of a Filecoin node that syncs Nerpa chain:

```yaml
# highlight-next-line
apiVersion: filecoin.kotal.io/v1alpha1
kind: Node
metadata:
  name: nerpa-node
# highlight-start
spec:
  network: nerpa
# highlight-end
```