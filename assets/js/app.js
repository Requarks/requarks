"use strict";Dropzone.autoDiscover=!1,$(function(){$("nav.navbar > ul > li").on("click",function(a){window.location.assign(a.currentTarget.dataset.link)}),$("#usravatar").on("click",function(a){$("#root").addClass("pushed"),_.delay(function(){$("nav.actionbar").one("mouseleave",function(a){$("#root").removeClass("pushed")})},500)});var a=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,local:["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]});$("#searchbox > input").typeahead({minLength:3,highlight:!0},{name:"rsearch",source:a}).bind("typeahead:open",function(){$("nav.actionbar").removeClass("active")});var n=[];$(".dropdown").each(function(a,o){n.push(new Dropdown(o))}),$(window).bind("beforeunload",function(){$("#notifload").addClass("active")})});