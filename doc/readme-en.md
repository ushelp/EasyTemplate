# EasyTemplate JavaScrpit Templates Plugins Manual

EasyTemplateJS is a pure JS template plugin. JS template can be used in technology to streamline operations and enhance the flexibility of the program design.

Use JS template function can avoid shortcomings of HTML string stitching inconvenience and low maintenance in JS, the use of reverse thinking, JS scripts embedded in HTML, JSP and ASP technologies like the use of the same programming.


---

## 1, Introduction of JS files

```HTML
<script type="text/javascript" src="js/easy.template.min.js"></script>
```

EasyTemplateJS outwardly exposed a group called ** `Et` ** objects, templates used to complete the operation.

## 2, TemplateJS Template description

TemplateJS supports three types of templates:

1. output expression:

   `{name}`: insert variables to be output (the role and the JSP `<% = expression%>` identical).JS script <,> and other special symbols can also be used to replace the corresponding character entities.

1. Script expression

   `% {JS Script}%`: execute arbitrary JavaScript code (JSP role of `<%%>` same small script).

1. escaped output expressions
 
   `{-name}`: Usage and `{name}` same, it will automatically escape special characters when output data is character entities.


## 3, 使用实例

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

 <!-- When you use HTML to define JS template content, if <,>, and other special content, you can use the corresponding character entities instead of -->
<div style="display: none;" id="myTmpl2">
%{ 
	 for(var i=0;i&lt;people.length;i++){  <!-- < use &lt; instead of -->
}%
 <li>{i} = { people[i] }</li> 
 %{ 
 	}
 }%
</div>

<script type="text/javascript">
    //With the jQuery
    $(function(){
    		var compiled = Et.template("hello: { name }...{name}");
    		var res=compiled({name: 'moe'});
    		console.info(res);
    		
    		var list = $("#myTmpl").html();  //With the jQuery
    		var res2=Et.template(list, {people: ['moe', 'curly', 'larry']});
    		console.info(res2);

            var list2 = $("#myTmpl2").html();  //With the jQuery
            //list2="%{ for(var i =0;i<people.length;i++){}% <li>{i} = { people[i] }</li>%{ }}%";
    		var res3=Et.template(list2, {people: ['moe', 'curly', 'larry']});
    		console.info(res3);
    		
    		var template = Et.template("<b>{- value }</b>");
    		var res4=template({value: '<script>'});
    		console.info(res4);
    });
</script>
```

Output:

```HTML
hello: moe...moe

<li>0 = moe</li>      
<li>1 = curly</li>    
<li>2 = larry</li>          

<li>0 = moe</li>      
<li>1 = curly</li>    
<li>2 = larry</li>    

<b>&lt;script&gt;</b>
```

## 4,  Use out output in the JS script template

You can also use out in JavaScript code, and sometimes it would be more convenient than {name} use.

```HTML
<div style="display: none;" id="myTmpl3">
%{ 
	for(var i=0;i&lt;people.length;i++){ <!-- < use &lt; instead of -->

	   out(" <li>"+i+"="+people[i]+"</li> ");

 	}
 }%
</div>

<script type="text/javascript">
    //With the jQuery
    $(function(){
        var list3 = $("#myTmpl3").html();  //With the jQuery
		var res4=Et.template(list3, {people: ['moe', 'curly', 'larry']});
		console.info(res4);

        var res6 = Et.template("%{out('Hello:'+name)}%",{name:"JACK"});
		console.info(res6);
    });
</script>
```

Output:

```HTML
<li>0=moe</li>  <li>1=curly</li>  <li>2=larry</li> 

Hello:JACK
```

## 5, custom template

Because some templates to define and execute a block has a special meaning in some languages, so use a template symbol in some pages that caused the error. EasyTemplate allowed to change the template settings, use other symbols to embed code.

Et.tmplSettings default configuration:
```JS
Et.tmplSettings={
    out : /\{([\s\S]+?)\}/g,  //输出表达式 {name}
    script : /%\{([\s\S]+?)\}%/g, //脚本表达式 %{ JS script }%
    escapeOut : /\{-([\s\S]+?)\}/g //转义输出表达式 {-name}
}
```

Redefine example:
```JS
Et.tmplSettings={
    out : /\{=([\s\S]+?)\}/g,  //输出表达式 {=name}
    script : /\{%([\s\S]+?)%\}/g, //脚本表达式 {% JS script %}
    escapeOut : /\{-([\s\S]+?)\}/g //转义输出表达式 {-name}
}
```
## 6, API

Et exposed to a limited number of API:

- `Et.tmplSettings = {...}`
  
   Template custom attributes, refer - 4, custom template

- `Et.template (text, [data], [settings])`: `string`
  
   Template plug-core functions
   `text`: template string
   `data`: Bind to Data Template
   `settings`: `tmplSettings` temporary

- `Et.escape (string)`: `string`
  
   The string of special characters escaped as character entities and returns

- `Et.unescape (string)`: `string`
  
   Reverse manipulation functions escape, and the string of characters in the character entity transfers and returns

- `Et.each (list, iterator, [context])`

   Through the collection or object.
   `list`: to traverse a collection or object
   `iterator`: iterative function, including the value of the index, a collection of objects three parameters
   `context`: the `iterator` on `context` bound to perform, can be used to pass a number of other elements to iteraotr


- `Et.noConflict ()`: `object`
  
    The referenced object `Et` revert to the original object and returns `Et` object.


## End

If you have more comments, suggestions or ideas, please contact me.


[Comments](http://www.easyproject.cn/easytemplate/en/index.jsp#about 'Comments')

Contact, feedback, custom Email:<inthinkcolor@gmail.com>

<p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="inthinkcolor@gmail.com">
<input type="hidden" name="item_name" value="EasyProject development Donation">
<input type="hidden" name="no_note" value="1">
<input type="hidden" name="tax" value="0">
<input type="image" src="http://www.easyproject.cn/images/paypaldonation5.jpg"  title="PayPal donation"  border="0" name="submit" alt="Make payments with PayPal - it's fast, free and secure!">
</form>
</P>


[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")