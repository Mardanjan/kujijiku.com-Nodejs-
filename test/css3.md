## ‘图解CSS3-核心技术与案列实战’ 大漠 著

### 我着重看的内容：   
1.  CSS3选择器
2.  CSS3边框
3.  CSS3背景
4.  CSS3文本
5.  CSS3盒模型
6.  CSS3伸缩布局盒模型
7.  CSS3多列布局
8.  CSS3渐变
9.  CSS3变形
10. CSS3过渡
11. CSS3动画
12. CSS3媒体查询与Responsive设计 

### 1·选择器
+ 基本选择器
    - 啊
+ 层次选择器
    - 包括后代，子，相邻，通用选择器
+ 动态伪类选择器
    - 并不存在html中，只有当用户和网站交互时才能体现出来
    - ‘爱恨原则’ LoVe/HAte link,visited,active,hover,focus
+ 目标伪类选择器
    - :target 用来匹配页面的url中某个标志符的目标元素，然后修改样式
    - 用我自己的理解来说：href="#tag" 点击这个超链接之后匹配ID为tag的元素，然后#tag:target{}里的样式生效
    ``` 
    <!DOCTYPE html>
    <html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			p{
				display: none;
			}
			#p:target{
				display: block;
			}
		</style>
	</head>
	<body>
	<a href="#p">显示</a>
	<p id="p">目标伪类选择器测试</p>
	</body>
    </html>

    ```
+ 语言伪类选择器
    - 根据元素的语言编码匹配元素 , 还没用到过，可以为不同语言版本的网站相关元素设置不同的样式
    ```
    :lang(en){
        qoutes:'"' ' "';
    }
    :lang(en){

    }
    :lang(fr){

    }
    ```
+ UI元素状态伪类选择器
    - 主要用于form表单元素上，ui元素的状态一般包括：启用，禁用，选择，未选中，获得焦点，失去焦点，锁定和待机等
    - ui元素选择器可以为以上的各种状态设置各种样式
    ```
        <!DOCTYPE html>
    <html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			input:focus{
				background-color: red;
			}
		</style>
	</head>
	<body>
		<input type="password" name="" />
	</body>
    </html>
    ```
+ 结构伪类选择器
    - 结构伪类选择器可以根据元素在文档树中的某些特性（如相对位置）定位到它们
    - 通过文档树结构的相互关系来匹配特定的元素，从而减少HTML文档对ID或类名的定义，保持代码干净和整洁
    - [参考链接](https://cn.bing.com/images/search?view=detailV2&ccid=CVZ8ATNR&id=0B0B43689334C8B75911B7AE0A309477712A4668&thid=OIP.CVZ8ATNR152ZusgTerwuQgHaFu&mediaurl=https%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F814103%2F201605%2F814103-20160519162524076-258932143.png&exph=1050&expw=1358&q=%e7%bb%93%e6%9e%84%e4%bc%aa%e7%b1%bb%e9%80%89%e6%8b%a9%e5%99%a8&simid=608037359540439765&selectedindex=0&ajaxhist=0&vt=0)
+ 否定伪类选择器
    - 否定伪类选择器是CSS3的新选择器，用来匹配不该匹配该选择器的元素
    - 可以起到过滤器的作用
    ```
    <!DOCTYPE html>
    <html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			p:hover{
				color: red;
			}
			p:not(:hover){
				color: #0000FF;
			}
		</style>
	</head>
	<body >
		<p>123</p>
		<p>123</p>
		<p>123</p>
	</body>
    </html>
    ```
+ 为元素
    - 为元素可用于定位文档中包含的文本，但无法在文档树中定位
    - CSS3中对伪元素进行了一定的调整 ::first-letter ::first-line ::before ::after ::selection
    - ::first-letter 用来选择文本块的第一个字母  ---下沉字母，首字母等等特效
    - ::first-line 第一行
    - ::before和::after 是插入额外内容的位置，尽管生成的内容不会成为DOM但是还是可以设置样式
    - ::selection 是用来匹配突出显示的文本
+ 属性选择器
    - 通过各种各样的属性可以给元素增加很多附加信息 

###  CSS3边框
+   border  border-radius  box-shadow
+   图片边框


###  CSS3背景
+ 多个背景图片
+ background-origin 觉得定位的参考原点
+ background-size:cover 放大填充

### CSS3盒模型
+ css盒模型简介：css主要有以下盒模型：inline,inline-block,block,table,absolute position,float
+ 浏览器把每个元素看作一个盒模型，每一个盒模型是由以下几个属性组合所决定的：display,pposition,float,width,height,margin,padding,border等，不同类型的盒模型会产生不同的布局
+ css中每个元素都是一个盒模型
+ content,background-image/color,padding构成了z轴
+ border,margin,padding三者之间是平面上的关系
+ box-sizing属性主要用来控制元素的盒模型的解析模式，其主要目的是控制元素的总宽度

### CSS3伸缩布局盒模型
+ 总共三个版本：
    - 旧版本
    - 混合版本
    - 新版本-由于大部分主流浏览器都支持这个版本所以我就学习了这个
+ 特点：
    - 屏幕和浏览器窗口发生改变时也可以灵活调整布局
    - 指定伸缩项目沿着X或者Y轴按比例分配额外空间
    - ..
+ 基本使用
    - display:flex 将容器设置为伸缩容器
    - flex-directoin 排版模式  row column row-reserve 等等
    - flex-wrap 换行
    - flex-flow 合并了上面的两条
    - justify-content x轴的对齐方式 flex-start flex-end center space-between - space-around
    - aligin-items y轴的对齐方式 flex-start flex-end center baseline stretch
    - flex 伸缩性
    - order 显示顺序