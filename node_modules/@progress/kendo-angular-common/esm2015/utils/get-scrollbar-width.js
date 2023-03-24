/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isDocumentAvailable } from "./is-document-available";
const canCreateElement = () => isDocumentAvailable() && document.createElement;
/**
 * @hidden
 */
export function getScrollbarWidth() {
    let scrollbarWidth = 0;
    if (canCreateElement()) {
        const div = document.createElement('div');
        div.style.cssText = 'overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block';
        div.innerHTML = '&nbsp;';
        document.body.appendChild(div);
        scrollbarWidth = div.offsetWidth - div.scrollWidth;
        document.body.removeChild(div);
    }
    return scrollbarWidth;
}
