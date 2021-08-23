---
title: Beacon Node
---

Kotal extended Kubernetes with `BeaconNode` custom resource in the `ethereum2.kotal.io/v1alpha1` group version.

```yaml
apiVersion: ethereum2.kotal.io/v1alpha1
# highlight-next-line
kind: BeaconNode
metadata:
  name: teku-beacon-node
spec:
  join: pyrmont
  client: teku
  rest: true
```

| Syntax                           | Type   | Description                        | Default |
| -------------------------------- | ------ | ---------------------------------- | ------- |
| [join](#join)                    | string | Network to join                    |         |
| [client](#client)                | string | Ethereum 2.0 client to use         | teku    |
| [eth1Endpoints](#eth1-endpoints) | array  | Ethereum 1 JSON RPC endpoints      |         |
| [rest](#rest)                    | bool   | Enable REST API server             | false   |
| [restHost](#rest-host)           | string | REST API server host               | 0.0.0.0 |
| [restPort](#rest-port)           | number | REST API server port               | 5051    |
| [rpc](#rpc)                      | bool   | Enables JSON RPC server            | false   |
| [rpcHost](#rpc-host)             | string | JSON RPC server host               | 0.0.0.0 |
| [rpcPort](#rpc-port)             | number | JSON RPC server port               | 4000    |
| [grpc](#grpc)                    | bool   | GRPC gateway server                | false   |
| [grpcHost](#grpc-host)           | string | GRPC gateway server host           | 0.0.0.0 |
| [grpcPort](#grpc-port)           | number | GRPC gateway server port           | 3500    |
| [p2pPort](#p2p-port)             | number | p2p and discovery port             | 9000    |
| [resources](#resources)          | object | Node compute and storage resources |         |

## join

`join` is Ethereum 2.0 network to join and sync its beacon chain.

## client

`client` is the Ethereum 2.0 client to use.

`client` possible values are `teku`,`prysm`,`lighthouse`, and `nimbus`.

## eth1 endpoints

`eth1Endpoints` is array of Ethereum 1 JSON RPC endpoints.

:::info **Multiple Ethereum 1 JSON RPC Support**
`prysm`, `teku`, and `lighthouse` clients support multiple endpoints in `eth1Endpoints`.

`nimbus` client supports only 1 endpoint in `eth1Endpoints`.
:::

## rest

`rest` enables REST API server.

:::info
REST API server is only supported by `teku` and `lighthouse`.
:::

## rest host

`restHost` is the REST API server host.

## rest port

`restPort` is the REST API server port.

## rpc

`rpc` enables JSON RPC server.

:::info
JSON RPC server is only supported by `nimbus` and `prysm`.
:::

## rpc host

`rpcHost` is the JSON RPC server host.

## rpc port

`rpcPort` is the JSON RPC server port.

## grpc

`grpc` enables GRPC gateway server.

:::info
GRPC gateway is only supported by `prysm` client.
:::

## grpc host

`grpcHost` is the GRPC gateway server host.

## grpc port

`grpcPort` is the GRPC gateway server port.

## p2p port

`p2pPort` is the p2p and discovery port.

## resources

`resources` allocates compute and storage resources to the node.

`resources` object has the following fields:

| Syntax      | Type   | Description                                 | Defalt  |
| ----------- | ------ | ------------------------------------------- | ------- |
| cpu         | string | number of cpu cores this node requires      | `4`     |
| cpuLimit    | string | number of cpu cores this node is limited to | `8`     |
| memory      | string | memory this node requires                   | `8Gi`   |
| memoryLimit | string | memory this node is limited to              | `16Gi`  |
| storage     | string | disk space this node requires               | `200Gi` |
| storageClass | string | Node volume storage class                  | Cluster's default storage class will be used as defined by cluster admin or cloud provider  |

memory and storage requests and limits must use the pattern `^[1-9][0-9]*[KMGTPE]i$` for example `1500Mi`, `30Gi`, and `1Ti`.

cpu requests and limits must use the pattern `^[1-9][0-9]*m?$` for example `1000m` (which is equal to `1` core), `1500m` which is 1.5 core, `2` cores, and `4` cores.

`cpuLimit` can't be less than `cpu`.

`memoryLimit` can't be less than `memory`.

`storageClass` field is immutable, it cannot be changed after creation.

