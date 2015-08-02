"use strict";

angular.module('app', ['angularFileUpload'])
//    angular.module('app', ['ngFileUpload','lock-umeditor'])
    .controller('uploadCtrl', function($scope){

    })
    .controller('mainCtrl', function($scope,$upload,$http){

        $scope.content = '';
        $scope.ct = {
            //这个很重要一定为空
            imagePath : ""
//                    toolbar: ['undo redo | bold italic underline']
        }

        $scope.onBlur = function(){
            console.log("ueditor on blur");
        }

        $scope.onFocus = function(){
            console.log("ueditor on focus");
        }



        $scope.usingFlash = FileAPI && FileAPI.upload != null;
        $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
        $scope.uploadRightAway = true;

        //图片上传功能
        $scope.upload = function (files,callBack) {
            if (files) {
                var file;
                if(files instanceof  Array){
                    file = files[0];
                }
                else{
                    file = files;
                }



                var pro = $upload.upload({
                    url: 'http://imzhiliao.com:10000/file/upload/savefile.shtml',
                    method: "POST",
                    file: file,
                    headers: {},
                    data : {
                        myModel : "DDD"
                    },
                    fileFormDataName: 'myFile'
                });

                pro.then(function(response) {
                    console.log(response);
                }, function(response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;

                    console.log($scope.errorMsg);
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    var m = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    console.log(m);
                });
                pro.xhr(function(xhr){
                    //				xhr.upload.addEventListener('abort', function() {console.log('abort complete')}, false);
                });


//                    .progress(function (evt) {
//                            //这里做上传进度展示
////                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
////                                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
//                        }).success(function (res, status, headers, config) {
////                                console.log('file ' + config.file.name + 'uploaded. Response: ' + res);
//                            //数据封装
//                            var json = {
//                                "state": "SUCCESS",
//                                "url": res.data.url,
//                                "title": "",
//                                "original": ""
//                            }
//
//                            console.log(json);
//
//                            //callBack(json);
//                        }).error(function (data, status, headers, config) {
//                            console.log('error status: ' + status);
//                        })



            }
        };


        //暴露upload全局变量
        window.upload = $scope.upload;

    });