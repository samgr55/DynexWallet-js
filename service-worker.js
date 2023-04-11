"use strict";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
workbox.precaching.precacheAndRoute([
  {
    "url": "api.html",
    "revision": "28475d0a445753d40b0fd7bd02f4ec3b"
  },
  {
    "url": "api.js",
    "revision": "b9aa3369f52d7ba09543caa3b7a70fc4"
  },
  {
    "url": "assets/css/font-awesome.css",
    "revision": "c495654869785bc3df60216616814ad1"
  },
  {
    "url": "assets/css/font-awesome.min.css",
    "revision": "269550530cc127b6aa5a35925a7de6ce"
  },
  {
    "url": "assets/css/main.css",
    "revision": "96d8e8b863361897fcaa1f146d3ded70"
  },
  {
    "url": "assets/img/coin_white.png",
    "revision": "c392292dd4fa339a13a254d154f29a5c"
  },
  {
    "url": "assets/img/favicon.ico",
    "revision": "b5d32b32cb438de0083fedb06ef60428"
  },
  {
    "url": "assets/img/icons/icon-128x128.png",
    "revision": "e8fc49dd4614ebb29b2a08364ae4cdfc"
  },
  {
    "url": "assets/img/icons/icon-144x144.png",
    "revision": "1bb9a3b0c2c969c3313f39718a800b61"
  },
  {
    "url": "assets/img/icons/icon-152x152.png",
    "revision": "636502da98ede8d58de006036e7c4e70"
  },
  {
    "url": "assets/img/icons/icon-192x192.png",
    "revision": "ed394964597b47bd4fb6ff9a8eb5f8c0"
  },
  {
    "url": "assets/img/icons/icon-256x256.png",
    "revision": "6b769e089eab3a93a561ff1c33a3eee4"
  },
  {
    "url": "assets/img/icons/icon-402x402.png",
    "revision": "ea00abb5b2502bf7de0aafc91c4b2941"
  },
  {
    "url": "assets/img/landing/75-usersthink-stock-image.jpg",
    "revision": "7a00bbf57aacc5303e846055b6dae1cb"
  },
  {
    "url": "assets/img/landing/balancing.jpg",
    "revision": "d460c7427f9adc5ba695d633e1d0aadc"
  },
  {
    "url": "assets/img/logo_vertical.png",
    "revision": "39c108ce84cd099e9964f2b1e5c206ec"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "753d2388c8d054c8e151229f7da8617f"
  },
  {
    "url": "config.js",
    "revision": "3984addc97302a27100c3d54dbe1bdec"
  },
  {
    "url": "d/vue-i118n.js",
    "revision": "85fd5089c3278f8f544a3691fd38f49b"
  },
  {
    "url": "filters/Filters.js",
    "revision": "d0531d14a6c095a5b8074f78772cc243"
  },
  {
    "url": "index.html",
    "revision": "e111048fe0d8cf644989adf00676c934"
  },
  {
    "url": "index.js",
    "revision": "8c838aa54da44f6ca7f778156dd21103"
  },
  {
    "url": "lib/base58.js",
    "revision": "3d523c0162d6911fd675c9ed1b7389a8"
  },
  {
    "url": "lib/biginteger.js",
    "revision": "f5a873c5716a9d3481501cad3f3e5ca7"
  },
  {
    "url": "lib/cn_utils_native.js",
    "revision": "94d65c88ed19007552b6593fa6fc68d1"
  },
  {
    "url": "lib/cn_utils.js",
    "revision": "931c90bcc1519d2476e75e2d6b42870a"
  },
  {
    "url": "lib/crypto.js",
    "revision": "d51c76b2e08308f8cca1f68c5c298a6f"
  },
  {
    "url": "lib/decoder.min.js",
    "revision": "d4b1f18a71eb23433107d044eedffaa9"
  },
  {
    "url": "lib/FileSaver.min.js",
    "revision": "e8fdc5ad52084fa417f1fec6b6de3b29"
  },
  {
    "url": "lib/jquery-3.2.1.min.js",
    "revision": "c9f5aeeca3ad37bf2aa006139b935f0a"
  },
  {
    "url": "lib/jspdf.min.js",
    "revision": "27385efc6fa2eccc9dde7da0081b1a98"
  },
  {
    "url": "lib/kjua-0.1.1.min.js",
    "revision": "ca69d4f40f8c17ff592123dc35c1ea18"
  },
  {
    "url": "lib/mnemonic.js",
    "revision": "f30940176ec1e71b5a5f0c9b784a98b9"
  },
  {
    "url": "lib/nacl-fast-cn.js",
    "revision": "1fe1387eb865d9e843697a9d315d95b1"
  },
  {
    "url": "lib/nacl-fast.js",
    "revision": "a9c5b4bca7d2aa621a86d5085ce65d03"
  },
  {
    "url": "lib/nacl-fast.min.js",
    "revision": "72444801c9affc1654ef12860c67e976"
  },
  {
    "url": "lib/nacl-util.min.js",
    "revision": "c7b843b9e9b5aad102c855c600c7edc8"
  },
  {
    "url": "lib/nacl.js",
    "revision": "bf72b0a25fc3edf0c1a638aa43642714"
  },
  {
    "url": "lib/nacl.min.js",
    "revision": "d8eaf281c8890a60ebe82840456edc33"
  },
  {
    "url": "lib/numbersLab/Context.js",
    "revision": "c3d56484e477cc7ab43820f1d0151dd0"
  },
  {
    "url": "lib/numbersLab/DependencyInjector.js",
    "revision": "e966d60e4ea0cbbb3e83954f25809ad2"
  },
  {
    "url": "lib/numbersLab/DestructableView.js",
    "revision": "59c6949109c631a00fd66e2b5976c818"
  },
  {
    "url": "lib/numbersLab/Logger.js",
    "revision": "a2bb7aeed4e169b1fbc0f84fcaabe884"
  },
  {
    "url": "lib/numbersLab/Observable.js",
    "revision": "33f408731f8aa1ebfd74ce22830cd5c4"
  },
  {
    "url": "lib/numbersLab/Router.js",
    "revision": "238abb47eb8e8e2b9b915c9b2b1327a0"
  },
  {
    "url": "lib/numbersLab/VueAnnotate.js",
    "revision": "4b76d04f1bb60683e5f2dce414be1310"
  },
  {
    "url": "lib/polyfills/core.min.js",
    "revision": "6ff449122255e7a91fb884ea7016c601"
  },
  {
    "url": "lib/polyfills/crypto.js",
    "revision": "13647291f45a582eee64e000b09d9567"
  },
  {
    "url": "lib/polyfills/textEncoding/encoding-indexes.js",
    "revision": "50f27403be5972eae4831f5b69db1f80"
  },
  {
    "url": "lib/polyfills/textEncoding/encoding.js",
    "revision": "cfc731bd62baec239b2c4daf33b5e810"
  },
  {
    "url": "lib/require.js",
    "revision": "bebd45d1f406bbe61424136b03e50895"
  },
  {
    "url": "lib/sha3.js",
    "revision": "9f298ac7e4ee707645a8d711f3ed916b"
  },
  {
    "url": "lib/sweetalert2.js",
    "revision": "4b69bbd418e85d6efdac5630ed40d76e"
  },
  {
    "url": "lib/vue-i18n.js",
    "revision": "7d220253d58eb13939d24b1b7eb2d884"
  },
  {
    "url": "lib/vue.min.js",
    "revision": "5283b86cbf48a538ee3cbebac633ccd4"
  },
  {
    "url": "manifest.json",
    "revision": "8a7c17cb329614fcee4fbebc7319e762"
  },
  {
    "url": "model/AppState.js",
    "revision": "963b8d795ed88380c0cf57b6067b5e71"
  },
  {
    "url": "model/blockchain/BlockchainExplorer.js",
    "revision": "d6d40c2136d1a323875a08cd9fdf5bd5"
  },
  {
    "url": "model/blockchain/BlockchainExplorerRPCDaemon.js",
    "revision": "b1e0bd14fe8fc79bf23d6e8b1895be12"
  },
  {
    "url": "model/Cn.js",
    "revision": "25ec48a242d1657cd56c52dae257cb62"
  },
  {
    "url": "model/CoinUri.js",
    "revision": "4975d62fc90b98dfd2e8384eece0a75b"
  },
  {
    "url": "model/Constants.js",
    "revision": "fa6c4cb9f91cd94a7eed09ed067525da"
  },
  {
    "url": "model/DeleteWallet.js",
    "revision": "8e1eff759b09125d6939286ea3f73440"
  },
  {
    "url": "model/KeysRepository.js",
    "revision": "999877ca4ac8242b2969d6daf9b24fc3"
  },
  {
    "url": "model/MathUtil.js",
    "revision": "ef17a31d394d467d638cc6328b836ea8"
  },
  {
    "url": "model/Mnemonic.js",
    "revision": "4e8bbe4971ddd4392b9560b3ac9fda29"
  },
  {
    "url": "model/MnemonicLang.js",
    "revision": "3fbf0848eb3a4259738e1a8bc1a12db8"
  },
  {
    "url": "model/Nfc.js",
    "revision": "80c2087842e20f6769868cd0b89e2128"
  },
  {
    "url": "model/Password.js",
    "revision": "bd92a5e148c3d8d1e4efb8b4431e3b63"
  },
  {
    "url": "model/QRReader.js",
    "revision": "49070879bc60975768a805d84187742b"
  },
  {
    "url": "model/Storage.js",
    "revision": "57d523c554f250f95e20a347a3bbe690"
  },
  {
    "url": "model/Transaction.js",
    "revision": "bada804ba6265de7b737834fe19a1981"
  },
  {
    "url": "model/TransactionsExplorer.js",
    "revision": "ffcaa65b5fe780c166b5e6e00c272ffa"
  },
  {
    "url": "model/Translations.js",
    "revision": "ec585ebe03545d7907b52d13a588f246"
  },
  {
    "url": "model/Wallet.js",
    "revision": "064e10485a2b00350ad4321b7dbb2b8c"
  },
  {
    "url": "model/WalletRepository.js",
    "revision": "fd2c7c814932ea55dbf3a6da72ee4828"
  },
  {
    "url": "model/WalletWatchdog.js",
    "revision": "c7e402b815161deab2c7c3267f213b8f"
  },
  {
    "url": "pages/account.html",
    "revision": "a743c392b7397ad1eedff439487b1804"
  },
  {
    "url": "pages/account.js",
    "revision": "8c3871a10104fbb9fb46819270df7cb5"
  },
  {
    "url": "pages/changeWalletPassword.html",
    "revision": "cf44f48e8c60b3c2e19e22e825a89724"
  },
  {
    "url": "pages/changeWalletPassword.js",
    "revision": "66f501ca82c4263b774345a3dfc5ed8a"
  },
  {
    "url": "pages/createWallet.html",
    "revision": "413543ffbf94919ce6b5be51d309bc55"
  },
  {
    "url": "pages/createWallet.js",
    "revision": "988b57b5a54fd557f55feffc2d3631ca"
  },
  {
    "url": "pages/disconnect.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "pages/disconnect.js",
    "revision": "a2771001f905e32049f0301329387401"
  },
  {
    "url": "pages/donate.html",
    "revision": "fda62c03370cd2985abca5ec62e51f6a"
  },
  {
    "url": "pages/donate.js",
    "revision": "f8dc72710c9802a9c8894777ea6b7c3e"
  },
  {
    "url": "pages/export.html",
    "revision": "0829e8dcf1a904dbbe1be305abf85900"
  },
  {
    "url": "pages/export.js",
    "revision": "d143091b4a6c36d57f4d4c7949e86368"
  },
  {
    "url": "pages/forgotPassword.html",
    "revision": "f004d8b005e4d7a7acf11ddf32c2b812"
  },
  {
    "url": "pages/forgotPassword.js",
    "revision": "1a3bc0f4f040a65669e33a165c634ee2"
  },
  {
    "url": "pages/import.html",
    "revision": "45f5c149574bd7cf2bc91794c4adee55"
  },
  {
    "url": "pages/import.js",
    "revision": "26db4dac23d4b2d8410a3b01e20a2f25"
  },
  {
    "url": "pages/importFromFile.html",
    "revision": "b824f9fc68ce358032faecd70b0e099b"
  },
  {
    "url": "pages/importFromFile.js",
    "revision": "505d8ad2589606eecc261205974ba77d"
  },
  {
    "url": "pages/importFromKeys.html",
    "revision": "1388fc183805920f522c5cb26e3c2714"
  },
  {
    "url": "pages/importFromKeys.js",
    "revision": "8d60cc4b5da1653427ef48f02039e5be"
  },
  {
    "url": "pages/importFromMnemonic.html",
    "revision": "367f09264b3c3008ee0eda752d4a0ea7"
  },
  {
    "url": "pages/importFromMnemonic.js",
    "revision": "b304215132bc5f9f6e9560eeaaeca5b1"
  },
  {
    "url": "pages/importFromQr.html",
    "revision": "172fc490fa9a97ed146895e0f35aeedc"
  },
  {
    "url": "pages/importFromQr.js",
    "revision": "756f0c10baa74cc5076b2a37f9f15950"
  },
  {
    "url": "pages/index.html",
    "revision": "c4658b9e594a90a5ae64a84978e567dd"
  },
  {
    "url": "pages/index.js",
    "revision": "7d253f36f3cf4513200414d5cc0d107e"
  },
  {
    "url": "pages/network.html",
    "revision": "1fdea30266d0779652847d8cc9c7fadf"
  },
  {
    "url": "pages/network.js",
    "revision": "57ea9469647ca26caf110245b435ef46"
  },
  {
    "url": "pages/privacyPolicy.html",
    "revision": "24b862415fe2fd4eb921231b83df3b0b"
  },
  {
    "url": "pages/privacyPolicy.js",
    "revision": "b702439ec897c5c9e124d42e1e0dc42a"
  },
  {
    "url": "pages/receive.html",
    "revision": "d07b8b58743d889c25ceba08256b6804"
  },
  {
    "url": "pages/receive.js",
    "revision": "60a9068e5d4d191161de9b56dbe96ab0"
  },
  {
    "url": "pages/send.html",
    "revision": "00d355bb675272e8f1aea9f415cd7cba"
  },
  {
    "url": "pages/send.js",
    "revision": "04ab91aa28adf4f719941e79d9a3cb5d"
  },
  {
    "url": "pages/settings.html",
    "revision": "c09d00528550f137568fc98ff8949ae8"
  },
  {
    "url": "pages/settings.js",
    "revision": "3a6e1bf78bb1c3ed5140be14a36a228a"
  },
  {
    "url": "pages/support.html",
    "revision": "be66e8573a2fad478e29dbd6d3fbe2e2"
  },
  {
    "url": "pages/support.js",
    "revision": "99f9a085fa9bf80fef711b81477d6c81"
  },
  {
    "url": "pages/termsOfUse.html",
    "revision": "36361bdfb04ce02310397d6d7bb9d0a9"
  },
  {
    "url": "pages/termsOfUse.js",
    "revision": "423c07b78aaf74715dbc0d437f4f942a"
  },
  {
    "url": "providers/BlockchainExplorerProvider.js",
    "revision": "6cd38e5499e4af16e919fc04667d06bc"
  },
  {
    "url": "service-worker-raw.js",
    "revision": "47711885594600fb63e07580fa331c04"
  },
  {
    "url": "translations/de.json",
    "revision": "0ac37bb6a82574ea028f0c01bf833154"
  },
  {
    "url": "translations/en.json",
    "revision": "28798e088798da7e713cf12ac6af4ec6"
  },
  {
    "url": "translations/es.json",
    "revision": "c2f431cfbfb3cf29f55c8f73df1a9054"
  },
  {
    "url": "translations/fa.json",
    "revision": "ef4b316f41caa96f84e504ef0a569580"
  },
  {
    "url": "translations/fr.json",
    "revision": "9882a1e18d20ba7bdd4fafa3bc4e09a3"
  },
  {
    "url": "translations/gr.json",
    "revision": "c082dc5cfade2dac24bb7b4cf4d622c8"
  },
  {
    "url": "translations/hu.json",
    "revision": "e3c9b846acb3fab49d96e7439880c771"
  },
  {
    "url": "translations/it.json",
    "revision": "70fa91014487cb65ab980797fcbb0ed2"
  },
  {
    "url": "translations/ko.json",
    "revision": "c144646053fe639a8bf8eef98e9555eb"
  },
  {
    "url": "translations/pl.json",
    "revision": "9f12812e65ec18ab90735bec049c0200"
  },
  {
    "url": "translations/ru.json",
    "revision": "1626700d62d8c01d53910c45bd90a65c"
  },
  {
    "url": "translations/sr.json",
    "revision": "657aa462bbc2bb5baeef034e1db63b56"
  },
  {
    "url": "translations/uk.json",
    "revision": "b4993d71c0aa21ea569a2189a53a0a1d"
  },
  {
    "url": "translations/zh.json",
    "revision": "13238dae6ee7996f1fac7942e1236882"
  },
  {
    "url": "utils/Url.js",
    "revision": "92dfa6c7b793e554596ba37a31b93659"
  },
  {
    "url": "workers/TransferProcessing.js",
    "revision": "0588969c035092039607e5afc9afeb11"
  },
  {
    "url": "workers/TransferProcessingEntrypoint.js",
    "revision": "c5f6a0685fdf6003ab7b716a2a616fa0"
  }
]);
self.addEventListener('message', function (event) {
    if (!event.data) {
        return;
    }
    switch (event.data) {
        case 'force-activate':
            self.skipWaiting();
            self.clients.claim();
            self.clients.matchAll().then(function (clients) {
                clients.forEach(function (client) { return client.postMessage('reload-window-update'); });
            });
            break;
        default:
            // NOOP
            break;
    }
});
