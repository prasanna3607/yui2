(function(){var P;YAHOO.widget.Carousel=function(r,q){YAHOO.widget.Carousel.superclass.constructor.call(this,r,q);};var U=YAHOO.widget.Carousel,e=YAHOO.util.Dom,c=YAHOO.util.Event,o=YAHOO.lang;P="Carousel";var T={},F="afterScroll",f="allItemsRemoved",b="beforeHide",J="beforePageChange",i="beforeScroll",Y="beforeShow",B="blur",X="focus",a="hide",S="itemAdded",n="itemRemoved",Q="itemReplaced",C="itemSelected",L="loadItems",I="navigationStateChange",g="pageChange",H="render",V="show",Z="startAutoPlay",p="stopAutoPlay",K="uiUpdate";function G(q,r){for(var s in r){e.setStyle(q,s,r[s]);}}function W(r,q){var s=document.createElement(r);q=q||{};if(q.className){e.addClass(s,q.className);}if(q.styles){G(s,q.styles);}if(q.parent){q.parent.appendChild(s);}if(q.id){s.setAttribute("id",q.id);}if(q.content){if(q.content.nodeName){s.appendChild(q.content);}else{s.innerHTML=q.content;}}return s;}function d(s,r,q){var u;if(!s){return 0;}function t(x,w){var y;if(w=="marginRight"&&YAHOO.env.ua.webkit){y=parseInt(e.getStyle(x,"marginLeft"),10);}else{y=parseInt(e.getStyle(x,w),10);}return o.isNumber(y)?y:0;}function v(x,w){var y;if(w=="marginRight"&&YAHOO.env.ua.webkit){y=parseFloat(e.getStyle(x,"marginLeft"));}else{y=parseFloat(e.getStyle(x,w));}return o.isNumber(y)?y:0;}if(typeof q=="undefined"){q="int";}switch(r){case"height":u=s.offsetHeight;if(u>0){u+=t(s,"marginTop")+t(s,"marginBottom");}else{u=v(s,"height")+t(s,"marginTop")+t(s,"marginBottom")+t(s,"borderTopWidth")+t(s,"borderBottomWidth")+t(s,"paddingTop")+t(s,"paddingBottom");}break;case"width":u=s.offsetWidth;if(u>0){u+=t(s,"marginLeft")+t(s,"marginRight");}else{u=v(s,"width")+t(s,"marginLeft")+t(s,"marginRight")+t(s,"borderLeftWidth")+t(s,"borderRightWidth")+t(s,"paddingLeft")+t(s,"paddingRight");}break;default:if(q=="int"){u=t(s,r);}else{if(q=="float"){u=v(s,r);}else{u=e.getStyle(s,r);}}break;}return u;}function O(v){var t=this,w,s,r=0,u=t.get("firstVisible"),q=false;if(t._itemsTable.numItems===0){return 0;}if(typeof v=="undefined"){if(t._itemsTable.size>0){return t._itemsTable.size;}}s=t._itemsTable.items[u]||t._itemsTable.loading[u];if(o.isUndefined(s)){return 0;}w=e.get(s.id);if(typeof v=="undefined"){q=t.get("isVertical");}else{q=v=="height";}if(q){r=d(w,"height");}else{r=d(w,"width");}if(typeof v=="undefined"){t._itemsTable.size=r;}return r;}function D(r){var q=this.get("numVisible");return Math.floor(r/q)*q;}function N(){var r=this,s,q;s=r.get("isVertical");q=O.call(r,s?"height":"width");return(q*r.get("revealAmount")/100);}function j(s){var r=0,q=0;r=O.call(this);q=r*s;if(this.get("isVertical")&&!this._rows){q-=s;}return q;}function h(q,r){r.scrollPageBackward();c.preventDefault(q);}function k(q,r){r.scrollPageForward();c.preventDefault(q);}function m(v,r){var z=this,AA=z.CLASSES,q,x=z._firstItem,s=z.get("isCircular"),w=z.get("numItems"),y=z.get("numVisible"),u=r,t=x+y-1;if(u>=0&&u<w){if(!o.isUndefined(z._itemsTable.items[u])){q=e.get(z._itemsTable.items[u].id);if(q){e.removeClass(q,AA.SELECTED_ITEM);}}}if(o.isNumber(v)){v=parseInt(v,10);v=o.isNumber(v)?v:0;}else{v=x;}if(o.isUndefined(z._itemsTable.items[v])){v=D.call(z,v);z.scrollTo(v);}if(!o.isUndefined(z._itemsTable.items[v])){q=e.get(z._itemsTable.items[v].id);if(q){e.addClass(q,AA.SELECTED_ITEM);}}if(v<x||v>t){v=D.call(z,v);z.scrollTo(v);}}function l(){var s=false,v=this,r=v.CLASSES,u,q,t;if(!v._hasRendered){return;}q=v.get("navigation");t=v._firstItem+v.get("numVisible");if(q.prev){if(v.get("numItems")===0||v._firstItem===0){if(v.get("numItems")===0||!v.get("isCircular")){c.removeListener(q.prev,"click",h);e.addClass(q.prev,r.FIRST_NAV_DISABLED);for(u=0;u<v._navBtns.prev.length;u++){v._navBtns.prev[u].setAttribute("disabled","true");}v._prevEnabled=false;}else{s=!v._prevEnabled;}}else{s=!v._prevEnabled;}if(s){c.on(q.prev,"click",h,v);e.removeClass(q.prev,r.FIRST_NAV_DISABLED);for(u=0;u<v._navBtns.prev.length;u++){v._navBtns.prev[u].removeAttribute("disabled");}v._prevEnabled=true;}}s=false;if(q.next){if(t>=v.get("numItems")){if(!v.get("isCircular")){c.removeListener(q.next,"click",k);e.addClass(q.next,r.DISABLED);for(u=0;u<v._navBtns.next.length;u++){v._navBtns.next[u].setAttribute("disabled","true");}v._nextEnabled=false;}else{s=!v._nextEnabled;}}else{s=!v._nextEnabled;}if(s){c.on(q.next,"click",k,v);e.removeClass(q.next,r.DISABLED);for(u=0;u<v._navBtns.next.length;u++){v._navBtns.next[u].removeAttribute("disabled");}v._nextEnabled=true;}}v.fireEvent(I,{next:v._nextEnabled,prev:v._prevEnabled});}function R(s){var t=this,q,r;if(!t._hasRendered){return;}r=t.get("numVisible");if(!o.isNumber(s)){s=Math.ceil(t.get("selectedItem")/r);}q=Math.ceil(t.get("numItems")/r);t._pages.num=q;t._pages.cur=s;if(q>t.CONFIG.MAX_PAGER_BUTTONS){t._updatePagerMenu();}else{t._updatePagerButtons();}}function M(q,r){switch(r){case"height":return d(q,"marginTop")+d(q,"marginBottom")+d(q,"paddingTop")+d(q,"paddingBottom")+d(q,"borderTopWidth")+d(q,"borderBottomWidth");break;case"width":return d(q,"marginLeft")+d(q,"marginRight")+d(q,"paddingLeft")+d(q,"paddingRight")+d(q,"borderLeftWidth")+d(q,"borderRightWidth");break;}}function A(s){var r=this,q=r._rows;if(!o.isObject(s)){return;}if(q){r._indexRows();}switch(s.ev){case S:r._syncUiForItemAdd(s);break;case n:r._syncUiForItemRemove(s);break;case Q:r._syncUiForItemReplace(s);break;case L:r._syncUiForLazyLoading(s);break;}r.fireEvent(K);}function E(t,r){var v=this,u=v.get("currentPage"),s,q=v.get("numVisible");s=parseInt(v._firstItem/q,10);if(s!=u){v.setAttributeConfig("currentPage",{value:s});v.fireEvent(g,s);}if(v.get("selectOnScroll")){if(v.get("selectedItem")!=v._selectedItem){v.set("selectedItem",v._selectedItem);}}clearTimeout(v._autoPlayTimer);delete v._autoPlayTimer;if(v.isAutoPlayOn()){v.startAutoPlay();}v.fireEvent(F,{first:v._firstItem,last:r},v);}U.getById=function(q){return T[q]?T[q].object:false;};YAHOO.extend(U,YAHOO.util.Element,{_rows:null,_cols:null,_animObj:null,_carouselEl:null,_clipEl:null,_firstItem:0,_hasFocus:false,_hasRendered:false,_isAnimationInProgress:false,_isAutoPlayInProgress:false,_itemsTable:null,_navBtns:null,_navEl:null,_nextEnabled:true,_pages:null,_pagination:{},_prevEnabled:true,_recomputeSize:true,CLASSES:{BUTTON:"yui-carousel-button",CAROUSEL:"yui-carousel",CAROUSEL_EL:"yui-carousel-element",CONTAINER:"yui-carousel-container",CONTENT:"yui-carousel-content",DISABLED:"yui-carousel-button-disabled",FIRST_NAV:" yui-carousel-first-button",FIRST_NAV_DISABLED:"yui-carousel-first-button-disabled",FIRST_PAGE:"yui-carousel-nav-first-page",FOCUSSED_BUTTON:"yui-carousel-button-focus",HORIZONTAL:"yui-carousel-horizontal",ITEM_LOADING:"yui-carousel-item-loading",MIN_WIDTH:"yui-carousel-min-width",NAVIGATION:"yui-carousel-nav",NEXT_NAV:" yui-carousel-next-button",NEXT_PAGE:"yui-carousel-next",NAV_CONTAINER:"yui-carousel-buttons",PAGINATION:"yui-carousel-pagination",PAGE_FOCUS:"yui-carousel-nav-page-focus",PREV_PAGE:"yui-carousel-prev",SELECTED_ITEM:"yui-carousel-item-selected",SELECTED_NAV:"yui-carousel-nav-page-selected",VERTICAL:"yui-carousel-vertical",MULTI_ROW:"yui-carousel-multi-row",ROW:"yui-carousel-row",VERTICAL_CONTAINER:"yui-carousel-vertical-container",VISIBLE:"yui-carousel-visible"},CONFIG:{FIRST_VISIBLE:0,HORZ_MIN_WIDTH:180,MAX_PAGER_BUTTONS:5,VERT_MIN_WIDTH:115,NUM_VISIBLE:3},STRINGS:{ITEM_LOADING_CONTENT:"Loading",NEXT_BUTTON_TEXT:"Next Page",PAGER_PREFIX_TEXT:"Go to page ",PREVIOUS_BUTTON_TEXT:"Previous Page"},addItem:function(x,r){var w=this,z=w._rows,t,s,q,y=0,v,u=w.get("numItems");
if(!x){return false;}if(o.isString(x)||x.nodeName){s=x.nodeName?x.innerHTML:x;}else{if(o.isObject(x)){s=x.content;}else{return false;}}t=x.className||"";q=x.id?x.id:e.generateId();if(o.isUndefined(r)){w._itemsTable.items.push({item:s,className:t,id:q});v=w._itemsTable.items.length-1;}else{if(r<0||r>u){return false;}if(!w._itemsTable.items[r]){w._itemsTable.items[r]=undefined;y=1;}w._itemsTable.items.splice(r,y,{item:s,className:t,id:q});}w._itemsTable.numItems++;if(u<w._itemsTable.items.length){w.set("numItems",w._itemsTable.items.length);}w.fireEvent(S,{pos:r,ev:S,newPos:v});return true;},addItems:function(q){var r,t,s=true;if(!o.isArray(q)){return false;}for(r=0,t=q.length;r<t;r++){if(this.addItem(q[r][0],q[r][1])===false){s=false;}}return s;},blur:function(){this._carouselEl.blur();this.fireEvent(B);},clearItems:function(){var q=this,r=q.get("numItems");while(r>0){if(!q.removeItem(0)){}if(q._itemsTable.numItems===0){q.set("numItems",0);break;}r--;}q.fireEvent(f);},focus:function(){var z=this,u,v,w,t,y,AA,r,s,q;if(!z._hasRendered){return;}if(z.isAnimating()){return;}q=z.get("selectedItem");AA=z.get("numVisible");r=z.get("selectOnScroll");s=(q>=0)?z.getItem(q):null;u=z.get("firstVisible");y=u+AA-1;w=(q<u||q>y);v=(s&&s.id)?e.get(s.id):null;t=z._itemsTable;if(!r&&w){v=(t&&t.items&&t.items[u])?e.get(t.items[u].id):null;}if(v){try{v.focus();}catch(x){}}z.fireEvent(X);},hide:function(){var q=this;if(q.fireEvent(b)!==false){q.removeClass(q.CLASSES.VISIBLE);q.fireEvent(a);}},init:function(t,r){var u=this,q=t,v=false,s;if(!t){return;}u._hasRendered=false;u._navBtns={prev:[],next:[]};u._pages={el:null,num:0,cur:0};u._pagination={};u._itemsTable={loading:{},numItems:0,items:[],size:0};if(o.isString(t)){t=e.get(t);}else{if(!t.nodeName){return;}}U.superclass.init.call(u,t,r);s=u.get("selectedItem");if(s>0){u.set("firstVisible",D.call(u,s));}if(t){if(!t.id){t.setAttribute("id",e.generateId());}v=u._parseCarousel(t);if(!v){u._createCarousel(q);}}else{t=u._createCarousel(q);}q=t.id;u.initEvents();if(v){u._parseCarouselItems();}if(s>0){m.call(u,s,0);}if(!r||typeof r.isVertical=="undefined"){u.set("isVertical",false);}u._parseCarouselNavigation(t);u._navEl=u._setupCarouselNavigation();T[q]={object:u};u._loadItems(Math.min(u.get("firstVisible")+u.get("numVisible"),u.get("numItems"))-1);},initAttributes:function(q){var r=this;q=q||{};U.superclass.initAttributes.call(r,q);r.setAttributeConfig("carouselEl",{validator:o.isString,value:q.carouselEl||"OL"});r.setAttributeConfig("carouselItemEl",{validator:o.isString,value:q.carouselItemEl||"LI"});r.setAttributeConfig("currentPage",{readOnly:true,value:0});r.setAttributeConfig("firstVisible",{method:r._setFirstVisible,validator:r._validateFirstVisible,value:q.firstVisible||r.CONFIG.FIRST_VISIBLE});r.setAttributeConfig("selectOnScroll",{validator:o.isBoolean,value:q.selectOnScroll||true});r.setAttributeConfig("numVisible",{setter:r._numVisibleSetter,method:r._setNumVisible,validator:r._validateNumVisible,value:q.numVisible||r.CONFIG.NUM_VISIBLE});r.setAttributeConfig("numItems",{method:r._setNumItems,validator:r._validateNumItems,value:r._itemsTable.numItems});r.setAttributeConfig("scrollIncrement",{validator:r._validateScrollIncrement,value:q.scrollIncrement||1});r.setAttributeConfig("selectedItem",{setter:r._selectedItemSetter,method:r._setSelectedItem,validator:o.isNumber,value:-1});r.setAttributeConfig("revealAmount",{method:r._setRevealAmount,validator:r._validateRevealAmount,value:q.revealAmount||0});r.setAttributeConfig("isCircular",{validator:o.isBoolean,value:q.isCircular||false});r.setAttributeConfig("isVertical",{method:r._setOrientation,validator:o.isBoolean,value:q.isVertical||false});r.setAttributeConfig("navigation",{method:r._setNavigation,validator:r._validateNavigation,value:q.navigation||{prev:null,next:null,page:null}});r.setAttributeConfig("animation",{validator:r._validateAnimation,value:q.animation||{speed:0,effect:null}});r.setAttributeConfig("autoPlay",{validator:o.isNumber,value:q.autoPlay||0});r.setAttributeConfig("autoPlayInterval",{validator:o.isNumber,value:q.autoPlayInterval||0});r.setAttributeConfig("numPages",{readOnly:true,getter:r._getNumPages});r.setAttributeConfig("lastVisible",{readOnly:true,getter:r._getLastVisible});},initEvents:function(){var s=this,r=s.CLASSES,q;s.on("keydown",s._keyboardEventHandler);s.on(F,l);s.on(S,A);s.on(n,A);s.on(Q,A);s.on(C,function(){if(s._hasFocus){s.focus();}});s.on(L,A);s.on(f,function(t){s.scrollTo(0);l.call(s);R.call(s);});s.on(g,R,s);s.on(H,function(t){if(s.get("selectedItem")===null||s.get("selectedItem")<0){s.set("selectedItem",s.get("firstVisible"));}l.call(s,t);R.call(s,t);s._setClipContainerSize();s.show();});s.on("selectedItemChange",function(t){m.call(s,t.newValue,t.prevValue);if(t.newValue>=0){s._updateTabIndex(s.getElementForItem(t.newValue));}s.fireEvent(C,t.newValue);});s.on(K,function(t){l.call(s,t);R.call(s,t);});s.on("firstVisibleChange",function(t){if(!s.get("selectOnScroll")){if(t.newValue>=0){s._updateTabIndex(s.getElementForItem(t.newValue));}}});s.on("click",function(t){if(s.isAutoPlayOn()){s.stopAutoPlay();}s._itemClickHandler(t);s._pagerClickHandler(t);});c.onFocus(s.get("element"),function(t,v){var u=c.getTarget(t);if(u&&u.nodeName.toUpperCase()=="A"&&e.getAncestorByClassName(u,r.NAVIGATION)){if(q){e.removeClass(q,r.PAGE_FOCUS);}q=u.parentNode;e.addClass(q,r.PAGE_FOCUS);}else{if(q){e.removeClass(q,r.PAGE_FOCUS);}}v._hasFocus=true;v._updateNavButtons(c.getTarget(t),true);},s);c.onBlur(s.get("element"),function(t,u){u._hasFocus=false;u._updateNavButtons(c.getTarget(t),false);},s);},isAnimating:function(){return this._isAnimationInProgress;},isAutoPlayOn:function(){return this._isAutoPlayInProgress;},getElementForItem:function(q){var r=this;if(q<0||q>=r.get("numItems")){return null;}if(r._itemsTable.items[q]){return e.get(r._itemsTable.items[q].id);}return null;},getElementForItems:function(){var s=this,r=[],q;for(q=0;q<s._itemsTable.numItems;q++){r.push(s.getElementForItem(q));
}return r;},getItem:function(q){var r=this;if(q<0||q>=r.get("numItems")){return null;}if(r._itemsTable.numItems>q){if(!o.isUndefined(r._itemsTable.items[q])){return r._itemsTable.items[q];}}return null;},getItems:function(q){return this._itemsTable.items;},getRows:function(){return this._rows;},getCols:function(){return this._cols;},getItemPositionById:function(u){var s=this,t=s.get("numItems"),q=0,r;while(q<t){r=s._itemsTable.items[q]||{};if(r.id==u){return q;}q++;}return -1;},getVisibleItems:function(){var t=this,q=t.get("firstVisible"),u=q+t.get("numVisible"),s=[];while(q<u){s.push(t.getElementForItem(q));q++;}return s;},removeItem:function(r){var u=this,t=u._rows,s,q=u.get("numItems");if(r<0||r>=q){return false;}s=u._itemsTable.items.splice(r,1);if(s&&s.length==1){u._itemsTable.numItems--;u.set("numItems",q-1);u.fireEvent(n,{item:s[0],pos:r,ev:n});return true;}return false;},replaceItem:function(y,t){var x=this,z=x._rows,v,u,s,w=x.get("numItems"),r,q=y;if(!y){return false;}if(o.isString(y)||y.nodeName){u=y.nodeName?y.innerHTML:y;}else{if(o.isObject(y)){u=y.content;}else{return false;}}if(o.isUndefined(t)){return false;}else{if(t<0||t>=w){return false;}r=x._itemsTable.items[t];if(!r){r=x._itemsTable.loading[t];x._itemsTable.items[t]=undefined;}x._itemsTable.items.splice(t,1,{item:u,className:y.className||"",id:e.generateId()});q=x._itemsTable.items[t];}x.fireEvent(Q,{newItem:q,oldItem:r,pos:t,ev:Q});return true;},replaceItems:function(q){var r,t,s=true;if(!o.isArray(q)){return false;}for(r=0,t=q.length;r<t;r++){if(this.replaceItem(q[r][0],q[r][1])===false){s=false;}}return s;},render:function(r){var t=this,q=t.CLASSES,s=t._rows;t.addClass(q.CAROUSEL);if(!t._clipEl){t._clipEl=t._createCarouselClip();t._clipEl.appendChild(t._carouselEl);}if(r){t.appendChild(t._clipEl);t.appendTo(r);}else{if(!e.inDocument(t.get("element"))){return false;}t.appendChild(t._clipEl);}if(s){e.addClass(t._clipEl,q.MULTI_ROW);}if(t.get("isVertical")){t.addClass(q.VERTICAL);}else{t.addClass(q.HORIZONTAL);}if(t.get("numItems")<1){return false;}t._refreshUi();if(s){t._indexRows();}return true;},scrollBackward:function(){var q=this;q.scrollTo(q._firstItem-q.get("scrollIncrement"));},scrollForward:function(){var q=this;q.scrollTo(q._firstItem+q.get("scrollIncrement"));},scrollPageBackward:function(){var r=this,q=r._firstItem-r.get("numVisible");if(r.get("selectOnScroll")){r._selectedItem=r._getSelectedItem(q);}else{q=r._getValidIndex(q);}r.scrollTo(q);},scrollPageForward:function(){var r=this,q=r._firstItem+r.get("numVisible");if(r.get("selectOnScroll")){r._selectedItem=r._getSelectedItem(q);}else{q=r._getValidIndex(q);}r.scrollTo(q);},scrollTo:function(AH,AF){var AE=this,s,AG,x,z,AA,AI,AJ,AK,AB,t,y,AD,q,u,r,v,AC,w,AL;if(o.isUndefined(AH)||AH==AE._firstItem||AE.isAnimating()){return;}AG=AE.get("animation");x=AE.get("isCircular");z=AE.get("isVertical");t=AE._cols;y=AE._rows;AK=AE._firstItem;AD=AE.get("numItems");q=AE.get("numVisible");r=AE.get("currentPage");AL=function(){if(AE.isAutoPlayOn()){AE.stopAutoPlay();}};if(AH<0){if(x){AH=AD+AH;}else{AL.call(AE);return;}}else{if(AD>0&&AH>AD-1){if(AE.get("isCircular")){AH=AD-AH;}else{AL.call(AE);return;}}}AJ=(AE._firstItem>AH)?"backward":"forward";AC=AK+q;AC=(AC>AD-1)?AD-1:AC;v=AE.fireEvent(i,{dir:AJ,first:AK,last:AC});if(v===false){return;}AE.fireEvent(J,{page:r});AB=AH+q-1;AE._loadItems(AB>AD-1?AD-1:AB);AI=0-AH;if(y){if(z){AI=parseInt(AI/t,10);}else{AI=parseInt(AI/y,10);}}w=0;while(AI<0&&w<AH+q-1&&w<AD){if(o.isUndefined(AE._itemsTable.items[w])&&o.isUndefined(AE._itemsTable.loading[w])){AI++;}w+=y?y:1;}AE._firstItem=AH;AE.set("firstVisible",AH);AC=AH+q;AC=(AC>AD-1)?AD-1:AC;u=j.call(AE,AI);s=AG.speed>0;if(s){AE._animateAndSetCarouselOffset(u,AH,AC,AF);}else{AE._setCarouselOffset(u);E.call(AE,AH,AC);}},getPageForItem:function(q){return Math.ceil((q+1)/parseInt(this.get("numVisible"),10));},selectPreviousItem:function(){var s=this,r=0,q=s.get("selectedItem");if(q==this._firstItem){r=q-s.get("numVisible");s._selectedItem=s._getSelectedItem(q-1);s.scrollTo(r);}else{r=s.get("selectedItem")-s.get("scrollIncrement");s.set("selectedItem",s._getSelectedItem(r));}},selectNextItem:function(){var r=this,q=0;q=r.get("selectedItem")+r.get("scrollIncrement");r.set("selectedItem",r._getSelectedItem(q));},show:function(){var r=this,q=r.CLASSES;if(r.fireEvent(Y)!==false){r.addClass(q.VISIBLE);r.fireEvent(V);}},startAutoPlay:function(){var q=this,r;if(o.isUndefined(q._autoPlayTimer)){r=q.get("autoPlayInterval");if(r<=0){return;}q._isAutoPlayInProgress=true;q.fireEvent(Z);q._autoPlayTimer=setTimeout(function(){q._autoScroll();},r);}},stopAutoPlay:function(){var q=this;if(!o.isUndefined(q._autoPlayTimer)){clearTimeout(q._autoPlayTimer);delete q._autoPlayTimer;q._isAutoPlayInProgress=false;q.fireEvent(p);}},updatePagination:function(){var y=this,w=y._pagination;if(!w.el){return false;}var v=y.get("numItems"),z=y.get("numVisible"),t=y.get("firstVisible")+1,u=y.get("currentPage")+1,q=y.get("numPages"),s={"numVisible":z,"numPages":q,"numItems":v,"selectedItem":y.get("selectedItem")+1,"currentPage":u,"firstVisible":t,"lastVisible":y.get("lastVisible")},r=w.callback||{},x=r.scope&&r.obj?r.obj:y;w.el.innerHTML=o.isFunction(r.fn)?r.fn.apply(x,[w.template,s]):YAHOO.lang.substitute(w.template,s);},registerPagination:function(r,t,q){var s=this;s._pagination.template=r;s._pagination.callback=q||{};if(!s._pagination.el){s._pagination.el=W("DIV",{className:s.CLASSES.PAGINATION});if(t=="before"){s._navEl.insertBefore(s._pagination.el,s._navEl.firstChild);}else{s._navEl.appendChild(s._pagination.el);}s.on("itemSelected",s.updatePagination);s.on("pageChange",s.updatePagination);}s.updatePagination();},toString:function(){return P+(this.get?" (#"+this.get("id")+")":"");},_animateAndSetCarouselOffset:function(v,t,r){var u=this,s=u.get("animation"),q=null;if(u.get("isVertical")){q=new YAHOO.util.Motion(u._carouselEl,{points:{to:[0,v]}},s.speed,s.effect);}else{q=new YAHOO.util.Motion(u._carouselEl,{points:{to:[v,0]}},s.speed,s.effect);
}u._isAnimationInProgress=true;q.onComplete.subscribe(u._animationCompleteHandler,{scope:u,item:t,last:r});q.animate();},_animationCompleteHandler:function(q,r,s){s.scope._isAnimationInProgress=false;E.call(s.scope,s.item,s.last);},_autoScroll:function(){var r=this,s=r._firstItem,q;if(s>=r.get("numItems")-1){if(r.get("isCircular")){q=0;}else{r.stopAutoPlay();}}else{q=s+r.get("numVisible");}r._selectedItem=r._getSelectedItem(q);r.scrollTo.call(r,q);},_createCarousel:function(r){var t=this,q=t.CLASSES,s=e.get(r);if(!s){s=W("DIV",{className:q.CAROUSEL,id:r});}if(!t._carouselEl){t._carouselEl=W(t.get("carouselEl"),{className:q.CAROUSEL_EL});}return s;},_createCarouselClip:function(){return W("DIV",{className:this.CLASSES.CONTENT});},_createCarouselItem:function(q){return W(this.get("carouselItemEl"),{className:q.className,styles:q.styles,content:q.content,id:q.id});},_getValidIndex:function(s){var v=this,q=v.get("isCircular"),t=v.get("numItems"),u=v.get("numVisible"),r=t-1;if(s<0){s=q?Math.ceil(t/u)*u+s:0;}else{if(s>r){s=q?0:r;}}return s;},_getSelectedItem:function(u){var t=this,q=t.get("isCircular"),s=t.get("numItems"),r=s-1;if(u<0){if(q){u=s+u;}else{u=t.get("selectedItem");}}else{if(u>r){if(q){u=u-s;}else{u=t.get("selectedItem");}}}return u;},_itemClickHandler:function(t){var w=this,u=w.get("carouselItemEl"),q=w.get("element"),r,s,v=c.getTarget(t);while(v&&v!=q&&v.id!=w._carouselEl){r=v.nodeName;if(r.toUpperCase()==u){break;}v=v.parentNode;}if((s=w.getItemPositionById(v.id))>=0){w.set("selectedItem",w._getSelectedItem(s));w.focus();}},_keyboardEventHandler:function(s){var t=this,r=c.getCharCode(s),q=false;if(t.isAnimating()){return;}switch(r){case 37:case 38:t.selectPreviousItem();q=true;break;case 39:case 40:t.selectNextItem();q=true;break;case 33:t.scrollPageBackward();q=true;break;case 34:t.scrollPageForward();q=true;break;}if(q){if(t.isAutoPlayOn()){t.stopAutoPlay();}c.preventDefault(s);}},_loadItems:function(s){var v=this,r=v.get("numItems"),t=v.get("numVisible"),u=v.get("revealAmount"),w=v._itemsTable.items.length,q=v.get("lastVisible");if(w>s&&s+1>=t){w=s%t||s==q?s-s%t:s-t+1;}if(u&&s<r-1){s++;}if(s>=w&&(!v.getItem(w)||!v.getItem(s))){v.fireEvent(L,{ev:L,first:w,last:s,num:s-w+1});}},_pagerClickHandler:function(r){var u=this,s,w,t=c.getTarget(r),v;function q(z){var y=u.get("carouselItemEl"),x=z.nodeName.toUpperCase();if(x==y.toUpperCase()){z=e.getChildrenBy(z,function(AA){return AA.href||AA.value;});if(z&&z[0]){z=z[0];}}else{if(x=="EM"){z=z.parentNode;}}return z.href||z.value?z:null;}if(t){t=q(t);if(!t){return;}v=t.href||t.value;if(o.isString(v)&&v){w=v.lastIndexOf("#");s=parseInt(v.substring(w+1),10);if(s!=-1){v=(s-1)*u.get("numVisible");u._selectedItem=v;u.scrollTo(v);if(!t.value){u.focus();}c.preventDefault(r);}}}},_parseCarousel:function(s){var v=this,w,q,r,u,t;q=v.CLASSES;r=v.get("carouselEl");u=false;for(w=s.firstChild;w;w=w.nextSibling){if(w.nodeType==1){t=w.nodeName;if(t.toUpperCase()==r){v._carouselEl=w;e.addClass(v._carouselEl,v.CLASSES.CAROUSEL_EL);u=true;}}}return u;},_parseCarouselItems:function(){var x=this,z=x.CLASSES,u=0,y,q,s,t,r,v=x.get("firstVisible"),w=x._carouselEl;y=x._rows;s=x.get("carouselItemEl");for(q=w.firstChild;q;q=q.nextSibling){if(q.nodeType==1){r=q.nodeName;if(r.toUpperCase()==s){if(q.id){t=q.id;}else{t=e.generateId();q.setAttribute("id",t);}x.addItem(q,v);v++;}}}},_indexRows:function(){var AC=this,z=AC.get("isVertical"),AD=AC.get("numVisible"),AE=AC._itemsTable,t=AE.loading,x=AE.items,v=x.length,AG=AC._rows,y=AC._cols,AB,AA,q,AF,r,s,w;if(AG&&y){AF=0;r=0;s=O.call(AC,"height");w=O.call(AC,"width");for(var u=0;u<v;u++){AB=x[u]?e.get(x[u].id):t[u];if(AB){if(z){r++;if(u%y===0){AA=Math.floor(u/AD);r=0;if(u!==0){AF++;}}}else{r++;if(u%y===0){AA=Math.floor(u/AD);r=AA*y;AF++;}if(u%AD===0){AF=0;}}x[u].styles={left:(r*w)+"px",top:(AF*s)+"px"};}}}},_parseCarouselNavigation:function(w){var x=this,v,y=x.CLASSES,r,u,t,q,s=false;q=e.getElementsByClassName(y.PREV_PAGE,"*",w);if(q.length>0){for(u in q){if(q.hasOwnProperty(u)){r=q[u];if(r.nodeName=="INPUT"||r.nodeName=="BUTTON"||r.nodeName=="A"){x._navBtns.prev.push(r);}else{t=r.getElementsByTagName("INPUT");if(o.isArray(t)&&t.length>0){x._navBtns.prev.push(t[0]);}else{t=r.getElementsByTagName("BUTTON");if(o.isArray(t)&&t.length>0){x._navBtns.prev.push(t[0]);}}}}}v={prev:q};}q=e.getElementsByClassName(y.NEXT_PAGE,"*",w);if(q.length>0){for(u in q){if(q.hasOwnProperty(u)){r=q[u];if(r.nodeName=="INPUT"||r.nodeName=="BUTTON"||r.nodeName=="A"){x._navBtns.next.push(r);}else{t=r.getElementsByTagName("INPUT");if(o.isArray(t)&&t.length>0){x._navBtns.next.push(t[0]);}else{t=r.getElementsByTagName("BUTTON");if(o.isArray(t)&&t.length>0){x._navBtns.next.push(t[0]);}}}}}if(v){v.next=q;}else{v={next:q};}}if(v){x.set("navigation",v);s=true;}return s;},_refreshUi:function(){var u=this,r,v,s,w,q,t;v=u.get("isVertical");t=O.call(u,v?"height":"width");q=N.call(u);for(r=0,w=u._itemsTable.numItems;r<w;r++){if(o.isUndefined(u._itemsTable.items[r].pos)){s=u._itemsTable.items[r].id;u._itemsTable.items[r].pos=(r*t)+q;if(v){e.setStyle(s,"left","0");e.setStyle(s,"top",((r*t)+q)+"px");}else{e.setStyle(s,"left",((r*t)+q)+"px");e.setStyle(s,"top","0");}}}if(u._itemsTable.numItems<1){return;}s=u._itemsTable.items[0].id;t=v?d(s,"width"):d(s,"height");e.setStyle(u._carouselEl,v?"width":"height",t+"px");u._hasRendered=true;u.fireEvent(H);},_setCarouselOffset:function(s){var q=this,r;r=q.get("isVertical")?"top":"left";e.setStyle(q._carouselEl,r,s+"px");},_setupCarouselNavigation:function(){var v=this,t,r,q,x,u,w,s;q=v.CLASSES;u=e.getElementsByClassName(q.NAVIGATION,"DIV",v.get("element"));if(u.length===0){u=W("DIV",{className:q.NAVIGATION});v.insertBefore(u,e.getFirstChild(v.get("element")));}else{u=u[0];}v._pages.el=W("UL");u.appendChild(v._pages.el);x=v.get("navigation");if(o.isString(x.prev)||o.isArray(x.prev)){if(o.isString(x.prev)){x.prev=[x.prev];}for(t in x.prev){if(x.prev.hasOwnProperty(t)){v._navBtns.prev.push(e.get(x.prev[t]));}}}else{s=W("SPAN",{className:q.BUTTON+q.FIRST_NAV});
e.setStyle(s,"visibility","visible");t=e.generateId();s.innerHTML='<button type="button" '+'id="'+t+'" name="'+v.STRINGS.PREVIOUS_BUTTON_TEXT+'">'+v.STRINGS.PREVIOUS_BUTTON_TEXT+"</button>";u.appendChild(s);t=e.get(t);v._navBtns.prev=[t];r={prev:[s]};}if(o.isString(x.next)||o.isArray(x.next)){if(o.isString(x.next)){x.next=[x.next];}for(t in x.next){if(x.next.hasOwnProperty(t)){v._navBtns.next.push(e.get(x.next[t]));}}}else{w=W("SPAN",{className:q.BUTTON+q.NEXT_NAV});e.setStyle(w,"visibility","visible");t=e.generateId();w.innerHTML='<button type="button" '+'id="'+t+'" name="'+v.STRINGS.NEXT_BUTTON_TEXT+'">'+v.STRINGS.NEXT_BUTTON_TEXT+"</button>";u.appendChild(w);t=e.get(t);v._navBtns.next=[t];if(r){r.next=[w];}else{r={next:[w]};}}if(r){v.set("navigation",r);}return u;},_setClipContainerSize:function(q,s){var y=this,w=y.get("isVertical"),AA=y._rows,u=y._cols,x=y.get("revealAmount"),r=O.call(y,"height"),t=O.call(y,"width"),z,v;q=q||y._clipEl;if(AA){z=r*AA;v=t*u;}else{s=s||y.get("numVisible");if(w){z=r*s;}else{v=t*s;}}y._recomputeSize=(z===0);if(y._recomputeSize){y._hasRendered=false;return;}x=N.call(y);if(w){z+=(x*2);}else{v+=(x*2);}if(w){z+=M(y._carouselEl,"height");e.setStyle(q,"height",z+"px");if(u){v+=M(y._carouselEl,"width");e.setStyle(q,"width",v+(0)+"px");}}else{v+=M(y._carouselEl,"width");e.setStyle(q,"width",v+"px");if(AA){z+=M(y._carouselEl,"height");e.setStyle(q,"height",z+"px");}}y._setContainerSize(q);},_setContainerSize:function(r,s){var v=this,q=v.CONFIG,y=v.CLASSES,u,x,t,w;u=v.get("isVertical");x=v._rows;t=v._cols;r=r||v._clipEl;s=s||(u?"height":"width");w=parseFloat(e.getStyle(r,s),10);w=o.isNumber(w)?w:0;if(u){w+=M(v._carouselEl,"height")+d(v._navEl,"height");}else{w+=M(v._carouselEl,"width");}if(!u){if(w<q.HORZ_MIN_WIDTH){w=q.HORZ_MIN_WIDTH;v.addClass(y.MIN_WIDTH);}}v.setStyle(s,w+"px");if(u){w=O.call(v,"width");if(t){w=w*t;}e.setStyle(v._carouselEl,"width",w+"px");if(w<q.VERT_MIN_WIDTH){w=q.VERT_MIN_WIDTH;v.addClass(y.MIN_WIDTH);}v.setStyle("width",w+"px");}else{if(x){w=O.call(v,"height");w=w*x;e.setStyle(v._carouselEl,"height",w+"px");}}},_setFirstVisible:function(r){var q=this;if(r>=0&&r<q.get("numItems")){q.scrollTo(r);}else{r=q.get("firstVisible");}return r;},_setNavigation:function(q){var r=this;if(q.prev){c.on(q.prev,"click",h,r);}if(q.next){c.on(q.next,"click",k,r);}},_setNumVisible:function(r){var q=this;q._setClipContainerSize(q._clipEl,r);},_numVisibleSetter:function(s){var r=this,q=s;if(o.isArray(s)){r._cols=s[0];r._rows=s[1];q=s[0]*s[1];}return q;},_selectedItemSetter:function(r){var q=this;return(r<q.get("numItems"))?r:0;},_setNumItems:function(s){var r=this,q=r._itemsTable.numItems;if(o.isArray(r._itemsTable.items)){if(r._itemsTable.items.length!=q){q=r._itemsTable.items.length;r._itemsTable.numItems=q;}}if(s<q){while(q>s){r.removeItem(q-1);q--;}}return s;},_setOrientation:function(s){var r=this,q=r.CLASSES;if(s){r.replaceClass(q.HORIZONTAL,q.VERTICAL);}else{r.replaceClass(q.VERTICAL,q.HORIZONTAL);}r._itemsTable.size=0;return s;},_setRevealAmount:function(r){var q=this;if(r>=0&&r<=100){r=parseInt(r,10);r=o.isNumber(r)?r:0;q._setClipContainerSize();}else{r=q.get("revealAmount");}return r;},_setSelectedItem:function(q){this._selectedItem=q;},_getNumPages:function(){return Math.ceil(parseInt(this.get("numItems"),10)/parseInt(this.get("numVisible"),10));},_getLastVisible:function(){var q=this;return q.get("currentPage")+1==q.get("numPages")?q.get("numItems")-1:q.get("firstVisible")+q.get("numVisible");},_syncUiForItemAdd:function(t){var x=this,v=x._carouselEl,q,y,s=x._itemsTable,r,u,w;u=o.isUndefined(t.pos)?t.newPos||s.numItems-1:t.pos;if(!o.isUndefined(s.items[u])){y=s.items[u];if(y){if(y.id){r=e.get(y.id);if(y.styles){G(r,y.styles);}}}}if(!r){q=x._createCarouselItem({className:y.className,styles:y.styles,content:y.item,id:y.id});if(o.isUndefined(t.pos)){if(!o.isUndefined(s.loading[u])){r=s.loading[u];}if(r){v.replaceChild(q,r);delete s.loading[u];}else{v.appendChild(q);}}else{if(!o.isUndefined(s.items[t.pos+1])){w=e.get(s.items[t.pos+1].id);}if(w){v.insertBefore(q,w);}else{}}}else{if(o.isUndefined(t.pos)){if(!e.isAncestor(x._carouselEl,r)){v.appendChild(r);}}else{if(!e.isAncestor(v,r)){if(!o.isUndefined(s.items[t.pos+1])){v.insertBefore(r,e.get(s.items[t.pos+1].id));}}}}if(!x._hasRendered){x._refreshUi();}if(x.get("selectedItem")<0){x.set("selectedItem",x.get("firstVisible"));}},_syncUiForItemReplace:function(w){var v=this,s=v._carouselEl,q=v._itemsTable,x=w.pos,u=w.newItem,r=w.oldItem,t;t=v._createCarouselItem({className:u.className,styles:u.styles,content:u.item,id:u.id});if(t&&r){c.purgeElement(r,true);s.replaceChild(t,r);if(!o.isUndefined(q.loading[x])){q.numItems++;delete q.loading[x];}}if(!v._hasRendered){v._refreshUi();}},_syncUiForItemRemove:function(v){var u=this,q=u._carouselEl,s,t,r,w;r=u.get("numItems");t=v.item;w=v.pos;if(t&&(s=e.get(t.id))){if(s&&e.isAncestor(q,s)){c.purgeElement(s,true);q.removeChild(s);}if(u.get("selectedItem")==w){w=w>=r?r-1:w;}}else{}},_syncUiForLazyLoading:function(u){var y=this,w=y._carouselEl,s=y._itemsTable,v=s.items.length,x=s.items[u.last+1],q,r;if(!x&&u.last<v){r=u.first;do{x=s.items[r];r++;}while(r<v&&!x);}for(var t=u.first;t<=u.last;t++){if(o.isUndefined(s.loading[t])&&o.isUndefined(s.items[t])){q=y._createCarouselItem({className:y.CLASSES.ITEM_LOADING,content:y.STRINGS.ITEM_LOADING_CONTENT,id:e.generateId()});if(q){if(x){x=e.get(x.id);if(x){w.insertBefore(q,x);}else{}}else{w.appendChild(q);}}s.loading[t]=q;}}},_updateNavButtons:function(u,r){var s,q=this.CLASSES,v,t=u.parentNode;if(!t){return;}v=t.parentNode;if(u.nodeName.toUpperCase()=="BUTTON"&&e.hasClass(t,q.BUTTON)){if(r){if(v){s=e.getChildren(v);if(s){e.removeClass(s,q.FOCUSSED_BUTTON);}}e.addClass(t,q.FOCUSSED_BUTTON);}else{e.removeClass(t,q.FOCUSSED_BUTTON);}}},_updatePagerButtons:function(){var y=this,w=y.CLASSES,x=y._pages.cur,q,v,t,z,r=y.get("numVisible"),u=y._pages.num,s=y._pages.el;if(u===0||!s){return;}e.setStyle(s,"visibility","hidden");while(s.firstChild){s.removeChild(s.firstChild);
}for(t=0;t<u;t++){q=document.createElement("LI");if(t===0){e.addClass(q,w.FIRST_PAGE);}if(t==x){e.addClass(q,w.SELECTED_NAV);}v='<a href="#'+(t+1)+'" tabindex="0"><em>'+y.STRINGS.PAGER_PREFIX_TEXT+" "+(t+1)+"</em></a>";q.innerHTML=v;s.appendChild(q);}e.setStyle(s,"visibility","visible");},_updatePagerMenu:function(){var x=this,w=x._pages.cur,r,u,y,s=x.get("numVisible"),v=x._pages.num,t=x._pages.el,q;if(v===0){return;}q=document.createElement("SELECT");if(!q){return;}e.setStyle(t,"visibility","hidden");while(t.firstChild){t.removeChild(t.firstChild);}for(u=0;u<v;u++){r=document.createElement("OPTION");r.value="#"+u;r.innerHTML=x.STRINGS.PAGER_PREFIX_TEXT+" "+(u+1);if(u==w){r.setAttribute("selected","selected");}q.appendChild(r);}r=document.createElement("FORM");if(!r){}else{r.appendChild(q);t.appendChild(r);}e.setStyle(t,"visibility","visible");},_updateTabIndex:function(q){var r=this;if(q){if(r._focusableItemEl){r._focusableItemEl.tabIndex=-1;}r._focusableItemEl=q;q.tabIndex=0;}},_validateAnimation:function(q){var r=true;if(o.isObject(q)){if(q.speed){r=r&&o.isNumber(q.speed);}if(q.effect){r=r&&o.isFunction(q.effect);}else{if(!o.isUndefined(YAHOO.util.Easing)){q.effect=YAHOO.util.Easing.easeOut;}}}else{r=false;}return r;},_validateFirstVisible:function(s){var r=this,q=r.get("numItems");if(o.isNumber(s)){if(q===0&&s==q){return true;}else{return(s>=0&&s<q);}}return false;},_validateNavigation:function(q){var r;if(!o.isObject(q)){return false;}if(q.prev){if(!o.isArray(q.prev)){return false;}for(r in q.prev){if(q.prev.hasOwnProperty(r)){if(!o.isString(q.prev[r].nodeName)){return false;}}}}if(q.next){if(!o.isArray(q.next)){return false;}for(r in q.next){if(q.next.hasOwnProperty(r)){if(!o.isString(q.next[r].nodeName)){return false;}}}}return true;},_validateNumItems:function(q){return o.isNumber(q)&&(q>=0);},_validateNumVisible:function(q){var r=false;if(o.isNumber(q)){r=q>0&&q<=this.get("numItems");}else{if(o.isArray(q)){if(o.isNumber(q[0])&&o.isNumber(q[1])){r=q[0]*q[1]>0&&q.length==2;}}}return r;},_validateRevealAmount:function(q){var r=false;if(o.isNumber(q)){r=q>=0&&q<100;}return r;},_validateScrollIncrement:function(q){var r=false;if(o.isNumber(q)){r=(q>0&&q<this.get("numItems"));}return r;}});})();YAHOO.register("carousel",YAHOO.widget.Carousel,{version:"@VERSION@",build:"@BUILD@"});YAHOO.register("carousel",YAHOO.widget.Carousel,{version:"@VERSION@",build:"@BUILD@"});