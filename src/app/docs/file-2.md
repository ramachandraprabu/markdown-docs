1. Finding if childOf of a DOM

```ts

const hasClass = (el, className) => new RegExp(className).test(el.className)

const isChildOf = (el, className) => {
   while (el && el.parentElement) {
       if (hasClass(el.parentElement, className)) {
           return true;
       }
       el = el.parentElement;
   }
   return false;
};
```

2. Finding max-zindex

```ts
findMaxZIndex() {
     let maxZIndex = 0;
     let elements = document.querySelectorAll('body *');

     // later, potentially repeatedly
     maxZIndex = Math.max(maxZIndex, ...[
         ...Array.from(elements)
     ].map(a => parseFloat(getComputedStyle(a).zIndex))
         .filter(a => !isNaN(a)));

     return maxZIndex;
 }
 ```

 3. Thats it