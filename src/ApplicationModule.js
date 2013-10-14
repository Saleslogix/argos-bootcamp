/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('Mobile/Bootcamp/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/ApplicationModule'
], function(
    declare,
    lang,
    string,
    query,
    domClass,
    format,
    ApplicationModule
) {

    return declare('Mobile.Bootcamp.ApplicationModule', ApplicationModule, {
        loadViews: function() {
            this.inherited(arguments);
        },
        loadCustomizations: function() {
            this.inherited(arguments);
            this.registerContactCustomizations();
        },
        registerContactCustomizations: function() {
            this.registerCustomization('detail/tools', 'contact_detail', {
                at: function(tool) {
                    return tool.id === 'edit'
                },
                type: 'insert',
                where: 'after',
                value: {
                    id: 'export-action',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    fn: function() { 
                        // TODO: Fill in code to export to native contact list here, using phonegap
                    }
                }
            });
        }
    });
});
