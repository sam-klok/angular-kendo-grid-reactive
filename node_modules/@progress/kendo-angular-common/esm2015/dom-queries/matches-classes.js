/**-----------------------------------------------------------------------------------------
* Copyright © 2021 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { hasClasses } from './has-classes';
export const matchesClasses = (classNames) => (element) => hasClasses(element, classNames);
