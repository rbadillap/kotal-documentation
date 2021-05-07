---
title: Introduction
---

Kotal extended Kubernetes with `BeaconNode` and `Validator` custom resources in the `ethereum2.kotal.io/v1alpha1` group version.

:::info
Kotal seperates between beacon node and validator client by using different API resources `BeaconNode` and `Validator`. So you can't run a beacon node and validator client in the same process/container.
:::

## Beacon Node

`BeaconNode` is Ethereum 2.0 beacon node connecting to Ethereum 1 endpoint and syncing the beacon chain.

Here's an example of ConsenSys Teku beacon node `BeaconNode` syncing mainnet beacon chain, connecting to Ethereum 1 JSON RPC endpoint, enabling REST API server which is listening at port 8888:

```yaml
# highlight-start
apiVersion: ethereum2.kotal.io/v1alpha1
kind: BeaconNode
# highlight-end
metadata:
  name: teku-beacon-node
spec:
  join: mainnet
  client: teku
  rest: true
  restPort: 8888
  eth1Endpoints:
    - http://localhost:8545
```

For all the fields associated with the `BeaconNode` API resource:

```bash
# describe all the fields associated with BeaconNode API resource
kubectl explain beaconnode
kubectl explain beaconnode.spec
```

Full beacon node reference is documented [here](reference/beacon).

## Validator Client

`Validator` is Ethereum 2.0 validator client connecting to beacon node endpoint and validating blocks using the loaded keystores.

Here's an example of ConsenSys Teku validator client connecting to beacon node endpoint, validating pyrmont blocks using 1 loaded validator keystore from its secret:

```yaml
# highlight-start
apiVersion: ethereum2.kotal.io/v1alpha1
kind: Validator
# highlight-end
metadata:
  name: teku-validator
spec:
  client: teku
  network: pyrmont
  beaconEndpoints:
    - http://10.96.130.88:9999
  graffiti: Validated by Kotal
  keystores:
    - secretName: my-validator
```

For all the fields associated with the `Validator` API resource:

```bash
# describe all the fields associated with Validator API resource
kubectl explain validator
kubectl explain validator.spec
kubectl explain validator.spec.keystores
```

Full validator client reference is documented [here](reference/validator).

## Multi-client Support

Kotal supports the following Ethereum 2.0 beacon node and validator clients:

- [Teku](https://docs.teku.consensys.net/en/latest/) by ConsenSys.
- [Lighthouse](https://lighthouse-book.sigmaprime.io) by Sigma Prime.
- [Prysm](https://docs.prylabs.network/docs/getting-started/) by Prysmatic Labs.
- [Nimbus](https://nimbus.guide) by Status.

Setting validator or beacon node client is as simple as changing the `spec.client` to the desired client.
