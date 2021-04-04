---
title: Node
---

At least one node is required in IPFS Swarm. A node is ipfs client (go-ipfs) running inside a pod with compute and storage resources and scheduled in a kubernetes node.

| Syntax                    | Type   | Description                                       | Default |
| ------------------------- | ------ | ------------------------------------------------- | ------- |
| [name](#name)             | node   | node name                                         |         |
| [id](#id)                 | node   | id is the node identifer derived from private key |         |
| [privateKey](#privatekey) | string | node private key from which the id is derived     |         |
| [profiles](#profiles)     | Array  | list of configuration profiles to apply           |         |
| [resources](#resources)   | Object | node compute and storage resources to alloacte    |         |

## name

`name` is the node name.

`name` is required.

`name` can't be updated (immutable).

## id

`id` is the node identifier.

`id` is required.

`id` can be generated using [ipfs-key](https://github.com/whyrusleeping/ipfs-key) tool.

## privateKey

`privateKey` is the node private key, from which [id](#id) is generated.

`privateKey` is required.

`privateKey` can be generated using [ipfs-key](https://github.com/whyrusleeping/ipfs-key) tool.

```bash
# generate RSA key
$ ipfs-key | base64
# generate Ed25519 Key
$ ipfs-key -type Ed25519 | base64
```

## profiles

`profiles` is the set of ipfs configuration profiles to apply to this node.

`profiles` possible values are:

- `server`
- `randomports`
- `default-datastore`
- `local-discovery`
- `test`
- `default-networking`
- `flatfs`
- `badgerds`
- `lowpower`

## resources

`resources` allocates compute and storage resources to the node.

| Syntax      | Type   | Description                                 | Defalt |
| ----------- | ------ | ------------------------------------------- | ------ |
| cpu         | string | number of cpu cores this node requires      | `1`    |
| cpuLimit    | string | number of cpu cores this node is limited to | `2`    |
| memory      | string | memory this node requires                   | `2Gi`  |
| memoryLimit | string | memory this node is limited to              | `4Gi`  |
| storage     | string | disk space this node requires               | `10Gi` |

memory and storage requests and limits must use the pattern `^[1-9][0-9]*[KMGTPE]i$` for example `1500Mi`, `30Gi`, and `1Ti`.

cpu requests and limits must use the pattern `^[1-9][0-9]*m?$` for example `1000m` (which is equal to `1`), `1500m`, `2`, and `4.`

`cpuLimit` can't be less than `cpu`.

`memoryLimit` can't be less than `memory`.
