module.exports = {
  someSidebar: [
    'kotal',
    'install',
    {
      Ethereum: [
        'ethereum/intro',
        {Examples: 
          [
            'ethereum/examples/mainnet',
            'ethereum/examples/rinkeby',
            'ethereum/examples/ropsten',
            'ethereum/examples/goerli',
            'ethereum/examples/pow',
            'ethereum/examples/poa',
            'ethereum/examples/ibft2',
          ]
        },
        {Reference: 
          [
            'ethereum/reference/network',
            'ethereum/reference/genesis',
            'ethereum/reference/node',
          ]
        },
      ]
    },
    {
      "Ethereum 2.0": [
        'ethereum2/intro',
        {
          Examples: [
            'ethereum2/examples/beacon',
            'ethereum2/examples/validator',
          ],
          Reference: [
            'ethereum2/reference/beacon',
            'ethereum2/reference/validator',
          ],
        }
      ]
    },
    {
      Filecoin: [
        'filecoin/intro',
        {Examples: 
          [
            'filecoin/examples/mainnet',
            'filecoin/examples/nerpa',
            'filecoin/examples/calibration',
            'filecoin/examples/butterfly',
          ]
        },
        {Reference: 
          [
            'filecoin/reference/node',
          ]
        },
      ],
    },
    {
      IPFS: [
        'ipfs/intro',
        {Examples: 
          [
            'ipfs/examples/swarm'
          ]
        },
        {Reference: 
          [
            'ipfs/reference/swarm',
            'ipfs/reference/node',
          ]
        }
      ],
    }
  ]
};
