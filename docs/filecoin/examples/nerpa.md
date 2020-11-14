---
title: Join Nerpa Network
---

Filecoin nodes can be deployed to sync Nerpa test network simply by deploying a Filecoin node manifest:

```yaml
# nerpa.yaml
apiVersion: filecoin.kotal.io/v1alpha1
kind: Node
metadata:
  name: nerpa-node
spec:
  network: nerpa
```

Apply this manifest using kubectl:

```bash
$ kubectl apply -f nerpa.yaml
```

Kotal will create a single filecoin node that syncs Nerpa Filecoin test network, you can verify by getting pods in the default namepsace by:

```
$ kubectl get pods
```

you will get output similar to this

```
NAME                      READY   STATUS    RESTARTS   AGE
pod/nerpa-node-0          1/1     Running   0          10s
```

Check the logs of `nerpa-node` by:

```
$ kubectl logs <nerpa-node pod name>
```

You will get nerpa sync logs.

Let's send an API call to `nerpa-node`, but first lets forward `hocalhost:1234` calls to `nerpa-node` pod

```bash
$ kubectl port-forward <nerpa-node pod name> 1234

Forwarding from 127.0.0.1:1234 -> 1234
Forwarding from [::1]:1234 -> 1234
```

In another terminal window, send `Filecoin.ChainHead` API call

:::info
lotus node token can be found inside nerpa-node pod in `/mnt/data/token` file.
Can be retrieved by
```bash
$ kubectl exec nerpa-node-0 -- cat /mnt/data/token
```
:::

```bash
curl --location --request POST 'http://127.0.0.1:1234/rpc/v0' \
--header 'Authorization: Bearer <lotus node token>' \
--header 'Content-Type: application/json' \
--data-raw '{
"jsonrpc": "2.0",
"method": "Filecoin.ChainHead",
"id": 1,
"params": []
}
```

You'll get a result similar to this

```json
{
  "jsonrpc": "2.0",
  "result": {
    "Cids": [
      {
        "/": "bafy2bzacearlga6bkmku2c4x57oardishkmy6nd6mjjz2xxap3eokighlcz74"
      }
    ],
    "Blocks": [
      {
        "Miner": "t01000",
        "Ticket": {
          "VRFProof": "ppZjEgJL5c5tSSuziHvzfsvxDquMhDsXEf3kYzUCMJBoJ94D6It8vpZhBz7iysKOGUJrqRw8C+AoiV0zupWDa5zIpnlkafNc1mxFpMX751w5vJHuomVIse3rJZJlGmgn"
        },
        "ElectionProof": {
          "WinCount": 3,
          "VRFProof": "mImCqI4z+Y/IhzcxeY3PXhl2DlYX3FlXhjIrzGdaymhyFdZ0xBKj+D7KmiYnjhOsCs9yZ5wuBj2FOD9MYef16NAQ6XVwoC0gnmohYEZUVYkeoY0v476uThbIFm3QdNjN"
        },
        "BeaconEntries": [
          {
            "Round": 331440,
            "Data": "iL9PJq0/ow/2gL5AKShR5pdfOvWjisOkuPOXdf5DMu+wPT4ByuWNxg8+pTt8XAE8GPeJvNMJtR/LjhP1VbJVa8s3AJ19ttEqusmB/NT+KIQe602etzxBqWyK/5+p2zyp"
          }
        ],
        "WinPoStProof": [
          {
            "PoStProof": 2,
            "ProofBytes": "mCZ3wS57/KlVCMAGmMS3lWbg5ZBOW1atI9qaOahbD6TEqs1uoUAoXq9+48WHhXMlpMr0KOA9ditjtg8XZqb/YO6NV+WAX1AhlXfzgcbu1WALMTkhdQ39i0fdAGFo5Z0yBihLkpEf+d3Lp3xT2+AUf4kM9IWTjT5eKzuI8BTWcSHbrGQN9fwA4dTyicH/OOwwjoriuwVeytRtTdVv3wF8uQouRiDqgfzrx4MEhyHETdN3fLVus/TOnhQRqkgeacbb"
          }
        ],
        "Parents": [
          {
            "/": "bafy2bzacebjctnak5ltmoscff5e4pdnnxx6jp4xr6uxujnt4dlsfbyvkihdxg"
          }
        ],
        "ParentWeight": "503182280",
        "Height": 32010,
        "ParentStateRoot": {
          "/": "bafy2bzaceawp5d4oinc3xdufvjqfj3y65oercfthj7d5x5t3yyt4ose6pjxco"
        },
        "ParentMessageReceipts": {
          "/": "bafy2bzacedswlcz5ddgqnyo3sak3jmhmkxashisnlpq6ujgyhe4mlobzpnhs6"
        },
        "Messages": {
          "/": "bafy2bzacecmda75ovposbdateg7eyhwij65zklgyijgcjwynlklmqazpwlhba"
        },
        "BLSAggregate": {
          "Type": 2,
          "Data": "wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        },
        "Timestamp": 1605374280,
        "BlockSig": {
          "Type": 2,
          "Data": "kY75fEGswzFYz5Afd6/abycmiFzWvK13GQYrcRaG4iSE97Exie1/BCQdWZSqL8dBA52TGxsEsOiaB8bf6deUE4b0ES+DjjIYH2K2EBGHh8ewDfR+Hwwo6jhdR9dY1JVj"
        },
        "ForkSignaling": 0,
        "ParentBaseFee": "100"
      }
    ],
    "Height": 32010
  },
  "id": 1
}
```

Finally you can delete the filecoin node and all its resources by

```bash
kubectl delete -f nerpa.yaml
```

and kubernetes garbage collector will delete all resources created by the node controller.
