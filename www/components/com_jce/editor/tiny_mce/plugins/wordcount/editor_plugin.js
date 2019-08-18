/* jce - 2.7.16 | 2019-08-15 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2019 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){tinymce.create("tinymce.plugins.WordCount",{block:0,id:null,countre:null,cleanre:null,init:function(ed,url){function checkKeys(key){return key!==last&&(key===VK.ENTER||last===VK.SPACEBAR||checkDelOrBksp(last))}function checkDelOrBksp(key){return key===VK.DELETE||key===VK.BACKSPACE}var self=this,last=0,VK=tinymce.VK;self.countre=ed.getParam("wordcount_countregex",/[\w\u2019\x27\-\u00C0-\u1FFF]+/g),self.cleanre=ed.getParam("wordcount_cleanregex",/[0-9.(),;:!?%#$?\x27\x22_+=\\\/\-]*/g),self.update_rate=ed.getParam("wordcount_update_rate",2e3),self.update_on_delete=ed.getParam("wordcount_update_on_delete",!1),self.id=ed.id+"_word_count",ed.onWordCount=new tinymce.util.Dispatcher(self),ed.onPostRender.add(function(ed,cm){var row,id;id=ed.getParam("wordcount_target_id"),id?tinymce.DOM.add(id,"span",{},'<span id="'+self.id+'">0</span>'):(row=tinymce.DOM.get(ed.id+"_path_row"),row&&tinymce.DOM.add(row.parentNode,"div",{class:"mceWordCount"},ed.getLang("wordcount.words","Words: ")+'<span id="'+self.id+'" class="mceText">0</span>'))}),ed.onInit.add(function(ed){ed.selection.onSetContent.add(function(){self._count(ed)}),self._count(ed)}),ed.onSetContent.add(function(ed){self._count(ed)}),ed.onKeyUp.add(function(ed,e){(checkKeys(e.keyCode)||self.update_on_delete&&checkDelOrBksp(e.keyCode))&&self._count(ed),last=e.keyCode})},_getCount:function(ed){var tc=0,tx=ed.getContent({format:"raw"});if(tx){tx=tx.replace(/\.\.\./g," "),tx=tx.replace(/<.[^<>]*?>/g," ").replace(/&nbsp;|&#160;/gi," "),tx=tx.replace(/(\w+)(&#?[a-z0-9]+;)+(\w+)/i,"$1$3").replace(/&.+?;/g," "),tx=tx.replace(this.cleanre,"");var wordArray=tx.match(this.countre);wordArray&&(tc=wordArray.length)}return tc},_count:function(ed){var self=this,limit=parseInt(ed.getParam("wordcount_limit",0)),showAlert=ed.getParam("wordcount_alert",0);self.block||(self.block=1,setTimeout(function(){if(!ed.destroyed){var tc=self._getCount(ed);limit&&(tc=limit-tc,tc<0?(tinymce.DOM.addClass(self.id,"mceWordCountLimit"),showAlert&&ed.windowManager.alert(ed.getLang("wordcount.limit_alert","You have reached the word limit set for this content."))):tinymce.DOM.removeClass(self.id,"mceWordCountLimit")),tinymce.DOM.setHTML(self.id,tc.toString()),ed.onWordCount.dispatch(ed,tc),setTimeout(function(){self.block=0},self.update_rate)}},1))}}),tinymce.PluginManager.add("wordcount",tinymce.plugins.WordCount)}();