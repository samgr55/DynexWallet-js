
define(["require", "exports", "./CnUtilNative"], function (require, exports, CnUtilNative_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CryptoUtils = /** @class */ (function () {
        function CryptoUtils() {
        }
        CryptoUtils.bintohex = function (bin) {
            var out = [];
            for (var i = 0; i < bin.length; ++i) {
                out.push(("0" + bin[i].charCodeAt(0).toString(16)).slice(-2));
            }
            return out.join("");
        };
        //addKeys2
        //aGbB = aG + bB where a, b are scalars, G is the basepoint and B is a point
        CryptoUtils.addKeys2 = function (aGbB, a, b, B) {
            // ge_p2 rv;
            // ge_p3 B2;
            // CHECK_AND_ASSERT_THROW_MES_L1(ge_frombytes_vartime(&B2, B.bytes) == 0, "ge_frombytes_vartime failed at "+boost::lexical_cast<std::string>(__LINE__));
            // ge_double_scalarmult_base_vartime(&rv, b.bytes, &B2, a.bytes);
            // ge_tobytes(aGbB.bytes, &rv);
        };
        CryptoUtils.hextobin = function (hex) {
            if (hex.length % 2 !== 0)
                throw "Hex string has invalid length!";
            var res = new Uint8Array(hex.length / 2);
            for (var i = 0; i < hex.length / 2; ++i) {
                res[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
                // console.log(hex.slice(i * 2, i * 2 + 2), res[i]);
            }
            return res;
        };
        CryptoUtils.swapEndian = function (hex) {
            if (hex.length % 2 !== 0) {
                return "length must be a multiple of 2!";
            }
            var data = "";
            for (var i = 1; i <= hex.length / 2; i++) {
                data += hex.substr(0 - 2 * i, 2);
            }
            return data;
        };
        //switch byte order charwise
        CryptoUtils.swapEndianC = function (string) {
            var data = "";
            for (var i = 1; i <= string.length; i++) {
                data += string.substr(0 - i, 1);
            }
            return data;
        };
        //for most uses you'll also want to swapEndian after conversion
        //mainly to convert integer "scalars" to usable hexadecimal strings
        CryptoUtils.d2h = function (integer) {
            if (typeof integer !== "string" && integer.toString().length > 15) {
                throw "integer should be entered as a string for precision";
            }
            var padding = "";
            for (var i = 0; i < 63; i++) {
                padding += "0";
            }
            return (padding + JSBigInt(integer).toString(16).toLowerCase()).slice(-64);
        };
        // hexadecimal to integer
        CryptoUtils.h2d = function (test) {
            /*let vali = 0;
            for (let j = 7; j >= 0; j--) {
                vali = (vali * 256 + test[j].charCodeAt(0));
            }
            return vali;*/
            // return JSBigInt.parse(test,16);
            // let bytes = Crypto.hextobin(test);
            // console.log('bytes',bytes, test,swapEndianC(test));
            // console.log(JSBigInt.parse(swapEndianC(test),16).valueOf());
            // console.log(JSBigInt.parse(test.substr(0,12),16).valueOf());
            var vali = 0;
            for (var j = 7; j >= 0; j--) {
                // console.log(vali,vali*256,bytes[j]);
                vali = (vali * 256 + parseInt(test.slice(j * 2, j * 2 + 2), 16));
            }
            return vali;
        };
        CryptoUtils.decodeRctSimple = function (rv, sk, i, mask, hwdev) {
            // CHECK_AND_ASSERT_MES(rv.type == RCTTypeSimple || rv.type == RCTTypeSimpleBulletproof, false, "decodeRct called on non simple rctSig");
            // CHECK_AND_ASSERT_THROW_MES(i < rv.ecdhInfo.size(), "Bad index");
            // CHECK_AND_ASSERT_THROW_MES(rv.outPk.size() == rv.ecdhInfo.size(), "Mismatched sizes of rv.outPk and rv.ecdhInfo");
            // console.log(i < rv.ecdhInfo.length ? undefined : 'Bad index');
            // console.log(rv.outPk.length == rv.ecdhInfo.length ? undefined : 'Mismatched sizes of rv.outPk and rv.ecdhInfo');
            if (hwdev === void 0) { hwdev = null; }
            //mask amount and mask
            // console.log('decode',rv.ecdhInfo[i], sk, h2d(rv.ecdhInfo[i].amount));
            var ecdh_info = cnUtil.decode_rct_ecdh(rv.ecdhInfo[i], sk);
            // console.log('ecdh_info',ecdh_info);
            // mask = ecdh_info.mask;
            var amount = ecdh_info.amount;
            var C = rv.outPk[i].mask;
            // console.log('amount', amount);
            // console.log('C', C);
            // DP("C");
            // DP(C);
            // key Ctmp;
            // addKeys2(Ctmp, mask, amount, H);
            // DP("Ctmp");
            // DP(Ctmp);
            // if (equalKeys(C, Ctmp) == false) {
            // 	CHECK_AND_ASSERT_THROW_MES(false, "warning, amount decoded incorrectly, will be unable to spend");
            // }
            return CryptoUtils.h2d(amount);
        };
        CryptoUtils.decode_ringct = function (rv, pub, sec, i, mask, amount, derivation) {
            if (derivation === null)
                derivation = cnUtil.generate_key_derivation(pub, sec); //[10;11]ms
            var scalar1 = cnUtil.derivation_to_scalar(derivation, i); //[0.2ms;1ms]
            try {
                // console.log(rv.type,'RCTTypeSimple='+RCTTypeSimple,'RCTTypeFull='+RCTTypeFull);
                switch (rv.type) {
                    case CryptoUtils.RCTTypeSimple:
                        // console.log('RCTTypeSimple');
                        var realAmount = amount;
                        // for(let i = 0; i < 1000; ++i)
                        amount = CryptoUtils.decodeRctSimple(rv, scalar1, i, mask); //[5;10]ms
                        break;
                    case CryptoUtils.RCTTypeFull:
                        // console.log('RCTTypeSimple');
                        amount = CryptoUtils.decodeRctSimple(rv, scalar1, i, mask);
                        break;
                    // case RCTTypeFull:
                    // 	console.log('RCTTypeFull');
                    // 	amount = decodeRct(rv,
                    // 	rct::sk2rct(scalar1),
                    // i,
                    // mask);
                    // break;
                    default:
                        console.log('Unsupported rc type', rv.type);
                        // cerr << "Unsupported rct type: " << rv.type << endl;
                        return false;
                }
            }
            catch (e) {
                console.error(e);
                console.log("Failed to decode input " + i);
                return false;
            }
            return amount;
        };
        CryptoUtils.relative_output_offsets_to_absolute = function (offsets) {
            var res = offsets.slice();
            for (var i = 1; i < res.length; i++)
                res[i] += res[i - 1];
            return res;
        };
        CryptoUtils.get_output_keys = function (amount, absolute_offsets) {
        };
        //CNutil.generate_key_image alternative ??????
        CryptoUtils.generate_key_image_helper = function (ack, tx_public_key, real_output_index, recv_derivation) {
            if (recv_derivation === null)
                // recv_derivation = cnUtil.generate_key_derivation(tx_public_key, ack.view_secret_key);
                recv_derivation = CnUtilNative_1.CnUtilNative.generate_key_derivation(tx_public_key, ack.view_secret_key);
            // console.log('recv_derivation', recv_derivation);
            // CHECK_AND_ASSERT_MES(r, false, "key image helper: failed to generate_key_derivation(" << tx_public_key << ", " << ack.m_view_secret_key << ")");
            //
            // let start = Date.now();
            // let in_ephemeral_pub = cnUtil.derive_public_key(recv_derivation, real_output_index, ack.public_spend_key);
            var in_ephemeral_pub = CnUtilNative_1.CnUtilNative.derive_public_key(recv_derivation, real_output_index, ack.public_spend_key);
            // console.log('in_ephemeral_pub',in_ephemeral_pub);
            // CHECK_AND_ASSERT_MES(r, false, "key image helper: failed to derive_public_key(" << recv_derivation << ", " << real_output_index <<  ", " << ack.m_account_address.m_spend_public_key << ")");
            //
            // let in_ephemeral_sec = cnUtil.derive_secret_key(recv_derivation, real_output_index, ack.spend_secret_key);
            var in_ephemeral_sec = cnUtil.derive_secret_key(recv_derivation, real_output_index, ack.spend_secret_key);
            // console.log('in_ephemeral_sec',in_ephemeral_sec);
            var ki = cnUtil.generate_key_image_2(in_ephemeral_pub, in_ephemeral_sec);
            // let end = Date.now();
            // console.log(end-start);
            return {
                ephemeral_pub: in_ephemeral_pub,
                ephemeral_sec: in_ephemeral_sec,
                key_image: ki
            };
        };
        CryptoUtils.RCTTypeFull = 1;
        CryptoUtils.RCTTypeSimple = 2;
        return CryptoUtils;
    }());
    exports.CryptoUtils = CryptoUtils;
});
