// jDosk JavaScript Library

var jDosk = window.jDosk = window.$$ = function (selector) {  //Define somethings
		return new jDosk.fn.init(selector);
	};
jDosk.fn = jDosk.prototype = {
		init : function (selector) {
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
						if (!oldId) {
							oldContext.removeAttribute('id');
						}
					}
				}
				this.length = count;
				return this;
			},
		extern : function (obj) {
				for(var key in obj)
					eval("jDosk.fn." + key + " = " + obj[key]);
				return this;
			}
	};
jDosk.fn.init.prototype = jDosk.fn;  //Initial jDOsk

jDosk.fn.extern({  //Add some functions
		css : function (obj) {
				for (i=0;i<this.length;++i)
				{
					for(var key in obj)
						eval("this[i].style." + key + " = \"" + obj[key] + "\"");
				}
				return this;
			}
	});
