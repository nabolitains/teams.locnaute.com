import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { RoomManager, MessageAction } from '../../ui-utils';
import { messageArgs } from '../../ui-utils/client/lib/messageArgs';
import { handleError } from '../../utils';
import { ChatSubscription } from '../../models';

Meteor.startup(() => {
	MessageAction.addButton({
		id: 'mark-message-as-unread',
		icon: 'flag',
		label: 'Mark_unread',
		context: ['message', 'message-mobile', 'threads'],
		action() {
			const { msg: message } = messageArgs(this);
			return Meteor.call('unreadMessages', message, function(error) {
				if (error) {
					return handleError(error);
				}
				const subscription = ChatSubscription.findOne({
					rid: message.rid,
				});
				if (subscription == null) {
					return;
				}
				RoomManager.close(subscription.t + subscription.name);
				return FlowRouter.go('home');
			});
		},
		condition({ message, user }) {
			return message.u._id !== user._id;
		},
		order: 10,
		group: 'menu',
	});
});