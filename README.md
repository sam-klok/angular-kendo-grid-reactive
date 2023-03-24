Playing with angular and kendo grid export to Excle. 
Let's convert from static to reactive.
Old, static app: 
    https://github.com/sam-klok/angular-kendo-grid
    https://stackblitz.com/edit/angular-ddwvng
    
This would be new, reactive app: 
    https://github.com/sam-klok/angular-kendo-grid-reactive

Thank you,
Serge Klokov

Based on examples:
1. Angular Excel Export Overview
https://www.telerik.com/kendo-angular-ui/components/excel-export/


=========== Conversion to reactive.
1. Add products service
>ng g s products

2. installing RxJS
>npm install rxjs
>npm i rxjs-compat

Based on tutorial: C:\Repos\pluralsight-angular-2-getting-started-Deborah-Kurata\11\demos\demo\APM

2. Add products.json file (kind of API) with json array of products [{},{},..]

=========== Major steps explaining how I created this project:
1. Create project:
>ng new angular-kendo-grid

2. Add kendo grid to project:
>ng add @progress/kendo-angular-grid

3. Add process package:

import { process } from '@progress/kendo-data-query';

because it's already installed (see failed attempt to install below )

> ng add @progress/kendo-data-query
Skipping installation: Package already installed
The package that you are trying to add does not support schematics. You can try using a different version of the package or contact the package author to add ng-add support.


4. Add kendo Excel export component
> ng add @progress/kendo-angular-excel-export 

and add ExcelModule to import in modules.ts:
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
