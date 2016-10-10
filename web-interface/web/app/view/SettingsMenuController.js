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

Ext.define('Traccar.view.SettingsMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settings',

    requires: [
        'Traccar.view.LoginController',
        'Traccar.view.UserDialog',
        'Traccar.view.ServerDialog',
        'Traccar.view.Users',
        'Traccar.view.Groups',
        'Traccar.view.Geofences',
        'Traccar.view.Notifications',
        'Traccar.view.AttributeAliases',
        'Traccar.view.Statistics',
        'Traccar.view.BaseWindow'
    ],

    init: function () {
        var admin, readonly;
        admin = Traccar.app.getUser().get('admin');
        readonly = Traccar.app.getPreference('readonly', false);
        if (admin) {
            this.lookupReference('settingsServerButton').setHidden(false);
            this.lookupReference('settingsUsersButton').setHidden(false);
            this.lookupReference('settingsStatisticsButton').setHidden(false);
        }
        if (admin || !readonly) {
            this.lookupReference('settingsGroupsButton').setHidden(false);
            this.lookupReference('settingsGeofencesButton').setHidden(false);
            this.lookupReference('settingsAttributeAliasesButton').setHidden(false);
        }
    },

    onUserClick: function () {
        var dialog = Ext.create('Traccar.view.UserDialog');
        dialog.down('form').loadRecord(Traccar.app.getUser());
        dialog.show();
    },

    onGroupsClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.settingsGroups,
            modal: false,
            items: {
                xtype: 'groupsView'
            }
        }).show();
    },

    onGeofencesClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedGeofences,
            modal: false,
            items: {
                xtype: 'geofencesView'
            }
        }).show();
    },

    onServerClick: function () {
        var dialog = Ext.create('Traccar.view.ServerDialog');
        dialog.down('form').loadRecord(Traccar.app.getServer());
        dialog.show();
    },

    onUsersClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.settingsUsers,
            modal: false,
            items: {
                xtype: 'usersView'
            }
        }).show();
    },

    onNotificationsClick: function () {
        var user = Traccar.app.getUser();
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedNotifications,
            modal: false,
            items: {
                xtype: 'notificationsView',
                user: user
            }
        }).show();
    },

    onAttributeAliasesClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedAttributeAliases,
            modal: false,
            items: {
                xtype: 'attributeAliasesView'
            }
        }).show();
    },

    onStatisticsClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.statisticsTitle,
            modal: false,
            items: {
                xtype: 'statisticsView'
            }
        }).show();
    },

    onLogoutClick: function () {
        Ext.create('Traccar.view.LoginController').logout();
    }
});
