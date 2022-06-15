import { Box, Grid } from '@rocket.chat/fuselage';
import { usePermission, useAtLeastOnePermission, useSetting, useTranslation } from '@rocket.chat/ui-contexts';
import React, { ReactElement } from 'react';

import Page from '../../components/Page/Page';
import PageScrollableContent from '../../components/Page/PageScrollableContent';
import HomePageHeader from './HomePageHeader';
import AddUsersCard from './cards/AddUsersCard';
import CreateChannelsCard from './cards/CreateChannelsCard';
import DesktopAppsCard from './cards/DesktopAppsCard';
import DocumentationCard from './cards/DocumentationCard';
import JoinRoomsCard from './cards/JoinRoomsCard';
import MobileAppsCard from './cards/MobileAppsCard';

const CREATE_CHANNEL_PERMISSIONS = ['create-c', 'create-p'];

const DefaultHomePage = (): ReactElement => {
	const t = useTranslation();
	const canAddUsers = usePermission('view-user-administration');
	const canCreateChannel = useAtLeastOnePermission(CREATE_CHANNEL_PERMISSIONS);
	const workspaceName = useSetting('Site_Name');

	return (
		<Page data-qa='page-home' data-qa-type='default' backgroundColor='neutral-100'>
			<HomePageHeader />
			<PageScrollableContent>
				<Box is='h1' fontScale='h1' marginBlock='x42' minHeight='x40'>
					{/* eslint-disable-next-line @typescript-eslint/camelcase */}
					{t('Welcome_to', { Site_Name: workspaceName || 'Rocket.Chat' })}
				</Box>
				<Box is='h3' fontScale='h3' marginBlock='x16'>
					{t('Some_ideas_to_get_you_started')}
				</Box>
				<Grid>
					{canAddUsers && (
						<Grid.Item>
							<AddUsersCard />
						</Grid.Item>
					)}
					{canCreateChannel && (
						<Grid.Item>
							<CreateChannelsCard />
						</Grid.Item>
					)}
					<Grid.Item>
						<JoinRoomsCard />
					</Grid.Item>
					<Grid.Item>
						<MobileAppsCard />
					</Grid.Item>
					<Grid.Item>
						<DesktopAppsCard />
					</Grid.Item>
					<Grid.Item>
						<DocumentationCard />
					</Grid.Item>
				</Grid>
			</PageScrollableContent>
		</Page>
	);
};

export default DefaultHomePage;