import{S as o,e as y,a as l}from"./index-CkgylbKr.js";import"./_commonjsHelpers-Cpj98o6Y.js";const{useEffect:E,addons:_}=__STORYBOOK_MODULE_PREVIEW_API__;function D(e){var s;let r=(s=e==null?void 0:e.parameters.docs)==null?void 0:s.source,a=e==null?void 0:e.parameters.__isArgsStory;return(r==null?void 0:r.type)===o.DYNAMIC?!1:!a||(r==null?void 0:r.code)||(r==null?void 0:r.type)===o.CODE}var S=(e,r)=>{var p,i;let a=e(),s=(i=(p=r==null?void 0:r.parameters.docs)==null?void 0:p.source)!=null&&i.excludeDecorators?r.originalStoryFn(r.args,r):a,d;return D(r)||(typeof s=="string"?d=s:s instanceof Element&&(d=s.outerHTML)),E(()=>{let{id:g,unmappedArgs:u}=r;d&&_.getChannel().emit(l,{id:g,args:u,source:d})}),a},m=[S],n={docs:{story:{inline:!0},source:{type:o.DYNAMIC,language:"html",code:void 0,excludeDecorators:void 0}}},T=[y];export{T as argTypesEnhancers,m as decorators,n as parameters};
