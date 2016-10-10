/*
 * Copyright 2016 Anton Tananaev (anton.tananaev@gmail.com)
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

Ext.define('Traccar.view.GeofenceDialogController', {
    extend: 'Traccar.view.BaseEditDialogController',
    alias: 'controller.geofenceDialog',

    requires: [
        'Traccar.view.GeofenceMap'
    ],

    config: {
        listen: {
            controller: {
                '*': {
                    savearea: 'saveArea'
                }
            }
        }
    },

    saveArea: function (value) {
        this.lookupReference('areaField').setValue(value);
    },

    onAreaClick: function (button) {
        var dialog, record;
        dialog = button.up('window').down('form');
        record = dialog.getRecord();
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedArea,
            items: {
                xtype: 'geofenceMapView',
                area: record.get('area')
            }
        }).show();
    }
});
