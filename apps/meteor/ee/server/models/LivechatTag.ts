import { registerModel } from '@rocket.chat/models';
import type { IRocketChatRecord } from '@rocket.chat/core-typings';
import type { ILivechatTagModel } from '@rocket.chat/model-typings';

import { ModelClass } from '../../../server/models/ModelClass';
import MeteorModel from '../../app/models/server/models/LivechatTag';

export class LivechatTag extends ModelClass<IRocketChatRecord> implements ILivechatTagModel {}

const col = (MeteorModel as any).model.rawCollection();
registerModel('ILivechatTagModel', new LivechatTag(col) as ILivechatTagModel);
