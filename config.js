"use strict";
var global = typeof window !== 'undefined' ? window : self;
global.config = {
    nodeList: [
        "https://node.dynexcoin.org:18334/getheight"
        
    ],
    nodeUrl: "",
    mainnetExplorerUrl: "https://dynex.dyndns.org/home.php",
    mainnetExplorerUrlHash: "https://dynex.dyndns.org/show_transaction.php?tx={ID}",
    mainnetExplorerUrlBlock: "https://dynex.dyndns.org/show_transaction.php?tx={ID}",
    testnetExplorerUrl: "",
    testnetExplorerUrlHash: "",
    testnetExplorerUrlBlock: "",
    testnet: false,
    coinUnitPlaces: 9,
    coinDisplayUnitPlaces: 2,
    txMinConfirms: 9,
    txCoinbaseMinConfirms: 10,
    addressPrefix: 185,
    integratedAddressPrefix: 29,
    addressPrefixTestnet: 111,
    integratedAddressPrefixTestnet: 112,
    subAddressPrefix: 52,
    subAddressPrefixTestnet: 0,
    coinFee: new JSBigInt('1000000'),
    dustThreshold: new JSBigInt('100000'),
    defaultMixin: 0,
    syncBlockCount: 1000,
    coinSymbol: 'DNX',
    openAliasPrefix: "dnx",
    coinName: 'Dynex',
    coinUriPrefix: 'Dynex:',
    avgBlockTime: 120,
    maxBlockNumber: 500000000,
};
var randInt = Math.floor(Math.random() * Math.floor(config.nodeList.length));
config.nodeUrl = config.nodeList[randInt];
