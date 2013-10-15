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
            if (!navigator.contacts) {
                return;
            }

            this.registerCustomization('detail/tools', 'contact_detail', {
                at: function(tool) {
                    return tool.id === 'edit';
                },
                type: 'insert',
                where: 'after',
                value: {
                    id: 'export-action',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    fn: function() { 
                        var view, contact, entry;
                        view = App.getView('contact_detail');
                        if (!view || !view.entry) {
                            console.error('Error retrieving view or the view\'s entry');
                        }

                        entry = view.entry;

                        // See http://docs.phonegap.com/en/edge/cordova_contacts_contacts.md.html#Contact
                        contact = navigator.contacts.create({
                            displayName: entry.$descriptor, // DOMString
                            name: {
                                // ContactName
                                formatted: entry.$descriptor,
                                familyName: entry.LastName,
                                givenName: entry.FirstName,
                                middleName: entry.MiddleName,
                                honorificPrefix: entry.Prefix,
                                honorificSuffix: entry.Suffix 
                            },
                            nickName: entry.$descriptor, // DOMString
                            phoneNumbers: [
                                // ContactField
                                {
                                    type: 'home',
                                    value: entry.HomePhone,
                                    pref: false
                                },
                                {
                                    type: 'work',
                                    value: entry.WorkPhone,
                                    pref: true
                                },
                                {
                                    type: 'fax',
                                    value: entry.Fax,
                                    pref: false
                                }
                            ],
                            emails: [
                                // ContactField
                                {
                                    type: 'work',
                                    value: entry.Email,
                                    pref: true
                                }
                            ],
                            addresses: [
                                //ContactAddress
                                {
                                    pref: true,
                                    type: 'work',
                                    formatted: entry.Address.FullAddress,
                                    streetAddress: entry.Address.StreetAddress,
                                    locality: entry.Address.City,
                                    region: entry.Address.State,
                                    postalCode: entry.Address.PostalCode,
                                    country: entry.Address.Country 
                                }
                            ],
                            organizations: [
                                // ContactOrganization
                                {
                                    pref: true,
                                    type: 'work',
                                    name: entry.AccountName,
                                    department: '',
                                    title: entry.Title 
                                }
                            ],
                            note: 'Imported from Saleslogix Mobile', // DOMString
                            urls: [
                                // ContactField
                                {
                                    type: 'work',
                                    value: entry.WebAddress,
                                    pref: true
                                }
                            ]
                        });

                        contact.save(function(contact) {
                            alert('Contact saved!');
                        }, function(contactError) {
                            alert('Error savig contact!');
                        });
                    }
                }
            });
        }
    });
});
