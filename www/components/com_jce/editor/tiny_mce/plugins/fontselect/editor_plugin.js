/* jce - 2.6.29 | 2018-05-03 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2018 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){var each=(tinymce.DOM,tinymce.dom.Event,tinymce.extend,tinymce.each);tinymce.util.Cookie,tinymce.explode;tinymce.create("tinymce.plugins.FontSelectPlugin",{fonts:"Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",init:function(ed,url){this.editor=ed,ed.onNodeChange.add(function(ed,cm,n,collapsed,o){var fv,c=cm.get("fontselect");c&&n&&each(o.parents,function(n){if(n.style&&(fv=n.style.fontFamily||ed.dom.getStyle(n,"fontFamily"),fv=fv.replace(/[\"\']+/g,"").replace(/^([^,]+).*/,"$1").toLowerCase(),c.select(function(v){return v.replace(/^([^,]+).*/,"$1").toLowerCase()===fv}),fv))return!1})})},createControl:function(n,cf){this.editor;if("fontselect"===n)return this._createFontSelect()},_createFontSelect:function(){var c,self=this,ed=self.editor;return c=ed.controlManager.createListBox("fontselect",{title:"advanced.fontdefault",onselect:function(v){var cur=c.items[c.selectedIndex];return!v&&cur?void ed.execCommand("FontName",!1,cur.value):(ed.execCommand("FontName",!1,v),c.select(function(sv){return v==sv}),cur&&cur.value==v&&c.select(null),!1)}}),c&&each(ed.getParam("fontselect_fonts",self.fonts,"hash"),function(v,k){/\d/.test(v)&&(v="'"+v+"'"),c.add(ed.translate(k),v,{style:v.indexOf("dings")==-1?"font-family:"+v:""})}),c}}),tinymce.PluginManager.add("fontselect",tinymce.plugins.FontSelectPlugin)}();