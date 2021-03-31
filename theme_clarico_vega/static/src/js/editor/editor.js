//--------------------------------------------------------------------------
// Contains Aos animation editor js
//--------------------------------------------------------------------------
odoo.define('theme_clarico_vega.s_editor_js', function (require) {
	'use strict';
	var EditorMenuBar = require("web_editor.editor");
	
	 EditorMenuBar.Class.include({
		save: function (reload) {
	        var self = this;
	        var defs = [];
	        $('div,section').removeClass('aos-animate');
	        $("div[data_aos_ept],section[data_aos_ept]").each(function(){
				var data_aos_ept = $(this).attr('data_aos_ept');
				if(data_aos_ept){
	 				$(this).attr('data-aos',data_aos_ept);
					$(this).removeAttr('data_aos_ept');
				}
	    	});    
	        this.trigger_up('ready_to_save', {defs: defs});
	        return $.when.apply($, defs).then(function () {
	        	 if (self.snippetsMenu) {
	                self.snippetsMenu.cleanForSave();
	            }
	            return self._saveCroppedImages();
	        }).then(function () {
	            return self.rte.save();
	        }).then(function () {
	            if (reload !== false) {
	                return self._reload();
	            }
	        });
	    },
	    
	});

});
