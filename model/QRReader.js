define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QRReader = void 0;
    var QRReader = /** @class */ (function () {
        function QRReader() {
            this.active = false;
            this.webcam = null;
            this.canvas = null;
            this.ctx = null;
            this.decoder = null;
            this.inited = false;
        }
        QRReader.prototype.setCanvas = function () {
            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
        };
        QRReader.prototype.support = function () {
            return typeof navigator !== 'undefined' && typeof navigator.mediaDevices !== 'undefined';
        };
        QRReader.prototype.init = function (baseUrl) {
            if (!this.inited)
                this.inited = true;
            else
                return;
            if (!this.support())
                return false;
            var streaming = false;
            var self = this;
            this.webcam = document.querySelector("#cameraVideoFluxForDelivery");
            this.setCanvas();
            this.decoder = new Worker(baseUrl + "decoder.min.js");
            if (this.canvas === null || this.webcam === null)
                return;
            /*if (!window.iOS) {
                // Resize webcam according to input
                this.webcam.addEventListener("play", function (ev) {
                    if(self.canvas !== null)
                    if (!streaming) {
                        self.canvas.width = window.innerWidth;
                        self.canvas.height = window.innerHeight;
                        streaming = true;
                    }
                }, false);
            }
            else {*/
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            // }
            function startCapture(constraints) {
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(function (stream) {
                    if (self.webcam !== null)
                        self.webcam.srcObject = stream;
                })
                    .catch(function (err) {
                    showErrorMsg(err);
                });
            }
            navigator.mediaDevices.enumerateDevices().then(function (devices) {
                //console.log(devices);
                var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
                //console.log(supportedConstraints);
                var device = devices.filter(function (device) {
                    var deviceLabel = device.label.split(',')[1];
                    if (device.kind == "videoinput") {
                        return device;
                    }
                });
                if (device.length) {
                    startCapture({
                        audio: false,
                        video: {
                            facingMode: 'environment'
                        }
                    });
                }
                else {
                    startCapture({ video: true });
                }
            }).catch(function (error) {
                showErrorMsg(error);
            });
            function showErrorMsg(error) {
                if ('' + error === 'DOMException: Permission denied') {
                    swal({
                        type: 'error',
                        title: i18n.t('global.permissionRequiredForCameraModal.title'),
                        html: i18n.t('global.permissionRequiredForCameraModal.content'),
                        confirmButtonText: i18n.t('global.permissionRequiredForCameraModal.confirmText'),
                    });
                }
                //console.log('unable access camera');
            }
        };
        QRReader.prototype.stop = function () {
            this.active = false;
            if (this.webcam !== null) {
                if (this.webcam.srcObject !== null && this.webcam.srcObject instanceof MediaStream)
                    this.webcam.srcObject.getVideoTracks()[0].stop();
                this.webcam.srcObject = null;
            }
        };
        QRReader.prototype.scan = function (callback) {
            if (this.decoder === null)
                return;
            var self = this;
            // Start QR-decoder
            function newDecoderFrame() {
                if (self.ctx === null || self.webcam === null || self.canvas === null || self.decoder === null)
                    return;
                //			//console.log('new frame');
                if (!self.active)
                    return;
                try {
                    self.ctx.drawImage(self.webcam, 0, 0, self.canvas.width, self.canvas.height);
                    var imgData = self.ctx.getImageData(0, 0, self.canvas.width, self.canvas.height);
                    if (imgData.data) {
                        self.decoder.postMessage(imgData);
                    }
                }
                catch (e) {
                    var errorName = "";
                    if (e instanceof Error) {
                        errorName = e.name;
                    }
                    // Try-Catch to circumvent Firefox Bug #879717
                    if (errorName == "NS_ERROR_NOT_AVAILABLE")
                        setTimeout(newDecoderFrame, 0);
                }
            }
            this.active = true;
            this.setCanvas();
            this.decoder.onmessage = function (event) {
                if (event.data.length > 0) {
                    var qrid = event.data[0][2];
                    self.active = false;
                    callback(qrid);
                }
                setTimeout(newDecoderFrame, 0);
            };
            newDecoderFrame();
        };
        return QRReader;
    }());
    exports.QRReader = QRReader;
});
