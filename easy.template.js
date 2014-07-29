// EasyTemplate
//
// Version 1.0.0
//
// Copy By RAY
// inthinkcolor@gmail.com
// 2014
//
// https://github.com/ushelp/EasyTemplate
//
(function() {
	var _Et = window.Et, 
	noMatch = /(.)^/, 
	escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g, 
	escapes = {
		"'" : "'",
		'\\' : '\\',
		'\r' : 'r',
		'\n' : 'n',
		'\t' : 't',
		'\u2028' : 'u2028',
		'\u2029' : 'u2029'
	}, 
	entityMap = {
		escape : {
			'&' : '&amp;',
			'<' : '&lt;',
			'>' : '&gt;',
			'"' : '&quot;',
			"'" : '&#x27;'
		},
		unescape : {
			'&amp;' : '&',
			'&lt;' : '<',
			'&gt;' : '>',
			'&quot;' : '"',
			'&#x27;' : "'"
		}
	},
	has = function(obj, key) {
		return hasOwnProperty.call(obj, key);
	},
	keys = Object.keys || function(obj) {
		if (obj !== Object(obj))
			throw new TypeError('Invalid object');
		var keys = [];
		for ( var key in obj)
			if (has(obj, key))
				keys.push(key);
		return keys;
	},
	// Regexes containing the keys and values listed immediately above.
	entityRegexes = {
		escape : new RegExp('[' + keys(entityMap.escape).join('') + ']', 'g'),
		unescape : new RegExp('(' + keys(entityMap.unescape).join('|') + ')',
				'g')
	}, 
	slice = Array.prototype.slice, defaults = function(obj) {
		Et.each(slice.call(arguments, 1), function(source) {
			if (source) {
				for ( var prop in source) {
					if (obj[prop] === void 0)
						obj[prop] = source[prop];
				}
			}
		});
		return obj;
	}
	;
	var Et = {
			// 语句表达式
		tmplSettings : {
			out : /\{([\s\S]+?)\}/g,  //输出表达式{name}
			script : /%\{([\s\S]+?)\}%/g, //脚本表达式%{JS script }%
			escapeOut : /\{-([\s\S]+?)\}/g //转义输出表达式{-name}
		},
		// Functions for escaping and unescaping strings to/from HTML
		// interpolation.
		escape : function(string) {
			if (string == null)
				return '';
			return ('' + string).replace(entityRegexes['escape'], function(
					match) {
				return entityMap['escape'][match];
			});
		},
		unescape : function(string) {
			if (string == null)
				return '';
			return ('' + string).replace(entityRegexes['unescape'], function(
					match) {
				return entityMap['unescape'][match];
			});
		},
		each : function(obj, iterator, context) {
			if (obj == null)
				return;
			if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
				obj.forEach(iterator, context);
			} else if (obj.length === +obj.length) {
				for ( var i = 0, length = obj.length; i < length; i++) {
					if (iterator.call(context, obj[i], i, obj) === breaker)
						return;
				}
			} else {
				var keys = keys(obj);
				for ( var i = 0, length = keys.length; i < length; i++) {
					if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker)
						return;
				}
			}
		},
		template : function(text, data, settings) {
			text=Et.unescape(text);
			var render;
			settings = defaults({}, settings, Et.tmplSettings);

			// Combine delimiters into one regular expression via alternation.
			var matcher = new RegExp([ (settings.escapeOut || noMatch).source,
					(settings.out || noMatch).source,
					(settings.script || noMatch).source ].join('|')
					+ '|$', 'g');
			// Compile the template source, escaping string literals
			// appropriately.
			var index = 0;
			var source = "__p+='";
			text.replace(matcher, function(match, escapeOut, out,
					script, offset) {
				source += text.slice(index, offset).replace(escaper,
						function(match) {
							return '\\' + escapes[match];
						});

				if (escapeOut) {
					source += "'+\n((__t=(" + escapeOut
							+ "))==null?'':Et.escape(__t))+\n'";
				}
				if (out) {
					source += "'+\n((__t=(" + out
							+ "))==null?'':__t)+\n'";
				}
				if (script) {
					source += "';\n" + script + "\n__p+='";
				}
				index = offset + match.length;
				return match;
			});
			source += "';\n";

			// If a variable is not specified, place data values in local scope.
			if (!settings.variable)
				source = 'with(obj||{}){\n' + source + '}\n';

			source = "var __t,__p='',__j=Array.prototype.join,"
					+ "out=function(){__p+=__j.call(arguments,'');};\n"
					+ source + "return __p;\n";

			try {
				render = new Function(settings.variable || 'obj', 'Et', source);
			} catch (e) {
				e.source = source;
				console.info(e);
				console.info(source);
				
				throw e;
			}

			if (data)
				return render(data, Et);
			var template = function(data) {
				return render.call(this, data, Et);
			};

			// Provide the compiled function source as a convenience for
			// precompilation.
			template.source = 'function(' + (settings.variable || 'obj')
					+ '){\n' + source + '}';

			return template;
		},
		noConflict : function() {
			if (window.Et === Et) {
				window.Et = _Et;
			}

			return Et;
		}
	};
	// 注册对外的命名空间
	window.Et = Et;

	return Et;
})();


