// jDosk JavaScript Library
(function (window, undefined) {
		var jDosk = window.jDosk = window.$$ = function (selector) {  //Define somethings
				return new jDosk.fn.init(selector);
			};
		jDosk.fn = jDosk.prototype = {
				init : function (selector) {
						if (selector == undefined)
							return undefined;
						if (selector == undefined || selector == '')
							var arr = document.querySelectorAll('*');
						else
							var arr = document.querySelectorAll(selector);
						for (i=0;i<arr.length;++i)
							this[i] = arr.item(i);
						this.length = arr.length;
						return this;
					},
				find : function (selector) {  //Still have a bug...
						if (selector == undefined)
							return undefined;
						for (i=0;i<this.length;++i)
						{
							var oldContext = this[i],
								oldId = this[i].getAttribute('id'),
								newId = oldId || '__sizzle__',
								count = 0;
							try {
								arr = this[i].querySelectorAll('#' + newId + ' ' + selector);
								for (j=0;j<arr.length;++j)
								{
									this[count] = arr.item(j);
									++count;
								}
							} catch (e) {
							} finally {
								if (!oldId)
									oldContext.removeAttribute('id');
							}
						}
						this.length = count;
						return this;
					},
				each : function (func) {
						for (i=0;i<this.length;++i)
							func.call(this[i]);
					},
				extend : function (obj) {
						if (obj == undefined)
							return undefined;
						for(var key in obj)
							jDosk.fn[key] = obj[key];
						return this;
					}
			};
		jDosk.fn.init.prototype = jDosk.fn;  //Initial jDosk
		jDosk.extend = function (obj) {  //Static function
				if (obj == undefined)
					return undefined;
				for(var key in obj)
					jDosk[key] = obj[key];
				return this;
			};
		jDosk.fn.extend({  //Add some functions
				css : function (obj, tmp) {
						if (obj == undefined)
							return undefined;
						if (typeof obj == "string")
						{
							if (tmp == undefined)
								return this[0].style[obj];
							else {
								for (i=0;i<this.length;++i)
									this[i].style[obj] = tmp;
								return this;
							}
						}
						for (i=0;i<this.length;++i)
							for(var key in obj)
								this[i].style[key] = obj[key];
						return this;
					},
				hide : function () {
						this.css("display", "none");
					},
				show : function () {
						this.css("display", "");
					},
				toggle : function () {
						if (this.css("display") == "none")
							this.show();
						else
							this.hide();
						return this;
					},
				load: function (url) {
						var self = this;
						jDosk.get(url, function (data) {
								self.each(function () {this.innerHTML = data;
									}); 
							});
					}
			});
		jDosk.extend({  //Add some functions 
				objectType : function(obj) {
						class2type = {  
							'[object Boolean]' : 'boolean',
							'[object Number]' : 'number',
							'[object String]' : 'string',
							'[object Function]' : 'function',
							'[object Array]' : 'array',
							'[object Date]' : 'date',
							'[object RegExp]' : 'regExp',
							'[object Object]' : 'object'
						};
						return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";  
					},
				isFunction : function (obj) {
						return (jDosk.objectType(obj) == "function");
					},
				setting : function (o, n, re) {
						for(var key in n)
							if (re)
								o[key] = n[key];
							else
								if (!o[key])
									o[key] = n[key];
						return o;
					},
				ajaxSettings : {
						url : location.href,
						type : "GET",
						contentType : "application/x-www-form-urlencoded",
						data : null,
						xhr : window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ?
							function ()
							{
								return new window.XMLHttpRequest();
							} :
							function ()
							{
								try {
									return new window.ActiveXObject("Microsoft.XMLHTTP");
								} catch (e) {};
							}
						},
				ajaxSetup: function (settings) {
						jDosk.setting(jQuery.ajaxSettings, settings);
					},
				ajax: function (origSettings) {
						var s = jDosk.setting(jDosk.ajaxSettings, origSettings, true);
						xhr = s.xhr();
						var onreadystatechange = xhr.onreadystatechange = function (isTimeout) {
							if (xhr.readyState === 4) {
								if (xhr.status == 200) {
									s.success.call(origSettings, xhr.responseText);
								}
							}
						};
						xhr.open(s.type, s.url);
						xhr.send(s.data);
						return xhr;
					},
				get : function (url, data, callback, type) {
						if (jDosk.isFunction(data))
						{
							type = type || callback;
							callback = data;
							data = null;
						}
				
						return jDosk.ajax({
							type : "GET",
							url : url,
							data : data,
							success : callback,
							dataType : type
						})
					},
				get : function (url, data, callback, type) {
						if (jDosk.isFunction(data))
						{
							type = type || callback;
							callback = data;
							data = null;
						}
				
						return jDosk.ajax({
							type : "POST",
							url : url,
							data : data,
							success : callback,
							dataType : type
						})
					}
			});
	})(window);