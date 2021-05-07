---
title: Validator Client
---

Kotal extended Kubernetes with `Validator` custom resource in the `ethereum2.kotal.io/v1alpha1` group version.

```yaml
apiVersion: ethereum2.kotal.io/v1alpha1
# highlight-next-line
kind: Validator
metadata:
  name: prysm-validator
spec:
  network: mainnet
  client: prysm
  beaconEndpoints:
    - http://10.96.130.88:9999
  graffiti: Validated by Kotal
  walletPasswordSecret: wallet-password
  keystores:
    - secretName: my-validator
```

| Syntax                                          | Type   | Description                             | Default          |
| ----------------------------------------------- | ------ | --------------------------------------- | ---------------- |
| [network](#network)                             | string | Network to validate blocks for          |                  |
| [client](#client)                               | string | Ethereum 2.0 client to use              | teku             |
| [beaconEndpoints](#beacon-endpoints)            | array  | List of beacon node endpoints           |                  |
| [graffiti](#graffiti)                           | string | Text to include in proposed blocks      | Powered by Kotal |
| [walletPasswordSecret](#wallet-password-secret) | string | Wallet password kubernetes secret       |                  |
| [keystores](#keystores)                         | array  | Validator keystores                     |                  |
| [resources](#resources)                         | object | Validator compute and storage resources |                  |

## network

`network` is the Network to validate blocks for.

## client

`client` is the Ethereum 2.0 client to use.

## beacon endpoints

`beaconEndpoint` is a list of beacon node endpoints.

:::note:::
`lighthouse` is the only client that supports multiple endpoints. All other clients supports only a single endpoint.
:::

## graffiti

`graffiti` is the text to include in proposed blocks.

## wallet password secret

`walletPasswordSecret` is `prysm` wallet password kubernetes secret.

:::note
`walletPasswordSecret` is supported only by `prysm` client.
:::

:::warning
Wallet password secret must be deployed before deploying the validator.

Wallet password secret must contain the password in key named `password`.

```bash
# create k8s secret from password value
kubectl create secret wallet-password --from-literal=password=<actual-password>
# create k8s secret from password file
kubectl create secret wallet-password --from-file=password=<password-file-path>
```

:::

## keystores

`keystores` is array of keystore objects.

| Syntax     | Type   | Description                                              |
| ---------- | ------ | -------------------------------------------------------- |
| secretName | string | kubernetes secret name holding `keystore` and `password` |
| publicKey  | string | Validator public key in hexadecimal                      |

:::note
Validator keystore public key is required in case of `client: lighthouse`
:::

:::warning
Keystore secret must be deployed before deploying the validator.

Keystore secret must contain the BLS12-381 keystore JSON file in `keystore` key, and password in `password` key.

```bash
# create k8s secret from keystore and password file
kubectl create secret my-validator --from-file=keystore=<keystore-file-path> --from-file=password=<password-file-path>
```

:::

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

memory and storage requests and limits must use the pattern `^[1-9][0-9]*[KMGTPE]i$` for example `1500Mi`, `30Gi`, and `1Ti`.

cpu requests and limits must use the pattern `^[1-9][0-9]*m?$` for example `1000m` (which is equal to `1` core), `1500m` which is 1.5 core, `2` cores, and `4` cores.

`cpuLimit` can't be less than `cpu`.

`memoryLimit` can't be less than `memory`.
