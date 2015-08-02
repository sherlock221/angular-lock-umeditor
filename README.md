###angular umeditor

UMeditor，简称UM，是 [ueditor](http://ueditor.baidu.com) 的简版。是为满足广大门户网站对于简单发帖框和回复框的需求，专门定制的在线富文本编辑器。我们的目标不仅是要提高在线编辑的编辑体验，也希望能改变前端技术中关于富文本技术的门槛，让大家不再觉得这块是个大坑。
angular-lock-umeditor 封装了umedior 1.2.2版本 为angularjs的指令来使用. demo展示了基本功能.

### 主要特点 ###

	1. **轻量**: 主文件的代码量为139k。
    2. **加载速度更快**: 放弃了使用传统的iframe模式，采用了div的加载方式，以达到更快的加载速度和零加载失败率。
	3. **可定制**: 配置项完善，可定制程度高。
	4. **可扩展**: 代码层次拆分清晰，功能以插件形式挂接，可灵活定制需要的功能。
	5. **多后台支持**: 支持php、asp、jsp、net四中后台部署代码
	6. **功能丰富**: 支持插入公式、粘贴QQ截屏、拖放上传图片、插入地图、草稿箱功能

### 快速使用 ###

### 导入头文件 ###

```html


    <link href="umeditor/themes/default/css/umeditor.css" type="text/css" rel="stylesheet">

    <script type="text/javascript" src="umeditor/third-party/jquery.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="umeditor/umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="umeditor/umeditor.min.js"></script>
    <script type="text/javascript" src="umeditor/lang/zh-cn/zh-cn.js"></script>

    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="angular-lockumeditor.js"></script>
```
    
### 加载模块 ###
```html
    
<script type="text/javascript">
    angular.module('app', ['lock-umeditor'])
            .controller('mainCtrl', function($scope){
                $scope.content = '';
                $scope.ct = {
                 //这个很重要一定为空(图片的前缀)                     
                 imagePath : "",
                 //server 上传接口
                 imageUrl : "http://192.168.1.107:3001/cmw/file/upload"
//               toolbar: ['undo redo | bold italic underline']
                }

                $scope.onBlur = function(){
                    console.log("ueditor on blur");
                }

                $scope.onFocus = function(){
                    console.log("ueditor on focus");
                }
            });
</script>
 ```   
    
### 在使用的地方添加代码 ###

> 不指定id 则自动生成

```html
 <div id="container"   lock-umeditor-focus="onFocus()"  lock-umeditor-blur="onBlur();" config="ct" ng-model="content" lock-umedi></div>


```
### 参数说明 ###

1. config : ueditor配置参数
2. lock-umeditor-focus : ueditor 获得焦点
3. lock-umeditor-blur : 失去焦点


### 图片上传跨域问题 ###
umeditor img上传采用的时 form 提交iframe的 方式异步上传 那么如果图片服务器 和 项目服务器 不在一个域名下 
就会导致出错 父页面 无法获得 子iframe中的内容

解决方案:

1. server response的时候需要返回一段script
//调起客户端脚本
node例子
 ```html
res.send('<script>window.parent.postMessage('+JSON.stringify(json)+',"*")</script>');
```
第二个参数为 白名单 上线的时候记得设置成 前端资源所在域名
    
json的格式参考百度editor的返回格式即可    

以上参考demo/img-iframe-demo 这个方案 支持ie8+ chrome+ fx + 等


2. 采用ngfile upload来解决
如果sever端条件不允许的情况下 就需要我们前端自行解决了 目前这个方案利用html5 file api去做 支持ie10 chrome fx等
以上参考demo/ng-upload-demo


