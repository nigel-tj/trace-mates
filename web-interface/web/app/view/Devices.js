/*
 * Copyright 2015 - 2016 Anton Tananaev (anton.tananaev@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.Devices', {
    extend: 'Ext.grid.Panel',
    xtype: 'devicesView',

    requires: [
        'Traccar.view.DevicesController',
        'Traccar.view.EditToolbar',
        'Traccar.view.SettingsMenu'
    ],

    controller: 'devices',
    rootVisible: false,

    initComponent: function () {
        this.store = Ext.create('Ext.data.ChainedStore', {
            source: 'Devices',
            groupField: 'groupId'
        });
        this.callParent();
    },

    title: Strings.deviceTitle,
    selType: 'rowmodel',

    tbar: {
        xtype: 'editToolbar',
        items: [{
            xtype: 'button',
            disabled: true,
            handler: 'onGeofencesClick',
            reference: 'toolbarGeofencesButton',
            glyph: 'xf21d@FontAwesome',
            tooltip: Strings.sharedGeofences,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onCommandClick',
            reference: 'deviceCommandButton',
            glyph: 'xf093@FontAwesome',
            tooltip: Strings.deviceCommand,
            tooltipType: 'title'
        }, {
            xtype: 'tbfill'
        }, {
            id: 'muteButton',
            glyph: 'xf1f7@FontAwesome',
            tooltip: Strings.sharedMute,
            tooltipType: 'title',
            pressed : true,
            enableToggle: true,
            listeners: {
                toggle: function (button, pressed) {
                    if (pressed) {
                        button.setGlyph('xf1f7@FontAwesome');
                    } else {
                        button.setGlyph('xf0a2@FontAwesome');
                    }
                },
                scope: this
            }
        }, {
            id: 'deviceFollowButton',
            glyph: 'xf05b@FontAwesome',
            tooltip: Strings.deviceFollow,
            tooltipType: 'title',
            enableToggle: true,
            toggleHandler: 'onFollowClick'
        }, {
            xtype: 'settingsMenu'
        }]
    },

    bbar: [{
        xtype: 'tbtext',
        html: Strings.groupParent
    }, {
        xtype: 'combobox',
        store: 'Groups',
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id',
        flex: 1,
        listeners: {
            change: function () {
                if (Ext.isNumber(this.getValue())) {
                    this.up('grid').store.filter({
                        id: 'groupFilter',
                        filterFn: function (item) {
                            var groupId, group, groupStore, filter = true;
                            groupId = item.get('groupId');
                            groupStore = Ext.getStore('Groups');

                            while (groupId) {
                                group = groupStore.getById(groupId);
                                if (group) {
                                    if (group.get('id') === this.getValue()) {
                                        filter = false;
                                        break;
                                    }
                                    groupId = group.get('groupId');
                                } else {
                                    groupId = 0;
                                }
                            }

                            return !filter;
                        },
                        scope: this
                    });
                } else {
                    this.up('grid').store.removeFilter('groupFilter');
                }
            }
        }
    }, {
        xtype: 'tbtext',
        html: Strings.sharedSearch
    }, {
        xtype: 'textfield',
        flex: 1,
        listeners: {
            change: function () {
                this.up('grid').store.filter('name', this.getValue());
            }
        }
    }],

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    columns: [{
        text: Strings.sharedName,
        dataIndex: 'name',
        flex: 1
    }, {
        text: Strings.deviceLastUpdate,
        dataIndex: 'lastUpdate',
        flex: 1,
        renderer: function (value, metaData, record) {
            switch (record.get('status')) {
                case 'online':
                    metaData.tdCls = 'view-color-green';
                    break;
                case 'offline':
                    metaData.tdCls = 'view-color-red';
                    break;
                default:
                    metaData.tdCls = 'view-color-yellow';
                    break;
            }
            if (Traccar.app.getPreference('twelveHourFormat', false)) {
                return Ext.Date.format(value, Traccar.Style.dateTimeFormat12);
            } else {
                return Ext.Date.format(value, Traccar.Style.dateTimeFormat24);
            }
        }
    }]

});
