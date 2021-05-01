---
title: Create IPFS Swarm
---

:::caution Deprecation Notice
`Swarm` resource and controller will be removed in future versions. IPFS swarms can be created using `Peer` resource.
:::

IPFS Swarm of nodes are ipfs nodes that connect to each others but don't share the same pin set like [ipfs cluster](https://cluster.ipfs.io).

```yaml
# swarm.yaml
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

    - name: node-2
      id: "12D3KooWCHgCddSVSLigTSyUATtq2SicYSSVPTn9xMRFv49D4Gwd"
      privateKey: "CAESQF+tQn8qXgNR9ssoBV7xjPrgGB3dAgp5/M8VNNQjr7B5JLZx9nOY/4bllbCbc2Cq6xB9vVC43LuF8nIcitLVDvQ="
      profiles:
        - lowpower
```

Using kotal you can create ipfs swarm simply by deploying this swarm mainfest.

```bash
$ kubectl apply -f swarm.yaml
```

Kotal will create an ipfs swarm of 2 nodes, the first node `node-1` will use 2 ipfs configuration profiles `server` and `flatfs`. the second node `node-2` wil use only `lowpower` ipfs configuration profile.

As you can see from the example swarm above, each node starts with a pre-generated private key `privateKey` using [ipfs-key](https://github.com/whyrusleeping/ipfs-key) tool and indentity `id` to make it easy to establish network between the nodes.

After applying the swarm manifest, Kotal will create the swarm deployments, volumes, services ... etc for you. Let's check the swarm's pods

```
$ kubectl get pods
```

you will get output similar to this

```
NAME                      READY   STATUS    RESTARTS   AGE
pod/sample-swarm-node-1   1/1     Running   0          10s
pod/sample-swarm-node-2   1/1     Running   0          10s
```

Check the logs of `node-1`

```
$ kubectl logs <node-1 pod name>
```

You will get ouput similar to

```bash
Initializing daemon...
go-ipfs version: 0.6.0-d6e036a
Repo version: 10
System version: amd64/linux
Golang version: go1.14.2
Swarm listening on /ip4/10.244.0.22/tcp/4001
Swarm listening on /ip4/10.244.0.22/udp/4001/quic
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip4/127.0.0.1/udp/4001/quic
Swarm listening on /ip6/::1/tcp/4001
Swarm listening on /ip6/::1/udp/4001/quic
Swarm listening on /p2p-circuit
Swarm announcing /ip4/127.0.0.1/tcp/4001
Swarm announcing /ip4/127.0.0.1/udp/4001/quic
Swarm announcing /ip6/::1/tcp/4001
Swarm announcing /ip6/::1/udp/4001/quic
API server listening on /ip4/127.0.0.1/tcp/5001
WebUI: http://127.0.0.1:5001/webui
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
Daemon is ready
```

Let's send an API call to `node-1`, but first lets forward `hocalhost:5001` calls to `node-1` pod

```bash
$ kubectl port-forward <node-1 pod name> 5001

Forwarding from 127.0.0.1:5001 -> 5001
Forwarding from [::1]:5001 -> 5001
```

In another terminal window, send `get bootstrap peers` API call

```bash
curl -X POST http://127.0.0.1:5001/api/v0/bootstrap
```

You'll get result similar to this

```json
{
  "Peers": [
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
    "/ip4/104.131.131.82/udp/4001/quic/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
  ]
}
```

You can view the ipfs web interface of `node-1` by visiting [http://localhost:5001/webui](http://localhost:5001/webui) in your browser.

Finally you can delete the swarm and all its resources by

```bash
kubectl delete -f swarm.yaml
```

and kubernetes garbage collector will delete all resources created by swarm controller.
