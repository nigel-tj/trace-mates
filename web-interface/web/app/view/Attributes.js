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

Ext.define('Traccar.view.Attributes', {
    extend: 'Ext.grid.Panel',
    xtype: 'attributesView',

    requires: [
        'Traccar.view.AttributesController',
        'Traccar.view.EditToolbar'
    ],

    controller: 'attributes',

    selType: 'rowmodel',

    tbar: {
        xtype: 'editToolbar'
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    columns: [{
        text: Strings.sharedName,
        dataIndex: 'name',
        flex: 1
    }, {
        text: Strings.stateValue,
        dataIndex: 'value',
        flex: 1
    }]
});
