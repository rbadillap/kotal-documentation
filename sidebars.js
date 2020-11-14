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
      Filecoin: [
        'filecoin/intro',
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
