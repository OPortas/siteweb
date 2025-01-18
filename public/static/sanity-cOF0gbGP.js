import{defineConfig as r,renderStudio as o}from"sanity";import{structureTool as n}from"sanity/structure";import{visionTool as l}from"@sanity/vision";const a={name:"businessHours",title:"Business Hours",type:"document",fields:[{name:"day",title:"Day",type:"string",description:"Specify the day (e.g., Monday, Tuesday, etc.)"},{name:"isClosed",title:"Closed?",type:"boolean",description:"Check this if the business is closed on this day."},{name:"openingTime",title:"Opening Time",type:"string",description:"Enter the opening time (e.g., 08:00)",validation:e=>e.regex(/^([0-1]?\d|2[0-3]):([0-5]\d)$/,{name:"time",message:"Invalid time format. Use HH:mm."}),hidden:({parent:e})=>e==null?void 0:e.isClosed},{name:"closingTime",title:"Closing Time",type:"string",description:"Enter the closing time (e.g., 18:00)",validation:e=>e.regex(/^([0-1]?\d|2[0-3]):([0-5]\d)$/,{name:"time",message:"Invalid time format. Use HH:mm."}),hidden:({parent:e})=>e==null?void 0:e.isClosed},{name:"language",title:"Language",type:"string",options:{list:[{title:"English",value:"en"},{title:"Portuguese",value:"pt"}]}}],preview:{select:{title:"day",isClosed:"isClosed",subtitle:"language"},prepare(e){const{title:t,isClosed:i,subtitle:s}=e;return{title:`${t?t.charAt(0).toUpperCase()+t.slice(1):"No Day Specified"} ${i?"(Closed)":""}`,subtitle:`Language: ${s?s.toUpperCase():"N/A"}`}}}},d={name:"aboutUs",title:"About Us",type:"document",fields:[{name:"image",title:"Image",type:"image",options:{hotspot:!0},fields:[{name:"altText",title:"Alt Text",type:"string",description:"Alternative text for accessibility.",validation:e=>e.required().error("Alt text is required for accessibility.")}]},{name:"title",title:"Title",type:"object",fields:[{name:"en",title:"English Title",type:"string",validation:e=>e.required().error("English title is required.")},{name:"pt",title:"Portuguese Title",type:"string",validation:e=>e.required().error("Portuguese title is required.")}]},{name:"description",title:"Description",type:"object",fields:[{name:"en",title:"English Description",type:"text",validation:e=>e.required().error("English description is required.")},{name:"pt",title:"Portuguese Description",type:"text",validation:e=>e.required().error("Portuguese description is required.")}]}],preview:{select:{title:"title.en",subtitle:"title.pt",media:"image"},prepare(e){const{title:t,subtitle:i,media:s}=e;return{title:t||"No English Title",subtitle:i||"No Portuguese Title",media:s}}}},p={name:"dishImages",title:"Dish Images",type:"document",fields:[{name:"title",title:"Title",type:"string",description:"Provide a title for this set of dish images."},{name:"images",title:"Dish Images",type:"array",of:[{type:"image",options:{hotspot:!0},fields:[{name:"caption",title:"Caption",type:"string",description:"Optional caption for the image."},{name:"altText",title:"Alt Text",type:"string",description:"Alternative text for accessibility.",validation:e=>e.required().error("Alt text is required for accessibility.")}]}],validation:e=>e.max(4).error("You can only add up to 4 images.")}],preview:{select:{title:"title",media:"images.0"},prepare(e){const{title:t,media:i}=e;return{title:t||"Dish Images",media:i}}}},m={name:"ourTerrace",title:"Our Terrace",type:"document",fields:[{name:"description",title:"Description",type:"object",fields:[{name:"en",title:"English Description",type:"text",validation:e=>e.required().error("English description is required.")},{name:"pt",title:"Portuguese Description",type:"text",validation:e=>e.required().error("Portuguese description is required.")}]},{name:"image",title:"Image",type:"image",options:{hotspot:!0},fields:[{name:"altText",title:"Alt Text",type:"string",description:"Alternative text for accessibility.",validation:e=>e.required().error("Alt text is required for accessibility.")}]}],preview:{select:{title:"description.en",media:"image"},prepare(e){const{title:t,media:i}=e;return{title:t||"No English Description",media:i}}}},u=[a,p,d,m],c=r({basePath:"/studio",name:"default",title:"Oportas",projectId:"c0d3wgqd",dataset:"production",plugins:[n(),l()],schema:{types:u}});o(document.getElementById("sanity"),c,{reactStrictMode:!1,basePath:"/"});
