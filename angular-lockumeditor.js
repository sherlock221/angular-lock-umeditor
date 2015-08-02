/**
 * Created by sherlock on 15/6/1.
 * umeditor angular的封装
 * https://github.com/sherlock221/angular-lock-umeditor
 * 如果控制台曝出 selection is not supported
 * 官方demo也有这个错误
 * webkit不支持多选区，在addRange之前先removeAllRanges()可破。
 详细情况参考：
 https://developer.mozilla.org/zh-CN/docs/Web/API/Selection
 */


angular.module('lock-umeditor', [])
    .directive("lockUmeditor",function(){
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                //ueditor配置信息
                'config' : "=",
                onBlur : "&lockUmeditorBlur",
                onFocus : "&lockUmeditorFocus"
            },
            link : function(scope, element, attrs, ngModel){
                if(!ngModel){
                    console.log("请设置 ngModel");
                    return;
                }

                //自动创建id
                element[0].id  = attrs.id ? attrs.id : "editor_" + (Date.now());

                //创建editor
                var um = UM.getEditor(element[0].id ,scope.config || {});

                ngModel.$render = function() {
                    um.ready(function() {
                        um.setContent(ngModel.$viewValue || '');
                    });
                };

                //销毁
                scope.$on("$destroy", function() {
                    UM.delEditor(element[0].id);
                });


                if(scope.onBlur)
                    um.addListener('blur',scope.onBlur);

                if(scope.onFocus)
                    um.addListener('focus',scope.onFocus);


                um.addListener('selectionchange', function() {
                    return scope.$apply(function() {
                        return ngModel.$setViewValue(um.getContent());
                    });
                });

            }

        }

    });