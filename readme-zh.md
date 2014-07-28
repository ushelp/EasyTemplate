# EasyTemplate JavaScrpit模板插件使用手册

EasyTemplateJS是一个纯粹的JS模板插件。能够在JS中使用模板技术来简化操作，并增强程序设计的灵活性。

使用JS模板函数能够避免在JS中拼接HTML字符串带来的不便和低维护性的缺点，利用反向思路，在HTML中嵌入JS脚本，就像利用JSP和ASP技术编程一样。


---

## 1. 引入JS文件

```HTML
<script type="text/javascript" src="js/easy.template.js"></script>
```

EasyTemplateJS向外暴露了一个名为**`Et`**的对象，用来完成模板操作。

## 2. TemplateJS模板说明

TemplateJS支持三类模板:

1. 输出表达式：

  `{name}`： 插入要输出的变量（作用与JSP的`<%=表达式%>`相同）。

1. 脚本表达式

  `%{ JS Script }%`： 执行任意的 JavaScript 代码（作用JSP的`<% %>`小脚本相同）。

1. 转义输出表达式
 
  `{-name}`： 用法与`{name}`相同，输出数据时会自动转义特殊字符为字符实体。


## 3. 使用实例

```HTML
<div style="display: none;" id="myTmpl">
%{ 
	 for(var i in people){
}%
 <li>{i} = { people[i] }</li> 
 %{ 
 	}
 }%
</div>

<script type="text/javascript">
    //借助了jQuery
    $(function(){
    		var compiled = Et.template("hello: { name }...{name}");
    		var res=compiled({name: 'moe'});
    		console.info(res);
    		
    		var list = $("#myTmpl").html();  //借助了jQuery
    		var res2=Et.template(list, {people: ['moe', 'curly', 'larry']});
    		console.info(res2);
    		
    		var template = Et.template("<b>{- value }</b>");
    		var res3=template({value: '<script>'});
    		console.info(res3);
    });
</script>
```

输出结果：

```HTML
hello: moe...moe

<li>0 = moe</li>      
<li>1 = curly</li>    
<li>2 = larry</li>          

<b>&lt;script&gt;</b>
```

## 4、模板自定义
由于某些模板定义和执行块在某些语言中具有特殊涵义，所以在某些页面中使用模板符号会引起错误。EasyTemplate允许改变模板设置, 使用别的符号来嵌入代码。

Et.tmplSettings默认配置：
```JS
Et.tmplSettings={
    out : /\{([\s\S]+?)\}/g,  //输出表达式 {name}
    script : /%\{([\s\S]+?)\}%/g, //脚本表达式 %{ JS script }%
    escapeOut : /\{-([\s\S]+?)\}/g //转义输出表达式 {-name}
}
```

重定义示例：
```JS
Et.tmplSettings={
    out : /\{=([\s\S]+?)\}/g,  //输出表达式 {=name}
    script : /\{%([\s\S]+?)%\}/g, //脚本表达式 {% JS script %}
    escapeOut : /\{-([\s\S]+?)\}/g //转义输出表达式 {-name}
}
```
## 5、API

Et暴露了有限的几个API:

- `Et.tmplSettings ={...}`
  
  模板自定义属性，参考——4、模板自定义

- `Et.template(text, [data], [settings])` ：`string`
  
  模板插件核心函数
  `text`：模板字符串
  `data`：绑定到模板的数据
  `settings`：临时的`tmplSettings`

- `Et.escape(string)` : `string`
  
  将字符串中的特殊字符转义为字符实体，并返回

- `Et.unescape(string)` : `string`
  
  escape的反向操作函数，将字符串中的字符实体转移为字符，并返回

- `Et.each(list, iterator, [context])`

  遍历集合或对象。
  `list`：要遍历的集合或对象 
  `iterator`：迭代函数，包括值、索引、集合对象三个参数
  `context`：将`iterator`绑定到`context`上执行，可用来向iteraotr传递一些其他元素


- `Et.noConflict()` : `object`
  
   将`Et`引用的对象还原为原始对象，并返回`Et`对象。




## 结束

如果您有更好意见，建议或想法，请联系我。

[留言评论](http://www.lightfeel.com/easy/easytemplate/zh-cn/index.jsp#about '留言评论')

联系、反馈、定制Email：<inthinkcolor@gmail.com>




<p>
<strong>支付宝钱包扫一扫捐助：</strong>
</p>
<p>

<img alt="支付宝钱包扫一扫捐助" src="http://www.lightfeel.com/easy/images/s.png"  title="支付宝钱包扫一扫捐助"  height="256" width="256"></img>
