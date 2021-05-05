---
id: install
title: Installation
---

## Requirements

- Kubernetes v1.11+ cluster
- Cert manager v0.15+

### Kubernetes cluster

For development and testing purposes we recommend using [kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker), it's an easy way to create and tear down kubernetes clusters in seconds.
For staging and production purposes you can use any public cloud kubernetes as a service like [Amazon EKS](https://aws.amazon.com/eks/), [Azure AKS](https://azure.microsoft.com/en-us/services/kubernetes-service/) or [Google GKE](https://cloud.google.com/kubernetes-engine).

kind installation guide can be found [here](https://kind.sigs.k8s.io/docs/user/quick-start/).

### cert-manager

cert-manager is a native Kubernetes certificate management controller. It can help with issuing certificates from a variety of sources, such as [Let’s Encrypt](https://letsencrypt.org), [HashiCorp Vault](https://www.vaultproject.io/), a simple signing key pair, or self-signed. It will ensure certificates are valid and up to date, and attempt to renew certificates at a configured time before expiry.

Kotal **webhook** component uses cert-manager for issuing certificates to default and validate your networks and nodes.

cert-manager installation guide can be found [here](https://cert-manager.io/docs/installation/).

## Install kotal operator

```bash
$ kubectl apply -f https://github.com/kotalco/kotal/releases/download/v0.1-alpha.3/kotal.yaml
```

## Deploy network

Create `rinkeby.yaml` manifest that describes a single node with rpc enabled that will join rinkeby test network.

```yaml
apiVersion: ethereum.kotal.io/v1alpha1
kind: Network
metadata:
  name: network-sample
spec:
  join: rinkeby
  nodes:
    - name: node-1
      rpc: true
```

deploy the network using kubectl

```
$ kubectl apply -f rinkeby.yaml

network.ethereum.kotal.io/network-sample created
```

within a couple of seconds the network will be up and running. you can get the network using

```{1}
$ kubectl get networks

NAME              JOIN      NODES
network-sample    rinkeby   1
```

get the pods by

```{1}
$ kubectl get pods

NAME                  READY   STATUS    RESTARTS   AGE
network-sample-node   1/1     Running   0          1m
```

get logs of rinkeby node-1

```{1}
$ kubectl logs -f network-sample-node-1
```

finally delete the network that sync rinkeby by

```
$ kubectl delete network network-sample

network.ethereum.kotal.io "network-sample" deleted
```

Congratulations! you have deployed your first network that connects to Rinkeby test network and syncs its blockchain.
