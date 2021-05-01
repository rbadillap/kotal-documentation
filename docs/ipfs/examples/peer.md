---
title: Create IPFS Peer
---

Using `Peer` resource, you can deploy ipfs peers which will join the public ipfs swarm by default.

![ipfs peer](/img/ipfs-peer.png)

```yaml
# peer.yaml
# highlight-start
apiVersion: ipfs.kotal.io/v1alpha1
kind: Peer
# highlight-end
metadata:
  name: peer-sample
# highlight-next-line
spec: {}
```

Deploying this manifest will deploy a basic (but powerful :muscle:) ipfs peer which will starts with the all default settings that's similar to running `ipfs init` then `ipfs daemon` on your machine.

Let's deloy the above manifest.

```bash
$ kubectl apply -f peer.yaml
```

Kotal `Peer` controller will get a notification that a new `Peer` resource has been deployed, and will create all the Kubernetes resources (pod, service, configmap) necessary for it to work as expected. You can verify peer resources has been created by fetching all peers:

```bash
$ kubectl get peers # kubectl get peers.ipfs.kotal.io

NAME          CLIENT
peer-sample   go-ipfs
```

From the output above, we can confirm that ipfs peer `peer-sample` has been deployed and using [go-ipfs](https://github.com/ipfs/go-ipfs) client.

Get the pod created by our peer:

```bash
$ kubectl get pods

NAME            READY   STATUS    RESTARTS   AGE
peer-sample-0   1/1     Running   0          5m
```

Check the logs of the running peer:

```bash
$ kubectl logs peer-sample-0
```

You'll get output similar to the following:

```bash
Initializing daemon...
go-ipfs version: 0.8.0-ce693d7
Repo version: 11
System version: amd64/linux
Golang version: go1.14.4
Swarm listening on /ip4/10.244.0.6/tcp/4001
Swarm listening on /ip4/10.244.0.6/udp/4001/quic
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip4/127.0.0.1/udp/4001/quic
Swarm listening on /ip6/::1/tcp/4001
Swarm listening on /ip6/::1/udp/4001/quic
Swarm listening on /p2p-circuit
Swarm announcing /ip4/10.244.0.6/tcp/4001
Swarm announcing /ip4/10.244.0.6/udp/4001/quic
Swarm announcing /ip4/127.0.0.1/tcp/4001
Swarm announcing /ip4/127.0.0.1/udp/4001/quic
Swarm announcing /ip6/::1/tcp/4001
Swarm announcing /ip6/::1/udp/4001/quic
# highlight-start
API server listening on /ip4/0.0.0.0/tcp/5001
WebUI: http://0.0.0.0:5001/webui
Gateway (readonly) server listening on /ip4/0.0.0.0/tcp/8080
Daemon is ready
# highlight-end
```

Congratulations :fire: your peer is up and running and ready to receive api calls.

Let's forward localhost:5001 calls to peer-sample container:5001

```bash
$ kubectl port-forward peer-sample-0 5001

Forwarding from 127.0.0.1:5001 -> 5001
Forwarding from [::1]:5001 -> 5001
```

Let's read ipfs readme file by send http api call using cURL:

```bash
curl -X POST "http://127.0.0.1:5001/api/v0/cat?arg=QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc/readme"
```

You'll get the following result:

```txt
Hello and Welcome to IPFS!

██╗██████╗ ███████╗███████╗
██║██╔══██╗██╔════╝██╔════╝
██║██████╔╝█████╗  ███████╗
██║██╔═══╝ ██╔══╝  ╚════██║
██║██║     ██║     ███████║
╚═╝╚═╝     ╚═╝     ╚══════╝

If you're seeing this, you have successfully installed
IPFS and are now interfacing with the ipfs merkledag!

 -------------------------------------------------------
| Warning:                                              |
|   This is alpha software. Use at your own discretion! |
|   Much is missing or lacking polish. There are bugs.  |
|   Not yet secure. Read the security notes for more.   |
 -------------------------------------------------------

Check out some of the other files in this directory:

  ./about
  ./help
  ./quick-start     <-- usage examples
  ./readme          <-- this file
  ./security-notes
```

You can view ipfs webui by visiting http://0.0.0.0:5001/webui

Finally, delete the ipfs peer `peer-sample`, and Kubernetes will delete all resources created for the peer by kotal ipfs peer controller like pods, services ... etc:

```bash
$ kubectl delete peers peer-sample

peers.ipfs.kotal.io "peer-sample" deleted
```

:fire:
