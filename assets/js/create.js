"use strict";$(function(){$("#create-categories > li").on("click",function(e){window.location.assign(e.currentTarget.dataset.link)});var e=(new Editor("#medescription","input[name=create_description]",$("#medescription").data("placeholder")),new FileBox("#create_upload")),t=(new Pikaday({field:$("input[name=create_deadline]").get(0),format:"YYYY/MM/DD",minDate:moment().toDate()}),new Vue({el:"#create-form",data:{title:"",description:"",subcategory:""}}));$("#create-submit").on("click",function(a){$("#notifload").addClass("active");var n=new Modal("createrequest");n.setContent("label",modalIntl.processing),n.open().then(function(){$.ajax({cache:!1,data:t.$data,dataType:"json",method:"POST",url:window.location.pathname}).done(function(t){if("ok"===t.state){var a=function(e){if(!_.isNil(e)&&_.some(e,["status","error"])){n.close(!0);var a=new Modal("createuplerror");a.bind("ok",function(){window.location.assign("/item/"+t.id)}),a.open()}else n.getElement("i.spinner").removeClass("alt"),n.setContent("label",modalIntl.finishing),window.location.assign("/item/"+t.id)};e.hasFiles()?(n.getElement("i.spinner").addClass("alt"),n.setContent("label",modalIntl.attachments),e.setUrl("/item/"+t.id+"/upload"),e.startUpload(a,function(e,t,a){n.setContent("label",modalIntl.attachments+" "+_.ceil(e)+"%")})):a(null)}else{n.close(),$("#notifload").removeClass("active");var o=$("label[for=fld_"+t.errors[0].param+"]").html()||t.errors[0].param;alerts.push({"class":"error",title:"Form Error",message:o+" "+t.errors[0].msg,iconClass:"fa-times-circle"})}}).fail(function(e,t,a){n.close(),$("#notifload").removeClass("active"),alerts.push({"class":"error",title:"Connection Error",message:a,iconClass:"fa-plug"})})})})});